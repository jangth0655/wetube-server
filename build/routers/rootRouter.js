"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var videoController_1 = require("../controllers/videoController");
var middlewares_1 = require("../middlewares");
var rootRouter = express_1.default.Router();
rootRouter.get("/", videoController_1.home);
rootRouter.post("/join", middlewares_1.publicOnlyMiddleware, userController_1.join);
rootRouter.post("/login", middlewares_1.publicOnlyMiddleware, userController_1.login);
rootRouter.post("/logout", middlewares_1.protectorMiddleware, userController_1.logout);
rootRouter.get("/search", videoController_1.search);
rootRouter.get("/cloudFlareUpload");
exports.default = rootRouter;
