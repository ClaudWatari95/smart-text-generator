import express from 'express';
import { engine } from 'express-handlebars';
import { getGlobals } from 'common-es'
import router from './routes/routes.js';

// declare __dirname variable for use with module type (es6)
const { __dirname } = getGlobals(import.meta.url)

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.set('view engine', 'hbs'); // express engine for static files
app.engine('hbs', engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));

app.use('/', router);
app.listen(PORT, () => {
  console.log('running on port ' + PORT);
});