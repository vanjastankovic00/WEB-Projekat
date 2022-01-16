import { Igrica } from "./Igrica.js";
import { Developer } from "./developer.js";

export class Shop{

    constructor(id, naziv, n, m){
        this.id = id;
        this.naziv = naziv;
        this.n = n;
        this.m = m;
        this.igrice = [];
        this.developeri = [];
        this.kontejner = null;
    }

    dodajIgicu(igrca){
        this.igrice.push(igrca);
    }

    dodajDevelopera(developer){
        this.developeri.push(developer);
    }

    drawingShop(gde){
        if(!gde)
        throw new Error ("Ne postoji roditeljski element");

        let naslov = document.createElement("h2");
        naslov.innerHTML = this.naziv;
        gde.appendChild(naslov);

        this.kontejner = document.createElement("div");
        this.kontejner.className = "kontejner";
        gde.appendChild(this.kontejner);
        this.crtanjeForme(this.kontejner);
        this.crtanjeIgrica(this.kontejner);
    }

    crtanjeForme(gde){
        this.kontejner = document.createElement("div");
        this.kontejner.className = "forma";
        gde.appendChild(this.kontejner);

        var labela = document.createElement("h3");
        labela.innerHTML = "Dodavanje igrice u Shopu";
        this.kontejner.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Naziv Igrice: ";
        this.kontejner.appendChild(labela);

        let naziv = document.createElement("input");
        naziv.className = "naziv";
        this.kontejner.appendChild(naziv);

        labela = document.createElement("label");
        labela.innerHTML = "Kolicina na stanju: ";
        this.kontejner.appendChild(labela);

        let element = document.createElement("input");
        element.className = "kolicina";
        element.type = "number";
        this.kontejner.appendChild(element);

        let tipoviIgrice = ["Akcija", "Avantura", "Role-Play", "Strategija", "Sport"];
        let bojeTipova = ["#96bb7c", "#9de5ff", "#f4ebc1", "#e27802", "#f05454"];
        
        let radioButton = null;
        let opcija = null;
        let rbDiv = null;

        tipoviIgrice.forEach((tip, index) => {
            rbDiv = document.createElement("div");
            rbDiv.className = "radioBurrons";
            radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = this.naziv;
            radioButton.value = tipoviIgrice[index];
            
            opcija = document.createElement("label");
            opcija.innerHTML = tip;

            rbDiv.appendChild(radioButton);
            rbDiv.appendChild(opcija);
            this.kontejner.appendChild(rbDiv);
        });

        let developerDiv = document.createElement("div");
        let developerSelect = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Developer: ";
        developerDiv.appendChild(labela);
        developerDiv.appendChild(developerSelect);

        let select = null;

        select = document.createElement("option");
        select.innerHTML = "";
        select.value = null;
        developerSelect.appendChild(select);

        fetch("https://localhost:5001/GameShop/PrikaziDevelopera").then(p => {
            p.json().then(data => {
                data.forEach(developer => {
                    let dev = new Developer(developer.id, developer.naziv, developer.godinaZasnivanja, developer.brojIgrica);
                    this.dodajDevelopera(dev);

                    select = document.createElement("option");
                    select.innerHTML = dev.naziv;
                    select.value = dev.naziv;
                    developerSelect.appendChild(select);
                });
            });
        });

        this.kontejner.appendChild(developerDiv);

        const buttonDeveloper = document.createElement("button");
        buttonDeveloper.className = "button";
        buttonDeveloper.innerHTML = "Prikaz informacija o developeru";
        this.kontejner.appendChild(buttonDeveloper);

        //Obrada Klika na Dugme
        buttonDeveloper.onclick = (ev) => {

            fetch("https://localhost:5001/GameShop/PrikaziDevelopera").then(p => {
                p.json().then(data => {
                    data.forEach((developer => {
                        if(developer.naziv == developerSelect.value)
                        {
                            let tmp = "Developer: " + developer.naziv + "\nGodina osnivanja: " + developer.godinaZasnivanja + "\nBroj izdatih igrica: " + developer.brojIgrica
                                                    + "\nTrenutni broj igirca u Shopu " + developer.brojIgricaNaStanju;

                            alert(tmp);
                        }
                    }))
                })
            });
            
        }

            labela = document.createElement("label");
            labela.innerHTML = "Izaberite poziciju igrice";
            this.kontejner.appendChild(labela);

            let pozicijaDiv = document.createElement("div");
            let vrsta = document.createElement("select");
            labela = document.createElement("label");
            labela.innerHTML = "Vrsta(X): ";
            pozicijaDiv.appendChild(labela);
            pozicijaDiv.appendChild(vrsta);

            let x = null;

            for(let i = 0; i < this.n; i++)
            {
                x = document.createElement("option");
                x.innerHTML = i;
                x.value = i;
                vrsta.appendChild(x);
            }

            this.kontejner.appendChild(pozicijaDiv);

            pozicijaDiv = document.createElement("div");
            let kolona = document.createElement("select");
            labela = document.createElement("label");
            labela.innerHTML = "Kolona(Y): ";
            pozicijaDiv.appendChild(labela);
            pozicijaDiv.appendChild(kolona);

            let y = null;

             for(let j = 0; j < this.m; j++)
            {
                y = document.createElement("option");
                y.innerHTML = j;
                y.value = j;
                kolona.appendChild(y);
            }


            this.kontejner.appendChild(pozicijaDiv);

            let button = document.createElement("button");
            button.className = "button";
            button.innerHTML = "Dodaj igricu u Shopu";
            this.kontejner.appendChild(button);

            //Post
            button.onclick = (ev) => {
                let naziv = String(this.kontejner.querySelector(".naziv").value);
                console.log(naziv);
                let kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
                
                let tip = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`).value;
                console.log(tip);
                let developerSelected = developerSelect.value;
                let developer = this.developeri.find(developer => developer.naziv == developerSelected);

                if(naziv == "")
                {
                    alert("Unesite naziv!!!");
                }
                else if(isNaN(kolicina))
                {
                    alert("Unesite kolicinu!!!");
                }
                else if(tip == null)
                {
                    alert("Izaberite Tip!!!");
                }
                else if(developerSelect == null)
                {
                    alert("Izaberite developera!!!");
                }
                else{

                    let i = parseInt(vrsta.value);
                    let j = parseInt(kolona.value);

                    fetch("https://localhost:5001/GameShop/DodavanjeIgrice/" + this.id, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "naziv": naziv,
                            "tip": tip,
                            "kolicinaNaStanju": kolicina,
                            "x": i,
                            "y": j,
                            "developerID": developer.id
                        })
                    }).then(p => {
                        console.log(p);
                        if(p.status == 200) {
                            console.log(naziv);
                            this.igrice[i * this.m + j].promeniIgricu(naziv, kolicina, tip.value, i, j, developer);
                            developer.updateDeveloper(1);
                        }
                        else if(p.status == 400) {
                            const zauzetomesto = {x: 0, y: 0};
                            p.json().then(q => {
                                zauzetomesto.x = q.x;
                                zauzetomesto.y = q.y;
                                alert("Igrica je vec na poziciji (" + (zauzetomesto.x ) + ", " + (zauzetomesto.y ) + ")");
                            });
                        }
                        else if (p.status == 409) {
                            alert ("Ukoliko zelite da izmenite kolicinu na stanju, kliknite na \"Azuriraj kolicinu\" dugme!\nZa ostale izmene izbrisite igricu iz shopa i dodajte iznova.")
                        }
                        else {
                            alert("Greska prilikom dodavanja igrice");
                        }
                    });

                }
                

            }

            let button1 = document.createElement("button");
            button1.className = "button";
            button1.innerHTML = "Azuriraj kolicinu";
            this.kontejner.appendChild(button1);

            //PUT

            button1.onclick = (ev) => {
                let kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
                console.log(kolicina);
                let i = parseInt(vrsta.value);
                let j = parseInt(kolona.value);
                console.log(i);
                console.log(j);

                fetch("https://localhost:5001/GameShop/UpdateKolicine", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        "kolicinaNaStanju": kolicina,
                        "x": i,
                        "y": j
                    })
                }).then(p => {
                    console.log(p);
                    if(p.ok)
                    {
                        this.igrice[i * this.m + j].promeniKolicinu(kolicina);
                    }
                    else{
                        alert("Doslo je do greske prilikom azuriranja kolicine");
                    }
                });
            }

            //Delete 

            let button2 = document.createElement("button");
            button2.className = "button";
            button2.innerHTML = "Izbrisi igricu";
            this.kontejner.appendChild(button2);

            button2.onclick = (ev) => {

                let i = parseInt(vrsta.value);
                let j = parseInt(kolona.value);

                let tmp = this.igrice.find(igrica => igrica.x == i && igrica.y == j);
                console.log(tmp.developer.id);
                let developerSelected = developerSelect.value;
                let developer = this.developeri.find(developer => developer.naziv == developerSelected);
                console.log(developer);

                fetch("https://localhost:5001/GameShop/BrisanjeIgrice", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        "x": i,
                        "y": j,
                        "developerID": developer.id
                    })
                }).then(p => {
                    console.log(p);
                    if(p.ok)
                    {
                        // this.igrice[i * this.m + j].developer.updateDeveloper(0);
                        this.igrice[i * this.m + j].promeniIgricu("", 0, "", i, j, null);
                    }
                    else if (p.status == 406)
                    {
                        alert("Lose izabrana pozicija!");
                    }
                    else{
                        alert("Doslo je do greske prilikom brisanja podatka");
                    }
                });


            }

    }

    crtanjeIgrica(gde){
        let kontejnerIgre = document.createElement("div");
        kontejnerIgre.className = "kontejnerIgre";
        gde.appendChild(kontejnerIgre);

        let vrsta;
        let igra;

        for(let i = 0; i < this.n; i++){
            vrsta = document.createElement("div");
            vrsta.className = "vrsta";
            kontejnerIgre.appendChild(vrsta);
            
            for(let j = 0; j < this.m; j++) {
                igra = new Igrica("", "", "","", i, j);
                this.dodajIgicu(igra);
                igra.crtanjeIgrica(vrsta);
            }
        }
    }

}