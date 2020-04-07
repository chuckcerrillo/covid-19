<?php

use Illuminate\Support\Facades\Route;


Route::get('/statistics', 'StatsController@index');
Route::get('/statistics/country/{country}', 'StatsController@country');
Route::get('/statistics/harvest', 'StatsController@harvest');
Route::get('{any}', 'AppController@index')
    ->where('any','.*')
    ->name('home');
