import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';

// Initialize the SDK
const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
    try {
        const data = await request.json();

        // 1. Honeypot Validation
        if (data.botcheck) {
            return json({ success: false, message: 'Spam detected.' }, { status: 400 });
        }

        // 2. Basic Validation
        if (!data.name || !data.email || !data.message) {
            return json({ success: false, message: 'Please fill out all required fields.' }, { status: 400 });
        }

        // 3. Sanitize inputs (Prevents HTML injection in your inbox)
        const safeName = data.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeEmail = data.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeMessage = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // 4. Send via Resend
        const { error } = await resend.emails.send({
            // Dynamic From Name: Looks like "Lucas Rivero via Personal Web Page" in your inbox list
            from: `${safeName} via Personal Web Page <hello@lucasriveroiribarne.com>`, 
            
            to: 'lucas.riveroiribarne@gmail.com', 
            
            // Format the Reply-To properly so you can just hit 'Reply'
            replyTo: `${safeName} <${safeEmail}>`, 
            
            subject: `New Message from ${safeName} |  LRI Personal Web Page`,
            
            // TEXT FALLBACK: Crucial for bypassing spam filters
            text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
            
            // PROFESSIONAL HTML: Styled nicely for your inbox
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                    <h2 style="color: #333; margin-top: 0;">New Portfolio Message</h2>
                    <p style="color: #666; font-size: 14px;">You received a new message via your website contact form.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${safeName}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                    </div>
                    
                    <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #444;">${safeMessage}</div>
                    
                    <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0 20px 0;" />
                    <p style="color: #999; font-size: 12px; text-align: center;">Sent securely via Resend from lucasriveroiribarne.com</p>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return json({ success: false, message: 'Failed to send email.' }, { status: 500 });
        }

        return json({ success: true, message: 'Message sent successfully!' });

    } catch (err) {
        console.error("API Route Error:", err);
        return json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}