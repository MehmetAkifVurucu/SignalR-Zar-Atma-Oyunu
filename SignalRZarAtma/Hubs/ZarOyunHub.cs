using Microsoft.AspNet.SignalR;
using SignalRZarAtma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRZarAtma.Hubs
{
    public class ZarOyunHub : Hub
    {
        public static List<Oyun> oyuns = new List<Oyun>();

        public void OyuncuEkle(string kullaniciAdi, string salonKodu)
        {

            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ZarOyunHub>();
            if (!oyuns.Exists(x => x.SalonKodu == salonKodu))
            {
                oyuns.Add(new Oyun
                {
                    KullaniciAdi = kullaniciAdi,
                    ConnectionId = ConnectionIdGetir(),
                    SalonKodu = salonKodu,
                    Zar1 = 0,
                    Zar2 = 0,
                    Sira = false
                });
                context.Clients.Client(ConnectionIdGetir()).RakipOyuncuBekleniyor();
            }
            else if (oyuns.Exists(x => x.SalonKodu == salonKodu) && oyuns.Count(x => x.SalonKodu == salonKodu) == 1)
            {
                var oyuncu = oyuns.FirstOrDefault(x => x.SalonKodu == salonKodu);
                oyuncu.Sira = true;
                oyuns.Add(new Oyun
                {
                    KullaniciAdi = kullaniciAdi,
                    ConnectionId = ConnectionIdGetir(),
                    SalonKodu = salonKodu,
                    Zar1 = 0,
                    Zar2 = 0,
                    Sira = false
                });
                context.Clients.Client(ConnectionIdGetir()).RakipOyuncununSirasi();
                context.Clients.Client(oyuncu.ConnectionId).OyunaBasla();
            }
            else
            {
                context.Clients.Client(ConnectionIdGetir()).SalondaOyunDevamEdiyor();
            }
        }

        public void PuanEkle(string kullaniciAdi, string salonkodu, int puan)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ZarOyunHub>();
            var rakipoyuncu = oyuns.FirstOrDefault(x => x.SalonKodu == salonkodu && x.KullaniciAdi != kullaniciAdi);
            var oyuncu = oyuns.FirstOrDefault(x => x.SalonKodu == salonkodu && x.KullaniciAdi == kullaniciAdi);
            List<OyuncuBilgi> salondakiOyuncular = new List<OyuncuBilgi>();
            List<string> kullanicilar = new List<string>();
            var liste = oyuns.Where(x => x.SalonKodu == salonkodu).ToList();
            if (oyuncu.Zar1 != 0 && oyuncu.Zar2 == 0)
            {
                oyuncu.Zar2 = puan;
                oyuncu.Sira = false;
                rakipoyuncu.Sira = true;
                context.Clients.Client(oyuncu.ConnectionId).SiraRakipte();
                context.Clients.Client(rakipoyuncu.ConnectionId).SiraSende();
            }
            if (oyuncu.Zar1 == 0)
            {
                oyuncu.Zar1 = puan;
                oyuncu.Sira = false;
                rakipoyuncu.Sira = true;
                context.Clients.Client(oyuncu.ConnectionId).SiraRakipte();
                context.Clients.Client(rakipoyuncu.ConnectionId).SiraSende();
            }

            if (oyuncu.Zar1 != 0 && oyuncu.Zar2 != 0 && rakipoyuncu.Zar1 != 0 && rakipoyuncu.Zar2 != 0)
            {
                foreach (var item in liste)
                {
                    salondakiOyuncular.Add(new OyuncuBilgi
                    {
                        KullaniciAdi = item.KullaniciAdi,
                        ConenctionId = item.ConnectionId,
                        Zar1 = item.Zar1,
                        Zar2 = item.Zar2,
                        ToplamPuan = item.Toplam
                    });
                    kullanicilar.Add(item.ConnectionId);
                }
                oyuns.RemoveAll(x => x.SalonKodu == salonkodu);
                if (salondakiOyuncular[0].ToplamPuan > salondakiOyuncular[1].ToplamPuan)
                {
                    context.Clients.Client(salondakiOyuncular[0].ConenctionId).KazananOyuncuGoster(salondakiOyuncular);
                    context.Clients.Client(salondakiOyuncular[1].ConenctionId).KaybedenOyuncuGoster(salondakiOyuncular);
                }
                else if (salondakiOyuncular[0].ToplamPuan == salondakiOyuncular[1].ToplamPuan)
                {
                    context.Clients.Clients(kullanicilar).BerabereSonucGoster(salondakiOyuncular);
                }
                else
                {
                    context.Clients.Client(salondakiOyuncular[1].ConenctionId).KazananOyuncuGoster(salondakiOyuncular);
                    context.Clients.Client(salondakiOyuncular[0].ConenctionId).KaybedenOyuncuGoster(salondakiOyuncular);
                }

            }
        }

        private string ConnectionIdGetir()
        {
            return Context.ConnectionId;
        }
    }
}