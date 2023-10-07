const jogoElement = document.getElementById("jogo");
let pontos = 0;
class Jogo {
    constructor() {
        this.colunas = 16;
        this.linhas = 16;
        this.renderizarTiles();
        this.gerarComida();
        this.atualizarPontos();
    }
    renderizarTiles() {
        for (let y = 1; y <= this.linhas; y++) {
            for (let x = 1; x <= this.colunas; x++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.id = `${x}-${y}`;
                jogoElement.appendChild(tile);
            }
        }
    }
    gerarComida() {
        let gerar = false;
        do {
            var xAleatorio = numeroAleatorioEntre(1, 16);
            var yAleatorio = numeroAleatorioEntre(1, 16);
            var tile = document.getElementById(`${xAleatorio}-${yAleatorio}`);
            if (tile.classList.contains("cobra")) {
                gerar = true;
            }
            else {
                const comida = document.createElement("div");
                comida.classList.add("comida");
                tile.appendChild(comida);
                gerar = false;
            }
        } while (gerar);
    }
    comeuComida() {
        const comidas = document.querySelectorAll('.comida');
        comidas.forEach(comida => {
            comida.remove();
        });
        pontos++;
        this.gerarComida();
        this.atualizarPontos();
    }
    atualizarPontos() {
        document.getElementById("pontos").innerText = `Pontos: ${pontos}`;
    }
}
class Cobra {
    constructor(_jogo) {
        this.velocidadeX = 1;
        this.velocidadeY = 0;
        this.corpo = [];
        this.x = 8;
        this.y = 8;
        this.jogo = _jogo;
        let tileInicial = document.getElementById(`${this.x}-${this.y}`);
        tileInicial.classList.add("cobra");
        tileInicial.classList.add("cobra");
        this.moverCobra();
        this.corpo.push([this.x, this.y]);
        const intervalo = setInterval(() => {
            this.limparTiles();
            if (this.colidiuComBorda() || this.colidiuComSiMesmo()) {
                clearInterval(intervalo);
                iniciarJogo();
                return;
            }
            else {
                this.limparTiles();
                if (this.comeuComida()) {
                    this.jogo.comeuComida();
                    this.corpo.push([this.x, this.y]);
                }
                let tileAtual = document.getElementById(`${this.x}-${this.y}`);
                for (let i = this.corpo.length - 1; i > 0; i--) {
                    this.corpo[i] = this.corpo[i - 1];
                }
                if (tileAtual)
                    tileAtual.classList.remove("cobra");
                this.x += this.velocidadeX;
                this.y += this.velocidadeY;
                this.corpo[0] = [this.x, this.y];
                for (let i = 0; i < this.corpo.length; i++) {
                    let x = this.corpo[i][0];
                    let y = this.corpo[i][1];
                    let proximoTile = document.getElementById(`${x}-${y}`);
                    if (proximoTile) {
                        proximoTile.classList.add("cobra");
                        if (i != 0) {
                            proximoTile.style.opacity = `${(1 / i) + 0.2}`;
                        }
                        else {
                            proximoTile.style.boxShadow = "0 0 30px 5px rgb(0, 149, 255)";
                        }
                    }
                }
            }
        }, 100);
    }
    limparTiles() {
        Array.from(jogoElement.children).forEach((x) => {
            x.classList.remove("cobra");
            document.getElementById(x.id).style.opacity = "1";
            document.getElementById(x.id).style.boxShadow = "";
        });
    }
    colidiuComBorda() {
        if (this.x > 16 || this.x < 1 || this.y > 16 || this.y < 1)
            return true;
        return false;
    }
    colidiuComSiMesmo() {
        let x = this.x + this.velocidadeX;
        let y = this.y + this.velocidadeY;
        let proximoTile = document.getElementById(`${x}-${y}`);
        if (proximoTile && proximoTile.classList.contains("cobra"))
            return true;
        return false;
    }
    comeuComida() {
        let tileAtual = document.getElementById(`${this.x}-${this.y}`);
        if (tileAtual.firstElementChild)
            return tileAtual.firstElementChild.classList.contains("comida");
        return false;
    }
    moverCobra() {
        document.addEventListener('keydown', (event) => {
            let codigo = event.key;
            switch (codigo) {
                case "ArrowUp":
                    if (this.velocidadeY != 1) {
                        this.velocidadeX = 0;
                        this.velocidadeY = -1;
                    }
                    break;
                case "ArrowDown":
                    if (this.velocidadeY != -1) {
                        this.velocidadeX = 0;
                        this.velocidadeY = 1;
                    }
                    break;
                case "ArrowLeft":
                    if (this.velocidadeX != 1) {
                        this.velocidadeX = -1;
                        this.velocidadeY = 0;
                    }
                    break;
                case "ArrowRight":
                    if (this.velocidadeX != -1) {
                        this.velocidadeX = 1;
                        this.velocidadeY = 0;
                    }
                    break;
                default:
                    break;
            }
        }, false);
    }
}
window.onload = () => {
    iniciarJogo();
};
function iniciarJogo() {
    jogoElement.innerHTML = "";
    const jogo = new Jogo();
    const cobra = new Cobra(jogo);
    pontos = 0;
}
/* UTIL */
function numeroAleatorioEntre(minimo, maximo) {
    minimo = Math.ceil(minimo);
    maximo = Math.floor(maximo);
    return Math.floor(Math.random() * (maximo - minimo) + minimo);
}
