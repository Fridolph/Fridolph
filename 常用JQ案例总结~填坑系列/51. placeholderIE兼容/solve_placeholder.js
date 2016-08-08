// solve_placeholder
  $(function(){   

    function solve_placeholder(solve_id,className){
      //判断浏览器是否支持placeholder属性      

      supportPlaceholder='placeholder' in document.createElement('input');
      if(!supportPlaceholder){

        //初始状态添加背景图片
        solve_id.attr("class",className);
        //初始状态获得焦点
        solve_id.focus;

        function destyle(){       
          if(solve_id.val() != ""){          
            solve_id.removeClass(className);
          }else{        
            solve_id.attr("class",className);
          }
        }
         
        //当输入框为空时，添加背景图片；有值时去掉背景图片
        destyle();

        solve_id.keyup(function(){
        //输入框有按键输入同时输入框不为空时，去掉背景图片；有按键输入同时为空时（删除字符），添加背景图片
          destyle();
        });

        solve_id.keydown(function(){       
          //keydown事件可以在按键按下的第一时间去掉背景图片
          solve_id.removeClass(className);
        });
      }
    }

    solve_placeholder( $("#username") , "phbg_username" );
    solve_placeholder( $("#password") , "phbg_psw" );
    solve_placeholder( $("#repeat_pwd") , "phbg_psw" );
    solve_placeholder( $("#telphone") , "phbg_phone" );

  });