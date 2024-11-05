const authenticateToken = require('../middlewares/authenticateToken');
const User = require('../models/userModel');

module.exports = async (req, res) => {
    if (req.method === 'PATCH') {
        await authenticateToken(req, res, async () => {
            try {
                const updates = req.body; // Get updates from the request body

                // Find and update the user by googleId
                const user = await User.findOneAndUpdate(
                    { googleId: req.user.sub },
                    updates,
                    { new: true } // Return the updated document
                );

                if (!user) {
                    res.status(404).json({ message: 'User does not exist!' });
                } else {
                    res.status(200).json({ message: 'User updated successfully.', user });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
