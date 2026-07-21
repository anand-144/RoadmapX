import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const sendContactMessage = async ({
  name,
  email,
  subject,
  message,
}) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/contact`,
      {
        name,
        email,
        subject,
        message,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};