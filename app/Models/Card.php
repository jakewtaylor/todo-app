<?php

namespace App\Models;

use App\Events\CardCreated;
use App\Events\CardUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body'];

    protected $dispatchesEvents = [
        'created' => CardCreated::class,
        'updated' => CardUpdated::class,
    ];

    public function column()
    {
        return $this->belongsTo(Column::class);
    }
}
