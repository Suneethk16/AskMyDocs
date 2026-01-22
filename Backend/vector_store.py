from langchain_community.vectorstores import FAISS
import google.genai as genai
import os

vector_db = None

class SimpleEmbeddings:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
    
    def __call__(self, text):
        result = self.client.models.embed_content(
            model='models/text-embedding-004',
            contents=text
        )
        return result.embeddings[0].values
    
    def embed_documents(self, texts):
        return [self(text) for text in texts]
    
    def embed_query(self, text):
        return self(text)

def create_vector_store(docs):
    global vector_db
    embeddings = SimpleEmbeddings()
    vector_db = FAISS.from_documents(docs, embeddings)




def get_vector_store():
    return vector_db