
/*
* 1.获取默认城市的天气信息
* 2.获取所有城市的信息
* 3.点击每个城市可以获取当前城市的天气信息
* 4.搜索城市，显示搜索城市的天气信息
* */
// $(function(){
    let weather;
    let city;
    $.ajax({
        url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
        dataType:'jsonp',
        success:function(obj){
            weather = obj.data;
            console.log(weather);
            updata(weather)
        }
    });
    $.ajax({
        url:'https://www.toutiao.com/stream/widget/local_weather/city/',
        dataType:'jsonp',
        success:function(obj){
            city = obj.data;
            console.log(obj);
            upcity(city);
        }
    });
    // 渲染天气数据
    function updata(weather){
        $('.city').html(weather.city);
        $('.degree').html(weather.weather.current_temperature +'°');
        $('.weather').html(weather.weather.current_condition);
        $('.h-number').html(weather.weather.tomorrow_aqi + '%');
        $('.today .t-top-r span').eq(0).html(weather.weather.dat_high_temperature);
        $('.today .t-top-r span').eq(2).html(weather.weather.dat_low_temperature + '°');
        $('.today .t-bottom-l').html(weather.weather.dat_condition);
        $('.today .t-bottom-r').css('backgroundImage','url(img/'+weather.weather.dat_weather_icon_id+'.png)');
        $('.tomorrow .t-top-r span').eq(0).html(weather.weather.tomorrow_high_temperature);
        $('.tomorrow .t-top-r span').eq(2).html(weather.weather.tomorrow_low_temperature + '°');
        $('.tomorrow .t-bottom-l').html(weather.weather.tomorrow_condition);
        $('.tomorrow .t-bottom-r').css('backgroundImage','url(img/'+weather.weather.tomorrow_weather_icon_id+'.png)');
        console.log(weather.weather.hourly_forecast);
        //渲染24小时

        $(weather.weather.hourly_forecast).each(function(index,val){
            // console.log(val);
            let str = `
                <li class='d-list'>
					<p class='time'>${val.hour}:00</p>
					<p class='pic' style="background-image:url(img/${val.weather_icon_id}.png)"></p>
					<p class='temp'>${val.temperature}°</p>
				</li>
            `;
            $('.detailed').append(str);
        })
        //渲染近期天气
        console.log(weather.weather.forecast_list)
        $(weather.weather.forecast_list).each(function(index,val){
            let str = `
                <li>
                    <p class ='timeH'>
                        <span>${val.date.substr(5,2)}</span>
                        <span>/</span>
                        <span>${val.date.substr(8,2)}</span>
                    </p>
                    <p class='weatherH'>${val.condition}</p>
                    <p class='picH' style="background-image:url(img/${val.weather_icon_id}.png)"></p>
                    <p class="temperatureH">${val.high_temperature}</p>
                    <p class="temperatureL">${val.low_temperature}°</p>
                    <p class='windL'>${val.wind_direction}</p>
                    <p class='wind-num'>${val.wind_level}级</p>
                </li>
            `;
            $('.r-box > ul').append(str);
        })
    }

    //渲染城市数据
    function upcity(city){
        console.log(city)
    }




    //点击城市出现城市列表
    $('.city').click(function(){
        $('.city-option').addClass('show');
    });
    //点击取消关闭城市列表
    $('.s-right').click(function(){
        $('.city-option').removeClass('show');
    });



// })