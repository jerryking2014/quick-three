"use strict";

(function (window) {

    var has_require = typeof require !== 'undefined';

    var THREE = window.THREE || has_require && require('three');
    if (!THREE) {
        throw new Error('Quick3d requires three.js')
    }

    var Quick3D = function (option) {
        option = Object.assign({
            camera: null,
            renderer: THREE.WebGLRenderer,
            controls: THREE.TrackballControls,
            domContainer: document.body
        }, option);

        var scene, camera, renderer, controls, stats, tween, textureLoader, action = [];

        //scene
        scene = new THREE.Scene();

        //camera
        if (option.camera) {
            camera = option.camera
        } else {
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 8;
            camera.lookAt({x:0, y:0, z:0});
        }
        scene.add(camera);

        //renderer
        if (typeof option.renderer === 'function') {
            renderer = new option.renderer({antialias: true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            option.domContainer.appendChild(renderer.domElement);
        } else {
            renderer = option.renderer;
        }
        renderer.action = renderer.render.bind(renderer, scene, camera);
        action.push(renderer.action);

        //controls
        if (option.controls) {
            controls = new option.controls(camera, renderer.domElement);
            controls.action = controls.update.bind(controls);
            action.push(controls.action);
        }

        // state
        if (window.Stats) {
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            option.domContainer.appendChild(stats.domElement);
            stats.action = stats.update.bind(stats);
            action.push(stats.action);
        }

        // tween
        if (window.TWEEN) {
            tween = { action: TWEEN.update.bind(TWEEN) };
            action.push(tween.action)
        }

        // texture loader
        textureLoader = new THREE.TextureLoader();

        //window resize
        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        });

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;
        this.stats = stats;
        this.tween = tween;
        this.textureLoader = textureLoader;
        this.action = action;
        this.clock = new THREE.Clock();

        // loop render action
        function loopRenderAction() {
            requestAnimationFrame(loopRenderAction);
            action.forEach(function (e) {
                e();
            });
        }
        loopRenderAction();
    };

    Quick3D.prototype.addAction = function (fn) {
        if (typeof fn !== 'function') return;
        this.action.push(fn);
    };

    Quick3D.prototype.removeAction = function (fn) {
        var index = this.action.indexOf(fn);
        if (index > -1) {
            this.action.splice(index, 1)
        }
    };

    if( typeof module !== 'undefined' ) {
        module.exports = Quick3D;
    } else {
        window.Quick3D = Quick3D;
    }
})(this);

