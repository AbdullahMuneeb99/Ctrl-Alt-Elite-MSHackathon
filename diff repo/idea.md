Tech Guide: https://docs.google.com/document/d/1FppvFG6tUqnC-zBoBPQ8l7KzoMERQDzkmzrfP5YHljI/edit?tab=t.0




💡 Project Title:
"AbleBank Copilot – A Real-Time Accessible Banking Navigator for People with Disabilities"

🧩 Niche Focus:
People with physical, cognitive, or visual impairments often face major accessibility issues in managing finances:
Websites and banking apps are often not screen-reader or keyboard friendly.


Branch locations may be inaccessible physically.


Financial aid and benefits (e.g., SSDI, ABLE accounts) are hard to track or understand.


Real-time alerts (e.g., fraudulent activity, fund availability) are not accessible or customizable in an inclusive way.



🔧 Solution Overview (Pathway + RAG):
A real-time, AI-powered financial copilot that:
Ingests live banking data, government updates, and policy changes.


Makes account info, alerts, and eligibility summaries instantly accessible across multi-modal formats:


Text (simplified or summarized)


Speech (for screen reader support)


Visual (AR/large-text or dyslexia-friendly UI)


Haptic/vibration (for deaf-blind accessibility via wearable extensions)



📱 Use Cases
“Accessible Account Updates”


 “What’s my current balance?”
 “Why did I get charged $35 this morning?”
 — responds in spoken words, plain-text summary, or haptic alert.



“Live Benefit Tracker”


 Tracks SSDI/SSI, ABLE contributions, and flags if nearing a contribution cap (critical for compliance).
 Alerts users immediately when benefit amounts change or are delayed.



“Policy Simplifier”


 Ingests new regulations (e.g., tax credits for assistive tech purchases) and explains in easy-to-read, screen-reader-optimized form.
 Example: “As of May 2025, you may qualify for a $1,500 deduction for hearing aid expenses.”



“Fraud & Lock Alerts – Inclusive Mode”


 If fraud is suspected, Pathway immediately flags the transaction, sends a vibrating alert, and provides an accessible explanation.
 Users can confirm/deny with voice or simplified tap interface.




♿️ Accessibility Highlights
Built-in speech interface with GPT-powered simplification.


Dyslexia-friendly font and AR overlays for those with reading challenges.


Visual-to-haptic alert translator for deaf-blind users.


Plain-language financial education mode with multi-language support.


Autonomy for neurodiverse users: break down complex concepts like “compound interest” or “late fee clause” with real-time analogies.



🏗️ Why This Is Powerful
Combines financial literacy, inclusion, and real-time updates for one of the most excluded groups in banking.


Uses Pathway to stream and index live benefit, transaction, and compliance data — ensuring the copilot always responds with fresh, user-relevant answers.


Can be extended for elderly users, non-literate populations, or rural clients with mobile-only access.



⚙️ Tech Stack
Pathway for live ingestion (bank APIs, benefits APIs, gov announcements)


Whisper (audio) and Text-to-Speech for inclusive I/O


LangChain/OpenAI for question answering + summarization


ARIA-compliant frontend or mobile PWA (React Native or Flutter)


Optional: integrate NFC tap-to-query for blind kiosk banking in future scope

📝 Google Doc Content: AbleBank Copilot – Real-Time Financial Accessibility Assistant

🔷 Project Title
AbleBank Copilot – A Real-Time Accessible Banking Assistant

🧠 One-Sentence Pitch
AbleBank Copilot is a real-time AI assistant designed to make banking and financial management fully accessible to people with disabilities by translating live data into personalized, multimodal, and easy-to-understand insights.

🎯 Problem Statement
Millions of people with disabilities face significant barriers in accessing and understanding financial services:
Banking apps are not always accessible via screen readers or alternate input devices.


Financial concepts and benefit programs are complex and poorly explained.


Real-time updates (like suspicious charges, aid delays, or overdrafts) are hard to interpret or act on.


Communication needs vary widely (visual impairments, cognitive load, auditory limitations, motor disabilities).


Current fintech does not adapt to different accessibility needs in real-time.

💡 Solution Overview
AbleBank Copilot uses Pathway’s real-time data processing and RAG (Retrieval-Augmented Generation) to:
Stream bank transactions, benefit updates, and financial policies.


Index and analyze them instantly.


Output the insights in multiple accessible formats: spoken summaries, plain text, haptic alerts, and simplified visuals.



🧩 Key Features
🔁 Real-Time Financial Monitoring
Streams live transactions, benefits (SSDI/SSI), and gov policy updates.


Reflects changes instantly in the user’s dashboard or chatbot.


🧏 Multimodal Accessible Outputs
Speech (TTS for visually impaired users)


Simple-language summaries (for cognitive accessibility)


Haptic feedback for fraud or critical alerts


Screen-reader optimized UI and large-text views


Optional AAC mode (Augmentative & Alternative Communication)


💬 Plain Language & Concept Simplification
Explains complex terms like “overdraft,” “ACH hold,” or “compound interest” in plain English.


Supports follow-up queries like: “Say that in another way.”


👤 Disability Mode Onboarding
Users customize their experience:
Comprehension level: Basic / Intermediate / Advanced


Preferred input/output mode: Text, Voice, Touch


Condition profile: Visual / Auditory / Neurodiverse / Cognitive


🚨 Real-Time Alerts
Suspicious charges? Missed payment?
 → The Copilot sends alerts in user’s preferred format with simple next-step actions.



🛠️ Tech Stack
Component
Tool/Library
Real-Time Pipeline
Pathway (streaming + indexing)
RAG & LLM Q&A
LangChain + OpenAI / Gemini
Accessibility I/O
gTTS / Whisper / TTS APIs / Haptics.js
Frontend
Streamlit / FastAPI / Flutter Web
Auth/Storage
Supabase / Firebase (optional)


🧱 System Architecture
scss
CopyEdit
[Bank APIs]      [Gov Benefits APIs]     [Policy Docs]
     ↓                     ↓                    ↓
 ➤  Pathway Ingestion + Streaming Indexing (Core Engine)
     ↓
LangChain Q&A over Vector Indexes (RAG)
     ↓
Custom Multimodal Output API
 ↙       ↓         ↓         ↘
TTS   Simplified Text   Haptics    AAC-ready Output


🧪 Demo Plan (Video Walkthrough)
1. Ask: “What’s my current balance?”
 2. Inject: Add a new benefit document or transaction.
 3. Ask again: “What changed in my benefits this month?” → New response appears.
 4. Switch to Accessibility Mode: Visual impairment
 5. Ask: “Explain this $34.95 charge” → Spoken, simplified response
 6. Trigger Fraud: System sends vibration + plain-English alert + 1-tap action option

✅ Deliverables (Hackathon Submission Checklist)
✅ Working Prototype


✅ GitHub Repo with README + Setup Instructions


✅ Demo Video (2–5 mins)


✅ Optional: Slide deck or one-page summary with architecture diagram



🏆 What Makes AbleBank Unique
Value Area
What Sets Us Apart
Accessibility
Multiple disability modes, real-time assistive feedback
Innovation
First-ever banking RAG for the disabled, built on Pathway
Impact
Empowers one of the most underserved fintech audiences
Real-Time Edge
Uses Pathway to deliver instant financial clarity
User Focus
Designed with and for people with access limitations

📂 Project Directory Structure
ablebank-copilot/
├── backend/
│   ├── flask_api/
│   │   ├── app.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── flask_routes.py
│   │   ├── models/
│   │   │   └── __init__.py
│   │   ├── requirements.txt
│   │   └── README.md
│   └── django_api/
│       ├── manage.py
│       ├── django_api/
│       │   ├── __init__.py
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       ├── app/
│       │   ├── migrations/
│       │   ├── __init__.py
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   └── ...
│       ├── requirements.txt
│       └── README.md
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Alerts.js
│   │   │   ├── AccessibilitySettings.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   └── utils/
│   │       └── api.js
│   ├── package.json
│   └── README.md
├── docs/
│   └── architecture.md
├── idea.md
└── README.md














