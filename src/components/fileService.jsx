import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/files';

export const fileService = {
    getFiles: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    uploadFiles: async (fileList) => {
        const formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
        }
        const response = await axios.post(API_BASE_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    getFilenameFromUrl: (url) => {
        return url.substring(url.lastIndexOf('/') + 1);
    }
};