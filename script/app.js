document.addEventListener('DOMContentLoaded', function() {

    function SmartGoBack() {
        config = document.querySelector('.settings').addEventListener('click', function() {
            localStorage.setItem('previousPage', window.location.href)
            window.location.href = "Config.html"
        })
    }

    SmartGoBack()
})