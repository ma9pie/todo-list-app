import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  list: Array<object>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ list: [] });
}
