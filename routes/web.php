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
Route::get('/statistics/at_a_glance', 'StatsController@at_a_glance');
Route::get('/statistics/countries_list_map', 'StatsController@countries_list_map');
Route::get('/statistics/harvest_countries_and_states', 'StatsController@harvest_countries_and_states');
Route::get('/statistics/harvest_cases_from_jh_timeline_us', 'StatsController@harvest_cases_from_jh_timeline_us');
Route::get('/statistics/harvest_cases_from_jh_timeline_global', 'StatsController@harvest_cases_from_jh_timeline_global');

Route::get('/statistics/get_daily', 'StatsController@get_daily');
Route::get('/statistics/get_daily/{country_name}', 'StatsController@get_daily');
Route::get('/statistics/get_daily/{country_name}/{state_name}', 'StatsController@get_daily');
Route::get('/statistics/recalculate_global', 'StatsController@recalculate_global');
Route::get('/statistics/get_all_countries_and_states', 'StatsController@get_all_countries_and_states');
Route::get('/statistics/get_all_countries', 'StatsController@get_all_countries');
Route::get('/statistics/get_states_daily', 'StatsController@get_states_daily');
Route::get('/statistics/get_countries_daily', 'StatsController@get_countries_daily');


Route::get('/statistics/generate_all_countries', 'StatsController@generate_all_countries');
Route::get('/statistics/generate_all_countries_daily', 'StatsController@generate_all_countries_daily');
Route::get('/statistics/generate_all_states_daily', 'StatsController@generate_all_states_daily');
Route::get('/statistics/generate_all_daily', 'StatsController@generate_all_daily');
Route::get('{any}', 'AppController@index')
    ->where('any','.*')
    ->name('home');
