// routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProgress, updateUserXP, getUserProgress, updateQuizProgress, getQuizProgress, getLatestProgress } = require('../models/userModel');

router.post('/update-progress', async (req, res) => {
    const { userId, lessonId, progress } = req.body;
    try {
      const updatedProgress = await updateUserProgress(userId, lessonId, progress);
      res.status(200).json({ message: 'Progress updated successfully', progress: updatedProgress });
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ error: 'Failed to update progress' });
    }
  });

router.post('/update-xp', async (req, res) => {
  const { userId, xp } = req.body;
  try {
    await updateUserXP(userId, xp);
    res.status(200).json({ message: 'XP updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update XP' });
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
    const { userId, quizId, answers, totalQuestions } = req.body;
    try {
      const updatedProgress = await updateQuizProgress(userId, quizId, answers, totalQuestions);
      res.status(200).json({ message: 'Quiz progress updated successfully', progress: updatedProgress });
    } catch (error) {
      console.error('Error updating quiz progress:', error);
      res.status(500).json({ error: 'Failed to update quiz progress' });
    }
  });
  
  router.get('/quiz-progress/:userId/:quizId/:totalQuestions', async (req, res) => {
    const { userId, quizId, totalQuestions } = req.params;
    try {
      const progress = await getQuizProgress(userId, quizId, parseInt(totalQuestions));
      res.status(200).json({ progress });
    } catch (error) {
      console.error('Error fetching quiz progress:', error);
      res.status(500).json({ error: 'Failed to fetch quiz progress' });
    }
  });

  router.get('/:userId/latest', async (req, res) => {
    const { userId } = req.params;
    try {
        const latestProgress = await getLatestProgress(userId);
        res.status(200).json({ latestProgress });
    } catch (error) {
        console.error('Error fetching latest progress:', error);
        res.status(500).json({ error: 'Failed to fetch latest progress' });
    }
});

module.exports = router;