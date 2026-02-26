<script lang="ts">
    import { isContactOpen } from '$lib/stores/contactStore';
    import { fade, fly } from 'svelte/transition';

    // State using Svelte 5 runes
    let name = $state('');
    let email = $state('');
    let message = $state('');
    let captchaToken = $state(''); 
    let isCaptchaReady = $state(false);
    let sending = $state(false);
    let success = $state(false);

    /**
     * Renders the hCaptcha widget.
     * This function is designed to handle the "explicit" render 
     * required when scripts load asynchronously.
     */
    function renderCaptcha(retries = 0) {
        const { hcaptcha } = window as any;
        const container = document.getElementById('h-captcha-container');
        
        // Retry logic to ensure library and DOM are both ready
        if (!hcaptcha || !container) {
            if (retries < 20) {
                setTimeout(() => renderCaptcha(retries + 1), 250);
            }
            return;
        }

        container.innerHTML = ""; // Clear any "Initializing" text

        try {
            hcaptcha.render('h-captcha-container', {
                // YOUR REAL SITEKEY
                sitekey: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",
                theme: 'dark',
                callback: (token: string) => { 
                    captchaToken = token; 
                },
                'expired-callback': () => { captchaToken = ''; },
                'error-callback': () => { isCaptchaReady = false; },
                'render-callback': () => { isCaptchaReady = true; }
            });
            
            // Failsafe visibility
            setTimeout(() => { isCaptchaReady = true; }, 1200);
        } catch (e) {
            console.error("hCaptcha Error:", e);
        }
    }

    // Effect triggers when modal opens
    $effect(() => {
        if ($isContactOpen && !success) {
            const timer = setTimeout(renderCaptcha, 600);
            return () => clearTimeout(timer);
        }
    });

    function close() {
        isContactOpen.set(false);
        // Reset states after the modal closes
        setTimeout(() => { 
            success = false; 
            name = ''; 
            email = ''; 
            message = ''; 
            captchaToken = ''; 
            isCaptchaReady = false;
        }, 500);
    }

    async function handleSubmit() {
        if (!captchaToken) return;
        sending = true;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    message, 
                    "h-captcha-response": captchaToken 
                }),
            });

            const result = await response.json();
            if (result.success) {
                success = true;
                setTimeout(close, 3000);
            } else {
                alert("Submission failed: " + result.message);
                if ((window as any).hcaptcha) (window as any).hcaptcha.reset();
                captchaToken = '';
            }
        } catch (error) {
            alert("Network error. Check your connection.");
        } finally {
            sending = false;
        }
    }
</script>

{#if $isContactOpen}
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4" transition:fade>
        <div class="absolute inset-0 bg-background/80 backdrop-blur-md" onclick={close} role="button" tabindex="0" onkeydown={(e) => e.key === 'Escape' && close()}></div>

        <div class="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-lg overflow-hidden z-50" transition:fly={{ y: 20 }}>
            <div class="p-8">
                {#if success}
                    <div class="flex flex-col items-center py-12 text-center" in:fade>
                        <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 border border-primary/20">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <h2 class="text-2xl font-bold uppercase italic">Message Sent</h2>
                    </div>
                {:else}
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold tracking-tighter uppercase italic">Contact</h2>
                        <button onclick={close} class="text-muted-foreground hover:text-foreground text-xl">✕</button>
                    </div>

                    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
                        <input bind:value={name} required placeholder="Name" class="w-full bg-muted/20 border border-border rounded-md p-3 text-sm focus:border-primary outline-none" />
                        <input bind:value={email} type="email" required placeholder="Email" class="w-full bg-muted/20 border border-border rounded-md p-3 text-sm focus:border-primary outline-none" />
                        <textarea bind:value={message} required rows="4" placeholder="Message" class="w-full bg-muted/20 border border-border rounded-md p-3 text-sm focus:border-primary outline-none resize-none"></textarea>

                        <div class="relative flex justify-center my-2 min-h-[78px]">
                            <div id="h-captcha-container" class="z-10 transition-opacity duration-500 {isCaptchaReady ? 'opacity-100' : 'opacity-0'}"></div>
                            
                            {#if !isCaptchaReady}
                                <div class="absolute inset-0 flex items-center justify-center border border-dashed border-border/30 rounded-md bg-muted/5">
                                    <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-widest animate-pulse">Initializing Security...</span>
                                </div>
                            {/if}
                        </div>

                        <button 
                            type="submit" 
                            disabled={sending || !captchaToken}
                            class="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 disabled:opacity-30 disabled:grayscale cursor-pointer"
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
{/if}