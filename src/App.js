import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

export default function App() {
  // Initialize from localStorage, or fall back to defaults
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("courses");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        category: "Frontend",
        title: "React Development",
        description:
          "Professional development course designed to enhance your technical skills and career growth.",
      },
      {
        id: 2,
        category: "Programming",
        title: "JavaScript Fundamentals",
        description:
          "Professional development course designed to enhance your technical skills and career growth.",
      },
      {
        id: 3,
        category: "Design",
        title: "Web Design",
        description:
          "Professional development course designed to enhance your technical skills and career growth.",
      },
      {
        id: 4,
        category: "Engineering",
        title: "Frontend Engineering",
        description:
          "Professional development course designed to enhance your technical skills and career growth.",
      },
    ];
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // Form state
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.title) return;
    setCourses((arr) => [...arr, { id: Date.now(), ...form }]);
    setForm({ category: "", title: "", description: "" });
  };

  const handleDelete = (id) => {
    setCourses((arr) => arr.filter((c) => c.id !== id));
  };

  const handleUpdate = (id, updated) => {
    setCourses((arr) =>
      arr.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  return (
    <div className="app">
      <form className="add-course-form" onSubmit={handleSubmit}>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course Title"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short Description"
        />
        <button type="submit">Add Course</button>
      </form>

      <header className="app__header">
        <h1>Featured Courses</h1>
        <p>
          Enhance your professional skills with our curated selection of
          industry-leading courses.
        </p>
      </header>

      <div className="app__grid">
        {courses.map((c) => (
          <Card
            key={c.id}
            id={c.id}
            category={c.category}
            title={c.title}
            description={c.description}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
