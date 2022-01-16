using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GameShopWebApi.Models{

    public class Shop {
        [Key]
        public int ID{get; set;}
        public string Naziv { get; set; }
        public int N {get; set;}
        public int M {get; set;}

        [JsonIgnore]
        public List<Igrica> Igrice {get; set;}
    }
}