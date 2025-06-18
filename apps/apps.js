// Funcionalidad de filtrado
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterApps();
    });
});

// Funcionalidad de búsqueda
document.getElementById('search-btn').addEventListener('click', filterApps);
document.getElementById('search-input').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filterApps();
});

function filterApps() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    const apps = document.querySelectorAll('.app-card');
    let visibleApps = 0;
    
    apps.forEach(app => {
        const matchesSearch = app.dataset.search.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'todas' || 
                        app.dataset.categories.includes(activeCategory);
        
        if (matchesSearch && matchesCategory) {
            app.style.display = 'block';
            visibleApps++;
        } else {
            app.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    document.querySelector('.no-results').style.display = visibleApps === 0 ? 'block' : 'none';
}

// Mostrar/ocultar detalles
document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', function() {
        const details = this.closest('.app-card').querySelector('.app-details');
        details.classList.toggle('active');
        this.innerHTML = details.classList.contains('active') ? 
            '<i class="fas fa-times-circle"></i> Ocultar detalles' : 
            '<i class="fas fa-info-circle"></i> Ver detalles';
    });
});

// Ocultar mensaje "no results" al inicio
document.querySelector('.no-results').style.display = 'none';

// Tema oscuro/claro - Implementación unificada y mejorada
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 1. Verificar localStorage primero
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } 
    // 2. Si no hay preferencia guardada, verificar preferencia del sistema
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'true');
    }
    
    // Listener para cambiar tema
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDark);
    });
});

// Exportar a PDF - Implementación unificada
document.getElementById('exportPdf').addEventListener('click', function() {
    const element = document.querySelector('.aplicaciones');
    const btn = this;
    const originalText = btn.innerHTML;
    
    // Configuración PDF
    const opt = {
        margin: 10,
        filename: 'recursos-educativos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
    
    // Mostrar indicador de carga
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
    btn.disabled = true;
    
    // Generar PDF
    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
});

