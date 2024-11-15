import React, { useState } from "react";
import axios from "axios";

const PDFUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [collectionName, setCollectionName] = useState("law");
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      setStatusMessage("Please select a PDF file.");
      return;
    }

    if (!collectionName) {
      setStatusMessage("Please provide a collection name.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("collection_name", collectionName);

    try {
      setStatusMessage("Uploading...");
      const response = await axios.post("http://chat_backend/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusMessage(response.data.message || "Upload successful!");
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message || "An error occurred during upload."
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="pdfFile" style={{ display: "block", marginBottom: "5px" }}>
            Select PDF File:
          </label>
          <input type="file" id="pdfFile" accept="application/pdf" onChange={handleFileChange} />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Upload
        </button>
      </form>
      {statusMessage && <p style={{ marginTop: "20px" }}>{statusMessage}</p>}
    </div>
  );
};

export default PDFUpload;
