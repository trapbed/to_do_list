<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request){
        $res = false;
        $email = strip_tags(trim($request->email));
        $pass = strip_tags(trim($request->pass));
        $purpose = $request->purpose;
        if($purpose == 'sign_up'){
            $data = ['email'=>$email,
                     'pass'=>$pass];
            $rule = ['email'=>['required', 'email'],
                     'pass'=>['required', 'min:4', 'regex:/^[a-zA-Z0-9]+$/']];
            $mess = ['email.required'=>'Обязательное поле!',
                     'email.email'=>'Введите корректную почту!',
                     'pass.required'=>'Обязательное поле!', 
                     'pass.min'=>'Минимальная длина пароля- 4 символа!',
                     'pass.regex'=>'Пароль должен состоять из символов латиницы и цифр!'];
            $validate = Validator::make($data, $rule, $mess);        
            if($validate->fails()){
                return response()->json(['errors'=>$validate->errors(), 'res'=>$res]);
            }else{
                if(User::where('email', '=', $email)->exists()){
                    return response()->json(['error'=>'Такой пользователь уже существет!', 'res'=>$res]);
                }else{
                    $new_user = User::create([
                        'email'=>$email,
                        'password'=>Hash::make($pass)
                    ]);
                    if($new_user){
                        $user = User::select('*')->where('email', '=', $email)->get()[0];
                        return response()->json(['res'=>true, 'id'=>$user->id, 'email'=>$user->email, 'mess'=>'Успешная авторизация!']);
                    }else{
                        return response()->json(['res'=>$res, 'error'=>'Такой пользователь уже существет!']);
                    }
                }
            }
        }else if($purpose == 'login'){
            $user_email = User::where('email', '=', $email);
            if($user_email->exists()){
                $hash_pass = DB::table('users')->select('*')->where('email', '=', $email)->get()[0]->password;
                if(Hash::check($pass, $hash_pass)){
                    $user = User::select('*')->where('email', '=', $email)->get()[0];
                    return response()->json(['res'=>true, 'email'=>$email, 'id'=>$user->id, 'mess'=>'Успешная авторизация!']);
                }else{
                    return response()->json(['res'=>$res, 'error'=>'Неверный пароль!']);
                }
            }else{
                return response()->json(['res'=>$res, 'error'=>'Такого пользователя не существует!']);
            }
        }
    }   
}
