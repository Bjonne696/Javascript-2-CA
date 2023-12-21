// utils.js

export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export function setToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// Other utility functions as needed...
