import { json } from '@sveltejs/kit';
import { WEB3FORMS_ACCESS_KEY } from '$env/static/private';

export async function POST({ request }) {
    try {
        const data = await request.json();

        // 1. Basic validation
        if (!data.name || !data.email || !data.message || !data["h-captcha-response"]) {
            return json({ success: false, message: 'Incomplete transmission data.' }, { status: 400 });
        }

        // 2. Transmit to Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                name: data.name,
                email: data.email,
                message: data.message,
                "h-captcha-response": data["h-captcha-response"],
                subject: `Contact Form: ${data.name}`
            }),
        });

        const result = await response.json();
        return json({ success: result.success, message: result.message });

    } catch (err) {
        console.error("API Route Error:", err);
        return json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}