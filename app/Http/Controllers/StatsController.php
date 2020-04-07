<?php

namespace App\Http\Controllers;

use App\Http\Resources\Ward as WardResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StatsController extends Controller
{
    public function __construct()
    {
        define('COVID_DATA','../covid-data/csse_covid_19_data/csse_covid_19_daily_reports/');
        define('STATS','./stats/');
    }

    public function index()
    {
        $filename = STATS . 'countries.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function full()
    {
        $filename = STATS . 'cases.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function country($country)
    {
        $filename = STATS . 'countries.json';
        $file = fopen($filename,'r');
        $countries = json_decode(fread($file,filesize($filename)),true);

        $filename = base64_encode($country);

        foreach($countries AS $c)
        {
            if($c['filename'] == $filename)
            {

                $filename = STATS . 'countries/' . base64_encode($country) . '.json';

                $file = fopen($filename,'r');
                $content = json_decode(fread($file,filesize($filename)),true);
                return response($content)->setStatusCode(Response::HTTP_OK);
            }
        }

        return response('Country not found.')->setStatusCode(Response::HTTP_BAD_REQUEST);
    }

    public function harvest()
    {



        $result = array_diff(scandir(COVID_DATA), array('..', '.','README.md','.gitignore'));
        $data = [];


        foreach($result AS $row)
        {
            $date = str_replace('.csv','',$row);
            $filename = COVID_DATA . $row;
            $csv = array_map('str_getcsv', file($filename));
            array_walk($csv, function(&$a) use ($csv) {
                $a = array_combine($csv[0], $a);
            });
            array_shift($csv); # remove column header


            $data['date'][$date] = $csv;
            $new_day = true;

            foreach($csv AS $stats)
            {
                $cs_combo = [];
                foreach($stats AS $key => $value)
                {
                    $clean_key = trim($key);
                    if($clean_key !== $key)
                    {
                        $stats[$clean_key] = $value;
                        unset($stats[$key]);
                    }
                }




                // Initialise
                if(isset($stats['Country/Region']))
                {
                    $country = $stats['Country/Region'];
                }
                else if(isset($stats['Country_Region']))
                {
                    $country = $stats['Country_Region'];
                }
                else
                {
                    $country = '';
                }

                // Now that we know what country, we can initialise this thing
                if (!isset($data['country'][$country])) {
                    $data['country'][$country]['daily'] = [];
                    $data['country'][$country]['total'] = [
                        'confirmed' => 0,
                        'deaths' => 0,
                        'recovered' => 0,
                    ];
                }

                if(isset($stats['Province/State']))
                {
                    $state = $stats['Province/State'];
                }
                else if(isset($stats['Province_State']))
                {
                    $state = $stats['Province_State'];
                }
                else
                {
                    $state = '';
                }


                if(isset($stats['Last Update']))
                {
                    $last_update = $stats['Last Update'];
                }
                else if(isset($stats['Last_Update']))
                {
                    $last_update = $stats['Last_Update'];
                }
                else
                {
                }


                if($country) {
                    // Daily Breakdown

                    // Initialise this day
                    if(!isset($data['country'][$country]['daily'][$date]))
                    {
                        $data['country'][$country]['daily'][$date] = [
                            'last_update' => $last_update,
                            'confirmed' => 0,
                            'deaths' => 0,
                            'recovered' => 0
                        ];
                    }
                    if($stats['Confirmed'])
                        $data['country'][$country]['daily'][$date]['confirmed'] += $stats['Confirmed'];
                    if($stats['Deaths'])
                        $data['country'][$country]['daily'][$date]['deaths'] += $stats['Deaths'];
                    if($stats['Recovered'])
                        $data['country'][$country]['daily'][$date]['recovered'] += $stats['Recovered'];
                }
            }
        }

        // To get the tally of each country, look at the last record of each one
        $x=0;
        foreach($data['country'] AS $country_index=>$country)
        {
            $sequence = array_reverse($country['daily']);
            foreach($sequence AS $index=>$row)
            {
                if (isset($row['confirmed']))
                {
                    $data['country'][$country_index]['total']['confirmed'] = $row['confirmed'];
                    $data['country'][$country_index]['total']['deaths'] = $row['deaths'];
                    $data['country'][$country_index]['total']['recovered'] = $row['recovered'];
                    $data['country'][$country_index]['total']['last_update'] = $index;
                    break;
                }
            }
            $x++;
        }


        // Write files

        $countries = [];
        $allcountries = [];
        foreach($data['country'] AS $country=>$content)
        {
            $allcountries[] = [
                'country' => $country,
                'content' => $content
            ];

            $countries[] = [
                'name' => $country,
                'filename' => base64_encode($country)
            ];
        }

        file_put_contents(STATS . 'cases.json',json_encode($allcountries));
        file_put_contents(STATS . 'countries.json',json_encode($countries));


        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }
}
