class Cell {
    private bomb: boolean;
    private flag = false;

    constructor(bomb: boolean) {
        this.bomb = bomb;
    }

    setBomb(state: boolean){
        this.bomb = state;
    }

    setFlag(state: boolean){
        this.flag = state;
    }

    getBomb(): boolean{
        return this.bomb;
    }

    getFlag(): boolean{
        return this.flag;
    }
}


class Board{
    private board: Cell[];
    private xSize: number;
    private ySize: number;
    private numBombs: number;

    constructor(xSize: number, ySize: number, numBombs:number){
        this.xSize = xSize;
        this.ySize = ySize;
        this.numBombs = numBombs;
        this.board = new Array<Cell>(xSize * ySize);
        Object.seal(this.board);
        genBombs(numBombs);

    }

    private genBombs(numBombs: number){
        let genBombCounter = 0;

        while(genBombCounter < numBombs){

            const xBomb = Math.floor(Math.random() * this.xSize);
            const yBomb = Math.floor(Math.random() * this.ySize);

            const linearPosition = (yBomb * xSize) + xBomb;

            if (!board[linearPosition].getBomb()){
                board[linearPosition].setBomb(true);
                genBombCounter = genBombCounter + 1;
            }


        }
    }
}
