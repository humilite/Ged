const express = require('express');
const router = express.Router();

// Route test minimaliste
router.get('/', (req, res) => {
  res.json({ message: 'Route notifications fonctionnelle' });
});

module.exports = router;
