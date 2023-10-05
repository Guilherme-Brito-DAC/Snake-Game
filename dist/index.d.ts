declare const jogoElement: HTMLElement;
declare let pontos: number;
declare class Jogo {
    private colunas;
    private linhas;
    constructor();
    renderizarTiles(): void;
    gerarComida(): void;
    comeuComida(): void;
    atualizarPontos(): void;
}
declare class Cobra {
    private velocidadeX;
    private velocidadeY;
    private corpo;
    private jogo;
    private x;
    private y;
    constructor(_jogo: Jogo);
    colidiuComBorda(): boolean;
    colidiuComSiMesmo(): boolean;
    comeuComida(): boolean;
    moverCobra(): void;
}
declare function iniciarJogo(): void;
declare function numeroAleatorioEntre(minimo: any, maximo: any): number;
