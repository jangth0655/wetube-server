import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import fetch from "node-fetch";

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
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.status(201).json({ ok: true });
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
  if (user.socialOnly) {
    return res.json({ ok: false, error: "깃헙으로 로그인하세요." });
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res
      .status(400)
      .json({ ok: false, error: "Password or Username is incorrect." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
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

export const startGithubLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const baseURL = `https://github.com/login/oauth/authorize`;
  const configObj = {
    client_id: process.env.GH_CLIENT!,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(configObj);
  const finalURL = `${baseURL}?${params}&allow_signup:false`;
  return res.json({ ok: true, url: finalURL });
};

export const finishGithubLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;
  const config = {
    client_id: process.env.GH_CLIENT!,
    client_secret: process.env.GH_SECRET!,
  };
  const baseURL = `https://github.com/login/oauth/access_token`;
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}&code=${code}`;
  try {
    const tokenRequest = await (
      await fetch(finalURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      })
    ).json();
    if (tokenRequest.access_token) {
      const { access_token } = tokenRequest;
      const apiURL = "https://api.github.com";
      const userData = await (
        await fetch(`${apiURL}/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();

      const emailData = await (
        await fetch(`${apiURL}/user/emails`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      const emailObj = emailData.find(
        (email: any) => email.primary === true && email.verified === true
      );
      if (!emailObj) {
        return res.json({ ok: false, error: "Could not found email." });
      }
      let user = await User.findOne({ email: emailObj.email });
      if (!user) {
        user = await User.create({
          name: userData.name,
          avatarUrl: userData.avatar_url,
          username: userData.login,
          email: emailObj.email,
          location: userData.location,
          password: "",
          socialOnly: true,
        });
      }
      req.session.loggedIn = true;
      req.session.user = user;
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false, error: "Could not found access-token." });
    }
  } catch (error) {
    console.error;
    return res.json({ ok: false, error });
  }
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
