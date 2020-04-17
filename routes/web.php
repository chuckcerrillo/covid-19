<?php

use Illuminate\Support\Facades\Route;


Route::get('/statistics', 'StatsController@index');
Route::get('/statistics/countries', 'StatsController@countries');
Route::get('/statistics/harvest', 'StatsController@master');
Route::get('/statistics/states', 'StatsController@states');
Route::get('/statistics/master', 'StatsController@master');
Route::get('/statistics/annotations', 'StatsController@annotations');
Route::get('/statistics/global', 'StatsController@global');
Route::get('/statistics/worldometer', 'StatsController@harvest_worldometer');
Route::get('/statistics/manual', 'StatsController@manual_override');
Route::get('{any}', 'AppController@index')
    ->where('any','.*')
    ->name('home');
