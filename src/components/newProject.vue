<template>
    <div class="new">
        <div class="page__bd">
            <div class="weui-search-bar" id="searchBar">
                <form class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <i class="weui-icon-search"></i>
                        <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
                        <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
                    </div>
                    <label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
                        <i class="weui-icon-search"></i>
                        <span>搜索</span>
                    </label>
                </form>
                <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
            </div>
            <div  class="weui-cells searchbar-result" id="searchResult" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1); ">
                <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label lables" v-bind:spell="item.userName" v-for='(item,index) in userLists'>
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="userToSelect" v-bind:value="item.userId">
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p style="text-align: left;">{{item.userName}}</p>
                    </div>
                </label>
            </div>
            </div>
        </div>
        <div  class="affirm" style="margin-top:30px" id="ok" @click="childClick">
           确认
        </div>
    </div>
</template>
<script>
export default {
    name: "hi",
    data() {
        return {
            newJson:[{}]
        };
    },
    props:{
        userLists: {
            type:Array,
            required:true
        },
    },
    mounted(){
        this.searchInput();   
    },
    methods:{
        childClick () {
            var check =  $("input:checked[name='userToSelect']");
            var newJson = new Array();
            var newObject = {};
            check.each(function(){
                var arr = [];
                arr = $(this).parent().next().find('p')
                     var arry1 ={};
                    for ( var i = 0; i <arr.length; i++){
                         arry1 =  {"userId":this.value,"userName":arr[i].innerText};
                         newJson.push(arry1);
                         
                     newObject.name = newJson[i]
                    }  
                })
            console.log(newJson);
            // childByValue是在父组件on监听的方法
            // 第二个参数this.childValue是需要传的值
            this.$emit('childByValue', newJson)
        },
       
        //搜索框
        searchInput: function() { 
            var $searchBar = $("#searchBar"),
                $searchResult = $("#searchResult"),
                $searchText = $("#searchText"),
                $searchInput = $("#searchInput"),
                $searchClear = $("#searchClear"),
                $searchCancel = $("#searchCancel");
            function hideSearchResult() {
                $searchResult.hide();
                $searchInput.val("");
            }
            function cancelSearch() {
                hideSearchResult();
                $searchBar.removeClass("weui-search-bar_focusing");
                $searchText.show();
            }
            function searchName() {
                var searchUserName = $("#searchInput").val();
                if (searchUserName == "") {
                    $("#searchResult").show();
                    $(".weui-check__label").show();
                } else {
                    $(".lables").each(function() {
                        var spell = $(this).attr("spell");
                        if (spell.indexOf(searchUserName) != -1) {
                              $("#searchResult").show();
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            }
            $("#searchInput").bind("input propertychange", function() {
                searchName();
            });
            $searchText.on("click", function() {
                $searchBar.addClass("weui-search-bar_focusing");
                $searchInput.focus();
            });
            $searchClear.on("click", function() {
                hideSearchResult();
                $searchInput.focus();
            });
            $searchCancel.on("click", function() {
                cancelSearch();
                $searchInput.blur();
            });
        }
    }
};
</script>
<style scoped>
.weui-btn_primary {
  background-color: red;
  width: 90%;
  margin: 0 auto;
}
.weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
    content: '\EA06';
    color: #E64340;
}
.weui-cells {
    margin-top: 1.17647059em;
    margin-top:0;
    background-color: #fff;
    line-height: 1.47058824;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}
.weui-search-bar__cancel-btn {
    display: none;
    margin-left: 10px;
    line-height: 28px;
    color: #E64340;
    white-space: nowrap;
}
.affirm {
    width: 335px;
    height: 47px;
    line-height: 47px;
    font-size:18px;
    color: white;
    margin: 0 auto;
    background: #E64340;
border: 2px solid rgba(5,5,5,0.08);

border-radius: 10px;
text-align: center;
}
</style>


        