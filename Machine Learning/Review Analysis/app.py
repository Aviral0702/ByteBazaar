from flask import Flask, request, jsonify, render_template
from transformers import pipeline
import re
import nltk
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

app = Flask(__name__, template_folder='../templates', static_folder='../static')
sentiment_pipeline = pipeline("sentiment-analysis", model="dipawidia/xlnet-base-cased-product-review-sentiment-analysis")

def preprocess_text(text):
    text = text.lower()
    text = BeautifulSoup(text, "html.parser").get_text()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = word_tokenize(text)
    # stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens ]
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    text = ' '.join(tokens)
    return text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    review = data['review']
    preprocessed_review = preprocess_text(review)
    result = sentiment_pipeline(review)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
