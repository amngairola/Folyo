import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    //extracts the email and password that were sent from your frontend login form.
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "invalid Credential",
      });
    }
    //If the credentials are correct, this line creates a JWT. This token is like a temporary digital key. It contains the admin's email and is signed with a secret key (JWT_SECRET from your .env file) to prevent tampering.

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
