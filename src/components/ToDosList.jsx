import ToDo from './ToDo';
import classes from './ToDosList.module.css';

function ToDosList({
                       todos,
                       onDelete,
                       onDeleteFile,
                       onUploadTrigger,
                       isUploading,
                       fileInputRefs,
                       handleFileChange
                   }) {
    return (
        <>
            {todos.length > 0 && (
                <ul className={classes.toDosList}>
                    {todos.map((toDo) => (
                        <ToDo
                            key={toDo.id}
                            id={toDo.id}
                            text={toDo.text}
                            files={toDo.files || []}
                            onDelete={onDelete}
                            onDeleteFile={onDeleteFile}
                            onUploadTrigger={onUploadTrigger}
                            isUploading={isUploading}
                            fileInputRefs={fileInputRefs}
                            handleFileChange={handleFileChange}
                        />
                    ))}
                </ul>
            )}
        </>
    );
}

export default ToDosList;