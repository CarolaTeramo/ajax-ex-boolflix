$(document).ready(function(){

  //uso handlebars
  var template_html = $('#entry-template').html();
  var template_function = Handlebars.compile(template_html);

  var template_html_due = $('#template_due').html();
  var template_function_due = Handlebars.compile(template_html_due);


  var chiave = '168d2053ad0197f7745e3f3f0a787812';
  //funzione per chiamata ajax
  function chiamata_ajax(film_scelto){

    var dato_ajax = {
      'api_key': chiave,
      'query': film_scelto,
    }

    $.ajax({
      'url': 'https://api.themoviedb.org/3/search/movie',
      //'url': 'https://api.themoviedb.org/3/search/movie?api_key=168d2053ad0197f7745e3f3f0a787812&query=batman',
      'method': 'GET',
      'data' : dato_ajax,
      'success': function(dato){

        output (dato);
      },
      'error': function(){
        alert('no')
      }
    });

    function output(info){
      // info= generica variabile a cui sopra do valore dato
      //console.log(info);
      var risultati = info.results;
      //console.log(risultati);
      //var array_stelline = [];
      // Risultati è un array di oggetti quindi faccio un ciclo (CICLO RISULTATI CHIAMATA)
      for (var i = 0; i < risultati.length; i++) {

        // trasformo il voto in stellina e arrotondo numero
        var converto = risultati[i].vote_average;
        //console.log(converto);
        var stelline = Math.round(converto/2);
        //array_stelline.push(stelline);
        //console.log(stelline);

        //per ogni scheda film vedo se lingua corrisponde alla ricerca
        // $('.tipo_lingua').each(function() {
        //   //recupero la lingua corrente nell'each
        //   //var lin = $(this).text();
        //   console.log(lin);
        //   if ( lin === 'en') {
        //     $(this).addClass('giallo');
        //   }
        //fine each
        //});


        var variabile_hldbar = {
          'titolo': risultati[i].title,
          'titolo_originale': risultati[i].original_title,
          'lingua': risultati[i].original_language,
          'voto': '<span class="">' + genera_stelle(stelline) + '</span>',
          'indice': risultati[i].original_language,
        };

        var quelli_con_indice = $('[data-indice="en"]');
        quelli_con_indice.addClass('giallo');

        var html_finale = template_function(variabile_hldbar);
        // appendo questo var all id che è nell'html
        $('.contenitore_schede_film').append(html_finale);

      //fine ciclo for i
      }

      //genero numero stelline pari al voto
      function genera_stelle(x){
        var st = '';
        for (var j = 0; j < x; j++) {
          st += '<i class="far fa-star giallo"></i>';
        }
        return st
      }

    //fine funz ajax output
    }
  //fine funzione chiamata_ajax
  }

  $('.bt_dx').click(function(){
    invio_input();
  });

  // intercetto il tasto INVIO
  $('.input_sx').keypress(function(event) {
    if(event.which == 13) {
      invio_input();
    }
  });

  function invio_input() {
    //svuoto il contenitore per successive ricerche
    $('.contenitore_schede_film').empty();
    // recupero attributo input in una var
    var film_scelto = $('.input_sx').val();
    chiamata_ajax(film_scelto);

    //azzero valore input
    $('.input_sx').val('');
  }



//fine document ready
});
