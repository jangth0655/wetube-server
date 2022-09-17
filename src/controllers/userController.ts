import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const join = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, confirmPassword, name, location } =
    req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      ok: false,
      error: "Password confirmation does not match",
    });
  }
  const existUser = await User.exists({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });
  if (existUser) {
    return res.status(400).json({ ok: false, error: "User already taken" });
  }
  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(401).json({ ok: false, error });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).json({ ok: false, error: "User is not found." });
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res
      .status(400)
      .json({ ok: false, error: "Password or Username is incorrect." });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  req.session.save((error) => {
    if (error) res.json({ ok: false, error: "session not saved" });
  });
  res.status(201).json({ ok: true, loggedIn: req.session.loggedIn });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    console.error;
  });
  res.json({ ok: true });
};

export const see = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("videos");
    if (!user) {
      return res
        .status(404)
        .json({ ok: false, error: "Could not found user." });
    }
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res.status(404).json({ ok: false, error: `error : ${error}` });
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const {
    body: { name, email, username, location, avatarId },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const existUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (username && username !== req.session.user?.username) {
      if (username && username === existUser?.username) {
        return res.json({ ok: false, error: "Username is already taken." });
      }
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { username },
        {
          new: true,
        }
      );
      req.session.user = updatedUser;
    }

    if (email && email !== req.session.user?.email) {
      if (email && email === existUser?.email) {
        return res.json({ ok: false, error: "Email is already taken." });
      }
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { email },
        { new: true }
      );
      req.session.user = updatedUser;
    }

    if (avatarId && avatarId !== req.session.user.avatarId) {
      const updatedUser = await User.findByIdAndUpdate(_id, {
        avatarId,
      });
      req.session.user = updatedUser;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        location,
      },
      { new: true }
    );
    req.session.user = updatedUser;
    return res.status(201).json({ ok: true });
  } catch (e) {
    return res.status(400).json({ ok: false, error: `${e}` });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { currentPassword, newPassword, confirmNewPassword },
    session: {
      user: { _id, password },
    },
  } = req;

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      ok: false,
      error: "The password does not match the confirmation",
    });
  }
  try {
    const ok = await bcrypt.compare(currentPassword, password);
    if (!ok) {
      return res.json({
        ok: false,
        error: "The current password is incorrect.",
      });
    }
    const user = await User.findById(_id);
    user ? (user.password = newPassword) : null;
    user?.save();
    req.session.user.password = user?.password;
  } catch (error) {
    return res.status(400).json({ ok: false, error: `${error}` });
  }
  return res.status(201).json({ ok: true });
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  res.send("Delete user");
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ ok: false, error: "Could not found user." });
    }
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res.status(400).json({ ok: false, error: `Error: ${error}` });
  }
};
