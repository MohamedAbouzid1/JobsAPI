require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connect DB
const connectDB = require('./db/connect');
// authentication middleware
const authenticateUser = require('./middleware/authentication');

// routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobsRoutes);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
