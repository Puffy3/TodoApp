import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Modal from '../components/Modal';
import Header from '../components/Header';

const Dashboard = () => {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); 
    const [currentItem, setCurrentItem] = useState(null); 

    useEffect(() => {
        const fetchLists = async () => {
            try {
                setLoading(true);
                const { data } = await api.getLists();
                setLists(data);
                if (data.length > 0 && !selectedListId) {
                    setSelectedListId(data[0]._id);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch to-do lists.');
                setLoading(false);
            }
        };
        fetchLists();
    }, []);

    const handleUpdate = (updatedList) => {
        setLists(lists.map(l => l._id === updatedList._id ? updatedList : l));
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setCurrentItem(null);
    };

    const handleAddList = async (name) => {
        const { data } = await api.createList(name);
        setLists([...lists, data]);
        setSelectedListId(data._id);
        closeModal();
    };

    const handleEditList = async (name) => {
        const { data } = await api.updateList(currentItem._id, { name });
        handleUpdate(data);
        closeModal();
    };
    
    const handleDeleteList = async (listId) => {
        if (window.confirm("Delete this list?")) {
            await api.deleteList(listId);
            const newLists = lists.filter(l => l._id !== listId);
            setLists(newLists);
            if (selectedListId === listId) {
                setSelectedListId(newLists.length > 0 ? newLists[0]._id : null);
            }
        }
    };

    const handleAddItem = async (text) => {
        const { data } = await api.addItem(selectedListId, text);
        handleUpdate(data);
        closeModal();
    };

    
    const handleEditItem = async (text) => {
        const { data } = await api.updateItem(selectedListId, currentItem._id, { text });
        handleUpdate(data);
        closeModal();
    };

    const handleUpdateItem = async (itemId, updates) => {
        const { data } = await api.updateItem(selectedListId, itemId, updates);
        handleUpdate(data);
    };

    const handleDeleteItem = async (itemId) => {
        const { data } = await api.deleteItem(selectedListId, itemId);
        handleUpdate(data);
    };

    const selectedList = lists.find(list => list._id === selectedListId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow">
                <Sidebar
                    lists={lists}
                    selectedListId={selectedListId}
                    onSelectList={setSelectedListId}
                    onAddList={() => openModal('addList')}
                    onEditList={(list) => openModal('editList', list)}
                    onDeleteList={handleDeleteList}
                />
                <MainContent
                    list={selectedList}
                    onAddItem={() => openModal('addItem')}
                    onEditItem={(item) => openModal('editItem', item)} // Pass the handler
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === 'addList' && <ListForm title="Add New List" onSubmit={handleAddList} onClose={closeModal} />}
                {modalType === 'editList' && <ListForm title="Edit List Name" onSubmit={handleEditList} onClose={closeModal} initialData={currentItem} />}
                {modalType === 'addItem' && <ItemForm title="Add New To-Do" onSubmit={handleAddItem} onClose={closeModal} />}
                {modalType === 'editItem' && <ItemForm title="Edit To-Do" onSubmit={handleEditItem} onClose={closeModal} initialData={currentItem} />}
            </Modal>
        </div>
    );
};



const ListForm = ({ title, onSubmit, onClose, initialData = { name: '' } }) => {
    const [name, setName] = useState(initialData.name);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border"
                required
            />
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Save</button>
            </div>
        </form>
    );
};


const ItemForm = ({ title, onSubmit, onClose, initialData = { text: '' } }) => {
    const [text, setText] = useState(initialData.text);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border"
                required
            />
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Save</button>
            </div>
        </form>
    );
};

export default Dashboard;
