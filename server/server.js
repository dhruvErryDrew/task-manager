const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/tasks', async (req, res) => {
    try {
        const { status, category, search } = req.query;
        
        let where = {};
        
        if (status && status !== 'all') {
            where.completed = status === 'completed';
        }
        
        if (category && category !== 'all') {
            where.category = category;
        }
        
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        
        const tasks = await prisma.task.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description, dueDate, priority, category } = req.body;
        
        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority: priority || 'MEDIUM',
                category: category || 'General'
            }
        });
        
        res.json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, category, completed } = req.body;
        
        const task = await prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority,
                category,
                completed
            }
        });
        
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await prisma.task.delete({
            where: { id }
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.get('/api/tasks/stats', async (req, res) => {
    try {
        const total = await prisma.task.count();
        const completed = await prisma.task.count({ where: { completed: true } });
        const pending = total - completed;
        
        const overdue = await prisma.task.count({
            where: {
                completed: false,
                dueDate: { lt: new Date() }
            }
        });
        
        res.json({ total, completed, pending, overdue });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
