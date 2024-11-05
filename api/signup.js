const authenticateToken = require('../middlewares/authenticateToken');
const User = require('../models/userModel');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    await authenticateToken(req, res, async () => {
      try {
        let user = await User.findOne({ googleId: req.user.sub });
        if (!user) {
          user = new User({
            googleId: req.user.sub,
            email: req.user.email,
            name: req.user.name,
            profilePic: req.user.picture,
            emailVerified: req.user.emailVerified,
          });
          await user.save();
          res.json({ message: 'New user saved to the database', user });
        } else {
          res.json({ message: 'User already exists', user });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
