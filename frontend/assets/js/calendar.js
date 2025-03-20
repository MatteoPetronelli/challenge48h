document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    fetch('/planning')
        .then(response => response.json())
        .then(planning => afficherCalendrier(planning, user))
        .catch(error => console.error('Erreur lors du chargement du planning:', error));
});

function afficherCalendrier(planning, user) {
    const calendarContainer = document.getElementById('calendar');

    const moisGroupes = planning.reduce((acc, event) => {
        if (!acc[event.mois]) {
            acc[event.mois] = [];
        }
        acc[event.mois].push(event);
        return acc;
    }, {});

    const ordreMois = [
        "Septembre", "Octobre", "Novembre", "Décembre",
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin"
    ];

    ordreMois.forEach(mois => {
        const events = moisGroupes[mois];
        if (events && events.length > 0) {
            const section = document.createElement('div');
            section.classList.add('col-md-4', 'mb-4');

            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark', 'text-light', 'border-light');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = mois;

            const table = document.createElement('table');
            table.classList.add('table', 'table-dark', 'text-light');
            const tbody = document.createElement('tbody');

            const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
            const daysInMonth = getDaysInMonth(mois);
            let dayCount = 1;
            let tr;

            for (let i = 0; i < daysInMonth.length; i++) {
                if (i % 7 === 0) {
                    tr = document.createElement('tr');
                    tbody.appendChild(tr);
                }

                const td = document.createElement('td');
                td.classList.add('text-center', 'calendar-day');
                td.innerHTML = dayCount;

                const dayEvents = events.filter(event => new Date(event.date).getDate() === dayCount);
                dayEvents.forEach(event => {
                    const div = document.createElement('div');
                    div.classList.add('event');

                    let eventClass = '';
                    if (event.evenement && event.evenement.toLowerCase().includes('gymnase')) {
                        eventClass = 'gymnase';
                    } else if (event.evenement && (event.evenement.toLowerCase().includes('e-sport') || event.evenement.toLowerCase().includes('esport'))) {
                        eventClass = 'event-esport';
                    } else if (event.evenement && event.evenement.toLowerCase().includes('sport')) {
                        eventClass = 'event-sport';
                    }

                    if (eventClass) {
                        div.classList.add(eventClass);
                    }

                    div.textContent = event.evenement;
                    td.appendChild(div);
                });

                tr.appendChild(td);
                dayCount++;
            }

            table.appendChild(tbody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(table);
            card.appendChild(cardBody);
            section.appendChild(card);
            calendarContainer.appendChild(section);
        }
    });
}

function getDaysInMonth(month) {
    const monthDays = {
        "Septembre": 30, "Octobre": 31, "Novembre": 30, "Décembre": 31,
        "Janvier": 31, "Février": 28, "Mars": 31, "Avril": 30,
        "Mai": 31, "Juin": 30
    };
    return Array.from({ length: monthDays[month] }, (_, i) => i + 1);
}
