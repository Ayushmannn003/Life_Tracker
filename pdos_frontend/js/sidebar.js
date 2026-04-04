document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    if (!menuBtn) return;

    // 1. Mobile-Optimized HTML (Now including Health)
    const sidebarHTML = `
        <div id="side-menu-container" class="fixed inset-0 z-[100] pointer-events-none flex justify-center">
            <div class="w-full max-w-[430px] h-full relative overflow-hidden pointer-events-none">
                
                <div id="menu-overlay" class="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0 transition-opacity duration-300 pointer-events-auto hidden"></div>
                
                <div id="side-panel" class="absolute inset-y-0 left-0 w-[80%] max-w-[320px] bg-[#050505] border-r border-white/10 transform -translate-x-full transition-transform duration-300 ease-out pointer-events-auto shadow-2xl flex flex-col">
                    
                    <div class="p-6 flex flex-col h-full overflow-y-auto overscroll-none pb-10">
                        <div class="flex justify-between items-center mb-8 pt-4">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 bg-accentTeal rounded-full animate-pulse"></div>
                                <h2 class="text-[10px] font-black text-white uppercase tracking-[0.3em]">System OS</h2>
                            </div>
                            <i id="close-menu" class="ph ph-x text-2xl text-gray-500 cursor-pointer active:scale-90 transition p-2"></i>
                        </div>

                        <nav class="flex-1 flex flex-col gap-1">
                            <a href="index.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-house-simple text-2xl text-accentTeal"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
                            </a>
                            <a href="calendar.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-calendar-blank text-2xl"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Schedule</span>
                            </a>
                            <a href="focus.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-target text-2xl text-accentYellow"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Deep Focus</span>
                            </a>
                            <a href="regular_habits.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
    <i class="ph ph-calendar-check text-2xl text-accentBlue"></i>
    <span class="text-[10px] font-black uppercase tracking-[0.2em]">Monthly Routines</span>
</a>
                            <a href="habits.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-check-square-offset text-2xl text-accentTeal"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Habits</span>
                            </a>
                            <a href="library.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-books text-2xl text-accentBlue"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Library</span>
                            </a>
                            <a href="health.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-heartbeat text-2xl text-accentPurple"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Health</span>
                            </a>
                            <a href="sleep.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
    <i class="ph ph-moon-stars text-2xl text-accentPurple"></i>
    <span class="text-[10px] font-black uppercase tracking-[0.2em]">Recovery</span>
</a>
                            <a href="analyzer.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 p-4 rounded-2xl transition-all active:scale-95">
                                <i class="ph ph-chart-line-up text-2xl"></i>
                                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Analytics</span>
                            </a>
                        </nav>

                        <div class="pt-6 mt-6 border-t border-white/5">
                            <p class="text-[8px] font-black text-center uppercase tracking-widest text-gray-600">Mobile Build v4.2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', sidebarHTML);

    const overlay = document.getElementById('menu-overlay');
    const panel = document.getElementById('side-panel');
    const closeBtn = document.getElementById('close-menu');
    let isMenuOpen = false;

    // 2. Toggle Logic
    const toggleMenu = (isOpen) => {
        isMenuOpen = isOpen;
        if (isOpen) {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('opacity-100');
                panel.classList.remove('-translate-x-full');
            }, 10);
        } else {
            panel.classList.add('-translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    };

    // 3. Mobile Swipe-to-Close Gesture Engine
    let touchStartX = 0;
    let touchEndX = 0;

    panel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    panel.addEventListener('touchmove', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        let diff = touchStartX - touchEndX;
        if (diff > 0) {
            panel.style.transform = `translateX(-${diff}px)`;
            panel.style.transition = 'none';
        }
    }, { passive: true });

    panel.addEventListener('touchend', (e) => {
        panel.style.transition = 'transform 300ms ease-out';
        panel.style.transform = '';
        if (touchStartX - touchEndX > 50) {
            toggleMenu(false);
        }
    }, { passive: true });

    // 4. Click Listeners
    menuBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    overlay.addEventListener('click', () => toggleMenu(false));
});