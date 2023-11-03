document.getElementById("acessar").addEventListener("click", function(event) {
    event.preventDefault();

    fetch("http://localhost:9090/authentication/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailUsuario: document.getElementById("email").value,
            senha_usuario: document.getElementById("senha").value
        }) 
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error("Erro na requisição: " + response.status);
            alert("Erro na requisição: " + response.status);
        }
    })
    .then(data => {
        if (data && data.id_usuario) {
            alert("ID do usuário recebido: " + data.id_usuario);
            localStorage.setItem("id_usuario", data.id_usuario);
            window.location.href = 'inicio.html';
        } else {
            console.error("ID do usuário nulo ou indefinido.");
            alert("ID do usuário nulo ou indefinido.");
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login: " + error.message);
    });
});

