"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { renderToString } from 'react-dom/server';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { shpereControlState } from "@/state/sphere";
import { commonState } from "@/state/common";

import styled from "styled-components";
import TWEEN from "@tweenjs/tween.js";
import { LessDepth } from "three";
import { media } from "./common/Component";

const ThreeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CanvasContainer = styled.canvas`
  width: 100%;
  height: 100%;
  ${media.tablet`
    width:100%;
    height:500px;
  `}
  ${media.mobile`
  width:100%;
    height:350px;
  `}
`;

const TextStyledCompo = styled.div`
  width: 100px;
  height: 50px;
  p {
    font-size: 14px;
  }
`;

function ThreeComponent({ renderState }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const handleClickRef = useRef();
  const cameraRef = useRef();
  const fontColor = "#cccccc";
  const bgColor = "#001C30";
  const sphereState = useRecoilValue(shpereControlState);
  const setSphereState = useSetRecoilState(shpereControlState);
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  });
  const [initCameraPosition, setInitCameraPosition] = useState({ x: 300, y: 300, z: 330 });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  const setCommonStateInfo = useSetRecoilState(commonState);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);



  useEffect(() => {
    const container = containerRef.current;
    let containerRect = container.getBoundingClientRect();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);

    cameraRef.current = new THREE.PerspectiveCamera(
      50,
      containerRect.width / containerRect.height,
      1,
      1000
    );

    if (windowSize.width < 500) {
      cameraRef.current.position.x = initCameraPosition.x * 1.1;
      cameraRef.current.position.y = initCameraPosition.y * 1.1;
      cameraRef.current.position.z = initCameraPosition.z * 1.1;
    } else {
      cameraRef.current.position.x = initCameraPosition.x;
      cameraRef.current.position.y = initCameraPosition.y;
      cameraRef.current.position.z = initCameraPosition.z;
    }

    const sphereGeo = new THREE.SphereGeometry(180, 64, 64);
    const sphereMat = new THREE.PointsMaterial({
      color: fontColor,
      size: 2,
    });

    const particleSystem = new THREE.Points(sphereGeo, sphereMat);
    scene.add(particleSystem);

    const canvas = document.getElementById("three-canvas");

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(containerRect.width, containerRect.height);

    renderer.domElement.style.position = 'absolute';
    container.appendChild(renderer.domElement);
    container.style.height = container.scrollHeight + 'px';

    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(containerRect.width, containerRect.height);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(cssRenderer.domElement);

    const controls = new OrbitControls(cameraRef.current, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.update();

    const fontLoader = new FontLoader();
    const textMeshes = [];
    const cssObjects = [];

    fontLoader.load("fonts/Roboto Black_Regular.json", function (font) {
      function addTextToSpherePoint(index, sphere, pointIndex, text, link, htmlContent) {
        const geometry = new TextGeometry(text, {
          font: font,
          size: 14,
          height: 0.1,
        });

        geometry.computeBoundingBox();
        geometry.center(); // Add this line to center the geometry


        const distanceFromSurface = 220;
        const pointOnSurface = new THREE.Vector3(
          sphere.geometry.attributes.position.array[pointIndex * 3],
          sphere.geometry.attributes.position.array[pointIndex * 3 + 1],
          sphere.geometry.attributes.position.array[pointIndex * 3 + 2]
        );

        const point = pointOnSurface
          .clone()
          .normalize()
          .multiplyScalar(distanceFromSurface);

        const material = new THREE.MeshBasicMaterial({ color: "#fefefe" });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(point);
        mesh.userData = {
          index,
          text,
          link,
          position: mesh.position.clone()
        };

        sphere.add(mesh);

        const hitboxMaterial = new THREE.MeshBasicMaterial({
          color: "#fefefe",
          opacity: 0.3,
          transparent: true,
        });

        const hitboxSize = geometry.boundingBox.getSize(new THREE.Vector3());
        const hitboxGeometry = new THREE.BoxGeometry(
          hitboxSize.x * 1.2,
          hitboxSize.y * 1.4,
          1
        );
        hitboxGeometry.center();

        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        hitbox.userData = mesh.userData;
        hitbox.position.set(0, 0, 0);
        mesh.add(hitbox);

        const element = document.createElement('div');
        element.innerHTML = renderToString(htmlContent);
        element.style.pointerEvents = 'auto';
        const cssObject = new CSS3DObject(element);
        cssObject.position.copy(point);

        cssObjects.push(cssObject);
        textMeshes.push(mesh);
      }

      addTextToSpherePoint(
        0,
        particleSystem,
        909,
        "About",
        "https://naver.com",
        <TextStyledCompo><p>안녕하세요</p></TextStyledCompo>
      );
      addTextToSpherePoint(
        1,
        particleSystem,
        1521,
        "Portfolio",
        "https://naver.com",
        <TextStyledCompo></TextStyledCompo>
      );
      addTextToSpherePoint(
        2,
        particleSystem,
        1603,
        "Contact",
        "https://naver.com",
        <TextStyledCompo></TextStyledCompo>
      );
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };
    const moveThreshold = 3;

    window.addEventListener("mousedown", (event) => {
      isDragging = false;
      if (
        Math.abs(event.clientX - mouseDownPos.x) < moveThreshold &&
        Math.abs(event.clientY - mouseDownPos.y) < moveThreshold
      ) {
        isDragging = true;
      }
    });

    const orbitRadius = 40;
    const distanceFromSurface = 400;
    let isMoving = false;
    let targetPosition = null;


    handleClickRef.current = (event) => {
      if (sphereState.active === true) {
        console.log('active')
        return
      };
      event.stopPropagation();
      if (!isDragging) {
        mouse.x = ((event.clientX - containerRect.left) / containerRect.width) * 2 - 1;
        mouse.y = -((event.clientY - containerRect.top) / containerRect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraRef.current);
        const intersects = raycaster.intersectObjects(textMeshes);

        if (intersects.length > 0) {
          const clickedMesh = intersects[0].object;
          const distanceToTarget = orbitRadius + distanceFromSurface;
          const direction = clickedMesh.userData.position.clone().normalize();
          const meshIndex = clickedMesh.userData.index;
          targetPosition = direction.multiplyScalar(distanceToTarget);
          controls.autoRotate = false;
          setSphereState((prev) => ({
            ...prev,
            active: true,
            index: meshIndex,
          }));
          const startVector = new THREE.Vector3().copy(cameraRef.current.position);
          if (isMoving === false) {
            new TWEEN.Tween(startVector)
              .to(targetPosition, 1000)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .onUpdate(() => {
                isMoving = true;
                cameraRef.current.position.copy(startVector);
                controls.update();
              })
              .onComplete(() => {
                isMoving = false;
                controls.autoRotate = true;
              })
              .start();
          }
        }
      }
    };


    const animate = () => {
      requestAnimationFrame(animate);

      textMeshes.forEach((mesh) => {
        mesh.lookAt(cameraRef.current.position);
        mesh.quaternion.copy(cameraRef.current.quaternion);
      });

      cssObjects.forEach((object) => {
        object.lookAt(cameraRef.current.position);
        object.quaternion.copy(cameraRef.current.quaternion);
      });

      TWEEN.update();
      controls.update();
      cssRenderer.render(scene, cameraRef.current);
      renderer.render(scene, cameraRef.current);
    };

    animate();
  }, [windowSize]);


  useEffect(() => {
    console.log('cameraRef.current', cameraRef.current)
  }, [cameraRef])

  useEffect(() => {
    if (sphereState.index === null) {
      const startVector = new THREE.Vector3().copy(cameraRef.current.position);
      const endVector = new THREE.Vector3(initCameraPosition.x, initCameraPosition.y, initCameraPosition.z);
      new TWEEN.Tween(startVector)
        .to(endVector, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          cameraRef.current.position.copy(startVector); // 카메라 위치 업데이트
        })
        .onComplete(() => {
        })
        .start();
    }
  }, [sphereState.index])


  useEffect(() => {

    setCommonStateInfo(prev => {
      return {
        ...prev,
        isLoading: false,
      }
    })

    const container = containerRef.current;
    const handleClickWithRef = (event) => {
      handleClickRef.current && handleClickRef.current(event);
    }

    if (sphereState.active === false) {
      container.addEventListener("click", handleClickWithRef);
    }


    return () => {
      container.removeEventListener("click", handleClickWithRef);
    };
  }, [sphereState.active]);

  return (
    <ThreeContainer id="three-container" ref={containerRef}>
      <CanvasContainer id="three-canvas" ref={canvasRef} />
    </ThreeContainer>
  );
}

export default ThreeComponent;
