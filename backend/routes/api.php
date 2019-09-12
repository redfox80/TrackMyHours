<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth',
    'middleware' => ['cors'],
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'middleware' => 'cors',
], function () {
    Route::get('hours', 'HourController@getHours');
    Route::post('hours', 'HourController@postHours');
    Route::patch('hours', 'HourController@updateHours');
    Route::delete('hours/{id}', 'HourController@deleteHours');

    Route::group([
        'prefix' => 'statistics',
        'namespace' => 'Statistics',
    ], function() {
        Route::group([
            'prefix' => 'hours',
        ], function() {
            Route::get('total', 'HourStatisticsController@getTotal');
            Route::post('period', 'HourStatisticsController@postPeriod');
        });
    });
});
