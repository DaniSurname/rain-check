function updateInfo(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let nameElement = document.querySelector("#name");
  nameElement.innerHTML = searchInput.value;
  //   console.log(searchInput.value);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", updateInfo);
