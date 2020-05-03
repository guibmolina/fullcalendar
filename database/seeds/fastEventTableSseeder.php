<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class fastEventTableSseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('fast_events')->insert([
            [
                'title' => 'Almoço',
                'start' => '13:30:00',
                'end' => '17:30:00',
                'color' => '#0022ff'
            ],
            [
                'title' => 'Academia',
                'start' => '18:30:00',
                'end' => '19:30:00',
                'color' => '#ff0059'
            ]
        ]);
    }
}
