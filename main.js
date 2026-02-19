// ========================================
// Mix Platform - Frontend Main JS
// Handles PWA interactions and API communication
// ========================================

// ---- Configuration ----
const MIX_API_BASE = "http://localhost:5000"; // backend server
const ENTRY_CODE = "MIX-001";                 // X-MIX-CODE header

// ---- Utility to fetch Health ----
async function fetchHealth() {
    try {
        const res = await fetch(`${MIX_API_BASE}/health`, {
            headers: { "X-MIX-CODE": ENTRY_CODE }
        });
        const data = await res.json();
        console.log(" Mix Platform Health:", data);
    } catch (error) {
        console.error(" Health API Error:", error);
    }
}

// ---- Utility to fetch Chairs ----
async function fetchChairs() {
    try {
        const res = await fetch(`${MIX_API_BASE}/chairs`, {
            headers: { "X-MIX-CODE": ENTRY_CODE }
        });
        const chairs = await res.json();
        displayChairs(chairs);
    } catch (error) {
        console.error(" Chairs API Error:", error);
    }
}

// ---- Display Chairs in frontend ----
function displayChairs(chairs) {
    const container = document.getElementById("chairs");
    container.innerHTML = ""; // clear previous
    chairs.forEach(chair => {
        const div = document.createElement("div");
        div.classList.add("chair");
        div.innerHTML = `
            <h2>${chair.name}</h2>
            <p>Color: ${chair.color}</p>
            <p>Price: $${chair.price}</p>
        `;
        container.appendChild(div);
    });
}

// ---- Initialization ----
document.addEventListener("DOMContentLoaded", () => {
    console.log(" Mix Platform Frontend Loaded");
    fetchHealth();
    fetchChairs();
});
