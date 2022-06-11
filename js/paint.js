AFRAME.registerComponent("paintballs", {
  init: function () {
    this.shootpaintball();
  },
  shootpaintball: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var paintball = document.createElement("a-entity");

        paintball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        paintball.setAttribute("material", "color", "blue");

        var cam = document.querySelector("#camera-rig");

        pos = cam.getAttribute("position");

        paintball.setAttribute("position", {
          x: pos.x,
          y: pos.y+1.6,
          z: pos.z-0.08,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        paintball.setAttribute("velocity", direction.multiplyScalar(-100));

        var scene = document.querySelector("#scene");

        paintball.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        paintball.addEventListener("collide", this.removepaintball);

        scene.appendChild(paintball);
      }
    });
  },
  removepaintball: function (e) {
    var paintball = e.detail.target.el;
    var hit = e.detail.body.el;
    var scene = document.querySelector("#scene");
    var paint = document.createElement("a-entity");
    var position = paintball.getAttribute("position")
    var rotation = hit.getAttribute("rotation")

    paint.setAttribute("position", {
      x: position.x,
      y: position.y,
      z: position.z,
    });
    paint.setAttribute("rotation", {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
    });
    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./assets/paint/paint.png",
    });
    scene.appendChild(paint)
    paintball.removeEventListener("collide", this.removeBullet);
    scene.removeChild([paintball]);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});


