document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault()
    const formDataEntries = Object.fromEntries(new FormData(this))
        (async () => {
            let response = await fetch(location.origin, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    state: 'logIn',
                    data: formDataEntries
                })
            })
            console.log(response)
            response = await response.text()

            switch (response) {
                case 'duplicate key value violates unique constraint "accounts_username_key"':
                    document.getElementById("error").innerHTML = 'That username is already being used, please try a different one.'
                    break;

                case 'duplicate key value violates unique constraint "accounts_email_key"':
                    document.getElementById("error").innerHTML = 'That email is already being used, please try a different one.'
                    break;

                case '':
                    location.assign(`../welcome.html?username=${formDataEntries.username}`)
                    break;

                default:
                    document.getElementById("error").innerHTML = response

            }
        })()
})