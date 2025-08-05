import mongoose from 'mongoose';

const TodoItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const TodoListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for the to-do list'],
        trim: true
    },
    items: [TodoItemSchema]
}, { timestamps: true });

export default mongoose.model('TodoList', TodoListSchema);
