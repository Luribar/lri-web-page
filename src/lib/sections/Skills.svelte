<script lang="ts">
  // 1. Define the shape of a Stack Item to fix the TypeScript error
  interface StackItem {
    name: string;
    url: string;
    text?: string;      // Optional: Only used for languages
    isFlag?: boolean;   // Optional: Only used for languages
  }

  // 2. Define the shape of the Skill object
  interface Skill {
    name: string;
    level: string;
    desc: string;
    icon: string;
    stack: StackItem[];
  }

  let skills: Skill[] = [
    { 
      name: 'Programming', 
      level: 'Expert', 
      desc: 'Core language for analysis.', 
      // Icon Source: Heroicons (Code Bracket)
      icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 18', 
      stack: [
        { name: 'Python', url: 'https://cdn.simpleicons.org/python' },
        { name: 'R', url: 'https://cdn.simpleicons.org/r' }
      ]
    },
    { 
      name: 'Backend & Cloud', 
      level: 'Advanced', 
      desc: 'Scalable data infrastructure.', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      stack: [
        { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql' },
        { name: 'dbt', url: 'https://cdn.simpleicons.org/dbt' },
        { name: 'AWS', url: 'https://cdn.simpleicons.org/amazonaws' },
        { name: 'GCP', url: 'https://cdn.simpleicons.org/googlecloud' }
      ]
    },
    { 
      name: 'Frontend', 
      level: 'Specialist', 
      desc: 'Building interactive dashboards.', 
      icon: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
      stack: [
        { name: 'Svelte', url: 'https://cdn.simpleicons.org/svelte' },
        { name: 'Tailwind', url: 'https://cdn.simpleicons.org/tailwindcss' },
        { name: 'HTML5', url: 'https://cdn.simpleicons.org/html5' },
        { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript' }
      ]
    },
    { 
      name: 'GIS & Remote Sensing', 
      level: 'Expert', 
      desc: 'Spatial analysis & modeling.', 
      icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z', // Map Pin icon
      stack: [
        { name: 'QGIS', url: 'https://cdn.simpleicons.org/qgis' },
        { name: 'PostGIS', url: 'https://cdn.simpleicons.org/postgis' },
        { name: 'GDAL', url: 'https://cdn.simpleicons.org/gdal' }
      ]
    },
    { 
      name: 'In-situ Monitoring', 
      level: 'Expert', 
      desc: 'Sensor calibration & survey.', 
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', // Lightning/Sensor
      stack: [] 
    },
    { 
      name: 'Languages', 
      level: 'International', 
      desc: 'Communication skills.', 
      icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418', // Globe Icon
      stack: [
        // Updated flags to use 4x3 aspect ratio images (w640) for better detail
        { name: 'Spanish', text: 'Native', url: 'https://flagcdn.com/w80/cl.png', isFlag: true },
        { name: 'English', text: 'Proficient', url: 'https://flagcdn.com/w80/gb.png', isFlag: true },
        { name: 'French', text: 'Slowly getting there', url: 'https://flagcdn.com/w80/fr.png', isFlag: true }
      ]
    },
  ];
</script>

<section class="relative w-full overflow-hidden border-b border-border bg-background py-24 transition-colors duration-500">
  
  <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
    
    <header class="mb-20 flex flex-col gap-3">
        <div class="flex items-center gap-3">
            <span class="font-mono text-[10px] font-bold tracking-[0.4em] text-primary">02 //</span>
            <div class="h-[1px] w-8 bg-border"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/60"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
        </div>
        
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
            Technical <span class="text-primary">Stack</span>
        </h2>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each skills as skill}
        <div class="group relative rounded-2xl p-8 overflow-hidden border border-border bg-muted/20 backdrop-blur-sm transition-all duration-500
          hover:border-primary/40 hover:bg-muted/40 shadow-sm hover:shadow-xl flex flex-col justify-between h-full min-h-[280px]">
          
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div class="relative z-10">
              <div class="flex items-center justify-between mb-6">
                <div class="p-3 bg-foreground/5 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={skill.icon} />
                  </svg>
                </div>
                <span class="text-[9px] font-mono font-bold tracking-widest text-muted-foreground uppercase px-2 py-1 border border-border rounded-md bg-background/50">{skill.level}</span>
              </div>
              
              <h4 class="text-xl font-bold text-foreground group-hover:translate-x-1 transition-transform duration-300">{skill.name}</h4>
              <p class="mt-3 text-muted-foreground text-sm leading-relaxed max-w-[90%]">
                {skill.desc}
              </p>
          </div>

          <div class="relative z-10 mt-6">
            {#if skill.stack.length > 0}
                <div class="flex flex-wrap gap-3 items-center">
                    {#each skill.stack as tech}
                        {#if tech.isFlag}
                           <div class="flex items-center gap-3 pr-4 pl-2 py-1.5 rounded-lg border border-border/60 bg-background/40 hover:bg-background/80 transition-colors">
                                <img 
                                    src={tech.url} 
                                    alt={tech.name} 
                                    class="h-6 w-9 rounded-md object-cover shadow-sm border border-black/10" 
                                />
                                <div class="flex flex-col leading-none">
                                    <span class="text-[11px] font-bold text-foreground">{tech.name}</span>
                                    <span class="text-[9px] text-muted-foreground uppercase tracking-wide">{tech.text}</span>
                                </div>
                           </div>
                        {:else}
                           <div class="relative flex items-center justify-center gap-2 group/icon transition-all duration-300" title={tech.name}>
                                <img 
                                    src={tech.url} 
                                    alt={tech.name} 
                                    class="h-6 w-auto object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                                />
                           </div>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div class="h-[2px] w-6 bg-primary rounded-full"></div>
                    <div class="h-[2px] w-1.5 bg-secondary rounded-full"></div>
                </div>
            {/if}
          </div>

        </div>
      {/each}
    </div>
  </div>
</section>