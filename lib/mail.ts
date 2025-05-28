// // import { Resend } from "resend";

// // const resend = new Resend(process.env.RESEND_API_KEY);
// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host:"smtp.gmail.com",
//   port:587,
//   secure:false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function sendMail(to: string, subject: string, html: string) {
//  try {
//     const info = await transporter.sendMail({
//       from: `"VR Jakarta" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });
//     // console.log("Email sent: ", info.messageId);
//   } catch (error) {
//     // console.error("Failed to send email:", error);
//   }

// //   console.log("Email sent: ", info.messageId);
// }
