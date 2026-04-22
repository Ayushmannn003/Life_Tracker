document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.querySelector('.mobile-viewport');
    
    if (viewport) {
        // Determine current page to highlight active tab
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        // Define the 3 Core Features
        const navItems = [
            { name: "Dashboard", icon: "ph-house", link: "index.html" },
            { name: "Progress", icon: "ph-target", link: "progress.html" },
            { name: "Analytics", icon: "ph-chart-line-up", link: "analyzer.html" }
        ];

        let navHTML = `
            <nav class="sticky bottom-0 w-full bg-[#020202]/90 backdrop-blur-xl border-t border-white/5 z-50 mt-auto pb-safe">
                <div class="flex justify-between items-center px-8 py-3">
        `;

        navItems.forEach(item => {
            const isActive = currentPage === item.link;
            
            // Dynamic styling based on whether the user is on this page
            const activeColor = isActive ? "text-accentTeal drop-shadow-[0_0_8px_rgba(102,252,241,0.8)]" : "text-gray-500 hover:text-gray-300";
            const iconStyle = isActive ? "ph-fill" : "ph-bold";
            const dot = isActive ? `<div class="w-1 h-1 bg-accentTeal rounded-full mt-1.5 shadow-[0_0_5px_#66FCF1]"></div>` : `<div class="w-1 h-1 mt-1.5 opacity-0"></div>`;

            navHTML += `
                <a href="${item.link}" class="flex flex-col items-center justify-center w-14 transition-transform active:scale-90 touch-btn">
                    <i class="${iconStyle} ${item.icon} text-2xl ${activeColor} transition-colors duration-200"></i>
                    ${dot}
                </a>
            `;
        });

        navHTML += `
                </div>
            </nav>
        `;

        // Inject at the very bottom of the mobile viewport container
        viewport.insertAdjacentHTML('beforeend', navHTML);
    } else {
        console.error("Bottom Nav Error: .mobile-viewport container not found.");
    }
});