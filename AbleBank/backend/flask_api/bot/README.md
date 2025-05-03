# Bot Components

This directory contains the core AI and data processing components for the AbleBank Copilot.

## Components

### generator.py

The `generator.py` module simulates banking transaction data for demonstration purposes. It creates realistic transaction records with:
- Random merchants
- Transaction amounts
- Categories
- Timestamps
- Transaction types (credit/debit)

### pathway_processor.py

Despite its name, this is a custom implementation (not using the actual Pathway library) that provides:
- Data storage in text files and JSON format
- Embedding generation using OpenAI API
- RAG (Retrieval-Augmented Generation) query capabilities
- Transaction data processing and retrieval methods

Key methods:
- `process_data()`: Processes transaction data and creates embeddings
- `query_rag()`: Performs retrieval-augmented generation on banking data
- `get_recent_transactions()`: Retrieves recent transaction history
- `get_fraud_alerts()`: Identifies potential fraudulent transactions
- `get_balance_trend()`: Calculates balance trends over time

### llm_processor.py

This module handles interactions with Large Language Models (OpenAI) for:
- Natural language processing
- Query understanding
- Response generation
- Context-aware banking assistance

## Data Flow

1. The `generator.py` creates simulated transaction data
2. The `pathway_processor.py` processes this data and stores it
3. The `llm_processor.py` enriches responses with natural language capabilities
4. API endpoints in the main application access these components to serve requests