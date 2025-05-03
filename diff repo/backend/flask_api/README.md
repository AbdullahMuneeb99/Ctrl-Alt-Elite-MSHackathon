# Flask API for AbleBank Copilot

This API provides endpoints for real-time accessible banking features.

## Project Overview

AbleBank Copilot is a banking assistant that leverages AI technologies to provide accessible banking services. The backend is built with Flask and implements a custom RAG (Retrieval-Augmented Generation) system that simulates integration with banking data systems.

## Features

- **Transaction Generation**: Simulated transaction data creation
- **Banking Data Retrieval**: Fetch account balances, transaction history, and fraud alerts
- **RAG-based Querying**: Natural language queries for banking information
- **REST API Endpoints**: Access banking data through standardized API endpoints

## Project Structure

- `app.py`: Main Flask application entry point
- `bot/`: Core logic for data processing and AI interactions
  - `generator.py`: Simulated banking data generation
  - `pathway_processor.py`: Custom implementation for data storage and retrieval
  - `llm_processor.py`: LLM integration for natural language processing
- `routes/`: API endpoint definitions
  - `flask_routes.py`: Primary API routes
  - `demo_routes.py`: Demo-specific endpoints
  - `init_routes.py`: Initialization routes
- `data/`: Storage for banking data and embeddings
- `models/`: Data models and schemas

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set up environment variables (see Environment Setup section)
4. Run the application:
   ```
   python app.py
   ```

## Environment Setup

Create a `.env` file with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/balance` | GET | Get account balance |
| `/api/recent-transactions` | GET | Get recent transactions |
| `/api/fraud-alerts` | GET | Get fraud alerts |
| `/api/query` | POST | Perform RAG query |
| `/api/init` | POST | Initialize demo data |

## Data Processing Flow

1. Simulated transaction data is generated
2. Data is processed by the PathwayProcessor
3. Embeddings are created and stored
4. API endpoints retrieve data based on user requests

## Technology Stack

- **Flask**: Web framework
- **OpenAI API**: For embeddings and completions
- **Custom RAG System**: For AI-powered banking assistance
- **JSON Storage**: For demo data persistence

## License

[License information]

## Contact

[Contact information]
