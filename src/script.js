const cors = "https://cors-anywhere.herokuapp.com/";
const endpoint = "https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json";
$.ajax({
  type: "GET",
  url: cors+endpoint,
  dataType: "json",
  success:function(res){
    //console.log(res);
    tododata = (res.XML_Head.Infos.Info).sort(function (a, b) {
    return a.Start < b.Start ? 1 : -1;
    }); //大到小
    tododata=(filterByData(tododata,'2020-12')); //尋找日期為12月
    //console.log(tododata);
    //var data=(res);
    info(tododata);
  },
  error: function (thrownError) {
    let contain=document.querySelector(".container");
    contain.innerHTML=(thrownError.responseText);
    }
});

function filterByData(aim, Year) {
return aim.filter(function(item){return item.Start.substr(0,7) == Year})
}

function info(data){
  let contain=document.querySelector(".container");
    //contain.innerHTML="等待中";//先把畫面清空
  var picurl="https://i.imgur.com/Yxx3muB.jpg";
    for(let i=0;i<50;i++)
    {
        let product=data[i];
        const card = document.createElement("div");  //創建物件
        card.className="card"; // 加入class
        card.innerHTML+=
          "<div class='icon'><div class='pic' style='background-image: url("+(product.Picture1!=""?product.Picture1:picurl)+")'/style></div>"
          +"<div class='tag'>"+product.Region+"</div>"
          +"<div class='bookbtn'><i class='far fa-bookmark'></i></div></div>"
          +"<div class='top'><div class='title'>"+product.Name.substr(0,18)+"...</div>"
          +"<div class='adr'>"+product.Town+"-"+product.Add+"<div class='notic'>"+product.Cycle+"</div></div>"
          +"<div class='time'>日期:"+product.Start.substr(0,10)+'-'+product.End.substr(0,10)+"</div>"
          +"<div class='text'>說明:<br>"+product.Description.substr(0,60)+"...</div>"
           +"<div class='bluebar'></div></div>"
          ;
        contain.appendChild(card);
}}


  
