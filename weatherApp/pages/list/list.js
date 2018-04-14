const dayMap = {
  '0':'星期日',
  '1':'星期一',
  '2':'星期二',
  '3':'星期三',
  '4':'星期四',
  '5':'星期五',
  '6':'星期六'
};

Page({
  data:{
    dateItem:[

      // {
      //   day:'星期一',
      //   date:'2018/1/2',
      //   temp:'0-20',
      //   weather:'/images/sunny-icon.png'
      // },
    ],
  },

  onLoad(){
    this.getFuture()
  },

  getFuture(){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '北京市',
        time: new Date().getTime()
      },
      success: res => {
        let result = res.data.result;
        let dateItem = [];
        result.forEach ((val, i, arr) => {
          let date = new Date();
          date.setDate(date.getDate() + i);
          dateItem.push({
            day:dayMap[date.getDay()],
            date: date.toLocaleDateString(),
            temp: val.minTemp + '°C to ' + val.maxTemp + '°C',
            weather: '/images/' + val.weather + '-icon.png'
          })
        });
        this.setData({
          dateItem:dateItem
        })
      }
    })
  },

})