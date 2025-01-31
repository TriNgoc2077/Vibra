import nodemailer from 'nodemailer';
interface User {
    fullName?: string | null,
    email?: string | null
}
export const sendMail = function message(merchantEmail: string, msgTxt: string, user: User, otp: string){

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: merchantEmail,
      subject: msgTxt,
      html:  `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Security Code</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Google Sans',Roboto,Arial,sans-serif; color: #202124; background-color: #f5f5f5;">
                    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 24px; box-sizing: border-box;">
                        
                        <!-- Main Content with enhanced design -->
                        <div style="background: #ffffff; border: 1px solid #dadce0; border-radius: 12px; padding: 40px 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                            <h1 style="font-size: 26px; font-weight: 500; margin: 0 0 24px 0; text-align: center; color: #1a73e8;">Verify your identity</h1>
                            
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #3c4043;">
                                Hi <span style="color: #1a73e8; font-weight: 500;">${user.fullName}</span>,
                            </p>
                            
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #3c4043;">
                                We received a request for a verification code for your account. Your verification code is:
                            </p>
                            
                            <!-- Enhanced OTP display -->
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%); 
                                        border-radius: 8px; 
                                        padding: 28px; 
                                        text-align: center; 
                                        margin-bottom: 24px;
                                        border: 2px solid rgb(241, 241, 241);">
                                <span style="font-size: 36px; 
                                          font-weight: 600; 
                                          letter-spacing: 8px; 
                                          color: #1a73e8;
                                          text-shadow: 1px 1px 1px rgba(0,0,0,0.1);">${otp}</span>
                            </div>
                            
                            <!-- Timer indication -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <p style="font-size: 14px; color: rgb(0, 0, 0); display: inline-block; padding: 8px 16px; background: rgb(235, 235, 235); border-radius: 20px;">
                                    This code will expire in 3 minutes
                                </p>
                            </div>
                            
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #3c4043;">
                                If you didn't request this code, you can safely ignore this email.
                            </p>
                            
                            <!-- Security notice with icon -->
                            <div style="border-top: 1px solid #dadce0; margin-top: 40px; padding-top: 20px;">
                                <p style="font-size: 13px; color: #5f6368; line-height: 1.5; margin: 0;">
                                    <strong>Security Notice:</strong> This is an automated email, please do not reply. Never share this code with anyone. Our employees will never ask for this code.
                                </p>
                            </div>
                        </div>
                        
                        <!-- Enhanced Footer with guaranteed visibility -->
                        <div style="background: #ffffff; 
                                    border: 1px solid #dadce0; 
                                    border-radius: 8px; 
                                    margin-top: 24px; 
                                    padding: 20px;
                                    text-align: center;
                                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="max-width: 400px; margin: 0 auto;">
                                <p style="font-size: 12px; color: #5f6368; line-height: 1.6; margin-bottom: 12px;">
                                    This email was sent to <span style="color: #1a73e8; font-weight: 500;">${user.email}</span>
                                </p>
                                <p style="font-size: 12px; color: #5f6368; line-height: 1.6; margin: 0;">
                                    © ${new Date().getFullYear()} <span style="color: #1a73e8; font-weight: 500;">Responsible by Cao Nguyen Tri Ngoc</span><br>
                                    All rights reserved.
                                </p>
                            </div>
                            
                            <!-- Company Address (Optional) -->
                            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #dadce0;">
                                <p style="font-size: 11px; color: #5f6368; line-height: 1.4; margin: 0;">
                                    Ho Chi Minh City, Viet Nam
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
              `      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  