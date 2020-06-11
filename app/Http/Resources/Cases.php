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
            'c' => (int) $this->confirmed,
            'd' => (int) $this->deaths,
            'r' => (int) $this->recovered,
            'a' => (int) $this->active,
            'delta' => [
                'c' => (int) $this->delta['confirmed'],
                'd' => (int) $this->delta['deaths'],
                'r' => (int) $this->delta['recovered'],
            ],
            'capita' => [
                'c' => round($this->capita['confirmed'],4),
                'd' => round($this->capita['deaths'],4),
                'r' => round($this->capita['recovered'],4),
                'a' => round($this->capita['active'],4),
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
