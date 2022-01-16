export class Developer {
    constructor(id, naziv, godinaZasnivanja, brojIgrica){
        this.id = id;
        this.naziv = naziv;
        this.godinaZasnivanja = godinaZasnivanja;
        this.brojIgrica = brojIgrica;
        this.brojIgricaNaStanju = 0;
    }

    updateDeveloper(plusminus){
        if(plusminus == 1){
            this.brojIgricaNaStanju++;
        }
        else{
            this.brojIgricaNaStanju--;
        }
    }

}