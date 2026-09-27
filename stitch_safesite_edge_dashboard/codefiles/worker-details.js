const params = new URLSearchParams(window.location.search);
const workerId = params.get("id");

const worker = workers.find(worker => worker.id === workerId);

const tableView = document.getElementById("workers-table-view");
const detailView = document.getElementById("worker-detail-view");

if (worker) {
    tableView.classList.add("hidden");
    detailView.classList.remove("hidden");

    document.getElementById("worker-name").textContent =
        `${worker.name} (Watch #${worker.watchId})`;

    document.getElementById("risk-reasons-heading").textContent =
        `Why is ${worker.name} at risk?`;

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
} else {
    // No valid worker id in the URL — this is the plain "Workers" landing
    // page (e.g. from the sidebar nav), so show the full workers table
    // instead of an empty/data-less detail view.
    detailView.classList.add("hidden");
    tableView.classList.remove("hidden");

    const STATUS_LABELS = {
        critical: "Critical",
        warning: "Need Attention",
        safe: "Safe"
    };

    const statusConfig = {
        critical: { color: "text-error", bg: "bg-error-container", icon: "error" },
        warning: { color: "text-tertiary", bg: "bg-tertiary-container/20", icon: "warning" },
        safe: { color: "text-primary", bg: "bg-primary-container/10", icon: "check_circle" }
    };

    const tbody = document.getElementById("workers-table-body");

    tbody.innerHTML = workers.map(w => `
        <tr class="hover:bg-surface-container/50 transition-colors cursor-pointer group" onclick="window.location.href='worker_details.html?id=${w.id}'">
            <td class="p-4 py-4">
                <div class="flex items-center gap-sm">
                    <div class="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-label-md text-label-md text-on-surface-variant">
                        ${w.name.charAt(0)}
                    </div>
                    <span class="font-label-md text-label-md group-hover:text-primary transition-colors">${w.name}</span>
                </div>
            </td>
            <td class="p-4 font-body-md text-on-surface-variant">#${w.watchId}</td>
            <td class="p-4">
                <div class="inline-flex items-center gap-xs px-2 py-1 rounded-full ${statusConfig[w.status].bg}">
                    <span class="material-symbols-outlined text-[14px] ${statusConfig[w.status].color}" style="font-variation-settings: 'FILL' 1;">${statusConfig[w.status].icon}</span>
                    <span class="font-label-sm text-label-sm ${statusConfig[w.status].color}">${STATUS_LABELS[w.status]}</span>
                </div>
            </td>
            <td class="p-4">
                <div class="flex items-center gap-sm">
                    <span class="font-body-md w-8">${w.risk}</span>
                    <div class="flex-1 h-1.5 bg-surface-container rounded-full max-w-[100px] overflow-hidden">
                        <div class="h-full rounded-full ${w.risk > 80 ? 'bg-error' : w.risk > 50 ? 'bg-tertiary' : 'bg-primary'}" style="width: ${w.risk}%"></div>
                    </div>
                </div>
            </td>
            <td class="p-4 font-body-md text-on-surface-variant">${w.lastUpdate}</td>
            <td class="p-4 text-right">
                <button class="h-10 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-label-md text-label-md transition-colors" onclick="event.stopPropagation(); window.location.href='worker_details.html?id=${w.id}'">View</button>
            </td>
        </tr>
    `).join('');
}
