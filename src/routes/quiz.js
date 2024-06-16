// routes/quiz.js
router.post('/validate-code', async (req, res) => {
    try {
      const { code } = req.body;
      const quiz = await Quiz.findOne({ code });
      if (quiz) {
        res.status(200).json({ valid: true, quiz });
      } else {
        res.status(200).json({ valid: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to validate quiz code' });
    }
  });
  