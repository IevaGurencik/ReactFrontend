import ToDosList from "../components/ToDosList";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import api from "../components/api";

function ToDosPage() {
    const [todos, setTodos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRefs = useRef({});
    const {reloadKey} = useOutletContext();

    const loadData = () => {
        api.get('/api/todos')
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => console.error("Fetch error:", err));
    };

    useEffect(() => {
        loadData();
    }, [reloadKey]);

    const handleDelete = (id) => {
        api.delete(`/api/todos/${id}`)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            })
            .catch(err => console.error("Delete error:", err));
    };

    const handleFileChange = (event, todoId) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length === 0) return;

        setIsUploading(true);

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        formData.append('todoId', todoId);

        api.post('/api/files', formData)
            .then(() => {
                loadData();
                if (fileInputRefs.current[todoId]) {
                    fileInputRefs.current[todoId].value = "";
                }
            })
            .catch(err => console.error("Upload error:", err))
            .finally(() => setIsUploading(false));
    };

    const triggerFileSelect = (todoId) => {
        if (fileInputRefs.current[todoId]) {
            fileInputRefs.current[todoId].click();
        }
    };

    const handleDeleteFile = (fileId, todoId) => {
        api.delete(`/api/files/id/${fileId}`)
            .then(() => {
                setTodos(prevTodos => prevTodos.map(todo => {
                    if (todo.id === todoId) {
                        return {
                            ...todo,
                            files: todo.files.filter(file => file.id !== fileId)
                        };
                    }
                    return todo;
                }));
            })
            .catch(err => console.error("Error deleting file:", err));
    };

    return (
        <main className="todos-page-main">
            <ToDosList
                todos={todos}
                onDelete={handleDelete}
                onDeleteFile={handleDeleteFile}
                onUploadTrigger={triggerFileSelect}
                isUploading={isUploading}
                fileInputRefs={fileInputRefs}
                handleFileChange={handleFileChange}
            />
        </main>
    );
}

export default ToDosPage;