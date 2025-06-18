// Lightbox para galería
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.close').addEventListener('click', () => {
            lightbox.remove();
        });
    });
});