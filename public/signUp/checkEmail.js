document.getElementsByName('email')[0].addEventListener('input', function (event) {
    const email = this.value;
    (async () => {
        let response = await fetch(location.origin, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                state: 'signUp',
                check: 'email',
                data: email
            })
        })
        response = await response.text()
        document.getElementById("error").innerHTML = parseInt(response) ? 'That email is already being used, please try a different one.' : ''
    })()
})