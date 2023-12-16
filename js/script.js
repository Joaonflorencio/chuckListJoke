const jokeList = document.getElementById('jokeList')
const fetchJoke = document.getElementById('fetchJoke')

// Función para obtener un chiste de Chuck Norris desde la API
function fetchChuckNorrisJoke() {
  return fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => data.value);
}

// Función para renderizar la lista de chistes en el DOM
function renderJokeList(jokes) {
  jokeList.innerHTML = '';

  jokes.forEach((joke, index) => {
    
    let itemsJoke = `
      <li>
        <p>${joke}</p>
        <button class="deleteBtn" data-index="${index}">Eliminar</button>
      </li>
    `
    jokeList.innerHTML += itemsJoke 
  });
}

// Función para guardar la lista de chistes en localStorage
function saveJokesToLocalStorage(jokes) {
  localStorage.setItem('chuckNorrisJokes', JSON.stringify(jokes));
}

// Función para cargar la lista de chistes desde localStorage
function loadJokesFromLocalStorage() {
  const savedJokes = localStorage.getItem('chuckNorrisJokes');
  console.log(JSON.parse(savedJokes))
  return savedJokes ? JSON.parse(savedJokes) : [];
}


// Manejador de clic en el botón "Obtener Chiste"
fetchJoke.addEventListener('click', () => {
  fetchChuckNorrisJoke().then(joke => {
    const jokes = [...loadJokesFromLocalStorage(), joke];
    renderJokeList(jokes);
    saveJokesToLocalStorage(jokes);
  });
});

// Manejador de clic en los botones de eliminación
jokeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteBtn')) {
    const indexToDelete = event.target.getAttribute('data-index');
    const jokes = loadJokesFromLocalStorage();
    jokes.splice(indexToDelete, 1);
    renderJokeList(jokes);
    saveJokesToLocalStorage(jokes);
  }
});

// Cargar chistes almacenados al cargar la página
renderJokeList(loadJokesFromLocalStorage());