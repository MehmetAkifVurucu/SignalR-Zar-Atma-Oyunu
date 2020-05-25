http://akifvurucu.com/signalr-ile-zar-atma-oyunu/
# SignalR-Zar-Atma-Oyunu
Online Casinolardaki oda mantığının olduğu temel seviyede 2 oyunculu odalar ile zar atma oyunun oynandığı zar atma oyunu.

1)Oyuncu kullanıcı adı ve salon kodu girerek ZarOyunHub class' ındaki OyuncuEkle metodu ile salona giriş yapar. Bu metodda eğer daha önce girilen salon kodunda birisi yok ise Rakip Oyuncu bekleniyor uyarısı görülür. Eğer daha önce bir oyuncu odaya giriş yapmış ise daha önce giriş yapan kişinin ekranında Zar Atma ekranı aktif olur ve en son giriş yapan oyuncunun ekranındaki uyarı rakip oyuncunun oynaması bekleniyor uyarısı aktif olur.
2)Oyuncu zar attıktan sonra eğer ki ilk defa zar atıyorsa Zar1 değeri gelen puan değeri ile değiştirilir ve sıra kendisinde false;rakip oyuncu için true yapılır.
3)Bu işlemden sonra ilk zarı atan ve puanını alan oyuncunun ekranı "rakip oyuncunun oynaması bekleniyor uyarısı" ile değiştirilir ve rakibin ekranında zar atma ekranı aktif olur.
4)Sıra kendisine gelen ve ilk defa zar atan oyuncu için 2 ve 3 adımdaki işlem tekrarlanır.
5)2 oyuncuda 2 defa zar attıktan sonra ZarOyunHub classındaki PuanEkle metodundaki KazananOyuncuGoster, KaybedenOyuncuGoster ile istemci tarafı ile iletişim kurulur ve kazanan oyuncunun ekanında Tebrikler kazandınız uyarısı;kaybeden oyuncunun ekranında kaybettiniz uyarısı gösterilir. Ayrıca 2 ekranda da 2 oyuncununda atmış olduğu zarlar ve toplamları gösterilir.

NOT: Aynı salonda 2 kullanıcı var ise 3.oyuncu salona girmek için salon kodunu girdiğinde uyarı mesajı alacaktır. Ancak oyun bittikten sonra aynı salona girmek isterse salona girişi gerçekleşecektir.
