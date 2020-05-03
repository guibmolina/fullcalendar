<?php

namespace App\Http\Controllers;


use App\FastEvent;
use App\Http\Requests\FormFastEvent;
use Illuminate\Http\Request;

class FastEventController extends Controller
{
    public function destroyEvent(Request $request)
    {
        FastEvent::where('id', $request->id)->delete();

        return response()->json();
    }

    public function storeEvent(FormFastEvent $request)
    {
        FastEvent::create($request->all());
        return response()->json();

    }

    public function updateEvent(FormFastEvent $request)
    {
        $event = FastEvent::where('id', $request->id)->first();

        $event->fill($request->all());

        $event->save();

        return response()->json();
    }
}
