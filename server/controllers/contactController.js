import sendEmail from "../utils/sendEmail.js";

import { contactTemplate } from "../utils/contactTemplate.js";
import { contactReplyTemplate } from "../utils/contactReplyTemplate.js";

export const contact = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // Validation

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // ============================================
    // Send enquiry to Admin
    // ============================================

    await sendEmail({
      to: process.env.CONTACT_EMAIL,

      subject: `📩 New Contact Message - ${subject}`,

      html: contactTemplate({
        name,
        email,
        subject,
        message,
      }),
    });

    // ============================================
    // Auto Reply (Optional)
    // ============================================

    try {
      await sendEmail({
        to: email,

        subject:
          "We've received your message | RoadmapMaker",

        html: contactReplyTemplate({
          name,
        }),
      });
    } catch (err) {
      console.log(
        "Auto reply skipped:",
        err.message
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to send your message. Please try again later.",
    });
  }
};