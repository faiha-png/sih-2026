const params = new URLSearchParams(window.location.search);
const workerId = params.get("id");

const worker = workers.find(worker => worker.id === workerId);

if (worker) {
    document.getElementById("worker-name").textContent =
        `${worker.name} (Watch #${worker.watchId})`;

    document.getElementById("risk-score").textContent = worker.risk;
}
