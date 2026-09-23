import {API_BASE} from './api';
import toDoClasses from './ToDo.module.css';

function ToDo({
                  id,
                  text,
                  files = [],
                  onDelete,
                  onDeleteFile,
                  onUploadTrigger,
                  isUploading,
                  fileInputRefs,
                  handleFileChange
              }) {

    return (
        <li className={toDoClasses.toDo}>

            <p className={toDoClasses.text}>
                {text}
            </p>

            {files && files.length > 0 && (
                <>
                    <h4 className={toDoClasses.attachmentsTitle}>
                        Attachments
                    </h4>

                    <div className={toDoClasses.filesContainer}>
                        {files.map((file) => (
                            <div key={file.id} className={toDoClasses.fileRow}>
                                <a
                                    href={`${API_BASE}/api/files/id/${file.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className={toDoClasses.fileLink}
                                >
                                    📄 {file.filename}
                                </a>
                                <button
                                    onClick={() => onDeleteFile(file.id, id)}
                                    className={toDoClasses.inlineDeleteFileButton}
                                    title="Delete this file"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className={toDoClasses.buttonGroup}>
                <button
                    className={toDoClasses.deleteButton}
                    onClick={() => onDelete(id)}
                >
                    Delete Todo
                </button>

                <input
                    type="file"
                    multiple
                    style={{display: 'none'}}
                    ref={(el) => {
                        if (fileInputRefs && fileInputRefs.current) {
                            fileInputRefs.current[id] = el;
                        }
                    }}
                    onChange={(e) => handleFileChange(e, id)}
                />

                <button
                    className={toDoClasses.uploadButton}
                    onClick={() => onUploadTrigger(id)}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </li>
    );
}

export default ToDo;