import nodemailer from "nodemailer";

const message = `
Welcome to EcoShop\n\n\n
 Thank you for joining us. We're excited to have you as a part of our community.
   With EcoShop, you can explore eco-friendly products and make a positive impact on the environment.
    Feel free to browse our products and start shopping today!
    If you have any questions or need assistance, please don't hesitate to reach out to our support team.
\nThank you again for choosing EcoShop.`;
 

const sendEmail =async (option)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
           user: "bilelyousfi101@gmail.com",
           pass: "muvqutswlryaipvt"
        }
     });
     
     const mailOptions = {
        from: "bilelyousfi101@gmail.com",
        to: option.email,
        subject: option.subject,
        text: message
     };
     
     await transporter.sendMail(mailOptions)
}


export default sendEmail;