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

    // a
    freqs = document.querySelectorAll('.frequency')

    function GatherNewData(key, iterable, nextWind) {
        for (el of iterable) {
            el.addEventListener('click', function(event) {

                iterable.forEach(element => {
                    element.style.opacity = 0.5
                });

                target = event.currentTarget
                target.style.opacity = 1 // nao esmace o clicado
                target.style.border = '.2rem solid black'
                value = target.innerText

                newData = {}
                newData[key] = value

                if (openKey) {
                    MergeData(newData)
                }
                
                setTimeout(() => window.location.href = nextWind, 100);
            })
        }
    }

    GatherNewData('Frequencia', freqs, 'DuracaoDose.html')
})