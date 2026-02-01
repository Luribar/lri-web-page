<section class="relative w-full overflow-hidden border-b border-border bg-background/30 backdrop-blur-md py-24 transition-colors duration-500">
    
    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="relative mx-auto max-w-7xl px-6 md:px-12">
        
        <header class="mb-20 flex flex-col gap-3">
            <div class="flex items-center gap-3">
                <span class="font-mono text-[10px] font-bold tracking-[0.4em] text-primary">01 //</span>
                <div class="h-[1px] w-8 bg-border"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/60"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
                About <span class="text-primary">Me</span>
            </h2>
        </header>

        <div class="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            <div class="lg:w-5/12 lg:sticky lg:top-32 flex flex-col gap-8">
                
                <div class="relative group mx-auto">
                    <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
                    
                    <div class="relative aspect-square w-48 md:w-64 overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl ring-1 ring-white/10">
                        <img 
                            src="src/lib/assets/images/about_me.jpg" 
                            alt="Lucas Rivero Iribarne" 
                            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                </div>

                <div class="text-center lg:text-left">
                    <h3 class="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground">
                        I'm <span class="text-primary">Lucas Rivero Iribarne</span>.
                    </h3>
                    <p class="mt-4 text-lg text-muted-foreground leading-relaxed">
                        Agricultural Engineer turned Data Engineer. I build models to understand complex systems, forecast trends, and drive data-informed decisions.
                    </p>
                    <div class="mt-6 h-[2px] w-12 bg-primary/40 mx-auto lg:mx-0"></div>
                </div>
            </div>

            <div class="lg:w-7/12 space-y-8 text-base md:text-lg leading-relaxed text-muted-foreground">
                
                <p>
                    My journey began in <span class="text-foreground font-semibold">Agricultural Engineering</span>, driven by a curiosity about how plant physiology adapts to a changing climate. I cut my teeth on projects spanning agricultural and natural systems—from modeling water flow in avocado plantations using remote sensing to monitoring watershed hydrology under climate stress.
                </p>

                <p>
                    In <span class="text-foreground font-mono font-medium">2022</span>, I relocated to the Netherlands to pursue a Master's in Geo-Information Science at Wageningen. There, I deepened my expertise in both physical and statistical modeling. My goal was clear: develop data-driven solutions to confront global change using a robust tech stack—<span class="italic text-foreground/80">GIS, Python, in-situ sensors, and Big Data analytics.</span>
                </p>

                <p>
                    Currently, I am a <strong class="text-foreground font-semibold">Data Engineer</strong> at 
                    <a class="text-primary hover:text-primary/80 underline decoration-primary/20 underline-offset-4 transition-all" href="https://www.beyondsports.nl" target="_blank" rel="noopener noreferrer">Bunge</a>.
                </p>
                
                <p>
                    I live in Utrecht with my partner. When I'm away from the keyboard, you can find me bouldering, practicing yoga, or learning French.
                </p>

            </div>
        </div>
    </div>
</section>