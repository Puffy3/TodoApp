import express from 'express';
import {
    createList,
    getLists,
    updateList,
    deleteList,
    addItemToList,
    updateItemInList,
    deleteItemFromList
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createList)
    .get(getLists);

router.route('/:id')
    .put(updateList)
    .delete(deleteList);

router.route('/:listId/items').post(addItemToList);

router.route('/:listId/items/:itemId')
    .put(updateItemInList)
    .delete(deleteItemFromList);

export default router;
