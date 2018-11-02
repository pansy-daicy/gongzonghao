<template>
    <div class="opinion">
        <div class="content">
            <div class="weui-cells__title">审核意见</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea class="weui-textarea wishContent" placeholder="请输入文本" rows="3"></textarea>
                        <div class="weui-textarea-counter wordsNum"><span>0</span>/200</div>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title select" style="height:47px;line-height: 47px;" v-show="ifShowAssignee !=='NONE'">选择下一步用户</div>
            <!-- 新增用户 -->
            <div class="weui-cells weui-cells_checkbox">
               <div class="list-item " v-for="(item,index) in newUser" data-type="0">
                   <label class="weui-cell weui-check__label lable-p" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                       <div class="weui-cell__hd">
                           <input type="checkbox" class="weui-check checkedInput" name="checkUserName"  checked="checked">
                           <i class="weui-icon-checked"></i>
                       </div>
                       <div class="weui-cell__bd">
                           <p class="title" style="text-align: left;">{{item.userName}}</p>	
                       </div>
                   </label>
                   <div class="delete" @click="deleteItem" :data-index="index">删除</div>
               </div>
                <a href="javascript:void(0);" class="weui-cell weui-cell_link" v-show="ifShowAssignee !=='NONE'">
                    <div class="weui-cell__bd" id="add">新增用户</div>
                </a>
                <!-- 用户列表子组件 -->
                <div id="operationDown1" style="display:none">
                    <div class="weui-mask" id="iosMask1" style="opacity: 1;"></div>
                    <div class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet1">
                        <newProject v-on:childByValue="childByValue" v-bind:userLists='userList'></newProject>
                    </div>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">审阅部门</label>
                    <span class="weui-form-preview__value">{{aprovalDeptName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">审阅人</label>
                    <span class="weui-form-preview__value">{{aprovalName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">审阅时间</label>
                    <span class="weui-form-preview__value">{{aprovalTime}}</span>
                </div>
            </div>
        </div>
        <div style = 'height:120px;text-align:center'>
            <button id="operation">操作</button>
        </div>
        <!-- 操作菜单 -->
    
        <div id="operationDown" style="display:none">
            <div class="weui-mask" id="iosMask" style="opacity: 1;"></div>
            <div class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
                <div class="weui-actionsheet__menu"  v-for="button in buttons">
                    <div class="weui-actionsheet__cell " v-bind:id="button.id" v-on:click="showHint(button)">{{button.name}}</div>
                </div>
                <div class="weui-actionsheet__action">
                    <div class="weui-actionsheet__cell iosActionsheetCancel" id="">取消</div>
                </div>
            </div>
        </div>
        <!-- 弹出提示框 -->
        <div class="js_dialog" id="iosDialog2" style="opacity: 1; display:none">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd" >{{opinionCheckMsg}}</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="confirm">确定</a>
                </div>
            </div>
        </div>
        <!-- 弹出是否同意申请 -->
        <div class="page dialog js_show">
            <div class="page__bd page__bd_spacing"></div>
            <div id="dialogs" style="display:none">
                <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
                    <div class="weui-mask"></div>
                    <div class="weui-dialog">
                        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
                        <div class="weui-dialog__bd">是否同意申请</div>
                        <div class="weui-dialog__ft">
                            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default iosActionsheetCancel" >取消</a>
                           <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary iosActionsheetCancel" @click='succeed'>确定</a>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 弹出加载 -->
        <div class="page toast js_show">
            <div id="loadingToast" style="display: none;">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">数据加载中</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import newProject from '@/components/newProject'
    export default {
        name: "opinion",
        data() {
            return {
                processInstanceId:"",
                taskId:"",
                ifShowAssignee:"",
                nextParticipantPost:"",
                aprovalId:"",
                aprovalName:"",
                aprovalDept:"",
                aprovalDeptName:"",
                aprovalTime:"",
                userList: [],
                buttons:[],
                newUser:[],
                 startX: 0,
                   endX: 0,
                opinionCheckMsg:""
            };
        },
         components:{
            newProject
        },
        mounted() {
            this.$ajax.post('/service/S_EW_HB_44',
          {
            "msg":"","msgKey":"","detailMsg":"","status":0,"traceId":"","attr":{"processInstanceId":"419fe650-b566-11e8-b440-28f10e21d739","taskId":"42917271-b566-11e8-b440-28f10e21d739"},"blocks":{}
          },
          response => {
             if (response.status >= 200 && response.status < 300) {
               let _data = response.data;
               if (response.data !== undefined) {
                   this.processInstanceId = _data.attr.processInstanceId;
                   this.taskId = _data.attr.taskId;
                   this.ifShowAssignee = _data.attr.ifShowAssignee;
                   this.nextParticipantPost = _data.attr.nextParticipantPost;
                   this.aprovalId = _data.attr.aprovalId;
                   this.aprovalName = _data.attr.aprovalName;
                   this.aprovalDept = _data.attr.aprovalDept;
                   this.aprovalDeptName = _data.attr.aprovalDeptName;
                   this.aprovalTime = _data.attr.aprovalTime;
                   this.userList = _data.attr.userList;
                   this.buttons = _data.attr.buttons;
               }
             } else {
                console.log(response.message);
             }
          });
            this.monitor();
            this.popup(); 
           
        },
        methods:{
          
                  // 左滑删除   
                  //跳转
                skip:function() {
                    if(this.checkSlide()) {
                        this.restSlide();
                    } else {
                         // alert('You click the slide!')
                    }
                },
                 //滑动开始
                touchStart:function(e) {
                    // 记录初始位置
                    this.startX = e.touches[0].clientX;
                },
                //滑动结束
                touchEnd:function(e) {
                    // 当前滑动的父级元素
                    let parentElement = e.currentTarget.parentElement;
                    // 记录结束位置
                    this.endX = e.changedTouches[0].clientX;
                    // 左滑
                    if(parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
                        this.restSlide();
                        parentElement.dataset.type = 1;
                    }
                    // 右滑
                    if(parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
                        this.restSlide();
                        parentElement.dataset.type = 0;
                    }
                    this.startX = 0;
                    this.endX = 0;
                },
                //判断当前是否有滑块处于滑动状态
                checkSlide:function() {
                    let listItems = document.querySelectorAll('.list-item');
                    for(let i = 0; i < listItems.length; i++) {
                        if(listItems[i].dataset.type == 1) {
                            return true;
                        }
                    }
                    return false;
                },
                //复位滑动状态
                restSlide:function() {
                    let listItems = document.querySelectorAll('.list-item');
                    // 复位
                    for(let i = 0; i < listItems.length; i++) {
                        listItems[i].dataset.type = 0;
                    }
                },
                //删除
                deleteItem:function(e) {
                    // 当前索引
                    let index = e.currentTarget.dataset.index;
                    // 复位
                    this.restSlide();
                    // 删除
                    this.newUser.splice(index, 1);
                }, 

                //    子组件用户列表  
                childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                this.newUser = childValue
                },

                //textarea字数监听    
                monitor:function(){
                    //字数监听
                    var checkStrLengths = function(str, maxLength) {
                        var maxLength = maxLength;
                        var result = 0;
                        if (str && str.length > maxLength) {
                            result = maxLength;
                            $('.wishContent').val($('.wishContent').val().substring(0,maxLength)); 
                        } else {
                            result = str.length; 
                        }
                        return result;
                    }
                    //监听输入
                    $(".wishContent").on('input propertychange', function() {
                        //获取输入内容
                        var userDesc = $(this).val();
                        //判断字数
                        var len;
                        if (userDesc) {
                            len = checkStrLengths(userDesc, 200);
                        } else {
                            len = 0
                        }
                        //显示字数
                        $(".wordsNum").html(len + '/200');
                    });
                },

                  //弹出层,判断条件
                showHint:function(button){
                    function reminder(){
                            $("#iosDialog2").fadeIn(200);
                              $('#confirm').on('click',function(){
                                  var $iosActionsheet = $('#iosActionsheet');
                                  $iosActionsheet.removeClass('weui-actionsheet_toggle');
                                  $("#iosDialog2").fadeOut(200);
                                  $("#iosMask").fadeOut(200);
                              })
                          }
                    var val = $('.wishContent').val();
                    var opinionCheck = button.opinionCheck;
                    var check =  $(".checkedInput:checked[name='checkUserName']");
                    var newUserJson = new Array();
                    check.each(function(){
                        var arr = [];
                        arr = $(this).parent().next().find('p')
                        var arry1 ={};
                        for ( var i = 0; i <arr.length; i++){
                            arry1 =  {"userId":this.value,"userName":arr[i].innerText};
                            newUserJson.push(arry1);
                        }  
                    })
                    if(val == '' && opinionCheck =='NotNull'){
                        this.opinionCheckMsg='请填写审核意见';
                        reminder();
                    } else if(val !== '' && opinionCheck =='Null'){
                        this.opinionCheckMsg='请不要填写审核意见';
                        reminder();
                    }else if(newUserJson == '' && button.assignUserCheck=='NotNull'){
                          this.opinionCheckMsg='请添加用户';
                          reminder();
                    }else if(button.confirmCheck == 'Y'){
                        $("#dialogs").show();
                    }
                   
                },
                succeed:function(){
                    //localhost:8088/succeed#/
                    this.$router.push({path: './succeed'});
                    // window.location.href='../succeed'
                },
                popup:function(){
                    //弹出框1 点击操作按钮
                    $(function() {
                        var $iosActionsheet = $('#iosActionsheet');
                        var $iosMask = $('#iosMask');
                        function hideActionSheet() {
                            $iosActionsheet.removeClass('weui-actionsheet_toggle');
                            $iosMask.fadeOut(200);
                           
                        }
                        $iosMask.on('click', hideActionSheet);
                        $('.iosActionsheetCancel').on('click', hideActionSheet);
                        $('#disagree').on('click', hideActionSheet);
                        $("#showIOSActionSheet").on("click", function() {
                            $iosActionsheet.addClass('weui-actionsheet_toggle');
                            $iosMask.fadeIn(200);
                        });
                        $("#operation").on('click', function() {
                            $("#operationDown").css('display', 'block');
                            $iosActionsheet.addClass('weui-actionsheet_toggle');
                            $iosMask.fadeIn(200);
                        })
                    });
                      //弹出框3 弹出用户新增
                    $(function() {
                    
                        var $iosActionsheet = $('#iosActionsheet1');
                        var $iosMask = $('#iosMask1');
                        function hideActionSheet() {
                            $iosActionsheet.removeClass('weui-actionsheet_toggle');
                            $iosMask.fadeOut(200);
                        }
                        $iosMask.on('click', hideActionSheet);
                        $('#ok').on('click', hideActionSheet);
                        $("#showIOSActionSheet1").on("click", function() {
                            $iosActionsheet.addClass('weui-actionsheet_toggle');
                            $iosMask.fadeIn(200);
                        });
                        $("#add").on('click', function() {
                            $("#operationDown1").css('display', 'block');
                            $iosActionsheet.addClass('weui-actionsheet_toggle');
                            $iosMask.fadeIn(200);
                        })
                    })
                    //弹出框2
                    $(function(){
                        var $iosDialog1 = $('#iosDialog1')
                        var showIOSDialog1 =$("#showIOSDialog1")
                        $('.weui-actionsheet__menu').on('click',function(){
                             $("#dialogs").show()
                        })
                        $('#dialogs').on('click', '.weui-dialog__btn', function(){
                            $(this).parents('#dialogs').fadeOut(200);
                        });
                        $('#showIOSDialog1').on('click', function(){
                            $iosDialog1.fadeIn(200);
                        });
                    }); 
                    
                    


                    
  

    // loading
    $(function(){
        var $loadingToast = $('#loadingToast');
        $('#showLoadingToast').on('click', function(){
            if ($loadingToast.css('display') != 'none') return;

            $loadingToast.fadeIn(100);
            setTimeout(function () {
                $loadingToast.fadeOut(100);
            }, 2000);
        });
    });
                },
            }
        };
</script>
<style scoped>
    .weui-dialog__btn_primary {
        color: #e64340;
    }
    .weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
        content: '\EA06';
        color: #e64340;
    }
    .content {
        background-color: white;
    }
    .select {
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 20px;
        font-size: 14px;
        color: #888888;
    }
    button {
        background: #e64340;
        border: 2px solid rgba(5, 5, 5, 0.08);
        /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5), inset 0 1px 3px 0 rgba(0, 0, 0, 0.5); */
        border-radius: 10px;
        color: #ffffff;
        opacity: 60%;
        font-size: 18px;
        line-height: 25px;
        width: 335px;
        height: 47px;
        margin-top: 30px;
    }
   .weui-cells__title[data-v-eac0a6bc] {
        margin-top: 15px;
        margin-bottom: .3em;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 18px;
        height: 60px;
        line-height: 65px;
        text-align: left;
        color: #4A4A4A;
        font-size: 15px;
    }
    .weui-cells {
        font-size: 14px;
    }
    .lable-p {
        padding:0;
        /* padding-left: 10px; */
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .list-item {
        position: relative;
        height: 30px;
        line-height: 30px;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        margin-bottom: 8px;      
    }
           
    .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
    }
           
    .list-item[data-type="1"] {
        transform: translate3d(-5rem, 0, 0);
    }
           
    .list-box {
        padding: 8px;
        background: #fff;
        display: flex;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: flex-end;
        font-size: 0;
    }
           
       
           
           .list-item .list-content {
               padding: 4px 0 4px 8px;
               position: relative;
               flex: 1;
               flex-direction: column;
               align-items: flex-start;
               justify-content: center;
               overflow: hidden;
           }
           
           
       
           
           .list-item .delete {
               width: 80px;
    height: 37px;
    background: #ff4949;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 37px;
    position: absolute;
    top: 0;
    right: -80px;
           } 
</style>