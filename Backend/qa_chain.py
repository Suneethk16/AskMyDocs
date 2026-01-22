from langchain_classic.chains.retrieval_qa.base import RetrievalQA
from langchain_classic.llms.base import LLM
from vector_store import get_vector_store
import google.genai as genai
import os
from typing import Optional, List

class GeminiLLM(LLM):
    @property
    def _llm_type(self) -> str:
        return "gemini"
    
    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt
        )
        return response.text

def get_qa_chain():
    db = get_vector_store()
    if db is None:
        raise ValueError("Vector store not initialized. Upload a PDF first.")
    
    llm = GeminiLLM()
    qa = RetrievalQA.from_chain_type(
        llm=llm,    
        retriever=db.as_retriever(),
        chain_type="stuff"
    )
    return qa