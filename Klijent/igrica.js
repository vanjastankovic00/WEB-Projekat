export class Igrica {
    constructor(id, naziv, tip, developer, x, y){
        this.id = id;
        this.naziv = naziv;
        this.tip = tip;
        this.kolekcijaNaStanju = 0;
        this.developer = developer;
        this.x = x;
        this.y = y;
        this.kontejner = null;
    }

    bojaPolja(){
        if (!this.tip){
            return "white";
        }
        else {
            return this.tip;
        }
    }

    crtanjeIgrica(gde){
        this.kontejner = document.createElement("div");
        this.kontejner.className = "igrica";
        this.kontejner.innerHTML = "Slobodno mesto";
        
        this.kontejner.style.backgroundColor = this.bojaPolja();
        gde.appendChild(this.kontejner);
    }

    promeniPolje(){
        this.kontejner.innerHTML = this.naziv + ", od " + this.developer.naziv + " Na stanju: " + this.kolekcijaNaStanju;
    }

    promeniIgricu(naziv, kolekcijaNaStanju, tip, x, y, developer){
        this.naziv = naziv;
        this.kolekcijaNaStanju = kolekcijaNaStanju;
        this.tip = tip;
        this.x = x;
        this.y = y;
        this.developer = developer;

        if(naziv == "")
        {
            this.kontejner.innerHTML = "Slobodno mesto";
        }
        else
        {
            this.promeniPolje();
        }
        // this.promeniPolje();
        this.kontejner.style.backgroundColor = this.bojaPolja();
    }

    promeniKolicinu(kolicina){
        this.kolekcijaNaStanju = kolicina;

        this.promeniPolje();
    }
}