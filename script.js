
async function fetchSingleTodo() {
  const id = document.getElementById("todoId").value;
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${data.id}</td>
          <td>${data.title}</td>
          <td>${data.completed ? "Yes" : "No"}</td>
        </tr>
      </tbody>
    </table>
  `;
}

async function fetchRangeTodos() {
  const rangeInput = document.getElementById("rangeInput").value;
  const resultDiv = document.getElementById("result");
  const [start, end] = rangeInput.split("-").map(Number);

  if (isNaN(start) || isNaN(end) || start < 1 || end > 200 || start > end) {
    resultDiv.innerHTML = "<p>Please enter a valid range (e.g., 5-10, max 200)</p>";
    return;
  }

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = start; i <= end; i++) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
    const data = await res.json();
    tableHTML += `
      <tr>
        <td>${data.id}</td>
        <td>${data.title}</td>
        <td>${data.completed ? "Yes" : "No"}</td>
      </tr>
    `;
  }

  tableHTML += `</tbody></table>`;
  resultDiv.innerHTML = tableHTML;
}
