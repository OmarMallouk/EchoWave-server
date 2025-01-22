from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from originalityModel.originality import get_lyrics_similarity

app = Flask(__name__)
CORS(app)

def load_mood_model():
    return GPT2LMHeadModel.from_pretrained('./moodModel'), GPT2Tokenizer.from_pretrained('./moodModel')

def load_genre_model():
    return GPT2LMHeadModel.from_pretrained('./genreModel'), GPT2Tokenizer.from_pretrained('./genreModel')

mood_model = None
mood_tokenizer = None
genre_model = None
genre_tokenizer = None

@app.route('/generate-mood', methods=['POST'])
def generate_moodLyrics():
    global mood_model, mood_tokenizer
    if mood_model is None or mood_tokenizer is None:
        mood_model, mood_tokenizer = load_mood_model()
        mood_tokenizer.pad_token = mood_tokenizer.eos_token

    data = request.json
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    tokenized_inputs = mood_tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)

    try:
        outputs = mood_model.generate(
            input_ids=tokenized_inputs['input_ids'],
            attention_mask=tokenized_inputs['attention_mask'],
            max_length=150,
            num_return_sequences=1,
            do_sample=True,
            pad_token_id=mood_tokenizer.eos_token_id,
        )

        generated_text = mood_tokenizer.decode(outputs[0], skip_special_tokens=True)
        clean_text = generated_text.replace('\n', ' ').strip()
        return jsonify({"generated_text": clean_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-genre', methods=['POST'])
def generate_genreLyrics():
    global genre_model, genre_tokenizer
    if genre_model is None or genre_tokenizer is None:
        genre_model, genre_tokenizer = load_genre_model()
        genre_tokenizer.pad_token = genre_tokenizer.eos_token

    data = request.json
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    tokenized_inputs = genre_tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)

    try:
        outputs = genre_model.generate(
            input_ids=tokenized_inputs['input_ids'],
            attention_mask=tokenized_inputs['attention_mask'],
            max_length=150,
            num_return_sequences=1,
            do_sample=True,
            pad_token_id=genre_tokenizer.eos_token_id,
        )

        generated_text = genre_tokenizer.decode(outputs[0], skip_special_tokens=True)
        clean_text = generated_text.replace('\n', ' ').strip()
        return jsonify({"generated_text": clean_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/similarity', methods=['POST'])
def similarity():
    data = request.json 
    query_lyrics = data.get('lyrics')  
    
    if not query_lyrics:
        return jsonify({"error": "No lyrics provided"}), 400
    
    results = get_lyrics_similarity(query_lyrics)
    
    return jsonify(results)  

if __name__ == '__main__':
    app.run(host='35.181.154.194', port=5000, debug=True)
