document.addEventListener('DOMContentLoaded', function() {

    // funcao pra pegar data de hoje (nao fiz, peguei pronta)
    function getFormattedDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear(); 
        return `${day}/${month}/${year}`
    }

    todayDateElement = document.querySelector('.data-hoje')
    todayDateElement.innerHTML = getFormattedDate()

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

    

    let placeholderData1 = {
        'Nome': 'Omeprazol',
        "Concentracao": '10mg',
        "Horario": '9:00',
        'Tipo': 'Cápsula',
        'Data Inicio': '4 de Novembro',
        'Data Final': '20 de Dezembro',
        'Frequencia': 'TODOS OS DIAS',
        'approval': true
    }
    let placeholderData2 = JSON.parse(JSON.stringify(placeholderData1)) // cria deepcopy
    // se so nomear nova var e falar q eh igual a outra referencia, nao cria copia, msm coisa q python
    // tem shallow e deep copy. esse metodo eh deep. para criar shallow copy é o abaixo:
    // const originalObject = { key: 'value' };
    // const shallowCopy = { ...originalObject };


    placeholderData2['Nome'] = 'GH'
    placeholderData2['Tipo'] = 'Injeção'
    
    let placeholderData3 = JSON.parse(JSON.stringify(placeholderData1))
    placeholderData3['Nome'] = 'PredSim'
    placeholderData3['Tipo'] = 'Comprimido'
    placeholderData3['Horario'] = '14:00'
    
    let placeholderData4 = JSON.parse(JSON.stringify(placeholderData1))
    placeholderData4['Nome'] = 'Vitamina K'
    placeholderData4['Tipo'] = 'Conta-Gotas'
    placeholderData4['Horario'] = '21:00'

    let placeholders = [placeholderData1, placeholderData2, placeholderData3, placeholderData4]
    for (let i = 1; i <= placeholders.length; i++) {
        let placeholder = placeholders[i - 1]
        let key = 'Placeholder' + i
        localStorage.setItem(key, JSON.stringify(placeholder))
    }

    let iterations = 1
    while (iterations <= 2) {

            // iterar sobre todos os dados salvos e load os elementos ja criados previamente
            for(let i = 1; i <= localStorage.length; i++) { // vai aumentando de i ate o final 
                                                            //(i++ aumenta 1 mas retorna valor antes do update)
                
                let key; // let define um key novo p/ cada iter e é limitado a scope do for loop
                // tenho q definir esse key antes do if ja que eh block scoped, se nao ia ficar "preso" no if
                if (iterations == 1) {
                    key = 'Placeholder' + i
                } else if (iterations == 2) {
                    key = `NewMed Data ${i}`;      
                }                                        
                let StoredData = localStorage.getItem(key);
                // faz isso e essa checagem abaixo porque ele ta iterating through todo o localStorage 
                // e tem outras chaves de outras coisas ai checa pra ver se essa chave tem um valor 
                //que é a minha data que quero pegar. o index pode da pal, por isso checa.
        
                if (StoredData) {
                    let data = JSON.parse(StoredData); // tem q usar o parse pq nao da pra guardar obj no localstorage 
                                                //ent guarda em forma de string o obj e extrai ele para dado de novo para ler
                    let approval = data['approval'];
        
                    if (approval) {
                        BuildPage(data)
                    }
                }
            } 
            iterations += 1
    }

    btns_check = document.querySelectorAll('.button-check')
    // transforma em array para acessar index depois
    btns_check_array = Array.from(btns_check)

    // carregar checks da info guardada para mante-los sempre
    for (btn of btns_check_array) {
        index = btns_check_array.indexOf(btn)
        savedState = localStorage.getItem(`checkState_${index}`)
        if (savedState == 'checked') {
            check = btn.querySelector('img')
            check.classList.remove('hidden')  // removo hidden para aparecer (todos de padrao tem)
        }
    }

    // handle check remedios
    for (btn of btns_check_array) {
        btn.addEventListener('click', function(event) {

            target = event.currentTarget
            index = btns_check_array.indexOf(target)
            check = target.querySelector('img')
            // nome_remed = target.closest('')
            // arrumar problema que entra remed novo com check ja
            // comecei debug e tem a ver com mudanca de index quando entra novo remed
            // mudar p/ nome do remed no local storage inves de index, isso deve arrumar o bug.
 
            display = check.classList.contains('hidden')
            
            if (display) { // ou seja, clicou no check q tava escondido -> eh pra desesconder
                check.classList.remove('hidden')
                localStorage.setItem(`checkState_${index}`, 'checked')  // guardando estado dele
            } else {
                check.classList.add('hidden')
                localStorage.setItem(`checkState_${index}`, 'unchecked')  
            }
        })
    }

    // handle clicar em detalhes e trocar de icone da seta
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

    
    function sortList(ul_remeds) {
        // Get the direct children <li> elements of the <ul>
        let liArray = Array.from(ul_remeds.children);  // Use `children` instead of `querySelectorAll()`
    
        // Sort the array based on the time value inside each <li> (found in the <h3> element)
        liArray.sort(function(a, b) {
            // Find the <h3> within each <li> to extract the time
            let aTimeElement = a.querySelector('h3.horario');
            let bTimeElement = b.querySelector('h3.horario');
    
            let aTime = aTimeElement.textContent.trim();
            let bTime = bTimeElement.textContent.trim();
    
            // Split the time into hours and minutes for both elements
            let [aHour, aMinute] = aTime.split(':').map(Number);
            let [bHour, bMinute] = bTime.split(':').map(Number);
    
            // Compare hours first
            if (aHour !== bHour) {
                return aHour - bHour; // If hours are different, return the difference
            }
            // If hours are the same, compare minutes
            return aMinute - bMinute; // If hours are the same, return the difference between minutes
        });
    
        // Remove all existing <li> elements from the list
        while (ul_remeds.firstChild) {
            ul_remeds.removeChild(ul_remeds.firstChild);
        }
    
        // Append the sorted <li> elements back to the <ul>
        liArray.forEach(function(item) {
            ul_remeds.appendChild(item);
        });
    }

    list_remeds = document.querySelectorAll('.remeds') 
    list_remeds.forEach(ul => { // o forEach recebe uma funcao e itera sobre o array
        sortList(ul);
    });

    function BuildPage(data) {
        
        // define periodo do remedio - compara pela hora do dia (bem suave)
        horario = data['Horario']
        hour = parseInt(horario.slice(0, 2))
        if (hour <= 12) {
            periodo = "manha" 
        } else if (hour <= 18) {
            periodo = "tarde"
        } else {
            periodo = "noite"}

        li = document.createElement('li')
        h3 = document.createElement('h3')
        h3.textContent = horario
        h3.classList.add('horario')
        section = document.createElement('section')
        section.classList.add('med-item')
        icon = document.createElement('img')
        type = data['Tipo']
        if (type == 'Injeção') {
            icon.src = '/img/icone-injecao.png'
            icon.classList.add('icon-seringa')
        } else if (type == 'Comprimido') {
            icon.src = '/img/icone-comprimido.png'
            icon.classList.add('icon-comprimido')
        } else if (type == 'Cápsula') {
            icon.src = '/img/icone-capsula.png'
            icon.classList.add('icon-capsula')
        } else {
            icon.src = '/img/icone-conta_gotas.png'
            icon.classList.add('icon-contagotas')
        }
        ul = document.createElement('ul')
        ul.classList.add('med-info')
        li_nome = document.createElement('li')
        li_conc = document.createElement('li')
        h4 = document.createElement('h4')
        h4.innerHTML = data['Nome']
        p = document.createElement('p')
        p.innerHTML = data['Concentracao']
        li_nome.appendChild(h4)
        li_conc.appendChild(p)
        ul.appendChild(li_nome)
        ul.appendChild(li_conc)
        btn_check = document.createElement('button')
        btn_check.classList.add('button-check')
        icon_check = document.createElement('img')
        icon_check.src = '/img/icone-check.png'
        icon_check.classList.add('check')
        icon_check.classList.add('hidden')
        btn_check.appendChild(icon_check)
        section.appendChild(icon)
        section.appendChild(ul)
        section.appendChild(btn_check)
        btn_detalhes = document.createElement('button')
        btn_detalhes.classList.add('button-detalhes')
        ul_detalhes = document.createElement('ul')
        li_detalhes = document.createElement('li')
        li_detalhes.innerHTML = 'Detalhes'
        li_detalhes_img = document.createElement('li')
        icon_detalhes = document.createElement('img')
        icon_detalhes.src = '/img/icone-double_arrowDown.png'
        li_detalhes_img.appendChild(icon_detalhes)
        ul_detalhes.appendChild(li_detalhes)
        ul_detalhes.appendChild(li_detalhes_img)
        btn_detalhes.appendChild(ul_detalhes)

        collectedInfo = document.createElement('section')
        collectedInfo.classList.add('collected-info')
        collectedInfo.classList.add('hidden')
        p_tipo = document.createElement('p')
        p_dataInicio = document.createElement('p')
        p_dataFinal = document.createElement('p')
        p_freq = document.createElement('p')
        strong_tipo = document.createElement('strong')
        strong_dataInicio = document.createElement('strong')
        strong_dataFinal = document.createElement('strong')
        strong_freq = document.createElement('strong')
        strong_tipo.innerHTML = 'Tipo: '
        strong_dataInicio.innerHTML = 'Data de Início: '
        strong_dataFinal.innerHTML = 'Data de Finalização: '
        strong_freq.innerHTML = 'Frequência: '
        p_tipo.appendChild(strong_tipo)
        p_dataInicio.appendChild(strong_dataInicio)
        p_dataFinal.appendChild(strong_dataFinal)
        p_freq.appendChild(strong_freq)
        span_tipo = document.createElement('span')
        span_dataInicio = document.createElement('span')
        span_dataFinal = document.createElement('span')
        span_freq = document.createElement('span')
        span_tipo.innerHTML = data['Tipo']
        span_dataInicio.innerHTML = data['Data Inicio']
        span_dataFinal.innerHTML = data['Data Final']
        if (!data['Data Final']) {
            span_dataFinal.innerHTML = 'indefinido'
        }
        span_freq.innerHTML = data['Frequencia']
        p_tipo.appendChild(span_tipo)
        p_dataInicio.appendChild(span_dataInicio)
        p_dataFinal.appendChild(span_dataFinal)
        p_freq.appendChild(span_freq)
        collectedInfo.appendChild(p_tipo)
        collectedInfo.appendChild(p_dataInicio)
        collectedInfo.appendChild(p_dataFinal)
        collectedInfo.appendChild(p_freq)
        btn_detalhes.appendChild(collectedInfo)
        bula = document.createElement('p')
        bula.classList.add('bula')
        bula.classList.add('hidden')
        // bula.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque voluptas nam eligendi exercitationem sequi nemo sint obcaecati sunt quam veritatis necessitatibus quibusdam, repudiandae minima quis sapiente! Corporis praesentium unde nam.'
        
        bula.innerHTML = `<strong>Bula:</strong>
            - Uso adulto e pediátrico acima de 12 anos.<br>
            - Duração do tratamento: depende do desaparecimento dos sintomas.<br> 
            - Para correta utilização deste medicamento, solicite orientação do farmacêutico.<br>
            - Siga a orientação do seu médico, respeitando sempre os horários, as doses e a duração de tratamento. Não interrompa o tratamento sem o conhecimento médico.<br>
            - Em caso de uso de grande quantidade desse medicamento, procure rapidamente socorro médico e leve a embalagem ou bula do medicamento, se possível. Ligue para 0800 722 6001, se você precisar de mais informações.<br>
            - Informe ao seu médico ou farmacêutico o aparecimento de reações indesejáveis pelo uso do medicamento.`

        btn_detalhes.appendChild(bula)

        li.appendChild(h3)
        li.appendChild(section)
        li.appendChild(btn_detalhes)

        // pego a lista de remedios para add do periodo certo
        section_periodo = document.querySelector('.' + periodo)
        if (section_periodo) { // quer dizer q ja foi criado antes
            ul_remeds = section_periodo.querySelector('.remeds')
        } else { // nao tem essa section do periodo, tem q criar
            main = document.querySelector('main')
            h2 = document.createElement('h2')
            if (periodo == 'manha') {
                textPeriodo = 'MANHÃ'
            } else if (periodo == 'tarde') {
                textPeriodo = 'TARDE'
            } else {
                textPeriodo = 'NOITE'
            }
            h2.innerHTML = textPeriodo
            section_periodo = document.createElement('section')
            section_periodo.classList.add('periodo')
            section_periodo.classList.add(periodo)
            section_periodo.appendChild(h2)
            ul_remeds = document.createElement('ul')
            ul_remeds.classList.add('remeds')
            section_periodo.appendChild(ul_remeds)
            main.appendChild(section_periodo) // fode ordem
        }

        ul_remeds.appendChild(li)
        sortList(ul_remeds)     
    }

    // exportando o main node para a tela da semana
    semanaLink = document.querySelector('header a')
    semanaLink.addEventListener('click', function(event) {
        event.preventDefault()

        mainNode = document.querySelector('main')
        mainNodeHTML = mainNode.outerHTML // eu deserializo a informação usanso o outer
        // o html vira uma string. na proxima tela eu serializo usando inner

        localStorage.setItem('mainNodeHTML', mainNodeHTML)

        window.location.href = 'Semana.html'
    })
})