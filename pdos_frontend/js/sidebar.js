// SYSTEM OS | MASTER MOBILE SIDEBAR ENGINE v10.1 (Icon Fix)

(function() {
    function initSidebar() {
        // 1. Locate the Mobile Frame Container
        let viewport = document.querySelector('.mobile-viewport');
        
        // 2. THE FIX: Auto-wrap older pages that are missing the mobile layout
        if (!viewport) {
            viewport = document.createElement('div');
            viewport.className = 'mobile-viewport';
            
            document.documentElement.style.backgroundColor = '#000';
            document.body.style.backgroundColor = '#000';
            document.body.style.margin = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100dvh';
            
            viewport.style.width = '100%';
            viewport.style.maxWidth = '430px';
            viewport.style.height = '100dvh';
            viewport.style.margin = '0 auto';
            viewport.style.position = 'relative';
            viewport.style.backgroundColor = '#020202';
            viewport.style.display = 'flex';
            viewport.style.flexDirection = 'column';
            viewport.style.overflow = 'hidden';

            while (document.body.firstChild) {
                viewport.appendChild(document.body.firstChild);
            }
            document.body.appendChild(viewport);
        }

        viewport.style.position = 'relative';
        viewport.style.overflow = 'hidden';

        if (document.getElementById('sys-sidebar-menu')) return;

        // 3. Inject the Overlay
        const overlay = document.createElement('div');
        overlay.id = 'sys-sidebar-overlay';
        overlay.className = 'absolute inset-0 bg-black/80 backdrop-blur-sm z-[90] hidden opacity-0 transition-opacity duration-300';
        viewport.appendChild(overlay);

        // 4. Inject the Menu
        const menu = document.createElement('nav');
        menu.id = 'sys-sidebar-menu';
        menu.className = 'absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-[#050505]/95 backdrop-blur-xl border-r border-white/10 z-[100] transform -translate-x-full transition-transform duration-300 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.8)]';
        
        menu.innerHTML = `
            <div class="p-6 pt-8 border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent">
                <div class="flex justify-between items-start mb-4">
                    <div class="h-12 w-12 rounded-full bg-accentTeal/20 border border-accentTeal flex items-center justify-center">
                        <i class="ph-fill ph-user text-2xl text-accentTeal"></i>
                    </div>
                    <div id="sys-close-sidebar" class="h-8 w-8 flex items-center justify-center bg-black/50 rounded-full active:scale-90 transition cursor-pointer border border-white/10">
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
                        <i class="ph-fill ph-squares-four text-xl text-white"></i><span class="text-xs font-bold uppercase tracking-widest">Command Center</span>
                    </a>
                    <a href="analyzer.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-chart-line-up text-xl text-white"></i><span class="text-xs font-bold uppercase tracking-widest">Core Analytics</span>
                    </a>
                </div>

                <div class="space-y-1">
                    <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Workflow</p>
                    <a href="calendar.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-calendar-blank text-xl text-white"></i><span class="text-xs font-bold uppercase tracking-widest">Schedule</span>
                    </a>
                    
                    <a href="weekly.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-grid-four text-xl text-[#3B82F6]"></i><span class="text-xs font-bold uppercase tracking-widest">Weekly Matrix</span>
                    </a>
                    
                    <a href="focus.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-target text-xl text-[#FBBF24]"></i><span class="text-xs font-bold uppercase tracking-widest">Deep Focus</span>
                    </a>
                    <a href="todo.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-list-checks text-xl text-[#66FCF1]"></i><span class="text-xs font-bold uppercase tracking-widest">To-Do List</span>
                    </a>
                    <a href="habits.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-check-square-offset text-xl text-[#66FCF1]"></i><span class="text-xs font-bold uppercase tracking-widest">Habit Forge</span>
                    </a>
                    <a href="rituals.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-sun-horizon text-xl text-white"></i><span class="text-xs font-bold uppercase tracking-widest">Rituals</span>
                    </a>
                    <a href="regular_habits.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-calendar-check text-xl text-[#3B82F6]"></i><span class="text-xs font-bold uppercase tracking-widest">Daily Routines</span>
                    </a>
                </div>

                <div class="space-y-1">
                    <p class="text-[8px] font-black text-gray-600 uppercase tracking-widest px-4 mb-2">Life & Bio</p>
                    <a href="budget.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-wallet text-xl text-[#FF4C4C]"></i><span class="text-xs font-bold uppercase tracking-widest">Capital Control</span>
                    </a>
                    <a href="library.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-books text-xl text-[#3B82F6]"></i><span class="text-xs font-bold uppercase tracking-widest">Library Backlog</span>
                    </a>
                    <a href="health.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-heartbeat text-xl text-[#FF4C4C]"></i><span class="text-xs font-bold uppercase tracking-widest">Health Matrix</span>
                    </a>
                    <a href="sleep.html" class="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 p-3.5 rounded-2xl transition-all">
                        <i class="ph-fill ph-moon-stars text-xl text-[#A855F7]"></i><span class="text-xs font-bold uppercase tracking-widest">Recovery Arc</span>
                    </a>
                </div>
            </div>
        `;
        viewport.appendChild(menu);

        // 5. Highlight the Active Page dynamically
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#sys-nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.remove('text-gray-400');
                link.classList.add('bg-white/10', 'text-white', 'border-l-2', 'border-accentTeal');
                const span = link.querySelector('span');
                if (span) {
                    span.classList.replace('font-bold', 'font-black');
                    span.classList.add('text-accentTeal');
                }
            }
        });

        // 6. Hardened Animation Logic
        function openMenu() {
            overlay.classList.remove('hidden');
            void overlay.offsetWidth; // Force reflow
            overlay.classList.remove('opacity-0');
            menu.classList.remove('-translate-x-full');
        }

        function closeMenu() {
            overlay.classList.add('opacity-0');
            menu.classList.add('-translate-x-full');
            
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }

        // 7. Global Event Delegation (Clicks)
        document.addEventListener('click', (e) => {
            if (e.target.closest('#menu-btn') || e.target.closest('.ph-list')) {
                openMenu();
            } 
            else if (e.target.closest('#sys-close-sidebar') || e.target.closest('#sys-sidebar-overlay')) {
                closeMenu();
            }
        });

        // 8. Native Swipe-to-Close Gesture
        let touchStartX = 0;
        menu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        menu.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 40) { 
                closeMenu();
            }
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
})();