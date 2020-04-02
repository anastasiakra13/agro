(function($){
	$(function() {
        $('.burger').on('click', function()
        {
            $(this).closest('.menu').toggleClass('menu_open');
        });
        $(this).closest('.menu').removeClass('menu_open');
        });
    });
});