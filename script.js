const html = document.querySelector("html");

const timer = document.getElementById("timer");
const image = document.querySelector(".app__image");
const title = document.querySelector(".app__title");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.getElementById("start-pause");

const alternarMusica = document.getElementById("alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

let intervaloId = null;

const tempFoco = 1500;
const tempCurto = 300;
const tempLongo = 900;

let tempoDecorridoEmSegundos = tempFoco;

focoBt.addEventListener("click", (evt) => {
  tempoDecorridoEmSegundos = tempFoco;

  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", (evt) => {
  tempoDecorridoEmSegundos = tempCurto;

  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", (evt) => {
  tempoDecorridoEmSegundos = tempLongo;

  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

alternarMusica.addEventListener("change", (evt) => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

startPauseBt.addEventListener("click", (evt) => {
  iniciarOuPausar();
});

function alterarContexto(contexto) {
  zerar();
  mostrarTempo();

  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  image.setAttribute("src", `./imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `;
      break;

    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `;
      break;

    case "descanso-longo":
      title.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    const somTermino = new Audio("/sons/beep.mp3");
    somTermino.play();

    zerar();

    return;
  }

  mostrarTempo();
};

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();

    const somPausa = new Audio("/sons/pause.mp3");
    somPausa.play();

    return;
  }

  intervaloId = setInterval(contagemRegressiva, 1000);

  const somInicio = new Audio("/sons/play.wav");
  somInicio.play();

  startPauseBt.firstElementChild.setAttribute("src", "/imagens/pause.png");
  startPauseBt.lastElementChild.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;

  startPauseBt.firstElementChild.setAttribute("src", "/imagens/play_arrow.png");
  startPauseBt.lastElementChild.textContent = "Começar";
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
