function submitCadastro(event) {
  event.preventDefault();

  fetch("http://localhost:9090/authentication/registerUsuario", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailUsuario: document.getElementById('email').value,
        senha_usuario: document.getElementById('senha').value,
      })
    })
    .then(response => response.json())
    .then(data => {
      const id_usuario_cliente = data.id_usuario; // ID do usuário cliente gerado pelo servidor

      return fetch("http://localhost:9090/authentication/registerCliente", {
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
      });
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = 'inicio.html';
    })
    .catch(error => {
      console.error('Erro ao criar usuário:', error);
    });
}

const botao = document.getElementById('concluir');
botao.addEventListener('click', function (event) {
  event.preventDefault();
  submitCadastro(event);
});