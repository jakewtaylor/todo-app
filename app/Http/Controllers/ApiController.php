<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardRequest;
use App\Models\Board;
use App\Models\Column;

class ApiController extends Controller
{
    public function boards()
    {
        $boards = Board::all();

        return $boards;
    }

    public function board(Board $board)
    {
        return $board->load([
            'columns' => function ($q) {
                $q->with('cards');
            },
        ]);
    }

    public function storeCard(CreateCardRequest $request, Column $column)
    {
        $card = $column->cards()->create($request->only('title', 'body'));

        return $card;
    }
}
