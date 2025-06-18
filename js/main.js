// // Menú móvil
// document.querySelector('.menu-toggle').addEventListener('click', () => {
//     document.querySelector('nav ul').classList.toggle('active');
// });

// // Smooth scrolling para enlaces del menú
// document.querySelectorAll('nav a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// Menú móvil toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav.menu-principal ul');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Smooth scrolling para enlaces del menú principal
document.querySelectorAll('nav.menu-principal a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetID = this.getAttribute('href');

    // Solo aplicar smooth scroll si es un ancla válida (empieza con # y tiene destino)
    if (targetID.startsWith('#') && document.querySelector(targetID)) {
      e.preventDefault();

      // Cerrar menú móvil si está abierto (para mobile UX)
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }

      // Smooth scroll hacia el elemento objetivo
      document.querySelector(targetID).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
