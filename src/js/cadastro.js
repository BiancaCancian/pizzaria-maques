function submitCadastro(event) {
  event.preventDefault(); // Impede o envio do formulário por padrão

  fetch("http://localhost:9090/authentication/registerCliente", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nm_cliente: document.getElementById("nome").value,
        cpfCliente: document.getElementById("cpf").value,
        logradouro_cliente: document.getElementById("logradouro").value,
        numero_casa_cliente: document.getElementById("numero").value,
        complemento_cliente: document.getElementById("complemento").value,
        cidade_cliente: document.getElementById("cidade").value,
        estado_cliente: document.getElementById("estado").value,
        usuario: {
          emailUsuario: document.getElementById("email").value,
          senha_usuario: document.getElementById("senha").value
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso:', data);
      window.location.href = 'inicio.html';
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}
const botao = document.getElementById('concluir');
botao.addEventListener('click', function (event) {
  event.preventDefault();
  submitCadastro(event);
});