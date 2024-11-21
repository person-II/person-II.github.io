document.addEventListener('DOMContentLoaded', function() {

    let openKey = localStorage.getItem('openKey')

    function MergeData(newData) {

        // if openKey:
        // Update existing unapproved med
        let currentData = JSON.parse(localStorage.getItem(openKey));
        Data = Object.assign({}, currentData, newData);
        localStorage.setItem(openKey, JSON.stringify(Data));
        return openKey;
    }
    
    dataFinal = document.querySelector('.data-final')
    switch_img = dataFinal.querySelector('img')
    h2 = dataFinal.querySelector('h2');

    switch_img.addEventListener('click', function(event) {

        src = switch_img.src
        pathON = '/img/icone-onswitch.png'
        pathOFF = '/img/icone-offswitch.png'
        if (src.endsWith(pathOFF)) {
            switch_img.src = pathON
            dataFinal.style.height = '10rem'
            dataFinal.style.paddingTop = '0.4rem'
            h2.style.paddingTop = '0.35rem'
            dataFinal.style.marginBottom = '6.5rem'
            input = document.createElement('input')
            input.classList.add('scroll-input-date')
            input.setAttribute("type", "date")
            dataFinal.appendChild(input)
            dataFinal.style.padding = '0'
            input.style.border = 'none'
            input.style.height = '5rem'
            input.style.marginBottom = '0.5rem'
            input.style.marginTop = '0.1rem'
            input.style.borderTop = '.1rem solid black'
        } else {
            switch_img.src = pathOFF 
            dataFinal.style.height = '3.5rem';
            dataFinal.style.paddingTop = '0'
            h2.style.paddingTop = '0'
            input.remove()
        }
    })

    // jeito errado - n funciona 

    // inpts = document.getElementsByTagName('input')
    // for (inpt of inpts) {
    //     inpt.addEventListener('change', function(event) {
    //         t = event.currentTarget
    //         if (t.value) {
    //             t.style.color = '#007BFF'
    //         } else {
    //             t.style.color = ''
    //         }
    //     })
    // }

    // desse jeito funciona pq os event listeners nao estao setados antes da mudanca do ultimo input, 
    // e dessa forma ele checa dinamicamente o elemento responsavel pelo evento, 
    // msm q tenha sido add depois
    let main = document.querySelector('main')
    main.addEventListener('change', function(event) {
        const target = event.target
        if (target.tagName === 'INPUT') {
            if (target.value) {
                target.style.color = '#007BFF'
            } else {
                target.style.color = ''
            }
        }
    })

    
    add_btn = document.querySelector('.button-add')
    add_btn.addEventListener('click', function(event) {

        doses = document.querySelector('.dose-input select').value
        inputs = document.querySelectorAll('input')
        start_date = inputs[0].value
        time = inputs[1].value
        let end_date = null  // inicia none pra nao dar pau de nao ter var definida

        todos_completos = doses && start_date && time
        
        // checa pra ver se o cara ativou data final pq ai pega mais um input
        if (inputs.length > 2) {
            end_date = inputs[2].value
            todos_completos = todos_completos && end_date // comparo com todos agr
        }

        if  (todos_completos) {
            newData = {}
            newData['Horario'] = time
            newData['Data Inicio'] = start_date

            if (end_date) {
                newData['Data Final'] = end_date // add so se tem data final pra nao dau pau caso n tenha
            }

            MergeData(newData)

            // aprovando remedio dados nao mudam
            finalData = JSON.parse(localStorage.getItem(openKey));
            finalData['approval'] = true;
            localStorage.setItem(openKey, JSON.stringify(finalData));
            window.location.href = 'index.html';
        } else {
            alert('todos os campos devem ser preenchidos corretamente para adicionar um novo remédio!')
        }
    });
});