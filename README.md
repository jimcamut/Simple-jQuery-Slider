# Simple-jQuery-Slider
A simple, responsive jQuery slider.

Markup:
```html
<div class="slider">
    <ul class="slides">
        <li>
            Slide 1 - Add any HTML onto the list items - these are your slides
        </li>
        <li>
            Slide 2
        </li>
        <li>
            Etc...
        </li>
    </ul>
</div>
```
Now you can add some data attributes to overide the default settings:
<br/>Ex:
```html
<div class="slider" data-dots="false">
```

Options:

data-arrows: boolean (default true)
<br />data-dots: boolean (default true)
<br /> data-auto: boolean (default true)
<br /> data-interval: 6000 (milliseconds - delay between slide transitions)
<br /> data-speed: 1 (seconds - how long to animate the slide)
            
