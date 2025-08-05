let carrinhoDisplays = document.querySelectorAll(".carrinhoProd")
let carrinhoDisplayQuant = document.querySelectorAll(".carrinhoProd .quantidadeCarrinho")

let prods = document.querySelectorAll(".produto-preco")
let prodsArray = Array.from(prods)

let precos = []

for (i = 0; i < prodsArray.length; i++) {
    precos.push(parseInt(prodsArray[i].getAttribute("value")))
}

// Formatar valor em moeda
function formatarMoeda(valor) {
    return valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
}

// Aumentar quantidade
function aumentarQuantidade(id) {
    const input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
    calcularTotal();
}

// Diminuir quantidade
function diminuirQuantidade(id) {
    const input = document.getElementById(id);
    if (input.value > 0) {
        input.value = parseInt(input.value) - 1;
        calcularTotal();
    }
}

// Calcular o total
function calcularTotal() {
    let total = 0;
    
    for (let i = 1; i <= precos.length; i++) {
        const id = 'produto' + i;
        const quantidade = parseInt(document.getElementById(id).value) || 0;
        total += quantidade * precos[i - 1];

        if (quantidade > 0) {
            carrinhoDisplays[i - 1].classList.remove("carrinhoDisplayF")
            carrinhoDisplayQuant[i - 1].textContent = (quantidade + "x")
        } else {
            carrinhoDisplays[i - 1].classList.add("carrinhoDisplayF")
        }
    }
    
    document.getElementById('total').textContent = 'Total: R$ ' + formatarMoeda(total);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botões de aumentar
    document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', function() {
            aumentarQuantidade(this.getAttribute('data-produto'));
        });
    });
    
    // Botões de diminuir
    document.querySelectorAll('.btn-diminuir').forEach(btn => {
        btn.addEventListener('click', function() {
            diminuirQuantidade(this.getAttribute('data-produto'));
        });
    });
    
    // Inputs de quantidade
    document.querySelectorAll('.quantidade').forEach(input => {
        input.addEventListener('change', calcularTotal);
    });
    
    // Calcular total inicial
    calcularTotal();
});