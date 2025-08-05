import React from 'react';

const Sidebar = ({ lists, selectedListId, onSelectList, onAddList, onEditList, onDeleteList }) => {
    return (
        <aside className="w-64 border-r flex flex-col flex-shrink-0">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold">Your Lists</h2>
                <button onClick={onAddList} className="p-2 bg-blue-500 text-white">
                    +
                </button>
            </div>
            <nav className="flex-grow">
                <ul>
                    {lists.map(list => (
                        <li key={list._id} className="flex items-center justify-between p-2">
                            <button
                                onClick={() => onSelectList(list._id)}
                                className={`w-full text-left ${selectedListId === list._id ? 'font-bold' : ''}`}
                            >
                                {list.name}
                            </button>
                            <div className="flex">
                                <button onClick={() => onEditList(list)} className="px-2 text-blue-500">Edit</button>
                                <button onClick={() => onDeleteList(list._id)} className="px-2 text-red-500">Del</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
