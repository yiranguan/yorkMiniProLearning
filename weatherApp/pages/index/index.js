const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

const mapSDK = new QQMapWX({
  key: 'ZVOBZ-SAXWJ-NVZFA-K2F4X-DXOE3-PGF3H'
});

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
    forecastWeather:[],
    todayDate:'',
    todayTemp:'',
    city:'广州市',
    locationTipsText:'点击获取当前位置'
  },

  onLoad(){
    wx.getSetting();
    this.getNow();
  },

  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh();
    });
  },

  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list?city=' + this.data.city,
    })
  },

  onTapLocation() {
    if (this.data.locationTipsText === '点击开启获取位置权限'){
      wx.openSetting({
        success: res => {
          let auth = res.authSetting["scope.userLocation"]
          if (auth) {
            this.getLocation()
          }
        }
      })
    } else {
      this.getLocation()
    }
  },

  getLocation() {
    wx.getLocation({
      type: '',
      altitude: true,
      success: res => {
        this.getCity(res.latitude, res.longitude);
      },
      fail: res => {
        this.setLocationTipsText()
      }
    })
  },

  setLocationTipsText () {
    this.setData({
      locationTipsText: '点击开启获取位置权限'
    })
  },

  getCity(lat, lon) {
    mapSDK.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lon
      },
      success: res => {
        let city = res.result.address_component.city;
        this.setCity(city);
      },
      fail: res => {
        alert('warn: API wrong!');
      },
      complete: res => {
        this.getNow();
      }
    });
  },

  setCity(city){
    this.setData({
      city:city,
      locationTipsText:''
    });
  },

  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: { city: this.data.city },
      success: res => {
        let result = res.data.result;
        this.setNow(result);
        this.setForecastWeather(result);
        this.setToday(result);
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
    this.setData({
      forecastWeather: forecastWeather
    });
  },

  setToday(result){
    let date = new Date();
    let day = date.toLocaleDateString();
    let today = result.today;
    let temp = '今日气温：' + today.minTemp + '°C to ' + today.maxTemp + '°C'; 
    
    this.setData({
      todayDate:day,
      todayTemp:temp
    });
  },
});
