<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="coronavirus, coronavirus tracker, covid-19, covid-19 tracker, sars-cov-2, novel coronavirus"

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Covid-19 Tracker</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">


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
        <main class="h-screen bg-base text-heading">
            @yield('content')
        </main>
    </div>
</body>
</html>
