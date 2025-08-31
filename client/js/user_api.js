$("document").ready(()=>{
    $("#login_form").submit((event)=>{
        event.preventDefault();
        $('.one_error').remove();
        if($("#form_purpose").val() == 'login' || $('#password_1').val() == $('#password_2').val()){
            $.ajax({
                method: "POST",
                url: "http://server/login",
                data: $("#login_form").serialize(),
                success: (response)=>{
                    if(response.res == false){
                        if(response.errors && Object.keys(response.errors).length != 0){
                            $.each(response.errors, function(key, val){
                                new_error(val);
                            })
                        }
                    }else{
                        sessionStorage.setItem('user_id', response.id);
                        sessionStorage.setItem('email', response.email);
                        sessionStorage.setItem('mess', response.mess);
                        location.href = 'tasks.html';
                    }
                    if(response.error){
                        new_error(response.error);
                    }
                },
                error: ()=>{
                    new_error('Произошла ошибка сервера!!');
                }
            })
        }else{
            new_error('Пароли не совпадают!');
        }        
    })
})

if(sessionStorage.getItem('user_id')){
    location.href = 'tasks.html'
}

$('.btn_change_forms').on('click', function(){
    if($('.btn_change_forms').index($(this)) != $('.btn_change_forms').index($('#checked_btn_form'))){
        if($('.btn_change_forms').index($('#checked_btn_form')) == 0){
            $('.btn_change_forms').eq(0).attr('id', 'unchecked_btn_form'); 
            $('.btn_change_forms').eq(1).attr('id', 'checked_btn_form');
            $('#login_submit').attr('value', 'Зарегистрироваться');
            $('#form_purpose').attr('value', 'sign_up');

            $('#label_pass_2').text('Повторите пароль');
            let check_pass_label = document.createElement('input');
            check_pass_label.setAttribute('id', 'password_2');
            check_pass_label.setAttribute('placeholder', 'Введите пароль еще раз');
            check_pass_label.setAttribute('name', 'pass_2');
            check_pass_label.setAttribute('type', 'password');
            check_pass_label.setAttribute("oninput", "check_two_pass()");
            check_pass_label.setAttribute('required', true);
            $('#label_pass_2').append(check_pass_label);
            $('#password_1').attr('oninput','check_two_pass()');
        }else if($('.btn_change_forms').index($('#unchecked_btn_form')) == 0){
            $('.btn_change_forms').eq(0).attr('id', 'checked_btn_form'); 
            $('.btn_change_forms').eq(1).attr('id', 'unchecked_btn_form'); 
            $('#login_submit').attr('value', 'Войти');
            $('#form_purpose').attr('value', 'login');

            $('#label_pass_2').children().remove();
            $('#label_pass_2').text('');
            $('#error_message_password').text('');
        }
    } 
});

function check_two_pass(){
    if($("#label_pass_2")){
        if($('#password_1').val() != $('#password_2').val()){
            $("#error_message_password").text('Пароли не совпадают!');
            $("#error_message_password").css('color', '#ad0101');
        }else{
            $("#error_message_password").text('Пароли совпадают!');
            $("#error_message_password").css('color', '#23ad01');
        }
    }
}

if(sessionStorage.getItem('error')){
    new_error(sessionStorage.getItem('error'));
    sessionStorage.removeItem('error');
}

function new_error(error){
    $('.one_error').remove();
    let new_error = document.createElement('div');
        new_error.classList.add('one_error');
        new_error.innerHTML = `<div class="error_sign">!</div>
            <span>`+error+`</span>
            <div onclick="close_error(this)" class="close_error">x</div>`;
        
        $('#errors_and_messages').append(new_error);
}

function new_mess(mess){
    let new_mess = document.createElement('div');
    new_mess.classList.add('one_mess');
    new_mess.innerHTML = `
    <div class="mess_sign">!</div>
        <span>`+mess+`</span>
    <div onclick="close_mess(this)" class="mess_error">x</div>
    `;
    $('#errors_and_messages').append(new_mess);
    sessionStorage.removeItem('mess');
}

function close_error(btn){
    btn = $(btn).closest(".one_error");
    let width_error = btn.outerWidth();
    btn.animate({
        marginRight: - width_error - 100,
        opacity:0
    },500, function(){
        $(this).remove();
    })
}

function close_mess(btn){
    btn = $(btn).closest(".one_mess");
    let width_error = btn.outerWidth();
    btn.animate({
        marginRight: - width_error - 100,
        opacity:0
    },500, function(){
        $(this).remove();
    })
}

function logout(){
    sessionStorage.removeItem('user_id');
    sessionStorage.setItem('error', 'Вы вышли из аккаунта!');
    location.href = 'index.html';
}