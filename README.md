# quick-three
wrapper Three.js to create a 3d world quickly
## Usage
```html
    <script src="three.min.js"></script>
    <script src="Quick3D.js"></script>
```
```javascript
    var option = {
        // camera instance, Quick3d will add camera to scene, default is THREE.PerspectiveCamera
        camera: null,

        // renderer instance or renderer class, default is THREE.WebGLRenderer
        renderer: null,

        // controls class, default is THREE.TrackballControls
        controls: null,

        // renderer dom element container, default is document.body
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
Properties
* ```scene``` - scene instance
* ```camera``` - camera instance
* ```renderer``` - renderer instance
* ```controls``` - controls instance
* ```stats``` - stats instance
* ```tween``` - tween action
* ```textureLoader``` - THREE.TextureLoader instance
* ```clock``` - THREE.Clock instance

Method
* ```addAction``` (__function__) - add function to __requestAnimationFrame__ action
* ```removeAction``` (__function__) - remove function from __requestAnimationFrame__ action

```renderer.render```, ```controls.update```, ```TWEEN.update```, ```stats.update``` are added, if available.
 ```javascript
    // if you want to remove the action
    quick3d.removeAction(quick3d.renderer.action)
    quick3d.removeAction(quick3d.controls.action)
    quick3d.removeAction(quick3d.tween.action)
    quick3d.removeAction(quick3d.stats.action)
 ```

## License
MIT licensed

Copyright (c) 2017 jinrui
