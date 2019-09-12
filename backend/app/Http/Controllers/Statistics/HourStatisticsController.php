<?php

namespace App\Http\Controllers\Statistics;

use App\Http\Controllers\Controller;
use App\Hour;
use Illuminate\Http\Request;

class HourStatisticsController extends Controller {

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getTotal()
    {
        $hours = Hour::where('user_id', \Auth::user()->id)->get();
        $total = 0;

        foreach($hours as $hour) {
            $total += (double)$hour->hours;
        }

        return response()->json([
            'total' => $total,
        ]);
    }

    public function postPeriod(Request $request)
    {
        $fdt = $request->input('from');
        $from = $fdt['year'] . '-' . $fdt['month'] . '-' . $fdt['day'] . ' 00:00:01';

        $tdt = $request->input('to');
        $to = $tdt['year'] . '-' . $tdt['month'] . '-' . $tdt['day'] . ' 00:00:01';

        $hours = Hour::where('user_id', \Auth::user()->id)
            ->where('date', '<=', \Carbon\Carbon::parse($to))
            ->where('date', '>=', \Carbon\Carbon::parse($from))
            ->select(['id', 'date', 'hours'])
            ->orderBy('date', 'desc')
            ->get();

        $total = 0;
        foreach($hours as $hour)
        {
            $total += (double)$hour->hours;
        }

        return response()->json([
            'hours' => $hours,
            'total' => $total,
        ]);
    }

}
