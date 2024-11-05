const User = require('../models/userModel');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const players = await User.find(); // Fetch all players from the database
            res.status(200).json(players); // Send back the players as a JSON response
        } catch (error) {
            console.error('Error fetching players:', error);
            res.status(500).json({ message: 'Internal server error' }); // Handle errors
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
