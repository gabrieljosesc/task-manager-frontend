import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // For editing tasks
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post("http://127.0.0.1:8000/api/tasks/", {
        title,
        description,
        completed: false,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  
  const updateTask = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        title: editTitle,
        description: editDescription,
        completed: editingTask.completed,
      });
      setEditingTask(null);
      setEditTitle("");
      setEditDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
        paddingTop: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Task Manager</h1>

        {/* Add Task Form */}
        <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "2px solid #2ecc71",
              background: "transparent",
              color: "#2ecc71",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "10px",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {editingTask && editingTask.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ padding: "5px", marginRight: "5px" }}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    style={{ padding: "5px", marginRight: "5px" }}
                  />
                  <button
                    onClick={() => updateTask(task.id)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "2px solid #27ae60",
                      background: "transparent",
                      color: "#27ae60",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "2px solid #7f8c8d",
                      background: "transparent",
                      color: "#7f8c8d",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {task.title} - {task.description}
                  </span>
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setEditTitle(task.title);
                      setEditDescription(task.description);
                    }}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "2px solid #f39c12",
                      background: "transparent",
                      color: "#f39c12",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "2px solid #3498db",
                      background: "transparent",
                      color: "#3498db",
                      cursor: "pointer",
                    }}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "2px solid #e74c3c",
                      background: "transparent",
                      color: "#e74c3c",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
