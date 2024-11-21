document.addEventListener('DOMContentLoaded', function() {

    go_back = document.querySelector('a')
    go_back.addEventListener('click', function(event) {
        destination = localStorage.getItem('previousPage')
        window.location.href = destination
    })
})