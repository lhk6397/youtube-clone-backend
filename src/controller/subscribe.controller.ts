import { Types } from "mongoose";
import Subscriber from "../models/Subscriber";
import User from "../models/User";
import { asyncFunc } from "../types/types";

export const getSubscribeNumber: asyncFunc = async (req, res) => {
  try {
    const subscribe = await Subscriber.find({ userTo: req.body.userTo });
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getSubscribedInfo: asyncFunc = async (req, res) => {
  try {
    let result = false;
    const subscribe = await Subscriber.find({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });
    if (subscribe.length !== 0) result = true;
    return res.status(200).json({ success: true, subscribed: result });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const subscribe: asyncFunc = async (req, res) => {
  try {
    const subscribe = new Subscriber(req.body);
    await subscribe.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

export const unsubscribe: asyncFunc = async (req, res) => {
  try {
    await Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const getSubscribedUser: asyncFunc = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ userFrom: req.body.userFrom });
    let subscribedUserId: Types.ObjectId[] = [];
    subscribers.map((subscriber, i) => {
      subscribedUserId.push(subscriber.userTo);
    });

    const subscribedUser = await User.find({ _id: { $in: subscribedUserId } });

    return res.status(200).json({ success: true, subscribedUser });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};
