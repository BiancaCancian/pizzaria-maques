document.getElementById("acessar").addEventListener("click", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do botão (navegação)

    var emailInput = document.getElementById("email").value;
    var senhaInput = document.getElementById("senha").value;

    fetch("http://localhost:9090/authentication/signIn", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'inicio.html';
        } else {
            console.error("Credenciais inválidas. Tente novamente.");
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error); //informa erro de rede 

    });
});

// "http://localhost:9090/authentication/signIn?emailUsuario=" + emailInput + "&senha_usuario=" + senhaInput