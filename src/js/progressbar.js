(function ($) {
    $.fn.progressbar = function(maxValue, startValue) {

        var plugin = this;
        var currentValue = 0;

        var origBar;
        var origBarRate = 0;

        var diffBar;
        var diffBarRate = 0;

        plugin.init = function(maxValue, startValue) {
            // Make parameters fall back to decent values if not set.
            maxValue = (maxValue ? maxValue : 100);
            startValue = (startValue ? startValue : 0);

            // Make sure params make sense.
            if(startValue > maxValue)
                return false;

            currentValue = startValue;

            // Create bar elements inside the container
            this.html('<div class="bar origin"></div><div class="bar differential"></div>');
            origBar = $('.bar.origin', plugin);
            diffBar = $('.bar.differential', plugin);

            if(startValue > 0) {
                calculatedRate = startValue/maxValue;
                plugin.setBar(calculatedRate);
            }
        };

        plugin.increase = function(value) {
            joinDiffAndOriginBars();

            diffBar.removeClass('negative');
            diffBar.addClass('positive');

            calculatedDiffBarRate = value / maxValue;
            animate(diffBar, calculatedDiffBarRate);

            diffBarRate = calculatedDiffBarRate;

            currentValue += value;
        };

        plugin.decrease = function(value) {
            plugin.setBar(origBarRate);

            diffBar.removeClass('positive');
            diffBar.addClass('negative');

            calculatedOrigBarRate = (currentValue - value) / maxValue;
            calculatedDiffBarRate = value / maxValue;

            diffBarRate = 0;
            diffBar.css('width', diffBarRate);

            // Simultaneously decrease origBar while expanding diffBar.
            animate(origBar, calculatedOrigBarRate);
            animate(diffBar, calculatedDiffBarRate);

            origBarRate = calculatedOrigBarRate;
            diffBarRate = calculatedDiffBarRate;

            currentValue -= value;
        };

        plugin.setBar = function(rate) {
            origBarRate = rate;
            diffBarRate = 0;
            diffBar.css('width', diffBarRate);
            origBar.css('width', rateToPercent(rate));
            currentValue = maxValue * rate;
        };

        function animate(bar, rate) {
            bar.animate({width: rateToPercent(rate)}, 1000);
        }

        // Used before dynamically increasing or decreasing.
        function joinDiffAndOriginBars() {
            if(diffBarRate <= 0)
                return;

            console.log('Joined bars.');

            origBarRate += diffBarRate;
            diffBarRate = 0;
            diffBar.css('width', 0);

            plugin.setBar(origBarRate);
        }

        function rateToPercent(rate) {
            rate = rate * 100;
            return rate + '%';
        }

        plugin.init(maxValue, startValue);

        return this;
    }
}(jQuery));