"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var server_1 = __importDefault(require("./server"));
require("./db");
require("./models/Video");
require("./models/User");
require("./models/Comment");
var PORT = process.env.PORT;
server_1.default.listen(PORT, function () {
    console.log("\uD83D\uDE80 http://localhost:".concat(PORT));
});
