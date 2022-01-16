using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameShopWebApi.Models{
    
    public class Developer{
        [Key]
        public int ID {get; set;}
        public string Naziv {get; set;}
        public int GodinaZasnivanja {get; set;}
        public int BrojIgrica {get; set;}
        public int BrojIgricaNaStanju { get; set;}
    }
}