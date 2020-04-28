<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $guarded = [];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function cases()
    {
        return $this->hasMany(Cases::class, 'state_id','id');
    }
}
