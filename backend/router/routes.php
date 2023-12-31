<?php

use Router\Route;
use Controllers as C;
use Controllers\Auth as CA;
use Controllers\Auth\Settings as CAS;

Route::post('/registration/', C\Registration::class);
Route::post('/login/', C\Login::class);

Route::get('/checkAuth/', C\CheckAuth::class);
Route::get('/getStatistics/', C\GetStatistics::class);
Route::post('/contactSupport/', C\ContactSupport::class);

Route::delete('/logOut/', CA\LogOut::class);
Route::delete('/logOutAllDevices/', CA\LogOutAllDevices::class);
Route::post('/newMessage/', CA\NewMessage::class);
Route::get('/getMessages/', CA\GetMessages::class);
Route::get('/read/', CA\Read::class);
Route::put('/settings/changePassword/', CAS\ChangePassword::class);
Route::put('/settings/changeRecipient/', CAS\ChangeRecipient::class);
Route::put('/changeStarring/', CA\ChangeStarring::class);
Route::put('/moveTrashBin/', CA\MoveTrashBin::class);
Route::delete('/deleteMessage/', CA\DeleteMessage::class);

?>