<?php

namespace App\Http\Controllers;

use App\Models\Board;

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
}
