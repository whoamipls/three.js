// 迁徙路径分段数
var metapNum = 150;
// 迁徙路径标记分段数
var markingNum = 50;
// 轨迹上运动的球大小
var slideBallSize = 0.2;
// 轨迹上运动的球颜色
var slideBallColor = 'rgb(0, 255, 255)';//'rgb(27, 180, 176)';
// 轨迹球
var ballGroup = null;

// 初始化数据
var initLines = function (scene, lines) {
    // 清空轨迹点
    clearLines(scene);
    // 轨迹点
    var animateDots = [];
    lines.forEach((item) => {
        let curve = new THREE.LineCurve3(item.start, item.end);
        animateDots.push(curve.getPoints(metapNum));
    });
    // 线上滑动的小球
    ballGroup = new THREE.Group();
    for (var i = 0; i < animateDots.length; i++) {
        for (var j = 0; j < markingNum; j++) {
            var aGeo = new THREE.SphereGeometry(slideBallSize, 10, 10);
            var aMaterial = new THREE.MeshBasicMaterial({
                color: slideBallColor,
                transparent: true,
                opacity: 1 - j / markingNum //opacity: 1 - j * 0.02
            })
            var aMesh = new THREE.Mesh(aGeo, aMaterial);
            ballGroup.add(aMesh);
        }
    }
    var vIndex = 0;
    var firstBool = true;
    function animationLine() {
        if (!ballGroup) return;
        ballGroup.children.forEach(function (elem, index) {
            var _index = parseInt(index / markingNum);
            var index2 = index - markingNum * _index;
            var _vIndex = 0;
            if (firstBool) {
                _vIndex = vIndex - index2 % markingNum >= 0 ? vIndex - index2 % markingNum : 0;
            } else {
                _vIndex = vIndex - index2 % markingNum >= 0 ? vIndex - index2 % markingNum : metapNum + vIndex - index2;
            }
            // if (!!animateDots) {
            //     var dots = animateDots[_index];
            //     if (!!dots) {
            //         var v = dots[_vIndex];
            //         elem.position.set(v.x, v.y, v.z);
            //     }
            // }
            var v = animateDots[_index][_vIndex];
            elem.position.set(v.x, v.y, v.z);
        })
        vIndex++;
        if (vIndex > metapNum) {
            vIndex = 0;
        }
        if (vIndex == metapNum && firstBool) {
            firstBool = false;
        }
        requestAnimationFrame(animationLine);
    }
    scene.add(ballGroup);
    animationLine();
}

// 清空动态球
var clearLines = function (scene) {
    if (ballGroup == null) return;
    scene.remove(ballGroup);
    ballGroup = null;
}