import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const uploadUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await (
      await axios({
        /*    method: "POST",
        url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CL_ACCOUNTID}/images/v2/direct_upload`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CL_TOKEN}`,
        }, */
      })
    ).data;

    return res.status(201).json({ ok: true, ...response.result });
  } catch (e) {
    return res.status(500).json({ ok: false, error: `CF Error ,${e}` });
  }
};
