document.addEventListener('DOMContentLoaded', function() {

    h2 = document.querySelector('h2');
    infoColetadas = document.querySelector('.infoColetadas');
    throbber = document.querySelector('.container-svg');

    LOADING_DURATION = 4000   //ms

    function after() {
        h2.innerHTML = 'Dados Coletados:';
        h2.style.color = 'rgb(0,0,0)'
        throbber.classList.add('hidden');
        infoColetadas.classList.remove('hidden');
    }

    setTimeout(after, LOADING_DURATION);

    let openKey = localStorage.getItem('openKey')

    function MergeData(newData) {

        // if openKey:
        // Update existing unapproved med
        let currentData = JSON.parse(localStorage.getItem(openKey));
        Data = Object.assign({}, currentData, newData);
        localStorage.setItem(openKey, JSON.stringify(Data));
        return openKey;
    }

    const data = document.querySelectorAll('em')
    nome = data[0].innerHTML
    conc = data[1].innerHTML
    tipo = data[2].innerHTML
    data_inicio = data[3].innerHTML
    data_final = data[4].innerHTML
    horario = data[5].innerHTML
    freq = data[6].innerHTML

    add_btn = document.querySelector('.button-add')
    add_btn.addEventListener('click', function(event) {

        if (!localStorage.getItem('anexei')) {
            newData = {}
            newData["Nome"] = nome
            newData["Concentracao"] = conc
            newData['Frequencia'] = freq
            newData["Tipo"] = tipo
            newData['Data Inicio'] = data_inicio
            newData['Data Final'] = data_final
            newData['Horario'] = horario
    
            MergeData(newData)
    
            // aprovando remedio dados nao mudam
            finalData = JSON.parse(localStorage.getItem(openKey));
            finalData['approval'] = true;
            localStorage.setItem(openKey, JSON.stringify(finalData));
            localStorage.setItem('anexei', true)
            window.location.href = 'index.html';
        }
        else {
            alert('Este Remédio já foi adicionado previamente!')
        }

    })


});
