const mongoose = require('mongoose');
const express = require('express');
const auth = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const DB_URI = process.env.DB_URI.replace('<password>', process.env.DB_PASSWORD);
mongoose
	.connect(DB_URI)
	.then(() => {
		app.listen(process.env.PORT || 5000, () =>
			console.log(`Local Server: http://localhost:${process.env.PORT}/`),
		);
	})
	.catch(err => console.log(err.message));

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(auth);

app.get('/set-cookies', (req, res) => {
	res.cookies('newUser', false);
	res.send("You've got cookies!");
});

app.get('/read-cookies', (req, res) => {});
