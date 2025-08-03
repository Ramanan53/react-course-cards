import React, { useState } from "react";
import "./Card.css";

export default function Card({
  id,
  category,
  title,
  description,
  onDelete,
  onUpdate,
}) {
  const [fav, setFav] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ category, title, description });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const saveEdit = () => {
    onUpdate(id, editForm);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditForm({ category, title, description });
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            className="card__input"
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
          />
          <input
            className="card__input"
            name="title"
            value={editForm.title}
            onChange={handleEditChange}
          />
          <textarea
            className="card__textarea"
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
          />
        </>
      ) : (
        <>
          <span className="card__pill">{category}</span>
          <h3 className="card__title">{title}</h3>
          <p className="card__desc">{description}</p>
        </>
      )}

      <div className="card__footer">
        {!isEditing && (
          <>
            <button
              className="card__favorite"
              onClick={() => setFav(!fav)}
              aria-label={fav ? "Unfavorite" : "Favorite"}
            >
              {fav ? "❤️" : "🤍"}
            </button>
            <span className="card__fav-label">
              {fav ? "Favorited" : "Add to favorites"}
            </span>
          </>
        )}

        <div className="card__actions">
          {isEditing ? (
            <>
              <button className="card__btn card__btn--save" onClick={saveEdit}>
                Save
              </button>
              <button
                className="card__btn card__btn--cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="card__btn card__btn--edit"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="card__btn card__btn--delete"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
