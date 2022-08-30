import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Video from "../models/Video";

export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
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
    const video = await Video.findById(id).populate("user");
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
    body: { title, description, hashtags, url },
    session: { user },
  } = req;
  const userId = user._id;
  try {
    const newVideo = await Video.create({
      url: url ? url : null,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags) as any,
      createAt: Date.now(),
      meta: {
        views: 0,
        rating: 0,
      },
      user: userId,
    });
    const user = await User.findById(userId);
    user?.videos.push(newVideo._id);
    await user?.save();
    console.log(user?.videos);
    return res.status(201).json({ ok: true });
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
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    if (!video) {
      return res.status(404).json({ ok: false, error: "Video is not found" });
    }
    if (String(video.user) !== String(_id)) {
      return res.status(403).json({ ok: false, error: "Not authorized." });
    }
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
  const { keyword } = req.query;
  if (keyword) {
    const videos = await Video.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
      },
    });
    return res.json({ ok: true, videos });
  }
  return res.json({ ok: true, message: "Keyword is not provided" });
};
