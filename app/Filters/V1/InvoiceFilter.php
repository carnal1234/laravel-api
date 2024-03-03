<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;

use App\Filters\ApiFilter;


class InvoiceFilter extends ApiFilter{


    /*
    $table->id();
            $table->integer('customer_id');
            $table->integer('amount');
            $table->string('status'); //Billed, Paid, Void
            $table->dateTime('billed_date');
            $table->string('paid_date')->nullable();
            
            $table->timestamps();

    */

    protected $safeParms = [
        'customerId' => ['eq'],
        'amount' => ['eq', 'gt', 'lt', 'gte', 'lte'],
        'status' => ['eq', 'ne'],
        'billedDate' => ['eq', 'gt', 'lt', 'gte', 'lte'],
        'paidDate' => ['eq', 'gt', 'lt', 'gte', 'lte'],
    ];

    protected $columnMap = [
        'customerId' => 'customer_id',
        'billedDate' => 'billed_date',
        'paidDate' => 'paid_date'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'ne' => '!=',
    ];
}

?>