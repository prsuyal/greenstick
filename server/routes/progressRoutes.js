const express = require('express');
const router = express.Router();
const { updateUserProgress, updateUserXP, getUserProgress, updateQuizProgress, getQuizProgress, getLatestProgress, getLatestQuizProgress } = require('../models/userModel');

router.post('/update-progress', async (req, res) => {
  console.log('Received progress update request:', req.body);
  const { userId, lessonId, progress, title, levelNumber, sublevelLetter, lessonNumber } = req.body;
  try {
    const updatedProgress = await updateUserProgress(userId, lessonId, progress, title, levelNumber, sublevelLetter, lessonNumber);
    console.log('Progress updated successfully:', updatedProgress);
    res.status(200).json({ message: 'Progress updated successfully', progress: updatedProgress });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId/:lessonId', async (req, res) => {
  const { userId, lessonId } = req.params;
  try {
    const progress = await getUserProgress(userId, lessonId);
    res.status(200).json({ progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

router.post('/update-quiz-progress', async (req, res) => {
  const { userId, quizId, answers, progress, title, levelNumber, sublevelLetter, lessonNumber } = req.body;
  try {
    const updatedProgress = await updateQuizProgress(userId, quizId, answers, progress, title, levelNumber, sublevelLetter, lessonNumber);
    res.status(200).json({ message: 'Quiz progress updated successfully', progress: updatedProgress });
  } catch (error) {
    console.error('Error updating quiz progress:', error);
    res.status(500).json({ error: 'Failed to update quiz progress' });
  }
});

router.get('/quiz-progress/:userId/:quizId', async (req, res) => {
  const { userId, quizId } = req.params;
  try {
    const progress = await getQuizProgress(userId, quizId);
    res.status(200).json({ progress });
  } catch (error) {
    console.error('Error fetching quiz progress:', error);
    res.status(500).json({ error: 'Failed to fetch quiz progress' });
  }
});

router.get('/:userId/latest-progress', async (req, res) => {
    const { userId } = req.params;
    try {
      const latestProgress = await getLatestProgress(userId);
      console.log('Latest progress from DB:', latestProgress);
      
      if (!latestProgress) {
        // If no progress found, return default values
        return res.status(200).json({
          progress: 0,
          lessonDetails: {
            level_name: 'Level 1',
            sublevel_letter: 'A',
            lesson_number: 1,
            title: 'Getting Started',
            level_number: 1
          },
          isQuiz: false
        });
      }
      
      res.status(200).json(latestProgress);
    } catch (error) {
      console.error('Error fetching latest progress:', error);
      res.status(500).json({ error: 'Failed to fetch latest progress' });
    }
  });

module.exports = router;
