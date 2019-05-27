$(document).ready(function(){

  //uso handlebars
  var template_html = $('#entry-template').html();
  var template_function = Handlebars.compile(template_html);

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
      console.log(info);
      var risultati = info.results;
      console.log(risultati);
      // Risultati è un array di oggetti quindi faccio un ciclo
      for (var i = 0; i < risultati.length; i++) {

        var variabile_hldbar = {
          'titolo': risultati[i].title,
          'titolo_originale': risultati[i].original_title,
          'lingua': risultati[i].original_language,
          'voto': risultati[i].vote_average,
        };
        var html_finale = template_function(variabile_hldbar);
        // appendo questo var all id che è nell'html
        $('.contenitore_schede_film').append(html_finale);


      //fine ciclo
      }

    //fine funz ajax output
    }
  //fine funzione chiamata_ajax
  }

  $('.bt_dx').click(function(){

    //svuoto il contenitore per successive ricerche
    $('.contenitore_schede_film').empty();
    // recupero attributo input in una var
    var film_scelto = $('.input_sx').val();
    chiamata_ajax(film_scelto);

    //azzero valore input
    $('.input_sx').val('');

  });




//fine document ready
});
