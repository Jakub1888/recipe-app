import express from 'express';
const router = express.Router();

const { getRecipes } = require('../controllers/recipes');

router.get('/search', getRecipes);

module.exports = router;
