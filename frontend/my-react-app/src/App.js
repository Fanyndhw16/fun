import React, { useState } from 'react';
import { Button, Container, Typography, TextField, List, ListItem, ListItemText, Link } from '@mui/material';
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
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Drive_IN APP
            </Typography>

            <div style={{ marginBottom: '20px' }}>
                <input type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} id="upload-input" />
                <label htmlFor="upload-input">
                    <Button variant="outlined" component="span">
                        Choose Files
                    </Button>
                </label>
                <Button variant="contained" onClick={handleUpload} style={{ marginLeft: '8px' }}>
                    Upload
                </Button>
            </div>

            {uploadResponses.length > 0 && (
                <div>
                    <Typography variant="h6" gutterBottom>
                        Uploaded Files:
                    </Typography>
                    <List>
                        {uploadResponses.map((fileResponse, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={fileResponse.filename} />
                                <Link href={`http://localhost:5000/download/${fileResponse.filename}`} download>
                                    Download
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </Container>
    );
}

export default App;
