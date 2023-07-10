

// "use client";


// import React, { useEffect, useRef } from "react";
// import { renderToString } from 'react-dom/server';
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
// import styled from "styled-components";

// const ThreeContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
// `;

// const CanvasContainer = styled.canvas`
//   width: 100%;
//   height: 100%;
// `;

// const TextStyledCompo = styled.div`
//   /* border: 1px solid #e5e5e5; */
//   width: 100px;
//   height: 50px;
//   background-color: tomato;
//   p{
    
//     font-size: 14px;
//   }
// `

// function ThreeComponent() {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const fontColor = "#fefefe";
//   const bgColor = "#001C30";

//   useEffect(() => {
//     const container = containerRef.current;
//     const containerRect = container.getBoundingClientRect();

//     // 화면 생성
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(bgColor);

//     // 카메라 생성
//     const camera = new THREE.PerspectiveCamera(
//       50,
//       containerRect.width / containerRect.height,
//       1,
//       1000
//     );
//     camera.position.x = 300;
//     camera.position.y = 300;
//     camera.position.z = 300;

//     const sphereGeo = new THREE.SphereGeometry(180, 64, 64);
//     const sphereMat = new THREE.PointsMaterial({
//       color: fontColor,
//       size: 2,
//     });

//     const particlSystem = new THREE.Points(sphereGeo, sphereMat);
//     scene.add(particlSystem);

//     const canvas = document.getElementById("three-canvas");

//     // 렌더러 생성
//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//     });
//     renderer.setSize(containerRect.width, containerRect.height);
//     renderer.domElement.style.position = 'absolute';
//     // renderer.domElement.style.zIndex = 1;
//     container.appendChild(renderer.domElement);

//     // CSS3D 렌더러 생성
//     const cssRenderer = new CSS3DRenderer();
//     cssRenderer.setSize(containerRect.width, containerRect.height);
//     cssRenderer.setSize(containerRect.width, containerRect.height);
//     cssRenderer.domElement.style.position = 'absolute';
//     cssRenderer.domElement.style.top = 0;
//     cssRenderer.domElement.style.pointerEvents = 'none'; // 추가된 부분
//     container.appendChild(cssRenderer.domElement);

//     // 오르빗 컨트롤러 생성
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.enableZoom = false;
//     controls.dampingFactor = 0.05;
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 3;
//     controls.minDistance = 10;
//     controls.maxDistance = 500;

//     controls.update();

//     // 텍스트 생성
//     const fontLoader = new FontLoader();
//     const textMeshes = [];
//     const cssObjects = [];

//     fontLoader.load("fonts/Roboto Black_Regular.json", function (font) {
//       function addTextToSpherePoint(index, sphere, pointIndex, text, link, htmlContent) {
//         const geometry = new TextGeometry(text, {
//           font: font,
//           size: 14,
//           height: 0.1,
//         });
//         geometry.computeBoundingBox();

//         let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
//         let height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

//         const distanceFromSurface = 180;
//         const pointOnSurface = new THREE.Vector3(
//           sphere.geometry.attributes.position.array[pointIndex * 3] - width / 2,
//           sphere.geometry.attributes.position.array[pointIndex * 3 + 1] - height / 2,
//           sphere.geometry.attributes.position.array[pointIndex * 3 + 2]
//         );

//         const point = pointOnSurface
//           .clone()
//           .normalize()
//           .multiplyScalar(distanceFromSurface + width);

//         const material = new THREE.MeshBasicMaterial({ color: "#fefefe" });
//         const mesh = new THREE.Mesh(geometry, material);
//         mesh.userData = {
//           index,
//           text,
//           link,
//           position: [
//             sphere.geometry.attributes.position.array[pointIndex * 3],
//             sphere.geometry.attributes.position.array[pointIndex * 3 + 1] - height,
//             sphere.geometry.attributes.position.array[pointIndex * 3 + 2],
//           ],
//         };

//         mesh.position.copy(point);
//         sphere.add(mesh);

//         const hitboxMaterial = new THREE.MeshBasicMaterial({
//           color: "#fefefe",
//           opacity: 0.3,
//           transparent: true,
//         });

//         const hitboxSize = geometry.boundingBox.getSize(new THREE.Vector3());
//         const hitboxGeometry = new THREE.BoxGeometry(
//           hitboxSize.x * 1.2,
//           hitboxSize.y * 1.4,
//           1
//         );
//         const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
//         hitbox.userData = mesh.userData;
//         hitbox.position.set(hitboxSize.x * 0.5, hitboxSize.y * 0.5, 0);

//         mesh.add(hitbox);

//         // 각 HTML 요소를 3D 씬에 추가하는 부분
//         const element = document.createElement('div');
//         element.innerHTML = renderToString(htmlContent);
//         element.style.pointerEvents = 'auto';
//         const cssObject = new CSS3DObject(element);
//         cssObject.position.copy(point);
//         // scene.add(cssObject);

//         cssObjects.push(cssObject); // CSS3DObject 인스턴스를 배열에 추가

//         textMeshes.push(mesh);
//       }

//       // 3의 배수의 인덱스를 넣어줘야 한다. (배열 형태 때문에);
//       addTextToSpherePoint(
//         0,
//         particlSystem,
//         1209,
//         "About",
//         "https://naver.com",
//         <TextStyledCompo><p>안녕하세요</p></TextStyledCompo>
//       );
//       addTextToSpherePoint(
//         1,
//         particlSystem,
//         1521,
//         "Service",
//         "https://naver.com",
//         <TextStyledCompo></TextStyledCompo>
//       );
//       addTextToSpherePoint(
//         2,
//         particlSystem,
//         2401,
//         "Contact",
//         "https://naver.com",
//         <TextStyledCompo></TextStyledCompo>
//       );
//     });

//     let raycaster = new THREE.Raycaster();
//     let mouse = new THREE.Vector2();

//     let isDragging = false;
//     let mouseDownPos = { x: 0, y: 0 };
//     const moveThreshold = 3;

//     window.addEventListener("mousedown", (event) => {
//       mouseDownPos.x = event.clientX;
//       mouseDownPos.y = event.clientY;
//       isDragging = false;
//     });

//     window.addEventListener("mousemove", () => {
//       isDragging = true;
//     });

//     let smoothMoveSpeed = 0.009; // 카메라 이동 속도 (조정 가능)
//     let orbitRadius = 40; // 회전 반경 (조정 가능)
//     let distanceFromSurface = 3000; // 구 표면으로부터의 거리 (조정 가능)
//     let isMoving = false;
//     let targetPosition = null;

//     window.addEventListener("click", (event) => {
//       event.stopPropagation();

//       if (
//         !isDragging ||
//         (Math.abs(mouseDownPos.x - event.clientX) < moveThreshold &&
//           Math.abs(mouseDownPos.y - event.clientY) < moveThreshold)
//       ) {
//         mouse.x = ((event.clientX - containerRect.left) / containerRect.width) * 2 - 1;
//         mouse.y = -((event.clientY - containerRect.top) / containerRect.height) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const intersects = raycaster.intersectObjects(textMeshes);

//         if (intersects.length > 0) {
//           const clickedMesh = intersects[0].object;
//           const points = new THREE.Vector3(
//             clickedMesh.userData.position[0],
//             clickedMesh.userData.position[1],
//             clickedMesh.userData.position[2]
//           );
//           console.log('clickedMesh', clickedMesh)
//           const direction = points.clone().normalize();

//           const distanceToTarget = orbitRadius + distanceFromSurface;
//           targetPosition = direction.multiplyScalar(distanceToTarget);
//           isMoving = true;
//           controls.autoRotate = false;
//           controls.update();
//         }
//       }
//     });

//     const animate = () => {
//       requestAnimationFrame(animate);

//       if (isMoving) {
//         // 목표 위치로 카메라 이동
//         console.log('camera.position.distanceTo(targetPosition)', camera.position.distanceTo(targetPosition))
//         console.log('targetPosition', targetPosition)
//         camera.position.lerp(targetPosition, smoothMoveSpeed);

//         if (camera.position.distanceTo(targetPosition) < 10) {
//           // 이동 완료 후 상태 초기화
//           isMoving = false;
//           console.log('done')
//           // controls.autoRotate = true;
//           camera.position.lerp(new THREE.Vector3(0, 0, 0), smoothMoveSpeed);
//         }
//       }

//       textMeshes.forEach((mesh) => {
//         mesh.lookAt(camera.position);
//         mesh.quaternion.copy(camera.quaternion);
//       });

//       cssObjects.forEach((object) => {
//         object.lookAt(camera.position);
//         object.quaternion.copy(camera.quaternion);

//       });

//       controls.update();
//       cssRenderer.render(scene, camera);
//       renderer.render(scene, camera);
//     };

//     animate();
//   }, []);

//   return (
//     <ThreeContainer id="three-container" ref={containerRef}>
//       <CanvasContainer id="three-canvas" ref={canvasRef} />
//     </ThreeContainer>
//   );
// }

// export default ThreeComponent;
