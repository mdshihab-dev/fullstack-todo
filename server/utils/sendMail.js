const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})


const sendMail = async (email, verificationToken) => {

   let verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`
  await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `
     <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="400" cellpadding="0" cellspacing="0" style="background:#ddd;border-radius:8px;padding:20px;text-align:center;box-shadow:0 0 8px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="font-size:18px;color:#333333;font-weight:bold;padding-bottom:10px;">
                Confirm Your Email
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#555555;padding:10px 0 20px 0;">
                Please click the button below to verify your account.
              </td>
            </tr>
            <tr>
              <td>
                <a href= ${verifyLink} style="display:inline-block;background-color:#007BFF;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:5px;font-size:14px;">
                  Verify Account
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#999999;padding-top:20px;">
                If you didn’t create this account, please ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
        `
    })

}

module.exports = sendMail