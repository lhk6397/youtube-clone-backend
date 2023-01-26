import View from "../models/View";
import { asyncFunc } from "../types/types";

export const getViews: asyncFunc = async (req, res) => {
  try {
    const views = await View.find({ videoId: req.body.videoId });
    return res.status(200).json({ success: true, views });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const updateView: asyncFunc = async (req, res) => {
  try {
    const view = new View(req.body);
    await view.save();
    const views = await View.find({ videoId: req.body.videoId });

    return res.status(200).json({ success: true, views });
  } catch (err) {
    return res.status(400).send(err);
  }
};
