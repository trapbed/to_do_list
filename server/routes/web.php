<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/login', [UserController::class, 'login'])->name('login');
Route::post('/tasks', [TaskController::class, 'create_task'])->name('create_task');
Route::get('/tasks', [TaskController::class, 'all_tasks'])->name('all_tasks');
Route::get('/tasks/{id}', [TaskController::class, 'one_task'])->name('one_task');
Route::post('/tasks/{id}', [TaskController::class, 'update_task'])->name('update_task');
Route::put('/tasks/{id}', [TaskController::class, 'update_task_info'])->name('update_task_info');
Route::delete('/tasks/{id}', [TaskController::class, 'delete_task'])->name('delete_task');