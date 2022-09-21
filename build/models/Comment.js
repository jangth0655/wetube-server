"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    text: { type: String, require: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, require: true, ref: "User" },
    video: { type: mongoose_1.Schema.Types.ObjectId, require: true, ref: "Video" },
    createdAt: { type: Date },
});
var Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
