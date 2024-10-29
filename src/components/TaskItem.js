import React, { useState } from 'react';
import { toast } from 'react-toastify';
function TaskItem({ task, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false); // To control modal visibility
    const [updatedTask, setUpdatedTask] = useState(task.task); // For holding new task name

    // Function to delete the task
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://todoserver-alpha.vercel.app/tasks/tasks/${task.id}`, {
                method: 'DELETE',
            });
            if(response.ok)
            {
                toast.success("Task Deleted successfully!");
            }
            if (!response.ok) {
                toast.error("Error to delete task!");
                throw new Error('Failed to delete the task');
            }
            // Trigger onUpdate in parent to refresh task list
            onUpdate();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Function to update the task name
    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://todoserver-alpha.vercel.app/tasks/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: updatedTask }),
            });
            if(response.ok)
            {
                toast.success("Task updated successfully!");
            }
            if (!response.ok) {
                toast.error("Error updating task!");
                throw new Error('Failed to update the task');
            }
            // Close modal and trigger refresh in parent
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Function to update task status to "Completed"
    const markAsCompleted = async () => {
        try {
            const response = await fetch(`https://todoserver-alpha.vercel.app/tasks/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task:task.task,status: true }),
            });
            if(response.ok)
            {
                toast.success("Task marks as completed successfully!");
            }
            if (!response.ok) {
                toast.error("Error to mark as a complete task!");
                throw new Error('Failed to update task status');
            }
            // Trigger onUpdate in parent to refresh task list
            onUpdate();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className="task-item">
            <h2>{task.task}</h2>
            <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={markAsCompleted} disabled={task.completed}>
                {task.completed ? 'Completed' : 'Mark as Completed'}
            </button>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            value={updatedTask}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                        />
                        <button onClick={handleUpdate}>Save Changes</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
