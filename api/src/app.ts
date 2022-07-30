import { Request, Response } from 'express';

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/search', async (req: Request, res: Response) => {
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
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
