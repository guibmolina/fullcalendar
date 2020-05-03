<?php

namespace App\Http\Controllers;

use App\FastEvent;
use Illuminate\Http\Request;

class FullCalendarController extends Controller
{
    public function index()
    {
        $fastEvents = FastEvent::all();
        return view('fullcalendar.master', compact('fastEvents'));
    }
}
