<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('lat',10,8)->default(0);
            $table->decimal('lng',11,8)->default(0);
            $table->bigInteger('population')->default(0);
            $table->timestamps();
        });

        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('country_id')->nullable();
            $table->string('name');
            $table->decimal('lat',10,8)->default(0);
            $table->decimal('lng',11,8)->default(0);
            $table->bigInteger('population')->default(0);
            $table->timestamps();
        });

        Schema::create('cases', function (Blueprint $table) {
            $table->unsignedInteger('state_id')->nullable();
            $table->date('date')->nullable();
            $table->bigInteger('confirmed')->default(0);
            $table->bigInteger('deaths')->default(0);
            $table->bigInteger('recovered')->default(0);
            $table->timestamps();
            $table->primary(['state_id', 'date']);
        });

        Schema::create('manual_override', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('state_id')->nullable();
            $table->date('date')->nullable();
            $table->bigInteger('confirmed')->default(0);
            $table->bigInteger('deaths')->default(0);
            $table->bigInteger('recovered')->default(0);
            $table->timestamps();
            $table->primary(['state_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
        Schema::dropIfExists('states');
        Schema::dropIfExists('cases');
    }
}
