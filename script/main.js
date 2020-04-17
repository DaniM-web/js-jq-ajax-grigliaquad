$( document ).ready(function() {
  // -Griglia 6x6,
  // -ad ogni click (su ogni rettangolino) parte una richiesta AJAX che prende un numero random da 1 a 9 (primo end-point della API in slide).
  // -Se il num ritornato è <= 5 il quadrato diventa giallo,
  // -se è > di 5 il quadrato diventa verde.
  // -Il numero ottenuto appare al centro del quadrato


//creo il div container della mia griglia
var divCss = $('<div class="container"> </div>')
//appendo il container al body dinamicamente
$('body').prepend(divCss);

//creo 36 quadratini per avere una grigia 6x6
  for (var i = 0; i < 36; i++) {
    create = $('<div class="square"> </div>')
    divCss.append(create);
  }

var square = $('.square');
//al click del quadrato
square.click(
  squareClick
)

var cliccato = 0;
//creo la funzione squareClick
function squareClick() {
  var squareSelect = $(this);

  console.log(squareSelect);
  //la funzione parte solo se il quadrato non ha classe active
    if (!$(this).hasClass("active")) {
      $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/random/int",
        method: "GET",
        success: function(data,stato) {
          cliccato = 1;
          if (data.response <= 5) {
            squareSelect.addClass("active yellow");
          }else {
            squareSelect.addClass("active green");
          }
          squareSelect.html("<p>" + data.response + "</p>");
          console.log(data);
        },
        error: function(richiesta,stato,errore){
          alert("Chiamata fallita!!!" + errore);
        }
      });
    }else {
      alert("hai gia cliccato")
    }
  }
});
