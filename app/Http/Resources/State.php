<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class State extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'population' => $this->population,
//            'country' => $this->country,
            'total' => $this->total(),
            'lat' => $this->lat,
            'lng' => $this->lng,
        ];
    }
}
