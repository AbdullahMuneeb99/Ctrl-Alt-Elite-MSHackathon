import random
from datetime import datetime, timedelta
import json
import os
import logging
from .pathway_processor import pathway_processor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DataGenerator:
    def __init__(self):
        self.data_dir = "data"
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
        
        self.merchants = ["Amazon", "Walmart", "Target", "Costco", "Best Buy"]
        self.transaction_types = ["debit", "credit"]
        self.categories = ["shopping", "groceries", "electronics", "entertainment"]
        self.alert_types = ["suspicious_location", "large_transaction", "multiple_attempts"]
        self.alert_severities = ["low", "medium", "high"]
        self.policy_types = ["spending_limit", "location_restriction", "merchant_block"]
        
        self.current_balance = 10000.0  # Starting balance

    def generate_random_data(self):
        """Generate a batch of random financial data"""
        try:
            current_time = datetime.now()
            
            # Generate bank balance
            bank_data = {
                "bank_balance": {
                    "balance": round(self.current_balance, 2),
                    "last_updated": current_time.isoformat()
                }
            }
            
            # Generate transactions
            num_transactions = random.randint(1, 5)
            transactions = []
            
            for _ in range(num_transactions):
                amount = round(random.uniform(10, 1000), 2)
                trans_type = random.choice(self.transaction_types)
                
                if trans_type == "debit":
                    self.current_balance -= amount
                else:
                    self.current_balance += amount
                
                transaction = {
                    "type": trans_type,
                    "amount": amount,
                    "category": random.choice(self.categories),
                    "merchant": random.choice(self.merchants),
                    "timestamp": (current_time - timedelta(minutes=random.randint(1, 60))).isoformat()
                }
                transactions.append(transaction)
            
            bank_data["transactions"] = transactions
            
            # Generate fraud alerts
            if random.random() < 0.3:  # 30% chance of generating alerts
                num_alerts = random.randint(1, 3)
                alerts = []
                
                for _ in range(num_alerts):
                    alert = {
                        "type": random.choice(self.alert_types),
                        "severity": random.choice(self.alert_severities),
                        "description": "Potential fraudulent activity detected",
                        "timestamp": (current_time - timedelta(minutes=random.randint(1, 30))).isoformat()
                    }
                    alerts.append(alert)
                
                bank_data["fraud_alerts"] = alerts
            
            # Generate policy updates
            if random.random() < 0.2:  # 20% chance of generating policy updates
                num_policies = random.randint(1, 2)
                policies = []
                
                for _ in range(num_policies):
                    policy = {
                        "type": random.choice(self.policy_types),
                        "description": "Updated security policy",
                        "timestamp": (current_time - timedelta(minutes=random.randint(1, 15))).isoformat()
                    }
                    policies.append(policy)
                
                bank_data["policy_updates"] = policies
            
            # Store and process the generated data
            self._store_data(bank_data)
            pathway_processor.process_data(bank_data)
            
            logger.info("Successfully generated and processed new data")
            return bank_data
            
        except Exception as e:
            logger.error(f"Error generating data: {str(e)}")
            raise

    def _store_data(self, data):
        """Store generated data to a file"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"data_{timestamp}.json"
            filepath = os.path.join(self.data_dir, filename)
            
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
            
            logger.info(f"Data stored successfully in {filepath}")
            
        except Exception as e:
            logger.error(f"Error storing data: {str(e)}")
            raise

# Create a singleton instance
data_generator = DataGenerator()

def generate_random_data():
    return data_generator.generate_random_data()