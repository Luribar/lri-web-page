// $lib/mapState.svelte.ts
export class MapState {
    // We use a simple string to track where we are
    viewMode: 'hero' | 'journey' | 'hidden' = $state('hidden');
    mapInstance: mapboxgl.Map | null = $state(null);

    setHeroView() {
        this.viewMode = 'hero';
        if (this.mapInstance) {
            // Planet view: Bottom right corner, looking back at earth
            this.mapInstance.flyTo({
                center: [10, 10], // Coordinates that show mostly water/Africa for a nice aesthetic
                zoom: 1.5,        // Zoomed out to see the curve
                pitch: 45,        // Tilted
                bearing: -20,
                duration: 2000
            });
        }
    }

    setJourneyView() {
        // If you want to reuse the map later, you can add coordinates here
        this.viewMode = 'journey';
    }

    hideMap() {
        this.viewMode = 'hidden';
    }
}

export const mapState = new MapState();