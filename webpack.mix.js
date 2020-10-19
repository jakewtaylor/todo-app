const mix = require('laravel-mix');

require("laravel-mix-react-typescript-extension")

mix.reactTypeScript('resources/js/app.tsx', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [require('tailwindcss')])
