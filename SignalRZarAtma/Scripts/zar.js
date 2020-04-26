var bildirim;
var zarDeger = 0;

$(function () {
    bildirim = $.connection.zarOyunHub;

    bildirim.client.rakipOyuncuBekleniyor = function () {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "block");
    }
    bildirim.client.rakipOyuncununSirasi = function () {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "block");
    }
    bildirim.client.oyunaBasla = function () {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "none");
        $("#divSiraSende").css("display", "block");
    }
    bildirim.client.salondaOyunDevamEdiyor = function () {
        alert("Salonda oyun devam ediyor");
    }
    bildirim.client.siraRakipte = function () {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divSiraSende").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "block");
    }
    bildirim.client.siraSende = function () {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "none");
        $("#divSiraSende").css("display", "block");
    }
    bildirim.client.berabereSonucGoster = function (oyuncular) {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "none");
        $("#divSiraSende").css("display", "none");
        $("#divBerabereSonuc").css("display", "block");
        sonucGoster("divBerabereSonuc", oyuncular)
    }
    bildirim.client.kazananOyuncuGoster = function (oyuncular) {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "none");
        $("#divSiraSende").css("display", "none");
        $("#divKazandiSonuc").css("display", "block");
        sonucGoster("divKazandiSonuc", oyuncular)
    }
    bildirim.client.kaybedenOyuncuGoster = function (oyuncular) {
        $("#divGiris").css("display", "none");
        $("#divRakipOyuncuBekleniyor").css("display", "none");
        $("#divRakipOyuncununSirasi").css("display", "none");
        $("#divSiraSende").css("display", "none");
        $("#divYenildiSonuc").css("display", "block");
        sonucGoster("divYenildiSonuc", oyuncular)
    }

    $.connection.hub.start().done(function () {
    }).fail(function (e) {
        console.log(e);
    })


    const dicebody = document.querySelector('#dice-body');
    const rollBtn = document.querySelector('#roll-btn');

    const combinations = [
        { 1: ["cc"] },
        { 2: ["tl", "br"] },
        { 3: ["tl", "cc", "br"] },
        { 4: ["tl", "tr", "bl", "br"] },
        { 5: ["tl", "tr", "cc", "bl", "br"] },
        { 6: ["tl", "tr", "cl", "cr", "bl", "br"] },
    ]

    const eraseDots = (number) => {
        combinations[number - 1][number].forEach(set => {
            document.getElementById(`${set}`).classList.remove('show');
        });
    }

    const makeDots = (number) => {
        dicebody.classList.add('spin-die');
        combinations[number - 1][number].forEach(set => {
            document.getElementById(`${set}`).classList.add('show');
        });
    }

    const randomRollAmount = () => {
        let rollAmount = Math.floor((Math.random() * 30) + 15);
        return rollAmount;
    }

    const randomRollResult = () => {
        let rollResult = Math.floor(Math.random() * 6 + 1);
        zarDeger = rollResult;
        return rollResult;

    }

    const rollDie = (numberOfRolls) => {
        let counter = 1;
        let number = 1;
        const rollState = () => {
            if (counter >= numberOfRolls) {
                clearInterval(rolling);
                makeDots(randomRollResult());
                dicebody.classList.remove('spin-die');
            } else {
                makeDots(number);
                setTimeout(eraseDots, 80, number);
                counter += 1;
                number += 1;
                if (number > 6) {
                    number = 1;
                }
            }
        }
        const rolling = setInterval(rollState, 125);
    }

    rollBtn.addEventListener('click', () => { rollDie(randomRollAmount()); puanGonder() });


})

function puanGonder() {
    var txtSalonAdi = $("#txtKullaniciAdi").val();
    var txtSalonKodu = $("#txtSalonKodu").val();
    setTimeout(function () {
        bildirim.server.puanEkle(txtSalonAdi, txtSalonKodu, zarDeger);
    }, 7000);
}
$("#btnGirisYap").click(function () {
    var txtSalonAdi = $("#txtKullaniciAdi").val();
    var txtSalonKodu = $("#txtSalonKodu").val();
    bildirim.server.oyuncuEkle(txtSalonAdi, txtSalonKodu);

})
function sonucGoster(divAdi, data) {
    var html = "";
    html += "<div class='row'>"
    html += "   <div class='col-md-6'>"
    html += "       <h4>" + data[0].KullaniciAdi + "</h4>"
    html += "       <small>Zar 1:</small><strong>" + data[0].Zar1 + "</strong>"
    html += "       <small>Zar 2:</small><strong>" + data[0].Zar2 + "</strong>"
    html += "       <small>Toplam:</small><strong>" + data[0].ToplamPuan + "</strong>"
    html += "   </div>"
    html += "   <div class='col-md-6'>"
    html += "       <h4>" + data[1].KullaniciAdi + "</h4>"
    html += "       <small>Zar 1:</small><strong>" + data[1].Zar1 + "</strong>"
    html += "       <small>Zar 2:</small><strong>" + data[1].Zar2 + "</strong>"
    html += "       <small>Toplam:</small><strong>" + data[1].ToplamPuan + "</strong>"
    html += "   </div>"
    html += "</div>"
    $("#" + divAdi + "").append(html);
}

