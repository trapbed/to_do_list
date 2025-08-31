$.ajax({
    method: "GET",
    url: "http://server/tasks",
    data: {'user_id':sessionStorage.getItem('user_id')},
    success: (response)=>{
        render_tasks(response);
    },
    error: ()=>{
        alert('Произошла ошибка сервера!!');
    }
})

$(document).on("change", ".checkbox_task", function(){
    $(".one_mess").remove();
    let values = $(this).val().split("_");
    $.ajax({
        method: "POST",
        url:"http://server/tasks/"+values[0],
        data: {'now_status': values[1]},
        success: (response)=>{
            $(this).parent().parent().parent().remove();
            if(values[1] == '1'){
                let new_task = document.createElement('div');
                new_task.classList.add('one_task');
                let is_checked = values[1] == '1' ? ['unchecked', 'one_task_btn', "onclick='edit_task("+values[0]+")'", '0'] : ['checked', '', '', '1'];
                new_task.innerHTML = `
                <div class="check_task">
                        <form action="">
                            <input `+is_checked[0]+` value="`+values[0]+`_`+is_checked[3]+`" class="checkbox_task" name="completed" type="checkbox">
                        </form>
                    </div>
                    <div class="content_task">
                        <div class="title_task">`+response.title+`</div>
                        <div class="desc_task">`+response.desc+`</div>
                    </div>
                    <div class="act_task">
                        <button `+is_checked[2]+` class="`+is_checked[1]+`"><img src="img/light_pen.png" alt="update task"></button>
                        <button onclick='del_task(`+values[0]+`)' class="one_task_btn"><img src="img/light_bin.png" alt="delete_task"></button>
                    </div>`;
                $("#list_tasks").prepend(new_task);
            }else{
                let new_task = document.createElement('div');
                new_task.classList.add('one_task','checked_task');
                let is_checked = values[1] == '0' ? ['checked', '', '', '1'] : ['unchecked', 'one_task_btn', "onclick='edit_task("+values[0]+")'", '0'];
                new_task.innerHTML = `
                <div class="check_task">
                        <form action="">
                            <input `+is_checked[0]+` value="`+values[0]+`_`+is_checked[3]+`" class="checkbox_task" name="completed" type="checkbox">
                        </form>
                    </div>
                    <div class="content_task">
                        <div class="title_task">`+response.title+`</div>
                        <div class="desc_task">`+response.desc+`</div>
                    </div>
                    <div class="act_task">
                        <button `+is_checked[2]+` class="`+is_checked[1]+`"><img src="img/light_pen.png" alt="update task"></button>
                        <button onclick='del_task(`+values[0]+`)' class="one_task_btn"><img src="img/light_bin.png" alt="delete_task"></button>
                    </div>`;
                $("#list_tasks").append(new_task);
            }
            if(response.res == true){
                new_mess(response.mess);
            }else{
                new_error(response.error);
            }
        },
        error:()=>{
            alert('Произошла ошибка сервера!');
        }
    })
})

$(document).on("mouseover", ".one_task_btn", function(){
   let icon = $(this).children("img").attr('src').substring(10, 13);
    $(this).children("img").attr('src', 'img/dark_'+icon+'.png');  
})

$(document).on("mouseout", ".one_task_btn", function(){
   let icon = $(this).children("img").attr('src').substring(9, 12);
    $(this).children("img").attr('src', 'img/light_'+icon+'.png');
})

function one_task_icons(img){
    $(this).find("img").attr('src', img+'.png');
}

if(sessionStorage.getItem('mess')){
    new_mess(sessionStorage.getItem('mess'));
    sessionStorage.removeItem('mess');
}

if(!sessionStorage.getItem('user_id')){
    location.href = 'index.html'
}else{
    $('.user_id_form').val(sessionStorage.getItem('user_id'));
}

function modal_create_task(){
    $('#bg_modal').css('display', 'flex');
    $('#modal_create_task').css('display', 'flex');
}

function close_modal(){
    $('#bg_modal').css('display', 'none');
    $('#modal_create_task').css('display', 'none');
    if(sessionStorage.getItem('title')){
        sessionStorage.removeItem('title', 'desc');
        $("#create_task_title").val('');
        $("#create_task_desc").val('');
        $("#input_hidden_id_task").remove();
        $("#edit_task_method").remove();
        $('#modal_edit_task').remove();
    }
}

$("document").ready(()=>{
    $("#create_task_form").submit((event)=>{
        event.preventDefault();
        if($.trim($("#create_task_desc").val()).length > 0 && $.trim($('#create_task_title').val()).length > 0){
            $.ajax({
                method: "POST",
                url: "http://server/tasks",
                data: $("#create_task_form").serialize(),
                success: (response)=>{
                    if(response.res == false){
                        if(response.errors && Object.keys(response.errors).length != 0){
                            $.each(response.errors, function(key, val){
                                new_error(val);
                            })
                        }
                    }else{
                        $("#create_task_form").trigger('reset');
                        $('#bg_modal').css('display', 'none');
                        $("#modal_create_task").css('display', 'none');
                        new_mess(response.mess);
                        let new_task = document.createElement('div');
                        new_task.classList.add('one_task');
                        new_task.setAttribute('id', 'onetask_'+response.id);
                        new_task.innerHTML = `
                        <div class="check_task">
                                <form action="">
                                    <input class="checkbox_task" onchange="completed_task('0', `+response.id+`)" name="completed" type="checkbox">
                                </form>
                            </div>
                            <div class="content_task">
                                <div class="title_task">`+response.title+`</div>
                                <div class="desc_task">`+response.desc+`</div>
                            </div>
                            <div class="act_task">
                                <button onclick="edit_task(`+response.id+`)" class="one_task_btn"><img src="img/light_pen.png" alt="update task"></button>
                                <button onclick="del_task(`+response.id+`)" class="one_task_btn"><img src="img/light_bin.png" alt="delete_task"></button>
                            </div>`;
                        $("#list_tasks").prepend(new_task);
                    }
                    if(response.error){
                        new_error(response.error);
                    }
                },
                error: ()=>{
                    alert('Произошла ошибка сервера!');
                }
            })
        }else{
            new_error('Заполните все поля!');
        }        
    })
})

function edit_task(id){
    $.ajax({
        url:"http://server/tasks/"+id,
        method:"GET",
        success:(response)=>{
            $('#bg_modal').css('display', 'flex');
            let modal_edit_task = document.createElement('div');
            modal_edit_task.setAttribute('id', 'modal_edit_task');
            modal_edit_task.innerHTML = `
                    <div onclick="close_modal()" id="close_modal">x</div>
                    <h5>Редактирование задачи</h5>
                    <form method="POST" id="update_task_form">
                        <input type="hidden" name="user_id" value="`+sessionStorage.getItem('user_id')+`" class="user_id_form">
                        <input value="`+id+`" type='hidden' name='task_id' id='input_hidden_id_task'>
                        <label for="title">Заголовок задачи
                            <input value="`+response.task.title+`" id="update_task_title" name="title" type="text">
                        </label>
                        <label for="description">Описание задачи
                            <textarea id="update_task_desc" name="description">`+response.task.description+`</textarea>
                        </label>
                        <input type="submit" value="Сохранить">
                    </form>
            `;
            $("#bg_modal").append(modal_edit_task);
            sessionStorage.setItem('title', response.task.title);
            sessionStorage.setItem('desc', response.task.description);
        },
        error:()=>{
            alert('Произошла ошибка сервера!');
        }
    })
}

$(document).on('submit', '#update_task_form', function(e) {
    e.preventDefault();
    let id_task = $("#input_hidden_id_task").val();
    let title = $.trim($('#update_task_title').val());
    let desc = $.trim($("#update_task_desc").val());
    if(desc.length == 0 || title.length == 0){
        new_error('Заполните все поля!');
    }else if(sessionStorage.getItem('title') == title && sessionStorage.getItem('desc') == desc){
        new_error('Данные актуальные!');
    }else{
        $.ajax({
            method: "PUT",
            url: "http://server/tasks/"+id_task,
            data: $("#update_task_form").serialize(),
            success: (response)=>{
                if(response.res == false){
                    if(response.errors && Object.keys(response.errors).length != 0){
                        $.each(response.errors, function(key, val){
                            new_error(val);
                        })
                    }
                }else{
                    $("#bg_modal").css('display', 'none');
                    $("#modal_edit_task").remove();
                    $("#onetask_"+id_task).find(".content_task").find(".title_task").text(response.title);
                    $("#onetask_"+id_task).find(".content_task").find(".desc_task").text(response.desc);
                }
                if(response.error){
                    let new_error = document.createElement('div');
                    new_error.classList.add('one_error');
                    new_error.innerHTML = `<div class="error_sign">!</div>
                        <span>`+response.error+`</span>
                        <div onclick="close_error(this)" class="close_error">x</div>`;
                    $('#errors_and_messages').append(new_error);
                }
            },
            error: ()=>{
                alert('Произошла ошибка сервера!');
            }
        })
    } 
})

function del_task(task_id){
    $.ajax({
        url:"http://server/tasks/"+task_id,
        method:"DELETE",
        success:(response)=>{
            if(response.res == true){
                new_mess(response.mess);
                $("#onetask_"+task_id).remove();
            }else{
                new_error(response.error);
            }
        },
        error:()=>{
            alert('Произошла ошибка сервера!');
        }
    })
}

function tasks_with_search(){
    let search = $('#input_search_task').val().trim();
    let filter = $('#input_filter_task').val().trim();
    $.ajax({
        url:"http://server/tasks",
        data:{'user_id':sessionStorage.getItem('user_id'),'search':search,'filter':filter},
        method: "GET",
        success:(response)=>{
            render_tasks(response);
        },
        error:()=>{
            alert('Произошла ошибка сервера!');
        }
    })
}

function render_tasks(response){
    $("#list_tasks").empty();
    if(response.count_tasks <= 0){
        let no_tasks = document.createElement('div');
        no_tasks.setAttribute('id', 'no_tasks_wrapper');
        no_tasks.innerHTML = `
        <div id="no_tasks_wrapper">
            <img id="img_no_tasks" src="img/empty.png">
            <span id="no_tasks_text">Нет задач!</span>
        </div>`;
        $("#list_tasks").append(no_tasks);
    }else{
        $.each(response.tasks, function(id, row){
            let new_task = document.createElement('div');
            let checked_bg_color = row.status == '1' ? new_task.classList.add('checked_task') : '';
            new_task.classList.add('one_task');
            new_task.setAttribute('id', `onetask_`+row.id);
            let is_checked = row.status == '1' ? ['checked', '', '', '1'] : ['unchecked', 'one_task_btn', "onclick='edit_task("+row.id+")'", '0'];
            new_task.innerHTML = `
            <div class="check_task">
                    <form action="">
                        <input `+is_checked[0]+` value="`+row.id+`_`+row.status+`" class="checkbox_task" name="completed" type="checkbox">
                    </form>
                </div>
                <div class="content_task">
                    <div class="title_task">`+row.title+`</div>
                    <div class="desc_task">`+row.description+`</div>
                </div>
                <div class="act_task">
                    <button `+is_checked[2]+` class="`+is_checked[1]+`"><img src="img/light_pen.png" alt="update task"></button>
                    <button onclick='del_task(`+row.id+`)' class="one_task_btn"><img src="img/light_bin.png" alt="delete_task"></button>
                </div>`;
            $("#list_tasks").append(new_task);
        })
    }
}