const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const { authRouter, newUser, addScore, getScoreFromUser, getEmployeesFromUserDB, addCourse } = require('./src/router/router');
const helpers = require('./src/helpers');
const { verifyToken } = helpers;

const server = jsonServer.create();
const router = jsonServer.router('./src/db.json');
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.post("/auth/login", authRouter);
server.post("/auth/register", newUser);
server.post("/auth/user/score", addScore);
server.post("/auth/courses", addCourse);

server.get("/users", getEmployeesFromUserDB);
server.get("/users/scores?", getScoreFromUser);

server.use(/^(?!\/auth).*$/, async (req, res, next) => {

    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {

        const status = 401;
        const message = 'Bad authorization header';
        res.status(status).json({ status, message });
        return;
    }
    try {
        await verifyToken(req.headers.authorization.split(' ')[1]);
        next();
    }
    catch (err) {
        const status = 401;
        const message = 'Error: access_token is not valid';
        res.status(status).json({ status, message });
    }


});

server.use(router);

var server_port = process.env.YOUR_PORT || process.env.PORT || 4020;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Run Auth API Server. Listening on port %d', server_port);
});