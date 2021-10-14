//Ruta de assets cartas 
let ruta = 'assets/cartas/'
/**
 * C=Trebol (Clubs)
 * H=Corazones (Hearts)
 * S=Espadas (Spades)
 * D=Diamantes (Diaminds)
 */
let tipos = ['C', 'H', 'S', 'D']
/**Reyes */
let reyes = ['A', 'J', 'Q', 'K']
//Baraja
let deck = [];
//Puntos
let pointsOfPlayer = 0,
    pointsOfComputer = 0;
//Referencia de botones html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
//Referencias de puntuajes de los jugadores
const pointsHtml = document.querySelectorAll('small');
//Referencia Cartas
const divCards = document.querySelector('#jugador-cartas')
const divCardsComputer = document.querySelector('#computadora-cartas');


const crearDeck = () => {
    for (let j = 0; j < tipos.length; j++) {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + tipos[j]);

            if (i == 10) {
                for (let rey of reyes) {
                    deck.push(rey + tipos[j]);
                }
            }
        }
    }

}
crearDeck();

//-.shuffle revuelve un array
deck = _.shuffle(deck);

//Pedir cartas
let burnedCard = [];

const pedirCarta = () => {
    const carta = deck.pop();
    burnedCard.push(carta);
    console.log(burnedCard);
    return carta;
}

//pedirCarta();
console.log({ deck });

//Valor carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        pointsOfComputer = pointsOfComputer + valorCarta(carta);
        pointsHtml[1].innerHTML = pointsOfComputer;

        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');

        imgCarta.src = `${ruta}${carta}.png`;
        divCardsComputer.append(imgCarta);
        if(puntosMinimos > 21){
            break;
        }
    } while ( (pointsOfComputer < puntosMinimos) && (puntosMinimos <= 21) );
    ganador(pointsOfPlayer,pointsOfComputer);
}
//Quien gano el juego?
const ganador = (player , computer) =>{
    setTimeout(() => {
        if(player > 21){
            alert("Derrotado por la maquina.");
        }else if(player == computer){
            alert("Empate, nadie gana.");
        }else{
            if(computer > 21){
                alert("Haz Ganado a la maquina.");
            }else if(computer > player ){
                alert("Derrotado por la maquina");
            }else{
                alert("Haz Ganado a la maquina.")
            }
        }
    }, 50); 
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    pointsOfPlayer = pointsOfPlayer + valorCarta(carta);

    pointsHtml[0].innerHTML = `${pointsOfPlayer}`;

    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `${ruta}${carta}.png`;
    divCards.append(imgCarta);

    if (pointsOfPlayer > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(pointsOfPlayer);
        burnedCard = [];

    } else if (pointsOfPlayer === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(pointsOfPlayer);
        burnedCard = [];
    }
    
});

btnDetener.addEventListener('click', ()=>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(pointsOfPlayer);
    burnedCard = [];
});

btnNuevo.addEventListener('click', ()=>{
    console.clear();

    crearDeck();
    deck = _.shuffle(deck);
    

    pointsOfComputer = 0;
    pointsOfPlayer = 0;
    burnedCard = [];

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    pointsHtml[0].innerHTML = '0';
    pointsHtml[1].innerHTML = '0';

    divCards.innerHTML = "";
    divCardsComputer.innerHTML = "";
})
