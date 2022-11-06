const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routers');
var flash = require('express-flash');
const db = require('./config/db');

const path = require('path');

db.connect();
const app = express();
const port = 4000;

// HTTP logger
app.use(morgan('combined'));

// cấu hình file tỉnh ( từ các file trong public)
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template engine
// app.engine(
//   'hbs',
//   engine({
//     extname: '.hbs',
//   })
// );
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources/views'));

// app.use(flash());
app.use(flash());
route(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
