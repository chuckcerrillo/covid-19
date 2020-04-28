<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $guarded = [];
    public function state()
    {
        return $this->hasMany(State::class, 'country_id','id');
    }
}
