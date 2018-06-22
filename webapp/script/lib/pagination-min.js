var PAGE_SIZE = 5;
/*
 *显示分页
 *total 总条数
 *pagesize 每页显示的条数
 *currentpage 当前页数
 */
function showPages (total,from,pagesize,callbackName,pageContainerId) {
    var pagecount=0;//总页数
    var blocksize=5;//连续显示的块数
    var pagestr="";
    var currentpage = from / pagesize + 1;
    //计算出总页数
    if(total%pagesize==0){
        pagecount=parseInt(total/pagesize);
    }else{
        pagecount=parseInt(total/pagesize)+1;
    }
    if(pagecount>1&&currentpage!=0&&currentpage<=pagecount){
        //判断当前页是第一页的情况
        if(currentpage!=1){
            pagestr="<div class='page_shang' onclick='pageClick("+pagesize+","+(currentpage-1)+","+callbackName+")'>上一页</div>";
        }
        pagestr+="<ol>";

        if(pagecount<blocksize+1)
        {
            for (var i = 1; i < pagecount+1; i++) {
                if(currentpage==i)
                {
                    pagestr+="<li class='currentpage' onclick='pageClick("+pagesize+","+currentpage+","+callbackName+")'>"+i+"</li>";
                }else
                {
                    pagestr+="<li onclick='pageClick("+pagesize+","+i+","+callbackName+")'>"+i+"</li>";
                }
            };
        }
        else if(pagecount==blocksize+1)
        {
        	for (var i = 1; i < blocksize+1; i++) {
                if(currentpage==i)
                {
                    pagestr+="<li class='currentpage' onclick='pageClick("+pagesize+","+currentpage+","+callbackName+")'>"+i+"</li>";
                }else
                {
                    pagestr+="<li onclick='pageClick("+pagesize+","+i+","+callbackName+")'>"+i+"</li>";
                }
            };
            //pagestr+="<li style='border:0 none;''>.....</li>";
            pagestr+="<li onclick='pageClick("+pagesize+","+pagecount+","+callbackName+")'>"+pagecount+"</li>";
        }
        else
        {
            if(currentpage<blocksize){
                for (var i = 1; i < blocksize+1; i++) {
                    if(currentpage==i)
                    {
                        pagestr+="<li class='currentpage' onclick='pageClick("+pagesize+","+currentpage+","+callbackName+")'>"+i+"</li>";
                    }else
                    {
                        pagestr+="<li onclick='pageClick("+pagesize+","+i+","+callbackName+")'>"+i+"</li>";
                    }
                };
                pagestr+="<li style='border:0 none;''>..</li>";
                pagestr+="<li onclick='pageClick("+pagesize+","+pagecount+","+callbackName+")'>"+pagecount+"</li>";
            }else if(currentpage<=pagecount-blocksize+1){
                pagestr+="<li onclick='pageClick("+pagesize+",1,"+callbackName+")'>1</li>";
                pagestr+="<li style='border:0 none;''>..</li>";
                for (var i = currentpage-1; i <currentpage+2; i++) {
                    if(currentpage==i)
                    {
                        pagestr+="<li class='currentpage' onclick='pageClick("+pagesize+","+currentpage+","+callbackName+")'>"+i+"</li>";
                    }else
                    {
                        pagestr+="<li onclick='pageClick("+pagesize+","+i+","+callbackName+")'>"+i+"</li>";
                    }
                };
                pagestr+="<li style='border:0 none;''>..</li>";
                pagestr+="<li onclick='pageClick("+pagesize+","+pagecount+","+callbackName+")'>"+pagecount+"</li>";
            }else{
                pagestr+="<li onclick='pageClick("+pagesize+",1,"+callbackName+")'>1</li>";
                pagestr+="<li style='border:0 none;''>..</li>";
                for (var i = pagecount-blocksize+1; i < pagecount+1; i++) {
                    if(currentpage==i)
                    {
                        pagestr+="<li class='currentpage' onclick='pageClick("+pagesize+","+currentpage+","+callbackName+")'>"+i+"</li>";
                    }else
                    {
                        pagestr+="<li onclick='pageClick("+pagesize+","+i+","+callbackName+")'>"+i+"</li>";
                    }
                };
            }
        }
        pagestr+="</ol>";
        //判断当前页是最后一页的情况
        if(currentpage!=pagecount){
            pagestr=pagestr+"<div class='page_xia' onclick='pageClick("+pagesize+","+(currentpage+1)+","+callbackName+")'>下一页</div>";
        }
    }
    $("#"+pageContainerId+"").html(pagestr);
}

/*
 *分页点击事件
 */
function pageClick (pagesize,currentpage,callback) {
    var from,max;//定义起始记录
    from=pagesize*(currentpage-1);
    max = pagesize;
    callback && callback(from,max);
    
}
//定位当前页
function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
	   var date = new Date();
	   date.setTime(date.getTime() - 10000);
	   document.cookie = name + "=a; expires=" + date.toGMTString();
	}