const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data:{
    nowTemp:14,
    nowWeather:'多云',
    nowWeatherBackground:'',
    tryArray:[
      { a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }
    ],
    forecastWeather:[]
  },
  onLoad(){
    this.getNow();
  },
  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh();
      console.log("I'm the callback func, And I was running");
    });
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: { city: '广州市' },
      success: res => {
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        let forecast = result.forecast;

        let date = new Date();
        let hours = date.getHours();

        let forecastWeather = [];

        function id2time(id, hours) {
          if (id * 3 + hours < 24) {
            return (id * 3 + hours) + '时';
          } else {
            return (id * 3 + hours - 24) + '时';
          }
        }

        function makeForecast(time, weather, temp, id){
          this.time = time;
          this.weatherIconSrc = '/images/' + weather + '-icon.png';
          this.temp = temp;
          this.id = id;
        }

        forecast.forEach(val => {
          let nowWeather = new makeForecast(id2time(val.id, hours), val.weather, val.temp + '°', 'id' + val.id);
          forecastWeather.push(nowWeather);
        });
        /* 失败部分代码等待高人解读失败原因
        // function nowWeather(time, weather, temp) {
        //   this.time = time;
        //   this.weather = weather;
        //   this.temp = temp;
        // }

        // for (let i=0; i<forecast.length; i++) {
        //   if(i=0){
        //     let displayWeather = new nowWeather('现在', weatherMap[forecast[i].weather], forecast[i].temp + '°');
        //     forecastWeather.push(displayWeather);
        //   } else {
        //     let nowHours = 0;
        //     let nowTime = hours + (forecast[i].id * 3);
        //     if (nowTime<24){
        //       nowHours = nowTime;
        //     }else{
        //       nowHours = nowTime - 24;
        //     }
        //     let displayWeather = new nowWeather(nowHours, weatherMap[forecast[i].weather], forecast[i].temp + '°');
        //     forecastWeather.push(displayWeather);
        //   }
        // }
        */
        console.log(temp, weather);
        console.log(forecast);

        console.log(forecastWeather);
        console.log(typeof (forecastWeather[0]));
        console.log(forecastWeather[0].weather);

        this.setData(
          {
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png',
          forecastWeather:forecastWeather
          },
          () => {console.log("I'm the setData() func, And now Data has been reset yet.");}
        );
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather]
        })
      },
      complete: () => {
        callback && callback();
      }
    });
  }
});
