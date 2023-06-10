$("#search .punkt").click(function() {
    if ($(this).hasClass("open_punkt")) {        
        $(".dropdown_block").css("display","none");
        $(".dropdown_details").css("display","none");    
        $("#search .punkt").removeClass("open_punkt");
    } else {
        $(".dropdown_block").css("display","none");
        $(".dropdown_details").css("display","none");    
        $("#search .punkt").removeClass("open_punkt");
        
        $(this).addClass("open_punkt");
        $(this).parent().find(".dropdown_block").css("display","block");
        $(this).parent().find(".dropdown_details").css("display","block");
    }
});
$(function() {
    $(".phone").mask("+7 (999) 999-99-99",{placeholder:"_"});
    $("#tabs").tabs();
    $("#tabs_login").tabs();
	
	$('.spoiler_links').click(function(){
		$(this).next('.spoiler_body').toggle('normal');
		return false;
	});	

	$('.login-form').submit(function(e){
		e.preventDefault();
		var m_method=$(this).attr('method');
		var m_action=$(this).attr('action');
		var m_data=$(this).serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			success: function(result){
				$('.login-form .errors-row').html(result);
			}
		});
	});
	$('.registration-form').submit(function(e){
		e.preventDefault();
		var m_method=$(this).attr('method');
		var m_action=$(this).attr('action');
		var m_data=$(this).serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			success: function(result){
				$('.registration-form .errors-row').html(result);
			}
		});
	});
	$('.net_shop_form').submit(function(e){
		e.preventDefault();
		var m_method=$(this).attr('method');
		var m_action=$(this).attr('action');
		var m_data=$(this).serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			success: function(result){
				$('#net_shop_answer').html(result);
			}
		});
	});
	$('.app_form').submit(function(e){
		e.preventDefault();
		var m_method=$(this).attr('method');
		var m_action=$(this).attr('action');
		var m_data=$(this).serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			success: function(result){
				$('#app_form_answer').html(result);
			}
		});
	});	
	$('.promocode_form').submit(function(e){
		e.preventDefault();
		var m_method=$(this).attr('method');
		var m_action=$(this).attr('action');
		var m_data=$(this).serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			success: function(result){
				$('body').append(result);
			}
		});
	});
	$('#shop_owner_form').submit(function(e){
		if($("#agree").prop('checked') == false) { 
			alert("Для отправки формы, Вам необходимо подтвердить прочтение Пользовательского соглашения");
			return false;
		} else {
			return true;			
		}
	});
	
	$(window).scroll(function(){
		menu_fixer();
	});
	menu_fixer();
	$(window).resize(function(){
		menu_fixer();
	});
	menu_fixer();
	

	$('#search_word .word_field').bind("change keyup input click", function() {
		if(this.value.length >= 2) {
			$.ajax({
				type: 'post',
				url: "/search_word_process.php",
				data: {
					'referal' : $('#search_fast_query').val(),
					'city':  $('#city_search_name').val()
				},
				response: 'text',
				success: function(data){
					$("#search_word .dropdown_block_inner").html(data).fadeIn();
			   }
		   })
		}
	});	
	$("#search_word .word_field").focusout(function() {
		$("#word_search_results").fadeOut();;
	});
});
function menu_fixer(){
	$("#carousel-example-generic-shop").height($("#carousel-example-generic-shop").width());
	$("#carousel-example-generic-shop .item").height($("#carousel-example-generic-shop").width());
}


$("#main_filter_city_list .dropdown_block_punkt").click(function(){
	filter_city($(this).attr("data-city"));
	$('#main_filter_city').fadeOut('slow','linear');
	$('#main_filter_city_title').removeClass('open_punkt');
	$('#main_filter_city_title').html($(this).html());
	$('#main_filter_city_field').val($(this).attr("data-city"));
	$('#main_filter_metro_title').html("Метро");
	$('#main_filter_metro').fadeIn('slow','linear');
	$('#main_filter_metro_title').addClass('open_punkt');
});
function filter_city(city_id){
	$.ajax({
		type: "POST",
		url: "/main_search_metro.php",
		data: { 
			city_id: city_id
		},
		success: function(msg){
			$("#main_filter_metro .dropdown_block_inner").html(msg);
		}
	});	
}

function main_filter_metro_choose(elem) {
	$('#main_filter_metro').fadeOut('slow','linear');
	$('#main_filter_metro_title').removeClass('open_punkt');
	$('#main_filter_metro_title').html($(elem).html());
	$('#main_filter_metro_field').val($(elem).attr("data-block"));
	/*$('#main_filter_store').fadeIn('slow','linear');
	$('#search_shop_title').addClass('open_punkt');*/
};


$("#main_filter_store_list .dropdown_block_punkt").mouseover(function() {
	console.log($(this).attr("data-store"));
	$("#main_filter_substore .dropdown_block_punkt").css("display", "none");
	$("#main_filter_substore .store_" + $(this).attr("data-store")).css("display", "block");
});
$("#main_filter_region_list .dropdown_block_punkt").mouseover(function() {
	console.log($(this).attr("data-region"));
	if ($(this).attr("data-region") == 1) {
		$("#main_filter_city_list .dropdown_block_punkt").css("display", "block");
	} else {		
		$("#main_filter_city_list .dropdown_block_punkt").css("display", "none");
		$("#main_filter_city_list .city_" + $(this).attr("data-region")).css("display", "block");
	}
});

/*$("#main_filter_store .dropdown_block_punkt").click(function(){
	$('#main_filter_store').fadeOut('slow','linear');
	$('#search_shop_title').removeClass('open_punkt');
	$('#search_shop_title').html($(this).html());
	$('#main_filter_store_field').val($(this).attr("data-store"));
});
$("#main_filter_substore .dropdown_block_punkt").click(function(){
	$('#main_filter_store').fadeOut('slow','linear');
	$('#search_shop_title').removeClass('open_punkt');
	$('#search_shop_title').html($(this).html());
	$('#main_filter_store_field').val($(this).attr("data-substore"));
});*/
$("#category_modal .modal-body .store_item .link").click(function(){
	$('#search_shop_title').html($(this).html());
	$('#main_filter_store_field').val($(this).attr("data-store"));
	$('#category_modal').modal('hide');
});
$("#category_modal .modal-body .store_item .opener").click(function(){
	$('#store_holder'+$(this).attr("data-store")).toggle('normal');
	return false;	
});

$("#main_filter_form").submit(function(event) {
	if ($('#main_filter_city_field').val() == "") {
		$('#main_filter_city').fadeIn('slow','linear');
		event.preventDefault();
		return false;
	}
	if ($('#main_filter_block_field').val() == "") {
		$('#main_filter_block').fadeIn('slow','linear');
		event.preventDefault();
		return false;
	}
	if ($('#main_filter_store_field').val() == "") {
		/*$('#main_filter_store').fadeIn('slow','linear');*/
		$('#category_modal').modal('show');
		event.preventDefault();
		return false;
	}
});
$('#side_menu_city select').on('change', function() {
	$.ajax({
		type: "POST",
		url: "/sidebar_search_metro.php",
		data: { 
			city_id: this.value
		},
		success: function(msg){
			$("#side_menu_metro").html(msg);
		}
	});	
});

$('.scroll_menu .checkbox').on('change', function() {
	window.location.replace('/catalog/category/'+$(this).val()+'/'); 
});


$("#add_step_progress li span").click(function(){
	var z = $(this).attr("data-step");
	$("#add_step_progress li").removeClass("visited");
	i = 1;
	while (i < z) {
		$("#step_progress"+i).addClass("visited");
		i++;
	}
	$("#add_step_progress li").removeClass("active");
	$(this).parent().addClass("active");
	$(".add_step").removeClass("active");
	$("#add_step"+z).addClass("active");
	$("#add_step"+z).addClass("active");
	
	$('.full_height').matchHeight();
});
function step_change(z) {
	if (z == 2) {
		if ($("#f_name").val() == "") {
			alert("Пожалуйста, укажите название магазина");
			$("#f_name").focus();
			return false;
		}
		if ($("#shop_details_city_name").val() == 0) {
			alert("Пожалуйста, выберите город");
			return false;
		}
		if ($("#block_choose").val() == 0) {
			alert("Пожалуйста, выберите город и район");
			$("#block_choose").focus();
			return false;
		}
	}
	if (z == 3) {
	}
	if (z == 4) {
		var y = 0;
		$('#add_shop_page #assortiment .inner_cat input[type=checkbox]').each(function(i, el){
			if ($(this).is(':checked')) {
				y++;
			}
		});		
		if (y == 0) {
			alert("Пожалуйста, выберите хотя бы одну категорию для Вашего магазина");
			return false;
		}
	}
	$("#add_step_progress li").removeClass("visited");
	i = 1;
	while (i < z) {
		$("#step_progress"+i).addClass("visited");
		i++;
	}
	$("#add_step_progress li").removeClass("active");
	$(".add_step").removeClass("active");
	$("#add_step"+z).addClass("active");
	$("#step_progress"+z).addClass("active");
	
	$('.full_height').matchHeight();
}
//Фото
$('#upload_photo_main input[type=file]').change(function(){
	$('#upload_photo_main .ajax-progress').html("<img src=\"/img/lk/photo_loader.gif\">");
	files = this.files;
	var data = new FormData();
	$.each(files, function( key, value ){
		data.append( key, value );
	});
	$.ajax({
		url: '/uploads/submit.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function( respond, textStatus, jqXHR ){
			$('#upload_photo_main .ajax-progress').html("");
			if( typeof respond.error === 'undefined' ){
				var files_path = respond.files;
				var error_lines = respond.error_lines;
				var html = '';
				var html_errors = '';
				console.log(respond);				
				$('#upload_photo_main .ajax-errors').html("");
				var i = $('#upload_photo_main .ajax-respond').attr("img-count");
				$.each(files_path, function(key, val) {
						html += "<div class=\"upload_photo_unit\" id=\"l_main_photo_"+i+"\">"+
									"<img src=\"/uploads/lot/"+val+"\">"+
									"<a href=\"javascript:void(0)\" class=\"rem_img\" onclick=\"remove_main(\'"+val+"\',"+i+", \'main_photo\')\">&nbsp;</a>"+
								"</div>";
						$("#l_main_photos").val(val);
						i++;
					}
				)				
				$('#upload_photo_main .ajax-respond').attr("img-count",i);
				$('#upload_photo_main .ajax-respond').html( html );
				
				$.each(error_lines, function(key, val) {
						html_errors += "<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>" + val + "</div>";
					}
				);
				$('#upload_photo_main .ajax-errors').append( html_errors );
			}
			else{
				console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
			}
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('ОШИБКИ AJAX запроса: ' + textStatus );
		}
	});
});
$('#upload_photo input[type=file]').change(function(){
	$('#upload_photo .ajax-progress').html("<img src=\"/img/lk/photo_loader.gif\">");
	files = this.files;
	var data = new FormData();
	$.each(files, function( key, value ){
		data.append( key, value );
	});
	$.ajax({
		url: '/uploads/submit.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function( respond, textStatus, jqXHR ){
			$('#upload_photo .ajax-progress').html("");
			if( typeof respond.error === 'undefined' ){
				var files_path = respond.files;
				var error_lines = respond.error_lines;
				var html = '';
				var html_errors = '';
				console.log(respond);
				$('#upload_photo .ajax-errors').html("");
				var i = $('#upload_photo .ajax-respond').attr("img-count");
				$.each(files_path, function(key, val) {
						html += "<div class=\"upload_photo_unit\" id=\"l_photo_"+i+"\">"+
									"<img src=\"/uploads/lot/"+val+"\">"+
									"<a href=\"javascript:void(0)\" class=\"rem_img\" onclick=\"remove(\'"+val+"\',"+i+", \'photo\')\">&nbsp;</a>"+
								"</div>";
						$("#l_photos").val($("#l_photos").val()+val+"|");
						i++;
					}
				)				
				$('#upload_photo .ajax-respond').attr("img-count",i);
				$('#upload_photo .ajax-respond').append( html );
				
				$.each(error_lines, function(key, val) {
						html_errors += "<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>" + val + "</div>";
					}
				);
				$('#upload_photo .ajax-errors').append( html_errors );
			}
			else{
				console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
			}
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('ОШИБКИ AJAX запроса: ' + textStatus );
		}
	});
});
/**/
$('#sale_photo input[type=file]').change(function(){
	$('#sale_photo .ajax-progress').html("<img src=\"/img/lk/photo_loader.gif\">");
	files = this.files;
	var data = new FormData();
	$.each(files, function( key, value ){
		data.append( key, value );
	});
	$.ajax({
		url: '/uploads/submit.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function( respond, textStatus, jqXHR ){
			$('#sale_photo .ajax-progress').html("");
			if( typeof respond.error === 'undefined' ){
				var files_path = respond.files;
				var error_lines = respond.error_lines;
				var html = '';
				var html_errors = '';
				console.log(respond);
				$('#sale_photo .ajax-errors').html("");
				var i = $('#sale_photo .ajax-respond').attr("img-count");
				
				var z = 0;
				$.each(files_path, function(key, val) {
						if (z % 3 == 0) {
							html += "<div class=\"upload_photo_row\">";
						}
						html += "<div class=\"upload_photo_unit\" id=\"sl_photo_"+i+"\">"+
									"<p class=\"upload_photo_line\">&nbsp;</p>" + 
									"<div class=\"upload_photo_num\">"+i+"</div>" +
									"<img src=\"https://skidkadarom.ru/uploads/lot/"+val+"\">"+
									"<div class=\"upload_photo_unit_info\">"+
										"<p class=\"upload_photo_title_name\">Название товара:</p>" + 
										"<input type=\"text\" class=\"form-control discount_name\" name=\"discount_name[]\" min=\"1\" placeholder=\"Впишите название\">"+
										"<p class=\"upload_photo_title_name\">Скидка:</p>"+
										"<div class=\"tabs\">"+
											"<input type=\"radio\" class=\"shop_tabs active\" data-tab=\"txt"+i+"_1\" data-int=\""+i+"\" name=\"discount_type"+i+"[]\" value=\"procent\" id=\"tab"+i+"_1\" checked><label for=\"tab"+i+"_1\">Процент</label>"+
											"<input type=\"radio\" class=\"shop_tabs\" data-tab=\"txt"+i+"_2\" data-int=\""+i+"\" name=\"discount_type"+i+"[]\" value=\"rubles\" id=\"tab"+i+"_2\"><label for=\"tab"+i+"_2\">Было/стало</label>"+
											"<div id=\"txt"+i+"_1\" style=\"display:block;\">"+
												"<p class=\"upload_photo_title_name\">Размер скидки:</p><input type=\"number\" oninput=\"this.value = this.value.replace(/\D/g, '')\" class=\"form-control\" name=\"discount_size[]\" min=\"1\" value=\"\">"+
											"</div>"+
											"<div id=\"txt"+i+"_2\">"+
												"<p class=\"upload_photo_title_name\" style=\"float:left;width:100%;\">Старая цена:</p><input type=\"number\" oninput=\"this.value = this.value.replace(/\D/g, '')\" class=\"form-control discount_name\" name=\"discount_oldprice[]\" min=\"1\" value=\"\">"+
												"<p class=\"upload_photo_title_name\">Цена со скидкой:</p><input type=\"number\" oninput=\"this.value = this.value.replace(/\D/g, '')\" class=\"form-control discount_name\" name=\"discount_actprice[]\" min=\"1\" value=\"\">"+
											"</div>"+
										"</div>"+
                                        "<select name=\"discount_type[]\" id=\"discount_type"+i+"\" style=\"display:none\"><option value=\"procent\" selected>%</option><option value=\"rubles\">руб.</option></select>"+
										"<p class=\"upload_photo_title_date\">Срок действия акции:</p>" + 
										"<p class=\"upload_photo_title_date1\">С</p>" + 
										"<input type=\"text\" class=\"form-control upload_photo_title_date_input\" name=\"discount_date_from[]\" readonly=\"readonly\" onclick=\"showcalendar(this)\" placeholder=\"__.__.__\"/>"+
										"<p class=\"upload_photo_title_date2\">до</p>" + 
										"<input type=\"text\" class=\"form-control upload_photo_title_date_input\" name=\"discount_date_till[]\" readonly=\"readonly\" onclick=\"showcalendar(this)\" placeholder=\"__.__.__\"/>"+
										"<a href=\"javascript:void(0)\" class=\"rem_img\" onclick=\"remove_sl(\'"+val+"\',"+i+", \'photo\')\">&nbsp;</a>"+
										"<textarea class=\"form-control\" name=\"discount_description[]\" placeholder=\"Описание акции\"></textarea>"+
										"<input type=\"hidden\" class=\"form-control\" name=\"discount_img[]\" value=\""+val+"\">"+
										"<input type=\"hidden\" name=\"discount_unit[]\" value=\""+i+"\">"+
									"</div>"+
								"</div>";
						i++;
						z++;
						if (z % 3 == 0) {
							html += "</div>";
						}
						html += "<script>$(function(){$(\".shop_tabs\").on(\"change\",function(t){$(this).parent().find(\"div\").css(\"display\",\"none\"),$(this).parent().find(\".shop_tabs\").removeClass(\"active\"),$(this).addClass(\"active\"),$(\"#discount_type\"+$(this).attr(\"data-int\")+\" option[value='\"+$(this).val()+\"']\").prop(\"selected\",!0),$(\"#\"+$(this).attr(\"data-tab\")).css(\"display\",\"block\")})});$('.full_height').matchHeight();</script>";
					}
				)				
				$('#sale_photo .ajax-respond').attr("img-count",i);
				$('#sale_photo .ajax-respond').append( html );
				
				$.each(error_lines, function(key, val) {
						html_errors += "<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>" + val + "</div>";
					}
				);
				$('#sale_photo .ajax-errors').append( html_errors );
			}
			else{
				console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
			}
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('ОШИБКИ AJAX запроса: ' + textStatus );
		}
	});
});
/**/
$('#single_sale_photo input[type=file]').change(function(){
	$('#single_sale_photo .ajax-progress').html("<img src=\"/img/lk/photo_loader.gif\">");
	files = this.files;
	var data = new FormData();
	$.each(files, function( key, value ){
		data.append( key, value );
	});
	$.ajax({
		url: '/uploads/submit.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function( respond, textStatus, jqXHR ){
			$('#single_sale_photo .ajax-progress').html("");
			if( typeof respond.error === 'undefined' ){
				var files_path = respond.files;
				var error_lines = respond.error_lines;
				var html = '';
				var html_errors = '';
				$('#single_sale_photo .ajax-errors').html("");
				var i = $('#single_sale_photo .ajax-respond').attr("img-count");
				
				var z = 0;
				$.each(files_path, function(key, val) {
						if (z % 3 == 0) {
							html += "<div class=\"upload_photo_row\">";
						}
                        html += "<div class=\"upload_photo_unit\" id=\"sl_photo_"+i+"\">"+
                            "<p class=\"upload_photo_line\">&nbsp;</p>" +
                            "<div class=\"upload_photo_num\">"+i+"</div>" +
                            "<img src=\"https://skidkadarom.ru/uploads/lot/"+val+"\">"+
                            "<div class=\"upload_photo_unit_info\">"+
                            "<p class=\"upload_photo_title_name\">Название товара:</p>" +
                            "<input type=\"text\" class=\"form-control discount_name\" name=\"discount_name[]\" min=\"1\" placeholder=\"Впишите название\">"+
                            "<p class=\"upload_photo_title_name\">Скидка:</p>"+
                            "<div class=\"tabs\">"+
                            "<input type=\"radio\" class=\"shop_tabs active\" data-tab=\"txt"+i+"_1\" data-int=\""+i+"\" name=\"discount_type"+i+"[]\" value=\"procent\" id=\"tab"+i+"_1\" checked><label for=\"tab"+i+"_1\">Процент</label>"+
                            "<input type=\"radio\" class=\"shop_tabs\" data-tab=\"txt"+i+"_2\" data-int=\""+i+"\" name=\"discount_type"+i+"[]\" value=\"rubles\" id=\"tab"+i+"_2\"><label for=\"tab"+i+"_2\">Было/стало</label>"+
                            "<div id=\"txt"+i+"_1\" style=\"display:block;\">"+
                            "<p class=\"upload_photo_title_name\">Размер скидки:</p><input type=\"number\" oninput=\"this.value = this.value.replace(/\D/g, '')\" class=\"form-control\" name=\"discount_size[]\" min=\"1\" value=\"\">"+
                            "</div>"+
                            "<div id=\"txt"+i+"_2\">"+
                            "<p class=\"upload_photo_title_name\" style=\"float:left;width:100%;\">Старая цена:</p><input type=\"number\" oninput=\"this.value = this.value.replace(/\D/g, '')\" class=\"form-control discount_name\" name=\"discount_oldprice[]\" min=\"1\" value=\"\">"+
                            "<p class=\"upload_photo_title_name\">Цена со скидкой:</p><input type=\"number\" oninput=\"this.value = this.value.replace(/\D/g, '')\" class=\"form-control discount_name\" name=\"discount_actprice[]\" min=\"1\" value=\"\">"+
                            "</div>"+
                            "</div>"+
                            "<select name=\"discount_type[]\" id=\"discount_type"+i+"\" style=\"display:none\"><option value=\"procent\" selected>%</option><option value=\"rubles\">руб.</option></select>"+
                            "<p class=\"upload_photo_title_date\">Срок действия акции:</p>" +
                            "<p class=\"upload_photo_title_date1\">С</p>" +
                            "<input type=\"text\" class=\"form-control upload_photo_title_date_input\" name=\"discount_date_from[]\" readonly=\"readonly\" onclick=\"showcalendar(this)\" placeholder=\"__.__.__\"/>"+
                            "<p class=\"upload_photo_title_date2\">до</p>" +
                            "<input type=\"text\" class=\"form-control upload_photo_title_date_input\" name=\"discount_date_till[]\" readonly=\"readonly\" onclick=\"showcalendar(this)\" placeholder=\"__.__.__\"/>"+
                            "<a href=\"javascript:void(0)\" class=\"rem_img\" onclick=\"remove_sl(\'"+val+"\',"+i+", \'photo\')\">&nbsp;</a>"+
                            "<textarea class=\"form-control\" name=\"discount_description[]\" placeholder=\"Описание акции\"></textarea>"+
							"<div class=\"shop_choose\"></div>"+
							"<input type=\"hidden\" class=\"form-control\" name=\"discount_img[]\" value=\"https://skidkadarom.ru/uploads/lot/"+val+"\">"+
                            "<input type=\"hidden\" name=\"discount_unit[]\" value=\""+i+"\">"+
                            "</div>"+
                            "</div>";
                        i++;
                        z++;
                        if (z % 3 == 0) {
                            html += "</div>";
                        }
                        html += "<script>$(function(){$(\".shop_tabs\").on(\"change\",function(t){$(this).parent().find(\"div\").css(\"display\",\"none\"),$(this).parent().find(\".shop_tabs\").removeClass(\"active\"),$(this).addClass(\"active\"),$(\"#discount_type\"+$(this).attr(\"data-int\")+\" option[value='\"+$(this).val()+\"']\").prop(\"selected\",!0),$(\"#\"+$(this).attr(\"data-tab\")).css(\"display\",\"block\")})});$('.full_height').matchHeight();</script>";
                    }
				);
				$('#single_sale_photo .ajax-respond').attr("img-count",i);
				$('#single_sale_photo .ajax-respond').append( html );
				$("#shop_choose").clone().appendTo("#single_sale_photo .shop_choose");				
				
				$.each(error_lines, function(key, val) {
						html_errors += "<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>" + val + "</div>";
					}
				);
				$('#single_sale_photo .ajax-errors').append( html_errors );
			}
			else{
				console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
			}
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('ОШИБКИ AJAX запроса: ' + textStatus );
		}
	});
});
/**/
$('#single_sale_editphoto input[type=file]').change(function(){
	$('#sale_change_photo .ajax-progress').html("<img src=\"/img/lk/photo_loader.gif\" class=\"progress\">");
	files = this.files;
	var data = new FormData();
	$.each(files, function( key, value ){
		data.append( key, value );
	});
	$.ajax({
		url: '/uploads/submit.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function( respond, textStatus, jqXHR ){
			$('#sale_change_photo .ajax-progress').html("");
			if( typeof respond.error === 'undefined' ){
				var files_path = respond.files;
				var error_lines = respond.error_lines;
				var html = '';
				var html_errors = '';
				$('#sale_change_photo .ajax-errors').html("");
				var z = 0;
				$.each(files_path, function(key, val) {
						$('#sale_img').attr("src", "https://skidkadarom.ru/uploads/lot/" + val);		
						$('#discount_img').val("https://skidkadarom.ru/uploads/lot/" + val);		
					}
				);
				
				$.each(error_lines, function(key, val) {
						html_errors += "<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>" + val + "</div>";
					}
				);
				$('#sale_change_photo .ajax-errors').append( html_errors );
			}
			else{
				console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
			}
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('ОШИБКИ AJAX запроса: ' + textStatus );
		}
	});
});
/**/
$('#upload_photo .submit.button').click(function( event ){
	/*event.stopPropagation();
	event.preventDefault();*/
	$('#upload_starter').click();
});
$('#upload_photo_main .submit_main.button').click(function( event ){
	/*event.stopPropagation();
	event.preventDefault();*/
	$('#upload_main_starter').click();
});
$('#sale_photo .submit.button').click(function( event ){
	$('#sale_upload_starter').click();
});
$('#single_sale_photo .submit.button').click(function( event ){
	$('#sale_upload_starter').click();
});
$('#single_sale_editphoto .submit.button').click(function( event ){
	$('#sale_editupload_starter').click();
});
function remove(name,n,cont) {
	$("#l_"+cont+"s").val($("#l_"+cont+"s").val().replace(name+"|",""));
	$("#l_"+cont+"_"+n).remove();
	return false;
}
function remove_main(name,n,cont) {
	$("#l_"+cont+"s").val($("#l_"+cont+"s").val().replace(name+"|",""));
	$("#l_"+cont+"s").val($("#l_"+cont+"s").val().replace(name,""));
	$("#l_"+cont+"_"+n).remove();
	return false;
}
function remove_sl(name,n,cont) {
	$("#sl_"+cont+"_"+n).remove();
	return false;
}
$('#city_choose select').change(function(){
	filter_city_add($(this).val());
});
function filter_city_add(city_id){
	/*$.ajax({
		type: "POST",
		url: "/add_shop_block.php",
		data: { 
			city_id: city_id
		},
		success: function(msg){
			$("#block_choose_holder").html(msg);
		}
	});*/
	$.ajax({
		type: "POST",
		url: "/add_shop_subway.php",
		data: { 
			city_id: city_id
		},
		success: function(msg){
			$("#subway_choose_holder").html(msg);
		}
	});
}

function confirmDelete(title,id,url) {
	if (confirm(title)) {
		$.ajax({
			type: "POST",
			url: "/"+url,
			data: { 
				process_id: id
			},
			success: function(msg){
				$("body").append(msg);
			}
		});
	}
}
function show_shop(id) {
	$("#shop_moderate_details_"+id).toggle();
	return false;
}
function shop_confirm(title, url) {
	if (confirm("Вы действительно хотите удалить магазин " + title + "?")) {
		window.location.replace(url);
	} else {
		return false;
	}
}
function sales_confirm(title, url) {
	if (confirm("Вы действительно хотите удалить акцию " + title + "?")) {
		window.location.replace(url);
	} else {
		return false;
	}
}

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

$('#add_shop_page #assortiment .inner_cat input[type=checkbox]').click(function(){
	var id = $(this).attr("data-parent");
	
	var z = 0;
	$('#add_shop_page #assortiment input[type=checkbox]').each(function(i, el){
		if (($(this).attr("data-parent") == id) && ($(this).is(':checked'))) {
			z++;
		}
	});
	
	var f = 0;
	$('#add_shop_page #assortiment input[type=checkbox]').each(function(i, el){
		if (($(this).hasAttr("data-parent")) && ($(this).is(':checked'))) {
			f++;
		}
	});
	
	var all = 0;
	$('#add_shop_page #assortiment input[type=checkbox]').each(function(i, el){
		if (($(this).hasAttr("data-parent")) && ($(this).is(':checked'))) {
			all++;
		}
	});
	console.log("Всего: "+all);

	if ($(this).is(':checked')) {				
		if (z == 1) {			
			$('#parent_cat'+id+' input[type=checkbox]').attr("checked","checked");
			$('#parent_cat'+id).find("input:checkbox").prop('checked', true);
			$('#parent_cat'+id).addClass("red_light");
			if ($(this).attr("data-subparent")) {
				$('#subparent_cat'+$(this).attr("data-subparent")).prop('checked', true);
				console.log($(this).attr("data-subparent"));
			}
		} else if (all > 7) {
			alert("Вы можете выбрать максимум 7 категорий");
			return false;
		} 
		console.log(z);
	} else {
		if (z == 0) {
			$('#parent_cat'+id+' input[type=checkbox]').removeAttr("checked");
			$('#parent_cat'+id).removeClass("red_light");
		}
		$(this).removeAttr("checked");
	}
});
/**/
$('#edit_shop_form').submit(function(e){
	if ($("#f_name").val() == "") {
		alert("Пожалуйста, укажите название магазина");
		$("#f_name").focus();
		return false;
	}
	if ($("#block_choose").val() == 0) {
		alert("Пожалуйста, выберите город и район");
		$("#block_choose").focus();
		return false;
	}
	
	var y = 0;
	$('#add_shop_page #assortiment .inner_cat input[type=checkbox]').each(function(i, el){
		if ($(this).is(':checked')) {
			y++;
		}
	});		
	if (y == 0) {
		alert("Пожалуйста, выберите хотя бы одну категорию для Вашего магазина");
		return false;
	}
});

function show_admin_menu() {
	if ($("#admin_menu").css("display") == "none") {		
		$("#admin_menu").slideDown("normal");
	} else {
		$("#admin_menu").slideUp("normal");		
	}
}
function geo_change(geo_city) {
	$.ajax({
		type: "POST",
		url: "/geo_change.php",
		data: { 
			geolocation: geo_city,
			geomode: "force"
		},
		success: function(msg){
			$("body").append(msg);
		}
	});	
}
function geo_change_show() {
	$("#city_info").css("display", "none");
	$("#city_geo_choose").css("display", "block");
}
$(document).ready(function(){
	/*if($('*').is('#side_popular')) {
		var fix = $('#side_popular');
		var elementOffset = fix.offset().top;
		var elementOffsetLeft = fix.offset().left;
		var elementWidth = fix.width();
		
		$(window).scroll(function(){
			if ($(window).scrollTop() > elementOffset && fix.hasClass('normal') ){
				fix.removeClass('normal').addClass('fix');
				fix.width(elementWidth);
				fix.css("left", elementOffsetLeft);
				$("#side_popular form.scroll_menu").height($(window).height()-$("#side_popular .title_block").height()-50);
			} else if ($(window).scrollTop() <= elementOffset && fix.hasClass('fix')) {
				fix.removeClass('fix').addClass('normal');
				fix.removeAttr("style");
			}
		});
	}*/
	if($('*').is('#carousel-example-generic-shop')) {
		var z = 0;
		$('#carousel-example-generic-shop').on('slid.bs.carousel', function () {
			$('#sale_thumbs div').removeClass("active");
			z = $('#carousel-example-generic-shop .carousel-indicators .active').attr('data-slide-to');
			console.log(z);
			$('#sale_item'+z).addClass("active");
		})
	}
});

$("#addshop_shoplist #main_filter_city_list .dropdown_block_punkt").click(function(){	
	if ($(this).find("strong").length > 0) {		
		$("#shop_details_city_name").val($(this).find("strong").html());
	} else {
		$("#shop_details_city_name").val($(this).html());
	}
	$("#shop_details_city").val($(this).attr("data-city"));

	$.ajax({
		type: "POST",
		url: "/lk_addshop_subway.php",
		data: { 
			city_id: $(this).attr("data-city")
		},
		success: function(msg){
			$("#subway_choose").html(msg);
		}
	});		
});
$(document).ready(function() {
    var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
  
    function show_tooltip() {
        target  = $("#tooltip_target");
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
  
        if( !tip || tip == '' )
            return false;
  
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
  
        var init_tooltip = function()
        {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
  
            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;
  
            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
  
            if( pos_left + tooltip.outerWidth() > $( window ).width() )
            {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
  
            if( pos_top < 0 )
            {
                var pos_top  = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
  
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };
  
        init_tooltip();
        $( window ).resize( init_tooltip );
  
        var remove_tooltip = function() {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });
  
            target.attr( 'title', tip );
        };
  
		/*
			target.bind( 'mouseleave', remove_tooltip );
			tooltip.bind( 'click', remove_tooltip );
		*/
    }
	show_tooltip();
});
function show_modal_geo_change() {
	$("#tooltip").animate( { top: '-=10', opacity: 0 }, 50, function() {
		$(this).remove();
	});
	tip = $("#tooltip_target").attr( 'title' );
	$("#tooltip_target").attr( 'title', tip );
	geo_change_show();
	$("#geo_modal").modal("show");
}
function close_modal_geo_change() {
	$("#tooltip").css("display","none");
}


$("#main_menu_tabs li a").mouseenter(function() {
	$("#main_submenu" + ($(this).attr("data-submenu"))).css("display", "block");
});

$("#main_menu_tabs li a").mouseleave(function() {
	$("#main_submenu" + ($(this).attr("data-submenu"))).css("display", "none");
});
$("#main_submenu_container .main_submenu").mouseenter(function() {
	$(this).css("display", "block");
});
$("#main_submenu_container .main_submenu").mouseleave(function() {
	$(this).css("display", "none");
});

$('#s').on("input", function() {
    var dInput = this.value;
	$.ajax({
		url : '/city_search.php',
		type: 'POST',
		data:{
			'term'  :dInput
		},
		success:function(result){
			$('#maincity_result').fadeIn().html(result);
		}
	});
});
$('#s').focusout(function(){
	$('#maincity_result').fadeOut();
});

$('#s_search_city').on("input", function() {
    var dInput = this.value;
	$.ajax({
		url : '/search_city_list.php',
		type: 'POST',
		data:{
			'term'  :dInput
		},
		success:function(result){
			$('#s_search_result').fadeIn().html(result);
		}
	});
});
$('#s_search_city').focusout(function(){
	$('#s_search_result').fadeOut();
});
$("#s_search_result a").click(function(){
	//alert($(this).attr("data-city"));
	/*filter_city($(this).attr("data-city"));
	$('#s_search_result').fadeOut('slow','linear');
	$('#s_search_city').val($(this).html());
	$('#main_filter_city_field').val($(this).attr("data-city"));
	$('#main_filter_metro_title').html("Метро");
	$('#main_filter_metro').fadeIn('slow','linear');
	$('#main_filter_metro_title').addClass('open_punkt');*/
});
function check_city(obj) {
	filter_city($(obj).attr("data-city"));
	$('#s_search_result').fadeOut('slow','linear');
	$('#s_search_city').val($(obj).html());
	$('#main_filter_city_field').val($(obj).attr("data-city"));
	$('#main_filter_metro_title').html("Метро");
	$('#main_filter_metro').fadeIn('slow','linear');
	$('#main_filter_metro_title').addClass('open_punkt');
}
function show_full_list() {
    $.ajax({
		url : '/show_full_list_cities.php',
		type: 'POST',
		data:{},
		success:function(result){
			$('#maincity_list_container').html(result);
		}
	});
}
function show_letter_list(letter) {
    $.ajax({
		url : '/show_letter_list_cities.php',
		type: 'POST',
		data:{
			'letter' : letter
		},
		success:function(result){
			$('#maincity_list_container').html(result);
		}
	});
}
function show_shortlist() {
    $.ajax({
		url : '/show_all_cities.php',
		type: 'POST',
		data:{},
		success:function(result){
			$('#maincity_list_container').html(result);
		}
	});
}
function show_phone(id,city) {
    $.ajax({
		url : '/show_phone.php',
		type: 'POST',
		data:{
			'id'  	:id,
			'city'	: city
		},
		success:function(result){
			$('#show_phone_button'+id).html(result);
			$('#phone_footer_desc'+id).fadeIn(result);
		}
	});
}
function close_phone(id) {
	$('#phone_footer_desc'+id).fadeOut();
}
function show_phone_shop(id,city) {
    $.ajax({
		url : '/show_phone_shop.php',
		type: 'POST',
		data:{
			'id'  	:id,
			'city'	: city
		},
		success:function(result){
			$('#show_phone_button'+id).html(result);
		}
	});
}

$("#search_shop_maincategories .dropdown_block_punkt").mouseenter(function() {
	$("#search_shop_maincategories .dropdown_block_punkt").removeClass("active");
	$(this).addClass("active");
	$("#search_shop_subcategories .s_category").css("display", "none");
	$("#s_category" + $(this).attr("data-store")).css("display", "block");
});
$("#search_shop_title").click(function(){
	if($('#search_shop_categories').css('display') == 'none') {
		$("#search_shop_bg").css("display","block");
		$('#search_shop_categories').css('display','block');
	} else {
		$("#search_shop_bg").css("display","none");
		$('#search_shop_categories').css('display','none');
	}
});
$("#search_shop_bg").click(function(){
	$('#search_shop_bg').css('display','none');
	$('#search_shop_categories').css('display','none');
});
$("#search_shop_categories .dropdown_block_punkt").click(function(){
	$('#search_shop_bg').css('display','none');
	$('#search_shop_categories').fadeOut('slow','linear');
	$('#search_shop_title').html($(this).html());
	$('#main_filter_store_field').val($(this).attr("data-store"));
});
$("#search_shop_subcategories a").click(function(){
	$('#search_shop_bg').css('display','none');
	$('#search_shop_categories').fadeOut('slow','linear');
	$('#search_shop_title').html($(this).html());
	$('#main_filter_store_field').val($(this).attr("data-store"));
});
$("#city_change .title_block").click(function(){
	$('#city_change div.scroll_menu').toggle();
});
function show_submenu(el,id) {
	if ($(el).hasClass("open")) {
		$(el).removeClass("open");
		$('.sidebar_top_parent'+id).css("display","none");
	} else {
		$(el).addClass("open");		
	}
	$('.sidebar_parent'+id).toggle();
}
$(".selector_title a.selector_link").click(function(){
	if ($(this).parent().find(".selector_content").css("display") == "block") {
		$(this).parent().find(".selector_content").fadeOut();
	} else {
		$(this).parent().find(".selector_content").fadeIn();
	}
});
$(".selector_title a.select_categories").click(function(){
	if ($("#sales_search_categories").css("display") == "block") {
		$("#sales_search_categories").fadeOut();
	} else {
		$("#sales_search_categories").fadeIn();
	}
});

$('.shop_details_type_radio').change(function() {
    if (this.value == 'roznichniy') {
        $("#roznichniy_details").css("display","block");
        $("#setevoy_details").css("display","none");
        $("#f_workhours_group").css("display","block");
    } else {
        $("#roznichniy_details").css("display","none");
        $("#setevoy_details").css("display","block");
        $("#f_workhours_group").css("display","none");
    }
});
$("#map_container .map_link").click(function(){
	if ($(this).hasClass("opened")) {
		$('#map').slideDown("slow");
		$(this).removeClass("opened");
		$(this).html("Скрыть карту");
	} else {
		$('#map').slideUp("slow");
		$(this).addClass("opened");
		$(this).html("Показать карту");
	}
});
$("#sales_shop_filter .owl-carousel").owlCarousel({
    loop:true,
    margin:20,
    responsiveClass:true,
	nav:true,
	loop:true,
	dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
});

$("#appModal a.close").on("click", function() {
    $("#appModal").css("display", "none");
    $("#appModalBg").css("display", "none");
    
    var date = new Date();
    var minutes = 100000; // <--- нужное количество минут
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    $.cookie('sd_app', "close", { expires: date, path: '/' });
});