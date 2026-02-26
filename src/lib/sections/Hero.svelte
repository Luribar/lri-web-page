<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
    import bgImage from '$lib/assets/images/Gemini_Generated_Image_132hj6132hj6132h.png';
    
    import { isContactOpen } from '$lib/stores/contactStore';

    let mapContainer: HTMLDivElement;
    let map: mapboxgl.Map | null = null;
    let frameId: number;
    let observer: MutationObserver;

    const COORDS = {
        santiago: [-70.6693, -33.4489] as [number, number],
        netherlands: [4.8952, 52.3702] as [number, number],
        center: [-35, 15] as [number, number] 
    };

    // FIXED: Both colors are now set to green variants
    const THEMES = {
        light: { lineColor: "#16a34a", opacity: 0.8 }, // Emerald Green
        dark: { lineColor: "#4ade80", opacity: 0.8 }   // Neon Green
    };

    onMount(() => {
        if (!PUBLIC_MAPBOX_TOKEN) return;
        mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;
        
        const isSystemDark = document.documentElement.classList.contains('dark');
        const initialStyle = isSystemDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11';

        map = new mapboxgl.Map({
            container: mapContainer,
            style: initialStyle,
            projection: 'globe',
            center: COORDS.center,   
            zoom: 1.6,
            pitch: 10,
            interactive: false,
            attributionControl: false,
            logoPosition: 'bottom-left'
        });

        map.on('style.load', () => {
            if (!map) return;
            
            // Clean up default layers
            const layers = map.getStyle().layers;
            if (layers) {
                layers.forEach((layer) => {
                    if (layer.type === 'symbol' || layer.id.includes('road')) {
                        map?.setLayoutProperty(layer.id, 'visibility', 'none');
                    }
                });
            }

            map.setFog({
                'color': 'rgba(0, 0, 0, 0)', 'high-color': 'rgba(0, 0, 0, 0)',
                'space-color': 'rgba(0, 0, 0, 0)', 'star-intensity': 0
            });

            // Initialize route and immediately force theme application
            setupRoute();
            applyTheme(document.documentElement.classList.contains('dark'));
        });

        let time = 0;
        const animate = () => {
            if (!map) return;
            time += 0.002;
            const lngOffset = Math.sin(time) * 10; 
            const latOffset = Math.cos(time) * 2; 
            map.jumpTo({ center: [COORDS.center[0] + lngOffset, COORDS.center[1] + latOffset] });
            frameId = requestAnimationFrame(animate);
        };
        map.on('load', () => animate());

        observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    applyTheme(isDark);
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
    });

    function setupRoute() {
        if (!map) return;
        
        // Check current theme to set initial color properly
        const isDark = document.documentElement.classList.contains('dark');
        const theme = isDark ? THEMES.dark : THEMES.light;

        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [COORDS.santiago, COORDS.netherlands]
                }
            }
        });

        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': { 'line-join': 'round', 'line-cap': 'round' },
            'paint': { 
                'line-width': 2, 
                'line-dasharray': [1, 2],
                'line-color': theme.lineColor, // Force color on creation
                'line-opacity': theme.opacity
            }
        });

        addLabel(COORDS.santiago, "FROM", "Santiago", 'left');
        addLabel(COORDS.netherlands, "BASE", "Netherlands", 'right');
    }

    function applyTheme(isDark: boolean) {
        if (!map || !map.isStyleLoaded()) return;
        const theme = isDark ? THEMES.dark : THEMES.light;
        
        if (map.getLayer('route')) {
            map.setPaintProperty('route', 'line-color', theme.lineColor);
            map.setPaintProperty('route', 'line-opacity', theme.opacity);
        }
        document.documentElement.style.setProperty('--map-marker-color', theme.lineColor);
    }

    function addLabel(coords: [number, number], role: string, loc: string, align: 'left' | 'right' = 'left') {
        const el = document.createElement('div');
        el.className = `marker-container ${align === 'right' ? 'align-right' : ''}`;
        el.innerHTML = `<div class="dot"></div><div class="label-content"><span class="role">${role}</span><span class="loc">${loc}</span></div>`;
        new mapboxgl.Marker({ element: el, anchor: align }).setLngLat(coords).addTo(map!);
    }

    onDestroy(() => {
        if (frameId) cancelAnimationFrame(frameId);
        observer?.disconnect();
        map?.remove();
    });

    function scrollToAbout() {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }

    function handleContact() {
        isContactOpen.set(true);
    }
</script>

<section class="relative h-screen w-full overflow-hidden bg-background px-6 md:px-12 lg:px-24 flex flex-col justify-start pt-24">
    <div class="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center animate-transpire opacity-40 mix-blend-overlay dark:opacity-30 dark:grayscale dark:mix-blend-soft-light" 
             style="background-image: url('{bgImage}');">
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-br from-background/80 via-background/30 to-background/80"></div>
    </div>
    
    <div class="relative z-20 flex flex-col items-start gap-8 max-w-2xl pointer-events-auto"> 
        <h1 class="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tight text-foreground drop-shadow-xl">
            LUCAS<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/50">RIVERO IRIBARNE.</span>
        </h1>
        <div class="h-[1px] w-24 bg-border"></div>
        <p class="max-w-md text-sm md:text-base font-mono leading-relaxed text-muted-foreground/90">
            Hi There! I am an agricultural engineer and Geospatial Data Scientist currently working as Data engineer at <a href="https://www.bunge.com/" class="underline decoration-primary decoration-2 underline-offset-4 hover:text-primary transition-colors">Bunge</a>.
        </p>

        <div class="mt-8">
            <button onclick={handleContact} class="group relative overflow-hidden rounded-full px-8 py-3 bg-primary text-primary-foreground font-bold text-sm tracking-widest uppercase transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105">
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span class="relative flex items-center gap-2">
                    Contact Me
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </span>
            </button>
        </div>
    </div>

    <div class="absolute bottom-[-15%] right-[-35%] w-[160vh] h-[140vh] z-10 pointer-events-none opacity-100 map-mask">
        <div bind:this={mapContainer} class="w-full h-full"></div>
    </div>

    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce-slow">
        <button onclick={scrollToAbout} class="flex flex-col items-center justify-center w-14 h-14 rounded-full border border-border/50 bg-background/30 backdrop-blur-sm hover:bg-primary/10 transition-colors group">
            <div class="relative h-6 w-4 overflow-hidden">
                <svg class="absolute w-4 h-4 text-primary animate-arrow-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5"/></svg>
                <svg class="absolute w-4 h-4 text-primary/70 animate-arrow-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5"/></svg>
                <svg class="absolute w-4 h-4 text-primary/40 animate-arrow-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5"/></svg>
            </div>
        </button>
    </div>
</section>

<style>
    :global(.mapboxgl-canvas) { outline: none; }
    .map-mask { mask-image: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%); -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%); }
    :global(.marker-container) { display: flex; align-items: center; gap: 12px; z-index: 10; pointer-events: none; }
    :global(.dot) { width: 8px; height: 8px; background: var(--map-marker-color, #fff); border-radius: 50%; box-shadow: 0 0 15px var(--map-marker-color); flex-shrink: 0; }
    :global(.label-content) { display: flex; flex-direction: column; border-left: 2px solid var(--map-marker-color); padding-left: 12px; background: rgba(0,0,0,0.85); padding: 6px 12px; border-radius: 0 4px 4px 0; backdrop-filter: blur(8px); box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
    :global(.marker-container.align-right) { flex-direction: row-reverse; }
    :global(.marker-container.align-right .label-content) { border-left: none; border-right: 2px solid var(--map-marker-color); padding-left: 12px; padding-right: 12px; text-align: right; border-radius: 4px 0 0 4px; }
    :global(.role) { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: #94a3b8; line-height: 1.2; margin-bottom: 2px; font-weight: 600; }
    :global(.loc) { font-family: var(--font-sans); font-weight: 800; font-size: 14px; color: #ffffff; text-transform: uppercase; line-height: 1; letter-spacing: 0.05em; }
    @keyframes arrow-flow { 0% { transform: translateY(-120%); opacity: 0; } 40% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(120%); opacity: 0.4; } }
    .animate-arrow-1 { animation: arrow-flow 1.5s infinite linear; animation-delay: 0s; }
    .animate-arrow-2 { animation: arrow-flow 1.5s infinite linear; animation-delay: 0.5s; }
    .animate-arrow-3 { animation: arrow-flow 1.5s infinite linear; animation-delay: 1s; }
    @keyframes bounce-slow { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -10px); } }
    .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
    @keyframes transpire { 0% { transform: scale(1.05) translateY(0); } 50% { transform: scale(1.1) translateY(-2%); } 100% { transform: scale(1.05) translateY(0); } }
    .animate-transpire { animation: transpire 18s ease-in-out infinite; }
</style>