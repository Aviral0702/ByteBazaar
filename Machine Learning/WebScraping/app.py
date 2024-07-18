from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import asyncio
import aiohttp
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv('API_KEY')
SCHEMA = os.getenv('SCHEMA')
if not API_KEY:
    raise ValueError("No API key provided. Please set the API_KEY environment variable.")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
CORS(app)
@app.route('/')
def hello_world():
    return 'Hello, World!'

async def fetch_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status != 200:
                raise Exception('Failed to retrieve the URL')
            return await response.text()

@app.route('/scrape', methods=['POST'])
def scrape_and_process():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        html_content = asyncio.run(fetch_url(url))

        soup = BeautifulSoup(html_content, 'html.parser')
        soup = soup.prettify()
        scraped_html = str(soup)

        prompt = f'''
            Please take the provided scraped data in html format from a product detail page and the given product schema : {SCHEMA}. 
            First, beautify the text to ensure it's clean and well-formatted. Then, extract relevant details and systematically organize them as per the schema.
            Convert the refined and structured data into JSON format, ensuring all fields are accurately filled and the data matches the schema structure {scraped_html}.
        '''

        gemini_response = model.generate_content(prompt)

        response_text = gemini_response.text
        json_start = response_text.find('```json\n') + 8
        json_end = response_text.rfind('```')
        json_string = response_text[json_start:json_end].strip()

        parsed_json = json.loads(json_string)
        return jsonify(parsed_json)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)