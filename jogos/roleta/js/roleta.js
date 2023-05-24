//=====================ROLETA=====================//
//ado a ado quem leu isso é viado
var colors = ["#B8D430",
"#C51A29",
"#DF9C34",
"#C51A29",
"#DF9C34",
"#C51A29",
"#DF9C34",
"#C51A29",
"#DF9C34",
"#C51A29",
"#DF9C34",
"#C51A29",
"#DF9C34",
"#C51A29",
"#DF9C34",
"#C51A29"];
var virtudes = ["1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16"];

var startAngle = 0;
var arc = Math.PI / 8;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

function draw() {
drawRouletteWheel();
}

function drawRouletteWheel() {
var canvas = document.getElementById("wheelcanvas");
if (canvas.getContext) {
var outsideRadius = 300;
var textRadius = 240;
var insideRadius = 1;

ctx = canvas.getContext("2d");
ctx.clearRect(0,0,1000,1000);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.font = 'bold 48px sans-serif';

for(var i = 0; i < 16; i++) {
var angle = startAngle + i * arc;
ctx.fillStyle = colors[i];

ctx.beginPath();
ctx.arc(400, 400, outsideRadius, angle, angle + arc, false);
ctx.arc(400, 400, insideRadius, angle + arc, angle, true);
ctx.stroke();
ctx.fill();

ctx.save();
ctx.shadowOffsetX = -1;
ctx.shadowOffsetY = -1;
ctx.shadowBlur    = 0;
ctx.shadowColor   = "rgb(220,220,220)";
ctx.fillStyle = "black";
ctx.translate(400 + Math.cos(angle + arc / 2) * textRadius, 400 + Math.sin(angle + arc / 2) * textRadius);
ctx.rotate(angle + arc / 2 + Math.PI / 2);
var text = virtudes[i];
ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
ctx.restore();
}

//arco
ctx.fillStyle = "black";
ctx.beginPath();
ctx.moveTo(400 - 4, 400 - (outsideRadius + 5));
ctx.lineTo(400 + 4, 400 - (outsideRadius + 5));
ctx.lineTo(400 + 4, 400 - (outsideRadius - 5));
ctx.lineTo(400 + 9, 400 - (outsideRadius - 5));
ctx.lineTo(400 + 0, 400 - (outsideRadius - 13));
ctx.lineTo(400 - 9, 400 - (outsideRadius - 5));
ctx.lineTo(400 - 4, 400 - (outsideRadius - 5));
ctx.lineTo(400 - 4, 250 - (outsideRadius + 5));
ctx.fill();
}
}

function spin() {
spinAngleStart = Math.random() * 10 + 10;
spinTime = 0;
spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
  setTimeout(function() {
    var number = document.getElementById("number").value;
    var resultado = virtudes[startAngle / arc];
    if (number == resultado) {
      mostrarMensagem("Você ganhou!");
    } else {
      mostrarMensagem("Você perdeu!");
    }
  }, spinTimeTotal);

}

function rotateWheel() {
spinTime += 30;
if(spinTime >= spinTimeTotal) {
stopRotateWheel();
return;
}
var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
startAngle += (spinAngle * Math.PI / 180);
drawRouletteWheel();
spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 72px sans-serif';
    var text = virtudes[index]
    ctx.fillText(text, 400 - ctx.measureText(text).width / 2, 400 + 30);
    ctx.restore();
  
}  

function easeOut(t, b, c, d) {
var ts = (t/=d)*t;
var tc = ts*t;
return b+c*(tc + -3*ts + 3*t);
}
//desenha roleta
draw();

//===============OUTRAS FUNCIONALIDADES===============//
function mostrarMensagem(resultado) {
    var mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = resultado;
  }
  
  var fichasIniciais = document.getElementById("fichas").value;
  var fichasPerdidas = 0;
  
  function apostar() {
    var number = document.getElementById("number").value;
    var fichas = document.getElementById("fichas").value;
    var valor = document.getElementById("valor-ficha").value;
  
    if (number && fichas && valor) {
      if (number < 1 || number > 16) {
        alert("Por favor, escolha um número de 1 a 16.");
        return;
      }
  
      valorFicha = parseInt(valor);
      var valorTotal = parseInt(fichas) * valorFicha;
      var resultado = spin();
  
      if (resultado !== number) {
        fichasPerdidas++;
        fichas = parseInt(fichas) - fichasPerdidas;
      } else {
        fichasPerdidas = 0;
      }
  
      if (fichas <= 0) {
        alert("O jogo acabou! Você ficou sem fichas.");
        return;
      }
  
      document.getElementById("fichas-restantes").innerHTML = fichas;
      document.getElementById("fichas").value = fichas;
    } else {
      alert("Por favor, escolha um número e informe a quantidade e valor de fichas.");
    }
  }
  