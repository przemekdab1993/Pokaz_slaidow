var img_s = ["img/d0.jpg", "img/d1.jpg", "img/d2.jpg", "img/d3.jpg", "img/d4.jpg"];
var $buttons = $('.buttons'); //kontener przycisków
var $view_window = $('#view'); //kontener obrazków
var last_img;
var my_time;
var flag_bot = false;

//	Wczytanie danych ze tabeli i utworzenie przycisków oraz div'ów na wyświetlane obrazki. 
// 	source -- Array z danymi (source images).
function create_buttons(source)
{
	if(typeof(source) === 'object') //sprawdzanie czy zmienna img_s jest Array 
	{
		for (var i = 0; i < source.length; i++)
		{
			var buf_html = '<button id="bt_' + i + '" class="button_0 button_off" href="#img_' + i + '"></button>';
			$buttons.append(buf_html);
			
			var $new_div_img = '<div class="div_img" id="img_' + i + '"><img src="' + img_s[i] + '" alt="Obrazek z bt_' + i +'" /></div>';
			$view_window.append($new_div_img);
			$('.div_img').hide();
		}
	}
	else if (typeof(source) === 'string') //sprawdzanie czy zmienna img_s to String
	{
		var buf_html = '<button id="bt_xxx" class="button_0 button_off" href="#img_' + source + '"></button>';
		$buttons.append(buf_html);
		
		var $new_div_img = '<div class="div_img" id="img_xxx"><img src="' + source + '" alt="Obrazek z bt_xxx" /></div>';
		$view_window.append($new_div_img);
		$('.div_img').hide();
	}
	else //Przypadek gdy zmienna ma nieodpowiedni format 
	{
		alert("Błąd danych wejściowych");
	}
}
// Zmiana wyświetlanego obrazka przez naciśnięcie odpowiedniego przycisku.
// id_view -- id klikniętego buttona który prowadzi do odpowiedniego odrazka.
// flaga -- czy przejście wywołane jest automatycznie(true) lub przez kliknięcie przycisku przez urzytkownika (false).
function play_view(id_view, flag) 
{
	var $click_button = $('#' + id_view);
	var $div_img = $('#' + id_view).attr('href');
	
	$div_img = $($div_img);
	$($('#' + last_img).attr('href')).hide();
	$div_img.show();
	
	$('.button_on').removeClass('button_on').addClass('button_off');
	$click_button.addClass('button_on').removeClass('button_off');
	last_img = id_view;
	if (flag == false)
	{
		clearInterval(my_time);
		setTimeout(function() { myTime(); }, 8000);
	}
	flag_bot = false;
}
// Taimer odliczający do zmiany obrazka na następny w kolejce.
function myTime()
{
	my_time = setInterval( function() {
		var $next_img;
		var buf = last_img.substring(3);
		
		
		buf = parseInt(buf);
		if (buf < $('#' + last_img).siblings().length)
		{
			$next_img = $('#' + last_img).next();
		}
		else
		{
			buf = 0;
			$next_img = $('#' + last_img.substring(0, 3) + buf);
		}
		flag_bot = true;
		$next_img.click();
	}, 4000);
}

// Funkcja wykonywana zaraz po załadowaniu strony (main). 
$( function() {
	create_buttons(img_s);
	myTime();
	last_img = 'bt_' + (Math.floor(Math.random() * ($('.button_0').length)));
	
	// Zdażenie kliknięcia przycisku //
	$('.button_off').on('click', function(e) { 
		var $target = e.target;
		var target_id = $target.id;
		play_view(target_id, flag_bot);
	});
	play_view(last_img, true); //Wyświetlenie pierwszego obrazka wylosowanego wcześniej
});