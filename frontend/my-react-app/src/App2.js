import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [files, setFiles] = useState([]);
    const [uploadResponses, setUploadResponses] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFiles([...files, ...selectedFiles]);
    };

    const handleUpload = async () => {
        if (files.length > 0) {
            const formData = new FormData();

            // Use 'files' as the form field name (matches the name used in Flask)
            for (const file of files) {
                formData.append('files', file);
            }

            try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setUploadResponses(response.data);
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }
    };

    return (
        <div className="container">
            <h1>Powerful File Upload and Download</h1>

            <div className="upload-container">
                <input type="file" onChange={handleFileChange} multiple />
                <button onClick={handleUpload}>Upload</button>
            </div>

            {uploadResponses.length > 0 && (
                <div className="file-details">
                    <h3>Uploaded Files:</h3>
                    <ul>
                        {uploadResponses.map((fileResponse, index) => (
                            <li key={index}>
                                <p>File {index + 1}: {fileResponse.filename}</p>
                                <a href={`http://localhost:5000/download/${fileResponse.filename}`} download>
                                    Download File
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
