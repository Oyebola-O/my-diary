// Import statements
import express from 'express';
import bodyParser from 'body-parser';

// Define Constants
const port = process.env.PORT || 8080;
const app = express();

// Use defined variables
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('./routes/api_endpoints'));

app.listen(port, () => {
  console.log(`Server us listening on port: ${port}`);
});

export {app};
