# Simple-jQuery-Slider
A simple, responsive jQuery slider.

Markup:
```html
<div class="slider">
    <ul>
        <li>
            Add any HTML onto the list items - these are your slides
        </li>
    </ul>
</div>
```
Now you can add some data attributes to overide the default settings:
Ex: <div class="slider" data-dots="false">

Options:

data-arrows: boolean (default true)

data-dots: boolean (default true)
data-auto: boolean (default true)
data-interval: 6000 (milliseconds - delay between slide transitions)
data-speed: 1 (seconds - how long to animate the slide)
            
