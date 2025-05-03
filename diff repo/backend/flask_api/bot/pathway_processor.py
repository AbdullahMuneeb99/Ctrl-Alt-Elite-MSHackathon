import json
from datetime import datetime, timedelta
import os
import logging
from openai import OpenAI
import numpy as np
from typing import List, Dict, Any

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PathwayProcessor:
    def __init__(self):
        self.data_dir = "data"
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
        self.data_file = os.path.join(self.data_dir, "data_log.txt")
        self.embeddings_file = os.path.join(self.data_dir, "embeddings.json")
        self.setup_pathway()
        self.client = OpenAI()

    def setup_pathway(self):
        try:
            # Create or clear the data file
            with open(self.data_file, 'w') as f:
                f.write("")
            # Initialize embeddings file
            with open(self.embeddings_file, 'w') as f:
                json.dump([], f)
            logger.info("Data storage initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing data storage: {str(e)}")
            raise

    def _get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text using OpenAI API"""
        try:
            response = self.client.embeddings.create(
                model="text-embedding-3-small",
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error getting embedding: {str(e)}")
            return []

    def _cosine_similarity(self, a: List[float], b: List[float]) -> float:
        """Calculate cosine similarity between two vectors"""
        if not a or not b:
            return 0.0
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def process_data(self, data):
        """Process incoming data"""
        try:
            rows = []
            
            # Process bank balance
            if 'bank_balance' in data:
                row = {
                    'type': 'balance',
                    'amount': float(data['bank_balance']['balance']),
                    'category': 'bank_balance',
                    'severity': 'normal',
                    'description': f"Current balance: {data['bank_balance']['balance']}",
                    'timestamp': str(data['bank_balance']['last_updated'])
                }
                rows.append(row)
                self._store_with_embedding(row)
            
            # Process transactions
            if 'transactions' in data:
                for transaction in data['transactions']:
                    row = {
                        'type': transaction['type'],
                        'amount': float(transaction['amount']),
                        'category': transaction['category'],
                        'severity': 'normal',
                        'description': f"{transaction['type']} at {transaction['merchant']}",
                        'timestamp': str(transaction['timestamp'])
                    }
                    rows.append(row)
                    self._store_with_embedding(row)
            
            # Process fraud alerts
            if 'fraud_alerts' in data:
                for alert in data['fraud_alerts']:
                    row = {
                        'type': 'alert',
                        'amount': 0.0,
                        'category': alert['type'],
                        'severity': alert['severity'],
                        'description': alert['description'],
                        'timestamp': str(alert['timestamp'])
                    }
                    rows.append(row)
                    self._store_with_embedding(row)
            
            # Process policy updates
            if 'policy_updates' in data:
                for policy in data['policy_updates']:
                    row = {
                        'type': 'policy',
                        'amount': 0.0,
                        'category': policy['type'],
                        'severity': 'info',
                        'description': policy['description'],
                        'timestamp': str(policy['timestamp'])
                    }
                    rows.append(row)
                    self._store_with_embedding(row)

            if rows:
                # Append new rows to the data file
                with open(self.data_file, 'a') as f:
                    for row in rows:
                        f.write(json.dumps(row) + '\n')
                logger.info(f"Processed {len(rows)} rows of data")
            else:
                logger.warning("No data to process")

        except Exception as e:
            logger.error(f"Error processing data: {str(e)}")
            raise

    def _store_with_embedding(self, row: Dict[str, Any]):
        """Store data with its embedding"""
        try:
            # Create a text representation of the data
            text = f"{row['type']} {row['description']} {row['category']} {row['severity']}"
            embedding = self._get_embedding(text)
            
            # Load existing embeddings
            with open(self.embeddings_file, 'r') as f:
                embeddings = json.load(f)
            
            # Add new embedding
            embeddings.append({
                'data': row,
                'embedding': embedding
            })
            
            # Save updated embeddings
            with open(self.embeddings_file, 'w') as f:
                json.dump(embeddings, f)
                
        except Exception as e:
            logger.error(f"Error storing embedding: {str(e)}")

    def _read_data(self):
        """Read all data from the file"""
        try:
            with open(self.data_file, 'r') as f:
                return [json.loads(line) for line in f if line.strip()]
        except Exception as e:
            logger.error(f"Error reading data: {str(e)}")
            return []

    def get_recent_transactions(self, hours=24):
        """Get recent transactions"""
        try:
            cutoff_time = (datetime.now() - timedelta(hours=hours)).isoformat()
            all_data = self._read_data()
            return [
                item for item in all_data
                if item['timestamp'] >= cutoff_time and item['type'] in ['debit', 'credit']
            ]
        except Exception as e:
            logger.error(f"Error getting recent transactions: {str(e)}")
            return []

    def get_fraud_alerts(self, severity=None):
        """Get fraud alerts"""
        try:
            all_data = self._read_data()
            alerts = [item for item in all_data if item['type'] == 'alert']
            if severity:
                alerts = [alert for alert in alerts if alert['severity'] == severity]
            return alerts
        except Exception as e:
            logger.error(f"Error getting fraud alerts: {str(e)}")
            return []

    def get_balance_trend(self):
        """Calculate balance trend"""
        try:
            all_data = self._read_data()
            return [item for item in all_data if item['type'] == 'balance']
        except Exception as e:
            logger.error(f"Error getting balance trend: {str(e)}")
            return []

    def query_rag(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Query the RAG system"""
        try:
            # Get embedding for the query
            query_embedding = self._get_embedding(query)
            
            # Load embeddings
            with open(self.embeddings_file, 'r') as f:
                embeddings = json.load(f)
            
            # Calculate similarities
            similarities = []
            for item in embeddings:
                similarity = self._cosine_similarity(query_embedding, item['embedding'])
                similarities.append((similarity, item['data']))
            
            # Sort by similarity and get top k
            similarities.sort(reverse=True, key=lambda x: x[0])
            top_results = [item[1] for item in similarities[:top_k]]
            
            return top_results
            
        except Exception as e:
            logger.error(f"Error querying RAG: {str(e)}")
            return []

# Create a singleton instance
pathway_processor = PathwayProcessor() 