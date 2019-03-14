<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WalletResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'coin_id' => $this->coin_id,
            'coin_name' => $this->coin->name,
            'address' => $this->address,
            'balance' => $this->balance,
        ];
    }
}