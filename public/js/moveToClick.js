

/**
     * 클릭시 이동하는 함수
     */

let targetPosition = new THREE.Vector3(0, 0, 64);
let smoothMoveSpeed = 0.05; // 카메라 이동 속도 (조정 가능)
let orbitRadius = 50; // 회전 반경 (조정 가능)
let distanceFromSurface = 10; // 구 표면으로부터의 거리 (조정 가능)

window.addEventListener("click", (event) => {
  // event.preventDefault();
  // 마우스 좌표를 정규화
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycaster로 카메라에서 마우스를 향해 광선을 쏨
  raycaster.setFromCamera(mouse, camera);

  // 광선과 구의 충돌을 확인
  const intersects = raycaster.intersectObject(particlSystem);
  if (intersects.length > 0) {
    // 가장 가까운 점 선택
    const closestPoint = intersects[0].point;
    console.log(intersects[0].point)
    // 선택된 점의 방향 벡터를 구하고, 이 방향으로 거리를 더해 camera의 새로운 위치를 결정
    const direction = closestPoint.clone().normalize();
    targetPosition = direction.multiplyScalar(orbitRadius + distanceFromSurface);
  }

});

  // 부드러운 이동을 위한 코드 - clickToMove
      // if (controls.autoRotate === false) {
      //   camera.position.lerp(targetPosition, smoothMoveSpeed);
      //   // Calculate the distance between the camera and the target
      //   let distance = camera.position.distanceTo(targetPosition);

      //   if (distance < 0.01) {
      //     controls.target.set(0, 0, 0);
      //     camera.updateProjectionMatrix();
      //     // targetPosition = camera.position.clone();
      //   }
      // }
      // camera.lookAt(scene.position);

