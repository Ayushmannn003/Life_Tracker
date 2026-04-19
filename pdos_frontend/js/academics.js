// ==========================================
// SYSTEM OS | ACADEMIC HUB LOGIC
// ==========================================

// Global State
let academicState = {
    courses: [],
    deadlines: [],
    projects: []
};

// Semester Config (Edit this to match your actual semester end date)
const SEMESTER_END_DATE = new Date('2026-06-30');
const SEMESTER_START_DATE = new Date('2026-01-15');

/**
 * 1. INITIALIZATION & DATA FETCHING
 */
async function initAcademicHub() {
    console.log("Initializing Academic Hub...");

    // Check if API is linked
    if (typeof AcademicsAPI === 'undefined') {
        console.error("AcademicsAPI not found. Ensure api.js is loaded before academics.js");
        return;
    }

    await fetchAcademicData();
    renderAll();
    setupEventListeners();
}

async function fetchAcademicData() {
    try {
        // Fetch all three ledgers simultaneously for speed
        const [courses, deadlines, projects] = await Promise.all([
            AcademicsAPI.getCourses(),
            AcademicsAPI.getDeadlines(),
            AcademicsAPI.getProjects()
        ]);

        academicState.courses = courses || [];
        academicState.deadlines = deadlines || [];
        academicState.projects = projects || [];
    } catch (error) {
        console.error("Failed to fetch academic data:", error);
    }
}

function renderAll() {
    renderSemesterProgress();
    renderDeadlines();
    renderCourses();
    renderProjects();
}

/**
 * 2. RENDER ENGINES
 */
function renderSemesterProgress() {
    const now = new Date();
    const totalDays = (SEMESTER_END_DATE - SEMESTER_START_DATE) / (1000 * 60 * 60 * 24);
    const daysPassed = (now - SEMESTER_START_DATE) / (1000 * 60 * 60 * 24);
    const daysLeft = Math.max(0, Math.ceil((SEMESTER_END_DATE - now) / (1000 * 60 * 60 * 24)));

    let percentage = Math.max(0, Math.min(100, (daysPassed / totalDays) * 100));

    // Update the HTML (Assuming the structure matches the one we built)
    const container = document.querySelector('.ph-hourglass-high').closest('.glass-panel');
    if (container) {
        container.innerHTML = `
            <div class="flex justify-between items-end mb-3">
                <div>
                    <p class="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Semester Arc</p>
                    <h2 class="text-3xl font-black text-white">${daysLeft} <span class="text-lg text-gray-500">Days Left</span></h2>
                </div>
                <i class="ph-fill ph-hourglass-high text-accentPurple text-2xl opacity-80 animate-pulse"></i>
            </div>
            <div class="progress-track"><div class="progress-fill bg-accentPurple" style="width: ${percentage}%"></div></div>
            <p class="text-[9px] text-gray-500 italic uppercase tracking-widest text-right mt-2">${Math.round(percentage)}% Completed</p>
        `;
    }
}

function renderDeadlines() {
    const container = document.getElementById('deadline-container');
    if (!container) return;

    // Filter out completed and sort by date
    const activeDeadlines = academicState.deadlines
        .filter(d => d.status !== 'completed')
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    if (activeDeadlines.length === 0) {
        container.innerHTML = `<p class="text-[10px] text-gray-500 italic uppercase tracking-widest pl-2">No active deadlines. System clear.</p>`;
        return;
    }

    let html = '';
    activeDeadlines.forEach(deadline => {
        // Color coding based on urgency
        let colorObj = { border: 'border-l-accentBlue', text: 'text-accentBlue' };
        if (deadline.urgency.toLowerCase() === 'high') colorObj = { border: 'border-l-accentRed', text: 'text-accentRed' };
        if (deadline.urgency.toLowerCase() === 'medium') colorObj = { border: 'border-l-accentYellow', text: 'text-accentYellow' };

        // Format Date
        const dDate = new Date(deadline.due_date);
        const dateStr = dDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        html += `
            <div class="glass-panel p-4 rounded-2xl border-l-4 ${colorObj.border} flex justify-between items-center mb-3">
                <div class="overflow-hidden pr-4">
                    <h4 class="text-xs font-bold text-white mb-1 truncate">${deadline.title}</h4>
                    <p class="text-[9px] font-black ${colorObj.text} uppercase tracking-widest">Due: ${dateStr} • ${deadline.task_type || 'Task'}</p>
                </div>
                <button onclick="completeDeadline(${deadline.id})" class="shrink-0 w-8 h-8 rounded-full border border-white/10 flex justify-center items-center active:scale-90 transition hover:bg-white/5">
                    <i class="ph ph-check text-gray-400"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderCourses() {
    const container = document.getElementById('course-container');
    if (!container) return;

    if (academicState.courses.length === 0) {
        container.innerHTML = `<p class="text-[10px] text-gray-500 italic uppercase tracking-widest col-span-2 pl-2">No courses registered in matrix.</p>`;
        return;
    }

    let html = '';
    academicState.courses.forEach(course => {
        let pct = 0;
        if (course.total_classes > 0) {
            pct = Math.round((course.attended_classes / course.total_classes) * 100);
        }

        let isSafe = pct >= course.minimum_required;
        let statusText = isSafe ? 'Safe' : 'Warning';
        let statusColor = isSafe ? 'text-gray-500' : 'text-accentRed';
        let barColor = isSafe ? `bg-${course.color_theme}` : 'bg-accentRed';
        let glowColor = isSafe ? `bg-${course.color_theme}/10` : 'bg-accentRed/10';
        let pctColor = isSafe ? 'text-white' : 'text-accentRed';

        html += `
            <div onclick="promptAttendanceUpdate(${course.id}, '${course.course_code}')" class="glass-panel p-4 rounded-[1.5rem] flex flex-col justify-between h-32 relative overflow-hidden cursor-pointer active:scale-95 transition">
                <div class="absolute right-0 top-0 w-12 h-12 ${glowColor} blur-xl rounded-full pointer-events-none"></div>
                <div>
                    <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">${course.course_code}</h4>
                    <p class="text-xs font-bold text-white leading-tight line-clamp-2">${course.course_name}</p>
                </div>
                <div>
                    <div class="flex justify-between items-end mb-1">
                        <span class="text-lg font-black ${pctColor}">${pct}%</span>
                        <span class="text-[8px] font-bold ${statusColor} uppercase">${statusText}</span>
                    </div>
                    <div class="progress-track !h-1"><div class="progress-fill ${barColor}" style="width: ${pct}%"></div></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderProjects() {
    const container = document.getElementById('project-container');
    if (!container) return;

    if (academicState.projects.length === 0) {
        container.innerHTML = `<p class="text-[10px] text-gray-500 italic uppercase tracking-widest pl-2">No active engineering builds.</p>`;
        return;
    }

    let html = '';
    academicState.projects.forEach(project => {
        // Stage coloring
        let stageColor = 'bg-gray-400';
        let stageTextClass = 'text-gray-400';
        let borderClass = 'border-t-white/20';

        if (project.stage.toLowerCase() === 'development') { stageColor = 'bg-accentTeal animate-pulse'; stageTextClass = 'text-accentTeal'; borderClass = 'border-t-accentTeal'; }
        else if (project.stage.toLowerCase() === 'testing') { stageColor = 'bg-accentYellow'; stageTextClass = 'text-accentYellow'; borderClass = 'border-t-accentYellow'; }
        else if (project.stage.toLowerCase() === 'deployed') { stageColor = 'bg-accentPurple'; stageTextClass = 'text-accentPurple'; borderClass = 'border-t-accentPurple'; }

        // Tech Stack Tags
        let tagsHtml = '';
        if (project.tech_stack && Array.isArray(project.tech_stack)) {
            tagsHtml = project.tech_stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        }

        html += `
            <div class="glass-panel p-5 rounded-[2rem] border-t-2 ${borderClass} relative overflow-hidden mb-4">
                <div class="absolute top-4 right-4 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full ${stageColor}"></span>
                    <span class="text-[8px] font-black ${stageTextClass} uppercase tracking-widest">${project.stage}</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-2 pr-20 truncate">${project.title}</h4>
                <p class="text-[10px] text-gray-400 leading-relaxed mb-4 line-clamp-2">${project.description || 'No description provided.'}</p>
                <div class="flex flex-wrap gap-1.5">
                    ${tagsHtml}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}


/**
 * 3. INTERACTIVE ACTIONS & MODALS
 */

// Marks a deadline as complete and syncs with backend
window.completeDeadline = async function (id) {
    try {
        await AcademicsAPI.updateDeadlineStatus(id, 'completed');
        // Refresh data
        await fetchAcademicData();
        renderDeadlines();
    } catch (e) {
        console.error("Failed to complete deadline", e);
        alert("Sync error. Please try again.");
    }
}

// Quick Attendance Logger
window.promptAttendanceUpdate = async function (id, code) {
    const course = academicState.courses.find(c => c.id === id);
    if (!course) return;

    // Simple prompt for quick mobile logging
    let input = prompt(`[ ${code} ] Logging Attendance\nFormat: Attended/Total\nCurrent: ${course.attended_classes}/${course.total_classes}`, `${course.attended_classes}/${course.total_classes}`);

    if (input) {
        let parts = input.split('/');
        if (parts.length === 2) {
            let att = parseInt(parts[0]);
            let tot = parseInt(parts[1]);
            if (!isNaN(att) && !isNaN(tot)) {
                await AcademicsAPI.updateAttendance(id, att, tot);
                await fetchAcademicData();
                renderCourses();
            }
        }
    }
}

// Setup the + Button
function setupEventListeners() {
    const fab = document.querySelector('.ph-plus').parentElement;
    if (fab) {
        fab.addEventListener('click', triggerAddModal);
    }
}

// Dynamic Modal Injection
function triggerAddModal() {
    // Basic prompt router for now to keep it lightweight. 
    // In a full build, this would inject HTML for a form.
    let type = prompt("What are you logging? \n1. Deadline\n2. Project\n3. Course", "1");

    if (type === "1") {
        let title = prompt("Deadline Title:");
        let date = prompt("Due Date (YYYY-MM-DD):");
        if (title && date) {
            AcademicsAPI.createDeadline({
                title: title,
                due_date: date,
                urgency: "High", // Defaulting to high for manual entry
                status: "pending"
            }).then(() => { fetchAcademicData().then(renderAll); });
        }
    } else if (type === "2") {
        let title = prompt("Project Title:");
        let tech = prompt("Tech Stack (comma separated):");
        if (title) {
            AcademicsAPI.createProject({
                title: title,
                tech_stack: tech ? tech.split(',').map(s => s.trim()) : [],
                stage: "Ideation"
            }).then(() => { fetchAcademicData().then(renderAll); });
        }
    } else if (type === "3") {
        let code = prompt("Course Code (e.g., CS401):");
        let name = prompt("Course Name:");
        if (code && name) {
            AcademicsAPI.createCourse({
                course_code: code,
                course_name: name,
                color_theme: "accentBlue"
            }).then(() => { fetchAcademicData().then(renderAll); });
        }
    }
}
// --- NEW: Dynamic Semester Arc Configurator ---
window.promptEditSemester = function () {
    let currentConfig = JSON.parse(localStorage.getItem('sys_semester_config')) || {
        start: '2026-01-15',
        end: '2026-06-30',
        number: '6'
    };

    let newStart = prompt("Enter Semester Start Date (YYYY-MM-DD):", currentConfig.start);
    let newEnd = prompt("Enter Semester End Date (YYYY-MM-DD):", currentConfig.end);
    let newNum = prompt("Enter Semester Number (e.g. 6):", currentConfig.number);

    if (newStart && newEnd) {
        localStorage.setItem('sys_semester_config', JSON.stringify({
            start: newStart,
            end: newEnd,
            number: newNum || currentConfig.number
        }));
        // Update variables and re-render
        SEMESTER_START_DATE = new Date(newStart);
        SEMESTER_END_DATE = new Date(newEnd);

        const numDisplay = document.getElementById('semester-number-display');
        const startDisplay = document.getElementById('semester-start-display');
        if (numDisplay) numDisplay.innerText = newNum;
        if (startDisplay) startDisplay.innerText = `Start: ${new Date(newStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

        renderSemesterProgress();
    }
}

// -------------------------
// BOOT SEQUENCE
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Wait slightly for sidebar and api.js to initialize
    setTimeout(initAcademicHub, 200);
});