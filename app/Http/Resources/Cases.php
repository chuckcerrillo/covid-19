<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Cases extends JsonResource
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
            'date' => $this->date,
            'c' => $this->confirmed,
            'd' => $this->deaths,
            'r' => $this->recovered,
            'a' => $this->active,
            'delta' => [
                'c' => $this->delta['confirmed'],
                'd' => $this->delta['deaths'],
                'r' => $this->delta['recovered'],
            ],
            'capita' => [
                'c' => $this->capita['confirmed'],
                'd' => $this->capita['deaths'],
                'r' => $this->capita['recovered'],
            ],
            'average' => [
                'c' => $this->average['confirmed'],
                'd' => $this->average['deaths'],
                'r' => $this->average['recovered'],
            ],
            'growth' => [
                'c' => $this->growthfactor['confirmed'],
                'd' => $this->growthfactor['deaths'],
                'r' => $this->growthfactor['recovered'],
            ],
        ];
    }
}
