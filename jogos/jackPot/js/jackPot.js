var coins = 10; // Número inicial de moedas

var slotValues = [0, 0, 0]; // Valores iniciais dos slots
var isSpinning = false; // Flag para verificar se os slots estão girando

function spin() {
    var betAmount = parseInt(document.getElementById("betAmount").value);

    if (coins >= betAmount && !isSpinning && betAmount > 0) {
        coins -= betAmount;
        updateCoinsDisplay();

        var slots = document.getElementsByClassName("slot");
        var spinCount = 0; // Contador de giros

        isSpinning = true;

        // Desativar o botão de giro durante a animação
        document.querySelector("#controls button").disabled = true;

        // Iniciar o giro dos slots
        var interval = setInterval(function () {
            // Gerar um valor aleatório para cada slot
            slotValues[spinCount] = Math.floor(Math.random() * 10);
            slots[spinCount].textContent = slotValues[spinCount];

            spinCount++;

            if (spinCount >= slots.length) {
                // Quando todos os slots terminarem de girar
                clearInterval(interval);
                isSpinning = false;

                // Ativar o botão de giro novamente
                document.querySelector("#controls button").disabled = false;

                // Verificar o resultado do giro
                if (slotValues[0] === slotValues[1] && slotValues[1] === slotValues[2]) {
                    var winnings = betAmount * 10; // Valor do prêmio
                    coins += winnings;
                    updateCoinsDisplay();
                    document.getElementById("result").textContent =
                        "Parabéns! Você ganhou " + winnings + " moedas!";
                } else {
                    document.getElementById("result").textContent =
                        "Não foi dessa vez. Tente novamente!";
                }
            }
        }, 200); // Intervalo entre cada giro dos slots
    } else if (isSpinning) {
        document.getElementById("result").textContent =
            "Aguarde até que os slots terminem de girar.";
    } else if (betAmount <= 0) {
        document.getElementById("result").textContent =
            "Aposte um valor maior que zero.";
    } else {
        document.getElementById        ("result").textContent =
        "Você não tem moedas suficientes para apostar!";
}
}

function updateCoinsDisplay() {
document.getElementById("coins").textContent = "Moedas: " + coins;
}


window.onload = function () {
updateCoinsDisplay();
};

