// data.js
// Shared mock data for the Site Safety dashboard (Phase 1 — frontend prototype).
// This will later be replaced by data fetched from a backend/API (Phase 2)
// and eventually by live sensor + Edge AI output (Phases 3-5).
//
// 35 workers total, representing the full registered roster for the site.
// `active` = currently checked in / wearing a connected watch this shift.
// (Raju, Suresh, Anil kept as the original 3 demo workers — same ids/status
// as before — since alerts.js and worker_details.html already reference them.)

const workers = [
    { id: "12", name: "Raju", watch: "#12", status: "critical", statusText: "Critical", risk: 91, lastUpdate: "12 sec ago", active: true },
    { id: "27", name: "Suresh", watch: "#27", status: "warning", statusText: "Need Attention", risk: 64, lastUpdate: "8 sec ago", active: true },
    { id: "08", name: "Anil", watch: "#08", status: "safe", statusText: "Safe", risk: 21, lastUpdate: "5 sec ago", active: true },
    { id: "17", name: "Vikram", watch: "#17", status: "safe", statusText: "Safe", risk: 36, lastUpdate: "56 sec ago", active: true },
    { id: "06", name: "Manoj", watch: "#06", status: "critical", statusText: "Critical", risk: 81, lastUpdate: "74 sec ago", active: true },
    { id: "25", name: "Ramesh", watch: "#25", status: "safe", statusText: "Safe", risk: 27, lastUpdate: "79 sec ago", active: true },
    { id: "44", name: "Prakash", watch: "#44", status: "safe", statusText: "Safe", risk: 34, lastUpdate: "11 sec ago", active: true },
    { id: "43", name: "Suraj", watch: "#43", status: "safe", statusText: "Safe", risk: 35, lastUpdate: "92 sec ago", active: true },
    { id: "19", name: "Dinesh", watch: "#19", status: "safe", statusText: "Safe", risk: 24, lastUpdate: "85 sec ago", active: true },
    { id: "13", name: "Ajay", watch: "#13", status: "safe", statusText: "Safe", risk: 29, lastUpdate: "88 sec ago", active: true },
    { id: "18", name: "Sunil", watch: "#18", status: "safe", statusText: "Safe", risk: 34, lastUpdate: "48 sec ago", active: false },
    { id: "14", name: "Ravi", watch: "#14", status: "safe", statusText: "Safe", risk: 12, lastUpdate: "66 sec ago", active: true },
    { id: "39", name: "Sanjay", watch: "#39", status: "safe", statusText: "Safe", risk: 23, lastUpdate: "19 sec ago", active: true },
    { id: "40", name: "Naveen", watch: "#40", status: "safe", statusText: "Safe", risk: 30, lastUpdate: "66 sec ago", active: false },
    { id: "28", name: "Pradeep", watch: "#28", status: "safe", statusText: "Safe", risk: 33, lastUpdate: "54 sec ago", active: true },
    { id: "10", name: "Ashok", watch: "#10", status: "safe", statusText: "Safe", risk: 13, lastUpdate: "58 sec ago", active: true },
    { id: "01", name: "Vinod", watch: "#01", status: "safe", statusText: "Safe", risk: 31, lastUpdate: "48 sec ago", active: true },
    { id: "22", name: "Rajesh", watch: "#22", status: "warning", statusText: "Need Attention", risk: 57, lastUpdate: "13 sec ago", active: true },
    { id: "37", name: "Mahesh", watch: "#37", status: "safe", statusText: "Safe", risk: 19, lastUpdate: "87 sec ago", active: true },
    { id: "15", name: "Bala", watch: "#15", status: "safe", statusText: "Safe", risk: 36, lastUpdate: "78 sec ago", active: true },
    { id: "24", name: "Gopal", watch: "#24", status: "safe", statusText: "Safe", risk: 23, lastUpdate: "3 sec ago", active: true },
    { id: "42", name: "Sekar", watch: "#42", status: "safe", statusText: "Safe", risk: 28, lastUpdate: "81 sec ago", active: true },
    { id: "36", name: "Murugan", watch: "#36", status: "safe", statusText: "Safe", risk: 37, lastUpdate: "82 sec ago", active: true },
    { id: "21", name: "Karthik", watch: "#21", status: "safe", statusText: "Safe", risk: 30, lastUpdate: "53 sec ago", active: true },
    { id: "34", name: "Arjun", watch: "#34", status: "safe", statusText: "Safe", risk: 11, lastUpdate: "64 sec ago", active: true },
    { id: "31", name: "Sathish", watch: "#31", status: "safe", statusText: "Safe", risk: 17, lastUpdate: "11 sec ago", active: true },
    { id: "20", name: "Prabhu", watch: "#20", status: "safe", statusText: "Safe", risk: 15, lastUpdate: "17 sec ago", active: true },
    { id: "30", name: "Vasu", watch: "#30", status: "safe", statusText: "Safe", risk: 8, lastUpdate: "16 sec ago", active: true },
    { id: "09", name: "Chandran", watch: "#09", status: "warning", statusText: "Need Attention", risk: 68, lastUpdate: "71 sec ago", active: true },
    { id: "33", name: "Shankar", watch: "#33", status: "safe", statusText: "Safe", risk: 6, lastUpdate: "12 sec ago", active: false },
    { id: "32", name: "Rajan", watch: "#32", status: "warning", statusText: "Need Attention", risk: 69, lastUpdate: "22 sec ago", active: true },
    { id: "35", name: "Kannan", watch: "#35", status: "safe", statusText: "Safe", risk: 28, lastUpdate: "63 sec ago", active: true },
    { id: "03", name: "Baskar", watch: "#03", status: "safe", statusText: "Safe", risk: 36, lastUpdate: "62 sec ago", active: true },
    { id: "02", name: "Devan", watch: "#02", status: "warning", statusText: "Need Attention", risk: 65, lastUpdate: "13 sec ago", active: true },
    { id: "16", name: "Nagesh", watch: "#16", status: "safe", statusText: "Safe", risk: 26, lastUpdate: "36 sec ago", active: true }
];
