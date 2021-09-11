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
console.log("欢迎访问%c大赵同学(Zain)的文档网站", "color:#3eaf7c;font-weight:bold");
console.log(
  "%c一名立志成为一名前端攻城狮的小白",
  "color:gold;font-weight:bold"
);

console.log("%c偌大的虚拟世界遇到你真的很幸运💜", "color:deepskyblue;");
}