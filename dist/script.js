$(function(){
  const today=new Date();
  //const yearmoth=today.getFullYear(); //當年變數  +"-"+(today.getMonth()+1)
  const container=document.querySelector(".container"); //內容
  //const cors = "https://cors-anywhere.herokuapp.com/"; //cors解決方法
  //const endpoint ="https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json"; //政府JSON資料
  const endpoint = "https://jeremychen07.github.io/Tourist-Area/opendata.json" //github

  document.querySelector('h3').innerHTML="<span style='color:red'>資料來源:政府開放平台</span>";  //首頁標題名稱 "+yearmoth+"</style> 年活動，
  const bigindata=document.querySelector("#bigindate"); //開始日期
  const enddate=document.querySelector("#enddate"); //結束日期

  //使用者背景顏色變更
  const inputs=document.querySelector("#base");
  function changeHandler(){
    document.querySelector(":root").style.setProperty("--"+this.name,this.value);
  }
  inputs.addEventListener("change",changeHandler);

  //下拉式選單
  let choose=document.querySelector("#choose");
  let citySelect=document.querySelector("#city");
  let taiwan=["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];
  let selecttext="";
  for(var i=0;i<taiwan.length;i++){
    selecttext+=`<option value=${taiwan[i]}>${taiwan[i]}</option>`;
  }
  citySelect.innerHTML=selecttext;

  // ajax請求
  $.ajax({
    type: "GET",
    url: endpoint, // cors解決 cors+
    dataType: "json",
    success:function(res){
      container.innerHTML="載入完成，請輸入您的地區。";
      choose.addEventListener("click",clickHandler);
      function clickHandler(){
        if(Date.parse(bigindata.value).valueOf()>Date.parse(enddate.value).valueOf())
        return container.innerHTML="結束日期必須大於開始日期!!";
        
        let datacity=citySelect.value;
        let data=(res.XML_Head.Infos.Info).sort(function (a, b) {
          return a.Start < b.Start ? 1 : b.Start <  a.Start ? -1 : 0;
          }); 
         
        data=data.filter(item=>{
          return  Date.parse(bigindata.value).valueOf() <= Date.parse(item.Start).valueOf() //比對日期
                  && Date.parse(enddate.value).valueOf() >= Date.parse(item.End).valueOf() 
                  && item.Region==datacity;
          
        });
        doMethod(data);
      }
    },
    error: function (thrownError) {
      container.innerHTML="載入失敗請稍後再試<br>"+thrownError.responseText;
      }
  });

  //處理資料函式
  function doMethod(data){
    container.innerHTML="";
    const picurl="./sea.jpg"; //picurl預設
      for(let i=0;i<data.length;i++)
      {
          let info=data[i];
          let card = document.createElement("div");  //創建物件
          card.className="card"; // 加入class
          card.innerHTML+=
          `
          <div class='icon'><div class='pic' style='background-image: url(${info.Picture1!=""?info.Picture1:picurl})'/style></div>
          <div class='tag'>${info.Region}</div>
          <div class='bookbtn'><i class='far fa-bookmark'></i></div></div>
          <div class='top'><div class='title'>${info.Name}</div>
          <div class='adr'>${info.Town}-${info.Add}<br><div class='notic'>${info.Cycle}</div></div>
          <div class='time'><i class="fas fa-bell"> 
            <small style="color: #EB5E00"> ${info.Start.substr(0,10)}</small> - <small style="color: #EB5E00">${info.End.substr(0,10)} </small>
          </i></div>
          <div class='text'>說明:<br>${info.Description.substr(0,100)}...</div>
          </div>
          <div class='bluebar'></div>
          `;
          container.appendChild(card);

  }}
    
});
