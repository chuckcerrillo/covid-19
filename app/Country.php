<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Country extends Model
{
    protected $guarded = [];
    public function state()
    {
        return $this->hasMany(State::class, 'country_id','id');
    }

    public function total()
    {
        $date = DB::table('cases')
            ->selectRaw('distinct (date) as date')
            ->orderBy('date','desc')
            ->limit(1)
            ->get()->first();

        $date = $date->date;

        $result = DB::table('cases')
            ->selectRaw('date, SUM(confirmed) AS confirmed, SUM(deaths) AS deaths, SUM(recovered) AS recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('countries.id','=',$this->id)
            ->where('cases.date','=',$date)
            ->groupBy('date')
            ->orderBy('cases.date','desc')
            ->get()->first();

        if($result)
        {
            $result->confirmed = intval($result->confirmed);
            $result->deaths = intval($result->deaths);
            $result->recovered = intval($result->recovered);
        }
        return $result;
    }
}
