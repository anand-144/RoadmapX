import Notification from "../models/Notification.js";

const createNotification = async ({
  recipient,
  sender = null,
  roadmap = null,
  type,
  message,
}) => {
  try {
    if (!recipient) return;

    // Don't notify yourself
    if (
      sender &&
      recipient.toString() === sender.toString()
    ) {
      return;
    }

    await Notification.create({
      recipient,
      sender,
      roadmap,
      type,
      message,
    });
  } catch (err) {
    console.error("Notification Error:", err.message);
  }
};

export default createNotification;