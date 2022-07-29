import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@servers/config/database";
import userdb from "@servers/model/user";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();


// Get all the inheritors of an address (convert address query to lower case before sending it)
router.get(async (req, res) => {
  console.log(req.query)
  const { address } = req.query;
  try {
    await userdb
      .findOne({ address: address })
      .populate("inheritors")
      .then((user) => {
        console.log(user);
        return res.status(200).json({
          status: true,
          message: "inheritors retrieved successfully",
          user,
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
        error:e,
        message:'server error'
    })
  }
});

export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
