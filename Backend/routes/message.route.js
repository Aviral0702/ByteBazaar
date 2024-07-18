import express from 'express';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

const router = express.Router();

// Send a message
router.post('/', async(req, res) => {
    const { chatId, senderId, content } = req.body;

    try {
        const message = new Message({
            chat: chatId,
            sender: senderId,
            content,
        });

        await message.save();

        // Update the last message in the chat
        await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all messages for a chat
router.get('/:chatId', async(req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', 'username')
            .sort('createdAt');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;