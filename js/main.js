(function($){

    $(document).ready(function() {
        // create weather object
        var weather = new Weather();

        // grab radio buttons
        var citySelector = $('input[name=city]:radio');

        // on click make request
        citySelector.change(function () {
            // disable radio buttons until call complete
            $('input[name=city]:radio').each(function(i) {
                $(this).attr('disabled', 'disabled');
            });

            // make request
            weather.getWeatherForCity($('input[name=city]:radio:checked').val(), function() {
                // reenable radio buttons
                $('input[name=city]:radio').each(function(i) {
                    $(this).removeAttr( "disabled" );
                });
            });
        });
    });

})(jQuery);
