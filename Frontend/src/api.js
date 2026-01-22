export const uploadPDF = async (file) => {
const formData = new FormData();
formData.append("file", file);


await fetch("http://localhost:8000/upload", {
method: "POST",
body: formData
});
};


export const askQuestion = async (question) => {
const res = await fetch(
`http://localhost:8000/ask?question=${question}`
);
return res.json();
};