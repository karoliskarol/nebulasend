<?php

use Router\Route;
use Controllers as C;
use Controllers\Auth as CA;

Route::post('/registration/', C\Registration::class);
Route::post('/login/', C\Login::class);

Route::get('/checkAuth/', C\checkAuth::class);

Route::delete('/logOut/', CA\LogOut::class);
Route::delete('/logOutAllDevices/', CA\LogOutAllDevices::class);
Route::post('/newMessage/', CA\NewMessage::class);
Route::get('/getMessages/', CA\GetMessages::class);
Route::get('/read/', CA\Read::class);
Route::put('/changePassword/', CA\ChangePassword::class);

?>