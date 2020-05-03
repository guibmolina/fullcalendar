<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'FullCalendarController@index')->name('callendar.index');

Route::get('/load-events', 'EventController@loadEvents')->name('load.events');

Route::put('/update-event', 'EventController@updateEvent')->name('update.event');

Route::post('/store-event', 'EventController@storeEvent')->name('store.event');

Route::delete('/destroy-event', 'EventController@destroyEvent')->name('destroy.event');

Route::delete('/destroy-fast-event', 'FastEventController@destroyEvent')->name('destroy.fastevent');

Route::post('/store-fast-event', 'FastEventController@storeEvent')->name('store.fastevent');

Route::put('/update-fast-event', 'FastEventController@updateEvent')->name('update.fastevent');

