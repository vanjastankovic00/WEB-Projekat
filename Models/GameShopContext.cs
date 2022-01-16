using Microsoft.EntityFrameworkCore;

namespace GameShopWebApi.Models {
    public class GameShopContext : DbContext {

        public GameShopContext(DbContextOptions options) : base(options){

        }

        public DbSet<Shop> Shops {get; set;}
        public DbSet<Igrica> Igrice {get; set;}
        public DbSet<Developer> Developeri {get; set;}
    }
}