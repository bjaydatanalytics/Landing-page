type WelcomeEmailInput = {
  fullName: string;
  email: string;
  serviceInterest: string;
};

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}

export async function sendWelcomeEmail({
  fullName,
  email,
  serviceInterest,
}: WelcomeEmailInput) {
  if (!isEmailConfigured()) {
    console.warn("Welcome email skipped: email environment variables are missing.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: email,
      subject: "Thank you for reaching out to Innersolv.",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111326; line-height: 1.7; max-width: 620px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #04c7f4, #0878f5, #b4238a); padding: 28px; border-radius: 18px 18px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Innersolv.</h1>
            <p style="margin: 8px 0 0;">Innovating minds and brands for global relevance.</p>
          </div>
          <div style="border: 1px solid #dfe8ff; border-top: 0; padding: 28px; border-radius: 0 0 18px 18px;">
            <p>Hello ${fullName},</p>
            <p>Thank you for reaching out to Innersolv. We have received your inquiry about <strong>${serviceInterest}</strong>.</p>
            <p>Our team will review your message and contact you shortly with the best next step.</p>
            <p style="margin-top: 28px;">Warm regards,<br /><strong>The Innersolv Team</strong></p>
          </div>
        </div>
      `,
      text: `Hello ${fullName},\n\nThank you for reaching out to Innersolv. We have received your inquiry about ${serviceInterest}.\n\nOur team will review your message and contact you shortly with the best next step.\n\nWarm regards,\nThe Innersolv Team`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Welcome email failed: ${response.status} ${errorText}`);
  }
}
