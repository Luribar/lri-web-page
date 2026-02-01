<script lang="ts">
  import '../lib/theme.css';
  import ContactModal from '$lib/components/ContactModal.svelte'; // Import the new Modal

  let { children } = $props();
</script>

<div class="relative min-h-screen w-full overflow-x-hidden bg-background">
  <main class="relative z-10 w-full">
    {@render children()}
  </main>

  <ContactModal />
</div>