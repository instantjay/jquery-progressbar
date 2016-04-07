# jquery-progressbar
Simple plugin for turning an element into a dynamic progress bar.

## Usage

Apply the plugin to an element.

`$('.my-progressbar').progressbar(100, 0);`

Increase the bar by using method `.increase(value)`.

`$('my-progressbar').increase(10);`

And then decrease it a little bit by using method `.decrease(value)`.

`$('my-progressbar').decrease(5);`