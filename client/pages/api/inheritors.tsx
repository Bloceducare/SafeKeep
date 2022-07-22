import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@servers/config/database";
import userdb from "@servers/model/user";
import inheritordb from "@servers/model/inheritor";

connectDB();

type inheritor = {
  alias: string;
  address: string;
};

type allInheritors = {
  addresses: inheritor[];
  userId: string;
};

const router = createRouter<NextApiRequest, NextApiResponse>();
// get inheritors data
router.get(async (req, res) => {
  const { address } = req.query;
  try {
    await inheritordb.findOne({ address: address }).then((data) => {
      console.log(data);
      return res.status(200).json({
        status: true,
        message: "inheritors retrieved successfully",
        data,
      });
    });
  } catch (e) {
    console.log(e);
  }
});

// create inheritors
router.post(async (req, res) => {
  let { addresses, userId }: allInheritors = req.body.data;
  const userInfo = [];

  try {
    let user = await userdb.findById({ _id: userId });

    if (!user) {
      return res.status(423).json({
        status: false,
        message: "User doesn't exist",
      });
    }
    // console.log(user);

    for (let i = 0; i < addresses.length; i++) {
      let inheritor = new inheritordb({
        address: addresses[i].address.toLowerCase(),
        alias: addresses[i].alias.toLowerCase(),
      });
      await inheritor.users.push(user);
      const id = await inheritor._id;
      await inheritor.save();
      const userId = await String(user._id);
      await userdb
        .findByIdAndUpdate(
          { _id: userId },
          { $push: { inheritors: inheritor } },
          { safe: true, upsert: true, new: true }
        )
        .clone()
        .catch(function (err) {
          console.log(err);
        });
      userInfo.push({
        id: String(id),
        alias: addresses[i].alias.toLowerCase(),
        address: addresses[i].address.toLowerCase(),
        ethAllocated: Number(addresses[i]) * 10 ** 18,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Inheritors registered succesfully",
      data: userInfo,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "An eror occured, please try again later",
      error: e,
    });
  }
});

// edit inheritor alias
router.put(async (req, res) => {
  const { address, alias } = req.body.data;
  try {
    await inheritordb
      .findOneAndUpdate(
        { address: address.toLowerCase() },
        { $set: { alias: alias } },
        { new: true }
      )
      .then((data) => {
        res.status(200).json({
          status: true,
          message: "inheritor alias modified successfully",
          data,
        });
      });
  } catch (e) {
    console.log(e);
  }
});

// delete inheritor
router.delete(async (req, res) => {
  const { address } = req.query;
  try {
    await inheritordb.findOneAndDelete({ address: address }).then((data) => {
      res.status(200).json({
        status: true,
        message: "inheritors deleted successfully",
        data,
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
