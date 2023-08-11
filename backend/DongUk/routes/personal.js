const express = require('express');
const router = express.Router();

// Sample data for demonstration purposes
const users = [
    { userId: 'examples', username: 'user1', email: 'user1@example.com', nickname: 'nick1', birthdate: '2022-08-23' },
    { userId: 'examples2', username: 'user2', email: 'user2@example.com', nickname: 'nick2',birthdate: '2020-08-24' },
    // Add more users here
];

// Define the route for getting user profiles
router.get('/:userId/profile', (req, res) => {
    const userId2 = req.params.userId; // No need to parse, userId is a string
    console.log(`Requested userId: ${userId2}`);

    const user = users.find(user => user.userId === userId2);

    if (!user) {
        console.log(`User not found for userId: ${userId}`);
        return res.status(404).json({ error: 'User not found' });
    }

    const { userId, username, email, nickname } = user;
    console.log(`Found user:`, user);
    res.json({ userId, username, email, nickname });
});

module.exports = router;
