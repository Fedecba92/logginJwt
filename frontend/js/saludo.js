

document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.token ) {
        window.location.href='login.html';
       
    }else {
        alert ("hay q hacer decode del token")
        const decoToken= localStorage.token;
        const decoded = jwt_decode(decoToken)
        console.log(decoded);
    }

});