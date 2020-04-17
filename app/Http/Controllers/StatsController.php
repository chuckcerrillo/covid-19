<?php

namespace App\Http\Controllers;

use App\Http\Resources\Ward as WardResource;
use Goutte\Client;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\AbstractList;
use Symfony\Component\DomCrawler\Crawler;
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
        'South Korea' => ['Korea, South','Republic of Korea','South Korea'],
        'Moldova' => ['Moldova','Republic of Moldova'],
        'Russia' => ['Russia','Russian Federation'],
        'United Kingdom' => ['UK','United Kingdom'],
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

//    Congo x2
//    Kosovo
//    Timor-Leste
//    West Bank and Gaza
    protected $worldometer_jh_map = [
        'Afghanistan' => 'Afghanistan',
        'Algeria' => 'Algeria',
        'Albania' => 'Albania',
        'Argentina' => 'Argentina',
        'Armenia' => 'Armenia',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
        'Antigua and Barbuda' => 'Antigua and Barbuda',
        'Austria' => 'Austria',
        'Australia' => 'Australia',
        'Azerbaijan' => 'Azerbaijan',
        'Bahrain' => 'Bahrain',
        'Bangladesh' => 'Bangladesh',
        'Bahamas' => 'Bahamas',
        'Barbados' => 'Barbados',
        'Belarus' => 'Belarus',
        'Belgium' => 'Belgium',
        'Belize' => 'Belize',
        'Benin' => 'Benin',
        'Bhutan' => 'Bhutan',
        'Bolivia' => 'Bolivia',
        'Bosnia and Herzegovina' => 'Bosnia and Herzegovina', // 22
        'Botswana' => 'Botswana',
        'Burkina Faso' => 'Burkina Faso',
        'Myanmar' => 'Burma',
        'Burundi' => 'Burundi',
        'Brazil' => 'Brazil',
        'Brunei' => 'Brunei',
        'Bulgaria' => 'Bulgaria',
        'Cabo Verde' => 'Cabo Verde', // 30
        'Cambodia' => 'Cambodia',
        'Cameroon' => 'Cameroon',
        'Canada' => 'Canada',
        'CAR' => 'Central African Republic',
        'Chad' => 'Chad',
        'Chile' => 'Chile',
        'China' => 'China',
        'Colombia' => 'Colombia',
        'Costa Rica' => 'Costa Rica',
        'Ivory Coast' => 'Cote d\'Ivoire',
        'Croatia' => 'Croatia',
        'Cuba' => 'Cuba',
        'Cyprus' => 'Cyprus',
        'Czechia' => 'Czechia',
        'Denmark' => 'Denmark',
        'Diamond Princess' => 'Diamond Princess',
        'Djibouti' => 'Djibouti',
        'Dominica' => 'Dominica',
        'Dominican Republic' => 'Dominican Republic',
        'Ecuador' => 'Ecuador',
        'Egypt' => 'Egypt',
        'El Salvador' => 'El Salvador',
        'Equatorial Guinea' => 'Equatorial Guinea',
        'Eritrea' => 'Eritrea',
        'Estonia' => 'Estonia',
        'Eswatini' => 'Eswatini',
        'Ethiopia' => 'Ethiopia',
        'Fiji' => 'Fiji',
        'Finland' => 'Finland',
        'France' => 'France',
        'Gabon' => 'Gabon',
        'Gambia' => 'Gambia',
        'Georgia' => 'Georgia',
        'Germany' => 'Germany',
        'Ghana' => 'Ghana',
        'Greece' => 'Greece',
        'Grenada' => 'Grenada',
        'Guatemala' => 'Guatemala',
        'Guinea' => 'Guinea',
        'Guinea-Bissau' => 'Guinea-Bissau',
        'Guyana' => 'Guyana',
        'Haiti' => 'Haiti',
        'Honduras' => 'Honduras',
        'Vatican City' => 'Holy See',
        'Hungary' => 'Hungary',
        'Iceland' => 'Iceland',
        'India' => 'India',
        'Indonesia' => 'Indonesia',
        'Iran' => 'Iran',
        'Iraq' => 'Iraq',
        'Ireland' => 'Ireland',
        'Israel' => 'Israel',
        'Italy' => 'Italy',
        'Jamaica' => 'Jamaica',
        'Japan' => 'Japan',
        'Jordan' => 'Jordan',
        'Kazakhstan' => 'Kazakhstan',
        'Kenya' => 'Kenya',
        'S. Korea' => 'Korea, South',
        'Kuwait' => 'Kuwait',
        'Kyrgyzstan' => 'Kyrgyzstan',
        'Laos' => 'Laos',
        'Latvia' => 'Latvia',
        'Lebanon' => 'Lebanon',
        'Liberia' => 'Liberia',
        'Libya' => 'Libya',
        'Liechtenstein' => 'Liechtenstein',
        'Lithuania' => 'Lithuania',
        'Luxembourg' => 'Luxembourg',
        'Madagascar' => 'Madagascar',
        'Malawi' => 'Malawi',
        'Malaysia' => 'Malaysia',
        'Maldives' => 'Maldives',
        'Mali' => 'Mali',
        'Malta' => 'Malta',
        'Mauritania' => 'Mauritania',
        'Mauritius' => 'Mauritius',
        'Mexico' => 'Mexico',
        'Moldova' => 'Moldova',
        'Monaco' => 'Monaco',
        'Mongolia' => 'Mongolia',
        'Montenegro' => 'Montenegro',
        'Morocco' => 'Morocco',
        'Mozambique' => 'Mozambique',
        'MS Zaandam' => 'MS Zaandam',
        'Namibia' => 'Namibia',
        'Nepal' => 'Nepal',
        'Netherlands' => 'Netherlands',
        'New Zealand' => 'New Zealand',
        'Nicaragua' => 'Nicaragua',
        'Niger' => 'Niger',
        'Nigeria' => 'Nigeria',
        'North Macedonia' => 'North Macedonia',
        'Norway' => 'Norway',
        'Oman' => 'Oman',
        'Pakistan' => 'Pakistan',
        'Panama' => 'Panama',
        'Papua New Guinea' => 'Papua New Guinea',
        'Paraguay' => 'Paraguay',
        'Peru' => 'Peru',
        'Philippines' => 'Philippines',
        'Poland' => 'Poland',
        'Portugal' => 'Portugal',
        'Qatar' => 'Qatar',
        'Romania' => 'Romania',
        'Russia' => 'Russia',
        'Rwanda' => 'Rwanda',
        'Saint Kitts and Nevis' => 'Saint Kitts and NEvis',
        'Saint Lucia' => 'Saint Lucia',
        'St. Vincent Grenadines' => 'Saint Vincent and the Grenadines',
        'San Marino' => 'San Marino',
        'Sao Tome and Principe' => 'Sao Tome and Principe',
        'Saudi Arabia' => 'Saudi Arabia',
        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'Seychelles' => 'Seychelles',
        'Sierra Leone' => 'Sierra Leone',
        'Singapore' => 'Singapore',
        'Slovakia' => 'Slovakia',
        'Slovenia' => 'Slovenia',
        'Somalia' => 'Somalia',
        'South Africa' => 'South Africa',
        'South Sudan' => 'South Sudan',
        'Spain' => 'Spain',
        'Sri Lanka' => 'Sri Lanka',
        'Sudan' => 'Sudan',
        'Suriname' => 'Suriname',
        'Sweden' => 'Sweden',
        'Switzerland' => 'Switzerland',
        'Syria' => 'Syria',
        'Taiwan' => 'Taiwan*',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
        'Togo' => 'Togo',
        'Trinidad and Tobago' => 'Trinidad and Tobago',
        'Tunisia' => 'Tunisia',
        'Turkey' => 'Turkey',
        'UAE' => 'United Arab Emirates',
        'Uganda' => 'Uganda',
        'UK' => 'United Kingdom',
        'Ukraine' => 'Ukraine',
        'Uruguay' => 'Uruguay',
        'USA' => 'US',
        'Uzbekistan' => 'Uzbekistan',
        'Venezuela' => 'Venezuela',
        'Vietnam' => 'Vietnam',
        'Western Sahara' => 'Western Sahara',
        'Yemen' => 'Yemen',
        'Zambia' => 'Zambia',
        'Zimbabwe' => 'Zimbabwe',
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
        $worldometer_override = $this->harvest_worldometer();
        $current_timestamp = time();
        $current_date = gmdate('m-d-Y',$current_timestamp);
        $current_datetime = gmdate('Y-m-d H:i:s',$current_timestamp);

        // Generate master country list
        $csv = array_map('str_getcsv', file(MASTER_LIST));
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header

        $data = [];
        $countries = [];
        $global = [
            'daily' => [],
            'total' => [],
        ];

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


                    $country = $row[1];
                    foreach($this->combine AS $key => $combine)
                    {
                        if (in_array($row[1],$combine))
                        {
                            $country = $key;
                            break;
                        }
                    }

                    if(isset($data[$country]))
                    {
                        if(strlen($row[0]) == 0)
                        {
                            $state = '(Unspecified)';
                        }
                        else
                        {
                            $state = $row[0];
                        }
                        if(!isset($data[$country]['daily'][$date]))
                        {
                            $data[$country]['daily'][$date] = [
                                'states' => [],
                                'total' => [
                                    'c' => 0,
                                    'd' => 0,
                                    'r' => 0,
                                ]
                            ];
                        }
                        if(!isset($data[$country]['daily'][$date]['states'][$state]))
                        {
                            $data[$country]['daily'][$date]['states'][$state] = [
                                'name' => $row[0],
                                'lat' => '',
                                'lng' => '',
                                'l' => $row[2],
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                        }
                        $data[$country]['daily'][$date]['states'][$state]['c'] += (int)$row[3];
                        $data[$country]['daily'][$date]['states'][$state]['d'] += (int)$row[4];
                        $data[$country]['daily'][$date]['states'][$state]['r'] += (int)$row[5];

                        $data[$country]['daily'][$date]['total']['c'] += (int)$row[3];
                        $data[$country]['daily'][$date]['total']['d'] += (int)$row[4];
                        $data[$country]['daily'][$date]['total']['r'] += (int)$row[5];

                        if(!isset($global['daily'][$date]))
                        {
                            $global['daily'][$date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        $global['daily'][$date]['confirmed'] += (int)$row[3];
                        $global['daily'][$date]['deaths'] += (int)$row[4];
                        $global['daily'][$date]['recovered'] += (int)$row[5];
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

                    $country = $row[1];
                    foreach($this->combine AS $key => $combine)
                    {
                        if (in_array($row[1],$combine))
                        {
                            $country = $key;
                            break;
                        }
                    }

                    if(isset($data[$country]))
                    {
                        if(strlen($row[0]) == 0)
                        {
                            $state = '(Unspecified)';
                        }
                        else
                        {
                            $state = $row[0];
                        }
                        if(!isset($data[$country]['daily'][$date]))
                        {
                            $data[$country]['daily'][$date] = [
                                'states' => [],
                                'total' => [
                                    'c' => 0,
                                    'd' => 0,
                                    'r' => 0,
                                ]
                            ];
                        }
                        if(!isset($data[$country]['daily'][$date]['states'][$state]))
                        {
                            $data[$country]['daily'][$date]['states'][$state] = [
                                'name' => $row[0],
                                'lat' => $row[6],
                                'lng' => $row[7],
                                'l' => $row[2],
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                        }
                        $data[$country]['daily'][$date]['states'][$state]['c'] += (int)$row[3];
                        $data[$country]['daily'][$date]['states'][$state]['d'] += (int)$row[4];
                        $data[$country]['daily'][$date]['states'][$state]['r'] += (int)$row[5];

                        $data[$country]['daily'][$date]['total']['c'] += (int)$row[3];
                        $data[$country]['daily'][$date]['total']['d'] += (int)$row[4];
                        $data[$country]['daily'][$date]['total']['r'] += (int)$row[5];

                        if(!isset($global['daily'][$date]))
                        {
                            $global['daily'][$date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        $global['daily'][$date]['confirmed'] += (int)$row[3];
                        $global['daily'][$date]['deaths'] += (int)$row[4];
                        $global['daily'][$date]['recovered'] += (int)$row[5];
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

                        if(!isset($global['daily'][$date]))
                        {
                            $global['daily'][$date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        $global['daily'][$date]['confirmed'] += (int)$row[7];
                        $global['daily'][$date]['deaths'] += (int)$row[8];
                        $global['daily'][$date]['recovered'] += (int)$row[9];
                    }
                }
            }
        }



        if(array_key_last ($result) != $current_date)
        {
            foreach($worldometer_override AS $override)
            {
//                array:4 [▼
//                    "country" => "North America"
//                    "confirmed" => "696,905"
//                    "deaths" => "35,276"
//                    "recovered" => "61,446"
//                ]

                if(isset($this->worldometer_jh_map[$override['country']]))
                {
                    $country = $this->worldometer_jh_map[$override['country']];
                    if(isset($country))
                    {
                        if (isset($data[$country]))
                        {
                            $statename = '(Unspecified)';
                            $confirmed = (int) str_replace(',','', $override['confirmed']);
                            $deaths = (int) str_replace(',','',$override['deaths']);
                            $recovered = (int) str_replace(',','',$override['recovered']);


                            // Copy last record
                            $last_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];
                            $new_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];


                            $temp_state_data = [
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                            foreach($last_daily_record['states'] AS $index=>$state)
                            {
                                if($state['name'] != '(Unspecified)')
                                {
                                    $temp_state_data['c'] += $state['c'];
                                    $temp_state_data['d'] += $state['d'];
                                    $temp_state_data['r'] += $state['r'];
                                }
                            }

                            if (in_array($country,['Australia']))
                            {
                                dump($country);
                                dump($temp_state_data);
                                dump('confirmed: ' . $confirmed . ' last daily: ' . $last_daily_record['total']['c']);
                                dump('deaths: ' . $deaths . ' last daily: ' . $last_daily_record['total']['d']);
                                dump('recovered: ' . $recovered . ' last daily: ' . $last_daily_record['total']['r']);
                            }

                            if(!isset($new_daily_record['states'][$statename]))
                            {
                                $new_daily_record['states'][$statename] = [
                                    'name' => $statename,
                                    'lat' => '',
                                    'lng' => '',
                                    'l' => $current_datetime,
                                    'c' => $confirmed - $temp_state_data['c'],
                                    'd' => $deaths - $temp_state_data['d'],
                                    'r' => $recovered - $temp_state_data['r'],
                                ];
                            }
                            else
                            {
                                $new_daily_record['states'][$statename]['c'] = $confirmed - $temp_state_data['c'];
                                $new_daily_record['states'][$statename]['d'] = $deaths - $temp_state_data['d'];
                                $new_daily_record['states'][$statename]['r'] = $recovered - $temp_state_data['r'];
                            }


                            $new_daily_record['total'] = [
                                'c' => $confirmed,
                                'd' => $deaths,
                                'r' => $recovered
                            ];


                            $data[$country]['daily'][$current_date] = $new_daily_record;

                            if(!isset($global['daily'][$current_date]))
                            {
                                $global['daily'][$current_date] = [
                                    'confirmed' => 0,
                                    'deaths' => 0,
                                    'recovered' => 0,
                                ];
                            }

                            $global['daily'][$current_date]['confirmed'] += $confirmed;
                            $global['daily'][$current_date]['deaths'] += $deaths;
                            $global['daily'][$current_date]['recovered'] += $recovered;
                        }
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

        // Annotations

        https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Pov2AbAscAXUNphDrjd3ZmzlbuvMy_Pd195bXlylwgdDnu1OQ0CBKXfMeDAHBZWbtLL9t5McfIcD/pubhtml
        $url = 'https://spreadsheets.google.com/feeds/list/1XfndFdJ0VSJnLqY83s8ITmuRVgsUSWPhCm-Fvd_rNb4/oejzle4/public/values?alt=json';
        $file= file_get_contents($url);

        $json = json_decode($file,true);
        $rows = $json['feed']['entry'];
        $data = [];
        foreach($rows AS $row)
        {
            if($row['gsx$publish']['$t'] == 'Y')
            {
                $data[$row['gsx$country']['$t']][] = [
                    'country' => $row['gsx$country']['$t'],
                    'state' => $row['gsx$state']['$t'],
                    'date' => $row['gsx$date']['$t'],
                    'notes' => $row['gsx$notes']['$t'],
                    'url' => $row['gsx$url']['$t'],
                ];
            }
        }
        file_put_contents(STATS . 'annotations.json',json_encode($data));




        $sequence = array_reverse($global['daily']);
        $last = reset($sequence);
        $global['total'] = $last;

        file_put_contents(STATS . 'global.json',json_encode($global));

        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }

    public function annotations()
    {

        $filename = STATS . 'annotations.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function global()
    {

        $filename = STATS . 'global.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    protected function harvest_worldometer()
    {
        $client = new Client();
        $crawler = $client->request('GET', 'https://www.worldometers.info/coronavirus/');
        $data = $crawler->filter('#main_table_countries_today tbody tr')->each(function (Crawler $node, $i) {
            $children = [];
            $columns = $node->filter('td')->each(function(Crawler $column,$i){
                return $column->text();
            });
            return [
                'country' => $columns[0],
                'confirmed' => $columns[1],
                'deaths' => $columns[3],
                'recovered' => $columns[5],
            ];
        });
        return $data;
    }
}
