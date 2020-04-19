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
        'Saint Kitts and Nevis' => 'Saint Kitts and Nevis',
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

    protected $oxford_jh_map = [
        'Afghanistan' => 'Afghanistan',
//        'Albania' => 'Albania',
        'Algeria' => 'Algeria',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
//        'Antigua and Barbuda' => 'Antigua and Barbuda',
        'Argentina' => 'Argentina',
//        'Armenia' => 'Armenia',
        'Australia' => 'Australia',
        'Austria' => 'Austria',
        'Azerbaijan' => 'Azerbaijan',
//        'Bahamas' => 'Bahamas',
//        'Bahrain' => 'Bahrain',
        'Bangladesh' => 'Bangladesh',
        'Barbados' => 'Barbados',
//        'Belarus' => 'Belarus',
        'Belgium' => 'Belgium',
        'Belize' => 'Belize',
//        'Benin' => 'Benin',
//        'Bhutan' => 'Bhutan',
        'Bolivia' => 'Bolivia',
        'Bosnia and Herzegovina' => 'Bosnia and Herzegovina', // 22
        'Botswana' => 'Botswana',
        'Brazil' => 'Brazil',
        'Brunei' => 'Brunei',
        'Bulgaria' => 'Bulgaria',
        'Burkina Faso' => 'Burkina Faso',
        'Myanmar' => 'Burma',
        'Burundi' => 'Burundi',
//        'Cabo Verde' => 'Cabo Verde', // 30
//        'Cambodia' => 'Cambodia',
        'Cameroon' => 'Cameroon',
        'Canada' => 'Canada',
//        'CAR' => 'Central African Republic',
        'Chad' => 'Chad',
        'Chile' => 'Chile',
        'China' => 'China',
        'Colombia' => 'Colombia',
//        'Congo (Brazzaville)' => 'Congo (Brazzaville)',
        'Democratic Republic of Congo' => 'Congo (Kinshasa)',
        'Costa Rica' => 'Costa Rica',
//        'Ivory Coast' => 'Cote d\'Ivoire',
        'Croatia' => 'Croatia',
        'Cuba' => 'Cuba',
        'Cyprus' => 'Cyprus',
        'Czech Republic' => 'Czechia',
        'Denmark' => 'Denmark',
//        'Diamond Princess' => 'Diamond Princess',
        'Djibouti' => 'Djibouti',
//        'Dominica' => 'Dominica',
        'Dominican Republic' => 'Dominican Republic',
        'Ecuador' => 'Ecuador',
        'Egypt' => 'Egypt',
        'El Salvador' => 'El Salvador',
//        'Equatorial Guinea' => 'Equatorial Guinea',
//        'Eritrea' => 'Eritrea',
        'Estonia' => 'Estonia',
        'Eswatini' => 'Eswatini',
//        'Ethiopia' => 'Ethiopia',
//        'Fiji' => 'Fiji',
        'Finland' => 'Finland',
        'France' => 'France',
        'Gabon' => 'Gabon',
        'Gambia' => 'Gambia',
//        'Georgia' => 'Georgia',
        'Germany' => 'Germany',
        'Ghana' => 'Ghana',
        'Greece' => 'Greece',
//        'Grenada' => 'Grenada',
        'Guatemala' => 'Guatemala',
//        'Guinea' => 'Guinea',
//        'Guinea-Bissau' => 'Guinea-Bissau',
        'Guyana' => 'Guyana',
//        'Haiti' => 'Haiti',
//        'Vatican City' => 'Holy See',
        'Honduras' => 'Honduras',
//        'Hungary' => 'Hungary',
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
        'South Korea' => 'Korea, South',
        'Kosovo' => 'Kosovo',
        'Kuwait' => 'Kuwait',
        'Kyrgyz Republic' => 'Kyrgyzstan',
        'Laos' => 'Laos',
//        'Latvia' => 'Latvia',
        'Lebanon' => 'Lebanon',
//        'Liberia' => 'Liberia',
        'Libya' => 'Libya',
//        'Liechtenstein' => 'Liechtenstein',
//        'Lithuania' => 'Lithuania',
        'Luxembourg' => 'Luxembourg',
        'Madagascar' => 'Madagascar',
        'Malawi' => 'Malawi',
        'Malaysia' => 'Malaysia',
//        'Maldives' => 'Maldives',
        'Mali' => 'Mali',
//        'Malta' => 'Malta',
        'Mauritania' => 'Mauritania',
        'Mauritius' => 'Mauritius',
        'Mexico' => 'Mexico',
        'Moldova' => 'Moldova',
//        'Monaco' => 'Monaco',
        'Mongolia' => 'Mongolia',
//        'Montenegro' => 'Montenegro',
        'Morocco' => 'Morocco',
        'Mozambique' => 'Mozambique',
//        'MS Zaandam' => 'MS Zaandam',
        'Namibia' => 'Namibia',
//        'Nepal' => 'Nepal',
        'Netherlands' => 'Netherlands',
        'New Zealand' => 'New Zealand',
        'Nicaragua' => 'Nicaragua',
        'Niger' => 'Niger',
        'Nigeria' => 'Nigeria',
//        'North Macedonia' => 'North Macedonia',
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
//        'Saint Kitts and Nevis' => 'Saint Kitts and Nevis',
//        'Saint Lucia' => 'Saint Lucia',
//        'St. Vincent Grenadines' => 'Saint Vincent and the Grenadines',
        'San Marino' => 'San Marino',
//        'Sao Tome and Principe' => 'Sao Tome and Principe',
        'Saudi Arabia' => 'Saudi Arabia',
//        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'Seychelles' => 'Seychelles',
        'Sierra Leone' => 'Sierra Leone',
        'Singapore' => 'Singapore',
        'Slovak Republic' => 'Slovakia',
        'Slovenia' => 'Slovenia',
//        'Somalia' => 'Somalia',
        'South Africa' => 'South Africa',
        'South Sudan' => 'South Sudan',
        'Spain' => 'Spain',
        'Sri Lanka' => 'Sri Lanka',
        'Sudan' => 'Sudan',
//        'Suriname' => 'Suriname',
        'Sweden' => 'Sweden',
        'Switzerland' => 'Switzerland',
        'Syria' => 'Syria',
        'Taiwan' => 'Taiwan*',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
//        'Timor-Leste' => 'Timor-Leste',
//        'Togo' => 'Togo',
        'Trinidad and Tobago' => 'Trinidad and Tobago',
        'Tunisia' => 'Tunisia',
        'Turkey' => 'Turkey',
        'Uganda' => 'Uganda',
        'United Arab Emirates' => 'United Arab Emirates',
        'United Kingdom' => 'United Kingdom',
        'Ukraine' => 'Ukraine',
        'Uruguay' => 'Uruguay',
        'United States' => 'US',
        'Uzbekistan' => 'Uzbekistan',
        'Venezuela' => 'Venezuela',
        'Vietnam' => 'Vietnam',
//        'West Bank and Gaza' => 'West Bank and Gaza',
//        'Western Sahara' => 'Western Sahara',
//        'Yemen' => 'Yemen',
        'Zambia' => 'Zambia',
        'Zimbabwe' => 'Zimbabwe',
    ];
    public function __construct()
    {
        define('MASTER_LIST','../covid-data/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv');
        define('COVID_DATA','../covid-data/csse_covid_19_data/csse_covid_19_daily_reports/');
        define('OXFORD_DATA','../oxford/data/timeseries/');
        define('OXFORD_LATEST','../oxford/data/OxCGRT_latest.csv');
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
        $manual_override = $this->manual_override();
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
                    $country = $row[3];
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
                                'lat' => $row[5],
                                'lng' => $row[6],
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


                // Manual override here
                if(isset($manual_override[$country]))
                {
                    $standard_date = explode('-',$date);
                    $standard_date = $standard_date[2] .'-' . $standard_date[0] . '-' . $standard_date[1];
                    if(isset($data[$country]['daily'][$date]['states'][$state]) && isset($manual_override[$country][$standard_date][$state]))
                    {
                        if(strlen($manual_override[$country][$standard_date][$state]['confirmed'])>0)
                        {
                            $data[$country]['daily'][$date]['total']['c'] = 0;
                            $global['daily'][$date]['confirmed'] += intval($manual_override[$country][$standard_date][$state]['confirmed']) - isset($data[$country]['daily'][$date]['states'][$state]['c'])?$data[$country]['daily'][$date]['states'][$state]['c']:0;
                            $data[$country]['daily'][$date]['states'][$state]['c'] = intval($manual_override[$country][$standard_date][$state]['confirmed']);
                            foreach($data[$country]['daily'][$date]['states'] AS $s)
                            {
                                $data[$country]['daily'][$date]['total']['c'] += $s['c'];
                            }

                        }
                        if(strlen($manual_override[$country][$standard_date][$state]['deaths'])>0)
                        {
                            $data[$country]['daily'][$date]['total']['d'] = 0;
                            $global['daily'][$date]['deaths'] += intval($manual_override[$country][$standard_date][$state]['deaths']) - isset($data[$country]['daily'][$date]['states'][$state]['d']) ? $data[$country]['daily'][$date]['states'][$state]['d'] : 0;
                            $data[$country]['daily'][$date]['states'][$state]['d'] = intval($manual_override[$country][$standard_date][$state]['deaths']);
                            foreach($data[$country]['daily'][$date]['states'] AS $s)
                            {
                                $data[$country]['daily'][$date]['total']['d'] += $s['d'];
                            }
                        }
                        if(strlen($manual_override[$country][$standard_date][$state]['recovered'])>0)
                        {
                            $data[$country]['daily'][$date]['total']['r'] = 0;
                            $global['daily'][$date]['recovered'] += intval($manual_override[$country][$standard_date][$state]['recovered']) - isset($data[$country]['daily'][$date]['states'][$state]['r']) ? $data[$country]['daily'][$date]['states'][$state]['r'] : 0;
                            $data[$country]['daily'][$date]['states'][$state]['r'] = intval($manual_override[$country][$standard_date][$state]['recovered']);
                            foreach($data[$country]['daily'][$date]['states'] AS $s)
                            {
                                $data[$country]['daily'][$date]['total']['r'] += $s['r'];
                            }
                        }
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

                            // Copy last record
                            $last_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];
                            $new_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];

                            if($override['confirmed'] == 'N/A')
                            {
                                $confirmed = $last_daily_record['total']['c'];
                            }
                            else
                            {
                                $confirmed = (int) str_replace(',','',$override['confirmed']);
                            }

                            if($override['deaths'] == 'N/A')
                            {
                                $deaths = $last_daily_record['total']['d'];
                            }
                            else
                            {
                                $deaths = (int) str_replace(',','',$override['deaths']);
                            }

                            if($override['recovered'] == 'N/A')
                            {
                                $recovered = $last_daily_record['total']['r'];
                            }
                            else
                            {
                                $recovered = (int) str_replace(',','',$override['recovered']);
                            }


                            $temp_state_data = [
                                'c' => 0,
                                'd' => 0,
                                'r' => 0
                            ];
                            foreach($last_daily_record['states'] AS $index=>$state)
                            {
                                if($state['name'] != '(Unspecified)')
                                {
                                    $temp_state_data['c'] += intval($state['c']);
                                    $temp_state_data['d'] += intval($state['d']);
                                    $temp_state_data['r'] += intval($state['r']);
                                }
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
        // https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Pov2AbAscAXUNphDrjd3ZmzlbuvMy_Pd195bXlylwgdDnu1OQ0CBKXfMeDAHBZWbtLL9t5McfIcD/pubhtml
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

        $this->harvest_oxford();

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

    protected function manual_override()
    {
//        https://docs.google.com/spreadsheets/d/e/2PACX-1vThKLEaifDmgMxx4C1IgjXyRkJFIdr8rM5skPGo3frgrr775w1KWMlmor2a-0yIhuTfdqzwdMm50WX4/pubhtml
        $url = 'https://spreadsheets.google.com/feeds/list/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/1/public/values?alt=json';
        $file= file_get_contents($url);

        $json = json_decode($file,true);
        $rows = $json['feed']['entry'];
        $sheets = [];
        foreach($rows AS $row)
        {
            $sheets[$row['gsx$country']['$t']] = [
                'id' => $row['gsx$sheetid']['$t'],
                'country' => $row['gsx$country']['$t'],
            ];
        }

        $data = [];

//        foreach($sheets AS $country=>$sheet)
//        {
//            $url = 'https://spreadsheets.google.com/feeds/list/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/' . $sheet['id'] .'/public/values?alt=json';
//            $file= file_get_contents($url);
//
//            $json = json_decode($file,true);
//            $rows = $json['feed']['entry'];
//            $data[$country] = [];
//            foreach($rows AS $row)
//            {
//                if (strlen($row['gsx$state']['$t']) == 0){
//                    $row['gsx$state']['$t'] = '(Unspecified)';
//                }
//                $data[$country][$row['gsx$date']['$t']][$row['gsx$state']['$t']] = [
//                    'state' => $row['gsx$state']['$t'],
//                    'date' => $row['gsx$date']['$t'],
//                    'confirmed' => $row['gsx$confirmed']['$t'],
//                    'deaths' => $row['gsx$deaths']['$t'],
//                    'recovered' => $row['gsx$recovered']['$t'],
//                ];
//            }
//        }

//        dd($sheets);


        foreach($sheets AS $country=>$sheet)
        {
            // Grab the list of state columns
            $url = 'https://spreadsheets.google.com/feeds/cells/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/' . $sheet['id'] . '/public/full?alt=json';
            $file= file_get_contents($url);

            $json = json_decode($file,true);
            $rows = $json['feed']['entry'];
            $data[$country] = [];

            $states = [];
            foreach($rows AS $row)
            {
                if ($row['gs$cell']['row'] == 1)
                {
                    $states[] = $row['gs$cell']['inputValue'];
                }
                else
                {
                    break;
                }
            }

            // Grab contents
            $url = 'https://spreadsheets.google.com/feeds/list/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/' . $sheet['id'] . '/public/full?alt=json';
            $file= file_get_contents($url);

            $json = json_decode($file,true);
            $result = $json['feed']['entry'];
            $data[$country] = [];

            $rows = [];
            foreach($result AS $row)
            {
                if(strlen($row['content']['$t'])>0)
                {
                    $rows[] = $row;
                }
            }

            // Create a map of the content columns
            $columns = [];
            $header = array_shift($rows);
            $x = 0;
            foreach($header AS $key => $value)
            {
                if(substr($key,0,3) == 'gsx')
                {
                    if($x>0)
                    {
                        $state = $states[floor(($x-1) / 3)];
                    }

                    if($x == 0)
                    {
                        $columns['date'] = $key;
                    }
                    else if($x % 3 == 1)
                    {
                        $columns[$state]['confirmed'] = $key;
                    }
                    else if($x % 3 == 2)
                    {
                        $columns[$state]['deaths'] = $key;
                    }
                    else if($x % 3 == 0)
                    {
                        $columns[$state]['recovered'] = $key;
                    }
                    $x++;
                }
            }

            foreach($rows AS $row)
            {
                $date = $row[$columns['date']]['$t'];

                foreach($states AS $state)
                {
                    if(
                        isset($row[$columns[$state]['confirmed']]['$t']) && strlen($row[$columns[$state]['confirmed']]['$t']) > 0
                        || isset($row[$columns[$state]['deaths']]['$t']) && strlen($row[$columns[$state]['deaths']]['$t']) > 0
                        || isset($row[$columns[$state]['recovered']]['$t']) && strlen($row[$columns[$state]['recovered']]['$t']) > 0
                    )
                    {
                        $data[$country][$date][$state] = [
                            'state' => $state,
                            'date' => $date,
                            'confirmed' => isset($row[$columns[$state]['confirmed']]['$t']) ? str_replace(',','',$row[$columns[$state]['confirmed']]['$t']) : '',
                            'deaths' => isset($row[$columns[$state]['deaths']]['$t']) ? str_replace(',','',$row[$columns[$state]['deaths']]['$t']) : '',
                            'recovered' => isset($row[$columns[$state]['recovered']]['$t']) ? str_replace(',','',$row[$columns[$state]['recovered']]['$t']) : '',
                        ];
                    }
                }

            }
        }
        return $data;
    }

    protected function harvest_oxford()
    {

        $filename = OXFORD_LATEST;
        $csv = array_map('str_getcsv', file($filename));
        $filename = str_replace(OXFORD_DATA,'',$filename);
        $filename = str_replace('.csv','',$filename);
//        $key[$file_id] = $filename;
        $header = array_shift($csv); # remove column header

//        [
//            0 => "CountryName"
//            1 => "CountryCode"
//            2 => "Date"
//            3 => "S1_School closing"
//            4 => "S1_IsGeneral"
//            5 => "S2_Workplace closing"
//            6 => "S2_IsGeneral"
//            7 => "S3_Cancel public events"
//            8 => "S3_IsGeneral"
//            9 => "S4_Close public transport"
//            10 => "S4_IsGeneral"
//            11 => "S5_Public information campaigns"
//            12 => "S5_IsGeneral"
//            13 => "S6_Restrictions on internal movement"
//            14 => "S6_IsGeneral"
//            15 => "S7_International travel controls"
//            16 => "S8_Fiscal measures"
//            17 => "S9_Monetary measures"
//            18 => "S10_Emergency investment in health care"
//            19 => "S11_Investment in Vaccines"
//            20 => "S12_Testing framework"
//            21 => "S13_Contact tracing"
//            22 => "ConfirmedCases"
//            23 => "ConfirmedDeaths"
//            24 => "StringencyIndex"
//            25 => "StringencyIndexForDisplay"
//            26 => ""
//        ]

        $key = [
            's1' => [
                'name' => 'School closing',
                'description' => 'Record closings of schools and universities',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing',
                ],
                'hasTarget' => true
            ],
            's2' => [
                'name' => 'Workplace closing',
                'description' => 'Record closings of workplaces',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing',
                ],
                'hasTarget' => true
            ],
            's3' => [
                'name' => 'Cancel public events',
                'description' => 'Record cancelling public events',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend cancelling',
                    'Require cancelling',
                ],
                'hasTarget' => true
            ],
            's4' => [
                'name' => 'Close public transport',
                'description' => 'Record closing of public transport',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing',
                ],
                'hasTarget' => true
            ],
            's5' => [
                'name' => 'Public info campaigns',
                'description' => 'Record presence of public info campaigns',
                'type' => 'lookup',
                'values' => [
                    'No COVID-19 public information campaign',
                    'COVID-19 public information campaign',
                ],
                'hasTarget' => true
            ],
            's6' => [
                'name' => 'Restrictions on internal movement',
                'description' => 'Record restrictions on internal movement',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend movement restriction',
                    'Restrict movement',
                ],
                'hasTarget' => true
            ],
            's7' => [
                'name' => 'International travel controls',
                'description' => 'Record restrictions on international travel',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Screening',
                    'Quarantine on high-risk regions',
                    'Ban on high-risk regions',
                ],
                'hasTarget' => false
            ],
            's8' => [
                'name' => 'Fiscal measures',
                'description' => 'What economic stimulus policies are adopted',
                'type' => 'custom',
                'values' => ['Value of fiscal stimuli, including spending or tax cuts'],
                'hasTarget' => false
            ],
            's9' => [
                'name' => 'Monetary measures',
                'description' => 'What monetary policy interventions?',
                'type' => 'custom',
                'values' => ['Value of interest rate'],
                'hasTarget' => false
            ],
            's10' => [

                'name' => 'Emergency investment in health care',
                'description' => 'Short-term spending on, e.g. hospitals, masks, etc',
                'type' => 'custom',
                'values' => ['Value of new short-term spending on health'],
                'hasTarget' => false
            ],
            's11' => [
                'name' => 'Investment in vaccines',
                'description' => 'Announced public spending on vaccine development',
                'type' => 'custom',
                'values' => ['Value of investment'],
                'hasTarget' => false
            ],
            's12' => [
                'name' => 'Testing policy',
                'description' => 'Who can get tested?',
                'type' => 'lookup',
                'values' => [
                    'No testing policy',
                    'Only testing those who both (a) have symptoms, and (b) meet specific criteria (e.g. key workers, admitted to hospital, came into contact with a known case, returned from overseas)',
                    'Testing of anyone showing, COVID-19 symptoms',
                    'Open public testing (e.g. "drive through" testing available to asymptomatic people)',
                ],
                'hasTarget' => false
            ],
            's13' => [
                'name' => 'Contact tracing',
                'description' => 'Are governments doing contact tracing?',
                'type' => 'lookup',
                'values' => [
                    'No contact tracing',
                    'Limited contact tracing - not done for all cases',
                    'Comprehensive contact tracing - done for all cases',
                ],
                'hasTarget' => false
            ],
        ];


        $daily = [];
        $latest = [];
        foreach($csv AS $row)
        {
            if(isset($this->oxford_jh_map[$row[0]]))
            {
                $country = $this->oxford_jh_map[$row[0]];
                $date = date('Y-m-d',strtotime($row[2]));

                // Daily
                // data:  [country] [date] [stringencyindex]                             = value
                // data:  [country] [date] ['policies']      [policynumber] [policyname] = value

                // Latest
                // data: [country] [stringencyindex / policies]

                if(strlen($row[3]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's1' => [
                            'value' => $row[3],
                            'target' => $row[4],
                        ],
                    ];

                    $latest[$country]['policies']['s1'] = [
                        'value' => $row[3],
                        'target' => $row[4],
                    ];
                }

                if(strlen($row[5]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's2' => [
                            'value' => $row[5],
                            'target' => $row[6],
                        ],
                    ];

                    $latest[$country]['policies']['s2'] = [
                        'value' => $row[5],
                        'target' => $row[6],
                    ];
                }

                if(strlen($row[7]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's3' => [
                            'value' => $row[7],
                            'target' => $row[8],
                        ],
                    ];

                    $latest[$country]['policies']['s3'] = [
                        'value' => $row[7],
                        'target' => $row[8],
                    ];
                }

                if(strlen($row[9]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's4' => [
                            'value' => $row[9],
                            'target' => $row[10],
                        ],
                    ];

                    $latest[$country]['policies']['s4'] = [
                        'value' => $row[9],
                        'target' => $row[10],
                    ];
                }

                if(strlen($row[11]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's5' => [
                            'value' => $row[11],
                            'target' => $row[12],
                        ],
                    ];

                    $latest[$country]['policies']['s5'] = [
                        'value' => $row[11],
                        'target' => $row[12],
                    ];
                }

                if(strlen($row[13]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's6' => [
                            'value' => $row[13],
                            'target' => $row[14],
                        ],
                    ];

                    $latest[$country]['policies']['s6'] = [
                        'value' => $row[13],
                        'target' => $row[14],
                    ];
                }

                if(strlen($row[15]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's7' => [
                            'value' => $row[15],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s7'] = [
                        'value' => $row[15],
                        'target' => '',
                    ];
                }

                if($row[16] > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's8' => [
                            'value' => $row[16],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s8'] = [
                        'value' => $row[16],
                        'target' => '',
                    ];
                }

                if($row[17] > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's9' => [
                            'value' => $row[17],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s9'] = [
                        'value' => $row[17],
                        'target' => '',
                    ];
                }

                if($row[18] > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's10' => [
                            'value' => $row[18],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s10'] = [
                        'value' => $row[18],
                        'target' => '',
                    ];
                }

                if($row[19] > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's11' => [
                            'value' => $row[19],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s11'] = [
                        'value' => $row[19],
                        'target' => '',
                    ];
                }

                if(strlen($row[20]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's12' => [
                            'value' => $row[20],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s12'] = [
                        'value' => $row[20],
                        'target' => '',
                    ];
                }

                if(strlen($row[21]) > 0)
                {
                    $daily[$country][$date]['policies'] = [
                        's13' => [
                            'value' => $row[21],
                            'target' => '',
                        ],
                    ];

                    $latest[$country]['policies']['s13'] = [
                        'value' => $row[21],
                        'target' => '',
                    ];
                }

                $daily[$country][$date]['stringencyindex'] = $row[25];
                $latest[$country]['stringencyindex'] = $row[25];
            }
        }

        $data = [
            'key' => $key,
            'daily' => $daily,
            'latest' => $latest,
        ];


//        dd($data);
//
//
//
//        $result = array_diff(scandir(OXFORD_DATA), array('..', '.','README.md','.gitignore'));
//
//
//        $daily = [];
//        $key = [];
//        foreach($result AS $file_id => $file) {
//            if(substr($file,0,1) == 's')
//            {
//                $filename = OXFORD_DATA . $file;
//                $csv = array_map('str_getcsv', file($filename));
//                $filename = str_replace(OXFORD_DATA,'',$filename);
//                $filename = str_replace('.csv','',$filename);
//                $key[$file_id] = $filename;
//                $header = array_shift($csv); # remove column header
//                $csv = array_slice($csv,0,count($csv) - 3);
//
//                foreach ($csv AS $row) {
//                    foreach($row AS $index=>$value)
//                    {
//
//                        if($value > 0)
//                        {
//                            // Data - filename - country name - date = value
////                            $daily[$filename][$row[0]][$header[$index]] = $value;
//
//                            // data:  [country] [date] [stringencyindex]              = value
//                            // data:  [country] [date] [policynumber]    [policyname] = value
//                            $date = date('Y-m-d',strtotime($header[$index]));
//                            if($filename == 'stringencyindex')
//                            {
//                                $daily[$row[0]][$date]['stringencyindex'] = $value;
//                            }
//                            else
//                            {
//                                $policy = explode('_',$filename);
//                                $daily[$row[0]][$date]['policy'][$policy[0]][$policy[1]] = $value;
//                            }
//                        }
//                    }
//                }
//            }
//        }
//
//        $latest = [];
//        foreach($daily AS $country=>$country_row)
//        {
//            $last_date = array_slice($country_row,-1,1);
//            foreach($last_date AS $date => $date_row)
//            {
//                foreach($date_row['policy'] AS $policy_number=>$policy_row)
//                {
//                    foreach($policy_row AS $policy => $value)
//                    {
//                        $latest[$country]['policy'][$policy_number][$policy] = $value;
//                    }
//
//                }
//                if(isset($date_row['stringencyindex']))
//                {
//                    $latest[$country]['stringencyindex'] =
//                        $date_row['stringencyindex'];
//                }
//            }
//        }


        $data = [
            'key' => $key,
            'daily' => $daily,
            'latest' => $latest,
        ];

        file_put_contents(STATS . 'oxford.json',json_encode($data));

        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }

    public function oxford()
    {

        $filename = STATS . 'oxford.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }
}
