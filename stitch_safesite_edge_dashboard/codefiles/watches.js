const watchTableBody = document.getElementById("watchTableBody");

if (watchTableBody && typeof watches !== "undefined") {
    watchTableBody.innerHTML = "";

    watches.forEach(watch => {
        const row = document.createElement("tr");

        const worker = workers.find(worker => worker.id === watch.workerId);

        const workerName = worker ? worker.name : "—";

        const status =
            watch.assignmentStatus === "assigned"
                ? "Assigned"
                : watch.assignmentStatus === "available"
                ? "Available"
                : "Charging";

        const action =
    watch.assignmentStatus === "assigned"
        ? `<button onclick="window.location.href='worker_details.html?id=${watch.workerId}'">View</button>`
        : watch.assignmentStatus === "available"
        ? `<button class="assignBtn" data-watch="#${watch.id}">Assign</button>`
        : "";

        row.innerHTML = `
            <td class="px-lg py-md">
                #${watch.id}
            </td>

            <td class="px-lg py-md">
                ${workerName}
            </td>

            <td class="px-lg py-md">
                ${status}
            </td>

            <td class="px-lg py-md">
                ${watch.battery}%
            </td>

            <td class="px-lg py-md">
                ${watch.lastUpdate}
            </td>

            <td class="px-lg py-md">
                ${action}
            </td>
        `;

        watchTableBody.appendChild(row);
    });
}
