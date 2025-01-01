from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

model = GPT2LMHeadModel.from_pretrained('./moodModelFolder')
tokenizer = GPT2Tokenizer.from_pretrained('./moodModelFolder')

tokenizer.pad_token = tokenizer.eos_token

app = Flask(__name__)



@app.route('/generate', methods=['POST'])
def generate_lyrics():
    data = request.json
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400


    tokenized_inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)

    try:
        outputs = model.generate(
            input_ids=tokenized_inputs['input_ids'],
            attention_mask=tokenized_inputs['attention_mask'],
            max_length=150,
            num_return_sequences=1,
            do_sample=True,

            pad_token_id=tokenizer.eos_token_id,
        )

        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        clean_text = generated_text.replace('\n', ' ').strip()
        return jsonify({"generated_text": clean_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000,debug=True)