// SYSTEM OS | BULLETPROOF MOBILE SIDEBAR ENGINE v4.0

(function initSidebar() {
    function setup() {
        // 1. Locate the Mobile Frame & Force the Anchor Lock
        let viewport = document.querySelector('.mobile-viewport');
        if (!viewport) {
            viewport = document.body;
        }

        // Strictly enforce boundaries so the sidebar cannot escape to the desktop window
        if (viewport !== document.body) {
            viewport.style.position = 'relative';
            viewport.style.overflow = 'hidden';
        }

        // Prevent duplicate sidebar injections if the script runs twice
        if (document.getElementById('sys-sidebar-container')) return;

        // 2. Build the DOM Structure
        // Using pointer-events-none instead of 'hidden' guarantees animations never freeze
        const sidebarContainer = document.createElement('div');
        sidebarContainer.id = 'sys-sidebar-container';
        sidebarContainer.className = 'absolute inset-0 z-[9999] pointer-events-none'; 
        
        sidebarContainer.innerHTML = `
            <div id="sidebar-overlay" class="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none"></div>
            
            <nav id="sidebar-menu" class="absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-[#050505]/95 backdrop-blur-xl border-r border-white/10 transform -translate-x-full transition-transform duration-300 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.8)] pointer-events-auto">
                
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
                
                <div class="flex-1 overflow-y-auto p-4 space-y-5 pb-20" id="sys-nav-links">
                    
                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Core System</p>
                        <a href="index.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-squares-four text-xl text-white"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Command Center</span>
                        </a>
                        <a href="analyzer.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-chart-line-up text-xl text-white"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Core Analytics</span>
                        </a>
                    </div>

                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Workflow</p>
                        <a href="calendar.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-calendar-blank text-xl text-white"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Schedule</span>
                        </a>
                        <a href="focus.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-target text-xl text-[#FBBF24]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Deep Focus</span>
                        </a>
                        <a href="habits.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-check-square-offset text-xl text-[#66FCF1]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Habit Forge</span>
                        </a>
                        <a href="regular_habits.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-calendar-check text-xl text-[#3B82F6]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Daily Routines</span>
                        </a>
                    </div>

                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Life & Bio</p>
                        <a href="budget.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-wallet text-xl text-[#FF4C4C]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Capital Control</span>
                        </a>
                        <a href="library.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-books text-xl text-[#3B82F6]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Library Backlog</span>
                        </a>
                        <a href="health.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-heartbeat text-xl text-[#FF4C4C]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Health Matrix</span>
                        </a>
                        <a href="sleep.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                            <i class="ph-fill ph-moon-stars text-xl text-[#A855F7]"></i>
                            <span class="text-xs font-bold uppercase tracking-widest">Recovery Arc</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;

        viewport.appendChild(sidebarContainer);

        // 3. Highlight the Active Page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#sys-nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.remove('text-gray-400');
                link.classList.add('bg-white/10', 'text-white', 'border-l-2', 'border-accentTeal');
                link.querySelector('span').classList.replace('font-bold', 'font-black');
                link.querySelector('span').classList.add('text-accentTeal');
            }
        });

        // 4. State & Animation Engine
        const menu = document.getElementById('sidebar-menu');
        const overlay = document.getElementById('sidebar-overlay');
        let isOpen = false;

        function openMenu() {
            isOpen = true;
            // Activate click targets
            sidebarContainer.classList.remove('pointer-events-none');
            overlay.classList.remove('pointer-events-none');
            overlay.classList.add('pointer-events-auto');
            
            // Trigger visual animations
            menu.classList.remove('-translate-x-full');
            overlay.classList.remove('opacity-0');
        }

        function closeMenu() {
            isOpen = false;
            // Trigger visual exit
            menu.classList.add('-translate-x-full');
            overlay.classList.add('opacity-0');
            
            // Remove click targets ONLY after animation finishes
            setTimeout(() => {
                if (!isOpen) {
                    overlay.classList.add('pointer-events-none');
                    overlay.classList.remove('pointer-events-auto');
                    sidebarContainer.classList.add('pointer-events-none');
                }
            }, 300);
        }

        // 5. Global Event Delegation (Captures clicks even if buttons load late)
        document.addEventListener('click', (e) => {
            if (e.target.closest('#menu-btn') || e.target.closest('.ph-list')) {
                openMenu();
            } else if (e.target.closest('#close-sidebar') || e.target.closest('#sidebar-overlay')) {
                closeMenu();
            }
        });

        // 6. Mobile Native Swipe-to-Close
        let touchStartX = 0;
        menu.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        menu.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 40) {
                closeMenu();
            }
        }, { passive: true });
    }

    // Ensures script executes immediately if DOM is ready, or waits if it is not
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();