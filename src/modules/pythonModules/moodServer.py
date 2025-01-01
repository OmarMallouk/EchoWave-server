from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

model = GPT2LMHeadModel.from_pretrained('./moodModelFolder')
tokenizer = GPT2Tokenizer.from_pretrained('./moodModelFolder')



if __name__ == '__main__':
    app.run(port=5000,debug=True)