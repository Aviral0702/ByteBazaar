from sqlalchemy import create_engine
import logging, os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import google.generativeai as genai
from dotenv import load_dotenv
import numpy as np
from sqlalchemy.sql import select
from sklearn.metrics.pairwise import cosine_similarity
from tenacity import retry, stop_after_attempt, wait_fixed

app = Flask(__name__)
CORS(app)

load_dotenv()  # Load environment variables

DATABASE_URL = os.getenv("DATABASE_URL")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
API_KEY_GEMINI = os.getenv("API_KEY_GEMINI")

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Adjust the logging level for the `httpx` library
logging.getLogger("httpx").setLevel(logging.WARNING)

# Connect to the database
engine = create_engine(DATABASE_URL)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Generating form function
def generate_form_content(product):
    form_template = (
        f"Description: {product['Description']}\n"
        f"Category: {product['Category']}\n"
        f"Price: {product['Price']}\n"
        f"Discounts: {product['Discounts']}\n"
        f"Features: {product['Features']}\n"
        f"Provider Name: {product['Provider Name']}\n"
        f"Average Rating: {product['Average Rating']}\n"
        f"Availability Status: {product['Availability Status']}\n"
        f"Product Name: {product['Product Name']}\n"
    )
    return form_template

# Updating the form content and the embedding to the table
def update_form_content_and_embedding(product_id, form_content, embeddings):
    try:
        # Update the form_content and embeddings in the database
        response = supabase.table('Products Database').update({
            'Form_content': form_content,
            'Embedding': embeddings  # Assuming you have an 'embeddings' column in your table
        }).eq('Product ID', product_id).execute()
        logging.debug(f"Updated form_content and embeddings for product_id {product_id}: {response}")
    except Exception as e:
        logging.error(f"Error updating form_content and embeddings for product_id {product_id}: {e}")

# Getting of embedding of the form
def make_embed_text_fn(model):
    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def embed_fn(text: str) -> list[float]:
        # Set the task_type to CLASSIFICATION.
        embedding = genai.embed_content(model=model, content=text, task_type="classification")
        return embedding['embedding']

    return embed_fn

def get_embeddings(text):
    genai.configure(api_key=API_KEY_GEMINI)
    model = 'models/embedding-001'
    try:
        embed_fn = make_embed_text_fn(model)
        embeddings = embed_fn(text)
        return embeddings
    except Exception as e:
        logging.error(f"Error getting embeddings: {e}")
        return []

# Getting response from the llm
def get_response_from_llm(input_text):
    genai.configure(api_key=API_KEY_GEMINI)
    model = genai.GenerativeModel('gemini-1.5-flash')
    output = model.generate_content(input_text)
    response = output.text
    return response

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    query = data['query']
    query_embedding = get_embeddings(query)

    # Fetch embeddings from the table
    response = supabase.table('Products Database').select('Embedding', 'Product ID').execute()

    product_data = response.data
    product_ids = [row["Product ID"] for row in product_data]
    embeddings = np.array([row['Embedding'] for row in product_data])

    # Calculate cosine similarity
    query_embedding = np.array(query_embedding).reshape(1, -1)
    similarities = cosine_similarity(query_embedding, embeddings).flatten()

    # Get the top 5 embeddings
    top_indices = similarities.argsort()[-5:][::-1]
    top_product_ids = [product_ids[i] for i in top_indices]

    # Fetch the form content of these products
    form_content_response = supabase.table('Products Database').select('Form_content').in_('Product ID', top_product_ids).execute()

    form_contents = form_content_response.data

    # Store the top 5 form contents in a variable
    input_text = (
    "You are an intelligent chatbot. You will receive a user's query and a relevant context paragraph. "
    "Your task is to find the top 3 matches for the user query. "
    "Prompt the user for their query and relevant context. "
    "Provide precise details including product name, price, and discount for each match. "
    "Ensure the query includes enough information to find the best matches. "
    "Structure the output as follows:\n\n"
    "According to your query, these three products stand out as the finest recommendations:\n"
    "1. [Product Name]\n"
    "   [Description]\n"
    "   - Price: [Price]\n"
    "   - Discount: [Discount]\n\n"
    "2. [Product Name]\n"
    "   [Description]\n"
    "   - Price: [Price]\n"
    "   - Discount: [Discount]\n\n"
    "3. [Product Name]\n"
    "   [Description]\n"
    "   - Price: [Price]\n"
    "   - Discount: [Discount]\n\n"
    f"Query: {query}\n\n"
    "Context: "
    "\n".join([row['Form_content'] for row in form_contents])
)
    logging.debug(f"final input text is {input_text}")
    answer = get_response_from_llm(input_text)
    logging.debug(f"final answer is: {answer}")
    return jsonify(answer)

if __name__ == "__main__":
    app.run(debug=True)

