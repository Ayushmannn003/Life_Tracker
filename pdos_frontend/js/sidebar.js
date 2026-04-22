document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECT MOBILE VIEWPORT
    const viewport = document.querySelector('.mobile-viewport');
    if (!viewport) return;

    // CRITICAL FIX: This traps the sidebar inside your phone container 
    // so it doesn't bleed out onto your desktop monitor space.
    viewport.style.overflowX = 'hidden';

    // Clean up the old external injector if it exists in your HTML
    const oldInjector = document.getElementById('sidebar-injector');
    if (oldInjector && oldInjector.parentNode !== viewport) {
        oldInjector.remove();
    }

    // 2. DATA STRUCTURE
    const menuGroups = [
        {
            section: "Execution Protocol",
            items: [
                { name: "Task Vectors", icon: "ph-crosshair", link: "todo.html", color: "text-accentTeal" },
                { name: "AM/PM Rituals", icon: "ph-sun-horizon", link: "ritual.html", color: "text-accentPurple" },
                { name: "Deep Focus", icon: "ph-target", link: "focus.html", color: "text-accentYellow" }
            ]
        },
        {
            section: "Logistics",
            items: [
                { name: "Schedule", icon: "ph-calendar-blank", link: "schedule.html", color: "text-white" },
                { name: "Weekly Matrix", icon: "ph-squares-four", link: "weekly.html", color: "text-accentBlue" },
                { name: "Academic Hub", icon: "ph-graduation-cap", link: "academics.html", color: "text-accentPurple" },
                { name: "Capital Control", icon: "ph-wallet", link: "budget.html", color: "text-accentRed" }
            ]
        },
        {
            section: "Biology & Systems",
            items: [
                { name: "Health Metrics", icon: "ph-heartbeat", link: "health.html", color: "text-accentRed" },
                { name: "Recovery Yield", icon: "ph-moon-stars", link: "sleep.html", color: "text-accentPurple" },
                { name: "Baseline Routines", icon: "ph-infinity", link: "regular_habits.html", color: "text-accentTeal" },
                { name: "Habit Forge", icon: "ph-trend-up", link: "habits.html", color: "text-accentGreen" }
            ]
        },
        {
            section: "Archives",
            items: [
                { name: "Media Library", icon: "ph-books", link: "library.html", color: "text-accentBlue" }
            ]
        }
    ];

    // 3. CONSTRUCT HTML (Using absolute positioning to stay inside the phone view)
    let menuHTML = `
        <div id="side-backdrop" class="absolute inset-0 bg-black/80 backdrop-blur-sm z-[10000] opacity-0 pointer-events-none transition-opacity duration-300"></div>

        <aside id="side-panel" class="absolute top-0 left-0 h-full w-[80%] max-w-[280px] bg-[#080A0E] border-r border-white/5 z-[10001] -translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.8)]">
            
            <div class="p-6 pt-10 bg-gradient-to-b from-white/5 to-transparent border-b border-white/5 shrink-0">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 rounded-full bg-accentRed animate-pulse shadow-[0_0_8px_#FF4C4C]"></div>
                    <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">System Active</span>
                </div>
                <h1 class="text-3xl font-black text-white tracking-tighter" id="sidebar-clock">00:00:00</h1>
                <div class="flex gap-2 mt-2">
                    <span class="text-[10px] font-bold text-accentTeal uppercase tracking-widest bg-accentTeal/10 px-2 py-1 rounded border border-accentTeal/20" id="sidebar-day">DAY</span>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10" id="sidebar-date">DATE</span>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
    `;

    menuGroups.forEach(group => {
        menuHTML += `<div><h3 class="px-3 text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">${group.section}</h3>`;
        group.items.forEach(item => {
            menuHTML += `
                <a href="${item.link}" class="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 text-gray-300 active:scale-95 transition-all">
                    <i class="ph-fill ${item.icon} text-xl ${item.color} drop-shadow-[0_0_5px_currentColor]"></i>
                    <span class="text-xs font-bold uppercase tracking-wider">${item.name}</span>
                </a>
            `;
        });
        menuHTML += `</div>`;
    });

    menuHTML += `
            </nav>

            <div class="p-4 border-t border-white/5 bg-[#020202] shrink-0 mt-auto pb-8">
                <button onclick="wipeTodayData()" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accentRed/10 border border-accentRed/20 text-accentRed text-[10px] font-black uppercase tracking-widest active:scale-95 transition shadow-[0_0_10px_rgba(255,76,76,0.1)]">
                    <i class="ph-bold ph-trash"></i> Reset Daily Log
                </button>
                <p class="text-center text-[7px] text-gray-600 uppercase mt-3 tracking-widest">OS Build 3.1 &bull; Student Edition</p>
            </div>
        </aside>
    `;

    // Inject directly into the viewport container
    viewport.insertAdjacentHTML('beforeend', menuHTML);

    // 4. CORE LOGIC & ANIMATIONS
    const menuBtn = document.getElementById('menu-btn');
    const backdrop = document.getElementById('side-backdrop');
    const panel = document.getElementById('side-panel');

    const toggleSide = (open) => {
        if (open) {
            backdrop.classList.add('active', 'opacity-100', 'pointer-events-auto');
            panel.classList.remove('-translate-x-full');
        } else {
            backdrop.classList.remove('active', 'opacity-100', 'pointer-events-auto');
            panel.classList.add('-translate-x-full');
        }
    };

    if (menuBtn) menuBtn.onclick = () => toggleSide(true);
    if (backdrop) backdrop.onclick = () => toggleSide(false);

    // 5. LIVE CLOCK ENGINE
    function updateSidebarTime() {
        const now = new Date();
        
        // Time
        let h = now.getHours();
        let m = String(now.getMinutes()).padStart(2, '0');
        let s = String(now.getSeconds()).padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        const clockEl = document.getElementById('sidebar-clock');
        if (clockEl) clockEl.innerHTML = `${h}:${m}<span class="text-lg text-gray-500">:${s} ${ampm}</span>`;

        // Date & Day
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayEl = document.getElementById('sidebar-day');
        const dateEl = document.getElementById('sidebar-date');
        
        if (dayEl) dayEl.innerText = days[now.getDay()];
        if (dateEl) dateEl.innerText = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    setInterval(updateSidebarTime, 1000);
    updateSidebarTime(); // Initial call
});

// 6. GLOBAL ACTIONS (Accessible from sidebar)
window.wipeTodayData = function() {
    if (confirm("INITIALIZE DATA WIPE?\n\nThis will clear all tasks, rituals, and expenses logged for today. Historical data will remain intact.")) {
        localStorage.removeItem('sys_todos');
        localStorage.removeItem('sys_rituals');
        
        const todayStr = getLocalYMD(new Date());
        let expenses = JSON.parse(localStorage.getItem('sys_expenses')) || [];
        expenses = expenses.filter(e => e.date !== todayStr);
        localStorage.setItem('sys_expenses', JSON.stringify(expenses));

        alert("Daily protocols reset to zero.");
        window.location.reload();
    }
}

function getLocalYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}