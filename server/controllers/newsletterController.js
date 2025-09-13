import subscriber from "../models/subscriber.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required.",
      });
    }

    const existingSubscriber = await subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.json({
        success: true,
        message: "You are already subscribed!",
      });
    }

    await subscriber.create({ email });
    res.json({
      success: true,
      message: "Thank you for subscribing!!",
    });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
