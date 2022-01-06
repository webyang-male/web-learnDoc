//控制台打印
if (window.console) {
  console.log("开启F12的你想要寻找什么秘密呢?📖");
  var getTimeState_console = function () {
    var t = new Date().getHours(),
      e = "";
    return (
      4 >= t || t > 22
        ? (e = "Good Night 🛌")
        : 4 < t && t <= 10
        ? (e = "Good Morning 🌮")
        : 10 < t && t <= 12
        ? (e = "Good Noon 🍱")
        : 12 < t && t <= 17
        ? (e = "Good Afternoon ☕")
        : 17 < t && t <= 22 && (e = "Good Evening 🍇"),
      e
    );
  };

  console.log(getTimeState_console());
  console.log(
    "欢迎访问%c大赵同学(Zain)的文档网站",
    "color:#3eaf7c;font-weight:bold"
  );
  console.log(
    "%c一名立志成为一名前端攻城狮的小白",
    "color:gold;font-weight:bold"
  );

  console.log("%c偌大的虚拟世界遇到你真的很幸运💜", "color:deepskyblue;");
}

//返回顶部


window.onload = function () {
  var obtn = document.getElementById("backTop"); //获取回到顶部按钮的ID
  var clientHeight = document.documentElement.clientHeight; //获取可视区域的高度
  var timer = null; //定义一个定时器
  var isTop = true; //定义一个布尔值，用于判断是否到达顶部

  window.onscroll = function () {
    //滚动条滚动事件

    //获取滚动条的滚动高度
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(osTop);
    if (osTop >= 20) {
      //如果滚动高度大于可视区域高度，则显示回到顶部按钮
      obtn.style.display = "block";
    } else {
      //否则隐藏
      obtn.style.display = "none";
    }

    //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
    if (!isTop) {
      clearInterval(timer);
    }
    isTop = false;
  };

  obtn.onclick = function () {
    //回到顶部按钮点击事件
    //设置一个定时器
    timer = setInterval(function () {
      //获取滚动条的滚动高度
      var osTop = document.documentElement.scrollTop || document.body.scrollTop;
      //用于设置速度差，产生缓动的效果
      var speed = Math.floor(-osTop / 12);
      document.documentElement.scrollTop = document.body.scrollTop =
        osTop + speed;
      isTop = true; //用于阻止滚动事件清除定时器
      if (osTop == 0) {
        clearInterval(timer);
      }
    }, 30);
  };
};
