"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var rootRouter_1 = __importDefault(require("./routers/rootRouter"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var videoRouter_1 = __importDefault(require("./routers/videoRouter"));
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
var corsOptions = {
    credentials: true,
    origin: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DB_URL }),
}));
app.use(function (req, res, next) {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
app.use("/", rootRouter_1.default);
app.use("/videos", videoRouter_1.default);
app.use("/users", userRouter_1.default);
exports.default = app;
