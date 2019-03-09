// 还有移动端适配
// 画笔颜色

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let subUnits = document.querySelector(".sub-units");
let sizes = document.querySelector('.sizes') ;
let colors = document.querySelector('.colors') ;




canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
ctx.lineWidth = 2;

//状态
isPress = false;
lastPoint = null;
mouseStaus = 'pen'



if(is_touch_device()){
  // 触摸
  console.log('11')
canvas.addEventListener("touchstart", function mousedown(e) {
  isPress = true;
  lastPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});
canvas.addEventListener("touchend", function mouseup(e) {

  isPress = false;
});
canvas.addEventListener("touchmove", function draw(e) {

  if (!isPress) return;
  newPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };

  if(mouseStaus === 'pen'){
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.closePath();
    ctx.stroke();
  }else if(mouseStaus === 'eraser'){
    ctx.clearRect(newPoint.x,newPoint.y,16,16)
    console.log(newPoint.x,newPoint.y,16,16)
  }else{
    console.log('你发现了第三种情况，报告 BUG')
  }
  lastPoint = newPoint;
});
}else{
  // 不支持触摸

canvas.addEventListener("mousedown", function mousedown(e) {
  isPress = true;
  lastPoint = { x: e.clientX, y: e.clientY };
});
canvas.addEventListener("mouseup", function mouseup(e) {

  isPress = false;
});
canvas.addEventListener("mousemove", function draw(e) {
  if (!isPress) return;
  newPoint = { x: e.clientX, y: e.clientY };
  console.log(mouseStaus)

  if(mouseStaus === 'pen'){
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.closePath();
    ctx.stroke();
  }else if(mouseStaus === 'eraser'){
    ctx.clearRect(newPoint.x,newPoint.y,16,16)
    console.log(newPoint.x,newPoint.y,16,16)
  }else{
    console.log('你发现了第三种情况，报告 BUG')
  }
  lastPoint = newPoint;
});
}
function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

console.log(subUnits)
colors.addEventListener("click",function (e){
  let _color
  e.target.className.split(' ').forEach(color => {
    if (color === 'red') _color = 'red';
    else if(color === 'black') _color = 'black';
    else if(color === 'green') _color = 'green';
    else{
      console.log('color出错')
    }
  });
  console.log(_color)
  switch (_color) {
    case "red":
      ctx.strokeStyle='red'
      break;
    case "black":
      ctx.strokeStyle='black'
      break;
      case "green":
      ctx.strokeStyle='green'
      break;
    default:
      console.log('switch默认结果');
  }
})
sizes.addEventListener("click",function (e){

  if(e.target.className.search('line-1')!=-1) {ctx.lineWidth=1;}
  else if(e.target.className.search('line-3')!=-1) ctx.lineWidth=3;
  else if(e.target.className.search('line-5')!=-1) ctx.lineWidth=5;
  else{
    console.log('lineWidth出错',e.target.className)
  }
})
subUnits.addEventListener("click", function subUnitsClick(e) {
  let subUnit = e.target.getAttribute("name");
  switch (subUnit) {
    case "pen":
    canvas.style.cursor='auto'
    mouseStaus='pen'
      break;
    case "eraser":
    mouseStaus='eraser'
    canvas.style.cursor=`url("http://localhost:1234/f.ad522018.ico"), auto`
      break;
    case "clear":
        ctx.clearRect(0,0,canvas.width,canvas.height)
      console.log("3");
      break;
    case "download":
      let fileName=prompt('请输入文件名','filename.png')
      if(!fileName) return
      var link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL()
      link.click();
        console.log("4");
      break;
    default:
      console.log(e.target);
  }
});
console.log(subUnits)
