// SYSTEM OS | TRUE MOBILE SIDEBAR ENGINE

document.addEventListener("DOMContentLoaded", () => {
    const injector = document.getElementById('sidebar-injector');
    if (!injector) return;

    // CHANGED: 'fixed' changed to 'absolute' to keep it trapped inside the mobile viewport
    const sidebarHTML = `
        <div id="sidebar-overlay" class="absolute inset-0 bg-black/80 backdrop-blur-sm z-[90] hidden opacity-0 transition-opacity duration-300"></div>
        
        <nav id="sidebar-menu" class="absolute top-0 left-0 h-full w-[85%] bg-[#050505]/95 backdrop-blur-xl border-r border-white/10 z-[100] transform -translate-x-full transition-transform duration-300 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.8)]">
            
            <div class="p-6 pt-8 border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent">
                <div class="flex justify-between items-start mb-4">
                    <div class="h-12 w-12 rounded-full bg-accentTeal/20 border border-accentTeal flex items-center justify-center">
                        <i class="ph-fill ph-user text-2xl text-accentTeal"></i>
                    </div>
                    <div id="close-sidebar" class="h-8 w-8 flex items-center justify-center bg-black/50 rounded-full active:scale-90 transition cursor-pointer border border-white/10">
                        <i class="ph ph-x text-sm text-gray-400"></i>
                    </div>
                </div>
                <div>
                    <h2 class="text-sm font-black text-white tracking-widest uppercase">Admin User</h2>
                    <p class="text-[9px] text-accentTeal font-bold tracking-[0.2em] mt-1 flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-accentTeal animate-pulse"></span> SYSTEM OS ONLINE
                    </p>
                </div>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 space-y-5 pb-20">
                
                <div class="space-y-1">
                    <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Core System</p>
                    <a href="index.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-squares-four text-xl text-white"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Command Center</span>
                    </a>
                    <a href="analyzer.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-chart-line-up text-xl text-white"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Core Analytics</span>
                    </a>
                </div>

                <div class="space-y-1">
                    <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Workflow</p>
                    <a href="calendar.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-calendar-blank text-xl text-white"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Schedule</span>
                    </a>
                    <a href="focus.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-target text-xl text-[#FBBF24]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Deep Focus</span>
                    </a>
                    <a href="habits.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-check-square-offset text-xl text-[#66FCF1]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Habit Forge</span>
                    </a>
                    <a href="regular_habits.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-calendar-check text-xl text-[#3B82F6]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Daily Routines</span>
                    </a>
                </div>

                <div class="space-y-1">
                    <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Life & Bio</p>
                    <a href="budget.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-wallet text-xl text-[#FF4C4C]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Capital Control</span>
                    </a>
                    <a href="library.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-books text-xl text-[#3B82F6]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Library Backlog</span>
                    </a>
                    <a href="health.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-heartbeat text-xl text-[#FF4C4C]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Health Matrix</span>
                    </a>
                    <a href="sleep.html" class="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-moon-stars text-xl text-[#A855F7]"></i>
                        <span class="text-xs font-black uppercase tracking-widest">Recovery Arc</span>
                    </a>
                </div>
            </div>
        </nav>
    `;

    injector.innerHTML = sidebarHTML;

    // --- LOGIC & ANIMATIONS ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');

    function openMenu() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    }

    function closeMenu() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // --- NATIVE MOBILE SWIPE-TO-CLOSE GESTURE ---
    let touchStartX = 0;
    let touchEndX = 0;

    sidebar.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebar.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        // If swiped left by more than 40px, dismiss menu
        if (touchEndX < touchStartX - 40) {
            closeMenu();
        }
    }
});