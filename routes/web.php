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
Route::get('/statistics/oxford', 'StatsController@oxford');
Route::get('/statistics/harvest_time_series', 'StatsController@harvest_time_series');

Route::get('/statistics/rankings', 'StatsController@daily_ranking');
Route::get('/statistics/global_summary', 'StatsController@global_summary');
Route::get('/statistics/at_a_glance', 'StatsController@at_a_glance');
Route::get('/statistics/countries_list_map', 'StatsController@get_all_countries');


Route::get('/statistics/harvest_oxford', 'StatsController@harvest_oxford');
Route::get('/statistics/harvest_australia', 'StatsController@harvest_australia');
Route::get('/statistics/harvest_annotations', 'StatsController@harvest_annotations');
Route::get('/statistics/harvest_countries_and_states', 'StatsController@harvest_countries_and_states');
Route::get('/statistics/harvest_cases_from_jh_timeline_us', 'StatsController@harvest_cases_from_jh_timeline_us');
Route::get('/statistics/harvest_cases_from_jh_timeline_us/{full}', 'StatsController@harvest_cases_from_jh_timeline_us');
Route::get('/statistics/harvest_cases_from_jh_timeline_global', 'StatsController@harvest_cases_from_jh_timeline_global');
Route::get('/statistics/harvest_cases_from_jh_timeline_global/{full}', 'StatsController@harvest_cases_from_jh_timeline_global');
Route::get('/statistics/recalculate_global', 'StatsController@recalculate_global');

Route::get('/statistics/get_daily', 'StatsController@get_daily');
Route::get('/statistics/get_daily/{country_name}', 'StatsController@get_daily');
Route::get('/statistics/get_daily/{country_name}/{state_name}', 'StatsController@get_daily');

Route::get('/statistics/get_all_countries_and_states', 'StatsController@get_all_countries_and_states');
Route::get('/statistics/get_all_countries', 'StatsController@get_all_countries');
Route::get('/statistics/get_states_daily', 'StatsController@get_states_daily');
Route::get('/statistics/get_countries_daily', 'StatsController@get_countries_daily');

Route::get('/statistics/data_overrides', 'StatsController@data_overrides');

// Individual generation scripts for home page
Route::get('/statistics/generate_global_summary', 'StatsController@generate_global_summary');
Route::get('/statistics/generate_at_a_glance', 'StatsController@generate_at_a_glance');
Route::get('/statistics/generate_daily_ranking', 'StatsController@generate_daily_ranking');

// Individual generation scripts for comparison pages
Route::get('/statistics/generate_sidebar_list', 'StatsController@generate_sidebar_list');
Route::get('/statistics/generate_all_countries', 'StatsController@generate_all_countries');
Route::get('/statistics/generate_all_countries_daily', 'StatsController@generate_all_countries_daily');
Route::get('/statistics/generate_all_states_daily', 'StatsController@generate_all_states_daily');
Route::get('/statistics/generate_all_daily', 'StatsController@generate_all_daily');

Route::get('/statistics/all_scripts_index', 'StatsController@all_scripts_index');
Route::get('/statistics/update_database', 'StatsController@update_database');
Route::get('/statistics/update_json', 'StatsController@update_json');
Route::get('/statistics/update_all', 'StatsController@update_all');

Route::get('/statistics/get_ip_location', 'StatsController@get_ip_location');

Route::get('{any}', 'AppController@index')
    ->where('any','.*')
    ->name('home');



/*
 * To fully regenerate data run the following in order:
 * harvest_cases_from_jh_timeline_global
 * harvest_cases_from_jh_timeline_us
 * harvest_oxford
 * harvest_annotations
 * data_overrides
 * recalculate_global
 * generate_global_summary
 * generate_at_a_glance
 * generate_daily_ranking
 * generate_all_countries
 * generate_all_daily
 *
 */
