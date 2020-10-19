<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\Column;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Board::factory()->has(
            Column::factory()->has(
                Card::factory()->count(6)
            )->count(4)
        )->count(2)->create();
    }
}
