// header.js
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    console.log(`Searching for: ${searchInput.value}`);
});
