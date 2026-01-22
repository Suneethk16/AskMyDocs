from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
from pdf_utils import load_and_split_pdf
from vector_store import create_vector_store
from qa_chain import get_qa_chain
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    path = f"temp_{file.filename}"
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    docs = load_and_split_pdf(path)
    create_vector_store(docs)


    return {"message": "PDF processed successfully"}




@app.get("/ask")
def ask_question(question: str):
    qa = get_qa_chain()
    answer = qa.invoke(question)
    return {"answer": answer["result"]}