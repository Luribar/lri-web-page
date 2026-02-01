<script lang="ts">
    import { isContactOpen } from '$lib/stores/contactStore';
    import { fade, fly } from 'svelte/transition';

    // State Variables
    let name = $state('');
    let email = $state('');
    let message = $state('');
    let sending = $state(false);
    let success = $state(false);

    function close() {
        isContactOpen.set(false);
        // Reset form slightly after closing
        setTimeout(() => { 
            success = false; 
            name=''; 
            email=''; 
            message=''; 
        }, 500);
    }

    async function handleSubmit() {
        sending = true;

        try {
            // SECURE MODE: Calling your SvelteKit server
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (result.success) {
                success = true;
                setTimeout(() => close(), 2500);
            } else {
                alert("Transmission failed: " + (result.message || "Unknown Error"));
            }
        } catch (error) {
            console.error(error);
            alert("Network error.");
        } finally {
            sending = false;
        }
    }
</script>

{#if $isContactOpen}
    <div 
        class="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
        transition:fade={{ duration: 200 }}
    >
        <div 
            class="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onclick={close} 
            role="button" 
            tabindex="0"
            onkeydown={(e) => e.key === 'Escape' && close()}
        ></div>

        <div 
            class="relative w-full max-w-lg bg-background border border-primary/20 shadow-2xl overflow-hidden flex flex-col z-50"
            transition:fly={{ y: 20, duration: 300 }}
        >
            <div class="h-1 w-full bg-muted flex">
                <div class="h-full w-1/3 bg-primary animate-pulse"></div>
            </div>

            <div class="p-8 flex flex-col gap-6">
                {#if success}
                    <div class="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in duration-500">
                        <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold uppercase tracking-widest text-foreground">Transmission Received</h3>
                            <p class="text-xs font-mono text-muted-foreground mt-2">Closing channel...</p>
                        </div>
                    </div>
                
                {:else}
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="text-2xl font-bold tracking-tighter uppercase text-foreground">Open Channel</h2>
                            <p class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Secure Connection</p>
                        </div>
                        <button onclick={close} class="text-muted-foreground hover:text-primary transition-colors p-2">✕</button>
                    </div>

                    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="flex flex-col gap-5">
                        <div class="space-y-1">
                            <label for="name" class="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Identity</label>
                            <input id="name" bind:value={name} required type="text" class="w-full bg-muted/10 border border-border p-3 text-sm focus:border-primary outline-none font-mono placeholder:text-muted-foreground/30 transition-all focus:bg-muted/20" placeholder="NAME" />
                        </div>

                        <div class="space-y-1">
                            <label for="email" class="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Frequency (Email)</label>
                            <input id="email" bind:value={email} required type="email" class="w-full bg-muted/10 border border-border p-3 text-sm focus:border-primary outline-none font-mono placeholder:text-muted-foreground/30 transition-all focus:bg-muted/20" placeholder="EMAIL" />
                        </div>

                        <div class="space-y-1">
                            <label for="message" class="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Transmission</label>
                            <textarea id="message" bind:value={message} required rows="4" class="w-full bg-muted/10 border border-border p-3 text-sm focus:border-primary outline-none font-mono resize-none placeholder:text-muted-foreground/30 transition-all focus:bg-muted/20" placeholder="MESSAGE..."></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={sending}
                            class="mt-2 bg-foreground text-background py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span class="relative z-10 flex items-center justify-center gap-2">
                                {#if sending}
                                    <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Transmitting...
                                {:else}
                                    Send Message
                                {/if}
                            </span>
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
{/if}