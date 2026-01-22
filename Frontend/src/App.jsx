import { useState } from "react";
import { uploadPDF, askQuestion } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [askLoading, setAskLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploadLoading(true);
    await uploadPDF(file);
    setUploadLoading(false);
    alert("PDF uploaded successfully!");
  };

  const handleAsk = async () => {
    if (!question) return;
    setAskLoading(true);
    const res = await askQuestion(question);
    setAnswer(res.answer);
    setAskLoading(false);
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #b8b9c0, #e4ddeb)",
      overflow: "hidden"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "520px",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 25px 70px rgba(0,0,0,0.35)"
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#667eea",
          fontSize: "32px"
        }}>
          📄 AskMyDocs
        </h1>

        {/* Upload Section */}
        <div style={{ marginBottom: "30px" }}>
          <label style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "600"
          }}>
            Upload PDF Document
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              width: "100%",
              padding: "12px",
              border: "2px dashed #667eea",
              borderRadius: "10px",
              marginBottom: "12px"
            }}
          />

          <button
            onClick={handleUpload}
            disabled={!file || uploadLoading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: file && !uploadLoading ? "pointer" : "not-allowed",
              opacity: file && !uploadLoading ? 1 : 0.6
            }}
          >
            {uploadLoading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>

        {/* Question Section */}
        <div>
          <label style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "600"
          }}>
            Ask a Question
          </label>

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "10px",
              marginBottom: "12px"
            }}
          />

          <button
            onClick={handleAsk}
            disabled={!question || askLoading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#764ba2",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: question && !askLoading ? "pointer" : "not-allowed",
              opacity: question && !askLoading ? 1 : 0.6
            }}
          >
            {askLoading ? "Thinking..." : "Ask Question"}
          </button>
        </div>

        {/* Answer Section */}
        {answer && (
          <div style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "10px",
            borderLeft: "5px solid #667eea"
          }}>
            <h3 style={{ marginBottom: "10px", color: "#667eea" }}>
              Answer:
            </h3>
            <p style={{ lineHeight: "1.6" }}>
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
