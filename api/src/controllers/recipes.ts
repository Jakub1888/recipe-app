import { Request, Response } from 'express';
const fetch = require('node-fetch');

const getRecipes = async (req: Request, res: Response) => {
  try {
    const searchString = `q=${req.query.q}`;

    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&${searchString}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`
    );

    const recipes = await response.text();
    const results = JSON.parse(recipes);

    return res.json({
      success: true,
      results,
    });
  } catch (err) {
    let errorMessage;
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({
      success: false,
      message: errorMessage ? errorMessage : err,
    });
  }
};

module.exports = {
  getRecipes,
};
