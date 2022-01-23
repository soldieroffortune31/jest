var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const paginate = require('express-paginate');
var cors = require('cors');
var indexRouter = require('./routes/routes-index');
var authRouter = require('./routes/routes-auth')
var profileRouter = require('./routes/routes-profile')
var gamesRouter  = require('./routes/routes-games')

const app = express();
const session = require('express-session');
const flash = require('express-flash');
// const { application } = require('express');

// Pertama, setting request body parser
// (Ingat! Body parser harus ditaruh paling atas)
app.use(express.urlencoded({ extended: false }));

// Kedua, setting session handler
app.use(
	session({
		secret: 'Buat ini jadi rahasia',
		resave: false,
		saveUninitialized: false
	})
);

// // Ketiga, setting passport
// // (sebelum router dan view engine)
// const passport = require('./lib/passport');
// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
// 	res.locals.isAuthenticated = req.isAuthenticated();
// 	next();
// });

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Keempat, setting flash
app.use(flash());

// Kelima, setting view engine
app.set('view engine', 'ejs');
app.use(paginate.middleware(10, 50));
// Keenam, setting router
app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/games', gamesRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
