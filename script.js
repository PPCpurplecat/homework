// 全局变量
let scene, camera, renderer, controls;
let cylinder, floor, ceiling;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let speed = 100.0;

// 初始化场景
function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 750);

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 10;

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.getElementById('container').appendChild(renderer.domElement);

    // 创建控制器
    controls = new THREE.PointerLockControls(camera, document.body);

    // 创建圆柱体（图片边界）
    createCylinder();

    // 创建地板和天花板
    createFloorAndCeiling();

    // 添加光源
    addLights();

    // 事件监听
    setupEventListeners();

    // 开始渲染
    animate();
}

// 创建圆柱体（图片边界）
function createCylinder() {
    // 检查是否通过HTTP服务器访问
    if (window.location.protocol === 'file:') {
        console.error('请通过HTTP服务器访问此页面，而不是直接打开文件');
        alert('请通过HTTP服务器访问此页面！\n\n请访问: http://localhost:8000');
        createFallbackCylinder();
        return;
    }

    const textureLoader = new THREE.TextureLoader();

    // 加载两张图片
    const texture1 = textureLoader.load('images/1111.png');
    const texture2 = textureLoader.load('images/2222.png');

    // 创建画布来合并两张图片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 等待图片加载完成
    Promise.all([
        new Promise(resolve => {
            const img1 = new Image();
            img1.crossOrigin = 'anonymous'; // 添加跨域属性
            img1.onload = () => resolve(img1);
            img1.onerror = () => {
                console.error('图片1加载失败');
                resolve(null);
            };
            img1.src = 'images/1111.png';
        }),
        new Promise(resolve => {
            const img2 = new Image();
            img2.crossOrigin = 'anonymous'; // 添加跨域属性
            img2.onload = () => resolve(img2);
            img2.onerror = () => {
                console.error('图片2加载失败');
                resolve(null);
            };
            img2.src = 'images/2222.png';
        })
    ]).then(([img1, img2]) => {
        // 检查图片是否加载成功
        if (!img1 || !img2) {
            console.error('图片加载失败，创建备用圆柱');
            createFallbackCylinder();
            return;
        }

        try {
            // 设置画布尺寸
            const width = img1.width + img2.width;
            const height = Math.max(img1.height, img2.height);
            canvas.width = width;
            canvas.height = height;

            // 绘制图片（1111.png在左边，2222.png在右边）
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, img1.width, 0);

            // 创建纹理
            const combinedTexture = new THREE.CanvasTexture(canvas);
            combinedTexture.wrapS = THREE.RepeatWrapping;
            combinedTexture.wrapT = THREE.RepeatWrapping;

            // 创建圆柱体几何体
            const geometry = new THREE.CylinderGeometry(50, 50, 100, 32, 1, true);

            // 调整UV坐标以正确映射纹理
            const uvs = geometry.attributes.uv;
            for (let i = 0; i < uvs.count; i++) {
                const u = uvs.getX(i);
                const v = uvs.getY(i);
                // 调整UV坐标以正确显示图片
                uvs.setXY(i, u * 2, v);
            }

            // 创建材质
            const material = new THREE.MeshLambertMaterial({
                map: combinedTexture,
                side: THREE.DoubleSide
            });

            // 创建圆柱体网格
            cylinder = new THREE.Mesh(geometry, material);
            cylinder.position.y = 50; // 将圆柱体抬高，使底部在地面上
            scene.add(cylinder);

            // 隐藏加载提示
            document.getElementById('loading').style.display = 'none';
            
            console.log('圆柱创建成功');
        } catch (error) {
            console.error('创建圆柱时出错:', error);
            createFallbackCylinder();
        }
    }).catch(error => {
        console.error('图片加载过程中出错:', error);
        createFallbackCylinder();
    });
}

// 创建地板和天花板
function createFloorAndCeiling() {
    // 创建地板（白色）
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // 创建天花板（蓝色）
    const ceilingGeometry = new THREE.PlaneGeometry(200, 200);
    const ceilingMaterial = new THREE.MeshLambertMaterial({ color: 0x0066ff });
    ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 100;
    scene.add(ceiling);
}

// 添加光源
function addLights() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 100, 0);
    scene.add(directionalLight);

    // 点光源
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 50, 0);
    scene.add(pointLight);
}

// 设置事件监听
function setupEventListeners() {
    // 点击开始控制
    document.addEventListener('click', function() {
        controls.lock();
    });

    // 键盘事件
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // 窗口大小改变
    window.addEventListener('resize', onWindowResize);

    // 控制器事件
    controls.addEventListener('lock', function() {
        console.log('Pointer lock active');
    });

    controls.addEventListener('unlock', function() {
        console.log('Pointer lock inactive');
    });
}

// 键盘按下事件
function onKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;
    }
}

// 键盘释放事件
function onKeyUp(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
    }
}

// 窗口大小改变事件
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        const time = performance.now();

        // 计算移动方向
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        // 应用移动
        if (moveForward || moveBackward) {
            velocity.z -= direction.z * speed * 0.01;
        }
        if (moveLeft || moveRight) {
            velocity.x -= direction.x * speed * 0.01;
        }

        // 应用阻尼
        velocity.multiplyScalar(0.9);

        // 移动相机
        controls.moveRight(-velocity.x * 0.01);
        controls.moveForward(-velocity.z * 0.01);

        // 限制移动范围（在圆柱体内）
        const distanceFromCenter = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);
        if (distanceFromCenter > 45) { // 稍微小于圆柱体半径
            const angle = Math.atan2(camera.position.z, camera.position.x);
            camera.position.x = 45 * Math.cos(angle);
            camera.position.z = 45 * Math.sin(angle);
        }

        // 限制高度
        if (camera.position.y < 2) camera.position.y = 2;
        if (camera.position.y > 98) camera.position.y = 98;
    }

    renderer.render(scene, camera);
}

// 创建备用圆柱（当图片加载失败时）
function createFallbackCylinder() {
    console.log('创建备用圆柱');
    const geometry = new THREE.CylinderGeometry(50, 50, 100, 32, 1, true);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00, // 绿色
        side: THREE.DoubleSide
    });
    
    cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.y = 50;
    scene.add(cylinder);
    
    // 隐藏加载提示
    document.getElementById('loading').style.display = 'none';
}

// 启动应用
init();
