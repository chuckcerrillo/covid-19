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
