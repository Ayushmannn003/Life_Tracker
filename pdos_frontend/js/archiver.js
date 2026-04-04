// js/archiver.js
// SYSTEM OS | MONTHLY ARCHIVE ENGINE

(function() {
    function runArchiveCheck() {
        const now = new Date();
        const currentMonthId = `${now.getFullYear()}-${now.getMonth()}`; // e.g., "2026-3" (April is 3)
        
        // 1. Get the last recorded month
        let lastRecordedMonth = localStorage.getItem('sys_last_active_month');

        // If first time running, just set it and exit
        if (!lastRecordedMonth) {
            localStorage.setItem('sys_last_active_month', currentMonthId);
            return;
        }

        // 2. Has the month changed? (e.g., it is now April, but last recorded was March)
        if (currentMonthId !== lastRecordedMonth) {
            console.log("Month rollover detected. Generating Summary Report...");
            generateMonthlySummary(lastRecordedMonth);
            
            // Update the tracker so it doesn't run again until next month
            localStorage.setItem('sys_last_active_month', currentMonthId);
        }
    }

    function generateMonthlySummary(targetMonthId) {
        // Parse the target month to get a clean name (e.g., "March 2026")
        const [year, monthIndex] = targetMonthId.split('-');
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNameString = `${monthNames[monthIndex]} ${year}`;

        // --- GATHER CURRENT DATA ---
        
        // Finance
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        // Sleep Avg
        const sleepData = JSON.parse(localStorage.getItem('sys_sleep_logs')) || [];
        const avgSleep = sleepData.length > 0 ? (sleepData.reduce((a,b) => a+b, 0) / sleepData.length).toFixed(1) : 0;

        // Focus Logs (Calculate total hours)
        const focusLogs = JSON.parse(localStorage.getItem('sys_focus_logs')) || [];
        const totalFocusMins = focusLogs.reduce((sum, log) => sum + log.duration, 0);
        const focusHours = (totalFocusMins / 60).toFixed(1);

        // --- CREATE ARCHIVE OBJECT ---
        const archiveReport = {
            archive_id: targetMonthId,
            month_name: monthNameString,
            timestamp: new Date().toISOString(),
            metrics: {
                finance_spent: totalSpent,
                focus_hours: parseFloat(focusHours),
                sleep_avg: parseFloat(avgSleep)
                // You can add logic here to calculate habit hit-rates if needed
            }
        };

        // --- SAVE TO VAULT ---
        let archives = JSON.parse(localStorage.getItem('sys_monthly_archives')) || [];
        archives.push(archiveReport);
        localStorage.setItem('sys_monthly_archives', JSON.stringify(archives));

        // --- OPTIONAL: WIPE SLATE CLEAN ---
        // If you want the system to reset for the new month, uncomment these:
        // localStorage.setItem('expenses', JSON.stringify([])); 
        // localStorage.setItem('sys_focus_logs', JSON.stringify([]));
        
        console.log(`Archive for ${monthNameString} saved successfully.`);
    }

    // Run the check quietly in the background when the page loads
    window.addEventListener('load', runArchiveCheck);
})();