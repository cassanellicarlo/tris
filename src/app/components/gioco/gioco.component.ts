import { Component, OnInit } from '@angular/core';
import { Quadrato } from 'src/app/models/Quadrato';

@Component({
  selector: 'app-gioco',
  templateUrl: './gioco.component.html',
  styleUrls: ['./gioco.component.css']
})
export class GiocoComponent implements OnInit {

  griglia = [];
  dimensioneGriglia: number=3;
  giocatore1:string= "X";
  giocatore2:string = "O";
  giocatori = [this.giocatore1, this.giocatore2];
  giocatoreAttuale:string;
  mosse:number;
  messaggio:string; 
  messaggio2:string;
  finito:boolean;


  constructor() {
  }

  ngOnInit() {
  }

  // Inizializzazione del gioco
  initGame (){

    this.griglia=[];
    this.giocatoreAttuale = this.giocatori[0]; // Inizia il giocatore 1 ("X")
    this.messaggio2="Tocca al Giocatore: "+this.giocatoreAttuale;
    this.mosse=0;
    this.messaggio=undefined;
    this.finito=false;

    // Inizializzazione della matrice
    for(let i=0;i<this.dimensioneGriglia;i++){
      this.griglia[i]=[];
      for(let j=0;j<this.dimensioneGriglia;j++){
        this.griglia[i][j]=new Quadrato("",true);
      }
    }

  }

  // Mossa di un giocatore
  makeMove (riga:number,colonna:number) {

    if(!this.finito){ // Se il gioco non è finito

      if(this.griglia[riga][colonna].libero){ // Se il quadrato è libero
        
        this.mosse++;
        this.griglia[riga][colonna]=new Quadrato(this.giocatoreAttuale,false);

        this.checkRow(riga); 
        this.checkColumn(colonna);
        this.checkDiagonals();
        this.cambiaGiocatore(); 

        if(this.mosse == (this.dimensioneGriglia*this.dimensioneGriglia) && !this.finito){
          this.messaggio="Gioco finito! E' finita Pari.";
          this.messaggio2=undefined;
        }       
        
      }
  
      else{ // Se il quadrato è occupato
        this.messaggio="Quadrato occupato!";
      }
    }

    else {
      this.messaggio="Il gioco è finito! Clicca su Start Game per ricominciare";
      this.messaggio2=undefined;
    }    

  }

  // Controlla la vincita di un giocatore su una riga
  checkRow (riga:number){
    const rigaUguale = this.checkAllEquals(this.griglia[riga]);
    this.checkWin(rigaUguale);
  }

  // Controlla la vincita di un giocatore su una colonna
  checkColumn (colonna:number){
    const col=[];
    for(let i=0;i<this.dimensioneGriglia;i++){
      col.push(this.griglia[i][colonna]);
    }
    const colonnaUguale = this.checkAllEquals(col);
    this.checkWin(colonnaUguale);
  }

  // Controlla la vincita di un giocatore nelle due diagonali
  checkDiagonals (){
    
    const diagonale1 = [];
    const diagonale2 = [];

    for(let i=0;i<this.dimensioneGriglia;i++){
      diagonale1.push(this.griglia[i][i]);
      diagonale2.push(this.griglia[i][this.dimensioneGriglia-1-i]);
    }

    const diagonale1Uguale = this.checkAllEquals(diagonale1);
    const diagonale2Uguale = this.checkAllEquals(diagonale2);

    this.checkWin(diagonale1Uguale);
    this.checkWin(diagonale2Uguale);

  }

  // Controlla il valore passato alla fine della reduce
  // Se è diverso da false l'array contiene valori tutti uguali e il giocatore ha vinto
  checkWin (result){
    if(result!=false){
      this.vincita();
    }
  }

  // Controlla se gli elementi dell'array passato sono tutti uguali
  checkAllEquals (array){
    return array.reduce ( (a,b) => a.valore===b.valore && a.valore!="" ? a : false);
  }

  // Cambio il giocatore attuale ad ogni mossa
  cambiaGiocatore (){
    if(this.giocatoreAttuale == this.giocatori[0]) this.giocatoreAttuale=this.giocatori[1];
    else this.giocatoreAttuale=this.giocatori[0];

    if(!this.finito) {
      this.messaggio2="Tocca al Giocatore: "+this.giocatoreAttuale;
      this.messaggio=undefined;

    }
  }

  // Vincita di un giocatore e fine del gioco
  vincita (){
    this.finito=true;
    this.messaggio="Ha vinto il Giocatore: "+this.giocatoreAttuale;
    this.messaggio2=undefined;
  }



}
