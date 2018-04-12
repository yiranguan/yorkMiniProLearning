Page({
  onLoad(){
    console.log('Hello World!');
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data:{city:'广州市'},
      success:res => {
        console.log('temp：' + res.data.result.now.temp);
        console.log('weather: ' + res.data.result.now.weather);
        console.log('data-now: ' + res.data.result.now);
      },
    })
  }
});
