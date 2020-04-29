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
                'c' => round($this->capita['confirmed'],4),
                'd' => round($this->capita['deaths']),
                'r' => round($this->capita['recovered']),
            ],
            'average' => [
                'c' => round($this->average['confirmed'],4),
                'd' => round($this->average['deaths'],4),
                'r' => round($this->average['recovered'],4),
            ],
            'growth' => [
                'c' => round($this->growthfactor['confirmed'],4),
                'd' => round($this->growthfactor['deaths'],4),
                'r' => round($this->growthfactor['recovered'],4),
            ],
        ];
    }
}
