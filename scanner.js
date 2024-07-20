// scanner.js
document.addEventListener('DOMContentLoaded', () => {
    const resultsList = document.getElementById('result-list');
    const counters = {};

    function onScanSuccess(decodedText, decodedResult) {
        if (counters[decodedText]) {
            counters[decodedText]++;
        } else {
            counters[decodedText] = 1;
        }
        updateResults();
    }

    function onScanFailure(error) {
        // Handle scan failure, if necessary
        console.warn(`Scan error: ${error}`);
    }

    function updateResults() {
        resultsList.innerHTML = '';
        for (const [code, count] of Object.entries(counters)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${code}: ${count}`;
            resultsList.appendChild(listItem);
        }
    }

    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.error(`Unable to start scanning, error: ${err}`);
    });
});
