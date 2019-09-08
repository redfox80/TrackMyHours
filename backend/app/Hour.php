<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hour extends Model
{
    protected $table = 'hours';
    
    public function user() {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}
