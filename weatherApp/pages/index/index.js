Page({
  data:{
    temp:0,
    weather:'阴天',
  },
  onLoad(){
    console.log('Hello World!');
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data:{city:'广州市'},
      success:res => {
        // console.log('temp：' + res.data.result.now.temp);
        // console.log('weather: ' + res.data.result.now.weather);
        // console.log('data-now: ' + res.data.result.now);
        // 以上注释掉自己联系的部分，以下学习老师的方法做一次
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        // data.temp = temp;
        // data.weather = weather;
        // 以上两行有问题，需要想办法将temp和weather传送到data的相应位置
      },
    })
  }
});
