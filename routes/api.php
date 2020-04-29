<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::get('/stats','StatsController@index');
Route::get('/stats/full','StatsController@full');
Route::get('/stats/harvest', 'StatsController@master');
Route::get('/stats/states', 'StatsController@states');
Route::get('/stats/countries', 'StatsController@countries');
Route::get('/stats/annotations', 'StatsController@annotations');
Route::get('/stats/global', 'StatsController@global');
Route::get('/stats/oxford', 'StatsController@oxford');
Route::get('/stats/rankings', 'StatsController@daily_ranking');
Route::get('/stats/global_summary', 'StatsController@global_summary');
Route::get('/stats/at_a_glance', 'StatsController@at_a_glance');
Route::get('/stats/countries_list_map', 'StatsController@countries_list_map');


Route::get('/stats/get_daily', 'StatsController@get_daily');
Route::get('/stats/get_daily/{country_name}', 'StatsController@get_daily');
Route::get('/stats/get_daily/{country_name}/{state_name}', 'StatsController@get_daily');
Route::get('/stats/recalculate_global', 'StatsController@recalculate_global');
Route::get('/stats/get_all_countries_and_states', 'StatsController@get_all_countries_and_states');
Route::get('/stats/get_all_countries', 'StatsController@get_all_countries');
Route::get('/stats/get_countries_daily', 'StatsController@get_countries_daily');
Route::get('/stats/get_states_daily', 'StatsController@get_states_daily');
Route::get('/stats/generate_all_countries', 'StatsController@generate_all_countries');
Route::get('/stats/generate_all_countries_daily', 'StatsController@generate_all_countries_daily');
Route::get('/stats/generate_all_states_daily', 'StatsController@generate_all_states_daily');
Route::get('/stats/generate_all_daily', 'StatsController@generate_all_daily');
