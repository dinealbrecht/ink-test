/**
 * Weather
 *
 * Example Usage:
 * var weather = new Weather();
 *
 * @param options - set options for weather
 * @return object - Weather
 */
function Weather(options) {
    element = this;

    // merge settings
    this.settings = {};
    $.extend(this.settings, Weather.defaults, options);

    // initialise
    this.initWeather();

    return this;
}

/**
 * initWeather
 *
 * Example Usage:
 * textResizer.resize();
 */
Weather.prototype.initWeather = function() {
    // get dom bits
    this.templateSource     = $(this.settings.template).html();
    this.template           = Handlebars.compile(this.templateSource);
    this.container          = $(this.settings.container);
    
    // are we already looking up the weather?
    this.inProgress         = false;

    //this.getWeatherForCity('London');
};

/**
 * getWeatherForCity
 *
 * Example Usage:
 * weather.getWeatherForCity();
 */
Weather.prototype.getWeatherForCity = function(city, callback) {
    // don't start another ajax call if already in progress
    if (this.inProgress) return;

    this.inProgress = true;

    // TODO: make nice spinner for this
    element.container.html("waiting...");

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",uk",
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
    })
    .done(function( data ) {
        element.updateWeather(data, callback);
    })
    .error( function() {
        element.container.html("Sorry, error :)");
        this.inProgress = false;
        callback();
    });
};

/**
 * updateWeather
 *
 * Example Usage:
 * weather.updateWeather();
 */
Weather.prototype.updateWeather = function(data, callback) {
    var compiled = element.template(JSON.parse(data));
    element.container.html(compiled);
    element.inProgress = false;
    callback();
};

Weather.defaults = {
    'template' : '#weather-template',
    'container': '#weatherContainer'
};