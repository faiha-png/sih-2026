// data.js
// Shared mock data for the Site Safety dashboard (Phase 1 -- frontend prototype).
// This will later be replaced by data fetched from a backend/API (Phase 2)
// and eventually by live sensor + Edge AI output (Phases 3-5).
//
// Three separate arrays, cleanly separated by concern:
//   workers -> information about PEOPLE    (identity, vitals, risk)
//   watches -> information about DEVICES   (pairing, battery, connectivity)
//   alerts  -> information about INCIDENTS (what happened, to whom, when)
//
// Every HTML page (overview, watches, worker_details, network) reads from
// these three arrays instead of hardcoding any names, numbers, or status
// text. A worker and its watch share the same id for the 35 currently
// assigned watches; the 2 spare/unassigned watches at the end of `watches`
// have workerId: null. Alerts only store a workerId -- the worker's name,
// watch, and risk score are always looked up live from `workers` so the
// arrays never drift out of sync with each other.

// ---------------------------------------------------------------------------
// WORKERS -- one entry per registered worker on site.
//   readings     = latest live vitals snapshot from their watch
//   riskReasons  = short bullet explanations the Edge AI surfaces for why
//                  this worker's risk score is what it is
//   riskHistory  = last 7 risk-score samples (oldest -> newest), used to
//                  draw the risk trend sparkline on worker_details.html
// ---------------------------------------------------------------------------
const workers = [
    {
        id: "12",
        name: "Raju",
        watchId: "12",
        status: "critical",
        risk: 91,
        active: true,
        activity: "heavy_labor",
        readings: { heartRate: 148, skinTemp: 38.9, spo2: 94, humidity: 78, ambientTemp: 34 },
        riskReasons: [
            "Heart rate is significantly elevated for a prolonged period.",
            "Skin temperature indicates poor heat dissipation.",
            "Ambient humidity restricts evaporative cooling.",
        ],
        riskHistory: [49, 56, 63, 70, 77, 84, 91],
        lastUpdate: "12 sec ago"
    },
    {
        id: "27",
        name: "Suresh",
        watchId: "27",
        status: "warning",
        risk: 64,
        active: true,
        activity: "steel_erection",
        readings: { heartRate: 118, skinTemp: 37.8, spo2: 96, humidity: 70, ambientTemp: 33 },
        riskReasons: [
            "Skin temperature sustained above 37.5°C for over 15 minutes.",
            "Heart rate trending upward over the last hour.",
            "No hydration break logged in the last 2 hours.",
        ],
        riskHistory: [22, 29, 36, 43, 50, 57, 64],
        lastUpdate: "8 sec ago"
    },
    {
        id: "08",
        name: "Anil",
        watchId: "08",
        status: "safe",
        risk: 21,
        active: true,
        activity: "assembly",
        readings: { heartRate: 84, skinTemp: 36.4, spo2: 98, humidity: 55, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 8, 10, 13, 16, 18, 21],
        lastUpdate: "5 sec ago"
    },
    {
        id: "17",
        name: "Vikram",
        watchId: "17",
        status: "safe",
        risk: 36,
        active: true,
        activity: "welding",
        readings: { heartRate: 101, skinTemp: 37.1, spo2: 97, humidity: 63, ambientTemp: 31 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 15, 20, 26, 31, 36],
        lastUpdate: "56 sec ago"
    },
    {
        id: "06",
        name: "Manoj",
        watchId: "06",
        status: "critical",
        risk: 81,
        active: true,
        activity: "excavation",
        readings: { heartRate: 139, skinTemp: 38.4, spo2: 95, humidity: 78, ambientTemp: 34 },
        riskReasons: [
            "Heart rate is significantly elevated for a prolonged period.",
            "Skin temperature indicates poor heat dissipation.",
            "Blood oxygen (SpO2) trending below safe threshold.",
        ],
        riskHistory: [39, 46, 53, 60, 67, 74, 81],
        lastUpdate: "74 sec ago"
    },
    {
        id: "25",
        name: "Ramesh",
        watchId: "25",
        status: "safe",
        risk: 27,
        active: true,
        activity: "material_handling",
        readings: { heartRate: 93, skinTemp: 36.8, spo2: 98, humidity: 59, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 12, 16, 20, 23, 27],
        lastUpdate: "79 sec ago"
    },
    {
        id: "44",
        name: "Prakash",
        watchId: "44",
        status: "safe",
        risk: 34,
        active: true,
        activity: "scaffolding",
        readings: { heartRate: 99, skinTemp: 37.0, spo2: 97, humidity: 62, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 15, 20, 24, 29, 34],
        lastUpdate: "11 sec ago"
    },
    {
        id: "43",
        name: "Suraj",
        watchId: "43",
        status: "safe",
        risk: 35,
        active: true,
        activity: "general_labor",
        readings: { heartRate: 100, skinTemp: 37.0, spo2: 97, humidity: 62, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 15, 20, 25, 30, 35],
        lastUpdate: "92 sec ago"
    },
    {
        id: "19",
        name: "Dinesh",
        watchId: "19",
        status: "safe",
        risk: 24,
        active: true,
        activity: "heavy_labor",
        readings: { heartRate: 90, skinTemp: 36.7, spo2: 98, humidity: 58, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 8, 11, 14, 18, 21, 24],
        lastUpdate: "85 sec ago"
    },
    {
        id: "13",
        name: "Ajay",
        watchId: "13",
        status: "safe",
        risk: 29,
        active: true,
        activity: "steel_erection",
        readings: { heartRate: 95, skinTemp: 36.9, spo2: 98, humidity: 60, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 13, 17, 21, 25, 29],
        lastUpdate: "88 sec ago"
    },
    {
        id: "18",
        name: "Sunil",
        watchId: "18",
        status: "safe",
        risk: 34,
        active: false,
        activity: "assembly",
        readings: { heartRate: 99, skinTemp: 37.0, spo2: 97, humidity: 62, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 15, 20, 24, 29, 34],
        lastUpdate: "48 sec ago"
    },
    {
        id: "14",
        name: "Ravi",
        watchId: "14",
        status: "safe",
        risk: 12,
        active: true,
        activity: "welding",
        readings: { heartRate: 80, skinTemp: 36.4, spo2: 98, humidity: 54, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 6, 7, 8, 10, 11, 12],
        lastUpdate: "66 sec ago"
    },
    {
        id: "39",
        name: "Sanjay",
        watchId: "39",
        status: "safe",
        risk: 23,
        active: true,
        activity: "excavation",
        readings: { heartRate: 90, skinTemp: 36.7, spo2: 98, humidity: 58, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 8, 11, 14, 17, 20, 23],
        lastUpdate: "19 sec ago"
    },
    {
        id: "40",
        name: "Naveen",
        watchId: "40",
        status: "safe",
        risk: 30,
        active: false,
        activity: "material_handling",
        readings: { heartRate: 96, skinTemp: 36.9, spo2: 98, humidity: 60, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 13, 18, 22, 26, 30],
        lastUpdate: "66 sec ago"
    },
    {
        id: "28",
        name: "Pradeep",
        watchId: "28",
        status: "safe",
        risk: 33,
        active: true,
        activity: "scaffolding",
        readings: { heartRate: 98, skinTemp: 37.0, spo2: 97, humidity: 62, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 14, 19, 24, 28, 33],
        lastUpdate: "54 sec ago"
    },
    {
        id: "10",
        name: "Ashok",
        watchId: "10",
        status: "safe",
        risk: 13,
        active: true,
        activity: "general_labor",
        readings: { heartRate: 81, skinTemp: 36.4, spo2: 98, humidity: 55, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 6, 8, 9, 10, 12, 13],
        lastUpdate: "58 sec ago"
    },
    {
        id: "01",
        name: "Vinod",
        watchId: "01",
        status: "safe",
        risk: 31,
        active: true,
        activity: "heavy_labor",
        readings: { heartRate: 96, skinTemp: 36.9, spo2: 97, humidity: 61, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 14, 18, 22, 27, 31],
        lastUpdate: "48 sec ago"
    },
    {
        id: "22",
        name: "Rajesh",
        watchId: "22",
        status: "warning",
        risk: 57,
        active: true,
        activity: "steel_erection",
        readings: { heartRate: 118, skinTemp: 37.7, spo2: 96, humidity: 70, ambientTemp: 32 },
        riskReasons: [
            "Skin temperature sustained above safe threshold for 15+ minutes.",
            "Heart rate trending upward over the last hour.",
            "Ambient humidity is restricting evaporative cooling.",
        ],
        riskHistory: [15, 22, 29, 36, 43, 50, 57],
        lastUpdate: "13 sec ago"
    },
    {
        id: "37",
        name: "Mahesh",
        watchId: "37",
        status: "safe",
        risk: 19,
        active: true,
        activity: "assembly",
        readings: { heartRate: 86, skinTemp: 36.6, spo2: 98, humidity: 57, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 7, 10, 12, 14, 17, 19],
        lastUpdate: "87 sec ago"
    },
    {
        id: "15",
        name: "Bala",
        watchId: "15",
        status: "safe",
        risk: 36,
        active: true,
        activity: "welding",
        readings: { heartRate: 101, skinTemp: 37.1, spo2: 97, humidity: 63, ambientTemp: 31 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 15, 20, 26, 31, 36],
        lastUpdate: "78 sec ago"
    },
    {
        id: "24",
        name: "Gopal",
        watchId: "24",
        status: "safe",
        risk: 23,
        active: true,
        activity: "excavation",
        readings: { heartRate: 90, skinTemp: 36.7, spo2: 98, humidity: 58, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 8, 11, 14, 17, 20, 23],
        lastUpdate: "3 sec ago"
    },
    {
        id: "42",
        name: "Sekar",
        watchId: "42",
        status: "safe",
        risk: 28,
        active: true,
        activity: "material_handling",
        readings: { heartRate: 94, skinTemp: 36.8, spo2: 98, humidity: 60, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 13, 16, 20, 24, 28],
        lastUpdate: "81 sec ago"
    },
    {
        id: "36",
        name: "Murugan",
        watchId: "36",
        status: "safe",
        risk: 37,
        active: true,
        activity: "scaffolding",
        readings: { heartRate: 101, skinTemp: 37.1, spo2: 97, humidity: 63, ambientTemp: 31 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 16, 21, 26, 32, 37],
        lastUpdate: "82 sec ago"
    },
    {
        id: "21",
        name: "Karthik",
        watchId: "21",
        status: "safe",
        risk: 30,
        active: true,
        activity: "general_labor",
        readings: { heartRate: 96, skinTemp: 36.9, spo2: 98, humidity: 60, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 13, 18, 22, 26, 30],
        lastUpdate: "53 sec ago"
    },
    {
        id: "34",
        name: "Arjun",
        watchId: "34",
        status: "safe",
        risk: 11,
        active: true,
        activity: "heavy_labor",
        readings: { heartRate: 79, skinTemp: 36.3, spo2: 98, humidity: 54, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 6, 7, 8, 9, 10, 11],
        lastUpdate: "64 sec ago"
    },
    {
        id: "31",
        name: "Sathish",
        watchId: "31",
        status: "safe",
        risk: 17,
        active: true,
        activity: "steel_erection",
        readings: { heartRate: 84, skinTemp: 36.5, spo2: 98, humidity: 56, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 7, 9, 11, 13, 15, 17],
        lastUpdate: "11 sec ago"
    },
    {
        id: "20",
        name: "Prabhu",
        watchId: "20",
        status: "safe",
        risk: 15,
        active: true,
        activity: "assembly",
        readings: { heartRate: 83, skinTemp: 36.5, spo2: 98, humidity: 55, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 7, 8, 10, 12, 13, 15],
        lastUpdate: "17 sec ago"
    },
    {
        id: "30",
        name: "Vasu",
        watchId: "30",
        status: "safe",
        risk: 8,
        active: true,
        activity: "welding",
        readings: { heartRate: 77, skinTemp: 36.2, spo2: 99, humidity: 53, ambientTemp: 29 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 6, 6, 6, 7, 8, 8],
        lastUpdate: "16 sec ago"
    },
    {
        id: "09",
        name: "Chandran",
        watchId: "09",
        status: "warning",
        risk: 68,
        active: true,
        activity: "excavation",
        readings: { heartRate: 128, skinTemp: 38.0, spo2: 96, humidity: 74, ambientTemp: 33 },
        riskReasons: [
            "Skin temperature sustained above safe threshold for 15+ minutes.",
            "Heart rate trending upward over the last hour.",
            "Ambient humidity is restricting evaporative cooling.",
        ],
        riskHistory: [26, 33, 40, 47, 54, 61, 68],
        lastUpdate: "71 sec ago"
    },
    {
        id: "33",
        name: "Shankar",
        watchId: "33",
        status: "safe",
        risk: 6,
        active: false,
        activity: "material_handling",
        readings: { heartRate: 75, skinTemp: 36.2, spo2: 99, humidity: 52, ambientTemp: 28 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 5, 5, 6, 6, 6, 6],
        lastUpdate: "12 sec ago"
    },
    {
        id: "32",
        name: "Rajan",
        watchId: "32",
        status: "warning",
        risk: 69,
        active: true,
        activity: "scaffolding",
        readings: { heartRate: 129, skinTemp: 38.1, spo2: 96, humidity: 74, ambientTemp: 33 },
        riskReasons: [
            "Skin temperature sustained above safe threshold for 15+ minutes.",
            "Heart rate trending upward over the last hour.",
            "Ambient humidity is restricting evaporative cooling.",
        ],
        riskHistory: [27, 34, 41, 48, 55, 62, 69],
        lastUpdate: "22 sec ago"
    },
    {
        id: "35",
        name: "Kannan",
        watchId: "35",
        status: "safe",
        risk: 28,
        active: true,
        activity: "general_labor",
        readings: { heartRate: 94, skinTemp: 36.8, spo2: 98, humidity: 60, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 9, 13, 16, 20, 24, 28],
        lastUpdate: "63 sec ago"
    },
    {
        id: "03",
        name: "Baskar",
        watchId: "03",
        status: "safe",
        risk: 36,
        active: true,
        activity: "heavy_labor",
        readings: { heartRate: 101, skinTemp: 37.1, spo2: 97, humidity: 63, ambientTemp: 31 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 10, 15, 20, 26, 31, 36],
        lastUpdate: "62 sec ago"
    },
    {
        id: "02",
        name: "Devan",
        watchId: "02",
        status: "warning",
        risk: 65,
        active: true,
        activity: "steel_erection",
        readings: { heartRate: 125, skinTemp: 38.0, spo2: 96, humidity: 73, ambientTemp: 33 },
        riskReasons: [
            "Skin temperature sustained above safe threshold for 15+ minutes.",
            "Heart rate trending upward over the last hour.",
            "Ambient humidity is restricting evaporative cooling.",
        ],
        riskHistory: [23, 30, 37, 44, 51, 58, 65],
        lastUpdate: "13 sec ago"
    },
    {
        id: "16",
        name: "Nagesh",
        watchId: "16",
        status: "safe",
        risk: 26,
        active: true,
        activity: "assembly",
        readings: { heartRate: 92, skinTemp: 36.8, spo2: 98, humidity: 59, ambientTemp: 30 },
        riskReasons: [
            "All vitals within safe baseline.",
            "Hydration and rest breaks on schedule.",
            "No elevated heat-stress indicators detected.",
        ],
        riskHistory: [5, 8, 12, 16, 19, 22, 26],
        lastUpdate: "36 sec ago"
    }
];

// ---------------------------------------------------------------------------
// WATCHES -- one entry per physical device, whether assigned or spare.
// `workerId` is null for unassigned/spare watches.
// ---------------------------------------------------------------------------
const watches = [
    { id: "12", workerId: "12", assignmentStatus: "assigned", connectionStatus: "connected", battery: 82, lastUpdate: "12 sec ago" },
    { id: "27", workerId: "27", assignmentStatus: "assigned", connectionStatus: "connected", battery: 71, lastUpdate: "8 sec ago" },
    { id: "08", workerId: "08", assignmentStatus: "assigned", connectionStatus: "connected", battery: 92, lastUpdate: "5 sec ago" },
    { id: "17", workerId: "17", assignmentStatus: "assigned", connectionStatus: "connected", battery: 64, lastUpdate: "56 sec ago" },
    { id: "06", workerId: "06", assignmentStatus: "assigned", connectionStatus: "connected", battery: 45, lastUpdate: "74 sec ago" },
    { id: "25", workerId: "25", assignmentStatus: "assigned", connectionStatus: "connected", battery: 58, lastUpdate: "79 sec ago" },
    { id: "44", workerId: "44", assignmentStatus: "assigned", connectionStatus: "connected", battery: 77, lastUpdate: "11 sec ago" },
    { id: "43", workerId: "43", assignmentStatus: "assigned", connectionStatus: "connected", battery: 39, lastUpdate: "92 sec ago" },
    { id: "19", workerId: "19", assignmentStatus: "assigned", connectionStatus: "connected", battery: 66, lastUpdate: "85 sec ago" },
    { id: "13", workerId: "13", assignmentStatus: "assigned", connectionStatus: "connected", battery: 51, lastUpdate: "88 sec ago" },
    { id: "18", workerId: "18", assignmentStatus: "assigned", connectionStatus: "offline", battery: 22, lastUpdate: "48 sec ago" },
    { id: "14", workerId: "14", assignmentStatus: "assigned", connectionStatus: "connected", battery: 88, lastUpdate: "66 sec ago" },
    { id: "39", workerId: "39", assignmentStatus: "assigned", connectionStatus: "connected", battery: 73, lastUpdate: "19 sec ago" },
    { id: "40", workerId: "40", assignmentStatus: "assigned", connectionStatus: "offline", battery: 8, lastUpdate: "66 sec ago" },
    { id: "28", workerId: "28", assignmentStatus: "assigned", connectionStatus: "connected", battery: 60, lastUpdate: "54 sec ago" },
    { id: "10", workerId: "10", assignmentStatus: "assigned", connectionStatus: "connected", battery: 95, lastUpdate: "58 sec ago" },
    { id: "01", workerId: "01", assignmentStatus: "assigned", connectionStatus: "connected", battery: 67, lastUpdate: "48 sec ago" },
    { id: "22", workerId: "22", assignmentStatus: "assigned", connectionStatus: "connected", battery: 48, lastUpdate: "13 sec ago" },
    { id: "37", workerId: "37", assignmentStatus: "assigned", connectionStatus: "connected", battery: 81, lastUpdate: "87 sec ago" },
    { id: "15", workerId: "15", assignmentStatus: "assigned", connectionStatus: "connected", battery: 55, lastUpdate: "78 sec ago" },
    { id: "24", workerId: "24", assignmentStatus: "assigned", connectionStatus: "connected", battery: 90, lastUpdate: "3 sec ago" },
    { id: "42", workerId: "42", assignmentStatus: "assigned", connectionStatus: "connected", battery: 63, lastUpdate: "81 sec ago" },
    { id: "36", workerId: "36", assignmentStatus: "assigned", connectionStatus: "connected", battery: 41, lastUpdate: "82 sec ago" },
    { id: "21", workerId: "21", assignmentStatus: "assigned", connectionStatus: "connected", battery: 72, lastUpdate: "53 sec ago" },
    { id: "34", workerId: "34", assignmentStatus: "assigned", connectionStatus: "connected", battery: 84, lastUpdate: "64 sec ago" },
    { id: "31", workerId: "31", assignmentStatus: "assigned", connectionStatus: "connected", battery: 69, lastUpdate: "11 sec ago" },
    { id: "20", workerId: "20", assignmentStatus: "assigned", connectionStatus: "connected", battery: 79, lastUpdate: "17 sec ago" },
    { id: "30", workerId: "30", assignmentStatus: "assigned", connectionStatus: "connected", battery: 13, lastUpdate: "16 sec ago" },
    { id: "09", workerId: "09", assignmentStatus: "assigned", connectionStatus: "connected", battery: 36, lastUpdate: "71 sec ago" },
    { id: "33", workerId: "33", assignmentStatus: "assigned", connectionStatus: "offline", battery: 11, lastUpdate: "12 sec ago" },
    { id: "32", workerId: "32", assignmentStatus: "assigned", connectionStatus: "connected", battery: 57, lastUpdate: "22 sec ago" },
    { id: "35", workerId: "35", assignmentStatus: "assigned", connectionStatus: "connected", battery: 62, lastUpdate: "63 sec ago" },
    { id: "03", workerId: "03", assignmentStatus: "assigned", connectionStatus: "connected", battery: 47, lastUpdate: "62 sec ago" },
    { id: "02", workerId: "02", assignmentStatus: "assigned", connectionStatus: "connected", battery: 53, lastUpdate: "13 sec ago" },
    { id: "16", workerId: "16", assignmentStatus: "assigned", connectionStatus: "connected", battery: 75, lastUpdate: "36 sec ago" },
    { id: "04", workerId: null, assignmentStatus: "available", connectionStatus: "offline", battery: 100, lastUpdate: "—" },
    { id: "05", workerId: null, assignmentStatus: "charging", connectionStatus: "offline", battery: 63, lastUpdate: "—" }
];

// ---------------------------------------------------------------------------
// ALERTS -- incident feed. `status` is "active" until acknowledged/resolved.
// ---------------------------------------------------------------------------
const alerts = [
    { id: "A001", workerId: "12", type: "critical", issue: "Heat Stroke Danger", status: "active", time: "12 sec ago", zone: "Zone 4 (North Foundation Excavation)" },
    { id: "A002", workerId: "27", type: "warning", issue: "Rising Heat Strain", status: "active", time: "8 sec ago", zone: "Zone 2 (Steel Erection)" },
    { id: "A003", workerId: "06", type: "critical", issue: "Heat Stroke Danger", status: "active", time: "74 sec ago", zone: "Zone 4 (North Foundation Excavation)" },
    { id: "A004", workerId: "22", type: "warning", issue: "Rising Heat Strain", status: "active", time: "13 sec ago", zone: "Zone 2 (Steel Erection)" },
    { id: "A005", workerId: "09", type: "warning", issue: "Rising Heat Strain", status: "active", time: "71 sec ago", zone: "Zone 4 (North Foundation Excavation)" },
    { id: "A006", workerId: "32", type: "warning", issue: "Rising Heat Strain", status: "active", time: "22 sec ago", zone: "Zone 3 (Scaffolding)" },
    { id: "A007", workerId: "02", type: "warning", issue: "Rising Heat Strain", status: "active", time: "13 sec ago", zone: "Zone 2 (Steel Erection)" },
    { id: "A008", workerId: "08", type: "resolved", issue: "Hydration Advisory", status: "resolved", time: "42 min ago", zone: "Zone 1 (Assembly)" }
];
