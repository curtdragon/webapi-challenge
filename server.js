const express = require("express");
const projectsRouter = require("./projects/projectRoutes");
const server = express();


//Middleware
server.use(express.json());
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
    res.send("Server Operational!");
});


module.exports = server;