
//请求北京数据
var weather;
$.ajax({
	url:'https://www.toutiao.com/stream/widget/local_weather/data/?city',
	dataType:'jsonp',
	type:'get',
	success:function(obj){
		//console.log(obj);
		weather = obj.data.weather;
		console.log(weather);
	}	
});
//请求城市数据
var city;
$.ajax({
	url:'https://www.toutiao.com/stream/widget/local_weather/city/',
	dataType:'jsonp',
	type:'get',
	success:function(o){
		//console.log(o);
		city = o.data;
		console.log(city);
		renderCity(city); 
	}	
})

function renderCity(city){
	//渲染省份
		for(var i in city){
			var oCity = document.querySelector('.city-list'),
				ocityUl = document.createElement('ul');		
			//创建省份
			var province='';	
			//把每个省份写入p标签
			province +='<p>'+i+'</p>';			
			//console.log(city[i]);
			oCity.innerHTML += province;			
			//console.log(i);
			//二次遍历城市
			for(var j in city[i]){
			var	oCityList = document.querySelector('.city-list');
			//console.log(city[j]);
			//创建城市并且写入li中，添加到ul中
			
			var cityName = '';		
			cityName +='<li>'+j+'</li>';			
			ocityUl.innerHTML += cityName;
			
			}
			//最后把ul添加到父元素下
			oCity.appendChild(ocityUl);
		}
}

function change(){
	console.log(weather);
	var oCity = document.querySelector('.city'),
		oDeg = document.querySelector('.degree'),
		oWeather = document.querySelector('.weather'),
		aTodTe = document.querySelectorAll('.today .t-top span'),
		oTodWe = document.querySelector('.today .t-bottom-l'),
		aTomTe = document.querySelectorAll('.tomorrow .t-top span'),
		oTomWe = document.querySelector('.tomorrow .t-bottom-l'),
		oTodImg = document.querySelector('.today .t-bottom-r'),
		oTomImg = document.querySelector('.tomorrow .t-bottom-r'),
        oHistoryList = document.querySelector('.history-list');
	
		//城市名称
		oCity.innerHTML = weather.city_name+"市" +'<span>[切换城市]</span>';
		//当前温度
		oDeg.innerHTML = weather.current_temperature + '°';
		//当前天气情况
		oWeather.innerHTML = weather.current_condition;
		//今天最高气温
		aTodTe[0].innerHTML = weather.dat_high_temperature;	
		//今天最低气温
		aTodTe[2].innerHTML = weather.dat_low_temperature + '°';
		//今天天气情况
		oTodWe.innerHTML = weather.dat_condition;
		//今天pic
		oTodImg.style = `background-image:url(img/${weather.dat_weather_icon_id}.png)`;
				
		//明天最高气温
		aTomTe[0].innerHTML = weather.tomorrow_high_temperature;
		//明天最低气温
		aTomTe[2].innerHTML = weather.tomorrow_low_temperature + '°';
		//明天天气情况
		oTomWe.innerHTML = weather.tomorrow_condition;
		//明天pic
		oTomImg.style = `background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
		
		//有的城市没有最近天气信息，如果没有输出提示信息
		if(weather.hourly_forecast == undefined){
			var oUl = document.querySelector('.detailed');
			var oUl1 = document.querySelector('.r-box ul');
			oUl.innerHTML = '<p>抱歉，没有当前城市的24小时天气信息，请换个城市试试吧</p>';
			oUl1.innerHTML = '<p>抱歉，没有当前城市的近期天气信息，请换个城市试试吧</p>';
		}else{
			//遍历24小时天气
			for( var i in weather.hourly_forecast){
			var hours = document.querySelector('.hours'),
				oUl = document.querySelector('.detailed');
				
			var str = '<li>';
				str += '<p class = "time">'+weather.hourly_forecast[i].hour +':00</p>';
				str += '<p class = "pic" style="background-image:url(img/'+ weather.hourly_forecast[i].weather_icon_id +'.png)"></p>';
				str += '<p class = "temp">'+weather.hourly_forecast[i].temperature + '°</p>';						
				str += '</li>';
				oUl.innerHTML += str;				
			}
			
			//遍历近期天气
		for( var i in weather.forecast_list){
			var oUl = document.querySelector('.r-box ul'),
				oLi = document.querySelector('.r-box ul li');				//创建li

				var str = '';
					str += '<li>';		                                   //2018-04-01
					str	+= '<p class="timeH">'+weather.forecast_list[i].date.slice(5,7) +'/'+weather.forecast_list[i].date.slice(8)+'</p>';
					str	+= '<p class="weatherH">'+weather.forecast_list[i].condition+'</p>';
					str	+= '<p class="temperatureH">'+weather.forecast_list[i].high_temperature + '°'+'</p>';
					str	+= '<p class="temperatureL">'+weather.forecast_list[i].low_temperature + '°'+'</p>';
					str	+= '<p class="picL" style="background-image: url(img/' + weather.forecast_list[i].weather_icon_id + '.png)"></p>';
					str	+= '<p class="windL">'+weather.forecast_list[i].wind_direction+'</p>';
					str	+= '<p class="wind-num">'+weather.forecast_list[i].wind_level + '级'+'</p>';
					str +='</li>';
				oUl.innerHTML += str ;		
			}										
		}						
}

function aJax(str){

	var oUrl = `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
	$.ajax({
	url:oUrl,
	dataType:'jsonp',
	type:'get',
	success:function(obj){	
		weather = obj.data.weather;
		
		//调用函数之前先把上一次渲染的结果去掉
		var oUl = document.querySelector('.detailed');
		var oUl1 = document.querySelector('.r-box ul');
		oUl.innerHTML = '';
		oUl1.innerHTML ='';
		//调用改变函数
		change();
//		oCity.innerHTML = str + '市';
		oCityOpt = document.querySelector('.city-option');
		oCityOpt.className = 'city-option';
		//再次选择城市
		again();
		}		
	});
		
}
	
function again(){
	var aLi = document.querySelectorAll('.city-list ul li');
	//console.log(aLi);
	for(var j = 0;j<aLi.length;j++){
//		
		//aLi[j].index = j;
		aLi[j].onclick = function(){
			//var index = this.index;
			
			var liCon = this.innerHTML;
			//console.log(index);
			//console.log(this);
			aJax(liCon);
			addHistory(liCon);

		}
	}
}
function addHistory(liCon){
    //点击对应的城市，添加的搜索记录中去
    let oHistoryList = document.querySelector('.history-list'),
        aHistoryLi = document.querySelectorAll('.history-list li'),
        arr = [];
    for(let i=0;i<aHistoryLi.length;i++){
        arr.push( aHistoryLi[i].innerHTML );
    }

    let bool=arr.includes(liCon);
    console.log(bool)
    if( !bool ){
        setTimeout(function(){
            oHistoryList.innerHTML += `<li>${liCon}</li>`;
        },1000)
    }
}
function search(){
	var oCity = document.getElementsByClassName('city')[0],
				oCityOpt = document.getElementsByClassName('city-option')[0],
				oBack = document.getElementsByClassName('s-right')[0],
				oInp = document.querySelector('.city-box .s-left input'),
				oBtn = document.querySelector('.city-box .s-right'),
				oDelete = document.querySelector('.city-list .del'),
				oHistoryList = document.querySelector('.history-list');

				oDelete.onclick = function(){
					oHistoryList.innerHTML = '';
				}
				oCity.onclick = function(){
					//alert(oCityOpt.className);
					if(oCityOpt.className === 'city-option'){
						oCityOpt.className += ' show';
					}					
				}
					oBack.onclick = function(){
							oCityOpt.className = 'city-option';
				}
				oInp.onclick = function(){
					oBtn.innerHTML = '搜索';
				}
				oBtn.onclick = function(){
					if(oBtn.innerHTML == '取消'){
						oCityOpt.className = 'city-option';
					}else{
						//用来保存用户输入框输入的城市
						var oTxt = oInp.value;

                        //二次遍历得到所有城市名
                        for(i in city){
							for(j in city[i]){
								//判断用户输入的城市名是否与遍历的城市名一样
								if(oTxt == j || oTxt == j+'市' ){
									aJax(j);

									oInp.value = '';
                                    oHistoryList.innerHTML += `<li>${oTxt}</li>`;
                                    addHistory(oTxt);
									return;									
								}else{
									oBtn.innerHTML = '取消';
									oInp.value = '';
								}
							}
						}
						alert("没有该城市！");
					}
				}
}
window.onload = function(){
	change();
	again();
	search();
}

