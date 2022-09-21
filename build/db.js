"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB_URL);
var db = mongoose_1.default.connection;
var handleOpen = function () { return console.log("Connect to DB ✅"); };
var handleError = function () { return console.log("DB Error ❌", console_1.error); };
db.on("error", handleError);
db.once("open", handleOpen);
