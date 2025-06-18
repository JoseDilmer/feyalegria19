document.addEventListener('DOMContentLoaded', () => {
    const daysContainer = document.getElementById('days');
    const monthYear = document.getElementById('month-year');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYear.textContent = `${new Date(year, month).toLocaleString('es', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        daysContainer.innerHTML = '';

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += `<div class="empty"></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysContainer.innerHTML += `<div>${i}</div>`;
        }
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});