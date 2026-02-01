<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { mapState } from '$lib/mapState.svelte';
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

  
  // --- TYPES ---
  type Category = 'work' | 'education';
  
  interface JourneyItem {
    id: string;
    role: string;
    org: string;
    loc: string;
    coords: [number, number];
    year: string;
    description: string;
    images?: string[]; // Multiple images support
    type?: 'physical' | 'online';
  }

  // --- DATA ---
  const DATA: Record<Category, JourneyItem[]> = {
    work: [
      { 
        id: 'w1', 
        role: 'Junior Dev', 
        org: 'Startup Inc', 
        loc: 'London, UK', 
        coords: [-0.12, 51.50], 
        year: '2018', 
        description: 'Full stack development with React & Node.',
        images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'],
        type: 'physical' 
      },
      { 
        id: 'w2', 
        role: 'Field Engineer', 
        org: 'Global IoT', 
        loc: 'Dubai, UAE', 
        coords: [55.27, 25.20], 
        year: '2020', 
        description: 'Deployed sensor networks in harsh environments.',
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400'],
        type: 'physical' 
      },
      { 
        id: 'w3', 
        role: 'Lead Engineer', 
        org: 'Beyond Sports', 
        loc: 'Amsterdam, NL', 
        coords: [4.90, 52.36], 
        year: '2022', 
        description: 'Architecting 3D visualization platforms.',
        images: ['https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?w=400', 'https://images.unsplash.com/photo-1459679749680-18eb1eb37418?w=400'],
        type: 'physical' 
      },
      { 
        id: 'w4', 
        role: 'Freelance', 
        org: 'Self-Employed', 
        loc: 'Santiago, CL', 
        coords: [-70.66, -33.44], 
        year: '2024', 
        description: 'Building high-performance geospatial web apps.',
        images: ['https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=400'],
        type: 'physical' 
      }
    ],
    education: [
      { 
        id: 'e1', 
        role: 'BSc. Agricultural Engineering', 
        org: 'University of Chile', 
        loc: 'Santiago, CL', 
        coords: [-70.6303, -33.5701], 
        year: '2020', 
        description: 'Specialized in Soil, Plant, Atmosphere and Remote Sensing.',
        images: ['src/lib/assets/images/edu/edu_1_avocados.webp'],
        type: 'physical' 
      },
      { 
        id: 'e2', 
        role: 'Web Mapping Course ', 
        org: 'Pontificia Universidad Católica de Valparaíso [Online]', 
        loc: 'Valparaíso, CL', 
        coords: [-71.61, -33.04], 
        year: '2020', 
        description: 'Spatial analysis and web-mapping introduction with Google Earth Engine and R.',
        images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=400'],
        type: 'physical' 
      },
      { 
        id: 'e3', 
        role: 'Summer School [Online]', 
        org: "Centre d'etudes Spatiales de la Biosphère", 
        loc: 'Online', 
        coords: [1.47, 43.56], 
        year: '2021', 
        description: 'Remote sensing observations for the monitoring of water and carbon cycles over eco-agro-systems.',
        images: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'],
        type: 'physical' 
      },
      { 
        id: 'e4', 
        role: 'Summer School [Online]', 
        org: "OpenGeoHub", 
        loc: 'Poznań, PL', 
        coords: [16.91, 52.40], 
        year: '2021', 
        description: 'Processing and visualizing large geospatial data .',
        images: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'],
        type: 'physical' 
      }
    ]
  };

  let mapContainer: HTMLDivElement;
  let map: mapboxgl.Map | null = null;

  let activeCategory: Category = 'work';
  let activeId: string | null = null;
  let isSpinning = true;

  $: activeItem = activeId
    ? DATA[activeCategory].find(i => i.id === activeId)
    : null;

  let markers: mapboxgl.Marker[] = [];
  let frameId: number;

  let orbitIndex = 0;
  let orbitPath: [number, number][] = [];

  // --- LIFECYCLE ---
  onMount(() => {
    mapState.hideMap();
    if (!PUBLIC_MAPBOX_TOKEN) return;

    mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

    map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-20, 20],
      zoom: 1.5,
      pitch: 0,
      projection: 'globe',
      interactive: true,
      attributionControl: false
    });

    map.on('style.load', () => {
      if (!map) return;

      // Remove fog/atmosphere
      map.setFog(null);

      addOrbitLayer();
      updateMapData();
    });

    const spin = () => {
      if (!map || !isSpinning) {
        frameId = requestAnimationFrame(spin);
        return;
      }
      const center = map.getCenter();
      if (!map.isMoving()) {
        map.easeTo({ center: [center.lng + 0.03, center.lat], duration: 0 });
      }
      frameId = requestAnimationFrame(spin);
    };

    spin();
  });

  onDestroy(() => {
    if (frameId) cancelAnimationFrame(frameId);
    markers.forEach(m => m.remove());
    map?.remove();
  });

  // --- UI LOGIC ---
  function toggleCategory(cat: Category) {
    activeCategory = cat;
    activeId = null;
    updateMapData();
  }

  function toggleSpin() {
    isSpinning = !isSpinning;
  }

  function handleView(item: JourneyItem) {
    activeId = item.id;
    if (!map) return;

    if (item.type === 'online') {
      // Zoom out and focus on the orbit area
      map.flyTo({
        center: [0, 20],
        zoom: 2.2,
        pitch: 0,
        speed: 0.8
      });
    } else {
      map.flyTo({
        center: item.coords,
        zoom: 3.5,
        essential: true,
        speed: 1.2,
        curve: 1.5
      });
    }
  }

  // --- MAP LOGIC ---
  function updateMapData() {
    if (!map) return;

    markers.forEach(m => m.remove());
    markers = [];

    if (map.getLayer('route')) map.removeLayer('route');
    if (map.getSource('route')) map.removeSource('route');

    const items = DATA[activeCategory];
    const physicalItems = items.filter(i => i.type === 'physical');

    if (physicalItems.length > 1) {
      const routeGeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: physicalItems.map(i => i.coords)
        }
      };

      map.addSource('route', { type: 'geojson', data: routeGeoJSON as any });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#2dd4bf',
          'line-width': 2,
          'line-opacity': 0.6,
          'line-dasharray': [2, 2]
        }
      });
    }

    physicalItems.forEach(item => {
      const el = document.createElement('div');
      el.className = 'marker-dot';
      el.innerHTML = `<div class="dot-inner"></div>`;
      el.onclick = () => handleView(item);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(item.coords)
        .addTo(map!);

      markers.push(marker);
    });

    const satellite = document.getElementById('satellite-marker');
    if (satellite) {
      satellite.style.display = items.some(i => i.type === 'online') ? 'block' : 'none';
    }
  }

  // --- ORBIT SYSTEM ---
  function addOrbitLayer() {
    if (!map) return;

    // Create orbit path further from globe
    orbitPath = [];
    const orbitRadius = 60; // Larger radius to float outside
    for (let i = 0; i <= 360; i += 2) {
      const rad = i * Math.PI / 180;
      const lng = Math.cos(rad) * orbitRadius;
      const lat = Math.sin(rad) * orbitRadius * 0.4; // Elliptical
      orbitPath.push([lng, lat]);
    }

    map.addSource('orbit', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: orbitPath }
      }
    });

    map.addLayer({
      id: 'orbit-line',
      type: 'line',
      source: 'orbit',
      paint: {
        'line-color': '#8b5cf6',
        'line-width': 2,
        'line-opacity': 0.4,
        'line-dasharray': [4, 4] // Dashed line
      }
    });

    // Simple sphere satellite
    const el = document.createElement('div');
    el.id = 'satellite-marker';
    el.className = 'satellite-sphere';
    el.onclick = () => {
      const satelliteItem = DATA[activeCategory].find(i => i.type === 'online');
      if (satelliteItem) handleView(satelliteItem);
    };

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat(orbitPath[0])
      .addTo(map);

    // Slower orbit animation
    const animateOrbit = () => {
      orbitIndex = (orbitIndex + 0.3) % orbitPath.length; // Slower speed
      const currentIndex = Math.floor(orbitIndex);
      marker.setLngLat(orbitPath[currentIndex]);
      requestAnimationFrame(animateOrbit);
    };

    animateOrbit();
  }
</script>

<section id="journey" class="relative w-full border-t border-border bg-background py-24 overflow-hidden">
  <div class="mx-auto max-w-7xl px-6 md:px-12">

    <!-- HEADER -->
    <header class="mb-12">
      <span class="font-mono text-xs font-bold tracking-[0.3em] text-primary uppercase">
        03 // Timeline
      </span>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
        Trajectory.
      </h2>

      <!-- TOGGLE LEFT -->
      <div class="mt-6 flex items-center gap-3">
        <div class="flex items-center gap-1 rounded-full border border-border bg-muted/30 p-1">
          <button
            class="rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all
            {activeCategory === 'work'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => toggleCategory('work')}
          >
            Work
          </button>
          <button
            class="rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all
            {activeCategory === 'education'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => toggleCategory('education')}
          >
            Education
          </button>
        </div>

        <!-- Spin Control -->
        <button
          class="rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border border-border
          {isSpinning ? 'bg-primary/10 text-primary' : 'bg-muted/30 text-muted-foreground hover:text-foreground'}"
          on:click={toggleSpin}
          title={isSpinning ? 'Stop rotation' : 'Start rotation'}
        >
          {isSpinning ? '⏸ Pause' : '▶ Rotate'}
        </button>
      </div>
    </header>

    <div class="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">

      <!-- LEFT LIST -->
      <div class="flex flex-col space-y-4 order-2 lg:order-1">
        {#each DATA[activeCategory] as item}
          <button
            class="group relative flex w-full flex-col items-start gap-2 rounded-xl border p-6 text-left transition-all duration-300
            {activeId === item.id
              ? 'border-primary bg-primary/5 translate-x-2 shadow-[0_0_15px_rgba(var(--primary),0.1)]'
              : 'border-border/50 bg-transparent hover:border-primary/30 hover:bg-muted/30'}"
            on:click={() => handleView(item)}
          >
            <div class="flex w-full items-center justify-between">
              <span class="font-mono text-xs font-bold text-primary tracking-wider">
                {item.year}
              </span>
              {#if item.type === 'online'}
                <span class="text-[10px] uppercase border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                  Satellite Link
                </span>
              {/if}
            </div>

            <h3 class="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {item.role}
            </h3>
            <p class="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {item.org} // {item.loc}
            </p>

            {#if activeId === item.id}
              <div class="mt-4 h-[1px] w-12 bg-primary/50"></div>
              <p class="mt-2 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-left-2">
                {item.description}
              </p>
            {/if}
          </button>
        {/each}
      </div>

      <!-- RIGHT MAP + POPUP CARDS -->
      <div class="relative h-[60vh] w-full lg:sticky lg:top-24 order-1 lg:order-2">

        {#if activeItem && activeItem.images}
          <div class="absolute top-1/2 left-full ml-6 -translate-y-1/2 z-20 flex flex-col gap-4">
            {#each activeItem.images as image, idx}
              <div
                class="w-56 p-4 rounded-xl border-2 border-primary/30 bg-background/95 backdrop-blur-md shadow-2xl
                transition-all duration-500 animate-in slide-in-from-right-8 fade-in"
                style="animation-delay: {idx * 100}ms"
              >
                <div class="w-full h-32 mb-3 rounded-lg overflow-hidden relative group">
                  <img 
                    src={image} 
                    alt="{activeItem.role} - Image {idx + 1}"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div class="absolute bottom-2 left-2 flex gap-1.5 items-center">
                    <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    <span class="text-[9px] font-mono text-white/90 uppercase tracking-wider bg-black/50 px-1.5 py-0.5 rounded">Live</span>
                  </div>
                </div>

                <h4 class="text-sm font-bold text-foreground mb-1">
                  {activeItem.role}
                </h4>
                <p class="text-xs font-mono text-primary mb-2">{activeItem.org}</p>
                
                {#if idx === 0}
                  <div class="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {activeItem.description}
                  </div>
                {/if}
                
                <div class="pt-2 border-t border-border/50">
                  <div class="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>📍 {activeItem.loc}</span>
                    <span class="text-primary">{activeItem.year}</span>
                  </div>
                  {#if activeItem.type !== 'online' && idx === 0}
                    <div class="text-[9px] font-mono text-muted-foreground/70 mt-1 flex justify-between">
                      <span>LAT {activeItem.coords[1].toFixed(2)}°</span>
                      <span>LNG {activeItem.coords[0].toFixed(2)}°</span>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}

        <div class="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
          <div bind:this={mapContainer} class="absolute inset-0 h-full w-full"></div>
          <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] rounded-3xl"></div>
        </div>

      </div>
    </div>
  </div>
</section>

<style>
  :global(.mapboxgl-canvas) {
    outline: none;
  }

  /* MAP MARKERS */
  :global(.marker-dot) {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.dot-inner) {
    width: 8px;
    height: 8px;
    background-color: var(--primary);
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(var(--primary), 0.3);
    transition: transform 0.3s ease;
  }

  :global(.marker-dot:hover .dot-inner) {
    transform: scale(1.5);
    background-color: white;
  }

  /* SATELLITE SPHERE */
  :global(.satellite-sphere) {
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 30% 30%, #a78bfa, #8b5cf6);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 
      0 0 10px rgba(139, 92, 246, 0.6),
      0 0 20px rgba(139, 92, 246, 0.3),
      inset -2px -2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  :global(.satellite-sphere:hover) {
    transform: scale(1.5);
    box-shadow: 
      0 0 15px rgba(139, 92, 246, 0.8),
      0 0 30px rgba(139, 92, 246, 0.5),
      inset -2px -2px 4px rgba(0, 0, 0, 0.3);
  }
</style>