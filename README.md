# AskMyDocs

An AI powered PDF chatbot that allows you to upload PDF documents and ask questions about their content using Google Gemini API.

## Features

-Upload PDF documents
-Ask questions about the uploaded content
-Powered by Google Gemini AI
-Beautiful and responsive UI
-Fast vector-based document search using FAISS

## Tech Stack

### Backend
- FastAPI
- LangChain
- Google Gemini API
- FAISS (Vector Store)
- Python 3.11

### Frontend
- React
- Vite

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 16+
- Google API Key (for Gemini)

### Backend Setup

1. Navigate to the Backend directory:
'''
cd Backend
'''

2. Create a virtual environment:
'''
python3.11 -m venv venv
source venv/bin/activate
'''

3. Install dependencies:
'''bash
pip install -r requirements.txt
'''

4. Create a '.env' file:
'''bash
cp .env.example .env
'''

5. Add your Google API key to '.env':
'''
GOOGLE_API_KEY=your_actual_api_key_here
'''

6. Run the server:
'''bash
python3.11 -m uvicorn main:app --reload
'''

The backend will run on 'http://localhost:8000'

### Frontend Setup

1. Navigate to the Frontend directory:
'''
cd Frontend
'''

2. Install dependencies:
'''
npm install
'''

3. Run the development server:
'''
npm run dev
'''

The frontend will run on 'http://localhost:5173'

## Usage

1. Start both backend and frontend servers
2. Open your browser to 'http://localhost:5173'
3. Upload a PDF document
4. Ask questions about the document content
5. Get AI-powered answers instantly!