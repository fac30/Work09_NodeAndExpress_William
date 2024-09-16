const express = require("express");

const server = express();

const staticHandler = express.static("public");
const bodyParser = express.urlencoded();

server.use(staticHandler);

server.get("/", (request, response, next) => {
  console.log(request.method + " " + request.url);
  next();
});

server.get("/", (reques, response) => {
  /* response.set({
    "x-fake-header": "my-value",
    "x-another-fake-header": "my-value",
  }); */
  const time = new Date().toLocaleTimeString();
  response.status(200).send(`<h1>Hello! It is ${time}.</h1>`);
});

server.get("/json", (request, response) => {
  response.send({ message: "Hello" });
});

server.get("/redirects", (request, response) => {
  //response.send("Going back home.");
  setTimeout(() => response.redirect("/"), 5000);
});

server.get("/users/:name", (request, response) => {
  const name = request.params.name;
  response.send(`<h1>Hello ${name}</h1>`);
});

/* server.post("/submit", (request, response) => {
  console.log("posted");
  response.send("form is submitted");
}); */

server.post("/submit", bodyParser, (request, response) => {
  console.log(request.body);
  response.send("thanks for submitting");
});

server.use((request, response) => {
  response.status(400).send("<h1>Not Found</h1>");
});
const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
