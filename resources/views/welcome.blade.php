<!DOCTYPE html>
<html class="h-full">

<head>
    <title>{{ config('app.name') }}</title>

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body class="h-full bg-gray-200 antialiased">
    <div id="app" class="h-full"></div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>