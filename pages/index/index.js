//index.js  
//获取应用实例  
var app = getApp()
Page({
    data: {
        /** 
            * 页面配置 
            */
        winWidth: 0,
        winHeight: 0,
        // tab切换  
        currentTab: 0,
    },
    onLoad: function () {
        this.showData();
        var that = this;

        /** 
         * 获取系统信息 
         */
        wx.getSystemInfo({

            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });
    },
    /** 
       * 滑动切换tab 
       */
    bindChange: function (e) {

        var that = this;
        that.setData({ currentTab: e.detail.current });

    },
    showData: function (e) {
        var that = this//不要漏了这句，很重要
        wx.request({
            url: 'http://192.168.31.158:8181/mall/user/login', //接口地址
            data: {
                userName: "18211111111",
                userRole: "1",
                password: "25d55ad283aa400af464c76d713c07ad"
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"  //post
            },
            complete: function (res) {
                that.setData({
                    oneyuandata: res.data.data
                });
                if (res == null || res.data == null) {
                    reject(new Error('网络请求失败'))
                }
            },
            success: function (res) {
                console.log("123..........." + res.data.icon);
                //将获取到的json数据，存在名字叫zhihu的这个数组中
                that.setData({
                    zhihu: res.data,
                    //res代表success函数的事件对，data是固定的，icon是是上面json数据中icon
                });

            }
        })
    },
    /** 
     * 点击tab切换 
     */
    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    // 跳转
    tz: function () {
        wx.navigateTo({
            url: '../detail/detail'
        })
    }
})

