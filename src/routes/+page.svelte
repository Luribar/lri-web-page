<script lang="ts">
  import '$lib/theme.css';
  import Nav from '$lib/sections/Nav.svelte';
  import Hero from '$lib/sections/Hero.svelte';
  import About from '$lib/sections/About.svelte';
  import Skills from '$lib/sections/Skills.svelte';
  import JourneyMap from '$lib/sections/JourneyMap.svelte';
  
  // 1. Import the component itself (the visual part)
  import ContactModal from '$lib/components/ContactModal.svelte'; 
  
  // 2. Import the store (the "brain" that tells it when to open)
  import { isContactOpen } from '$lib/stores/contactStore';
</script>

<Nav />

<main class="relative bg-transparent text-foreground transition-colors duration-500">
    <Hero />
    
    <section id="about" class="scroll-mt-20">
        <About />
    </section>

    <section id="skills" class="scroll-mt-20">
        <Skills />
    </section>

    <section id="journey" class="scroll-mt-20">
        <JourneyMap />
    </section>
</main>

<ContactModal />

<footer class="w-full bg-background border-t border-border py-12 px-6 mt-24 transition-colors duration-500">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
    
    <div class="flex flex-col">
      <span class="text-foreground font-black tracking-tighter text-lg uppercase">LRI.</span>
      <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        Data Engineer © 2026
      </span>
    </div>
    
    <div class="flex gap-8 items-center">
      <a href="https://github.com" target="_blank" class="text-muted-foreground hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Github</a>
      <a href="https://linkedin.com" target="_blank" class="text-muted-foreground hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]">LinkedIn</a>
      
      <button 
        onclick={() => isContactOpen.set(true)} 
        class="text-muted-foreground hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer bg-transparent border-none p-0"
      >
        Contact
      </button>
    </div>

    <div class="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-tighter text-center md:text-right">
      Built with 
      <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer" class="hover:text-primary transition-colors border-b border-transparent hover:border-primary/50">SvelteKit</a> 
      & 
      <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" class="hover:text-primary transition-colors border-b border-transparent hover:border-primary/50">Tailwind v4</a> 
      <span class="opacity-50 mx-1">//</span> 
      Many thanks to 
      <a href="https://github.com/MarioTiscareno/sveltekit-personal-website" target="_blank" rel="noreferrer" class="hover:text-primary transition-colors border-b border-transparent hover:border-primary/50">Mario!</a>
    </div>

  </div>
</footer>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>