using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRZarAtma.Models
{
    public class Oyun
    {
        public string KullaniciAdi { get; set; }
        public string ConnectionId { get; set; }
        public string SalonKodu { get; set; }
        public int Zar1 { get; set; }
        public int Zar2 { get; set; }
        public int Toplam
        {
            get { return Zar1 + Zar2; }
        }
        public bool Sira { get; set; }
    }
}