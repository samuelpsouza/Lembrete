const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const winstonInstance = require('./config/winston');
const expressValidation = require('express-validation');
const APIError = require('./helpers/APIError');
const config = require('./config/config');

var app = express();

if (app.get('env') === 'development') {
	app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());

const appRoutes = require("./app/routes/app-routes");
appRoutes(app);

if (config.development) {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

app.use((req, res, next) => {
  const err = new APIError('Ops! Página não encontrada.', httpStatus.NOT_FOUND);
  next(err);
});

if (!app.get('env') === 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
