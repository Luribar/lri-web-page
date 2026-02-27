<script lang="ts">
    import { isContactOpen } from '$lib/stores/contactStore';
    import { fade, fly } from 'svelte/transition';

    let name = $state('');
    let email = $state('');
    let message = $state('');
    let botcheck = $state('');
    
    let sending = $state(false);
    let success = $state(false);
    let errorMessage = $state('');

    function close() {
        isContactOpen.set(false);
        setTimeout(() => { 
            success = false; 
            name = ''; 
            email = ''; 
            message = ''; 
            botcheck = ''; 
            errorMessage = '';
        }, 500);
    }

    async function handleSubmit() {
        sending = true;
        errorMessage = '';

        try {
            // Fetch to YOUR secure backend, not a 3rd party
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    message, 
                    botcheck // Honeypot trap
                }),
            });

            const result = await response.json();
            
            if (result.success) {
                success = true;
                setTimeout(close, 3000);
            } else {
                errorMessage = result.message || "Failed to send message.";
            }
        } catch (error) {
            errorMessage = "Network error. Please try again later.";
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
                        <p class="text-muted-foreground mt-2">I will get back to you shortly.</p>
                    </div>
                {:else}
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold tracking-tighter uppercase italic">Contact</h2>
                        <button onclick={close} class="text-muted-foreground hover:text-foreground text-xl transition-colors">✕</button>
                    </div>

                    {#if errorMessage}
                        <div class="mb-4 p-3 border border-red-500/50 bg-red-500/10 text-red-500 text-sm rounded-md" transition:fade>
                            {errorMessage}
                        </div>
                    {/if}

                    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
                        <input type="text" name="botcheck" class="hidden" style="display: none;" bind:value={botcheck} tabindex="-1" autocomplete="off" />

                        <input bind:value={name} required placeholder="Name" class="w-full bg-muted/20 border border-border rounded-md p-3 text-sm focus:border-primary outline-none transition-colors" />
                        <input bind:value={email} type="email" required placeholder="Email" class="w-full bg-muted/20 border border-border rounded-md p-3 text-sm focus:border-primary outline-none transition-colors" />
                        <textarea bind:value={message} required rows="5" placeholder="Message" class="w-full bg-muted/20 border border-border rounded-md p-3 text-sm focus:border-primary outline-none resize-none transition-colors"></textarea>

                        <button 
                            type="submit" 
                            disabled={sending}
                            class="w-full mt-4 bg-primary text-primary-foreground py-4 rounded-md font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
{/if}