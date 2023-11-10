<?php

namespace modules\Organizations\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrganizationRequest extends FormRequest {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'name' => 'required|max:255|unique:organizations,name,' . $this->industry->id . ',id',
            'slug' => 'required|max:255|unique:organizations,slug,' . $this->industry->id . ',id',
            'description' => 'required|string|max:5000',
            'logo' => 'sometimes|image|mimes:jpeg,png|max:2048',
            'industry_id' => 'sometimes|numeric|exists:industries,id',
            'status' => 'required|numeric',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }
}
