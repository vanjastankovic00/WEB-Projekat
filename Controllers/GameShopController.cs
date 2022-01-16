using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GameShopWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GameShopWebApi.Controllers{
    [ApiController]
    [Route("[controller]")]
    public class GameShopController : ControllerBase {

        public GameShopContext DbContext {get; set;}

        public GameShopController(GameShopContext context)
        {
            DbContext = context;
        }

        //Citaj
        [Route("PreuzimanjeShopova")]
        [HttpGet]
        public async Task<List<Shop>> PreuzimanjeShopova()
        {
            return await DbContext.Shops.Include(p => p.Igrice).ToListAsync();
        }

        //Napravi
        [Route("DodavanjeIgrice/{idShopa}")]
        [HttpPost]
        public async Task<IActionResult> UpisiIgricu(int idShopa, [FromBody] Igrica igrica){
            var gameshop = await DbContext.Shops.FindAsync(idShopa);
            var developer = await DbContext.Developeri.FindAsync(igrica.DeveloperID);

            igrica.Shop = gameshop;

            // if(DbContext.Igrice.Any(temp => temp.Naziv == igrica.Naziv && temp.Tip == igrica.Tip && (temp.X != igrica.X || temp.Y != igrica.Y)))
            // {
            //     var xy = DbContext.Igrice.Where(p => p.Tip == igrica.Tip).FirstOrDefault();
            //     return BadRequest(new { X = xy?.X, Y = xy?.Y});
            // }

            var temp = DbContext.Igrice.Where(p => p.X == igrica.X && p.Y == igrica.Y).FirstOrDefault();

            if(temp != null)
            {
                return StatusCode(406);
            }
            else
            {
                developer.BrojIgricaNaStanju++;
                DbContext.Igrice.Add(igrica);
                await DbContext.SaveChangesAsync();
                return Ok();
            }
            
                // developer.BrojIgricaNaStanju++;
                // DbContext.Igrice.Add(igrica);
                // await DbContext.SaveChangesAsync();
                // return Ok();
            
        }

        //Update

        [Route("UpdateKolicine")]
        [HttpPut]
        public async Task UpdateKolicine([FromBody] Igrica igrica){
            var tmp = DbContext.Igrice.Where(p => p.X == igrica.X && p.Y == igrica.Y).FirstOrDefault();
            tmp.KolicinaNaStanju = igrica.KolicinaNaStanju;

            DbContext.Update<Igrica>(tmp);
            await DbContext.SaveChangesAsync();
        }

        //Izbrisi
        [Route("BrisanjeIgrice")]
        [HttpDelete]
        public async Task<IActionResult> BrisanjeIgrice([FromBody] Igrica igrica)
        {
            var tmp = DbContext.Igrice.Where(p => p.X == igrica.X && p.Y == igrica.Y).FirstOrDefault();
            var developer = await DbContext.Developeri.FindAsync(igrica.DeveloperID);
            if(tmp != null)
            {
                developer.BrojIgricaNaStanju--;
                DbContext.Remove<Igrica>(tmp);
                await DbContext.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(406);
        }

        //Prikazi Developera
        [Route("PrikaziDevelopera")]
        [HttpGet]
        public async Task<List<Developer>> PrikaziDevelopera()
        {
            return await DbContext.Developeri.ToListAsync();
        }
    }
}