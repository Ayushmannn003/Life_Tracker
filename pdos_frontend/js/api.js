// ==========================================
// SYSTEM OS | HYBRID DATA & API ENGINE
// ==========================================

// Your Python FastAPI Backend URL (Ensure this matches your uvicorn port)
const API_BASE = "http://127.0.0.1:8000/api/v1";
let isCloudConnected = false;

/**
 * 1. SYSTEM STATUS CHECK & UI UPDATE
 * Pings the backend on startup. Updates the sidebar dot indicator visually.
 */
async function checkEngineStatus() {
    try {
        // Ping the health-check endpoint
        const response = await fetch("http://127.0.0.1:8000/");
        if (response.ok) {
            console.log("🟢 System OS: Cloud Backend Connected");
            isCloudConnected = true;
            updateSyncUI(true);
        }
    } catch (error) {
        console.warn("🟡 System OS: Offline Mode. Running on local device storage.");
        isCloudConnected = false;
        updateSyncUI(false);
    }
}

/**
 * Updates the pulsing dot in the sidebar based on connection status
 */
function updateSyncUI(isConnected) {
    // Look for the pulsing dot in the sidebar
    const syncDot = document.querySelector('.bg-\\[\\#66FCF1\\].animate-pulse');
    const syncText = document.querySelector('span.uppercase.tracking-wider.text-\\[\\#C5C6C7\\]');
    
    if (syncDot && syncText) {
        if (isConnected) {
            // Online: Teal
            syncDot.className = "w-2 h-2 rounded-full bg-[#66FCF1] animate-pulse";
            syncText.innerText = "Engine Synced";
        } else {
            // Offline: Orange/Yellow
            syncDot.className = "w-2 h-2 rounded-full bg-[#f58220]";
            syncText.innerText = "Local Mode";
        }
    }
}

/**
 * 2. CLOUD SYNC WRAPPER
 * Automatically backs up local device data to the Python backend if connected.
 * @param {string} module - The feature being synced (e.g., 'todo', 'sleep', 'budget')
 * @param {object} data - The JSON data payload
 */
async function syncToCloud(module, data) {
    if (!isCloudConnected) return; // Fail silently and stay fast if offline

    try {
        await fetch(`${API_BASE}/${module}/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        console.log(`☁️ Synced [${module}] backup to cloud.`);
    } catch (error) {
        console.error(`☁️ Sync failed for [${module}]:`, error);
    }
}

/**
 * 3. UNIVERSAL STORAGE ENGINE
 * Handles instant local saving and background cloud syncing seamlessly.
 */
const StorageEngine = {
    /**
     * Loads data from device memory. If empty, seeds it with default data.
     */
    load: function(key, defaultData = []) {
        const saved = localStorage.getItem(`pdos_${key}`);
        if (saved) {
            return JSON.parse(saved);
        } else {
            this.save(key, defaultData); // Initialize it in memory
            return defaultData;
        }
    },

    /**
     * Saves data to device memory instantly, then attempts a background cloud sync.
     */
    save: function(key, data) {
        // 1. Save to Device (Instant, no loading screens for the user)
        localStorage.setItem(`pdos_${key}`, JSON.stringify(data));
        
        // 2. Push to Cloud (Background task)
        syncToCloud(key, data);
    },

    /**
     * Wipes specific module data
     */
    clear: function(key) {
        localStorage.removeItem(`pdos_${key}`);
        console.log(`🗑️ Cleared local data for [${key}]`);
    }
};

// Listen for the sidebar to finish injecting, then check engine status
document.addEventListener('DOMContentLoaded', () => {
    // Slight delay to ensure sidebar.js has injected the HTML first
    setTimeout(checkEngineStatus, 200);
});


// ==========================================
// 4. ACADEMICS HUB API ENDPOINTS
// ==========================================
const ACADEMICS_BASE = "http://127.0.0.1:8000/api/academics";

const AcademicsAPI = {
    
    // --- COURSES ---
    getCourses: async () => {
        if (!isCloudConnected) return StorageEngine.load('courses', []);
        const response = await fetch(`${ACADEMICS_BASE}/courses`);
        return response.json();
    },
    
    createCourse: async (courseData) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
            return response.json();
        }
    },
    
    updateAttendance: async (courseId, attended, total) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/courses/${courseId}/attendance?attended=${attended}&total=${total}`, {
                method: 'PUT'
            });
            return response.json();
        }
    },

    deleteCourse: async (courseId) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/courses/${courseId}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    },

    // --- DEADLINES ---
    getDeadlines: async () => {
        if (!isCloudConnected) return StorageEngine.load('deadlines', []);
        const response = await fetch(`${ACADEMICS_BASE}/deadlines`);
        return response.json();
    },

    createDeadline: async (deadlineData) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/deadlines`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deadlineData)
            });
            return response.json();
        }
    },

    updateDeadlineStatus: async (deadlineId, status) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/deadlines/${deadlineId}/status?status=${status}`, {
                method: 'PUT'
            });
            return response.json();
        }
    },

    deleteDeadline: async (deadlineId) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/deadlines/${deadlineId}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    },

    // --- PROJECTS ---
    getProjects: async () => {
        if (!isCloudConnected) return StorageEngine.load('projects', []);
        const response = await fetch(`${ACADEMICS_BASE}/projects`);
        return response.json();
    },

    createProject: async (projectData) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            return response.json();
        }
    },

    updateProjectStage: async (projectId, stage) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/projects/${projectId}/stage?stage=${stage}`, {
                method: 'PUT'
            });
            return response.json();
        }
    },

    deleteProject: async (projectId) => {
        if (isCloudConnected) {
            const response = await fetch(`${ACADEMICS_BASE}/projects/${projectId}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    }
};