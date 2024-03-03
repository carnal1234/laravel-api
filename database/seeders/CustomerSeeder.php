<?php

namespace Database\Seeders;


use App\Models\Customer;
use App\Models\Invoice;


use Illuminate\Database\Seeder;


class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Customer::factory()
            ->count(25)
            ->has(Invoice::factory()->count(10))
            ->create();
        
        Customer::factory()
            ->count(100)
            ->has(Invoice::factory()->count(5))
            ->create();

        Customer::factory()
            ->count(100)
            ->has(Invoice::factory()->count(3))
            ->create();

        Customer::factory()
            ->count(5)
            ->create();
        
    }
}
