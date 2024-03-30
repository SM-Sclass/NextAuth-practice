import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
const nodemailer = require('nodemailer')

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {$set:{ verifyToken: hashedToken, verifyTokenEpiry: Date.now() + 3600000 }
        })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {$set:{ forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
        })

        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c6a5c6c7392820",
              pass: "58dfc4c060c05b"
            }
          });
        const mailOption = {
            from: '',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            text: "Hello ",
            html: `<p> Click <a href= "${process.env.DOMAIN}/ verifyemail? token= ${hashedToken}">
            here</a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"} 
            or copy and paste the link below in yout browser<br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}       
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOption)
        return mailResponse
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}  