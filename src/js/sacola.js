const menuItems = {
    pizzas: [{
            id: 1,
            name: "Pepperoni",
            price: 42.99
        },
        {
            id: 2,
            name: "Queijo",
            price: 25.99
        },
        {
            id: 3,
            name: "Bacon",
            price: 37.99
        },
        {
            id: 4,
            name: "A moda da casa",
            price: 37.99
        },
        {
            id: 5,
            name: "Vegetariana",
            price: 35.99
        },
        {
            id: 6,
            name: "Marguerita",
            price: 33.99
        },
        {
            id: 7,
            name: "Calabresa",
            price: 25.99
        },
        {
            id: 8,
            name: "Frango",
            price: 40.99
        },
        {
            id: 9,
            name: "4-Queijos",
            price: 42.99
        }
    ],
    bebidas: [{
            id: 10,
            name: "Refrigerante Lata",
            price: 5.90
        },
        {
            id: 11,
            name: "Refrigerante 1.5L",
            price: 10.90
        },
        {
            id: 12,
            name: "Refrigerante 2 Litros",
            price: 15.90
        },
        {
            id: 13,
            name: "Suco em lata",
            price: 5.90
        },
        {
            id: 14,
            name: "Heineken",
            price: 10.90
        },
        {
            id: 15,
            name: "Agua",
            price: 4.00
        }
    ]
};

let cartItems = [];

// Chamar a função initCart ao carregar a página para inicializar o carrinho
window.addEventListener('load', function () {
    initCart();

});

// Função para inicializar o carrinho ao carregar a página
function initCart() {
    // Verificar se há dados do carrinho no localStorage ao carregar a página
    if (localStorage.getItem('cartItems')) {
        // Obter os itens do carrinho do localStorage e convertê-los de volta para um objeto JavaScript
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

        // Inicializar propriedades ausentes (se necessário)
        cartItems.forEach(item => {
            item.quantity = item.quantity || 1; // Inicializar quantidade para 1 se estiver ausente
        });

        updateCartPopup();
    }
}

/*

                METODO POST DO PEDIDO - inicio

*/


let totalPrice = 0;



async function saveCartData() {
    const idUsuario = parseInt(localStorage.getItem("id_usuario"));
    

    const pedido = {
        "id_cliente_pedido": idUsuario,
        "status_pedido": "Em andamento",
        "pedidoBebida": [],
        "pedidoPizza": []
    };



    // Iterar pelos itens do carrinho e adicionar ao pedido
    cartItems.forEach(item => {

        if (item.type === "bebidas") {
            pedido.pedidoBebida.push({
                "quantidade_pedido_bebida": item.quantity,
                "forma_pagamento_pedido": "Debito",
                "idBebida": {
                    "id_bebida": item.id
                }
            });
        } else if (item.type === "pizzas") {
            pedido.pedidoPizza.push({
                "quantidade_pedido_pizza": item.quantity,
                "tamanho_pedido_pizza": "Grande",
                "idPizza": {
                    "id_pizza": item.id
                }
            });
        }
    });


    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice)
    alert("JSON do Pedido: " + JSON.stringify(pedido));
    

    // Fazer a requisição POST com o objeto `pedido` no corpo
    await fetch('http://localhost:9090/pedido/fazerPedido', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(response => response.json())
        .then(data => {
            
            console.log('Pedido feito com sucesso:', data);

            clearCart();

            window.location.href = 'pagamento.html';
            // Limpar o carrinho e fazer outras ações após o pedido bem-sucedido, se necessário
            
            
        })
        .catch(error => {
            console.error('Erro ao fazer pedido:', error);
            window.location.href = 'pagamento.html';
            // Tratar erros, se necessário
        });
}

/*

                METODO POST DO PEDIDO - FIM

*/

/*

                FINALIZAR O PEDIDO - inicio

*/

const finalizarPedidoButton = document.getElementById('finalizar-pedido');
finalizarPedidoButton.addEventListener('click', function (event) {
    event.preventDefault(); // Impedir o comportamento padrão do link (navegação)

    // Enviar dados da sacola como JSON para o servidor e redirecionar para a página de pagamento
    saveCartData();

    // Redirecionar para a página de pagamento após enviar os dados para o servidor
    
});

/*

                FINALIZAR O PEDIDO - FIM

*/


/*

                PARTE VISUAL DA SACOLA ONDE OS ITEMS SÃO ADICIONADOS - Inicio

*/

function addItemToCart(itemId, type) {
    const selectedItem = menuItems[type].find(item => item.id === itemId);

    if (selectedItem) {
        const existingItem = cartItems.find(item => item.id === selectedItem.id);

        if (existingItem) {
            // Se o item já existe no carrinho, aumente a quantidade
            existingItem.quantity += 1;

        } else {
            // Se o item não está no carrinho, adicione-o com quantidade 1 e defina o tipo
            cartItems.push({
                id: selectedItem.id || generateUniqueID(),
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: 1,
                type: type // Defina o tipo do item (pizzas ou bebidas)
            });
        }

        // Atualizar o preço total
        totalPrice += selectedItem.price;

        updateLocalStorage();
    }
}

// Função para atualizar o localStorage com os dados do carrinho
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);
}

function removeItemToCart(itemId, type) {
    const selectedItem = menuItems[type].find(item => item.id === itemId);

    if (selectedItem) {
        const existingItem = cartItems.find(item => item.id === selectedItem.id);

        if (existingItem) {
            // Se o item já existe no carrinho, aumente a quantidade
            existingItem.quantity -= 1;
        } else {
            // Se o item não está no carrinho, adicione-o com quantidade 1 e defina o tipo
            cartItems.push({
                id: selectedItem.id || generateUniqueID(),
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: 1,
                type: type // Defina o tipo do item (pizzas ou bebidas)
            });
        }

        totalPrice -= selectedItem.price;

        updateLocalStorage();
    }
}

/*

                PARTE VISUAL DA SACOLA ONDE OS ITEMS SÃO ADICIONADOS - FIM

*/



// Função para atualizar o pop-up da sacola
function updateCartPopup() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    // Se a sacola estiver vazia, exiba a mensagem "Sacola Vazia" e oculte os itens e o total
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = "block";
        cartItemsContainer.style.display = "none";
        totalPriceElement.style.display = "none";
    } else {
        // Se a sacola não estiver vazia, oculte a mensagem e exiba os itens e o total
        emptyCartMessage.style.display = "none";
        cartItemsContainer.style.display = "block";
        totalPriceElement.style.display = "block";

        // Limpar o conteúdo anterior
        cartItemsContainer.innerHTML = "";

        // Atualizar os itens e o total na sacola
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
            <span>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
        `;
            cartItemsContainer.appendChild(itemDiv);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

/*

                ADICIONAR ITENS NO CARRINHO - INICIO

*/


// PIZZAS
// PIZZAS - Adicionar itens
const addButtonElements = document.querySelectorAll("#cardapio .vigia");
addButtonElements.forEach(button => {
    button.addEventListener("click", function (event) {
        // Obter o ID da pizza a partir do atributo data-id
        const itemIdPizza = parseInt(event.target.getAttribute("data-id-pizza"));
        // Adicionar o item ao carrinho passando o ID e o tipo (pizzas neste caso)
        addItemToCart(itemIdPizza, "pizzas");
        // Atualizar o pop-up da sacola
        updateCartPopup();
    });
});

const removeButtonElements = document.querySelectorAll("#cardapio .remove");
removeButtonElements.forEach(button => {
    button.addEventListener("click", function (event) {
        // Obter o ID da pizza a partir do atributo data-id
        const itemIdPizza = parseInt(event.target.getAttribute("data-id-pizza"));
        // Adicionar o item ao carrinho passando o ID e o tipo (pizzas neste caso)
        removeItemToCart(itemIdPizza, "pizzas");
        // Atualizar o pop-up da sacola
        updateCartPopup();


    });



});



// BEBIDAS
const addButtonElementsBebidas = document.querySelectorAll("#bebidas .vigia");
addButtonElementsBebidas.forEach(button => {
    button.addEventListener("click", function (event) {
        // Obter o ID da bebida a partir do atributo data-id
        const itemIdBebida = parseInt(event.target.getAttribute("data-id-bebida"));
        // Adicionar o item ao carrinho passando o ID e o tipo (bebidas neste caso)
        addItemToCart(itemIdBebida, "bebidas");
        // Atualizar o pop-up da sacola
        updateCartPopup();


    });
});


/*

                ADICIONAR ITENS NO CARRINHO - FIM

*/

// Adicionar evento de clique ao ícone da sacola para abrir o pop-up
const cartIcon = document.querySelector(".fa-shopping-bag");
const sacola = document.getElementById("sacola");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");
let isPopupOpen = false; // Variável para rastrear se o pop-up está aberto ou fechado

sacola.addEventListener("click", function (event) {
    // Impedir o comportamento padrão do link (navegação)
    event.preventDefault();

    // Se o pop-up estiver aberto, feche-o. Se estiver fechado, abra-o.
    if (isPopupOpen) {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }

    // Atualize o estado do pop-up (aberto ou fechado)
    isPopupOpen = !isPopupOpen;
});

cartIcon.addEventListener("click", function () {
    popup.style.display = "block";
});

// Adicionar evento de clique ao botão de fechar pop-up
closePopupButton.addEventListener("click", function () {
    popup.style.display = "none";
    isPopupOpen = false; // Quando o pop-up é fechado pelo botão, marque-o como fechado
});


function clearCart() {
    cartItems = [];
    totalPrice = 0;
    updateCartPopup();
    localStorage.removeItem('cartItems');
}


const clearCartButton = document.getElementById('cancelar-pedido');
clearCartButton.addEventListener('click', function () {
    clearCart();
});