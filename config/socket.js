import http from "http";
import express from "express";
import socketIO from "socket.io";
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
export default io;
