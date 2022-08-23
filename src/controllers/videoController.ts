import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";

export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.json({ ok: true, videos });
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
  const video = await Video.findById(id);
  if (video) {
    return res.json({ ok: true, video });
  }
  return res.status(404).json({ ok: false, error: "Video is not found" });
};

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags) as any,
      createAt: Date.now(),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.send({ ok: false, error });
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const video = await Video.exists({ _id: id });
    if (!video) {
      return res.status(404).json({ ok: false, error: "Video is not found" });
    }
    await Video.findByIdAndDelete(id);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.json({ ok: false, error });
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).json({ ok: false, error: "Video is not found" });
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
