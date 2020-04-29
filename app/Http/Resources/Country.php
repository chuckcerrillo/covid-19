<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Country extends JsonResource
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
            'states' => new StateCollection($this->state),
            'total' => $this->total(),
            'lat' => $this->lat,
            'lng' => $this->lng,
        ];
    }
}
