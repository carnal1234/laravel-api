<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;

use App\Filters\ApiFilter;



class CustomerFilter extends ApiFilter{

    protected $safeParms = [
        'name' => ['eq'],
        'email' => ['eq'],
    ];

    protected $columnMap = [
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];

}

?>