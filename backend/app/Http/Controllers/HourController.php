<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hour;

class HourController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getHours() {
        return Hour::where('user_id', '=', \Auth::user()->id)->orderBy('date', 'desc')->get();
    }

    public function postHours(Request $request) {

        $dt = $request->input('date');
        $date = $dt['year'] . '/' . $dt['month'] . '/' . $dt['day'] . '00:00:01';

        $hours = new Hour;

        $hours->date = \Carbon\Carbon::parse($date)->format('Y-m-d H:i:s');
        $hours->hours = $request->input('hours');
        $hours->user_id = \Auth::user()->id;
//        dd($hours->date);
        $hours->save();

        return response()->json([
            'Success' => 'Ok',
            'hours' => $hours,
        ], 201);
    }

    public function updateHours(Request $request) {
        $hours = Hour::find($request->input('id'));
        if(!$hours) return response('', 404);
        if($hours->user_id != \Auth::user()->id) return response('', 403);

        $dt = $request->input('date');
        $date = $dt['year'] . '/' . $dt['month'] . '/' . $dt['day'] . '00:00:01';

        $hours->date = \Carbon\Carbon::parse($date)->format('Y-m-d H:i:s');
        $hours->hours = $request->input('hours');
        $hours->save();

        return response()->json([
            'Success' => 'Ok',
            'hours' => $hours,
        ]);
    }

    public function deleteHours(Request $request) {
        $hours = Hour::find($request->input('id'));
        if(!$hours) return response('', 404);
        if($hours->user_id != \Auth::user()->id) return response('', 403);

        $hours->delete();

        return response()->json([
            'Success' => 'ok',
        ]);
    }
}
