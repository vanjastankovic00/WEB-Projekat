import { Igrica } from "./Igrica.js";
import { Developer } from "./developer.js";
import { Shop } from "./shop.js";

// let shop = new Shop(1, "Nesto", 5, 5);
// shop.crtanjeForme(document.body);

fetch("https://localhost:5001/GameShop/PreuzimanjeShopova").then(p => {
    p.json().then(data => {
        data.forEach(shop => {
            let shop1 = new Shop(shop.id, shop.naziv, shop.n, shop.m);
            // console.log(shop1);
            shop1.drawingShop(document.body);

            shop1.igrice.forEach(igrica => {
                // console.log(igrica);

                fetch("https://localhost:5001/GameShop/PrikaziDevelopera").then(p => {
                    p.json().then(data => {
                        // console.log(data);
                        data.forEach(developer => {
                            if (developer.id == igrica.developerID)
                            {

                                let pom = new Developer(developer.id, developer.naziv, developer.godinaZasnivanja, developer.brojIgrica);

                                shop1.igrice[igrica.x * shop1.m + igrica.y].promeniIgricu(igrica.naziv, igrica.kolekcijaNaStanju,igrica.tip, igrica.x, igrica.y, pom.id);
                                
                            }
                        });
                    });
                });
            });
        });
    });
});