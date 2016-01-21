# leapmotion_script


for leap motion

##使用js api



###说明
1.[迷宫游戏](http://www.21thkids.com/lyt/leapmotion_project/pacman.html) 用户操作角色走出迷宫，并在迷宫一些区域设计奖励，每些奖励给予用户一些积分，并通过画面和动听的音乐的形式给予用户反馈。刺激用户获得奖励，并最终走出迷宫，用户使用四个指令控制游戏角色，分别为“上”“下”“左”“右”。游戏初始以leap_motion正上方15cm处为坐标原点，并建立x,y坐标轴,大于x轴数值为“向右”指令，小于x轴数值为“向左”指令，大于y轴坐标值为“向上”指令，小于y轴坐标值为“向下”指令。实际应用时是在空间中设置一个交互盒子，在这个交互盒子内，允许用户随意动作，而不发出指令，当手部坐标超出这个交互盒子才计算命令并发出相应命令。<br>
2.[指挥游戏](http://www.21thkids.com/lyt/leapmotion_project/direct.html)，使用swipe 和 circle Leap motion的api 监控用户手部的上下左右挥动，顺时针逆时针转圈，以此来模拟乐队指挥的手势。使用phaser库的addMarker，对歌曲进行任意位置切分，并规定用户出示上下左右，左右上下等指挥动作，来完成一首歌的播放，顺时针的监测使用向量点积即可判断
```js
      var pointable = circle.pointableIds[0];
      var direction = frame.pointable(pointable).direction;
      var dotProduct = Leap.vec3.dot(direction, circle.normal);
```
3.[演奏游戏](http://www.21thkids.com/lyt/leapmotion_project/perform.html)  准备好和弦，然用户可以一个手势一个和弦
