import TodoList from '../models/TodoList.js';

export const createList = async (req, res) => {
    try {
        const { name } = req.body;
        const list = new TodoList({ name, user: req.user._id });
        const createdList = await list.save();
        res.status(201).json(createdList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLists = async (req, res) => {
    try {
        const lists = await TodoList.find({ user: req.user._id });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateList = async (req, res) => {
    try {
        const list = await TodoList.findById(req.params.id);
        if (list && list.user.equals(req.user._id)) {
            list.name = req.body.name || list.name;
            const updatedList = await list.save();
            res.json(updatedList);
        } else {
            res.status(404).json({ message: 'List not found or user not authorized' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteList = async (req, res) => {
    try {
        const list = await TodoList.findById(req.params.id);

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        
        if (!list.user.equals(req.user._id)) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        
        await TodoList.deleteOne({ _id: req.params.id });

        res.json({ message: 'List removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addItemToList = async (req, res) => {
    try {
        const { text } = req.body;
        const list = await TodoList.findById(req.params.listId);

        if (list && list.user.equals(req.user._id)) {
            const item = { text, completed: false };
            list.items.push(item);
            await list.save();
            res.status(201).json(list);
        } else {
            res.status(404).json({ message: 'List not found or user not authorized' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateItemInList = async (req, res) => {
    try {
        const { text, completed } = req.body;
        const list = await TodoList.findById(req.params.listId);
        if (list && list.user.equals(req.user._id)) {
            const item = list.items.id(req.params.itemId);
            if (item) {
                item.text = text !== undefined ? text : item.text;
                item.completed = completed !== undefined ? completed : item.completed;
                await list.save();
                res.json(list);
            } else {
                res.status(404).json({ message: 'Item not found in this list' });
            }
        } else {
            res.status(404).json({ message: 'List not found or user not authorized' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteItemFromList = async (req, res) => {
    try {
        
        const list = await TodoList.findOneAndUpdate(
            { _id: req.params.listId, user: req.user._id }, 
            { $pull: { items: { _id: req.params.itemId } } },
            { new: true } 
        );

        if (!list) {
           
            return res.status(404).json({ message: 'List not found or user not authorized' });
        }

        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
