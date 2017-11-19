# quick-three
Three.js的简单封装，能够帮助你快速创建3D场景
## 安装
你可以通过 ```npm install quick-three```
```javascript
    /* in ES 5 */
    let Quick3d = require('quick-three');
    /* in ES 6 */
    import Quick3d from 'quick-three';
```
或者
```html
    <script src="three.min.js"></script>
    <script src="Quick3D.js"></script>
```
## 用法
```javascript
    var option = {
        // camera 实例, Quick3d 会将其加入场景中, 默认值：THREE.PerspectiveCamera的实例
        camera: null,

        // renderer 实例 或 renderer 类, 默认值：THREE.WebGLRenderer
        renderer: null,

        // controls 类, 默认值：THREE.TrackballControls
        controls: null,

        // renderer domelement的容器, 默认值：document.body
        domContainer: document.body
    }
    var quick3d = new Quick3D(option);

    var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5),
        new THREE.MeshBasicMaterial({
            color: 'red'
         }))
    quick3d.scene.add(mesh)
```
属性
* ```scene``` - scene 实例
* ```camera``` - camera 实例
* ```renderer``` - renderer 实例
* ```controls``` - controls 实例
* ```stats``` - stats 实例
* ```tween``` - tween 更新函数
* ```textureLoader``` - THREE.TextureLoader 实例
* ```clock``` - THREE.Clock 实例

方法
* ```addAction``` (__function__) - 将一个函数添加到(__requestAnimationFrame__ )渲染执行队列中
* ```removeAction``` (__function__) - 将一个函数从(__requestAnimationFrame__ )渲染执行队列中移除

```renderer.render```, ```controls.update```, ```TWEEN.update```, ```stats.update```等，在对应框架存在的时候，会自动载入到渲染执行队列
 ```javascript
    // 如果你想要移除他们，可以执行下面的代码
    quick3d.removeAction(quick3d.renderer.action)
    quick3d.removeAction(quick3d.controls.action)
    quick3d.removeAction(quick3d.tween.action)
    quick3d.removeAction(quick3d.stats.action)
 ```

## License
MIT licensed

Copyright (c) 2017 jinrui
