document.getElementById("Start-button").addEventListener("click", function() {
  document.getElementsByClassName("log-in-pop-up")[0].classList.add("active");
  });

function computeFiniteDifferenceDerivative(f, xi, h, order, method) {
    const parser = math.parser();
    parser.evaluate('f(x) = ' + f);
  
    let derivative = 0;
    for (let i = 0; i < order; i++) {
      if (method === 'forward') {
        derivative = (parser.evaluate('f(' + (xi + h) + ')') - parser.evaluate('f(' + xi + ')')) / h;
      } else if (method === 'backward') {
        derivative = (parser.evaluate('f(' + xi + ')') - parser.evaluate('f(' + (xi - h) + ')')) / h;
      } else if (method === 'centered') {
        derivative = (parser.evaluate('f(' + (xi + h) + ')') - parser.evaluate('f(' + (xi - h) + ')')) / (2 * h);
      }
      xi += h;
    }
  
    return derivative;
  }
  
  function computeDerivative(order) {
    const functionInput = document.getElementById('functionInput').value;
    const xInput = parseFloat(document.getElementById('xInput').value);
    const hInput = parseFloat(document.getElementById('hInput').value);
    const methodInput = document.getElementById('methodInput').value;
  
    clearTable();
  
    const derivative = computeFiniteDifferenceDerivative(functionInput, xInput, hInput, order, methodInput);
  
    const resultsTable = document.getElementById('resultsTable');
    const newRow = resultsTable.insertRow();
    newRow.innerHTML = `
      <td>${getDerivativeName(order)}</td>
      <td>${derivative}</td>
    `;
  }
  
  function computeAllDerivatives() {
    const functionInput = document.getElementById('functionInput').value;
    const xInput = parseFloat(document.getElementById('xInput').value);
    const hInput = parseFloat(document.getElementById('hInput').value);
    const methodInput = document.getElementById('methodInput').value;
  
    clearTable();
  
    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = `
      <tr>
        <th>Derivative</th>
        <th>Value</th>
      </tr>
    `;
  
    for (let i = 1; i <= 4; i++) {
      const derivative = computeFiniteDifferenceDerivative(functionInput, xInput, hInput, i, methodInput);
  
      const newRow = resultsTable.insertRow();
      newRow.innerHTML = `
        <td>${getDerivativeName(i)}</td>
        <td>${derivative}</td>
      `;
    }
  }
  
  function clearTable() {
    const resultsTable = document.getElementById('resultsTable');
    const rowCount = resultsTable.rows.length;
  
    // Start from the last row and remove each row one by one
    for (let i = rowCount - 1; i > 0; i--) {
      resultsTable.deleteRow(i);
    }
  }
  
  

  
  function getDerivativeName(order) {
    return order === 1 ? 'First Derivative' :
           order === 2 ? 'Second Derivative' :
           order === 3 ? 'Third Derivative' :
           order === 4 ? 'Fourth Derivative' :
           '';
  }
  