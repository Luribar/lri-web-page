<script lang="ts">
  import { onMount } from 'svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  let scrolled = $state(false); 

  const navLinks = [
    { label: 'About Me', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Edu/Work', id: 'journey' }
  ];

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    const handleScroll = () => { 
        scrolled = window.scrollY > 20; 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav 
  class="fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out
  {scrolled 
    ? 'py-4 bg-background border-b border-border shadow-md' 
    : 'py-8 bg-transparent'}"
>
  <div class="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
    
    <button 
      onclick={scrollToTop}
      class="flex flex-col group cursor-pointer text-left focus:outline-none"
      aria-label="Scroll to top"
    >
      <span class="text-foreground font-black tracking-tighter text-xl leading-none transition-colors group-hover:text-primary">
        LRI.
      </span>
      <span class="text-[10px] font-mono tracking-[0.3em] text-secondary uppercase leading-relaxed group-hover:text-primary/80 transition-colors">
        Data Engineer
      </span>
    </button>

    <div class="hidden md:flex items-center gap-10">
      {#each navLinks as link}
        <a 
          href="#{link.id}" 
          class="relative group text-[11px] font-black tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase"
        >
          {link.label}
          <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
        </a>
      {/each}
    </div>

    <div class="flex items-center gap-6">
      <a 
        href="/cv_Lucas_Rivero_Iribarne.pdf" 
        download 
        class="group relative hidden sm:flex items-center gap-2 px-6 py-2 border border-border rounded-full overflow-hidden transition-all hover:border-primary/50 hover:bg-muted/10"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <span class="text-[10px] font-black tracking-[0.15em] text-foreground">RESUME.PDF</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-secondary group-hover:text-primary transition-colors">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
        </svg>
      </a>

      <div class="hidden md:block h-4 w-[1px] bg-border/50"></div>

      <ThemeToggle />
    </div>

  </div>
</nav>

<style>
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
</style>