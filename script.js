let storage = 85.4;
let selectedGames = [];
let totalStorage = 0.00;

// Button Space Left
document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);

// Button Reset
document.getElementById('clear').addEventListener('click', function() {
  selectedGames = [];
  totalStorage = 0;
  document.querySelectorAll('.game button').forEach(function(button) {
    button.textContent = 'Select';
    button.classList.remove('remove');
  });
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
  updateSelectedGames();
});

// Button Track
document.getElementById('track').addEventListener('click', function() {
  alert(`You have ${storage - totalStorage} GB of storage left.`);
});

// Function to handle game selection (for both button and image clicks)
function selectGame(element) {
  let button;
  if (element.tagName === 'DIV') {
    // If the element is the image container, find the corresponding button
    button = element.parentNode.querySelector('.select');
  } else {
    // If the element is the button itself
    button = element;
  }

  let game = button.parentNode.parentNode;
  let storageInfo = game.querySelector('.info p:nth-child(2)').textContent;
  let storageValue = parseFloat(storageInfo.split(' ')[1]);

  if (button.textContent === 'Select') {
    // Check if there's enough storage left
    if (totalStorage + storageValue > storage) {
      alert("Not enough storage to add this game!");
    } else {
      // Add the game to the selectedGames array
      selectedGames.push(game);
      totalStorage += storageValue;
      button.textContent = 'Remove';
      button.classList.add('remove');

      // Open the sidebar if it's the first game
      if (selectedGames.length === 1) {
        toggleSidebar();
      }
    }
  } else {
    // Remove the game
    selectedGames.splice(selectedGames.indexOf(game), 1);
    totalStorage -= storageValue;
    button.textContent = 'Select';
    button.classList.remove('remove');
  }

  // Update the space left display
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);

  // Update the selected games list in the sidebar
  updateSelectedGames();
}
// Function to toggle the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  sidebar.classList.toggle('open');

  // Hide the hamburger menu when the sidebar is open
  if (sidebar.classList.contains('open')) {
    hamburgerMenu.classList.add('hidden');
  } else {
    hamburgerMenu.classList.remove('hidden');
  }
}

// Function to update the selected games list in the sidebar
function updateSelectedGames() {
  const selectedGamesList = document.getElementById('selected-games-list');
  selectedGamesList.innerHTML = ''; // Clear the list

  selectedGames.forEach((game, index) => {
    const gameName = game.querySelector('.info p:nth-child(1)').textContent;
    const gameSize = game.querySelector('.info p:nth-child(2)').textContent;
    const gameImage = game.querySelector('img').src; // Get the game image URL

    // Create a list item for the selected game
    const li = document.createElement('div');
    li.className = 'selected-game-item';
    li.innerHTML = `
      <img src="${gameImage}" alt="${gameName}" class="sidebar-game-image">
      <span>${gameName} (${gameSize})</span>
      <button onclick="removeGame(${index})">×</button>
    `;
    selectedGamesList.appendChild(li);
  });
}

// Function to remove a game
function removeGame(index) {
  const game = selectedGames[index];
  const storageInfo = game.querySelector('.info p:nth-child(2)').textContent;
  const storageValue = parseFloat(storageInfo.split(' ')[1]);

  // Update the total storage
  totalStorage -= storageValue;

  // Remove the game from the selectedGames array
  selectedGames.splice(index, 1);

  // Update the button in the main list
  const button = game.querySelector('.select');
  button.textContent = 'Select';
  button.classList.remove('remove');

  // Update the space left display
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);

  // Update the selected games list in the sidebar
  updateSelectedGames();
}

// WhatsApp Button
document.getElementById('sendWhatsApp').addEventListener('click', function() {
  if (selectedGames.length === 0) {
    alert("Please select at least one game to share.");
    return;
  }

  let message = "Selected Games for PS4:\n";
  let gameInfoArray = selectedGames.map((game) => {
    let gameName = game.querySelector('.info p:nth-child(1)').textContent;
    let gameSize = game.querySelector('.info p:nth-child(2)').textContent;
    return { name: gameName, size: gameSize };
  });
  
  gameInfoArray.sort((a, b) => a.name.localeCompare(b.name));
  
  gameInfoArray.forEach((game, index) => {
    message += `${index + 1}. ${game.name} (${game.size})\n`;
  });

  message += `\nTotal Storage Used: ${totalStorage.toFixed(2)} GB\n`;
  message += `Space Left: ${(storage - totalStorage).toFixed(2)} GB`;

  // Use the specific WhatsApp number
  let phoneNumber = "+96181200339";
  let whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
});

// Storage Change Functions
function changeStorageTo500gb() {
  selectedGames = [];
  storage = 85.4;
  totalStorage = 0;
  document.querySelectorAll('.game button').forEach(function(button) {
    button.textContent = 'Select';
    button.classList.remove('remove');
  });
  document.getElementById("500gb").style.backgroundColor = "#c2fbd7";
  document.getElementById("1tb").style.backgroundColor = "white";
  document.getElementById("2tb").style.backgroundColor = "white";
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
  updateSelectedGames();
}

function changeStorageTo1tb() {
  selectedGames = [];
  storage = 197.6;
  totalStorage = 0;
  document.querySelectorAll('.game button').forEach(function(button) {
    button.textContent = 'Select';
    button.classList.remove('remove');
  });
  document.getElementById("500gb").style.backgroundColor = "white";
  document.getElementById("1tb").style.backgroundColor = "#c2fbd7";
  document.getElementById("2tb").style.backgroundColor = "white";
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
  updateSelectedGames();
}

function changeStorageTo2tb() {
  selectedGames = [];
  storage = 512.00;
  totalStorage = 0;
  document.querySelectorAll('.game button').forEach(function(button) {
    button.textContent = 'Select';
    button.classList.remove('remove');
  });
  document.getElementById("500gb").style.backgroundColor = "white";
  document.getElementById("1tb").style.backgroundColor = "white";
  document.getElementById("2tb").style.backgroundColor = "#c2fbd7";
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
  updateSelectedGames();
}

// Show the storage selection modal when the page loads
window.onload = function() {
  const modal = document.getElementById('storageModal');
  modal.style.display = 'flex'; // Show the modal
};

// Function to handle storage selection
function selectStorage(selectedStorage) {
  const modal = document.getElementById('storageModal');
  modal.style.display = 'none'; // Hide the modal

  // Set the storage based on the selected option
  if (selectedStorage === 128) {
    changeStorageTo500gb();
  } else if (selectedStorage === 256) {
    changeStorageTo1tb();
  } else if (selectedStorage === 512) {
    changeStorageTo2tb();
  }
}


// Smart Search Function (by name OR max storage filter)
document.getElementById('searchBar').addEventListener('keyup', function() {
  let query = this.value.toLowerCase().trim();
  let games = document.querySelectorAll('.game');

  // If search bar is empty → show all games
  if (query === "") {
    games.forEach(function(game) {
      game.style.display = "inline-block";
    });
    return; // stop here
  }

const searchBar = document.getElementById('searchBar');
const clearBtn = document.getElementById('clearSearch');

// Show/hide X when typing
searchBar.addEventListener('input', function() {
  clearBtn.style.display = this.value.length ? 'block' : 'none';
});

// Clear search when clicking X
clearBtn.addEventListener('click', function() {
  searchBar.value = "";
  clearBtn.style.display = 'none';

  // trigger search reset
  searchBar.dispatchEvent(new Event('keyup'));
});

  games.forEach(function(game) {
    let gameName = game.querySelector('.info p:nth-child(1)').textContent.toLowerCase();
    let storageInfo = game.querySelector('.info p:nth-child(2)').textContent.toLowerCase();
    let storageValue = parseFloat(storageInfo.split(" ")[1]); // numeric storage size

    let match = false;

    // If user types text, match by game name
    if (isNaN(query)) {
      if (gameName.includes(query)) {
        match = true;
      }
    }
    // If user types a number, match all games <= that number
    else {
      let numberQuery = parseFloat(query);
      if (!isNaN(storageValue) && storageValue <= numberQuery) {
        match = true;
      }
    }

    game.style.display = match ? "inline-block" : "none";
  });
});

// Below code is used to hide the preloader screen

window.addEventListener("load", function() {
  document.getElementById("preloader").style.display = "none";
});
