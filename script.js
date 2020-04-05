// ページの読み込みを待つ
window.addEventListener("load", init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;
  let rot = 0;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1500);

  var geometry;
  var material;
  var box;

  /*  
  // 箱を作成
  geometry = new THREE.BoxGeometry(400, 400, 400);
  material = new THREE.MeshNormalMaterial();
  box = new THREE.Mesh(geometry, material);
  scene.add(box);

  geometry = new THREE.PlaneGeometry(1000, 1000, 10);
  material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
*/
  // moon
  // https://dl.dropbox.com/s/h80r1y9c8yib8u5/moonmap1k.jpg?dl=0

  // earth
  // https://dl.dropbox.com/s/2o7ycvsi6b8msst/earthmap1k.jpg?dl=0

  // 球体を作成
  geometry = new THREE.SphereGeometry(300, 30, 30);

  // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load("earthmap1k.jpg");
  // マテリアルにテクスチャーを設定
  material = new THREE.MeshStandardMaterial({
    map: texture
  });

  /*
  material = new THREE.MeshStandardMaterial({color: 0xFF0000});
  // メッシュを作成
  */
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  // 星屑を作成します (カメラの動きをわかりやすくするため)
  createStarField();

  function createStarField() {
    // 形状データを作成
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5)
        )
      );
    }
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff
    });

    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    rot += 0.5; // 毎フレーム角度を0.5度ずつ足していく
    // ラジアンに変換する
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    // 原点方向を見つめる
    //camera.lookAt(new THREE.Vector3(0, 0, 0));

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}
