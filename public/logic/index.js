const coinForm = document.getElementById("coinForm");
const radioForm = document.getElementById("radioForm");
const inputElement = document.querySelector("#search");
const textInput = document.querySelector('input[type="text"]');
const suggestionsElement = document.getElementById("suggestions");

// Load the JSON file
fetch("http://localhost:3000/coinsData")
  .then((response) => response.json())
  .then((data) => {
    // const suggestionsElement = document.getElementById("suggestions");
    // Add event listener for input changes
    inputElement.addEventListener("input", (e) => {
      const value = e.target.value;
      suggestionsElement.innerHTML = ""; // Clear previous suggestions

      // Filter the objects based on the input value
      const filtered = data
        .filter((item) => item.asset_id.startsWith(value.toUpperCase()))
        .slice(0, 5); // Only take the top 5

      // Create suggestions based on filtered data
      filtered.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item.asset_id;
        suggestionsElement.appendChild(div);
        div.classList.add("suggestion-hover");
        div.addEventListener("click", (e) => {
          inputElement.value = e.target.innerText;
          coinForm.dispatchEvent(new Event("submit"));
          suggestionsElement.innerHTML = "";
          inputElement.value = "";
          suggestionsElement.style.display = "none";
        });
      });

      // Show or hide the suggestions dropdown
      if (filtered.length > 0) {
        suggestionsElement.style.display = "block";
      } else {
        suggestionsElement.style.display = "none";
      }
    });
  });

////////////////////////////////////////////////////////////////////

function updateChart(lookback, coin) {
  window.location.href = `http://localhost:3000/?lookback=${lookback}&coin=${coin}`;
}

coinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const coin = inputElement.value;
  sessionStorage.setItem("coin", coin);
  const lookback = "7";
  inputElement.value = "";
  updateChart(lookback, coin);
});

radioForm.addEventListener("change", (e) => {
  e.preventDefault();
  const coin = sessionStorage.getItem("coin") || "BTC";
  const lookback = radioForm.querySelector(
    'input[name="option"]:checked'
  ).value;
  updateChart(lookback, coin);
});

radioForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.querySelector(".burger-menu").addEventListener("click", function () {
  var menu = document.querySelector(".radio-group");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});
