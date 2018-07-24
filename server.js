import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api_endpoints';

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('', router);

app.listen(port, () => {
  console.log(`Server us listening on port: ${port}`);
});


export default app;
