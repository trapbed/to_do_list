<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function create_task(Request $request){
        $res = false;
        $title = trim(strip_tags($request->title));
        $desc = trim(strip_tags($request->description));
        $user_id = $request->user_id;
        $check_similar = Task::select('*')->where('title', '=', $title)->where('user_id', '=', $user_id);
        if($check_similar->count() > 0){
            return response()->json(['error'=>'Задача с таким заголовком существует!', 'res'=>$res]);
        }else{
            $create_task = Task::create([
                'user_id'=>$user_id,
                'title'=>$title,
                'description'=>$desc,
                'status'=>'0'
            ]);
            if($create_task){
                return response()->json(['mess'=>'Успешное создание задачи!', 'res'=>true, 'title'=>$title, 'desc'=>$desc, 'id'=>$create_task->id]);
            }else{
                return response()->json(['error'=>'Не удалось удалить задачу!', 'res'=>$res]);
            }
        }
    }

    public function all_tasks(Request $request){
        $tasks = DB::table('tasks')->select('*')->where('user_id', '=', $request->user_id)->orderBy('status', 'ASC')->orderBy('updated_at', 'DESC');
        if(strlen($request->search) > 0){
            $tasks = $tasks->where('title', 'LIKE', "%".$request->search."%");
        }
        if($request->filter == '0' || $request->filter == '1'){
            $tasks = $tasks->where('status', '=', $request->filter);
        }
        return response()->json(['id'=>$request->user_id, 'tasks'=>$tasks->get(), 'count_tasks'=>$tasks->count()]);
    }

    public function update_task(Request $request, $id){
        $res = false;
        if(isset($request->now_status)){
            $desired_status = $request->now_status == '0' ? '1' : '0';
            $update = DB::table('tasks')->where('id', '=', $id)->update([
                'status'=>$desired_status,
                'updated_at'=>date('Y-m-d H:i:s', time())
            ]);
            if($update){
                $task_data = Task::select('*')->where('id', '=', $id)->get()[0];
                return response()->json(['res'=>true, 'mess'=>'Задача обновлена!', 'title'=>$task_data->title, 'desc'=>$task_data->description]);
            }else{
                return response()->json(['res'=>$res, 'error'=>'Не удалось обновить задачу!']);
            }
        }
    }
    public function one_task($id){
        $task = Task::select('*')->where('id', '=', $id)->get()[0];
        return response()->json(['id'=>$id, 'task'=>$task]);
    }

    public function update_task_info($id, Request $request){
        $res = false;
        $title = $request->title;
        $desc = $request->description;
        $updated_at = date('Y-m-d H:i:s', time());
        $update = Task::where('id', '=', $id)->update([
            'title'=>$title,
            'description'=>$desc,
            'updated_at'=>$updated_at
        ]);
        if($update){
            return response()->json(['res'=>true, 'mess'=>'Успешное обновление задачи!', 'id'=>$id, 'title'=>$title, 'desc'=>$desc]);
        }else{
            return response()->json(['res'=>$res, 'error'=>'Не удалось обновить задачу!', 'id'=>$id]);
        }
    }
    public function delete_task($id){
        $res = false;
        $delete_task = Task::where('id', '=', $id)->delete();
        if($delete_task){
            return response()->json(['res'=>true, 'mess'=>'Успешное удаление задачи!']);
        }else{
            return response()->json(['res'=>true, 'error'=>'Не  удалось удалить задачу!']);
        }
    }
}
