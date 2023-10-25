<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;


/* User Authentication Routes */

Route::group(['prefix' => 'auth'], function () {
    // Registration Routes
    Route::post("register", [AuthController::class, "register"]);
    Route::post("login", [AuthController::class, "login"]);
    // Password Validation Routes
    Route::post("forget-password", [AuthController::class, "forgetPassword"]);
    Route::post("reset-password", [AuthController::class, "resetPassword"]);
    // Verification Routes
    Route::get("verify/email/{token}", [AuthController::class, "verifyEmail"]);
    
    Route::group(['middleware' => 'auth:api'], function () {
        // Logout / Logout All Devices
        Route::post("logout", [AuthController::class, "logout"]);
        // Verification Routes
        Route::post("send/otp", [AuthController::class, "sendOTP"]);
        Route::post("verify/otp", [AuthController::class, "verifyOTP"]);
    });
});
