// Definições
const bird = document.getElementById("bird");
const moldura = document.getElementById("moldura");

// Variáveis
let gravidade = 10;
let lastTime = null;
let birdY = bird.offsetTop;
let pulo = 14;
let interval;
let toque = false;
let podePular = true;
let velocidade = 4;
let canoR = 400;
let canoR2 = 400;
let colisao = false;
let espaçoEntre = 30;
let pontoMarcado = false;
let pontos = 0;
let faseAtual = -1; 

let velociN = 4;
let veloDT = 3;
let motivo = "";
let canoWidth = 70;
// invencibilidade
let invencivel = true;
// sistema de pontuacao

let recordeAtual = localStorage.getItem("recordeAtual");


if (recordeAtual === null) {
  recordeAtual = 0;
} else {
  recordeAtual = parseInt(recordeAtual);
}

if (pontos > recordeAtual) {
  recordeAtual = pontos;
  localStorage.setItem("recordeAtual", recordeAtual);
}
// Sistema de gravidade
function aplicarGravidade(time) {
	  if (lastTime === null) lastTime = time;
	  const delta = (time - lastTime) / 1000;
    birdY += gravidade * (delta * 60);
    bird.style.top = birdY + "px";
    
    
    lastTime = time;
    requestAnimationFrame(aplicarGravidade);
}

requestAnimationFrame(aplicarGravidade);

// Sistema de pulo
function saltar () {
    birdY -= pulo;
    bird.style.top = birdY + "px";
    
}
function pular () {
    birdY -= 1.5 * pulo;
    bird.style.top = birdY + "px";
}

// Touch e click
document.body.addEventListener("touchstart", () => {
    if (!toque) {
        interval = setInterval(saltar, 16);
        toque = true;
    }
});
document.body.addEventListener("touchend", () => {
    if (toque) {
        setTimeout(() => {
            toque = false;
            clearInterval(interval);
        }, 80);
    }
});
document.body.addEventListener("click", () => {
    if (podePular) {
        pular();
        podePular = false;
        setTimeout(() => {
            podePular = true;
        }, 100);
    }
});

// Animacao

// Criação de canos
cultimaAltura = 50;
function criarCanos() {
    let canoR = window.innerWidth;
    let canoR2 = window.innerWidth;
    let canoDinamico = Math.floor(Math.random() * 100)+1;

    const cano1 = document.createElement("div");
    cano1.classList.add("canosCima");
    cano1.pontoMarcado = false;

    const cano2 = document.createElement("div");
    cano2.classList.add("canosBaixo");

    let canoH;
    let canoH2 = 100 - espaçoEntre - canoH; 
    if (cultimaAltura > 70) {
  canoH = Math.floor(Math.random() * (70 - 50 - espaçoEntre) + 50);
  canoH2 = 100 - espaçoEntre - canoH;
    }
    if (cultimaAltura < 20) {
      canoH = Math.floor(Math.random() * (
        40 - 30 - espaçoEntre) + 30);
       canoH2 = 100 - espaçoEntre - canoH;
    } else {
         canoH = Math.floor(Math.random() * (100 - espaçoEntre));
    canoH2 = 100 - espaçoEntre - canoH; 
    }
    cultimaAltura = canoH;
    let velociCD = 0.2;
    let subindo = Math.random() < 0.5;
    function tornarCanoDinamico() {
      if (canoDinamico <= 10 && faseAtual === 1 || canoDinamico <= 10 && faseAtual === 2) {
        cano1.style.filter = "hue-rotate(60deg)";
        cano2.style.filter = "hue-rotate(60deg)";
        let CDinterval = setInterval(() => {
          if (subindo) {
            canoH-= velociCD;
            canoH2+= velociCD;
            cano1.style.height = canoH + "dvh";
            cano2.style.height = canoH2 + "dvh";
            if (subindo && canoH < 20){
              subindo = false;
            }
          } else if (!subindo) {
            canoH+= velociCD;
            canoH2-= velociCD;
            cano1.style.height = canoH + "dvh";
            cano2.style.height = canoH2 + "dvh";
            if (!subindo && canoH > 55 )
            subindo = true;
          }
        if (canoR < -100)
        clearInterval(CDinterval);
        }, 16);
      }
    }
    moldura.appendChild(cano1);
    moldura.appendChild(cano2);
    cano1.style.height = canoH + "dvh";
    cano2.style.height = canoH2 + "dvh";

    cano1.style.left = canoR + "px";
    cano2.style.left = canoR2 + "px";
    cano1.style.width = canoWidth + "px";
    cano2.style.width = canoWidth + "px";
    tornarCanoDinamico();
    function moverCanosRAF(){
        canoR -= velocidade;
        canoR2 -= velocidade;

        cano1.style.left = canoR + "px";
        cano2.style.left = canoR2 + "px";

        // Contar ponto
        if (!cano1.pontoMarcado && canoR + cano1.offsetWidth < bird.offsetLeft) {
            pontos++;
            cano1.pontoMarcado = true;
        }

        if (canoR < -100) {
            cano1.remove();
            cano2.remove();
        }
        requestAnimationFrame(moverCanosRAF)
        }
requestAnimationFrame(moverCanosRAF)
}

// Colisão
function Colisao() {
    colisao = false;
    const birdRect = bird.getBoundingClientRect();

    const canosCima = document.querySelectorAll(".canosCima");
    const canosBaixo = document.querySelectorAll(".canosBaixo");

    canosCima.forEach(cano => {
        const canoRect = cano.getBoundingClientRect();
        if (
            birdRect.left < canoRect.right &&
            birdRect.right > canoRect.left &&
            birdRect.top < canoRect.bottom &&
            birdRect.bottom > canoRect.top && invencivel === false
        ) {
            flashAtivar();
            shakeTela();
            motivo = "lascou o cranio no cano";
             setTimeout(telaGameOver, 60);
            colisao = true;
            
        }
    });

    if (birdRect.top < 0 || birdRect.bottom > window.innerHeight && invencivel === false) {
        flashAtivar();
        shakeTela();
        if (invencivel === true) { motivo = "O céu é o limite paizao"} else {
        motivo = "bateu na barreira invisivel";
        }
        setTimeout(telaGameOver, 60);
        colisao = true;
    }

    const placar = document.getElementById("placarpontos");
    placar.innerText = `Pontos: ${pontos}`;

    canosBaixo.forEach(cano => {
        const canoBaixoRect = cano.getBoundingClientRect();
        if (
            birdRect.left < canoBaixoRect.right &&
            birdRect.right > canoBaixoRect.left &&
            birdRect.top < canoBaixoRect.bottom &&
            birdRect.bottom > canoBaixoRect.top && invencivel === false
        ) {
            flashAtivar();
            shakeTela()
            motivo = "lascou o cranio no cano";
            setTimeout(telaGameOver, 60);
            colisao = true;
        }
    });

    return colisao;
}
// Progressão de dificuldade
let timerCriarCanos = 1400;
let intervalocanos = setInterval(criarCanos, timerCriarCanos);
let ultimoponto = -1;
function progressao() {
        
        if (pontos % 2 === 0 && pontos !== ultimoponto) {
          ultimoponto = pontos;
          velocidade += 0.75
          velocidade = Math.min(velocidade, 6);
          timerCriarCanos -= 50;
          timerCriarCanos = Math.max(timerCriarCanos, 800);
          clearInterval(intervalocanos);
          intervalocanos = setInterval(criarCanos, timerCriarCanos);
          }
          
          if (pontos <= 5 && faseAtual !== 0) {
            faseAtual = 0
            
          } else if (pontos >= 6 && pontos < 14 && faseAtual !== 1) {
            faseAtual = 1;
            espaçoEntre = 29
          } else if (pontos >= 14 && faseAtual !== 2) {
            faseAtual = 2;
            espaçoEntre = 29
          }
          if (pontos > 30 && pontos % 10 === 0 && espaçoEntre < 25) {
            espaçoEntre -= 1
          }
        
    }

progressao();

// Loop de colisão + progressão
const intervalo = setInterval(() => {
    if (Colisao()) {
        clearInterval(intervalo);
    }
    progressao();
}, 16);









// Game Over
function telaGameOver () {
    if (pontos > recordeAtual) { recordeAtual = pontos; }
    const gameOver = document.createElement("div");
    gameOver.classList.add("gameover");
    moldura.appendChild(gameOver);
    
    const gameOverB = document.createElement("button");
    gameOverB.classList.add("button");
    gameOver.appendChild(gameOverB);
    gameOverB.innerText = "tente novamente";
    const gameOverText = document.createElement("div");
    
gameOverText.classList.add("got")
gameOverText.innerText = "VOCE PERDEU!";
moldura.appendChild(gameOverText);
    const gameOverPlacar = 
    document.createElement("div");
    gameOverPlacar.classList.add("gameoverplacar");
    gameOverPlacar.innerHTML = `<h3>${motivo}</h3><p>Pontuação: ${pontos} | Recorde: ${recordeAtual}</p>`;
    moldura.appendChild(gameOverPlacar);
    document.body.style.pointerEvents = "none";
    gameOverB.style.pointerEvents = "auto";

    gameOverB.addEventListener("click", () => {
     if (pontos > recordeAtual)
localStorage.setItem("recordeAtual", pontos);
        gameOverB.remove();
        gameOver.remove();
        location.reload();
    });
}

// criar nuvens
function criarNuvens () { let nuvemX = window.innerWidth; const nuvem = document.createElement("div"); let altura = Math.floor(Math.random() * 81) + 10;

nuvem.style.top = altura + "dvh"; nuvem.style.left = nuvemX + "px"; nuvem.style.position = "absolute";

let sorteio = Math.floor(Math.random() * 6) + 1; if (sorteio <= 2) { nuvem.classList.add("nuvemp"); } else if (sorteio <= 5) { nuvem.classList.add("nuvemm"); } else { nuvem.classList.add("nuvemg"); }
if (pontos >= 15) {
        velociN = 6;
    }
moldura.appendChild(nuvem);

function moverNuvem() { nuvemX -= velociN; nuvem.style.left = nuvemX + "px";

if (nuvemX > -1000) { requestAnimationFrame(moverNuvem); } else { nuvem.remove(); } 

}

requestAnimationFrame(moverNuvem); }

setInterval(criarNuvens, 150);
// Mover montanhas 
const montanha1a = document.getElementById("montanha1a");
const montanha1b = document.getElementById("montanha1b");
const montanha2a = document.getElementById("montanha2a");
const montanha2b = document.getElementById("montanha2b");

const larguraTela = window.innerWidth;

let posM1a = 0;
let posM1b = larguraTela;
let posM2a = 0;
let posM2b = larguraTela;

const velM1 = 0.5;  
const velM2 = 0.3;

function moverMontanha(){
  // Montanha 1 (frente)
  posM1a -= velM1;
  posM1b -= velM1;

  if (posM1a <= -larguraTela) posM1a = larguraTela;
  if (posM1b <= -larguraTela) posM1b = larguraTela;

  montanha1a.style.left = posM1a + "px";
  montanha1b.style.left = posM1b + "px";

  // Montanha 2 (fundo)
  posM2a -= velM2;
  posM2b -= velM2;

  if (posM2a <= -larguraTela) posM2a = larguraTela;
  if (posM2b <= -larguraTela) posM2b = larguraTela;

  montanha2a.style.left = posM2a + "px";
  montanha2b.style.left = posM2b + "px";
  requestAnimationFrame(moverMontanha)
}
requestAnimationFrame(moverMontanha)

// Mover o chão
const chao1 = document.getElementById("chao");
const chao2 = document.getElementById("chao2");
const larguraTela2 = window.innerWidth;
let veloC = 4;
const larguraChao = chao1.offsetWidth;
let posXC = 0;
let posXC2 = larguraChao;

function moverOChao() {
  posXC -= veloC;
  posXC2 -= veloC;

  if (posXC <= -larguraChao) posXC = larguraChao;
  if (posXC2 <= -larguraChao) posXC2 = larguraChao;

  chao1.style.left = posXC + "px";
  chao2.style.left = posXC2 + "px";

  requestAnimationFrame(moverOChao);
}
requestAnimationFrame(moverOChao);
// mover o sol

    const sol = document.getElementById("sol");
const lua = document.getElementById("lua");

let solX = -70;
let luaX = -70;
let veloSol = 0.25;
let bordaEsquerda = window.innerWidth;
const meio = bordaEsquerda / 2; 
lua.style.opacity = "0"; 

function moverSol() {
  solX += veloSol;
  sol.style.left = solX + "px";

  if (solX >= meio && !document.body.classList.contains("media")) {
    document.body.classList.add("media");
  }

  if (solX >= bordaEsquerda && !document.body.classList.contains("escuro")) {
    document.body.classList.remove("media");
    document.body.classList.add("escuro");
  }

  if (solX < bordaEsquerda) {
    requestAnimationFrame(moverSol);
  } else {
    sol.style.opacity = "0";
    lua.style.opacity = "1";
    luaX = -70;
    requestAnimationFrame(moverLua);
  }
}

function moverLua() {
  luaX += veloSol;
  lua.style.left = luaX + "px";

  if (luaX < bordaEsquerda) {
    requestAnimationFrame(moverLua);
  } else {
    if (
      document.body.classList.contains("media") ||
      document.body.classList.contains("escuro")
    ) {
      document.body.classList.remove("media", "escuro");
    }

    lua.style.left = "20px";
    lua.style.opacity = "0";
    sol.style.opacity = "1";
    solX = -70;
    requestAnimationFrame(moverSol);
  }
}

requestAnimationFrame(moverSol);

// criar canos ao fundo
function criarCanosFundo() {
  let veloCF = 1;
  let posXCF = window.innerWidth;
  let cimabaixo = Math.floor(Math.random() * 2) + 1;
  let tamanhoCF = (Math.floor(Math.random() * 6) + 7) * 10;
  const fundoCano = document.createElement("div");

  fundoCano.classList.add("canofundo");
  fundoCano.style.height = tamanhoCF + "px";

  if (cimabaixo === 1) {
    fundoCano.classList.add("cima");
  } else {
    fundoCano.classList.add("baixo");
  }

  moldura.appendChild(fundoCano);

  function animar() {
    posXCF -= veloCF;
    fundoCano.style.left = posXCF + "px";

    if (posXCF > -100) {
      requestAnimationFrame(animar);
    } else {
      fundoCano.remove();
    }
  }
  
  requestAnimationFrame(animar);
}
setInterval (criarCanosFundo ,3000);

// pontos ino 
function criarPontos() {
  const dots = document.createElement("div");
  dots.classList.add("dots");

  let altura = Math.floor(Math.random() * 81) + 10;
  dots.style.top = altura + "dvh";

  
  let posXDT = window.innerWidth;
  dots.style.left = posXDT + "px";
  dots.style.position = "absolute";

  
  moldura.appendChild(dots);
  let dotsInterval = setInterval(() => {
    posXDT -= 5;
    dots.style.left = posXDT + "px";

    if (posXDT < -100) {
      dots.remove();
      clearInterval(dotsInterval);
    }
  }, 16);
}
setInterval(criarPontos, 800);
//animacoes
function flashAtivar () {
    const flash = document.getElementById("flash")
    flash.classList.add("ativo");
    setTimeout (() => {
 flash.classList.remove("ativo");
    }, 50);
}
function shakeTela() {
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 300);
}

// experimental
function moverElementoPor1Segundo(elemento, direcao) {
  if (elemento.estaAnimando) return;
  elemento.estaAnimando = true;

  const inicio = performance.now();
  let posY = parseFloat(getComputedStyle(elemento).top) / window.innerHeight * 100;

  function animar(agora) {
    const passou = agora - inicio;

    if (passou < 1000) {
      if (direcao === "sobe") posY -= 0.09;
      else if (direcao === "desce") posY += 0.09;

      elemento.style.top = posY + "dvh";
      requestAnimationFrame(animar);
    } else {
      elemento.estaAnimando = false;
    }
  }

  requestAnimationFrame(animar);
}

function criarBorboletas() {
  const borboletas = document.createElement("div");
  borboletas.classList.add("borboletas");
  let btfyX = window.innerWidth;
  let btfyY = Math.floor(Math.random() * 90) + 1;
  borboletas.style.top = btfyY + "dvh";
  let hue = Math.floor(Math.random() * 360);
  borboletas.style.filter = `hue-rotate(${hue}deg)`;

  function moverBorboletas() {
    btfyX -= 4;
    borboletas.style.left = btfyX + "px";
    if (btfyX < -100) {
      borboletas.remove();
    } else {
      requestAnimationFrame(moverBorboletas);
    }
  }

  moldura.appendChild(borboletas);
  moverBorboletas();
}
function variasBorboletas() {
    let btfyQuantidade = [2, 4, 6];
  let btfyIndice = Math.floor(Math.random() * btfyQuantidade.length);
  let btfyCriar = btfyQuantidade[btfyIndice];
  let btfyQuantastem = 0;
 let borboletasMax = document.querySelectorAll(".borboletas");
  if (borboletasMax.length < 6) {
    const criarBorboletasInterval = setInterval(() => {
    if (btfyQuantastem < btfyCriar) {
      criarBorboletas();
      btfyQuantastem++;
      console.log("criei rsrs");
    } else {
      clearInterval(criarBorboletasInterval);
    }
  }, 200);

}
}
function gerarAleatorio() {
  let oqGerar = Math.floor(Math.random() * 100);

  if (oqGerar <= 25) {
    const flor = document.createElement("div");
    let flor1ou2 = Math.floor(Math.random() * 2) + 1;
    if (flor1ou2 === 1) {
      flor.classList.add("flor1");
    } else {
      flor.classList.add("flor2");
    }

    let florX = window.innerWidth;
    function moverFlor() {
      florX -= 4;
      flor.style.left = florX + "px";
      requestAnimationFrame(moverFlor);
    }

    moldura.appendChild(flor);
    moverFlor();

  } else if (oqGerar <= 72) {
    const balao = document.createElement("div");
    let balaoX = window.innerWidth;
    balao.classList.add("balao");
    let posInicial = Math.floor(Math.random() * 70) + 1;
    balao.style.top = posInicial + "dvh";
    moldura.appendChild(balao);

    function decisaoBalao() {
      const topAtual = parseFloat(getComputedStyle(balao).top) / window.innerHeight * 100;
      let desceousobe = Math.floor(Math.random() * 6) + 1;

      if (desceousobe < 3 && topAtual < 80) {
        moverElementoPor1Segundo(balao, "sobe");
      } else if (desceousobe > 4 && topAtual > 20) {
        moverElementoPor1Segundo(balao, "desce");
      } else if (topAtual < 20) {
        moverElementoPor1Segundo(balao, "desce");
      } else if (topAtual > 80) {
        moverElementoPor1Segundo(balao, "sobe");
      }
    }

    decisaoBalao();

    const intervalId = setInterval(() => {
      if (!document.body.contains(balao)) {
        clearInterval(intervalId);
        return;
      }
      decisaoBalao();
    }, 1000);

    function moverOBalao() {
      balaoX -= 4;
      balao.style.left = balaoX + "px";

      if (balaoX < -100) {
        balao.remove();
        return;
      }

      requestAnimationFrame(moverOBalao);
    }

    moverOBalao();

} else if (oqGerar >= 73){
  variasBorboletas();
} else {
  // nada
}
}

setInterval(gerarAleatorio, 4000);
