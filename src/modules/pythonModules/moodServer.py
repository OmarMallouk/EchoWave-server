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
           
        )

  
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000,debug=True)