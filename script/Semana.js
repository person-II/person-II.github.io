document.addEventListener('DOMContentLoaded', function() {
    
    // Function to get Monday of the current week
    function getMonday(d) {
        d = new Date(d);
        const day = d.getDay(); // 0 (Sun) to 6 (Sat)
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(d.setDate(diff));
    }

    // Get today's date and the Monday of the current week
    const today = new Date();
    const monday = getMonday(today);

    // Select all day and weekday elements within the calendar
    const dayElements = document.querySelectorAll('.calendar .day');
    const weekdayElements = document.querySelectorAll('.calendar .weekday');

    // Iterate through each day and set the correct date
    dayElements.forEach((dayElem, index) => {
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + index);
        const date = currentDate.getDate();
        dayElem.textContent = date;

        // Check if the currentDate is today
        if (
            currentDate.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getDate() === today.getDate()
        ) {
            // Add 'today' classes to highlight the current day
            const weekdayElem = weekdayElements[index];
            weekdayElem.classList.add('today');
            dayElem.classList.add('today2');
        }
    });



    let mainNodeHTML = localStorage.getItem('mainNodeHTML');

    // crio uma div que nem aparece e temporaria para serializar a string html
    tempDiv = document.createElement('div');
    tempDiv.innerHTML = mainNodeHTML;
    
    // extraio o node main
    let mainNode = tempDiv.firstElementChild;
    titulo_hoje = mainNode.querySelector('h1')
    data_hoje = mainNode.querySelector('p')
    titulo_hoje.remove() // tiro info q nao quero
    data_hoje.remove()
    
    weekdays = document.querySelectorAll('.day-week')
    for (weekday of weekdays) { // para cada dia da semana clono o node main e 
        //coloco ele como conteudo da section
        clone = mainNode.cloneNode(true) // true acho q faz deepcopy
        weekday.appendChild(clone);   
    }

    btns = document.querySelectorAll('.button-check')
    for (btn of btns) {
        // btn.disabled = true
        btn.remove()
    }

    // handle detalhes
    btns_detalhes = document.querySelectorAll('.button-detalhes')
    for (btn_detalhe of btns_detalhes) {
        btn_detalhe.addEventListener('click', function(event) {
            t = event.currentTarget
            arrow_icon = t.querySelector('img')
            src = arrow_icon.src

            if (src.endsWith('/img/icone-double_arrowDown.png')) {
                arrow_icon.src = '/img/icone-double_arrowUp.png'
                // t.style.height = '18rem' 
                // no momento ele muda de height automatico, mas fode a transição

                collectedInfo = t.querySelector('.collected-info')
                bula = t.querySelector('.bula')
                collectedInfo.classList.remove('hidden')
                bula.classList.remove('hidden')

            } else {
                arrow_icon.src = '/img/icone-double_arrowDown.png'
                // t.style.height = '2.2rem'

                collectedInfo.classList.add('hidden')
                bula.classList.add('hidden')
            }
        })
    }
})