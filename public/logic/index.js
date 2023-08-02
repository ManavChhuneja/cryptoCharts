const radioButtons = document.querySelectorAll('input[type="radio"]');

// Add an event listener to each radio button
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    // Submit the form when a radio button is selected
    document.getElementById("radioForm").submit();
  });
});

const textInput = document.querySelector('input[type="text"]');

// Load the JSON file
fetch("http://localhost:3000/coinsData")
  .then((response) => response.json())
  .then((data) => {
    const inputElement = document.getElementById("search");
    const suggestionsElement = document.getElementById("suggestions");

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
          const selectedCoin = e.target.innerText;
          fetch("/coins", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // You can add a body if needed
            body: JSON.stringify({ coin: selectedCoin }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response data
              console.log(data);
            });

          suggestionsElement.innerHTML = "";
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

inputElement.addEventListener("blur", () => {
  // Clear and hide the dropdown when the input loses focus
  suggestionsElement.innerHTML = "";
  suggestionsElement.style.display = "none";
});

////////////////////////////////////////////////////////////////////
