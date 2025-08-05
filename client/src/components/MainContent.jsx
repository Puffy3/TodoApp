import React from 'react';
import TodoItem from './TodoItem';

const MainContent = ({ list, onAddItem, onUpdateItem, onDeleteItem }) => {
    if (!list) {
        return (
            <main className="flex-grow p-6 flex items-center justify-center">
                <p>Select a list to see its items.</p>
            </main>
        );
    }

    return (
        <main className="flex-grow p-6 relative">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">{list.name}</h1>
            </header>
            
            <div className="space-y-2">
                {list.items.map(item => (
                    <TodoItem
                        key={item._id}
                        item={item}
                        onUpdate={(updates) => onUpdateItem(item._id, updates)}
                        onDelete={() => onDeleteItem(item._id)}
                    />
                ))}
            </div>

            <button
                onClick={onAddItem}
                className="absolute bottom-8 right-8 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl"
            >
                +
            </button>
        </main>
    );
};

export default MainContent;
