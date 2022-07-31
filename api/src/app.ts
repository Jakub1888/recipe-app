require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// routers
const recipesRouter = require('./routes/recipes');

// routes
app.use('/api', recipesRouter);

// error handler
const notFoundMiddleware = require('./middleware/not-found');
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
