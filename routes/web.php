<?php

use Illuminate\Support\Facades\Route;


Route::get('/stats', 'StatsController@index');
Route::get('/stats/harvest', 'StatsController@harvest');
Route::get('{any}', 'AppController@index')
    ->where('any','.*')
    ->name('home');
