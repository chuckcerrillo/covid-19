<?php

use Illuminate\Support\Facades\Route;


Route::get('/statistics', 'StatsController@index');
Route::get('/statistics/countries', 'StatsController@countries');
Route::get('/statistics/harvest', 'StatsController@master');
Route::get('/statistics/transform', 'StatsController@transform');
Route::get('/statistics/states', 'StatsController@states');
Route::get('/statistics/master', 'StatsController@master');
Route::get('/statistics/annotations', 'StatsController@annotations');
Route::get('/statistics/global', 'StatsController@global');
Route::get('/statistics/worldometer', 'StatsController@harvest_worldometer');
Route::get('/statistics/wikipedia', 'StatsController@harvest_wikipedia');
Route::get('/statistics/manual', 'StatsController@manual_override');
Route::get('/statistics/harvest_oxford', 'StatsController@harvest_oxford');
Route::get('/statistics/oxford', 'StatsController@oxford');
Route::get('/statistics/harvest_time_series', 'StatsController@harvest_time_series');
Route::get('/statistics/rankings', 'StatsController@daily_ranking');
Route::get('/statistics/global_summary', 'StatsController@global_summary');
Route::get('{any}', 'AppController@index')
    ->where('any','.*')
    ->name('home');
