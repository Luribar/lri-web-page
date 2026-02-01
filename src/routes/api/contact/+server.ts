// src/routes/api/contact/+server.ts
import { json } from '@sveltejs/kit';
import { WEB3FORMS_ACCESS_KEY } from '$env/static/private';

export async function POST({ request }) {
    try {
        const data = await request.json();

        // Validate basic data
        if (!data.name || !data.email || !data.message) {
            return json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        // Send to Web3Forms from the SERVER (Key is hidden here)
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY, // Injected securely
                name: data.name,
                email: data.email,
                message: data.message,
                // Optional: Honeypot for spam protection
                botcheck: data.botcheck 
            }),
        });

        const result = await response.json();

        if (result.success) {
            return json({ success: true });
        } else {
            return json({ success: false, message: 'External API Error' }, { status: 500 });
        }

    } catch (err) {
        console.error(err);
        return json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}