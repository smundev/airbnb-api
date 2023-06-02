const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");
const server = jsonServer.create();
const fs = require("fs");
const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
server.db = router.db;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    users: 600,
    messages: 640,
  })
);
server.use(auth);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

module.exports = server;
