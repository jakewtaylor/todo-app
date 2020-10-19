<?php

namespace Database\Factories;

use App\Models\Card;
use App\Models\Column;
use Illuminate\Database\Eloquent\Factories\Factory;

class CardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Card::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'column_id' => Column::factory(),
            'title' => $this->faker->sentence(4),
            'body' => implode('\n\n', $this->faker->paragraphs(2)),
        ];
    }
}
