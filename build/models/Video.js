"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var videoSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, trim: true },
    createAt: { type: Date, required: true, default: Date.now() },
    hashtags: [{ type: String, trim: true }],
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    meta: {
        view: { type: Number, required: true, default: 0 },
    },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
});
videoSchema.static("formatHashtags", function formatHashtags(hashtags) {
    return hashtags
        .split(",")
        .map(function (word) { return (word.startsWith("#") ? word : "#".concat(word)); });
});
var Video = (0, mongoose_1.model)("Video", videoSchema);
exports.default = Video;
