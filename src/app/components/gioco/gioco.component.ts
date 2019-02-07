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

    console.log(this.dimensioneGriglia);

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

  // Ad ogni mossa di un giocatore
  makeMove (riga:number,colonna:number) {

    if(!this.finito){ // Se il gioco non è finito

      if(this.griglia[riga][colonna].libero){ // Se il quadrato è libero
        this.mosse++;

        this.griglia[riga][colonna]=new Quadrato(this.giocatoreAttuale,false);
  
        this.checkWinVertical();
        this.checkWinHorizontal();
        this.checkWinDiagonal();
        this.cambiaGiocatore(); 

        console.log("MOSSA: "+this.mosse);
        if(this.mosse == (this.dimensioneGriglia*this.dimensioneGriglia) && !this.finito){
          this.messaggio="Gioco finito! E' finita Pari.";
          this.messaggio2=undefined;
        }
  
        
        
      }
  
      else{ // Se il quadrato è occupato
        console.log("Quadrato occupato!");
        this.messaggio="Quadrato occupato!";
      }
    }

    else {
      this.messaggio="Il gioco è finito! Clicca su Start Game per ricominciare";
      this.messaggio2=undefined;
    }


    
  }

  // Controlla la vincita di un giocatore (in orizzontale)
  checkWinHorizontal (){

    this.griglia.forEach( (riga) => {
        
      const rigaUguale = riga.reduce ( (a,b) => a.valore===b.valore ? a : false);

      if(rigaUguale.valore!="" && rigaUguale!=false){
        console.log("Vincita orizzontale Giocatore:" +this.giocatoreAttuale);
        this.vincita();
      }

    });

  }

  // Controlla la vincita di un giocatore (in verticale)
  checkWinVertical (){

    for(let i=0;i<this.griglia.length;i++){
      const colonna=[];
      for(let j=0;j<this.griglia[i].length;j++){
        colonna.push(this.griglia[j][i]);
      }

      const colonnaUguale = colonna.reduce ( (a,b) => a.valore===b.valore ? a : false);

      if(colonnaUguale.valore!="" && colonnaUguale!=false){
        console.log("Vincita verticale Giocatore:" +this.giocatoreAttuale);
        this.vincita();
      }

    }

  }

  // Controlla la vincita di un giocatore nelle due diagonali
  checkWinDiagonal (){
    
    const diagonale1 = [];
    const diagonale2 = [];

    for(let i=0;i<this.griglia.length;i++){
      diagonale1.push(this.griglia[i][i].valore);
      diagonale2.push(this.griglia[i][this.griglia.length-i]);
    }

    const diagonale1Uguale = diagonale1.reduce ( (a,b) => a===b ? a : false);

    if(diagonale1Uguale.valore!="" && diagonale1Uguale!=false){
      console.log("Vincita diagonale 1 Giocatore:" +this.giocatoreAttuale);
      this.vincita();
    }

    const diagonale2Uguale = diagonale2.reduce ( (a,b) => a===b ? a : false);

    if(diagonale2Uguale.valore!="" && diagonale2Uguale!=false){
      console.log("Vincita diagonale 2 Giocatore:" +this.giocatoreAttuale);
      this.vincita();
    }

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

  vincita (){
    this.finito=true;
    this.messaggio="Ha vinto il Giocatore: "+this.giocatoreAttuale;
    this.messaggio2=undefined;
  }



}
