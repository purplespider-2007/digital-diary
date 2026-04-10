// 🔐 Check login
if (localStorage.getItem("auth") !== "true") {
  window.location.href = "login.html";
}

// ➕ Add Entry
function addEntry() {
  const title = document.getElementById("title").value;
  const text = document.getElementById("entry").value;
  const mood = document.getElementById("mood").value;
  const date = new Date().toLocaleString();

  const entry = { title, text, mood, date };

  let entries = JSON.parse(localStorage.getItem("diary")) || [];
  entries.push(entry);

  localStorage.setItem("diary", JSON.stringify(entries));
  displayEntries();
}

// 📄 Display Entries
function displayEntries() {
  const container = document.getElementById("entries");
  container.innerHTML = "";

  let entries = JSON.parse(localStorage.getItem("diary")) || [];

  entries.forEach((e, index) => {
    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <h3>${e.title}</h3>
      <p>${e.text}</p>
      <small>${e.mood} | ${e.date}</small><br><br>
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

// ✏️ Edit Entry
function editEntry(index) {
  let entries = JSON.parse(localStorage.getItem("diary"));

  document.getElementById("title").value = entries[index].title;
  document.getElementById("entry").value = entries[index].text;

  entries.splice(index, 1);
  localStorage.setItem("diary", JSON.stringify(entries));

  displayEntries();
}

// ❌ Delete Entry
function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem("diary"));

  entries.splice(index, 1);
  localStorage.setItem("diary", JSON.stringify(entries));

  displayEntries();
}

// 🌙 Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Load entries on start
displayEntries();
