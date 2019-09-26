const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//Setup Cors
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);

//Start server on Port
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

//Initialize DB
const db = mongoose.connection;

//Handle MongoDb Errors
db.on('error', (err) => console.log(err));

db.once('open', () => require('./routes/tasks')(server));


//Serve Static Files
server.get('/', restify.plugins.serveStatic({
    directory: './dist/google-keep-clone',
    default: 'index.html'
  }));