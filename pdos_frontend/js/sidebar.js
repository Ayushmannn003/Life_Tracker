document.addEventListener("DOMContentLoaded", () => {
    // 1. Define the Sidebar HTML structure
    // Note: Changed 'fixed' to 'absolute' so it stays trapped inside your .mobile-viewport
    const sidebarHTML = `
        <div id="sidebar-overlay" class="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300"></div>
        
        <div id="system-sidebar" class="absolute top-0 left-0 h-full w-[260px] bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 z-50 transform -translate-x-full transition-transform duration-300 flex flex-col shadow-2xl">
            
            <div class="p-6 flex justify-between items-center border-b border-white/5">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-accentTeal shadow-[0_0_8px_#66FCF1]"></div>
                    <h2 class="text-sm font-black text-white tracking-widest uppercase">System OS</h2>
                </div>
                <button id="close-sidebar" class="text-gray-500 hover:text-white transition active:scale-90">
                    <i class="ph ph-x text-xl"></i>
                </button>
            </div>

            <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                
                <a href="index.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-squares-four text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase">Dashboard</span>
                </a>

                <a href="calendar.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-calendar-blank text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase">Schedule</span>
                </a>

                <a href="focus.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-target text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase text-accentYellow">Deep Focus</span>
                </a>

                <a href="habits.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-check-square-offset text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase">Habits</span>
                </a>

                <a href="budget.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-wallet text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase">Finance</span>
                </a>

                <a href="health.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-heartbeat text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase">Health Hub</span>
                </a>

                <a href="library.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-books text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase">Library</span>
                </a>

                <div class="pt-4 mt-4 border-t border-white/5"></div>

                <a href="analyzer.html" class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition active:bg-white/10">
                    <i class="ph ph-chart-line-up text-xl"></i>
                    <span class="text-xs font-bold tracking-widest uppercase text-accentPurple">Analytics</span>
                </a>
            </nav>

            <div class="p-6 border-t border-white/5">
                <div class="flex items-center justify-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    <i class="ph-fill ph-lock-key"></i> System Secured
                </div>
            </div>
        </div>
    `;

    // 2. Inject into the DOM
    const injector = document.getElementById("sidebar-injector");
    if (injector) {
        injector.innerHTML = sidebarHTML;
    }

    // 3. Setup Toggle Logic
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-sidebar");
    const sidebar = document.getElementById("system-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    function openSidebar() {
        overlay.classList.remove("hidden");
        // small delay to allow display:block to apply before opacity transition
        setTimeout(() => overlay.classList.remove("opacity-0"), 10);
        sidebar.classList.remove("-translate-x-full");
    }

    function closeSidebar() {
        overlay.classList.add("opacity-0");
        sidebar.classList.add("-translate-x-full");
        // wait for transition to finish before hiding overlay
        setTimeout(() => overlay.classList.add("hidden"), 300);
    }

    if (menuBtn) menuBtn.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);
});