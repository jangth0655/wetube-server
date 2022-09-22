import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";
import User from "../models/User";
import Video from "../models/Video";
import { deleteToS3 } from "./shared";

export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate({
        path: "user",
        select: {
          username: 1,
          avatarId: 1,
        },
      });

    return res.status(200).json({ ok: true, videos });
  } catch (error) {
    return res.status(404).json({ ok: false, error });
  }
};

export const watch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id)
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
      });
    if (video) {
      return res.json({ ok: true, video });
    }
    return res.status(404).json({ ok: false, error: "Video is not found" });
  } catch (error) {
    return res.status(404).json({ ok: false, error: `error : ${error}` });
  }
};

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { title, description, hashtags, file, thumbnailURL },
    session: { user },
  } = req;
  const userId = user._id;

  try {
    const newVideo = await Video.create({
      url: file ? file : null,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags) as any,
      createAt: Date.now(),
      thumbnailURL,
      user: userId,
    });
    const user = await User.findById(userId);
    user?.videos.push(newVideo._id);
    await user?.save();
    return res.status(201).json({ ok: true, file });
  } catch (error) {
    return res.status(400).json({ ok: false, error });
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    query: { file },
  } = req;

  try {
    const video = await Video.findById({ _id: id });
    if (!video) {
      return res.status(404).json({ ok: false, error: "Video is not found" });
    }
    if (String(video.user) !== String(_id)) {
      return res.status(403).json({ ok: false, error: "Not authorized." });
    }
    await deleteToS3(file);
    await Video.deleteOne({ _id: video._id });

    const user = await User.findById(_id);
    user?.videos.splice(user.videos.indexOf(video._id), 1);
    await user?.save();
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.json({ ok: false, error });
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById({ _id: id });
  if (!video) {
    return res.status(404).json({ ok: false, error: "Video is not found." });
  }
  if (String(video.user) !== String(req.session.user._id)) {
    return res.status(403).json({ ok: false, error: "Not authorized." });
  }
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.json({ ok: true });
  } catch (error) {
    return res.json({ ok: false, error });
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { keyword } = req.params;
  console.log(keyword);
  if (keyword) {
    const videos = await Video.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
      },
    }).populate({
      path: "user",
      select: {
        username: 1,
        avatarId: 1,
      },
    });
    return res.json({ ok: true, videos });
  }
  return res.json({ ok: true, message: "Keyword is not provided" });
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { text },
    params: { id },
    session: { user },
  } = req;

  try {
    const video = await Video.findById(id);
    const currentUser = await User.findById(user._id);
    if (!video) {
      return res
        .status(401)
        .json({ ok: false, error: "Could not found video." });
    }

    const comment = await Comment.create({
      text,
      user: user._id,
      video: id,
    });
    video.comments.push(comment._id);
    await comment.save();
    await video.save();
    return res.status(201).json({ ok: true, comment });
  } catch (e) {
    return res.json(401).json({ ok: false, error: `error: ${e}` });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    query: { commentId },
    session: { user },
  } = req;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ ok: false, error: "Could not find comment." });
    }
    if (String(comment.user) !== String(user._id)) {
      return res.status(403).json({ ok: false, error: "Not authorized." });
    }
    await Comment.deleteOne({ _id: commentId });
    const video = await Video.findById(id);
    video?.comments.splice(video.comments.indexOf(comment._id), 1);
    await video?.save();
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(400).json({ ok: false, error: `Error :${error}.` });
  }
};

export const awsVideoUpload = (req: Request, res: Response) => {
  const { file } = req;
  if (!file) {
    return res.json({ ok: false, error: "Video not found." });
  }
  return res.json({ ok: true, file });
};

export const increaseView = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const {
    params: { id },
  } = req;

  try {
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.json({ ok: false, error: "Not found video." });
    }
    const updatedVideo = await Video.findByIdAndUpdate(id, {
      $set: { meta: { view: foundVideo.meta.view + 1 } },
    });
    console.log(updatedVideo);
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log("increase view error");
    return res.status(400).json({ ok: false, error: error });
  }
};
