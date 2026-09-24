import { useState } from 'react';
import classes from './CreateModal.module.css';
import { API_BASE } from '../api';

function CreateModal({ onClose, onCreated }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API_BASE}/api/todos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({text: title})
        })
            .then(res => {
                if (res.ok) {
                    onCreated();
                    onClose();
                }
            })
            .catch(err => console.error("Error creating todo:", err));
    };

    return (
        <div className={classes.backdrop} onClick={onClose}>
            <div className={classes.modal}>
                <form onSubmit={handleSubmit} className={classes.form} onClick={(e) => e.stopPropagation()}>
                    <h2>Create New Task</h2>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.actions} style={{marginTop: '1rem'}}>
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Save Todo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateModal;