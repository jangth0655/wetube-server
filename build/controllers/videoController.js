"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseView = exports.awsVideoUpload = exports.deleteComment = exports.createComment = exports.search = exports.edit = exports.deleteVideo = exports.upload = exports.watch = exports.home = void 0;
var Comment_1 = __importDefault(require("../models/Comment"));
var User_1 = __importDefault(require("../models/User"));
var Video_1 = __importDefault(require("../models/Video"));
var shared_1 = require("./shared");
var home = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var videos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, Video_1.default.find({})
                        .sort({ createdAt: "desc" })
                        .populate({
                        path: "user",
                        select: {
                            username: 1,
                            avatarId: 1,
                        },
                    })];
            case 1:
                videos = _a.sent();
                return [2, res.status(200).json({ ok: true, videos: videos })];
            case 2:
                error_1 = _a.sent();
                return [2, res.status(404).json({ ok: false, error: error_1 })];
            case 3: return [2];
        }
    });
}); };
exports.home = home;
var watch = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, video, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Video_1.default.findById(id)
                        .populate({
                        path: "user",
                        select: {
                            username: 1,
                            avatarId: 1,
                        },
                    })
                        .populate({
                        path: "comments",
                        populate: {
                            path: "user",
                            select: {
                                username: 1,
                                avatarId: 1,
                            },
                        },
                    })];
            case 2:
                video = _a.sent();
                if (video) {
                    return [2, res.json({ ok: true, video: video })];
                }
                return [2, res.status(404).json({ ok: false, error: "Video is not found" })];
            case 3:
                error_2 = _a.sent();
                return [2, res.status(404).json({ ok: false, error: "error : ".concat(error_2) })];
            case 4: return [2];
        }
    });
}); };
exports.watch = watch;
var upload = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, hashtags, file, user, userId, newVideo, user_1, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, hashtags = _a.hashtags, file = _a.file, user = req.session.user;
                userId = user._id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4, Video_1.default.create({
                        url: file ? file : null,
                        title: title,
                        description: description,
                        hashtags: Video_1.default.formatHashtags(hashtags),
                        createAt: Date.now(),
                        user: userId,
                    })];
            case 2:
                newVideo = _b.sent();
                return [4, User_1.default.findById(userId)];
            case 3:
                user_1 = _b.sent();
                user_1 === null || user_1 === void 0 ? void 0 : user_1.videos.push(newVideo._id);
                return [4, (user_1 === null || user_1 === void 0 ? void 0 : user_1.save())];
            case 4:
                _b.sent();
                return [2, res.status(201).json({ ok: true, file: file })];
            case 5:
                error_3 = _b.sent();
                return [2, res.status(400).json({ ok: false, error: error_3 })];
            case 6: return [2];
        }
    });
}); };
exports.upload = upload;
var deleteVideo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _id, file, video, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id, _id = req.session.user._id, file = req.query.file;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4, Video_1.default.findById({ _id: id })];
            case 2:
                video = _a.sent();
                if (!video) {
                    return [2, res.status(404).json({ ok: false, error: "Video is not found" })];
                }
                if (String(video.user) !== String(_id)) {
                    return [2, res.status(403).json({ ok: false, error: "Not authorized." })];
                }
                return [4, (0, shared_1.deleteToS3)(file)];
            case 3:
                _a.sent();
                return [4, Video_1.default.deleteOne({ _id: video._id })];
            case 4:
                _a.sent();
                return [4, User_1.default.findById(_id)];
            case 5:
                user = _a.sent();
                user === null || user === void 0 ? void 0 : user.videos.splice(user.videos.indexOf(video._id), 1);
                return [4, (user === null || user === void 0 ? void 0 : user.save())];
            case 6:
                _a.sent();
                return [2, res.status(201).json({ ok: true })];
            case 7:
                error_4 = _a.sent();
                return [2, res.json({ ok: false, error: error_4 })];
            case 8: return [2];
        }
    });
}); };
exports.deleteVideo = deleteVideo;
var edit = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, description, hashtags, video, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, hashtags = _a.hashtags;
                return [4, Video_1.default.findById({ _id: id })];
            case 1:
                video = _b.sent();
                if (!video) {
                    return [2, res.status(404).json({ ok: false, error: "Video is not found." })];
                }
                if (String(video.user) !== String(req.session.user._id)) {
                    return [2, res.status(403).json({ ok: false, error: "Not authorized." })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4, Video_1.default.findByIdAndUpdate(id, {
                        title: title,
                        description: description,
                        hashtags: Video_1.default.formatHashtags(hashtags),
                    })];
            case 3:
                _b.sent();
                return [2, res.json({ ok: true })];
            case 4:
                error_5 = _b.sent();
                return [2, res.json({ ok: false, error: error_5 })];
            case 5: return [2];
        }
    });
}); };
exports.edit = edit;
var search = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var keyword, videos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyword = req.params.keyword;
                console.log(keyword);
                if (!keyword) return [3, 2];
                return [4, Video_1.default.find({
                        title: {
                            $regex: new RegExp("^".concat(keyword), "i"),
                        },
                    }).populate({
                        path: "user",
                        select: {
                            username: 1,
                            avatarId: 1,
                        },
                    })];
            case 1:
                videos = _a.sent();
                return [2, res.json({ ok: true, videos: videos })];
            case 2: return [2, res.json({ ok: true, message: "Keyword is not provided" })];
        }
    });
}); };
exports.search = search;
var createComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var text, id, user, video, currentUser, comment, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = req.body.text, id = req.params.id, user = req.session.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4, Video_1.default.findById(id)];
            case 2:
                video = _a.sent();
                return [4, User_1.default.findById(user._id)];
            case 3:
                currentUser = _a.sent();
                if (!video) {
                    return [2, res
                            .status(401)
                            .json({ ok: false, error: "Could not found video." })];
                }
                return [4, Comment_1.default.create({
                        text: text,
                        user: user._id,
                        video: id,
                    })];
            case 4:
                comment = _a.sent();
                video.comments.push(comment._id);
                return [4, comment.save()];
            case 5:
                _a.sent();
                return [4, video.save()];
            case 6:
                _a.sent();
                return [2, res.status(201).json({ ok: true, comment: comment })];
            case 7:
                e_1 = _a.sent();
                return [2, res.json(401).json({ ok: false, error: "error: ".concat(e_1) })];
            case 8: return [2];
        }
    });
}); };
exports.createComment = createComment;
var deleteComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, commentId, user, comment, video, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id, commentId = req.query.commentId, user = req.session.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4, Comment_1.default.findById(commentId)];
            case 2:
                comment = _a.sent();
                if (!comment) {
                    return [2, res
                            .status(404)
                            .json({ ok: false, error: "Could not find comment." })];
                }
                if (String(comment.user) !== String(user._id)) {
                    return [2, res.status(403).json({ ok: false, error: "Not authorized." })];
                }
                return [4, Comment_1.default.deleteOne({ _id: commentId })];
            case 3:
                _a.sent();
                return [4, Video_1.default.findById(id)];
            case 4:
                video = _a.sent();
                video === null || video === void 0 ? void 0 : video.comments.splice(video.comments.indexOf(comment._id), 1);
                return [4, (video === null || video === void 0 ? void 0 : video.save())];
            case 5:
                _a.sent();
                return [2, res.status(201).json({ ok: true })];
            case 6:
                error_6 = _a.sent();
                return [2, res.status(400).json({ ok: false, error: "Error :".concat(error_6, ".") })];
            case 7: return [2];
        }
    });
}); };
exports.deleteComment = deleteComment;
var awsVideoUpload = function (req, res) {
    var file = req.file;
    if (!file) {
        return res.json({ ok: false, error: "Video not found." });
    }
    return res.json({ ok: true, file: file });
};
exports.awsVideoUpload = awsVideoUpload;
var increaseView = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundVideo, updatedVideo, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, Video_1.default.findById(id)];
            case 2:
                foundVideo = _a.sent();
                if (!foundVideo) {
                    return [2, res.json({ ok: false, error: "Not found video." })];
                }
                return [4, Video_1.default.findByIdAndUpdate(id, {
                        $set: { meta: { view: foundVideo.meta.view + 1 } },
                    })];
            case 3:
                updatedVideo = _a.sent();
                console.log(updatedVideo);
                return [2, res.status(201).json({ ok: true })];
            case 4:
                error_7 = _a.sent();
                console.log("increase view error");
                return [2, res.status(400).json({ ok: false, error: error_7 })];
            case 5: return [2];
        }
    });
}); };
exports.increaseView = increaseView;
