from flask import Flask, request, jsonify, render_template
from sentence_transformers import SentenceTransformer
import numpy as np
from supabase import create_client, Client

app = Flask(__name__)

# Supabase setup
url = 'https://dlacubasxohtmwnhvwda.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYWN1YmFzeG9odG13bmh2d2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTIwODk2OCwiZXhwIjoyMDM0Nzg0OTY4fQ.tchDJ5Y8t5fNm6zYuzF0B8p1f_IrhfOQMUUQ_7q2ML0'
supabase: Client = create_client(url, key)

# Load the sentence transformer model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Function to fetch all relevant columns from Supabase
def fetch_products():
    response = supabase.table('Products Info').select('*').execute()
    if response.data is not None:
        return response.data
    else:
        error_message = response.get("error", "Unknown error occurred")
        raise Exception(f"Error fetching data: {error_message}")

# Function to convert text to embedding
def text_to_embedding(text):
    return model.encode([text])[0]

# Function to find the most similar product
def find_most_similar_product(user_embedding, product_embeddings, products):
    similarities = np.dot(product_embeddings, user_embedding) / (np.linalg.norm(product_embeddings, axis=1) * np.linalg.norm(user_embedding))
    most_similar_index = np.argmax(similarities)
    most_similar_product = products[most_similar_index]
    similarity = similarities[most_similar_index]
    return most_similar_index, similarity, most_similar_product.get("category")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        products = fetch_products()
        user_embedding = text_to_embedding(data['query'])

        # Combine all columns into a single text for each product
        combined_texts = [
            ' '.join(map(str, [product[col] for col in product if col != 'product_id'])) for product in products
        ]

        # Generate embeddings for combined texts
        product_embeddings = model.encode(combined_texts)

        # Find the most similar product
        most_similar_index, similarity, category = find_most_similar_product(user_embedding, product_embeddings, products)

        most_similar_product = products[most_similar_index]

        # Filter the response to include only the desired fields
        filtered_product = {
            "name": most_similar_product.get("name"),
            "category": category,
            "price": most_similar_product.get("price"),
            "description": most_similar_product.get("description"),
            "discount": most_similar_product.get("discount")
        }

        # Convert similarity to a native Python float
        similarity = float(similarity)

        return jsonify({"most_similar_product": filtered_product, "similarity": similarity})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
