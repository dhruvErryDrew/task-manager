import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {

    function getPriorityColor(priority) {
        switch (priority) {
            case 'HIGH': return '#D00000';
            case 'MEDIUM': return '#FFA500';
            case 'LOW': return '#009900';
            default: return '#666';
        }
    }

    function formatDate(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    function isOverdue(dueDate) {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && !task.completed;
    }

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
                <div className="task-title">
                    <h3>{task.title}</h3>
                    <div 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                        {task.priority}
                    </div>
                </div>
                <div className="task-actions">
                    <button 
                        className="action-button edit"
                        onClick={() => onEdit(task)}
                        title="Edit task"
                    >
                        edit
                    </button>
                    <button 
                        className="action-button delete"
                        onClick={() => onDelete(task.id)}
                        title="Delete task"
                    >
                        delete
                    </button>
                </div>
            </div>

            {task.description && (
                <div className="task-description">
                    <p>{task.description}</p>
                </div>
            )}

            <div className="task-meta">
                <div className="task-category">
                    <span className="category-tag">{task.category}</span>
                </div>
                
                {task.dueDate && (
                    <div className={`task-due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                        Due: {formatDate(task.dueDate)}
                    </div>
                )}
            </div>

            <div className="task-footer">
                <button 
                    className={`complete-button ${task.completed ? 'completed' : ''}`}
                    onClick={() => onToggleComplete(task.id, task.completed)}
                >
                    {task.completed ? 'completed' : 'mark complete'}
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
