import React, { useState } from 'react';
import { toast } from 'react-toastify';
function TaskForm({ onTaskAdded }) {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskName) return;

        try {
            const response = await fetch('http://localhost:5000/tasks/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskName }),
            });
            if(response.ok)
            {
                toast.success('Task added succesfully')
            }
            if (!response.ok) {
                toast.error('Failed to add task')
                throw new Error('Network response was not ok');
            }

            setTaskName(''); // Clear input field
            onTaskAdded();   // Refresh task list
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add a new task"
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
