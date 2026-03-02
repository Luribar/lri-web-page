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
    spanClass: string; 
  }

  let skills: Skill[] = [
    { 
      name: 'Programming', 
      desc: 'I used R for Remote Sensing applications and in situ sensors data processing. Now I use Python for everything, from building data pipelines to orchestration and data processing.', 
      icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 18', 
      spanClass: 'col-span-1 md:col-span-1 lg:col-span-2', 
      stack: [
        { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'R', url: 'https://cdn.simpleicons.org/r/276DC3' }
      ]
    },
    { 
      name: 'Backend & Cloud', 
      desc: 'To keep the backend running I have used Postgres, Google Cloud Platform, and Docker. Not an expert yet, but getting there.', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      spanClass: 'col-span-1 md:col-span-1 lg:col-span-2',
      stack: [
        { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'GCP', url: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
        { name: 'Linux', url: 'https://api.iconify.design/logos:linux-tux.svg' },
        { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/2496ED' },
        { name: 'Git', url: 'https://cdn.simpleicons.org/git/F05032' }
      ]
    },
    { 
      name: 'GIS & Remote Sensing', 
      desc: 'I have been using geospatial data since my bachelor onwards, from spectral indices, time series, and processing weather and satellite data and to spatialize ecohyodological and crop growth models models. Now I would be able to handle larger amounts of data with the Data Engineering knowledge!', 
      icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z', 
      spanClass: 'col-span-1 md:col-span-1 lg:col-span-2',
      stack: [
        { name: 'QGIS', url: 'https://cdn.simpleicons.org/qgis/589632' },
        { name: 'PostGIS', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_square_postgis.png' },
        { name: 'GDAL', url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/GDALLogoColor.svg' },
        { name: 'GRASS', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Grass_GIS.png' },
      ]
    },
    { 
      name: 'In-situ Monitoring', 
      desc: 'Sensor calibration, deployment, and monitoring in diverse ecosystems (rain gauges, soil moisture, water level sensors, soil pits, leaf area index). Biomass field surveys. Leading field campaigns.', 
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', 
      spanClass: 'col-span-1 md:col-span-1 lg:col-span-2',
      stack: [
        { name: 'Pickup Truck', url: 'https://api.iconify.design/mdi:truck-pickup.svg?color=%23ef4444' },
        { name: 'Soil Pit', url: 'https://api.iconify.design/mdi:shovel.svg?color=%238b4513' },
        { name: 'Rain Gauge', url: 'https://api.iconify.design/carbon:rain-drop.svg?color=%233b82f6' },
        { name: 'Soil Moisture', url: 'https://api.iconify.design/carbon:soil-moisture-field.svg?color=%2310b981' },
        { name: 'Leaf Area Index', url: 'https://api.iconify.design/lucide:leaf.svg?color=%2322c55e' },
        { name: 'Time Series', url: 'https://api.iconify.design/lucide:line-chart.svg?color=%238b5cf6' }
      ] 
    },
    { 
      name: 'Ecohydrological Modeling', 
      desc: 'I have used water flow models to simulate water and carbon balance at different scales, such as soil profile level (HYDRUS 1D), field level (SWAP and WOFOST), hydrological catchment (SWAT+) and regional level (WOFOST/Remote Sensing/GIS).',
      icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z', 
      spanClass: 'col-span-1 md:col-span-2 lg:col-span-2', 
      stack: [
        { name: 'Water Balance', url: 'https://api.iconify.design/lucide:droplets.svg?color=%230ea5e9' },
        { name: 'Crop Growth', url: 'https://api.iconify.design/lucide:wheat.svg?color=%23eab308' }
      ] 
    },
    { 
      name: 'Frontend', 
      desc: 'Basic knowledge. Built this site with Svelte (with AI help).', 
      icon: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
      spanClass: 'col-span-1 md:col-span-1 lg:col-span-1', 
      stack: [
        { name: 'Svelte', url: 'https://cdn.simpleicons.org/svelte/FF3E00' },
      ]
    },
    { 
      name: 'Languages', 
      desc: 'Global communication.', 
      icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418', 
      spanClass: 'col-span-1 md:col-span-1 lg:col-span-1', 
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each skills as skill}
        <div class="group relative rounded-2xl p-8 border border-border bg-muted/10 backdrop-blur-sm transition-all duration-500
          hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(var(--primary-rgb),0.15)] flex flex-col justify-between h-full min-h-[260px] {skill.spanClass}">
          
          <div class="relative z-10">
              <div class="flex items-center justify-between mb-8">
                <div class="p-3 bg-foreground/5 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={skill.icon} />
                  </svg>
                </div>
              </div>
              
              <h4 class="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</h4>
              
              <p class="mt-3 text-muted-foreground text-sm leading-relaxed text-justify hyphens-auto">
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