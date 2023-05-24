const dice = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const resultDiv = document.getElementById("result");
const diceNumberInput = document.getElementById("diceNumber");
const chipQuantityInput = document.getElementById("chipQuantity");
const betValueInput = document.getElementById("betValue");

rollButton.addEventListener("click", fazerAposta);

function fazerAposta() {
    const diceNumber = Number(diceNumberInput.value);
    const chipQuantity = Number(chipQuantityInput.value);
    const betValue = Number(betValueInput.value);

    if (!diceNumber || !chipQuantity || !betValue) {
        alert("Preencha todos os campos.");
        return;
    }

    if (diceNumber < 1 || diceNumber > 6) {
        alert("Escolha um número válido para o dado (entre 1 e 6).");
        return;
    }

    if (chipQuantity < betValue) {
        alert("A quantidade de fichas é menor que o valor da aposta.");
        return;
    }

    if (chipQuantity === 0) {
        alert("Suas fichas acabaram. Impossível apostar.");
        return;
    }

    rolarDado(diceNumber);
}

function rolarDado(diceNumber) {
    const randomDiceNumber = Math.floor(Math.random() * 6) + 1;

    dice.classList.add("rolling");

    setTimeout(() => {
        dice.classList.remove("rolling");
        girarDado(randomDiceNumber);
        mostrarResultado(diceNumber, randomDiceNumber);
    }, 500); 
}

function girarDado(randomDiceNumber) {
    const rotations = {
        1: "rotateX(0deg) rotateY(0deg)",
        2: "rotateX(-90deg) rotateY(0deg)",
        3: "rotateX(0deg) rotateY(90deg)",
        4: "rotateX(0deg) rotateY(-90deg)",
        5: "rotateX(90deg) rotateY(0deg)",
        6: "rotateX(180deg) rotateY(0deg)",
    };

    dice.style.transform = rotations[randomDiceNumber];
}

function mostrarResultado(diceNumber, randomDiceNumber) {
    if (diceNumber === randomDiceNumber) {
        resultDiv.textContent = "Você ganhou!";
        const chipQuantity = Number(chipQuantityInput.value);
        const betValue = Number(betValueInput.value);
        const winnings = betValue * 2; // O valor ganho é o dobro da aposta
        const newChipQuantity = chipQuantity + winnings;
        chipQuantityInput.value = newChipQuantity;
    } else {
        resultDiv.textContent = "Você perdeu!";
        const chipQuantity = Number(chipQuantityInput.value);
        const betValue = Number(betValueInput.value);
        const newChipQuantity = chipQuantity - betValue;
        chipQuantityInput.value = newChipQuantity >= 0 ? newChipQuantity : 0; // Não permite um número negativo de fichas
    }
}
