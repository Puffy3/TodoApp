import React, { useState, useEffect, useRef } from 'react';

const TodoItem = ({ item, onUpdate, onDelete }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [editText, setEditText] = useState(item.text);
    const inputRef = useRef(null);

  
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    
    const handleSave = () => {
        if (editText.trim() && editText !== item.text) {
            onUpdate({ text: editText });
        }
        setIsEditing(false);
    };

   
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            
            setEditText(item.text);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center p-2 border">
            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onUpdate({ completed: !item.completed })}
                className="h-5 w-5"
            />
            <div className="ml-3 flex-grow" onClick={() => setIsEditing(true)}>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave} // Save when the input loses focus
                        onKeyDown={handleKeyDown}
                        className="w-full p-0 border-none focus:ring-0"
                    />
                ) : (
                    <span className={`cursor-text ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.text}
                    </span>
                )}
            </div>
            <button onClick={onDelete} className="px-2 text-red-500">
                Delete
            </button>
        </div>
    );
};

export default TodoItem;
