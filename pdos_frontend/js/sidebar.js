document.addEventListener("DOMContentLoaded", () => {
    // 1. Grouped Architecture for maximum organization
    const menuStructure = [
        {
            category: "Core System",
            items: [
                { name: "Command Center", icon: "ph-cpu", link: "index.html", color: "accentTeal" },
                { name: "Core Analytics", icon: "ph-chart-polar", link: "analyzer.html", color: "accentPurple" }
            ]
        },
        {
            category: "Execution Protocol",
            items: [
                { name: "Academic Hub", icon: "ph-graduation-cap", link: "academics.html", color: "accentBlue" },
                { name: "Task Protocol", icon: "ph-check-circle", link: "todo.html", color: "accentRed" },
                { name: "Deep Focus", icon: "ph-target", link: "focus.html", color: "accentYellow" }
            ]
        },
        {
            category: "Life Logistics",
            items: [
                { name: "Routine Adherence", icon: "ph-arrows-clockwise", link: "regular_habits.html", color: "accentYellow" },
                { name: "Capital Flow", icon: "ph-wallet", link: "budget.html", color: "accentTeal" },
                { name: "Media Archive", icon: "ph-books", link: "library.html", color: "accentPurple" }
            ]
        },
        {
            category: "Bio & Recovery",
            items: [
                { name: "Bio-Metrics", icon: "ph-heartbeat", link: "health.html", color: "accentRed" },
                { name: "Sleep Yield", icon: "ph-moon-stars", link: "sleep.html", color: "accentBlue" }
            ]
        }
    ];

    // Determine current page to highlight active tab securely
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // 2. Generate the Navigation HTML with Category Headers
    let navHTML = '';
    
    menuStructure.forEach(group => {
        // Inject Category Header
        navHTML += `
            <div class="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] pl-3 mt-4 mb-1">
                ${group.category}
            </div>
        `;
        
        // Inject Items in that Category
        group.items.forEach(item => {
            const isActive = currentPage === item.link;
            
            // If active, give it a glowing background and a left-border accent
            const activeClasses = isActive 
                ? `bg-${item.color}/10 border-r border-y border-${item.color}/20 text-white shadow-[inset_3px_0_0_currentColor] text-${item.color}` 
                : `border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300`;
                
            const iconStyle = isActive ? `text-${item.color} ph-fill drop-shadow-[0_0_5px_currentColor]` : `text-gray-500 ph-bold`;

            navHTML += `
                <a href="${item.link}" class="flex items-center gap-4 p-3 rounded-r-xl transition-all duration-200 active:scale-95 ${activeClasses}">
                    <i class="${item.icon} ${iconStyle} text-xl transition-colors"></i>
                    <span class="text-[11px] font-black uppercase tracking-widest mt-0.5 ${isActive ? 'text-white' : ''}">${item.name}</span>
                </a>
            `;
        });
    });

    // 3. Build the Sidebar Structure (Strictly locked inside the mobile viewport)
    const sidebarStructure = `
        <style>
            /* Custom Scrollbar hiding for sidebar */
            #sys-sidebar-menu::-webkit-scrollbar { display: none; }
            #sys-sidebar-menu { -ms-overflow-style: none; scrollbar-width: none; }
        </style>
        
        <div id="sys-sidebar-backdrop" class="absolute inset-0 bg-black/80 backdrop-blur-sm z-[9998] opacity-0 pointer-events-none transition-opacity duration-300 rounded-[inherit]"></div>
        
        <div id="sys-sidebar" class="absolute top-0 left-0 h-full w-[80%] max-w-[300px] bg-[#050608] border-r border-white/5 z-[9999] transform -translate-x-full transition-transform duration-300 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.9)] rounded-l-[inherit] overflow-hidden">
            
            <div class="p-6 pb-4 border-b border-white/5 flex justify-between items-center bg-[#020202]">
                <div class="flex items-center gap-2">
                    <i class="ph-fill ph-hexagon text-accentTeal text-xl drop-shadow-[0_0_8px_rgba(102,252,241,0.5)]"></i>
                    <h2 class="text-xs font-black text-white tracking-widest uppercase mt-0.5">System OS</h2>
                </div>
                <button id="close-sidebar-btn" class="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 active:scale-90 transition">
                    <i class="ph-bold ph-x text-sm"></i>
                </button>
            </div>
            
            <div id="sys-sidebar-menu" class="flex-1 overflow-y-auto p-3 pr-4 flex flex-col gap-0.5 pb-20">
                ${navHTML}
            </div>
            
            <div class="p-5 border-t border-white/5 bg-[#020202]">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-accentTeal shadow-[0_0_8px_rgba(102,252,241,0.8)] animate-pulse"></div>
                        <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Sys. Online</span>
                    </div>
                    <span class="text-[9px] font-black text-gray-600 uppercase tracking-widest">v3.2.0</span>
                </div>
            </div>
        </div>
    `;

    // 4. Inject securely inside the mobile wrapper container
    const viewport = document.querySelector('.mobile-viewport');
    
    if (viewport) {
        viewport.style.position = 'relative'; 
        viewport.style.overflow = 'hidden'; // Essential to stop the drawer from spilling onto desktop
        viewport.insertAdjacentHTML('beforeend', sidebarStructure);

        // 5. Connect UI Triggers
        const menuBtn = document.getElementById('menu-btn');
        const sidebar = document.getElementById('sys-sidebar');
        const backdrop = document.getElementById('sys-sidebar-backdrop');
        const closeBtn = document.getElementById('close-sidebar-btn');

        function openSidebar() {
            sidebar.style.transform = 'translateX(0)';
            backdrop.style.opacity = '1';
            backdrop.style.pointerEvents = 'auto';
        }

        function closeSidebar() {
            sidebar.style.transform = 'translateX(-100%)';
            backdrop.style.opacity = '0';
            backdrop.style.pointerEvents = 'none';
        }

        if(menuBtn) menuBtn.addEventListener('click', openSidebar);
        if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if(backdrop) backdrop.addEventListener('click', closeSidebar);

        // 6. Native Swipe-to-Close Gesture
        let touchStartX = 0;
        let touchEndX = 0;
        
        sidebar.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        sidebar.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 40) { // Fast, responsive swipe threshold
                closeSidebar();
            }
        }, {passive: true});
    } else {
        console.error("Critical: .mobile-viewport container not found. Sidebar aborted.");
    }
});