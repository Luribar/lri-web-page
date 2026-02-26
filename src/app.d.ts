// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    // [MOVED INSIDE GLOBAL]
    interface Window {
        hcaptcha: {
            render: (container: string | HTMLElement, params: object) => string;
            reset: (widgetId?: string) => void;
            getResponse: (widgetId?: string) => string;
        };
    }
}

export {};