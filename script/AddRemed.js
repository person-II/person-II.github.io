document.addEventListener('DOMContentLoaded', function() {


    input = document.querySelector('input')
    input.addEventListener('change', function(event) {

        value = input.value.toLowerCase()
        value = value.charAt(0).toUpperCase() + value.slice(1); // coloca o 1ª ch maiusculo
        // é preciso somar com o resto da palavra pq esse metodo no js nao devolve inteira, so o ch 

        lista_remed = document.querySelector('.list-remed')
        if (value) {  // tava tendo problema q se apagasse pesquisa ficava sem nome o remedio
            // lista aparece se tem mudanca no input
            lista_remed.classList.remove('hidden')
    
            // muda nome dos remedios com o input colocado e numera
            h2s = document.querySelectorAll('h2')
            for (h2 of h2s) {
                h2.innerHTML = value
            }
        } else {
            lista_remed.classList.add('hidden')
        } 
    })

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            input.blur(); // tira foco
        }
    });

    function getNextMedKey() {
        let count = 1;
        while(localStorage.getItem(`NewMed Data ${count}`)) {
            count++;
        }
        return `NewMed Data ${count}`;
    }
    
    function unapprovedMed() {
        // Check for existing unapproved med
        let openKey = null;
        for(let i = 1; i <= localStorage.length; i++) {
            let key = `NewMed Data ${i}`;
            let data = JSON.parse(localStorage.getItem(key));
            if(data && data.approval === false) {
                openKey = key;
                return openKey
            }
        }       
    }
    
    let openKey = unapprovedMed()
    if (!openKey) {
        newData = {}
        CreatNewEntry(newData)
    }
    openKey = unapprovedMed()

    function MergeData(newData) {

        // if openKey:
        // Update existing unapproved med
        let currentData = JSON.parse(localStorage.getItem(openKey));
        Data = Object.assign({}, currentData, newData);
        localStorage.setItem(openKey, JSON.stringify(Data));
        localStorage.setItem('openKey', openKey)
    }

    function CreatNewEntry(newData) {

        // if not openKey:
        // Create new med entry
        let newKey = getNextMedKey();
        let dataToStore = { ...newData, approval: false };
        localStorage.setItem(newKey, JSON.stringify(dataToStore));
        localStorage.setItem('openKey', newKey)
    }

    a_links = document.querySelectorAll('main a')
    for (a of a_links) {
        a.addEventListener('click', function(event) {
            event.preventDefault()

            // fiz isso para as telas da frente tb para diferenciar mlr o botao que foi clicado
            document.querySelectorAll('.block').forEach(element => {
                element.style.opacity = 0.5
            });

            clicked_link = event.currentTarget
            section_perto = clicked_link.closest('.block')

            // diferenciar. msm coisa de cima
            section_perto.style.border = '3px solid #4d4c4c'
            section_perto.style.opacity = 1

            nomeRemed = section_perto.querySelector('h2').innerHTML
            concentracao = section_perto.querySelector('p').innerHTML

            newData = {}
            newData['Nome'] = nomeRemed
            newData['Concentracao'] = concentracao

            if (openKey) {
                MergeData(newData)
            }
            
            // delay. expliquei na proxima pagina.
            setTimeout(() => window.location.href = 'TipoRemed.html', 100);
        })
    }
})