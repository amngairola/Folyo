import nodemailer from "nodemailer";

/**
 * Sends a "New Post" notification email to a single subscriber.
 * @param {string} subscriberEmail - The email address of the recipient.
 * @param {object} blog - The blog post object containing title, subTitle, and _id.
 */
export const sendNewPostEmail = async (subscriberEmail, blog) => {
  console.log("GMAIL User:", process.env.GMAIL_USER);
  console.log("GMAIL App Password:", process.env.GMAIL_APP_PASSWORD);
  try {
    // 1. Configure the email transporter using Gmail and credentials from environment variables.
    // For production, it's recommended to use a dedicated email service like SendGrid or Mailgun.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 2. Create the HTML content for the email body.
    const emailHtml = `
      <h1>New Post on Folyo!</h1>
      <h2>${blog.title}</h2>
      <p>${blog.subTitle}</p>
      <a href="https://try-folyo.vercel.app/blog/${blog._id}">Read More</a>
    `;

    // 3. Define the email options, including sender, recipient, subject, and content.
    const mailOptions = {
      from: `"Folyo Blog" <${process.env.GMAIL_USER}>`,
      to: subscriberEmail,
      subject: `New Post: ${blog.title}`,
      html: emailHtml,
    };

    // 4. Send the email using the configured transporter.
    await transporter.sendMail(mailOptions);
    console.log(`Newsletter sent successfully to ${subscriberEmail}`);
  } catch (error) {
    // 5. CRITICAL: Log any errors that occur during the email sending process.
    // This is essential for debugging issues with credentials, network, or the email service.
    console.error(`Failed to send email to ${subscriberEmail}:`, error);
  }
};
