<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            [
            'title' => 'Reunião',
            'start' => '2020-04-04 21:30:00',
            'end' => '2020-04-05 21:30:00',
            'color' => '#0022ff',
            'description' => 'Reunião'
            ],
            [
            'title' => 'Ligar para cliente',
            'start' => '2020-04-20',
            'end' => '2020-04-21',
            'color' => '#ff0059',
            'description' => 'Falar com cliente'
            ]
        ]);
    }
}
