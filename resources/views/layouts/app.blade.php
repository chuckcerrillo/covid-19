<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/img/favicon/site.webmanifest">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Covid-19 Tracker</title>


    <?php
    if($_SERVER['SERVER_NAME'] == 'coronavirus.makeitsimpler.com.au' || $_SERVER['SERVER_NAME'] == 'staging.makeitsimpler.com.au')
    {
    ?>
    <!-- Scripts -->
    <script src="{{ secure_asset('js/app.js') }}" defer></script>
    <!-- Styles -->
    <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
    <?php }
    else {?>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <?php }?>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">



    <!-- Mapbox -->
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet' />

    <?php
    if($_SERVER['SERVER_NAME'] == 'coronavirus.makeitsimpler.com.au')
    {
    ?>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163429737-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-163429737-1');
    </script>

    <?php
        }
    ?>
</head>
<body class="bg-gray-400 text-gray-800 antialiased font-sans">
    <div id="app">
        <main class="h-screen bg-baseslab text-heading">
            @yield('content')
        </main>
    </div>
</body>
</html>
