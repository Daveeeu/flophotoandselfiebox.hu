<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@flophoto.hu')],
            [
                'name' => env('ADMIN_NAME', 'Flophoto Admin'),
                'email_verified_at' => now(),
                'password' => env('ADMIN_PASSWORD', 'ChangeMe123!'),
            ],
        );
    }
}
