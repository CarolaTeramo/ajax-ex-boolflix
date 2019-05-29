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
        console.log(dato);
      },
      'error': function(){
        alert('no')
      }
    });

    $.ajax({
      'url': 'https://api.themoviedb.org/3/search/tv',
      //'url': 'https://api.themoviedb.org/3/search/movie?api_key=168d2053ad0197f7745e3f3f0a787812&query=batman',
      'method': 'GET',
      'data' : dato_ajax,
      'success': function(dato_chiamata_due){
        output (dato_chiamata_due);
        //console.log(dato_chiamata_due);

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
        //console.log(stelline);//
        var url_img = 'http://image.tmdb.org/t/p/w342'+ risultati[i].poster_path;
        console.log(url_img);

        var variabile_hldbar = {
          'titolo': risultati[i].title,
          'titolo_originale': risultati[i].original_title,
          'lingua': risultati[i].original_language,
          'voto': '<span class="">' + genera_stelle(stelline) + genera_stelle_vuote(5 - stelline) + '</span>',
          'indice': risultati[i].original_language,
          'nome_serie': risultati[i].name,
          'nome_serie_originale': risultati[i].original_name,
          'copertina':url_img,
        };

        var html_finale = template_function(variabile_hldbar);
        // appendo questo var all id che è nell'html
        $('.contenitore_schede_film').append(html_finale);

        //OPPURE
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

      //fine ciclo for i
      }

      var idioma = ['en', 'it', 'fr', 'es', 'de'];
      for (var i = 0; i < idioma.length; i++) {
        var quelli_con_indice = $('[data-indice="'+ idioma[i] +'"]');
        console.log(quelli_con_indice);
        quelli_con_indice.html('<img src="icon_'+ idioma[i] +'.png" alt="">');
      }

      //genero numero stelline pari al voto
      function genera_stelle(x){
        var st = '';
        for (var j = 0; j < x; j++) {
          st += '<i class="fas fa-star giallo"></i>';
        }
        return st
      }
      function genera_stelle_vuote(x){
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

  $(document).on('mouseenter', '.immagine',function(){
    $(this).hide();
    $(this).siblings('.dati_film').addClass('attiva');
  });
  $(document).on('mouseleave', '.dati_film',function(){
    $(this).removeClass('attiva');
    $(this).siblings('.immagine').show();
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
