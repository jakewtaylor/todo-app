<?php

namespace App\Http\Requests;

use App\Models\Column;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCardRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'string|nullable',
            'body' => 'string|nullable',
            'column_id' => 'numeric|nullable',
        ];
    }

    public function getUpdates(): array
    {
        $data = [];

        if (!is_null($this->title)) {
            $data['title'] = $this->title;
        }

        if (!is_null($this->body)) {
            $data['body'] = $this->body;
        }

        return $data;
    }

    public function getNewColumn(): ?Column
    {
        if (!$this->column_id) return null;

        return Column::find($this->column_id);
    }
}
