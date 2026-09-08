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

    const riskReasons = document.getElementById("risk-reasons");

    worker.riskReasons.forEach(reason => {
    const li = document.createElement("li");

    li.className = "flex items-start gap-sm";

    li.innerHTML = `
        <span class="material-symbols-outlined text-error text-[18px] mt-0.5">
            warning
        </span>
        <span class="font-body-md text-body-md text-on-surface">
            ${reason}
        </span>
    `;

    riskReasons.appendChild(li);
});
    const trendPath = document.getElementById("risk-trend-path");
    const trendPoint = document.getElementById("risk-trend-point");

    const history = worker.riskHistory;

    const points = history.map((score, index) => {
        const x = (index / (history.length - 1)) * 100;
        const y = 90 - (score / 100) * 75;

        return { x, y };
    });

    const pathData = points
        .map((point, index) =>
            `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
        )
        .join(" ");

    trendPath.setAttribute("d", pathData);

    const lastPoint = points[points.length - 1];

    trendPoint.setAttribute("cx", lastPoint.x);
    trendPoint.setAttribute("cy", lastPoint.y);
}
