$(function(){
  var today=new Date();
  const yearmoth=today.getFullYear()+"-"+(today.getMonth()+1); //當年當月變數
  document.querySelector('h3').innerHTML=yearmoth+"月活動，資料來源:政府開放平台";
  let container=document.querySelector(".container");
  const cors = "https://cors-anywhere.herokuapp.com/"; //cors解決方法
  const endpoint = "https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json"; //政府JSON資料
  
  $.ajax({
    type: "GET",
    url: cors+endpoint,
    dataType: "json",
    success:function(res){
      //console.log(res);
      //大到小開始日期排序
      tododata = (res.XML_Head.Infos.Info).sort(function (a, b) {
      return a.Start < b.Start ? 1 : -1;
      }); 

      tododata=(filterByData(tododata,yearmoth)); //篩選日期為當月
      //console.log(tododata);
      //var data=(res);
      DoMethod(tododata);
    },
    error: function (thrownError) {
      container.innerHTML=(thrownError.responseText);
      }
  });

  //篩選日期函式
  function filterByData(aim, Year) {
  return aim.filter(function(item){return item.Start.substr(0,7) == Year})
  }
  //處理資料函式
  function DoMethod(data){
      container.innerHTML="";
    var picurl="./sea.jpg"; //picurl預設
      for(let i=0;i<99;i++)
      {
          let info=data[i];
          const card = document.createElement("div");  //創建物件
          card.className="card"; // 加入class
          card.innerHTML+=
            "<div class='icon'><div class='pic' style='background-image: url("+(info.Picture1!=""?info.Picture1:picurl)+")'/style></div>"
            +"<div class='tag'>"+info.Region+"</div>"
            +"<div class='bookbtn'><i class='far fa-bookmark'></i></div></div>"
            +"<div class='top'><div class='title'>"+(info.Name.substr(18,1)!=""?info.Name.substr(0,18)+"...":info.Name.substr(0,18))+"</div>"
            +"<div class='adr'>"+info.Town+"-"+info.Add+"<div class='notic'>"+info.Cycle+"</div></div>"
            +"<div class='time'>日期:"+info.Start.substr(0,10)+'-'+info.End.substr(0,10)+"</div>"
            +"<div class='text'>說明:<br>"+info.Description.substr(0,100)+"...</div>"
            +"<div class='bluebar'></div></div>"
            ;
          container.appendChild(card);
  }}
    
});
