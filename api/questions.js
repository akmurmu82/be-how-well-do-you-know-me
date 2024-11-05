const Question = require('../models/questionModel');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const questions = await Question.find(); // Fetch all questions from the database
            res.status(200).json(questions); // Send back the questions as a JSON response
        } catch (error) {
            console.error('Error fetching questions:', error);
            res.status(500).json({ message: 'Internal server error' }); // Handle errors
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
