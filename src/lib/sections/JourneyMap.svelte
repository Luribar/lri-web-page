<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { mapState } from '$lib/mapState.svelte';
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

  // --- TYPES ---
  type Category = 'work' | 'education';
  
  interface LocationImage {
    url: string;
    coords?: [number, number];
    locName?: string;
    story?: string;
  }

  interface JourneyItem {
    id: string;
    role: string;
    org: string;
    loc: string;
    coords: [number, number];
    year: string;
    description: string;
    images?: LocationImage[]; 
    type?: 'physical' | 'online';
  }

  // --- DATA (Latest First) ---
  const DATA: Record<Category, JourneyItem[]> = {
    work: [
      { 
        id: 'w1', 
        role: 'Data Engineer', 
        org: 'Bunge', 
        loc: 'Rotterdam, NL', 
        coords: [4.47, 51.92], 
        year: '2025', 
        description: 'Writing and maintaining Python ELT data pipelines, data modeling with dbt, and orchestrating spatial weather data workflows on GCP.',
        images: [{ url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400' }],
        type: 'physical' 
      },
      { 
        id: 'w2', 
        role: 'Data Engineer Trainee', 
        org: 'Viterra', 
        loc: 'Rotterdam, NL', 
        coords: [4.47, 51.92], 
        year: '2024', 
        description: 'Developed transformations using Snowflake, SQL, and dbt. Built visualizations in Tableau while mastering Agile, Python, and AWS.',
        images: [{ url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400' }],
        type: 'physical' 
      },
      { 
        id: 'w3', 
        role: 'Crop Growth Modeling Intern', 
        org: 'Viterra', 
        loc: 'Rotterdam, NL', 
        coords: [4.47, 51.92], 
        year: '2024', 
        description: 'Built a Python/Docker pipeline using WOFOST for Canola yield forecasting. Assimilated MODIS LAI data using the Ensemble Kalman Filter.',
        images: [{ url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' }],
        type: 'physical' 
      },
      { 
        id: 'w4', 
        role: 'Cloud Mask Re-labeler', 
        org: 'eLEAF', 
        loc: 'Wageningen, NL (Remote)', 
        coords: [5.66, 51.96], 
        year: '2023', 
        description: 'Re-labeled remote sensing imagery to support the development of a highly accurate cloud mask product.',
        images: [{ url: 'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=400' }],
        type: 'online' 
      },
      { 
        id: 'w5', 
        role: 'GIS Analyst', 
        org: 'FONDECYT (Catchment Memory)', 
        loc: 'Santiago, CL', 
        coords: [-70.66, -33.44], 
        year: '2021', 
        description: 'Assimilated remote sensing LAI into SWAT+ models and automated Sentinel-2 biophysical variable retrieval using R and ESA-SNAP.',
        images: [{ url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400' }],
        type: 'physical' 
      },
      { 
        id: 'w6', 
        role: 'Research Assistant', 
        org: 'PCI CONICYT & FONDECYT', 
        loc: 'Chile (Multiple Locations)', 
        coords: [-70.66, -33.44], 
        year: '2019', 
        description: 'Executed field campaigns across Chilean catchments. Collected tree rings, soil samples, and LAI measurements. Calibrated rain gauges and visualized sensor time-series data.',
        images: [
          { 
            url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', 
            coords: [-72.35, -35.96], 
            locName: 'Cauquenes',
            story: 'Installed automated rain gauges to monitor dryland hydrological responses.'
          },
          { 
            url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400', 
            coords: [-70.31, -33.35], 
            locName: 'Farellones',
            story: 'High-altitude field campaign collecting soil samples and snowmelt data.'
          },
          { 
            url: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400', 
            coords: [-70.93, -32.25], 
            locName: 'Petorca',
            story: 'Assessed prolonged drought impacts and retrieved tree ring cores.'
          },
          { 
            url: 'https://images.unsplash.com/photo-1596422846543-74c6b610d486?w=400', 
            coords: [-71.97, -39.27], 
            locName: 'Pucón',
            story: 'Measured Leaf Area Index (LAI) in dense temperate rainforest catchments.'
          }
        ],
        type: 'physical' 
      },
      { 
        id: 'w7', 
        role: 'Data Collection Intern', 
        org: 'ChileOliva', 
        loc: 'Santiago, CL', 
        coords: [-70.66, -33.44], 
        year: '2019', 
        description: 'Collected drone point clouds and tree architecture parameters to feed a Machine Learning olive oil yield prediction model.',
        images: [{ url: 'https://images.unsplash.com/photo-1560241072-4bc6df9012a6?w=400' }],
        type: 'physical' 
      }
    ],
    education: [
      { 
        id: 'e2', 
        role: 'Processing Geospatial Data', 
        org: 'OpenGeoHub Foundation', 
        loc: 'Poznań, PL', 
        coords: [16.91, 52.40], 
        year: '2023', 
        description: 'Summer school focused on processing and visualizing large-scale geospatial datasets.',
        images: [{ url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400' }],
        type: 'physical' 
      },
      { 
        id: 'e1', 
        role: 'MSc. Geo Information Science', 
        org: 'Wageningen University', 
        loc: 'Wageningen, NL', 
        coords: [5.66, 51.96], 
        year: '2022', 
        description: 'Mastered remote sensing, ML/DL, and Ecohydrology. Thesis: Assimilating LAI & canopy nitrogen into WOFOST via Ensemble Kalman Filter.',
        images: [{ url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400' }],
        type: 'physical' 
      },
      { 
        id: 'e3', 
        role: 'Remote Sensing Observations', 
        org: 'CESBIO', 
        loc: 'Toulouse, FR (Online)', 
        coords: [1.47, 43.56], 
        year: '2021', 
        description: 'Summer school covering water and carbon cycle monitoring over eco-agro-systems.',
        images: [{ url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' }],
        type: 'online' 
      },
      { 
        id: 'e4', 
        role: 'Web Mapping with R & GEE', 
        org: 'PUCV', 
        loc: 'Valparaíso, CL (Online)', 
        coords: [-71.61, -33.04], 
        year: '2020', 
        description: 'Spatial analysis and interactive web mapping utilizing R and Google Earth Engine.',
        images: [{ url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400' }],
        type: 'online' 
      },
      { 
        id: 'e5', 
        role: 'BSc. Agricultural Engineering', 
        org: 'Universidad de Chile', 
        loc: 'Santiago, CL', 
        coords: [-70.66, -33.44], 
        year: '2014', 
        description: 'Specialized in soil physics, GIS, and agronomy. Thesis: Mapped avocado crop coefficients using Sentinel-2 and HYDRUS-1D.',
        images: [{ url: 'https://images.unsplash.com/photo-1530836369250-ef71a3f5e439?w=400' }],
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
      map.setFog(null);
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
    resetGlobe();
    updateMapData();
  }

  function handleView(item: JourneyItem) {
    activeId = item.id;
    isSpinning = false;
    if (!map) return;

    map.flyTo({
      center: item.coords,
      zoom: item.type === 'online' ? 2.5 : 3.5, 
      essential: true,
      speed: 1.2,
      curve: 1.5
    });
  }

  function zoomToSubLocation(coords: [number, number]) {
    isSpinning = false;
    if (!map) return;

    map.flyTo({
      center: coords,
      zoom: 6.5, 
      essential: true,
      speed: 1.2,
      curve: 1.5
    });
  }

  function resetGlobe() {
    activeId = null;
    isSpinning = true;
    if (!map) return;

    map.flyTo({
      center: [-20, 20],
      zoom: 1.5,
      pitch: 0,
      speed: 1.0,
      curve: 1.5
    });
  }

  // --- MAP LOGIC ---
  function updateMapData() {
    if (!map) return;

    markers.forEach(m => m.remove());
    markers = [];

    if (map.getLayer('route')) map.removeLayer('route');
    if (map.getSource('route')) map.removeSource('route');
    if (map.getLayer('sub-routes')) map.removeLayer('sub-routes');
    if (map.getSource('sub-routes')) map.removeSource('sub-routes');

    const items = DATA[activeCategory];
    const physicalItems = items.filter(i => i.type === 'physical');

    // 1. Draw main physical route
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

    // 2. Draw Sub-routes & Popup Markers
    const subRouteFeatures: any[] = [];

    items.forEach(item => {
      if (item.images) {
        item.images.forEach(img => {
          if (img.coords) {
            subRouteFeatures.push({
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [item.coords, img.coords]
              }
            });

            const el = document.createElement('div');
            el.className = 'marker-dot is-sublocation';
            el.innerHTML = `<div class="dot-inner"></div>`;

            const popupHTML = `
              <div class="flex flex-col gap-2 p-1 w-48">
                <img src="${img.url}" alt="${img.locName}" class="w-full h-24 object-cover rounded-md border border-border/50 shadow-sm" />
                <div>
                  <h4 class="text-sm font-bold text-foreground leading-none mb-1">${img.locName}</h4>
                  ${img.story ? `<p class="text-xs text-muted-foreground leading-tight">${img.story}</p>` : ''}
                </div>
              </div>
            `;

            const popup = new mapboxgl.Popup({ 
              offset: 15, 
              closeButton: false,
              closeOnClick: true,
              className: 'story-popup'
            }).setHTML(popupHTML);

            const marker = new mapboxgl.Marker({ element: el })
              .setLngLat(img.coords)
              .setPopup(popup)
              .addTo(map!);

            el.addEventListener('click', (e) => {
              e.stopPropagation(); 
              zoomToSubLocation(img.coords!);
            });

            markers.push(marker);
          }
        });
      }
    });

    if (subRouteFeatures.length > 0) {
      map.addSource('sub-routes', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: subRouteFeatures
        }
      });

      map.addLayer({
        id: 'sub-routes',
        type: 'line',
        source: 'sub-routes',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#a855f7', 
          'line-width': 1.5,
          'line-opacity': 0.5,
          'line-dasharray': [2, 4] 
        }
      });
    }

    // 3. Draw main markers
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = `marker-dot ${item.type === 'online' ? 'is-online' : 'is-physical'}`;
      el.innerHTML = `<div class="dot-inner"></div>`;
      el.onclick = () => handleView(item);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(item.coords)
        .addTo(map!);

      markers.push(marker);
    });
  }
</script>

<section id="journey" class="relative w-full border-t border-border bg-background py-16 md:py-24 overflow-hidden">
  <div class="mx-auto max-w-7xl px-4 md:px-12">

    <header class="mb-8 md:mb-12">
      <span class="font-mono text-xs font-bold tracking-[0.3em] text-primary uppercase">
        03 // Timeline
      </span>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
        Trajectory.
      </h2>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-1 rounded-full border border-border bg-muted/30 p-1">
          <button
            class="rounded-full px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all
            {activeCategory === 'work'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => toggleCategory('work')}
          >
            Work
          </button>
          <button
            class="rounded-full px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all
            {activeCategory === 'education'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'}"
            on:click={() => toggleCategory('education')}
          >
            Education
          </button>
        </div>

        <button
          class="flex items-center gap-2 rounded-full px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          on:click={resetGlobe}
        >
          🌍 Reset Globe
        </button>
      </div>
    </header>

    <div class="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start relative">

      <div class="lg:col-span-6 flex flex-col space-y-4 order-2 lg:order-1 z-20">
        {#each DATA[activeCategory] as item}
          <div class="group relative flex w-full flex-col items-start gap-2 rounded-xl border p-5 md:p-6 text-left transition-all duration-300
            {activeId === item.id
              ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.1)]'
              : 'border-border/50 bg-background hover:border-primary/30 hover:bg-muted/30'}">
            
            <div 
              class="w-full cursor-pointer focus:outline-none" 
              role="button" 
              tabindex="0" 
              on:click={() => handleView(item)}
              on:keydown={(e) => e.key === 'Enter' && handleView(item)}
            >
              <div class="flex w-full items-center justify-between mb-1">
                <span class="font-mono text-xs font-bold text-primary tracking-wider">
                  {item.year}
                </span>
                {#if item.type === 'online'}
                  <span class="text-[9px] md:text-[10px] uppercase border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 rounded-full text-purple-400 font-semibold tracking-wider">
                    Remote / Online
                  </span>
                {/if}
              </div>

              <h3 class="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {item.role}
              </h3>
              <p class="font-mono text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground mt-1">
                {item.org} // {item.loc}
              </p>
            </div>

            {#if activeId === item.id}
              <div class="w-full mt-2 animate-in fade-in slide-in-from-top-2">
                <div class="my-3 h-[1px] w-12 bg-primary/50"></div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {#if item.images && item.images.length > 0}
                  <div class="mt-5 w-full flex flex-row gap-4 overflow-x-auto custom-scrollbar-horizontal pb-3">
                    {#each item.images as imgObj, idx}
                      <div class="w-44 md:w-56 flex-shrink-0 p-2 md:p-3 rounded-xl border border-border bg-muted/20">
                        <button 
                          class="w-full h-24 md:h-28 mb-2 md:mb-3 rounded-lg overflow-hidden relative group/img block focus:outline-none 
                          {imgObj.coords ? 'cursor-pointer hover:ring-2 hover:ring-primary ring-offset-2 ring-offset-background transition-all' : 'cursor-default'}"
                          on:click|stopPropagation={() => imgObj.coords && zoomToSubLocation(imgObj.coords)}
                        >
                          <img 
                            src={imgObj.url} 
                            alt="{item.role} - Image {idx + 1}"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                          {#if imgObj.coords}
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <span class="text-[9px] md:text-[10px] font-mono font-bold text-white uppercase tracking-wider bg-black/60 px-2 py-1 rounded">
                                Zoom To Map
                              </span>
                            </div>
                          {/if}
                        </button>

                        <h4 class="text-xs md:text-sm font-bold text-foreground mb-1 leading-tight truncate">
                          {imgObj.locName ? imgObj.locName : item.role}
                        </h4>
                        
                        {#if item.type !== 'online' && idx === 0}
                          <div class="flex items-center justify-between text-[9px] md:text-[10px] font-mono text-muted-foreground/60 border-t border-border/50 pt-2 mt-2">
                            <span>LAT {(imgObj.coords ? imgObj.coords[1] : item.coords[1]).toFixed(2)}°</span>
                            <span>LNG {(imgObj.coords ? imgObj.coords[0] : item.coords[0]).toFixed(2)}°</span>
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <div class="lg:col-span-6 order-1 lg:order-2 lg:sticky lg:top-24 z-10">
        <div class="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-background transition-all duration-300 h-[35vh] lg:h-[70vh]">
          <div bind:this={mapContainer} class="absolute inset-0 h-full w-full"></div>
          <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] md:shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] z-10"></div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  :global(.mapboxgl-canvas) {
    outline: none;
  }

  /* CUSTOM SCROLLBAR FOR HORIZONTAL DOCK */
  .custom-scrollbar-horizontal::-webkit-scrollbar {
    height: 6px;
  }
  .custom-scrollbar-horizontal::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
    background-color: rgba(var(--primary), 0.3);
    border-radius: 10px;
  }
  .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
    background-color: rgba(var(--primary), 0.6);
  }

  /* MAP MARKERS BASE */
  :global(.marker-dot) {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
  }

  :global(.dot-inner) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  /* PHYSICAL MARKERS (Teal/Primary) */
  :global(.marker-dot.is-physical .dot-inner) {
    background-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary), 0.3);
  }
  :global(.marker-dot.is-physical:hover .dot-inner) {
    transform: scale(1.5);
    background-color: white;
  }

  /* ONLINE MARKERS (Purple/Hollow) */
  :global(.marker-dot.is-online .dot-inner) {
    background-color: transparent;
    border: 2px solid #a855f7;
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.2);
  }
  :global(.marker-dot.is-online:hover .dot-inner) {
    transform: scale(1.5);
    background-color: #a855f7;
    border-color: transparent;
  }

  /* SUB-LOCATION MARKERS (Smaller, Purple Hollow) */
  :global(.marker-dot.is-sublocation) {
    width: 14px;
    height: 14px;
    z-index: 10;
  }
  :global(.marker-dot.is-sublocation .dot-inner) {
    width: 6px;
    height: 6px;
    background-color: transparent;
    border: 2px solid #a855f7;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
  }
  :global(.marker-dot.is-sublocation:hover .dot-inner) {
    transform: scale(1.5);
    background-color: #a855f7;
  }

  /* MAPBOX POPUP OVERRIDES (Dark Mode) */
  :global(.story-popup .mapboxgl-popup-content) {
    background: rgba(10, 10, 10, 0.95) !important;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 0.75rem !important;
    padding: 0.5rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  }

  :global(.story-popup .mapboxgl-popup-tip) {
    border-top-color: rgba(10, 10, 10, 0.95) !important;
    border-bottom-color: rgba(10, 10, 10, 0.95) !important;
  }
</style>