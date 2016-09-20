//页面 加载的时候   添加
$(function () {
    //设置  前三个 条件
    var putawayId=$("#putawayId").val();
    var channelId=$("#channelId").val();
    var matchId=$("#matchId").val();
    $("#putawayId option").each(function (i, n) {
        if ($(n).val() == "putawayId" +putawayId) {
            $(n).attr("selected", true);
        }
    })

    $("#channelId option").each(function (i, n) {
        if ($(n).val() == "channelId" +channelId) {
            $(n).attr("selected", true);
        }
    })

    $("#matchId option").each(function (i, n) {
        if ($(n).val() == "matchId" +matchId) {
            $(n).attr("selected", true);
        }
    })
    // inithouse();
    sub(1, 1);
});
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}


function gradeChange(){
    var cityId=$("#city").val();
    if(cityId>0){
        var _url = "ajax/areaList.json?cityId="+cityId;
        $.ajax({
            url: _url,
            type: "post",
            error: function() {},
            success: function(data) {
                var str="<option value="+0+">请选择行政区</option>";
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var localname = list[i].localname;
                    var localid = list[i].localid;
                    str+=" <option value="+localid+">"+localname+"</option>";
                }
                $("#area").html(str);
            }
        });
    }else{
        var strs="<option value="+0+">请选择行政区</option>";
        $("#area").html(strs);
    }
}
function gradeChangeShangQuan(){
    var shangquanId=$("#area").val();
    if(shangquanId>0){
        var _url = "ajax/findShangQuanList.json?shangQuanId="+shangquanId;
        $.ajax({
            url: _url,
            type: "post",
            error: function() {},
            success: function(data) {
                var str="<option value="+0+">请选择商圈</option>";
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var localname = list[i].localname;
                    var localid = list[i].localid;
                    str+=" <option value="+localid+">"+localname+"</option>";
                }
                $("#shangquan").html(str);
            }
        });
    }else{
        var strs="<option value="+0+">请选择商圈</option>";
        $("#shangquan").html(strs);
    }
}
//初始
function inithouse(){
    $.ajax({
        type: "POST",
        url: "ajax/initHouseing.json",
        success: function(data){
            getDates(data,1,1);
        }
    });
}
function sub(currpage,state){

    var divD = document.getElementById("divpage");
    divD.style.display = "none";
    $("#dateList").html("");
    $("#page").html("");
    // 渠道
    var channelId=$("#channelId").val();
    //匹配 下拉框
    var matchId=$("#matchId").val();
    // 上架 下拉框
    var putawayId=$("#putawayId").val();
    //城市 下拉框
    var city=$("#city").val();
    //行政区
    var area=$("#area").val();
    if(state==2){
        if(area!="0"){
            area=area.split("_")[1];
        }
    }

    //商圈
    var shangquan=$("#shangquan").val();
    var pageSizeSelect=$("#pageSizeSelect").val();
    //名字 channelId, matchId, putawayId, cityId, areaId, shangQuanId, fenGongSiId
    var areaName = encodeURI($('#areaName').val(),"UTF-8");
    //var areaNames = encodeURI(areaName,"UTF-8");
    var postStr="areaName="+areaName+"&channelId="+channelId+"&matchId="+matchId+"&putawayId="+putawayId+"&cityId="+city+"&areaId="+area+"&shangQuanId="+shangquan+"&currentPage="+currpage+"&pageSize="+pageSizeSelect;
    $.ajax({
        type: "POST",
        url: "ajax/subHouseing.json",
        data:postStr,
        success: function(data){
            getDates(data,currpage,state);
        }
    });
}

function getDates(data,currpage,state){
    console.log("data:"+data);
    console.log("data.data.pageData:"+data.data.pageData);
    var  htmls="";
    var  htsLX="";
    htmls+="<table class='table table-responsive table-bordered table-striped'>";
    htmls+="<thead>";
    htmls+="<tr class='mactive'>";
    htmls+="<th>选择</th>";
    htmls+="<th>序号</th>";
    htmls+="<th>小区名称</th>";
    htmls+="<th>小区地址</th>";
    htmls+="<th>房源数量/间</th>";
    htmls+="<th>同步数量</th>";
    htmls+="<th>行政区</th>";
    htmls+="<th>小区状态</th>";
    htmls+="<th>上架时间</th>";
    htmls+="<th>操作</th>";
    htmls+="</tr>";
    htmls+="</thead>";
    htmls+="<tbody>";
    if(data.data==null){
        htmls+="</tbody></table>";
        $("#dateList").html(htmls);
        $("#page").html("");
        $("#totleData").html(htsLX);
    }else{
        var divD = document.getElementById("divpage");
        divD.style.display = "block";
        var list = data.data.pageData;
        for (var i = 0; i < list.length; i++) {
            var indexs=i+1;
            if(list[i].falg==0){
                htmls+=" <th><input name='Fruit' type='checkbox' value='"+list[i].qkId+"' />  </th> 	<th>"+indexs+"</th>";
                //htmls+="<th><input type='checkbox' value='"+list[i].qkId+"'><label for='SelectAll'></label></th><th scope='row'>"+indexs+"</th>";
            }else{
                htmls+=" <th><input name='Fruit' type='checkbox' value='"+list[i].qkId+"' />  </th> 	<th>"+indexs+"</th>";
                //htmls+="<th><input type='checkbox' value='"+list[i].qkId+"'><label for='SelectAll'></label></th><th scope='row'>"+indexs+"</th>";
            }
            htmls+="<td>"+list[i].name+"</td> ";
            htmls+="<td>"+list[i].valliageName+"</td> ";
            htmls+="<td>"+list[i].dvdSumCount+"</td> ";
            if(list[i].dvdSynCount!=null&&list[i].dvdSynCount!=''){
                htmls+="<td>"+list[i].dvdSynCount+"</td> ";
            }else{
                htmls+="<td>0</td> ";
            }
            htmls+="<td>"+list[i].localName+"</td> ";
            if(state==1){
                if(list[i].falg==0){
                    htmls+="<td>已上架 </td>";
                    htsLX="	<button onclick='removeXia(1)' class='btn  btn-orange no-margin lft10' >批量下架 </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>合计:"+list[i].sumVilageId+"小区; "+list[i].sumRoom+"间房</span> ";
                }else{
                    htmls+="<td>未上架 </td>";
                    htsLX="	<button onclick='removeXia(2)' class='btn  btn-orange no-margin lft10'>批量上架 </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>合计:"+list[i].sumVilageId+"小区; "+list[i].sumRoom+"间房</span> ";
                }
            }else{
                htmls+="<td> </td>";
                htsLX="	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>合计:"+list[i].sumVilageId+"小区; "+list[i].sumRoom+"间房</span> ";
            }
            if(list[i].dvdCrateTime!=null&&list[i].dvdCrateTime!=''){
                htmls+="<td>"+list[i].dvdCrateTime+"</td> ";
            }else{
                htmls+="<td> </td> ";
            }
            if(state==1){
                if(list[i].falg==0){
                    htmls+="<td> <a href='javascript:solelyDel("+list[i].qkId+",1)'>下架</a> &nbsp;&nbsp;<a href='javascript:editHouseing("+list[i].qkId+",1)'>编辑房源</a></td>  ";
                    //htmls+="<td> <a href='javascript:solelyDel("+list[i].qkId+",1)'>下架</a> &nbsp;&nbsp;<a href='javascript:editHouseing("+list[i].qkId+",1)' data-toggle='modal' data-target='#myModal4'>编辑房源</a></td>  ";
                }else{
                    //htmls+="<td> <a href='javascript:solelyDel("+list[i].qkId+",2)'>上架</a> &nbsp;&nbsp;<a href='javascript:editHouseing("+list[i].qkId+",2)' data-toggle='modal' data-target='#myModal4'>编辑房源</a></td>  ";
                    htmls+="<td> <a href='javascript:solelyDel("+list[i].qkId+",2)'>上架</a> &nbsp;&nbsp;<a href='javascript:editHouseing("+list[i].qkId+",2)'>编辑房源</a></td>  ";
                }
                htmls+="</tr> ";
            }else{
                htmls+="<td></td></tr> ";
            }

        }
        if(state==1){
            var indexes = data.data.pageInfo.currentPage;
            var sumLength=data.data.pageInfo.totalPage;
            var pagehtmls="当前第"+indexes+"页，共"+sumLength+"页（共"+data.data.pageInfo.totalCount+"条）";
            pagehtmls+="<nav class='inlineblock'><ul class='pagination'><li><a href='javascript:sub(1,1)' aria-label='Previous'><span aria-hidden='true'>首页</span></a></li>";
            //pagehtmls+="<a href='javascript:sub(1,1)'>首页</a>";
            var bol=0;
            var pagebol=true;
            for (var j = currpage; j <=sumLength; j++) {
                bol=bol+1;
                if(currpage==1){
                    if(bol<=5){
                        if(currpage==j){
                            //pagehtmls+="<a  href='javascript:sub("+j+",1)' style='background-color: red;'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",1)'>"+j+"</a></li>";
                        }else{
                            //pagehtmls+="<a  href='javascript:sub("+j+",1)'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",1)'>"+j+"</a></li>";
                        }
                    }
                }else{
                    if(pagebol==true){
                        //pagehtmls+="<a  href='javascript:sub("+(j-1)+",1)'>"+(j-1)+"</a>";
                        pagehtmls+="<li><a  href='javascript:sub("+(j-1)+",1)'>"+(j-1)+"</a></li>";
                        pagebol=false;
                    }
                    if(bol<=4){
                        if(currpage==j){
                            //pagehtmls+="<a  href='javascript:sub("+j+",1)' style='background-color: red;'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",1)'>"+j+"</a></li>";
                        }else{
                            //pagehtmls+="<a  href='javascript:sub("+j+",1)'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",1)'>"+j+"</a></li>";
                        }
                    }

                }


            }
            //pagehtmls+=" <a href='javascript:sub("+sumLength+",1)'>尾页</a>";
            pagehtmls+=" <li><a href='javascript:sub("+sumLength+",1)' aria-label='Next'><span aria-hidden='true'>尾页</span></a></li></ul></nav>";

        }else{
            var indexes = data.data.pageInfo.currentPage;
            var sumLength=data.data.pageInfo.totalPage;
            //var pagehtmls="<a href='javascript:sub(1,2)'>首页</a>";
            var pagehtmls="当前第"+indexes+"页，共"+sumLength+"页（共"+data.data.pageInfo.totalCount+"条）";
            pagehtmls+="<nav class='inlineblock'><ul class='pagination'><li><a href='javascript:sub(1,2)' aria-label='Previous'><span aria-hidden='true'>首页</span></a></li>";
            var bol=0;
            var pagebol=true;
            for (var j = currpage; j <=sumLength; j++) {
                bol=bol+1;
                if(currpage==1){
                    if(bol<=5){
                        if(currpage==j){
                            //pagehtmls+="<a  href='javascript:sub("+j+",2)' style='background-color: red;'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",2)'>"+j+"</a></li>";
                        }else{
                            //pagehtmls+="<a  href='javascript:sub("+j+",2)'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",2)'>"+j+"</a></li>";
                        }
                    }
                }else{
                    if(pagebol==true){
                        //pagehtmls+="<a  href='javascript:sub("+(j-1)+",2)'>"+(j-1)+"</a>";
                        pagehtmls+="<li> <a href='javascript:sub("+(j-1)+",2)'>"+(j-1)+"</a></li>";
                        pagebol=false;
                    }
                    if(bol<=4){
                        if(currpage==j){
                            //pagehtmls+="<a  href='javascript:sub("+j+",2)' style='background-color: red;'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",2)' style='background-color: red;'>"+j+"</a></li>";
                        }else{
                            //pagehtmls+="<a  href='javascript:sub("+j+",2)'>"+j+"</a>";
                            pagehtmls+="<li><a href='javascript:sub("+j+",2)'>"+j+"</a></li>";
                        }
                    }

                }


            }
            //pagehtmls+=" <a href='javascript:sub("+sumLength+",2)'>尾页</a>";
            pagehtmls+=" <li><a href='javascript:sub("+sumLength+",2)' aria-label='Next'><span aria-hidden='true'>尾页</span></a></li></ul></nav>";

        }

        htmls+="</tbody></table>"
        $("#totleData").html(htsLX);
        $("#dateList").html(htmls);
        $("#page").html(pagehtmls);
    }
}

//批量下架  bolenKey=1 下架   上架
function removeXia(bolenKey){
    var results = document.getElementsByName("Fruit");
    var keys="";
    var indexs=0;
    var bln;
    if(bolenKey==1){
        bln = window.confirm("确定批量下架小区吗?");
    }else{
        bln = window.confirm("确定批量上架小区吗?");
    }
    if(bln==true){
        for(var i = 0; i < results.length; i++){
            if(results[i].checked){
                indexs++;
                keys+=","+results[i].value;
            }
        }
        if(indexs>0){
            if(keys!=""){
                keys=keys.substring(1,keys.length);
            }
            var  postStr="strKeys="+keys+"&billKey="+bolenKey;
            $.ajax({
                type: "POST",
                url: "ajax/delHouseing.json",
                data:postStr,
                success: function(data){
                    console.log("data.message:"+data.message);
                    alert(data.message);
                    sub(1,1);
                }
            });
        }else{
            if(bolenKey==1){
                alert("请选择要下架的小区");
            }else{
                alert("请选择要上架的小区");
            }
        }
    }

}
//单独下架
function solelyDel(keys,bolenKey){
    if(bolenKey==1){
        var bln = window.confirm("确定下架小区吗?");
        if(bln==true){
            var  postStr="strKeys="+keys+"&billKey="+bolenKey;
            $.ajax({
                type: "POST",
                url: "ajax/delHouseing.json",
                data:postStr,
                success: function(data){
                    alert(data.message);
                    sub(1,1);
                }
            });
        }
    }else{
        var bln = window.confirm("确定上架小区吗?");
        if(bln==true){
            var  postStr="strKeys="+keys+"&billKey="+bolenKey;
            $.ajax({
                type: "POST",
                url: "ajax/delHouseing.json",
                data:postStr,
                success: function(data){
                    alert(data.message);
                    sub(1,1);
                }
            });

        }
    }
}
//编辑房源  bolenKey=1  下架的编辑房源  2 上架的 编辑房源
function editHouseing(qkId,bolenKey){
    var postStr="?billKey="+bolenKey+"&qkId="+qkId
    location.href="room/updateHouseing.json"+postStr;
}
function putChange(){
    $("#areaName").val("");
    $("#city").find("option[value='0']").attr("selected",true);
    var strs="<option value="+0+">请选择行政区</option>";
    $("#area").html(strs);
    var ss="<option value="+0+">请选择商圈</option>";
    $("#shangquan").html(ss);
    var  putawayId=$("#matchId").val();
    var  oSelect=document.getElementById("putawayId");
    if(putawayId==1){
        oSelect.style.visibility="visible";
        $("#city").bind("change", function(){
            gradeChange();
        })
        $("#area").bind("change", function(){
            gradeChangeShangQuan();
        })
        sub(1,1);
    }else{
        oSelect.style.visibility="hidden";
        $("#city").bind("change", function(){
            gradeChangeNo();
        })
        $("#area").bind("change", function(){
            gradeChangeShangQuanNo();
        })
        sub(1,2);
    }


}
function gradeChangeNo(){
    var cityId=$("#city").val();
    if(cityId>0){
        var _url = "ajax/areaListNo.json?cityId="+cityId;
        $.ajax({
            url: _url,
            type: "post",
            error: function() {},
            success: function(data) {
                var str="<option value="+0+">请选择行政区</option>";
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var localname = list[i].prcName;
                    var localid = list[i].prcCode;
                    var prcId = list[i].prcId;
                    str+=" <option value="+localid+"_"+prcId+">"+localname+"</option>";
                }
                $("#area").html(str);
            }
        });
    }else{
        var strs="<option value="+0+">请选择行政区</option>";
        $("#area").html(strs);
    }
}
function gradeChangeShangQuanNo(){
    var shangquanId=$("#area").val();
    if(shangquanId!="0"){
        var _url = "ajax/findShangQuanListNo.json?code="+shangquanId;
        $.ajax({
            url: _url,
            type: "post",
            error: function() {},
            success: function(data) {
                var str="<option value="+0+">请选择商圈</option>";
                var list =data.data;
                for (var i = 0; i < list.length; i++) {
                    var localname = list[i].ceaName;
                    var localid = list[i].ceaId;
                    str+=" <option value="+localid+">"+localname+"</option>";
                }
                $("#shangquan").html(str);
            }
        });
    }else{
        var strs="<option value="+0+">请选择商圈</option>";
        $("#shangquan").html(strs);
    }
}
function checkName(){
    //匹配 下拉框
    var matchId=$("#matchId").val();
    sub(1,matchId);
}
function shangJia(){
    $("#areaName").val("");
    sub(1,1);
}
