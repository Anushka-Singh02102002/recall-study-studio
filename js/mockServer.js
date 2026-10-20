
export function syncWithServer(data, { signal } = {}) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException("Sync cancelled.", "AbortError"));
            return;
        }

        const delay = 1500;
        const timer = setTimeout(() => {
            signal?.removeEventListener("abort", cancelSync);

            // Simulate occasional server failure.
            if (Math.random() < 0.3) {
                reject(new Error("Server unavailable. Please retry."));
                return;
            }

            resolve({
                success: true,
                message: "Sync completed successfully.",
                syncedCount: Array.isArray(data) ? data.length : 0
            });
        }, delay);

        function cancelSync() {
            clearTimeout(timer);
            reject(new DOMException("Sync cancelled.", "AbortError"));
        }

        signal?.addEventListener("abort", cancelSync, { once: true });
    });
}
