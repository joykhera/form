document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault()
    const formDataEntries = Object.fromEntries(new FormData(this))
    if (formDataEntries.password != formDataEntries.confirmPassword) document.getElementById("error").innerHTML = "Passwords do not match"
    else {
        let response = await fetch('/signUp', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataEntries)
        })
        response = await response.text()

        switch (response) {
            case 'duplicate key value violates unique constraint "accounts_username_key"':
                document.getElementById("error").innerHTML = 'That username is already being used, please try a different one.'
                break;

            case 'duplicate key value violates unique constraint "accounts_email_key"':
                document.getElementById("error").innerHTML = 'That email is already being used, please try a different one.'
                break;

            case '':
                location.assign('../index.html')
                break;

            default:
                document.getElementById("error").innerHTML = response
        }
    }
})