from flask import Blueprint, jsonify, request
from bot.generator import generate_random_data

# Demo data generation routes for hackathon

demo_routes = Blueprint('demo_routes', __name__)

@demo_routes.route('/generate/fraud_alert', methods=['POST'])
def generate_fraud_alert():
    data = generate_random_data().get('fraud_alerts', [])
    return jsonify({'fraud_alerts': data})

@demo_routes.route('/generate/bank_balance', methods=['POST'])
def generate_bank_balance():
    data = generate_random_data().get('bank_balance', {})
    return jsonify({'bank_balance': data})

@demo_routes.route('/generate/debit_credit_alert', methods=['POST'])
def generate_debit_credit_alert():
    data = generate_random_data().get('debit_credit_alerts', [])
    return jsonify({'debit_credit_alerts': data})

@demo_routes.route('/generate/policy_update', methods=['POST'])
def generate_policy_update():
    data = generate_random_data().get('policy_updates', [])
    return jsonify({'policy_updates': data})