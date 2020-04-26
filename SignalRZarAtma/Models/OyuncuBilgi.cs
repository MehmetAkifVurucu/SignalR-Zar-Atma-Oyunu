using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRZarAtma.Models
{
    public class OyuncuBilgi
    {
        public string KullaniciAdi { get; set; }
        public string ConenctionId { get; set; }
        public int Zar1 { get; set; }
        public int Zar2 { get; set; }
        public int ToplamPuan { get; set; }
    }
}