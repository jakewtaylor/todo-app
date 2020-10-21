<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/boards', [ApiController::class, 'boards']);
Route::get('/boards/{board}', [ApiController::class, 'board']);

Route::post('/columns/{column}/cards', [ApiController::class, 'storeCard']);

Route::patch('/cards/{card}', [ApiController::class, 'updateCard']);
Route::get('/cards/{card}', [ApiController::class, 'test']);
