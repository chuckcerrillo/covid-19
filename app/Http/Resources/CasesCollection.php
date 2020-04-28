<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CasesCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'daily' => $this->collection,
        ];
    }
}
