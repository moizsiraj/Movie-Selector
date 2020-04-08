const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat");
const movieSelector = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");
let ticketCost = +movieSelector.value;

function updateCountTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const totalSelectedSeats = selectedSeats.length;
  let totalCost = totalSelectedSeats * ticketCost;
  count.innerText = totalSelectedSeats;
  total.innerText = totalCost;
}

movieSelector.addEventListener("change", function (e) {
  ticketCost = +e.target.value;
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
