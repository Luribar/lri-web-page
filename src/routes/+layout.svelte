<script lang="ts">
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../lib/theme.css';
  import ContactModal from '$lib/components/ContactModal.svelte';

  // Initialize Vercel Analytics
  injectAnalytics({ mode: dev ? 'development' : 'production' });

  let { children } = $props();
</script>

<div class="relative min-h-screen w-full overflow-x-hidden bg-background">
  <main class="relative z-10 w-full">
    {@render children()}
  </main>

  <ContactModal />
</div>