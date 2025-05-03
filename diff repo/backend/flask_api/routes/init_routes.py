from flask import Blueprint, jsonify, request
from bot.generator import generate_random_data
from bot.llm_processor import llm_processor
from bot.pathway_processor import pathway_processor
from datetime import datetime, timedelta

init_routes = Blueprint('init_routes', __name__)

@init_routes.route('/init', methods=['GET'])
def get_initial_data():
    # Generate and return initial data
    data = generate_random_data()
    return jsonify(data)

@init_routes.route('/query', methods=['POST'])
def process_query():
    try:
        data = request.get_json()
        query = data.get('query')
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
            
        # Process the query using LLM
        response = llm_processor.process_query(query)
        
        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@init_routes.route('/transactions/recent', methods=['GET'])
def get_recent_transactions():
    try:
        hours = request.args.get('hours', default=24, type=int)
        transactions = pathway_processor.get_recent_transactions(hours)
        return jsonify(transactions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@init_routes.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        severity = request.args.get('severity', default=None)
        alerts = pathway_processor.get_fraud_alerts(severity)
        return jsonify(alerts)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@init_routes.route('/balance/trend', methods=['GET'])
def get_balance_trend():
    try:
        trend = pathway_processor.get_balance_trend()
        return jsonify(trend)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@init_routes.route('/chat', methods=['POST'])
def chat_response():
    user_input = request.json.get('message', '')
    # Respond with a generic code/response
    return jsonify({'response': 'This is a generic response to: ' + user_input})