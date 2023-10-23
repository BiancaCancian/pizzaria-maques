/*responsivo*/

initCart()

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('#navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {

    menu.classList.remove('fa-times');
    navbar.classList.toggle('active');

}

/*btn ver cardapio, ao clicar no botao "ver cardapio no inicio levar o usuario para o inicio"*/


/*btn "personalizar e adicionar" quando o usuario clicar vai perguntar a quantidade e a descrição aparecera*/

/*em meus pedidos deve aparecer todos os pedidos e aparecer a aba do endereço ler arquivo: (elisangela)"*/

/*ao clicar nos icones do cabeçalho levar o usuario para cada um deles"*/

// Variáveis globais para armazenar itens do carrinho e preço total


