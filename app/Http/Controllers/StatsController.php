<?php

namespace App\Http\Controllers;

use App\Http\Resources\Ward as WardResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StatsController extends Controller
{
    public function index()
    {

    }

    public function harvest()
    {
        define('COVID_DATA','../covid-data/csse_covid_19_data/csse_covid_19_daily_reports/');


        $result = array_diff(scandir(COVID_DATA), array('..', '.','README.md','.gitignore'));
        $data = [];

        foreach($result AS $row)
        {
            $date = str_replace('.csv','',$row);
            $filename = COVID_DATA . $row;
            $handle = fopen ( $filename ,'r');
            $contents = fread($handle,filesize($filename));




            $csv = array_map('str_getcsv', file($filename));
            array_walk($csv, function(&$a) use ($csv) {
                $a = array_combine($csv[0], $a);
            });
            array_shift($csv); # remove column header


            $data['date'][$date] = $csv;
            foreach($csv AS $stats)
            {
                // Initialise
                if(isset($stats['Country/Region']))
                {
                    $country = $stats['Country/Region'];
                }
                else
                {
                    $country = $stats['Country_Region'];
                }

                if (!isset($data['country'][$country]))
                {
                    $data['country'][$country]['daily'] = [];
                    $data['country'][$country]['total'] = [
                        'confirmed' => 0,
                        'deaths' => 0,
                        'recovered' => 0,
                    ];
                }

                // Daily Breakdown
                $data['country'][$country]['daily'][$date] = $csv;


                // Aggregate tally
                $data['country'][$country]['total']['confirmed'] += (int)$stats['Confirmed'];
                $data['country'][$country]['total']['deaths'] += (int)$stats['Deaths'];
                $data['country'][$country]['total']['recovered'] += (int)$stats['Recovered'];
            }
        }


        // Write files

        $countries = [];
        foreach($data['country'] AS $country=>$content)
        {
            $countries[] = [
                'name' => $country,
                'filename' => base64_encode($country)
            ];
            $country = base64_encode($country);
            file_put_contents('./stats/countries/' . $country . '.json', json_encode($content));
        }

        file_put_contents('./stats/countries.json',json_encode($countries));
        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }
}
