var LoginConector = function () {
    function callApi(user, password) {
        fetch('http://192.168.0.21:3000/users/sessions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user,
                password: password,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return{
        callApi: callApi
    }
}()