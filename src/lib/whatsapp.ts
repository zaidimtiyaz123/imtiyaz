interface WhatsAppContactData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

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

export async function sendContactInquiryWhatsApp(data: WhatsAppContactData): Promise<boolean> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const salesNumber = process.env.SALES_WHATSAPP_NUMBER;

  if (!accessToken || accessToken === 'your_token') {
    console.warn('WhatsApp access token not configured. Skipping WhatsApp message.');
    return false;
  }

  if (!phoneNumberId || phoneNumberId === 'your_id') {
    console.warn('WhatsApp phone number ID not configured. Skipping WhatsApp message.');
    return false;
  }

  const serviceLabel = serviceLabels[data.service] || data.service;
  const budgetLabel = budgetLabels[data.budget] || data.budget;
  const timelineLabel = timelineLabels[data.timeline] || data.timeline;

  const text = `🆕 *New Contact Inquiry - Creator of Technology*\n\n` +
    `*Name:* ${data.name}\n` +
    `*Email:* ${data.email}\n` +
    `*Phone:* ${data.phone}\n` +
    `${data.company ? `*Company:* ${data.company}\n` : ''}` +
    `*Service:* ${serviceLabel}\n` +
    `*Budget:* ${budgetLabel}\n` +
    `*Timeline:* ${timelineLabel}\n\n` +
    `*Message:*\n${data.message}\n\n` +
    `📩 Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: data.phone.replace(/[^0-9]/g, ''),
          type: 'text',
          text: { body: text },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WhatsApp API error: ${response.status} - ${errorText}`);
    }

    console.log('Contact inquiry WhatsApp sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact inquiry WhatsApp:', error);
    return false;
  }
}
