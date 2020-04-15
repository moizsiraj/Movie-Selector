const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat");
const movieSelector = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");
let ticketCost = +movieSelector.value;

populateUI();

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("movieSelected", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

function updateCountTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const totalSelectedSeats = selectedSeats.length;
  let totalCost = totalSelectedSeats * ticketCost;
  count.innerText = totalSelectedSeats;
  total.innerText = totalCost;

  const seatIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
}

movieSelector.addEventListener("change", function (e) {
  ticketCost = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCountTotal();
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountTotal();
  }
});

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovie = localStorage.getItem("movieSelected");
  if (selectedMovie !== null) {
    movieSelector.selectedIndex = selectedMovie;
  }

  const moviePrice = localStorage.getItem("moviePrice");
  if (moviePrice !== null) {
    ticketCost = moviePrice;
  }
}

updateCountTotal();
