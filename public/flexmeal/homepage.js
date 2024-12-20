// homepage.js

// Menambahkan efek scroll animasi sederhana
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#5a8b2e';
        navbar.style.transition = 'background-color 0.3s ease';
    } else {
        navbar.style.backgroundColor = '#88c534';
    }
});

// Pesan selamat datang di console
console.log("Selamat Datang di FlexMeal - Website Informasi Makanan Sehat!");
