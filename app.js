const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//other imports


const methodsRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', methodsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("Rodando na porta "+PORT+".")
})
