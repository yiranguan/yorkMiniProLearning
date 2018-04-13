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
    nowWeatherBackground:''
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
        console.log(temp, weather);
        this.setData(
          {
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
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
