import express from 'express';

const app = express();
const port = 3000;

app.listen(port, 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
