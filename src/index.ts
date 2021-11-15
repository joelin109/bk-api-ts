import express, { Express, RequestHandler } from "express";
import routes from "./service/route/index";

const app: Express = express();
const app_port: number = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.json() as RequestHandler);


/* Adding CORS support */
app.all('*', function (req, res, next) {
  // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

  if (req.method === 'OPTIONS') {
    res.send();
  } else {
    next();
  }
});


routes(app);
app.listen(app_port, function () {
  console.log('Express server listening on port ' + app_port);
});