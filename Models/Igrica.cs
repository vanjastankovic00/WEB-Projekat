using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GameShopWebApi.Models{
    public class Igrica{
        [Key]
        public int ID {get; set;}

        public string Naziv {get; set;}

        public string Tip {get; set;}

        public int KolicinaNaStanju {get; set;}

        public int X {get; set;}
        public int Y{get; set;}

        public int DeveloperID {get; set;}

        [JsonIgnore]
        public Developer Developer{get; set;}
        [JsonIgnore]
        public Shop Shop{get; set;}

    }
}