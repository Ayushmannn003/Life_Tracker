document.addEventListener('DOMContentLoaded', () => {
    const injector = document.getElementById('sidebar-injector');
    if (!injector) return;

    // 1. Native Mobile Drawer Structure
    const sidebarHTML = `
        <div id="sidebar-backdrop" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] opacity-0 pointer-events-none transition-opacity duration-300" style="touch-action: none;"></div>
        
        <div id="sidebar-panel" class="fixed top-0 left-0 h-[100vh] h-[100dvh] w-[280px] bg-[#050505] border-r border-white/10 z-[9999] transform -translate-x-full transition-transform duration-300 shadow-[20px_0_40px_rgba(0,0,0,0.7)] flex flex-col">
            
            <div class="px-5 pt-10 pb-5 border-b border-white/10 flex justify-between items-center bg-[#020202]">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <i class="ph-bold ph-cpu text-black text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-xs font-black text-white uppercase tracking-widest leading-none mb-1">System OS</h2>
                        <p class="text-[9px] text-accentTeal uppercase tracking-widest font-bold flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-accentTeal animate-pulse"></span> Synced
                        </p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-1" style="-webkit-overflow-scrolling: touch;">
                
                <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 pl-2">Core</p>
                <a href="index.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-house text-xl text-white"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-white">Command Center</span>
                </a>
                <a href="analyzer.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-chart-line-up text-xl text-white"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-white">Core Analytics</span>
                </a>

                <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 pl-2 mt-6">Knowledge</p>
                <a href="academics.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-graduation-cap text-xl text-accentPurple"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Academic Hub</span>
                </a>

                <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 pl-2 mt-6">Execution</p>
                <a href="todo.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-list-checks text-xl text-accentTeal"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Tasks</span>
                </a>
                <a href="calendar.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-calendar-blank text-xl text-white"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Schedule</span>
                </a>
                <a href="focus.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-target text-xl text-accentYellow"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Focus</span>
                </a>

                <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 pl-2 mt-6">Systems</p>
                <a href="rituals.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-sun-horizon text-xl text-white"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Rituals</span>
                </a>
                <a href="habits.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-check-square-offset text-xl text-accentTeal"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Habits</span>
                </a>
                <a href="regular_habits.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-calendar-check text-xl text-accentBlue"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Routine Matrix</span>
                </a>

                <p class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 pl-2 mt-6">Bio & Wealth</p>
                <a href="health.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-heartbeat text-xl text-accentRed"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Health</span>
                </a>
                <a href="sleep.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-moon-stars text-xl text-accentPurple"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Sleep</span>
                </a>
                <a href="budget.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-wallet text-xl text-accentRed"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Finance</span>
                </a>
                <a href="library.html" class="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/10 active:bg-white/10 transition">
                    <i class="ph-fill ph-books text-xl text-accentBlue"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-200">Library</span>
                </a>
            </nav>
        </div>
    `;

    injector.innerHTML = sidebarHTML;

    // 2. DOM Elements
    const backdrop = document.getElementById('sidebar-backdrop');
    const panel = document.getElementById('sidebar-panel');
    const menuBtn = document.getElementById('menu-btn');

    // 3. Engine Functions
    function openMenu() {
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100');
        panel.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeMenu() {
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        panel.classList.add('-translate-x-full');
        document.body.style.overflow = ''; // Unlock background scroll
    }

    // 4. Attach Listeners (Simple & Direct)
    if (menuBtn) {
        // Use standard click for broader compatibility
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });
    }

    // Close on Backdrop tap
    backdrop.addEventListener('click', closeMenu);

    // 5. Native Mobile Swipe-to-Close
    let startX = 0;
    panel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    panel.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) { // If thumb swiped left by 50px
            closeMenu();
        }
    }, { passive: true });

    // 6. Highlight Current Page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = panel.querySelectorAll('a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('bg-white/10', 'border', 'border-white/10');
            const text = link.querySelector('span');
            if(text) text.classList.replace('text-gray-200', 'text-white');
        }
    });
});