Page({
  onLoad(){
    console.log('Hello World!');
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data:{city:'广州市'},
      success:res => {
        console.log(res.data);
      },
    })
  }
});
