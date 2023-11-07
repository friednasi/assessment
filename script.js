function loadCSV(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0]).then(content => {
            const data = parseCSV(content);
            createTable(data, 'csvTableDiv');
            calculateSummary(data);
        }).catch(error => console.log(error));
    }
}

function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

function parseCSV(text) {
    const lines = text.split(/\r\n|\n/);
    const data = lines.map(line => line.split(','));
    return data;
}

function createTable(data, elementId) {
    const table = document.createElement('table');
    table.className = 'csvTable';
    data.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    document.getElementById(elementId).innerHTML = '';
    document.getElementById(elementId).appendChild(table);
}

function calculateSummary(data) {
    // Assuming the first row is the header and actual data starts from the second row
    // and also assuming the first column in CSV is 'A', second is 'B', etc.
    const alphaValue = getValue(data, 5, 1) + getValue(data, 20, 1);
    const betaValue = getValue(data, 15, 1) / getValue(data, 7, 1);
    const charlieValue = getValue(data, 13, 1) * getValue(data, 12, 1);

    document.getElementById('alphaValue').textContent = isNaN(alphaValue) ? 'Error' : alphaValue;
    document.getElementById('betaValue').textContent = isNaN(betaValue) ? 'Error' : betaValue;
    document.getElementById('charlieValue').textContent = isNaN(charlieValue) ? 'Error' : charlieValue;
}

function getValue(data, row, column) {
    // Adjust for zero-based index; assuming the first row is headers
    if (data.length > row && data[row].length > column) {
        return parseInt(data[row][column], 10);
    }
    return NaN; // Return Not-a-Number if the cell is not available
}
