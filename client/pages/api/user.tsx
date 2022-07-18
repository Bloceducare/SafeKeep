import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@servers/config/database";
import mongoose from "mongoose";
import userdb from "@servers/model/user";
import inheritordb from "@servers/model/inheritor";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

// create a user
router.post(async (req, res) => {
  const { address } = req.body.data;
  console.log(address);
  if (req.method === "POST") {
    !address
      ? res.status(423).json({
          status: false,
          message: "All fields are required",
        })
      : "";

    try {
      await userdb.findOne({ address }).then((user) => {
        if (user) {
          return res
            .status(423)
            .send({ status: false, message: "This address already exists" });
        }

        let userData = new userdb({ address: address.toLowerCase() });
        userData
          .save()
          .then(() => {
            return res.status(200).json({
              status: true,
              message: `Hi, ${address}, Your registration was successful`,
            });
          })
          .catch((e) => {
            return res.status(500).json({
              status: false,
              message: "Error creating your account",
              error: e,
            });
          });
      });
    } catch (e) {
      res.status(423).send("error");
    }
  }
});

// Get all the inheritors of an address (convert address query to lower case before sending it)
router.get(async (req, res) => {
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
