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
exports.awsAvatarUpload = exports.me = exports.remove = exports.changePassword = exports.edit = exports.see = exports.logout = exports.login = exports.join = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = __importDefault(require("../models/User"));
var shared_1 = require("./shared");
var join = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, confirmPassword, name, location, existUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, password = _a.password, confirmPassword = _a.confirmPassword, name = _a.name, location = _a.location;
                if (password !== confirmPassword) {
                    return [2, res.status(400).json({
                            ok: false,
                            error: "Password confirmation does not match",
                        })];
                }
                return [4, User_1.default.exists({
                        $or: [
                            {
                                email: email,
                            },
                            {
                                username: username,
                            },
                        ],
                    })];
            case 1:
                existUser = _b.sent();
                if (existUser) {
                    return [2, res.status(400).json({ ok: false, error: "User already taken" })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4, User_1.default.create({
                        email: email,
                        username: username,
                        password: password,
                        name: name,
                        location: location,
                    })];
            case 3:
                _b.sent();
                return [2, res.status(201).json({ ok: true })];
            case 4:
                error_1 = _b.sent();
                return [2, res.status(401).json({ ok: false, error: error_1 })];
            case 5: return [2];
        }
    });
}); };
exports.join = join;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, passwordOk, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4, User_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2, res.json({ ok: false, error: "User is not found." })];
                }
                return [4, bcrypt_1.default.compare(password, user.password)];
            case 3:
                passwordOk = _b.sent();
                if (!passwordOk) {
                    return [2, res.json({
                            ok: false,
                            error: "Password or Username is incorrect.",
                        })];
                }
                req.session.loggedIn = true;
                req.session.user = user;
                req.session.save(function (error) {
                    if (error)
                        res.json({ ok: false, error: "session not saved" });
                });
                res.status(201).json({ ok: true, loggedIn: req.session.loggedIn });
                return [3, 5];
            case 4:
                error_2 = _b.sent();
                return [2, res.status(400).json({ ok: false, error: error_2 })];
            case 5: return [2];
        }
    });
}); };
exports.login = login;
var logout = function (req, res, next) {
    req.session.destroy(function (error) {
        console.error;
    });
    res.json({ ok: true });
};
exports.logout = logout;
var see = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, User_1.default.findById(id).populate("videos")];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2, res
                            .status(404)
                            .json({ ok: false, error: "Could not found user." })];
                }
                return [2, res.status(200).json({ ok: true, user: user })];
            case 3:
                error_3 = _a.sent();
                return [2, res.status(404).json({ ok: false, error: "error : ".concat(error_3) })];
            case 4: return [2];
        }
    });
}); };
exports.see = see;
var edit = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, username, location, avatarId, _id, existUser, updatedUser_1, updatedUser_2, updatedUser_3, updatedUser, e_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, username = _a.username, location = _a.location, avatarId = _a.avatarId, _id = req.session.user._id;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 12, , 13]);
                return [4, User_1.default.findOne({
                        $or: [{ username: username }, { email: email }],
                    })];
            case 2:
                existUser = _d.sent();
                if (!(username && username !== ((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.username))) return [3, 4];
                if (username && username === (existUser === null || existUser === void 0 ? void 0 : existUser.username)) {
                    return [2, res.json({ ok: false, error: "Username is already taken." })];
                }
                return [4, User_1.default.findByIdAndUpdate(_id, { username: username }, {
                        new: true,
                    })];
            case 3:
                updatedUser_1 = _d.sent();
                req.session.user = updatedUser_1;
                _d.label = 4;
            case 4:
                if (!(email && email !== ((_c = req.session.user) === null || _c === void 0 ? void 0 : _c.email))) return [3, 6];
                if (email && email === (existUser === null || existUser === void 0 ? void 0 : existUser.email)) {
                    return [2, res.json({ ok: false, error: "Email is already taken." })];
                }
                return [4, User_1.default.findByIdAndUpdate(_id, { email: email }, { new: true })];
            case 5:
                updatedUser_2 = _d.sent();
                req.session.user = updatedUser_2;
                _d.label = 6;
            case 6:
                if (!(avatarId && avatarId !== req.session.user.avatarId)) return [3, 10];
                console.log("avatarid", avatarId);
                console.log("current", req.session.user.avatarId);
                if (!req.session.user.avatarId) return [3, 8];
                return [4, (0, shared_1.deleteToS3)(req.session.user.avatarId)];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8: return [4, User_1.default.findByIdAndUpdate(_id, {
                    avatarId: avatarId,
                })];
            case 9:
                updatedUser_3 = _d.sent();
                req.session.user = updatedUser_3;
                _d.label = 10;
            case 10: return [4, User_1.default.findByIdAndUpdate(_id, {
                    name: name,
                    location: location,
                }, { new: true })];
            case 11:
                updatedUser = _d.sent();
                req.session.user = updatedUser;
                return [2, res.status(201).json({ ok: true })];
            case 12:
                e_1 = _d.sent();
                return [2, res.status(400).json({ ok: false, error: "".concat(e_1) })];
            case 13: return [2];
        }
    });
}); };
exports.edit = edit;
var changePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, currentPassword, newPassword, confirmNewPassword, _b, _id, password, ok, user, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, currentPassword = _a.currentPassword, newPassword = _a.newPassword, confirmNewPassword = _a.confirmNewPassword, _b = req.session.user, _id = _b._id, password = _b.password;
                if (newPassword !== confirmNewPassword) {
                    return [2, res.status(400).json({
                            ok: false,
                            error: "The password does not match the confirmation",
                        })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4, bcrypt_1.default.compare(currentPassword, password)];
            case 2:
                ok = _c.sent();
                if (!ok) {
                    return [2, res.json({
                            ok: false,
                            error: "The current password is incorrect.",
                        })];
                }
                return [4, User_1.default.findById(_id)];
            case 3:
                user = _c.sent();
                user ? (user.password = newPassword) : null;
                user === null || user === void 0 ? void 0 : user.save();
                req.session.user.password = user === null || user === void 0 ? void 0 : user.password;
                return [2, res.status(201).json({ ok: true })];
            case 4:
                error_4 = _c.sent();
                return [2, res.status(400).json({ ok: false, error: "".concat(error_4) })];
            case 5: return [2];
        }
    });
}); };
exports.changePassword = changePassword;
var remove = function (req, res, next) {
    res.send("Delete user");
};
exports.remove = remove;
var me = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.session.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, User_1.default.findById(_id).populate({
                        path: "videos",
                        select: {
                            url: 1,
                            title: 1,
                        },
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2, res
                            .status(404)
                            .json({ ok: false, error: "Could not found user." })];
                }
                return [2, res.status(200).json({ ok: true, user: user })];
            case 3:
                error_5 = _a.sent();
                return [2, res.status(400).json({ ok: false, error: "Error: ".concat(error_5) })];
            case 4: return [2];
        }
    });
}); };
exports.me = me;
var awsAvatarUpload = function (req, res, next) {
    var file = req.file;
    if (!file) {
        return res.json({ ok: false, error: "Video not found." });
    }
    return res.json({ ok: true, file: file });
};
exports.awsAvatarUpload = awsAvatarUpload;
