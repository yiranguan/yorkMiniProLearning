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
    forecastWeather:[]
  },

  onLoad(){
    this.getNow();
  },

  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh();
    });
  },

  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: { city: '广州市' },
      success: res => {
        let result = res.data.result;
        this.setNow(result);
        this.setForecastWeather(result);
      },
      complete: () => {
        callback && callback();
      }
    });
  },

  setNow(result) {
    let temp = result.now.temp;
    let weather = result.now.weather;
    this.setData({
        nowTemp: temp + '°',
        nowWeather: weatherMap[weather],
        nowWeatherBackground: '/images/' + weather + '-bg.png'
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather]
    })
  },

  setForecastWeather(result){
    let forecast = result.forecast;

    let date = new Date();
    let hours = date.getHours();

    let forecastWeather = [];

    function id2time(id, hours) {
      if (id * 3 + hours < 24 && id != 0) {
        return (id * 3 + hours) + '时';
      } else if (id * 3 + hours >= 24 && id != 0) {
        return (id * 3 + hours - 24) + '时';
      } else {
        return '现在'
      }
    }

    function makeForecast(time, weather, temp, id) {
      this.time = time;
      this.weatherIconSrc = '/images/' + weather + '-icon.png';
      this.temp = temp;
      this.id = id;
    }

    forecast.forEach(val => {
      let nowWeather = new makeForecast(id2time(val.id, hours), val.weather, val.temp + '°', 'id' + val.id);
      forecastWeather.push(nowWeather);
    });
    this.setData(
      {
        forecastWeather: forecastWeather
      });
  }
});
