document.getElementsByName('username')[0].addEventListener('input', function (event) {
    const username = this.value;
    (async () => {
        let response = await fetch(location.origin, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                state: 'signUp',
                check: 'username',
                data: username
            })
        })
        response = await response.text()
        document.getElementById("error").innerHTML = parseInt(response) ? 'That username is already being used, please try a different one.' : ''
    })()
})