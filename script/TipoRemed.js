document.addEventListener('DOMContentLoaded', function() {

    let openKey = localStorage.getItem('openKey')

    function MergeData(newData) {

        // if openKey:
        // Update existing unapproved med
        let currentData = JSON.parse(localStorage.getItem(openKey));
        Data = Object.assign({}, currentData, newData);
        localStorage.setItem(openKey, JSON.stringify(Data));
        localStorage.setItem('openKey', openKey)
    }

    // a
    types = document.querySelectorAll('.type')

    function GatherNewData(key, iterable, nextWind) {
        for (el of iterable) {
            el.addEventListener('click', function(event) {

                // esmace os elementos
                // foreach eh bom aqui, ele eh rapido
                iterable.forEach(element => {
                    element.style.opacity = 0.5
                });

                target = event.currentTarget
                target.style.opacity = 1 // nao esmace o clicado
                target.style.border = '.2rem solid black'
                value = target.innerText.toLowerCase()

                newData = {}
                newData[key] = value[0].toUpperCase() + value.slice(1)

                if (openKey) {
                    MergeData(newData)
                }
                
                // anonymous function. parecida com lambda no python. 
                //preciso pesquisarr mais depois pra entender mlr
                // aqui eu to colocando um delei pra trocar de tela pra ver que 
                // esmaceou o retso dos elementos nao selecionados
                setTimeout(() => window.location.href = nextWind, 100);
            })
        }
    }

    GatherNewData('Tipo', types, 'FreqIng.html')
})