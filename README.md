# Ctrl-Alt-Elite-MSHackathon

# AbleBank Copilot

A Real-Time Accessible Banking Assistant Powered by Pathway and Large Language Models (LLMs)

## Problem Statement

Millions of people with disabilities face significant barriers in accessing financial services:

- Banking interfaces are often not accessible (e.g., not screen-reader compatible, visually overwhelming, or lacking multimodal support)
- Real-time support for government benefits (e.g., SSDI, ABLE) is lacking
- Financial documents and transaction data are difficult to interpret
- No AI tools exist that adapt explanations to specific accessibility needs (visual, cognitive, hearing)

Current AI systems and banking applications are not designed for accessibility-first financial clarity. AbleBank Copilot addresses this gap using real-time streaming and adaptive intelligence.

## Our Solution

AbleBank Copilot is a real-time, AI-powered financial assistant designed specifically for people with disabilities. It:

- Ingests live data from transaction feeds, government benefit updates, and banking documents
- Automatically indexes new information using Pathway’s real-time ETL and vector embedding engine
- Uses retrieval-augmented generation (RAG) to respond to user queries with the latest information
- Adapts every response based on the user’s selected accessibility mode (e.g., visual impairment, hearing loss, cognitive needs)
- Delivers outputs in text, voice (text-to-speech), simplified language, and vibration-based feedback (simulated)

## Architecture Overview

Data Flow:

1. User uploads or triggers ingestion of new financial or policy documents (e.g., benefits statement, policy update)
2. Pathway ingests and indexes this data using streaming ETL and vector search
3. LangChain (or another LLM framework) performs retrieval-augmented generation using the updated data
4. The frontend presents the result using a mode-appropriate output (TTS, screen-reader-friendly text, simplified explanation, etc.)

[Bank & Gov Benefit APIs / Files]
↓
Pathway Streaming ETL Engine
↓
Vector Embeddings + Indexing (on-the-fly)
↓
LangChain RAG Pipeline (LLM)
↓
Accessible Output Interface (TTS, Text, Haptic, Visual)


## Tech Stack

- Pathway: Streaming data ingestion and real-time indexing
- LangChain + OpenAI/Gemini: RAG-based natural language query response
- React + Tailwind CSS: Accessible user interface
- Firebase Hosting: Live deployment and optional database
- Optional: Firebase Firestore for saving user preferences and onboarding data

## Real-Time Functionality

- New documents (e.g., a government benefit change or a new bank charge) are immediately processed by Pathway
- LLM queries made just seconds later reflect the most recent updates
- There is no manual refresh or re-indexing required to update AI responses
- A before/after demo is provided to illustrate this functionality clearly

## Unique Features

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| Disability Mode Profiles       | Users can choose visual, hearing, or cognitive modes for customized output |
| Real-Time Updates              | Uses Pathway to handle continuous data updates and reflect them instantly  |
| Simplified Financial Concepts  | Auto-simplifies financial terms and policies into plain English            |
| Multimodal Accessibility       | Supports screen readers, text-to-speech, large fonts, and simulated haptics|
| Secure Simulation              | Uses mock datasets to simulate secure financial workflows                  |

## Impact

AbleBank Copilot empowers people with disabilities to manage finances independently. It makes banking information accessible in real time and lays the groundwork for inclusive, AI-enhanced financial products. The model can be extended to:

- Neurodivergent individuals
- Elderly populations
- ESL speakers and underserved digital communities

## Demo Highlights

1. User asks a question about their benefit or account
2. A new document is uploaded to simulate a policy update or transaction change
3. User re-asks the question and receives an updated response in real time
4. Accessibility mode is changed mid-demo to visual impairment
5. Response is delivered using voice output (TTS) or simplified formatting

## Evaluation Criteria Alignment

| Evaluation Area         | Implementation Summary                                                           |
|-------------------------|----------------------------------------------------------------------------------|
| Real-Time Functionality | Pathway ingests and indexes new documents instantly                             |
| Technical Implementation| LangChain integrates with real-time vector store from Pathway                   |
| Creativity              | First accessibility-first RAG fintech assistant focused on disabled users       |
| Impact & Usefulness     | Fills a real-world gap in accessible financial services                         |
| User Experience         | Clear UI with selectable accessibility modes, responsive to user feedback       |

## Project Links

- GitHub Repository: https://github.com/AbdullahMuneeb99/Ctrl-Alt-Elite-MSHackathon
- Team Members: Taha Imran, Abdullah Muneeb, Dibyasha Sharma, Rohan Kulkarni, Om Prakash Gunja

## Future Scope

- Integrate with real financial APIs for live data ingestion
- Extend onboarding and user profile management with Firebase Auth
- Add advanced agentic logic (LangGraph, CrewAI) for multi-step reasoning
- Develop mobile version with haptic hardware integration
- Conduct usability testing with real users in the disability community
