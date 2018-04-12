const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

Page({
  data:{
    nowTemp:14,
    nowWeather:'多云',
  },
  onLoad(){
    console.log('Hello World!');
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data:{city:'广州市'},
      success:res => {
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        console.log(temp, weather);
        this.setData({
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather]
        });
      },
    })
  }
});
