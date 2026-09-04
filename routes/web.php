<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\OutreachController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::get('/', fn () => redirect()->route('dashboard'));


/*
|--------------------------------------------------------------------------
| AUTHENTICATED
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    | Dashboard
    */
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');


    /*
    | Candidates
    */
    Route::get('/candidates',              [CandidateController::class, 'index'])  ->name('candidates.index');
    Route::get('/candidates/create',       [CandidateController::class, 'create']) ->name('candidates.create');
    Route::post('/candidates',             [CandidateController::class, 'store'])  ->name('candidates.store');
    Route::get('/candidates/{candidate}',  [CandidateController::class, 'show'])   ->name('candidates.show');
    Route::patch('/candidates/{candidate}',[CandidateController::class, 'update']) ->name('candidates.update');
    Route::delete('/candidates/{candidate}',[CandidateController::class,'destroy'])->name('candidates.destroy');


    /*
    | CV Import
    */
    Route::get('/cv/import',  [CVController::class, 'import'])->name('cv.import');
    Route::post('/cv/import', [CVController::class, 'store']) ->name('cv.store');


    /*
    | Jobs / Vacancies
    */
    Route::get('/jobs',              [JobController::class, 'index'])  ->name('jobs.index');
    Route::get('/jobs/create',       [JobController::class, 'create']) ->name('jobs.create');
    Route::post('/jobs',             [JobController::class, 'store'])  ->name('jobs.store');
    Route::get('/jobs/{job}',        [JobController::class, 'show'])   ->name('jobs.show');
    Route::delete('/jobs/{job}',     [JobController::class, 'destroy'])->name('jobs.destroy');


    /*
    | Interviews
    */
    Route::get('/interviews',              [InterviewController::class, 'index'])  ->name('interviews.index');
    Route::get('/interviews/create',       [InterviewController::class, 'create']) ->name('interviews.create');
    Route::post('/interviews',             [InterviewController::class, 'store'])  ->name('interviews.store');
    Route::patch('/interviews/{interview}',[InterviewController::class, 'update']) ->name('interviews.update');


    /*
    | Outreach
    */
    Route::get('/outreach',  [OutreachController::class, 'index'])->name('outreach.index');
    Route::post('/outreach', [OutreachController::class, 'store'])->name('outreach.store');


    /*
    | Analytics
    */
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');


    /*
    | Settings
    */
    Route::get('/settings', fn () => Inertia::render('Settings/Index'))->name('settings.index');


    /*
    | Profile
    */
    Route::get('/profile',    [ProfileController::class, 'edit'])   ->name('profile.edit');
    Route::patch('/profile',  [ProfileController::class, 'update']) ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});


require __DIR__.'/auth.php';
