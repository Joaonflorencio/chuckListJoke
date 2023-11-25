document.addEventListener('DOMContentLoaded', cargarChistes);

document.getElementById('obtener-chiste').addEventListener('click', obtenerChiste);
document.getElementById('eliminar-todos').addEventListener('click', eliminarTodos);

function obtenerChiste() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => agregarChiste(data.value));
}

function agregarChiste(chiste) {
    const lista = document.getElementById('lista-chistes');
    const elemento = document.createElement('li');
    elemento.innerHTML = `${chiste} <button onclick="eliminarChiste(this)">Eliminar</button>`;
    lista.appendChild(elemento);

    guardarChistes();
}

function cargarChistes() {
    const chistes = JSON.parse(localStorage.getItem('chistes')) || [];
    chistes.forEach(chiste => {
        const lista = document.getElementById('lista-chistes');
        const elemento = document.createElement('li');
        elemento.innerHTML = `${chiste} <button onclick="eliminarChiste(this)">Eliminar</button>`;
        lista.appendChild(elemento);
    });
}

function guardarChistes() {
    const chistes = Array.from(document.querySelectorAll('#lista-chistes li'))
                         .map(li => li.textContent.replace('Eliminar', '').trim());
    localStorage.setItem('chistes', JSON.stringify(chistes));
}

function eliminarChiste(boton) {
    const li = boton.parentNode;
    li.parentNode.removeChild(li);
    guardarChistes();
}

function eliminarTodos() {
    localStorage.clear();
    document.getElementById('lista-chistes').innerHTML = '';
}