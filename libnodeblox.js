let scene;
let canvas = document.getElementById("renderCanvas");
let _G = {};
class Player {
    constructor(name, walkspeed, jumpheight, health) {
        this.name = name;
        this.walkspeed = walkspeed || 16;
        this.jumpheight = jumpheight || 50;
        this.id = Math.floor(Math.random() * 100000);
        this.health = health || 100;
    }
}

class Character { 
    constructor (name) {
        this.player = new Player(name);
        this.health = 100;
    }

    getPlayer() {
        return this.player;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

}

class NodeInstance {
    constructor(name, type, parent, value, width, height, depth, x, y, z) {
        this.name = name;
        this.type = type;
        this.width = width || 1;
        this.height = height || 1;
        this.depth = depth || 1;
        this.parent = parent || scene;
        this.value = value || "";
        if (this.type == "freecamera") {
            let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);
            return camera;
        } else if (this.type == "followcamera") {
            let camera = new BABYLON.FollowCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(parent)
            camera.attachControl(canvas, true);
            return camera;
        } else if (this.type == "workspace") {
            let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
            scene = new BABYLON.Scene(engine);
            return {"scene": scene, engine: engine};
        } else if (this.type == "player") {
            let charObject = new Character(this.name);
            let player = charObject.getPlayer();
            let c = new NodeInstance(this.name, "character", scene, 1, 1, 1, 0, 0, 0);
            return [player, charObject, c];
        } else if (this.type == "block") {
            BABYLON.MeshBuilder.CreateBox(this.name || "box", {width: this.width, height: this.height, depth: this.depth}, parent).position = new BABYLON.Vector3(x, y, z);
        } else if (this.type == "character") {
            //basic third person character
            //create cube character
            let playerMesh = BABYLON.Mesh.CreateBox("player", 1.0, scene);
            playerMesh.position = new BABYLON.Vector3(0, 0, 0);
            playerMesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            playerMesh.material = new BABYLON.StandardMaterial("playerMat", scene);
            playerMesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            playerMesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
            playerMesh.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
            playerMesh.material.alpha = 1;
            playerMesh.material.backFaceCulling = false;
            playerMesh.material.wireframe = false;
            playerMesh.checkCollisions = true;
            playerMesh.isVisible = true;
            let camera = new BABYLON.FollowCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(playerMesh.position);
            camera.attachControl(canvas, true);
            //move with w to forward s to back a to strafe d to right
            let keys = [];
            scene.actionManager = new BABYLON.ActionManager(scene);
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                keys[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                keys[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));
            scene.registerBeforeRender(function () {
                if (keys["w"]) {
                    playerMesh.position.z += player.walkspeed;
                }
                if (keys["s"]) {
                    playerMesh.position.z -= player.walkspeed;
                }
                if (keys["a"]) {
                    playerMesh.position.x -= player.walkspeed;
                }
                if (keys["d"]) {
                    playerMesh.position.x += player.walkspeed;
                }
                if (keys[" "]) {
                    //check if on the ground
                    if (playerMesh.position.y == 0) {
                        playerMesh.position.y += player.jumpheight;
                    }
                }
            });
        } else if (this.type == "sound") {
            let sound = new BABYLON.Sound("sound", this.value, scene, null, { loop: false, autoplay: true });
            return sound;
        } else if (this.type == "loopedSound") {
            let sound = new BABYLON.Sound("sound", this.value, scene, null, { loop: true, autoplay: true });
            return sound;
        } else if (this.type == "soundManual") {
            let sound = new BABYLON.Sound("sound", this.value, scene, null, { loop: false, autoplay: false });
            return sound;
        } else if (this.type == "loopedSoundManual") {
            let sound = new BABYLON.Sound("sound", this.value, scene, null, { loop: true, autoplay: false });
            return sound;
        } else if (this.type == "light") {
            let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.7;
            return light;
        }

    }

    getName() {
        return this.name;
    }

    MoveTo(x, y, z) {
        this.position = new BABYLON.Vector3(x, y, z);
    }

    Resize(x, y, z) {
        this.scale = new BABYLON.Vector3(x, y, z);
    }
}

var workspace = new NodeInstance("workspace", "workspace");
let light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(Math.max(),Math.max(),Math.max()), scene);
let p = new NodeInstance("player", "playerArray", workspace.scene, 1, 1, 1, 0, 0, 0);


async function respawn() {
    while (true) {
        if (p.charObject.health == 0) {
            //respawn
            p.charObject.health = 100;
            p.start();
        }
    }
}

function RJuascriptEval(code) {

    //Jua = Javascript + Lua
    function print(message) {
        console.log(message);
    }

    function warn(message) {
        console.warn(message);
    }

    function error(message) {
        console.error(message);
    }

    function info(message) {
        console.info(message);
    }

    // function that returns a random value between min and max
    class math {
        random(min, max) {
            return Math.random() * (max - min) + min;
        }
        max(min, max) {
            Math.max(min, max);
        }

        min(min, max) {
            Math.min(min, max);
        }
    }

    class Instance {
        new(name, type, parent, width, height, depth, x, y, z) {
            parent = parent || scene;
            width = width || 1;
            height = height || 1;
            depth = depth || 1;
            x = x || 0;
            y = y || 0;
            z = z || 0;
            return new NodeInstance(name, type, parent, width, height, depth, x, y, z);
        }
    }

    return `${code}`;
}