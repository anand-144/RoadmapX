import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const optionalProtect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return next();
    }

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
    }

    next();
  } catch {
    next();
  }
};