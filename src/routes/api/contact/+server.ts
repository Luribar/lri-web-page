import { json } from '@sveltejs/kit';
import { WEB3FORMS_ACCESS_KEY } from '$env/static/private';

export async function POST({ request }) {
    try {
        const data = await request.json();

        // 1. Honeypot Validation: If a bot filled this out, silently reject it
        if (data.botcheck) {
            return json({ success: false, message: 'Spam detected.' }, { status: 400 });
        }

        // 2. Basic Validation: Ensure humans filled out the real fields
        if (!data.name || !data.email || !data.message) {
            return json({ success: false, message: 'Please fill out all required fields.' }, { status: 400 });
        }

        // 3. Transmit to Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json" // Crucial to prevent HTML error pages
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                name: data.name,
                email: data.email,
                message: data.message,
                subject: `New Portfolio Message from ${data.name}`
            }),
        });

        // 4. SAFETY CHECK: Did Web3Forms actually send JSON back?
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            // If it's HTML (like a 404 or Cloudflare block), read it as text
            const htmlError = await response.text();
            console.error("Web3Forms sent HTML instead of JSON! Response snippet:", htmlError.substring(0, 500));
            return json({ success: false, message: 'Third-party API failed.' }, { status: 502 });
        }

        // 5. Parse the successful JSON response
        const result = await response.json();
        
        // Return the exact result back to the frontend
        return json({ 
            success: result.success, 
            message: result.message || 'Something went wrong on our end.' 
        });

    } catch (err) {
        console.error("API Route Error:", err);
        return json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}