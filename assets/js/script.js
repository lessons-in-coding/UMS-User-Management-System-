// Get DOM elements
const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const userListSection = document.getElementById("userListSection");
const userFormSection = document.getElementById("userFormSection");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addUserBtn = document.getElementById("addUserBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Load users from localStorage on page load
let users = JSON.parse(localStorage.getItem("users")) || [];
window.addEventListener("load", function () {
  displayUsers(users);
});

// Event Listener for Adding New User
addUserBtn.addEventListener("click", function () {
  userListSection.classList.add("hidden");
  userFormSection.classList.remove("hidden");
});

// Event Listener for Canceling the Form
cancelBtn.addEventListener("click", function () {
  userFormSection.classList.add("hidden");
  userListSection.classList.remove("hidden");
});

// Form Submission Handler
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    birthPlace: document.getElementById("birthPlace").value,
    id: document.getElementById("id").value,
    fatherName: document.getElementById("fatherName").value,
    motherName: document.getElementById("motherName").value,
    highestEducation: document.getElementById("highestEducation").value,
    certifications: document.getElementById("certifications").value,
    projects: document.getElementById("projects").value,
    skills: document.getElementById("skills").value,
    previousPlaces: document.getElementById("previousPlaces").value,
    newPlace: document.getElementById("newPlace").value,
    arrivalDate: document.getElementById("arrivalDate").value,
    reason: document.getElementById("reason").value,
    currentPosition: document.getElementById("currentPosition").value,
    previousPositions: document.getElementById("previousPositions").value,
    higherOrdination: document.getElementById("higherOrdination").value,
    noviceOrdination: document.getElementById("noviceOrdination").value,
    instructorName: document.getElementById("instructorName").value,
    supervisorName: document.getElementById("supervisorName").value,
    ordinationPlace: document.getElementById("ordinationPlace").value,
    supportedMonks: document.getElementById("supportedMonks").value,
    monkhoodTime: document.getElementById("monkhoodTime").value,
    supporterNames: document.getElementById("supporterNames").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    github: document.getElementById("github").value,
    image: document.getElementById("userImage").files[0]?.name || "No image",
    memo: document.getElementById("socialRate").value,
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers(users);
  form.reset();
  userFormSection.classList.add("hidden");
  userListSection.classList.remove("hidden");
});

// Function to display users in the list
function displayUsers(usersToDisplay) {
  userList.innerHTML = ""; // Clear the list first
  usersToDisplay.forEach((user) => {
    const li = document.createElement("li");
    // const span = document.createElement("span");
    li.textContent = user.name;
    li.addEventListener("click", () => {
      // Store the selected user's details in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // Open the user details in a new tab
      window.open("./assets/public/userDetails.html", "_blank");
    });
    userList.appendChild(li);
  });
}

// Function to filter and display users based on the search input
function filterUsers() {
  const searchText = searchInput.value.toLowerCase();
  if (searchText) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText)
    );
    displayUsers(filteredUsers);
  } else {
    displayUsers(users); // Show all users when search input is cleared
  }
}

// Event listener for search button click
searchBtn.addEventListener("click", filterUsers);

// Event listener for Enter key press in the search input
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    filterUsers();
  }
});

// Event listener to show all users when search input is cleared
searchInput.addEventListener("input", () => {
  if (!searchInput.value) {
    displayUsers(users);
  }
});
