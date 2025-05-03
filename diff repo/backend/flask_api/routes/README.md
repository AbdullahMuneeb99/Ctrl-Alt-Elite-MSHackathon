# API Routes

This directory contains all API route definitions for the AbleBank Copilot Flask backend.

## Modules

### flask_routes.py

Contains the primary API endpoints for the banking interface:

- **Balance Endpoint**: Retrieves current account balance information
- **Transaction History**: Access to recent transaction data
- **Fraud Alerts**: Endpoints for retrieving potential fraud alerts
- **Balance Trends**: Historical balance data for visualization

### demo_routes.py

Specialized routes for demonstration purposes:

- **Data Generation**: Endpoints to create simulated banking data
- **Reset Demo**: Routes to reset the demonstration to its initial state
- **Mock Authentication**: Simulated authentication for demo purposes

### init_routes.py

Initialization and setup routes:

- **System Initialization**: Endpoints to initialize the banking data system
- **Configuration**: Routes to update system configuration
- **Health Checks**: Status endpoints to verify system health

## Usage

These routes are automatically loaded by the Flask application in `app.py` and follow RESTful principles. The route structure follows common patterns:

- GET requests for data retrieval
- POST requests for data creation/processing
- PUT requests for updates
- DELETE requests for data deletion

## Authentication

In a production environment, these routes would require proper authentication. For the demo version, authentication is simulated.

## Error Handling

All routes include standardized error handling with appropriate HTTP status codes and JSON response formats for API consistency.