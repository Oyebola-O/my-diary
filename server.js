import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import router from './routes/api_endpoints';
import auth from './routes/auth'

const port = process.env.PORT || 8080;
const app = express();
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/');
app.use('/api/v1', router);
app.use('/api/v1', auth);

app.listen(port, () => {
  console.log(`Server us listening on port: ${port}`);
});


export default app;
