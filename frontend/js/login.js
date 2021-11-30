document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#submit").addEventListener('click',async (ev) => {
        ev.preventDefault();
        const body = {};
        body.username  =  document.querySelector("#username").value;
        body.password  =  document.querySelector("#password").value;
        try {
            const responseLogin = await fetch ('http://localhost:3001/login' , {
                method: 'POST',
                mode:'cors',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           
            if (responseLogin.status == 401) {
                alert("nombre o contrasena incorrecta");
            }
            if (responseLogin.status == 200) {

                const responseJson = await responseLogin.json();
                localStorage.setItem('token',responseJson);
                window.location.href='saludo.html';
            }  
        } catch (error) {
           console.log(error);
        }
    });
});