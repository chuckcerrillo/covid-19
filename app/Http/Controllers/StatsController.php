<?php

namespace App\Http\Controllers;

use App\Http\Resources\Ward as WardResource;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\AbstractList;
use Symfony\Component\HttpFoundation\Response;

class StatsController extends Controller
{
    protected $combine = [
        'China' => ['China','Mainland China'],
        'Taiwan' => ['Taiwan','Taiwan*','Taipei and environs'],
        'Bahamas' => ['Bahamas, The', 'The Bahamas', 'Bahamas'],
        'Gambia' => ['Gambia, The', 'The Gambia', 'Gambia'],
        'Vietnam' => ['Vietnam', 'Viet Nam'],
        'Cote d\'Ivoire' => ['Cote d\'Ivoire', 'Ivory Coast'],
        'Iran' => ['Iran','Iran (Islamic Republic of)'],
        'Diamond Princess' => ['Cruise Ship','Diamond Princess'],
        'Czechia' => ['Czechia','Czech Republic'],
        'Korea, South' => ['Korea, South','Republic of Korea','South Korea'],
        'Moldova' => ['Moldova','Republic of Moldova'],
        'Russia' => ['Russia','Russian Federation'],
        'United Kingom' => ['UK','United Kingdom'],
        'Holy See' => ['Holy See','Vatican City'],
        'Azerbaijan' => ['Azerbaijan',' Azerbaijan'],
    ];
    protected $skip = [
        'Cape Verde',
        'Cayman Islands',
        'Channel Islands',
        'Curacao',
        'East Timor',
        'Faroe Islands',
        'French Guiana',
        'Gibraltar',
        'Greenland',
        'Guadeloupe',
        'Guam',
        'Guernsey',
        'Hong Kong',
        'Hong Kong SAR',
        'Jersey',
        'Macao SAR',
        'Macau',
        'Martinique',
        'Mayotte',
        'North Ireland',
        'Others',
        'Palestine',
        'Republic of Ireland',
        'Republic of the Congo',
        'Reunion',
        'Saint Barthelemy',
        'St. Martin',
        'occupied Palestinian territory',
        'Aruba',
        'Puerto Rico',
        'Saint Martin',
    ];
    public function __construct()
    {
        define('MASTER_LIST','../covid-data/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv');
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

    public function countries()
    {
        $filename = STATS . 'master.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function states()
    {
        $filename = STATS . 'states.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function master()
    {

        // Generate master country list
        $csv = array_map('str_getcsv', file(MASTER_LIST));
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header

        $data = [];
        $countries = [];

        foreach($csv AS $row)
        {
            if (!isset($data[$row['Country_Region']]) && strlen($row['Country_Region'])>0 && strlen($row['Province_State']) == 0
                && strlen($row['Admin2']) == 0
            )
            {
                $data[$row['Country_Region']] = [
                    'name' => $row['Country_Region'],
                    'uid' => $row['UID'],
                    'iso2' => $row['iso2'],
                    'iso3' => $row['iso3'],
                    'code3' => $row['code3'],
                    'fips' => $row['FIPS'],
                    'admin2' => $row['Admin2'],
                    'lat' => $row['Lat'],
                    'long' => $row['Long_'],
                    'population' => $row['Population'],
                    'states' => [],
                    'daily' => [],
                    'total' => [
                        'l' => '',
                        'c' => '0',
                        'd' => '0',
                        'r' => '0',
                    ]
                ];
            }
            if (strlen($row['Province_State']) == 0)
                $row['Province_State'] = '(Unspecified)';
            if(
                strlen($row['Province_State']) > 0
//                && strlen(trim($row['Admin2'])) === 0
            )
            {
                $data[$row['Country_Region']]['states'][$row['Province_State']] = [
                    'uid' => $row['UID'],
                    'name' => $row['Province_State'],
                    'lat' => $row['Lat'],
                    'long' => $row['Long_'],
                    'population' => $row['Population'],
                ];
            }

        }

//        // Then generate daily and tally data
        $result = array_diff(scandir(COVID_DATA), array('..', '.','README.md','.gitignore'));


        foreach($result AS $file)
        {
            $date = str_replace('.csv','',$file);
            $filename = COVID_DATA . $file;
            $csv = array_map('str_getcsv', file($filename));
            array_shift($csv); # remove column header

            foreach($csv AS $row)
            {
                if(count($row) == 6)
                {

                    // Old format with just 6 columns
                    //array:6 [▼
                    //  0 => "﻿Province/State"
                    //  1 => "Country/Region"
                    //  2 => "Last Update"
                    //  3 => "Confirmed"
                    //  4 => "Deaths"
                    //  5 => "Recovered"
                    //]

                    if(isset($data[$row[1]]))
                    {
                        if(strlen($row[0]) == 0)
                        {
                            $state = '(Unspecified)';
                        }
                        else
                        {
                            $state = $row[0];
                        }
                        if(!isset($data[$row[1]]['daily'][$date]))
                        {
                            $data[$row[1]]['daily'][$date] = [
                                'states' => [],
                                'total' => [
                                    'c' => 0,
                                    'd' => 0,
                                    'r' => 0,
                                ]
                            ];
                        }
                        if(!isset($data[$row[1]]['daily'][$date]['states'][$state]))
                        {
                            $data[$row[1]]['daily'][$date]['states'][$state] = [
                                'name' => $row[0],
                                'lat' => '',
                                'lng' => '',
                                'l' => $row[2],
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                        }
                        $data[$row[1]]['daily'][$date]['states'][$state]['c'] += (int)$row[3];
                        $data[$row[1]]['daily'][$date]['states'][$state]['d'] += (int)$row[4];
                        $data[$row[1]]['daily'][$date]['states'][$state]['r'] += (int)$row[5];

                        $data[$row[1]]['daily'][$date]['total']['c'] += (int)$row[3];
                        $data[$row[1]]['daily'][$date]['total']['d'] += (int)$row[4];
                        $data[$row[1]]['daily'][$date]['total']['r'] += (int)$row[5];
                    }
                }
                else if(count($row) == 8)
                {
                    //array:8 [▼
                    //  0 => "Province/State"
                    //  1 => "Country/Region"
                    //  2 => "Last Update"
                    //  3 => "Confirmed"
                    //  4 => "Deaths"
                    //  5 => "Recovered"
                    //  6 => "Latitude"
                    //  7 => "Longitude"
                    //]
                    if(isset($data[$row[1]]))
                    {
                        if(strlen($row[0]) == 0)
                        {
                            $state = '(Unspecified)';
                        }
                        else
                        {
                            $state = $row[0];
                        }
                        if(!isset($data[$row[1]]['daily'][$date]))
                        {
                            $data[$row[1]]['daily'][$date] = [
                                'states' => [],
                                'total' => [
                                    'c' => 0,
                                    'd' => 0,
                                    'r' => 0,
                                ]
                            ];
                        }
                        if(!isset($data[$row[1]]['daily'][$date]['states'][$state]))
                        {
                            $data[$row[1]]['daily'][$date]['states'][$state] = [
                                'name' => $row[0],
                                'lat' => $row[6],
                                'lng' => $row[7],
                                'l' => $row[2],
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                        }
                        $data[$row[1]]['daily'][$date]['states'][$state]['c'] += (int)$row[3];
                        $data[$row[1]]['daily'][$date]['states'][$state]['d'] += (int)$row[4];
                        $data[$row[1]]['daily'][$date]['states'][$state]['r'] += (int)$row[5];

                        $data[$row[1]]['daily'][$date]['total']['c'] += (int)$row[3];
                        $data[$row[1]]['daily'][$date]['total']['d'] += (int)$row[4];
                        $data[$row[1]]['daily'][$date]['total']['r'] += (int)$row[5];
                    }
                }
                else if(count($row) == 12) {
                    //array:12 [▼
                    //  0 => "﻿FIPS"
                    //  1 => "Admin2"
                    //  2 => "Province_State"
                    //  3 => "Country_Region"
                    //  4 => "Last_Update"
                    //  5 => "Lat"
                    //  6 => "Long_"
                    //  7 => "Confirmed"
                    //  8 => "Deaths"
                    //  9 => "Recovered"
                    //  10 => "Active"
                    //  11 => "Combined_Key"
                    //]
                    if (isset($data[$row[3]]))
                    {
                        if(strlen($row[2]) == 0)
                        {
                            $state = '(Unspecified)';
                        }
                        else
                        {
                            $state = $row[2];
                        }


                        if (!isset($data[$row[3]]['daily'][$date])) {
                            $data[$row[3]]['daily'][$date] = [
                                'states' => [],
                                'total' => [
                                    'c' => 0,
                                    'd' => 0,
                                    'r' => 0,
                                ]
                            ];
                        }
                        if(!isset($data[$row[3]]['daily'][$date]['states'][$state]))
                        {
                            $data[$row[3]]['daily'][$date]['states'][$state] = [
                                'name' => $state,
                                'lat' => $row[6],
                                'lng' => $row[7],
                                'l' => $row[4],
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                        }
                        $data[$row[3]]['daily'][$date]['states'][$state]['c'] += (int)$row[7];
                        $data[$row[3]]['daily'][$date]['states'][$state]['d'] += (int)$row[8];
                        $data[$row[3]]['daily'][$date]['states'][$state]['r'] += (int)$row[9];

                        $data[$row[3]]['daily'][$date]['total']['c'] += (int)$row[7];
                        $data[$row[3]]['daily'][$date]['total']['d'] += (int)$row[8];
                        $data[$row[3]]['daily'][$date]['total']['r'] += (int)$row[9];
                    }
                }
            }
        }


        // Get total
        foreach($data AS $country => $row)
        {
            if(count($row['daily'])>0)
            {
                $sequence = array_reverse($row['daily']);
                $last = reset($sequence);

                foreach($last['states'] AS $state)
                {
                    if(isset($data[$country]))
                    {
                        if(!isset($data[$country]['total']))
                        {
                            $data[$country]['total'] = [
                                'l' => '',
                                'c' => 0,
                                'd' => 0,
                                'r' => 0,
                            ];
                        }

                        $data[$country]['total']['l'] = $state['l'];
                        $data[$country]['total']['c'] += (int) $state['c'];
                        $data[$country]['total']['d'] += (int) $state['d'];
                        $data[$country]['total']['r'] += (int) $state['r'];

                        // Now look at their states
                        if(isset($data[$country]['states'][$state['name']]))
                        {
                            $data[$country]['states'][$state['name']]['total'] = [
                                'l' => $state['l'],
                                'c' => $state['c'],
                                'd' => $state['d'],
                                'r' => $state['r'],
                            ];
                        }

                    }
                }
            }
        }
//        dump($data['United Kingdom']['daily']['04-08-2020']);
//dd($data['Afghanistan']);
        // Cleanup
        foreach($data AS $index=>$row)
        {
            // Remove state data from single state countries
            if(count($row['states']) == 1)
            {
                unset($data[$index]['states']['(Unspecified)']);
            }
            // Remove empty unknown states
            else if(!isset($row['states']['(Unspecified)']) || !isset($row['states']['(Unspecified)']['total']))
            {
                unset($data[$index]['states']['(Unspecified)']);
            }
        }
        unset($data['Cruise Ship']);
//        dd($data['United Kingdom']);

        // Write the file
        file_put_contents(STATS . 'master.json',json_encode($data));


        // Create daily json for states
        $states = [];

        foreach($data AS $country=>$row)
        {
            $states[$country] = [
                'name' => $row['name'],
                'states' => [],
            ];


            if(count($row['states']) > 0)
            {
                foreach($row['states'] AS $state => $state_row)
                {
                    if(isset($state_row['total']))
                    {
                        $states[$country]['states'][$state]['total'] = $state_row['total'];
                    }
                }
            }

            foreach($row['daily'] AS $date => $daily_row)
            {
                foreach($daily_row['states'] AS $state => $state_row)
                {
                    $states[$country]['states'][$state]['daily'][$date] = $state_row;
                }
            }
        }

        // Write the file
        file_put_contents(STATS . 'states.json',json_encode($states));


        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
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


                if (in_array($country,$this->skip))
                {
                    continue;
                }

                // Check country against combined array
                foreach($this->combine AS $combined => $keys)
                {
                    if (in_array($country,$keys))
                    {
                        $country = $combined;
                        break;
                    }
                }

                // Now that we know what country, we can initialise this thing
                if (!isset($data['country'][$country])) {
                    $data['country'][$country]['daily'] = [];
                    $data['country'][$country]['total'] = [
                        'c' => 0,
                        'd' => 0,
                        'r' => 0,
                    ];
                }

                $state = '';
                foreach($stats AS $i => $v)
                {
                    if(strpos($i,'State')>0)
                    {
                        $state = $stats[$i];
                        break;
                    }
                }


                if(isset($stats['Last Update']))
                {
                    $last_update = $stats['Last Update'];
                }
                else if(isset($stats['Last_Update']))
                {
                    $last_update = $stats['Last_Update'];
                }


                if($country) {
                    // Daily Breakdown

                    // Initialise this day
                    if(!isset($data['country'][$country]['daily'][$date]))
                    {
                        $data['country'][$country]['daily'][$date] = [
                            'last_update' => $last_update,
                            'c' => 0,
                            'd' => 0,
                            'r' => 0,
                            'state' => []
                        ];
                    }
                    if($stats['Confirmed'])
                        $data['country'][$country]['daily'][$date]['c'] += $stats['Confirmed'];
                    if($stats['Deaths'])
                        $data['country'][$country]['daily'][$date]['d'] += $stats['Deaths'];
                    if($stats['Recovered'])
                        $data['country'][$country]['daily'][$date]['r'] += $stats['Recovered'];


                    $data['country'][$country]['daily'][$date]['state'][] = [
                        'state' => $state,
                        'c' => $stats['Confirmed'],
                        'd' => $stats['Deaths'],
                        'r' => $stats['Recovered']
                    ];
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
                if (isset($row['c']))
                {
                    $data['country'][$country_index]['total']['c'] = $row['c'];
                    $data['country'][$country_index]['total']['d'] = $row['d'];
                    $data['country'][$country_index]['total']['r'] = $row['r'];
                    $data['country'][$country_index]['total']['last_update'] = $row['last_update'];
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
            if($country == 'United Kingom')
            {
                $country = 'United Kingdom';
            }
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
