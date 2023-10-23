function submitCadastro(event) {
    event.preventDefault();

    fetch("http://localhost:9090/authentication/registerUsuario", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                emailUsuario: document.getElementById('email').value,
                senha_usuario: document.getElementById('senha').value,
            })
        })
        .then(response => response.json())
        .then(data => {
            const id_usuario_cliente = data.id_usuario; // ID do usuário cliente gerado pelo servidor

            fetch("http://localhost:9090/authentication/registerCliente", {
                    method: "POST",
                    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify({
                        nm_cliente: document.getElementById('nome').value,
                        cpfCliente: document.getElementById('cpf').value,
                        logradouro_cliente: document.getElementById('logradouro').value,
                        complemento_cliente: document.getElementById('complemento').value,
                        estado_cliente: document.getElementById('estado').value,
                        cidade_cliente: document.getElementById('cidade').value,
                        numero_casa_cliente: document.getElementById('numero').value,
                        id_usuario_cliente: id_usuario_cliente
                    })
                })
                .then(function (res) {
                    console.log(res);
                    window.location.href = "inicio.html";
                })
                .catch(function (error) {
                    console.log(error);
                });

            clean();
        })
        .catch(error => {
            console.error('Erro ao criar usuário:', error);
        });
}


const botao = document.getElementById('concluir');
botao.addEventListener('click', submitCadastro);










/* EXAMPLE FUNCIONTION FOR GETTING DATA 
function getData() {
  fetch("https://backternarychart-production.up.railway.app/points", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving data");
      }
    })
    .then(function (data) {
      console.log(data);
      updateChart(data);
    })
    .catch(function (error) {
      console.log(error);
      
    });

}

EXEMPLO PARA DAR UPDATE NOS DADOS

function updateData(id, newData) {
  fetch(`https://backternarychart-production.up.railway.app/points/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(newData)
    })
    .then(function (res) {
      console.log(res);

    })
    .catch(function (error) {
      console.log(error);
 
    });
}


   */