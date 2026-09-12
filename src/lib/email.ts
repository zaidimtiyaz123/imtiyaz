import nodemailer from 'nodemailer';

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactInquiryEmail(data: ContactEmailData): Promise<boolean> {
  try {
    const serviceLabels: Record<string, string> = {
      'web-development': 'Web Development',
      'mobile-app-development': 'Mobile App Development',
      'custom-software': 'Custom Software Development',
      'ecommerce': 'E-commerce Solutions',
      'cloud-devops': 'Cloud & DevOps',
      'ui-ux-design': 'UI/UX Design',
      'ai-ml': 'AI & Machine Learning',
      'maintenance': 'Maintenance & Support',
      'other': 'Other / Not Sure',
    };

    const budgetLabels: Record<string, string> = {
      '2k-5k': '₹2,000 - ₹5,000',
      '5k-10k': '₹5,000 - ₹10,000',
      '10k-25k': '₹10,000 - ₹25,000',
      '25k-50k': '₹25,000 - ₹50,000',
      '50k-100k': '₹50,000 - ₹1,00,000',
      '100k-250k': '₹1,00,000 - ₹2,50,000',
      '250k-500k': '₹2,50,000 - ₹5,00,000',
      '500k-1000k': '₹5,00,000 - ₹10,00,000',
      '1000k+': '₹10,00,000+',
      'not-sure': "Let's Discuss",
    };

    const timelineLabels: Record<string, string> = {
      'asap': 'ASAP',
      '1-2-months': '1-2 Months',
      '3-6-months': '3-6 Months',
      '6-12-months': '6-12 Months',
      '12-months+': '12+ Months',
      'ongoing': 'Ongoing / Retainer',
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Contact Inquiry</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Creator of Technology</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
            <h2 style="margin: 0 0 20px; font-size: 18px; color: #1f2937; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; width: 140px;">Name:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Email:</td>
                <td style="padding: 10px 0; color: #1f2937;"><a href="mailto:${data.email}" style="color: #0ea5e9; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Phone:</td>
                <td style="padding: 10px 0; color: #1f2937;"><a href="tel:${data.phone}" style="color: #0ea5e9; text-decoration: none;">${data.phone}</a></td>
              </tr>
              ${data.company ? `
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Company:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.company}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
            <h2 style="margin: 0 0 20px; font-size: 18px; color: #1f2937; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Project Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; width: 140px;">Service:</td>
                <td style="padding: 10px 0; color: #1f2937;">${serviceLabels[data.service] || data.service}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Budget:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 500;">${budgetLabels[data.budget] || data.budget}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Timeline:</td>
                <td style="padding: 10px 0; color: #1f2937;">${timelineLabels[data.timeline] || data.timeline}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px; font-size: 18px; color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Message</h2>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #0ea5e9; white-space: pre-wrap; font-family: inherit;">${data.message}</div>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <p style="margin: 0; font-size: 13px; color: #1e40af;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours. 
              You can reply directly to this email or contact the client via phone/WhatsApp.
            </p>
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              This inquiry was submitted via the contact form on <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://creatoroftechnology.com'}" style="color: #0ea5e9;">Creator of Technology</a>
            </p>
            <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af;">
              Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
New Contact Inquiry - Creator of Technology

CONTACT DETAILS:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.company ? `Company: ${data.company}` : ''}

PROJECT DETAILS:
Service: ${serviceLabels[data.service] || data.service}
Budget: ${budgetLabels[data.budget] || data.budget}
Timeline: ${timelineLabels[data.timeline] || data.timeline}

MESSAGE:
${data.message}

---
Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Submitted via: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://creatoroftechnology.com'}
    `;

    const mailOptions = {
      from: `"Creator of Technology" <${process.env.FROM_EMAIL || 'noreply@creatoroftechnology.com'}>`,
      to: 'crateprogects@gmail.com',
      subject: `New Inquiry: ${data.name} - ${serviceLabels[data.service] || data.service}`,
      text: textContent,
      html: htmlContent,
      replyTo: data.email,
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact inquiry email sent successfully to crateprogects@gmail.com');
    return true;
  } catch (error) {
    console.error('Failed to send contact inquiry email:', error);
    return false;
  }
}

export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
    return false;
  }
}