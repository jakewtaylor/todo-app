<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardRequest;
use App\Http\Requests\UpdateCardRequest;
use App\Models\Board;
use App\Models\Card;
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
                $q->with([
                    'cards' => function ($q) {
                        $q->latest('updated_at');
                    },
                ]);
            },
        ]);
    }

    public function storeCard(CreateCardRequest $request, Column $column)
    {
        $card = $column->cards()->create($request->only('title', 'body'));

        return $card;
    }

    public function updateCard(UpdateCardRequest $request, Card $card)
    {
        $updates = $request->getUpdates();
        $card->update($updates);

        if ($column = $request->getNewColumn()) {
            $card->column()->associate($column);
        }

        $card->save();

        return $card;
    }

    public function test(Card $card)
    {
        // dd(phpinfo());
        $card->save();
    }
}
