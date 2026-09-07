const params = new URLSearchParams(window.location.search);
const workerId = params.get("id");

const worker = workers.find(worker => worker.id === workerId);

if (worker) {
    document.getElementById("worker-name").textContent =
        `${worker.name} (Watch #${worker.watchId})`;

    document.getElementById("risk-score").textContent = worker.risk;

    document.getElementById("worker-status").textContent =
        worker.status === "critical"
            ? "Critical Status"
            : worker.status === "warning"
            ? "Need Attention"
            : "Safe";
    document.getElementById("worker-activity").textContent =
    worker.activity;
    document.getElementById("heart-rate").textContent =
    worker.readings.heartRate;
    document.getElementById("skin-temp").textContent =
    worker.readings.skinTemp + "°";
    document.getElementById("spo2").textContent =
    worker.readings.spo2 + "%";

    document.getElementById("humidity").textContent =
    worker.readings.humidity + "%";

    document.getElementById("ambient-temp").textContent =
    worker.readings.ambientTemp + "°";
}
