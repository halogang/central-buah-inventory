<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Contracts\LoginResponse;
use Illuminate\Support\Facades\Route;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();

        $this->app->singleton(LoginResponse::class, function () {
            return new class implements LoginResponse {
                public function toResponse($request)
                {
                    $user = $request->user();

                    $permissions = $user->getAllPermissions()->pluck('name')->toArray();

                    $redirectPriority = [
                        'dashboard.view' => 'dashboard',

                        // Master
                        'barang.index' => 'master.items.index',
                        'kategori.index' => 'master.categories.index',
                        'supplier.index' => 'master.suppliers.index',
                        'pelanggan.index' => 'master.customers.index',
                        'gudang.index' => 'master.warehouses.index',

                        // Stok
                        'stock_realtime.index' => 'stok.realtime.index',
                        'stock_opname.index' => 'stok.stok-opname.index',

                        // Delivery
                        'delivery_order.index' => 'surat-jalan.index',
                        'delivery_schedule.index' => 'delivery-schedules.index',

                        // Invoice
                        'invoice.index' => 'invoice.index',

                        // POS
                        'pos.index' => 'pos.index',

                        // Finance
                        'finance.index' => 'keuangan.index',

                        // Report
                        'report.index' => 'laporan.index',
                    ];

                    foreach ($redirectPriority as $permission => $route) {
                        if (in_array($permission, $permissions) && Route::has($route)) {
                            return redirect()->route($route);
                        }
                    }

                    // fallback
                    return redirect('/login');
                }
            };
        });
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn () => Inertia::render('auth/register'));

        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
