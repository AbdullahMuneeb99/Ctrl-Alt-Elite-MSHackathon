import os
import json
from openai import OpenAI
from datetime import datetime, timedelta
import glob

class LLMProcessor:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError("OpenAI API key is required")
        self.client = OpenAI(api_key=self.api_key)
        self.data_dir = "data"
        
    def _load_recent_data(self, hours=24):
        """Load data from the last N hours for RAG context"""
        recent_files = []
        cutoff_time = datetime.now() - timedelta(hours=hours)
        
        for file in glob.glob(os.path.join(self.data_dir, "data_*.json")):
            # Extract timestamp from filename
            timestamp_str = file.split('_')[1].split('.')[0]
            file_time = datetime.strptime(timestamp_str, "%Y%m%d_%H%M%S")
            
            if file_time >= cutoff_time:
                with open(file, 'r') as f:
                    recent_files.append(json.load(f))
        
        return recent_files

    def process_query(self, query):
        """Process a user query using RAG and OpenAI"""
        # Load recent data for context
        context_data = self._load_recent_data()
        
        # Format context for the prompt
        context_str = json.dumps(context_data, indent=2)
        
        # Create the prompt with context
        prompt = f"""Based on the following financial data context, answer the user's query.
        
Context Data:
{context_str}

User Query: {query}

Please provide a detailed response based on the available data. If the query requires information not present in the context, please state that clearly."""

        # Call OpenAI API
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful financial assistant that analyzes banking and transaction data."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content

# Create a singleton instance
llm_processor = LLMProcessor() 