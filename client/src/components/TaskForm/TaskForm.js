import { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ task, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        category: 'General'
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
                priority: task.priority || 'MEDIUM',
                category: task.category || 'General'
            });
        }
    }, [task]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title.trim()) {
            return;
        }
        onSubmit(formData);
    }

    return (
        <div className="task-form-overlay">
            <div className="task-form">
                <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Work, Personal, Shopping"
                            className="form-input"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
