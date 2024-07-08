const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

//database
const db = require('./config/db-connection');

//Routers
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const ownerRouter = require('./routes/ownerRouter');
const indexRouter = require('./routes/indexRouter');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(expressSession(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }
));
app.use(flash());

//Specific Routes
app.use('/', indexRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/owner", ownerRouter);



app.listen(process.env.PORT, () => console.log(`Example app listening on PORT ${process.env.PORT}!`));