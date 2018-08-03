import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import router from '../routes/apiEndpoints';
import auth from '../routes/authEndpoints'

const port = process.env.PORT || 8080;
const app = express();
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server us listening on port: ${port}`);
});


export default app;
