import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { tasksAtom, filterAtom, loadingAtom, statsAtom } from '../../Atoms';
import TaskForm from '../TaskForm/TaskForm';
import TaskItem from '../TaskItem/TaskItem';
import FilterPanel from '../FilterPanel/FilterPanel';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useAtom(tasksAtom);
    const [filter, setFilter] = useAtom(filterAtom);
    const [stats, setStats] = useAtom(statsAtom);
    const [loading, setLoading] = useAtom(loadingAtom);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchStats();
    }, [filter]);

    async function fetchTasks() {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter.status !== 'all') params.append('status', filter.status);
            if (filter.category !== 'all') params.append('category', filter.category);
            if (filter.search) params.append('search', filter.search);
            
            const response = await fetch(`http://localhost:3001/api/tasks?${params}`);
            const data = await response.json();
            // Ensure data is always an array
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            // Set empty array on error
            setTasks([]);
            Swal.fire({
                text: 'Failed to load tasks - Server may not be running',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    }

    async function fetchStats() {
        try {
            const response = await fetch('http://localhost:3001/api/tasks/stats');
            const data = await response.json();
            setStats(data || { total: 0, completed: 0, pending: 0, overdue: 0 });
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStats({ total: 0, completed: 0, pending: 0, overdue: 0 });
        }
    }

    async function handleCreateTask(taskData) {
        try {
            const response = await fetch('http://localhost:3001/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            
            if (response.ok) {
                fetchTasks();
                fetchStats();
                setShowForm(false);
                Swal.fire({
                    text: 'Task created successfully!',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                });
            }
        } catch (error) {
            console.error('Error creating task:', error);
            Swal.fire({
                text: 'Failed to create task',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    async function handleUpdateTask(id, taskData) {
        try {
            const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            
            if (response.ok) {
                fetchTasks();
                fetchStats();
                setEditingTask(null);
                Swal.fire({
                    text: 'Task updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            Swal.fire({
                text: 'Failed to update task',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    async function handleDeleteTask(id) {
        const result = await Swal.fire({
            text: 'Are you sure you want to delete this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    fetchTasks();
                    fetchStats();
                    Swal.fire({
                        text: 'Task deleted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                Swal.fire({
                    text: 'Failed to delete task',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

    async function handleToggleComplete(id, completed) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            await handleUpdateTask(id, { ...task, completed: !completed });
        }
    }

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <Link to="/" className="back-button">
                    ← Back to Home
                </Link>
                <h1 className="page-title suse-mono">
                    <span style={{ color: '#009900' }}>TASK</span>
                    <span> </span>
                    <span style={{ color: '#D00000' }}>MANAGER</span>
                </h1>
                <button 
                    className="add-task-button"
                    onClick={() => setShowForm(true)}
                >
                    + Add Task
                </button>
            </div>

            <FilterPanel />

            {showForm && (
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingTask && (
                <TaskForm
                    task={editingTask}
                    onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
                    onCancel={() => setEditingTask(null)}
                />
            )}

            <div className="tasks-section">
                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>No tasks found. Create your first task to get started!</p>
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={setEditingTask}
                                onDelete={handleDeleteTask}
                                onToggleComplete={handleToggleComplete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskList;
