<script lang="ts">
  interface StackItem {
    name: string;
    url: string;
    text?: string;
    isFlag?: boolean;
  }

  interface Skill {
    name: string;
    desc: string;
    icon: string;
    stack: StackItem[];
  }

  let skills: Skill[] = [
    { 
      name: 'Programming', 
      desc: 'Core language for analysis and automation.', 
      icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 18', 
      stack: [
        { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'R', url: 'https://cdn.simpleicons.org/r/276DC3' }
      ]
    },
    { 
      name: 'Backend & Cloud', 
      desc: 'Scalable data infrastructure and pipelines.', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      stack: [
        { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'dbt', url: 'https://cdn.simpleicons.org/dbt/FF694B' },
        { name: 'AWS', url: 'https://cdn.simpleicons.org/amazonwebservices/232F3E' },
        { name: 'GCP', url: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
        { name: 'Linux', url: 'https://cdn.simpleicons.org/linux/FCC624' },
        { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/2496ED' }
      ]
    },
    { 
      name: 'Frontend', 
      desc: 'Building interactive geospatial dashboards.', 
      icon: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
      stack: [
        { name: 'Svelte', url: 'https://cdn.simpleicons.org/svelte/FF3E00' },
        { name: 'Tailwind', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'HTML5', url: 'https://cdn.simpleicons.org/html5/E34F26' },
        { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/F7DF1E' }
      ]
    },
    { 
      name: 'GIS & Remote Sensing', 
      desc: 'Spatial analysis, modeling & raster processing.', 
      icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z', 
      stack: [
        { name: 'QGIS', url: 'https://cdn.simpleicons.org/qgis/589632' },
        { name: 'PostGIS', url: 'https://cdn.simpleicons.org/postgis/336791' },
        { name: 'GDAL', url: 'https://cdn.simpleicons.org/gdal/003C30' }
      ]
    },
    { 
      name: 'In-situ Monitoring', 
      desc: 'Sensor calibration, field survey & telemetry.', 
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', 
      stack: [
        // Using Iconify (Lucide set) for generic hardware icons
        { name: 'Sensors', url: 'https://api.iconify.design/lucide:activity.svg?color=%2372ef91' },
        { name: 'Telemetry', url: 'https://api.iconify.design/lucide:radio.svg?color=%2372ef91' },
        { name: 'Raspberry Pi', url: 'https://cdn.simpleicons.org/raspberrypi/C51A4A' },
        { name: 'Arduino', url: 'https://cdn.simpleicons.org/arduino/00878F' }
      ] 
    },
    { 
      name: 'Languages', 
      desc: 'Global communication & collaboration.', 
      icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418', 
      stack: [
        { name: 'Spanish', text: 'Native', url: 'https://flagcdn.com/w80/cl.png', isFlag: true },
        { name: 'English', text: 'Proficient', url: 'https://flagcdn.com/w80/gb.png', isFlag: true },
        { name: 'French', text: 'Learning', url: 'https://flagcdn.com/w80/fr.png', isFlag: true }
      ]
    },
  ];
</script>

<section class="relative w-full border-b border-border bg-background py-24 transition-colors duration-500 overflow-hidden">
  
  <div class="absolute inset-0 opacity-10 pointer-events-none">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
    <header class="mb-16 flex flex-col gap-3">
        <div class="flex items-center gap-3">
            <span class="font-mono text-[10px] font-bold tracking-[0.4em] text-primary">02 //</span>
            <div class="h-[1px] w-8 bg-border"></div>
            <span class="text-muted-foreground/60 text-[10px] font-mono uppercase tracking-widest">Stack</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
            Technical <span class="text-primary">Ecosystem</span>
        </h2>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each skills as skill}
        <div class="group relative rounded-2xl p-8 border border-border bg-muted/10 backdrop-blur-sm transition-all duration-500
          hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(var(--primary-rgb),0.15)] flex flex-col justify-between h-full min-h-[260px]">
          
          <div class="relative z-10">
              <div class="flex items-center justify-between mb-8">
                <div class="p-3 bg-foreground/5 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={skill.icon} />
                  </svg>
                </div>
              </div>
              
              <h4 class="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</h4>
              <p class="mt-3 text-muted-foreground text-sm leading-relaxed">
                {skill.desc}
              </p>
          </div>

          <div class="relative z-10 mt-8">
            {#if skill.stack.length > 0}
                <div class="flex flex-wrap gap-5 items-center">
                    {#each skill.stack as tech}
                        {#if tech.isFlag}
                           <div class="flex items-center gap-3 pr-3 pl-2 py-1.5 rounded-lg border border-border bg-background/40" title={tech.name}>
                                <img src={tech.url} alt={tech.name} class="h-4 w-6 rounded shadow-sm object-cover" />
                                <div class="flex flex-col">
                                    <span class="text-[10px] font-bold text-foreground leading-none">{tech.name}</span>
                                    <span class="text-[8px] text-muted-foreground uppercase leading-tight">{tech.text}</span>
                                </div>
                           </div>
                        {:else}
                           <div class="flex items-center justify-center p-0.5" title={tech.name}>
                                <img 
                                    src={tech.url} 
                                    alt={tech.name} 
                                    class="h-7 w-auto object-contain transition-all duration-300 group-hover:scale-110 filter drop-shadow-sm" 
                                />
                           </div>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div class="h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 transition-all duration-500"></div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>