using Microsoft.AspNetCore.SignalR;
using System;

namespace MineGame
{
    public class Game : Hub
    {
        static Random rand = new Random();
          static int mine_pos;
        static string[] names = [];

      

          static Game()
        {
            Console.WriteLine("ctr called");
            get_mine();
     
        }

        public override Task OnConnectedAsync()
        {
            return first();
        }

        Task first()
        {
            return Task.Factory.StartNew(() => { 
                
            });
        }


        static void get_mine()
        {
            mine_pos = (rand.Next() % 100);
            
        }
        

        public async Task SendMessage(string i , string j)
        {
            

            if (mine_pos == int.Parse(i + j)) 
            { 
                reload();
            }
            else {
                await Clients.All.SendAsync("ReceiveMessage", i, j,mine_pos);
            }
        }

        public  async Task reload()
        {
            get_mine();
            
            await Clients.All.SendAsync("reload");
        }

    }
}
