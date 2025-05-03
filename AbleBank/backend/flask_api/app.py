from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from bot.generator import data_generator
from bot.pathway_processor import pathway_processor
from openai import OpenAI

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI()

@app.route('/init', methods=['GET'])
def initialize_data():
    """Generate and store initial data"""
    try:
        data = data_generator.generate_random_data()
        return jsonify({"status": "success", "data": data})
    except Exception as e:
        logger.error(f"Error initializing data: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/transactions/recent', methods=['GET'])
def get_recent_transactions():
    """Get recent transactions"""
    try:
        hours = request.args.get('hours', default=24, type=int)
        transactions = pathway_processor.get_recent_transactions(hours)
        return jsonify({"status": "success", "transactions": transactions})
    except Exception as e:
        logger.error(f"Error getting recent transactions: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/alerts', methods=['GET'])
def get_alerts():
    """Get fraud alerts"""
    try:
        severity = request.args.get('severity')
        alerts = pathway_processor.get_fraud_alerts(severity)
        return jsonify({"status": "success", "alerts": alerts})
    except Exception as e:
        logger.error(f"Error getting alerts: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/balance/trend', methods=['GET'])
def get_balance_trend():
    """Get balance trend"""
    try:
        trend = pathway_processor.get_balance_trend()
        return jsonify({"status": "success", "trend": trend})
    except Exception as e:
        logger.error(f"Error getting balance trend: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/generate/transaction', methods=['POST'])
def generate_transaction():
    """Generate a new transaction"""
    try:
        data = data_generator.generate_random_data()
        return jsonify({"status": "success", "data": data})
    except Exception as e:
        logger.error(f"Error generating transaction: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/generate/fraud_alert', methods=['POST'])
def generate_fraud_alert():
    """Generate a new fraud alert"""
    try:
        data = data_generator.generate_random_data()
        return jsonify({"status": "success", "data": data})
    except Exception as e:
        logger.error(f"Error generating fraud alert: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/query', methods=['POST'])
def query_rag():
    """Query the RAG system and get a response"""
    try:
        data = request.get_json()
        query = data.get('query', '')
        top_k = data.get('top_k', 3)
        
        if not query:
            return jsonify({"status": "error", "message": "Query is required"}), 400
        
        # Get relevant data from RAG
        relevant_data = pathway_processor.query_rag(query, top_k)
        
        # Prepare context for LLM
        context = "\n".join([
            f"Type: {item['type']}, Description: {item['description']}, "
            f"Amount: {item['amount']}, Category: {item['category']}, "
            f"Severity: {item['severity']}, Timestamp: {item['timestamp']}"
            for item in relevant_data
        ])
        
        # Generate response using LLM
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a financial assistant. Use the provided context to answer questions about transactions, balances, and alerts."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        return jsonify({
            "status": "success",
            "query": query,
            "relevant_data": relevant_data,
            "response": response.choices[0].message.content
        })
        
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)