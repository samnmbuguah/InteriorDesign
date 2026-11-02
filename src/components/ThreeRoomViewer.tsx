"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Sun,
  Moon,
  Sunrise,
  RotateCcw,
  Sparkles,
  Maximize2,
  Info,
  Layers,
  ChevronRight,
  Eye,
} from "lucide-react";

type LightingMode = "golden" | "daylight" | "nocturne";
type MaterialTheme = "carrara" | "smoked_oak" | "travertine";

interface Hotspot {
  id: string;
  name: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  description: string;
  spec: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "millwork",
    name: "Acoustic Fluted Millwork",
    position: [0, 2.2, -4.3],
    cameraTarget: [0, 2, -4],
    cameraPosition: [0, 2.4, -1.2],
    description: "Custom tongue-and-groove American walnut acoustic panels with concealed vibration isolation.",
    spec: "Sound absorption coefficient NRC 0.85 · Matte hand-rubbed oil",
  },
  {
    id: "lighting",
    name: "Recessed Ambient Cove",
    position: [-2.8, 3.8, -1],
    cameraTarget: [-2.5, 3.5, -1],
    cameraPosition: [-1, 2.8, 1.5],
    description: "Concealed 2700K warm architectural LED strip washing vertical plaster in zero-glare soft luminance.",
    spec: "CRI 98+ · 24V Dimmable Dali Protocol · 1,400 lm/m",
  },
  {
    id: "table",
    name: "Sculptural Coffee Monolith",
    position: [0, 0.45, 0],
    cameraTarget: [0, 0.4, 0],
    cameraPosition: [1.8, 1.4, 1.8],
    description: "Precision waterjet-honed natural marble with chamfered cantilevered edges and brass understructure.",
    spec: "Custom 140x80cm monolith · Honed satin finish · Stain-sealed",
  },
  {
    id: "glazing",
    name: "Floor-to-Ceiling Glazing",
    position: [4.4, 2, 0],
    cameraTarget: [4.5, 2, 0],
    cameraPosition: [1.5, 2.2, 1],
    description: "Ultra-slim 20mm sightline thermal insulated fenestration framing lush outdoor tropical greenery.",
    spec: "Low-E Argon Double Glazing · Anodized Obsidian Bronze frame",
  },
];

export default function ThreeRoomViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [lightingMode, setLightingMode] = useState<LightingMode>("golden");
  const [materialTheme, setMaterialTheme] = useState<MaterialTheme>("carrara");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // References to mutable 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    sun: THREE.DirectionalLight;
    cove: THREE.PointLight;
    floorLamp: THREE.PointLight;
  } | null>(null);

  // References to materials that change dynamically
  const dynamicMaterialsRef = useRef<{
    tableTop?: THREE.MeshStandardMaterial;
    tableBase?: THREE.MeshStandardMaterial;
    sofaFabric?: THREE.MeshStandardMaterial;
    cushions?: THREE.MeshStandardMaterial;
    accentWall?: THREE.MeshStandardMaterial;
    flooring?: THREE.MeshStandardMaterial;
  }>({});

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c0d10);
    scene.fog = new THREE.FogExp2(0x0c0d10, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(4.5, 3.2, 6.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 4. Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath floor
    controls.minDistance = 2.5;
    controls.maxDistance = 11;
    controls.target.set(0, 1.2, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffbe76, 2.8);
    sunLight.position.set(6, 6, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const coveLight = new THREE.PointLight(0xffaa44, 2.2, 10, 1.5);
    coveLight.position.set(-2, 3.8, -3);
    scene.add(coveLight);

    const floorLamp = new THREE.PointLight(0xffd599, 1.8, 6, 1.2);
    floorLamp.position.set(-2.8, 1.8, 1.2);
    scene.add(floorLamp);

    lightsRef.current = {
      ambient: ambientLight,
      sun: sunLight,
      cove: coveLight,
      floorLamp: floorLamp,
    };

    // 6. Architectural Room Geometry & Furniture Construction
    const roomGroup = new THREE.Group();

    // Floor (Polished Parquet / Travertine)
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x22201d,
      roughness: 0.35,
      metalness: 0.1,
    });
    dynamicMaterialsRef.current.flooring = floorMat;
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Subtle area rug
    const rugGeo = new THREE.PlaneGeometry(5.2, 4.4);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0x3d3935,
      roughness: 0.9,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, 0.2);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // Back Wall with Acoustic Slat panels
    const backWallGeo = new THREE.PlaneGeometry(12, 5);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      roughness: 0.8,
    });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 2.5, -4.5);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Fluted Wood Slats Accent Panel (Procedural Geometry)
    const slatGroup = new THREE.Group();
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x6e4726,
      roughness: 0.5,
      metalness: 0.05,
    });
    dynamicMaterialsRef.current.accentWall = slatMat;

    const numSlats = 42;
    const slatWidth = 0.06;
    const slatHeight = 4.6;
    const slatDepth = 0.04;
    const slatGeo = new THREE.BoxGeometry(slatWidth, slatHeight, slatDepth);

    for (let i = 0; i < numSlats; i++) {
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(-2.5 + i * 0.12, 2.3, -4.45);
      slat.castShadow = true;
      slat.receiveShadow = true;
      slatGroup.add(slat);
    }
    roomGroup.add(slatGroup);

    // Left Wall with Architectural Cove
    const leftWallGeo = new THREE.PlaneGeometry(12, 5);
    const leftWallMat = new THREE.MeshStandardMaterial({
      color: 0x1f2125,
      roughness: 0.85,
    });
    const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWall.position.set(-5, 2.5, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // Ceiling with Recessed Drop
    const ceilingGeo = new THREE.PlaneGeometry(12, 12);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x131417,
      roughness: 0.9,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.set(0, 4.6, 0);
    ceiling.rotation.x = Math.PI / 2;
    roomGroup.add(ceiling);

    // Right Glass Wall & Mullions
    const glassFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const glassPaneMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    });

    const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(10, 4.2), glassPaneMat);
    windowGlass.position.set(4.8, 2.2, 0);
    windowGlass.rotation.y = -Math.PI / 2;
    roomGroup.add(windowGlass);

    // Window Mullions (vertical black columns)
    [-3, -1, 1, 3].forEach((z) => {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.4, 0.1), glassFrameMat);
      mullion.position.set(4.78, 2.2, z);
      mullion.castShadow = true;
      roomGroup.add(mullion);
    });

    // 7. Luxury Furniture
    // A. Main Architectural Sectional Sofa
    const sofaGroup = new THREE.Group();
    const sofaFabricMat = new THREE.MeshStandardMaterial({
      color: 0xded8cc, // Crema bouclé
      roughness: 0.85,
      metalness: 0.05,
    });
    dynamicMaterialsRef.current.sofaFabric = sofaFabricMat;

    // Sofa Base
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 1.2), sofaFabricMat);
    sofaBase.position.set(0, 0.25, -1.8);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    sofaGroup.add(sofaBase);

    // Sofa Seat Cushions (3 sections)
    [-1.15, 0, 1.15].forEach((x) => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.28, 1.1), sofaFabricMat);
      seat.position.set(x, 0.52, -1.8);
      seat.castShadow = true;
      seat.receiveShadow = true;
      sofaGroup.add(seat);
    });

    // Sofa Backrest
    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.65, 0.35), sofaFabricMat);
    sofaBack.position.set(0, 0.8, -2.3);
    sofaBack.castShadow = true;
    sofaBack.receiveShadow = true;
    sofaGroup.add(sofaBack);

    // Sofa Pillows
    const pillowMat = new THREE.MeshStandardMaterial({
      color: 0x8a705a, // Caramel velvet
      roughness: 0.8,
    });
    dynamicMaterialsRef.current.cushions = pillowMat;

    [-1.2, 1.2].forEach((x, idx) => {
      const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.2), pillowMat);
      pillow.position.set(x, 0.75, -2.05);
      pillow.rotation.y = idx === 0 ? 0.2 : -0.2;
      pillow.castShadow = true;
      sofaGroup.add(pillow);
    });

    roomGroup.add(sofaGroup);

    // B. Coffee Table Monolith (Stone & Metal)
    const tableGroup = new THREE.Group();
    const tableTopMat = new THREE.MeshStandardMaterial({
      color: 0xf0ede6, // Carrara White
      roughness: 0.25,
      metalness: 0.1,
    });
    const tableBaseMat = new THREE.MeshStandardMaterial({
      color: 0xc49d48, // Brushed Brass
      roughness: 0.3,
      metalness: 0.8,
    });
    dynamicMaterialsRef.current.tableTop = tableTopMat;
    dynamicMaterialsRef.current.tableBase = tableBaseMat;

    // Table Top Slab (chamfered box)
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 0.9), tableTopMat);
    tableTop.position.set(0, 0.42, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Table Legs (Brushed brass rectangular pedestals)
    [-0.55, 0.55].forEach((x) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.7), tableBaseMat);
      leg.position.set(x, 0.19, 0);
      leg.castShadow = true;
      tableGroup.add(leg);
    });

    // Coffee Table Decorative Artifacts
    // 1. Ceramic low bowl
    const bowlGeo = new THREE.CylinderGeometry(0.18, 0.1, 0.08, 24);
    const bowlMat = new THREE.MeshStandardMaterial({ color: 0x242426, roughness: 0.6 });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    bowl.position.set(-0.4, 0.52, 0.1);
    bowl.castShadow = true;
    tableGroup.add(bowl);

    // 2. Architectural Design Monograph books
    const bookGeo = new THREE.BoxGeometry(0.32, 0.04, 0.24);
    const bookMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.4 });
    const book = new THREE.Mesh(bookGeo, bookMat);
    book.position.set(0.35, 0.5, -0.08);
    book.rotation.y = 0.25;
    book.castShadow = true;
    tableGroup.add(book);

    roomGroup.add(tableGroup);

    // C. Sculptural Accent Lounge Chair
    const chairGroup = new THREE.Group();
    const chairMat = new THREE.MeshStandardMaterial({
      color: 0x222429,
      roughness: 0.65,
    });

    // Chair curved seat
    const chairSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 0.25, 24), chairMat);
    chairSeat.position.set(1.9, 0.35, 0.4);
    chairSeat.castShadow = true;
    chairGroup.add(chairSeat);

    // Chair curved back
    const chairBack = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 24, 1, true, 0, Math.PI), chairMat);
    chairBack.position.set(1.9, 0.65, 0.4);
    chairBack.rotation.y = Math.PI * 0.75;
    chairBack.castShadow = true;
    chairGroup.add(chairBack);

    // Chair slender brass legs
    [
      [1.6, 0.2],
      [2.2, 0.2],
      [1.6, 0.6],
      [2.2, 0.6],
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.015, 0.35, 12), tableBaseMat);
      leg.position.set(x, 0.175, z);
      leg.castShadow = true;
      chairGroup.add(leg);
    });

    roomGroup.add(chairGroup);

    // D. Architectural Floor Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-2.8, 0, 1.2);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.05, 24), tableBaseMat);
    lampBase.position.y = 0.025;
    lampGroup.add(lampBase);

    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.2, 16), tableBaseMat);
    lampStem.position.y = 1.1;
    lampGroup.add(lampStem);

    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.35, 24, 1, true), tableBaseMat);
    lampShade.position.y = 2.15;
    lampShade.rotation.z = 0.3;
    lampGroup.add(lampShade);

    // Glowing bulb sphere inside
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffe6a3 })
    );
    bulb.position.set(-0.06, 2.05, 0);
    lampGroup.add(bulb);

    roomGroup.add(lampGroup);

    // E. Floating Minimalist Pendant Above Table
    const pendantGroup = new THREE.Group();
    pendantGroup.position.set(0, 3.4, 0);

    const pendantCord = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 1.2, 8), tableBaseMat);
    pendantCord.position.y = 0.6;
    pendantGroup.add(pendantCord);

    // Sculptural Brass Ring / Disk
    const pendantRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.025, 16, 48),
      tableBaseMat
    );
    pendantRing.rotation.x = Math.PI / 2;
    pendantGroup.add(pendantRing);

    const pendantOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff0d0 })
    );
    pendantGroup.add(pendantOrb);

    roomGroup.add(pendantGroup);

    scene.add(roomGroup);
    setIsLoading(false);

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Gentle subtle breathing movement for the pendant light
      pendantRing.rotation.z += delta * 0.15;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !renderer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Lighting Presets dynamically
  useEffect(() => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { ambient, sun, cove, floorLamp } = lightsRef.current;

    if (lightingMode === "golden") {
      // Warm golden hour sunlight (2700K)
      sceneRef.current.background = new THREE.Color(0x110e0c);
      ambient.color.setHex(0xffeedd);
      ambient.intensity = 0.8;

      sun.color.setHex(0xffba70);
      sun.intensity = 3.2;
      sun.position.set(6, 4.5, 4);

      cove.color.setHex(0xff9f38);
      cove.intensity = 2.4;

      floorLamp.color.setHex(0xffca7a);
      floorLamp.intensity = 2.0;
    } else if (lightingMode === "daylight") {
      // Crisp 5500K Scandinavian daylight
      sceneRef.current.background = new THREE.Color(0x0e1115);
      ambient.color.setHex(0xe8f0f8);
      ambient.intensity = 1.1;

      sun.color.setHex(0xffffff);
      sun.intensity = 3.6;
      sun.position.set(5, 7, 3);

      cove.color.setHex(0xffdfb8);
      cove.intensity = 1.4;

      floorLamp.color.setHex(0xffe8c2);
      floorLamp.intensity = 1.2;
    } else {
      // Moody Nocturne (architectural drama & accent lights)
      sceneRef.current.background = new THREE.Color(0x07080a);
      ambient.color.setHex(0x1a202c);
      ambient.intensity = 0.35;

      sun.color.setHex(0x2a364a);
      sun.intensity = 0.6;
      sun.position.set(5, 3, 2);

      cove.color.setHex(0xff8c2b);
      cove.intensity = 3.5;

      floorLamp.color.setHex(0xffbe5c);
      floorLamp.intensity = 2.8;
    }
  }, [lightingMode]);

  // Update Materials dynamically
  useEffect(() => {
    const mats = dynamicMaterialsRef.current;
    if (!mats.tableTop || !mats.tableBase || !mats.sofaFabric || !mats.cushions || !mats.accentWall || !mats.flooring)
      return;

    if (materialTheme === "carrara") {
      // Carrara White & Champagne Brass
      mats.tableTop.color.setHex(0xf2efe9);
      mats.tableTop.roughness = 0.2;
      mats.tableBase.color.setHex(0xc9a34e); // Brass
      mats.sofaFabric.color.setHex(0xded8cb); // Crema bouclé
      mats.cushions.color.setHex(0x8a705a); // Caramel velvet
      mats.accentWall.color.setHex(0x5a3d24); // American Walnut
      mats.flooring.color.setHex(0x22201d);
    } else if (materialTheme === "smoked_oak") {
      // Smoked Oak & Charcoal Linen
      mats.tableTop.color.setHex(0x1a1917); // Nero Marquina
      mats.tableTop.roughness = 0.15;
      mats.tableBase.color.setHex(0x36383e); // Gunmetal
      mats.sofaFabric.color.setHex(0x282a2e); // Charcoal
      mats.cushions.color.setHex(0xc59f5b); // Ochre Gold
      mats.accentWall.color.setHex(0x1e1916); // Dark Fumed Oak
      mats.flooring.color.setHex(0x151618);
    } else {
      // Raw Travertine & Terracotta Velvet
      mats.tableTop.color.setHex(0xd9cdb8); // Travertine
      mats.tableTop.roughness = 0.45;
      mats.tableBase.color.setHex(0x8c5b3b); // Burnished Bronze
      mats.sofaFabric.color.setHex(0xc8beaf); // Raw Linen
      mats.cushions.color.setHex(0xa84f32); // Terracotta
      mats.accentWall.color.setHex(0x855835); // Teak Timber
      mats.flooring.color.setHex(0x3a332a);
    }
  }, [materialTheme]);

  // Toggle Auto-rotate
  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      const nextState = !isAutoRotating;
      controlsRef.current.autoRotate = nextState;
      setIsAutoRotating(nextState);
    }
  };

  // Reset Camera View
  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.autoRotate = false;
      setIsAutoRotating(false);
      setActiveHotspot(null);

      // Smooth camera reset
      const startPos = cameraRef.current.position.clone();
      const targetPos = new THREE.Vector3(4.5, 3.2, 6.2);
      const startTarget = controlsRef.current.target.clone();
      const targetTarget = new THREE.Vector3(0, 1.2, 0);

      let step = 0;
      const animateReset = () => {
        step += 0.05;
        if (step <= 1) {
          cameraRef.current?.position.lerpVectors(startPos, targetPos, step);
          controlsRef.current?.target.lerpVectors(startTarget, targetTarget, step);
          requestAnimationFrame(animateReset);
        } else {
          controlsRef.current?.target.copy(targetTarget);
        }
      };
      animateReset();
    }
  };

  // Focus on a specific hotspot
  const selectHotspot = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.autoRotate = false;
      setIsAutoRotating(false);

      const targetPos = new THREE.Vector3(...hotspot.cameraPosition);
      const targetTarget = new THREE.Vector3(...hotspot.cameraTarget);
      const startPos = cameraRef.current.position.clone();
      const startTarget = controlsRef.current.target.clone();

      let step = 0;
      const animateFocus = () => {
        step += 0.05;
        if (step <= 1) {
          cameraRef.current?.position.lerpVectors(startPos, targetPos, step);
          controlsRef.current?.target.lerpVectors(startTarget, targetTarget, step);
          requestAnimationFrame(animateFocus);
        } else {
          controlsRef.current?.target.copy(targetTarget);
        }
      };
      animateFocus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[680px] rounded-3xl overflow-hidden border border-stone-800/80 bg-[#0A0B0E] shadow-2xl group select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#0A0B0E] flex flex-col items-center justify-center gap-3 z-30">
          <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-stone-400 font-sans">
            Loading 3D Spatial Canvas...
          </p>
        </div>
      )}

      {/* Top Bar: Title & Instructions */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="pointer-events-auto backdrop-blur-md bg-stone-900/80 border border-stone-700/60 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-medium tracking-wider uppercase text-stone-200">
            Interactive 3D Spatial Lab
          </span>
          <span className="hidden sm:inline text-[10px] text-stone-400 border-l border-stone-700 pl-2">
            Drag to Orbit · Scroll to Zoom
          </span>
        </div>

        {/* View Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleAutoRotate}
            title={isAutoRotating ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
            className={`p-2 rounded-full border backdrop-blur-md transition-all ${
              isAutoRotating
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                : "bg-stone-900/80 border-stone-700 text-stone-300 hover:text-white"
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={resetCamera}
            title="Reset Perspective"
            className="p-2 rounded-full border border-stone-700 bg-stone-900/80 backdrop-blur-md text-stone-300 hover:text-white transition-all hover:border-stone-500"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hotspots Indicator Pills (Floating bottom-left) */}
      <div className="absolute left-4 bottom-24 md:bottom-6 z-20 flex flex-col gap-2 max-w-[280px] pointer-events-auto">
        <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium px-1 flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-amber-400" />
          Inspect Architectural Elements
        </div>
        <div className="flex flex-wrap gap-1.5">
          {HOTSPOTS.map((h) => {
            const isSelected = activeHotspot?.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => selectHotspot(h)}
                className={`text-[11px] px-3 py-1.5 rounded-full border backdrop-blur-md transition-all text-left flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-amber-500 text-black border-amber-400 font-medium shadow-md shadow-amber-500/20"
                    : "bg-stone-900/85 border-stone-700 text-stone-300 hover:border-amber-400/50 hover:text-amber-200"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-black" : "bg-amber-400"}`} />
                {h.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Hotspot Inspector Card (Center/Bottom Overlay) */}
      {activeHotspot && (
        <div className="absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[380px] z-20 pointer-events-auto backdrop-blur-xl bg-stone-950/90 border border-amber-500/40 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
                Architectural Specification
              </div>
              <h4 className="text-stone-100 font-serif text-lg leading-tight mt-0.5">
                {activeHotspot.name}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800 transition"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-stone-300 mt-2 leading-relaxed font-sans">
            {activeHotspot.description}
          </p>
          <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span className="text-stone-400 font-mono text-[10px]">
              {activeHotspot.spec}
            </span>
          </div>
        </div>
      )}

      {/* Floating Control Toolbar (Bottom Right) */}
      <div className="absolute right-4 bottom-4 z-20 flex flex-col md:flex-row items-end md:items-center gap-2 pointer-events-auto">
        {/* Material Finish Switcher */}
        <div className="backdrop-blur-md bg-stone-900/85 border border-stone-700 rounded-2xl p-1.5 flex items-center gap-1 shadow-xl">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 px-2 font-medium flex items-center gap-1">
            <Layers className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Finish:</span>
          </span>
          <button
            onClick={() => setMaterialTheme("carrara")}
            className={`px-2.5 py-1 text-[11px] rounded-xl transition ${
              materialTheme === "carrara"
                ? "bg-stone-100 text-stone-900 font-medium shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Carrara & Brass
          </button>
          <button
            onClick={() => setMaterialTheme("smoked_oak")}
            className={`px-2.5 py-1 text-[11px] rounded-xl transition ${
              materialTheme === "smoked_oak"
                ? "bg-stone-100 text-stone-900 font-medium shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Smoked Oak
          </button>
          <button
            onClick={() => setMaterialTheme("travertine")}
            className={`px-2.5 py-1 text-[11px] rounded-xl transition ${
              materialTheme === "travertine"
                ? "bg-stone-100 text-stone-900 font-medium shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Travertine
          </button>
        </div>

        {/* Lighting Mood Switcher */}
        <div className="backdrop-blur-md bg-stone-900/85 border border-stone-700 rounded-2xl p-1.5 flex items-center gap-1 shadow-xl">
          <button
            onClick={() => setLightingMode("golden")}
            title="Golden Hour (Warm 2700K)"
            className={`p-2 rounded-xl flex items-center gap-1 text-[11px] transition ${
              lightingMode === "golden"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Sunrise className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Golden</span>
          </button>
          <button
            onClick={() => setLightingMode("daylight")}
            title="Scandinavian Daylight (5500K)"
            className={`p-2 rounded-xl flex items-center gap-1 text-[11px] transition ${
              lightingMode === "daylight"
                ? "bg-sky-500/20 text-sky-200 border border-sky-500/40"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Day</span>
          </button>
          <button
            onClick={() => setLightingMode("nocturne")}
            title="Moody Nocturne (Architectural Night)"
            className={`p-2 rounded-xl flex items-center gap-1 text-[11px] transition ${
              lightingMode === "nocturne"
                ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/40"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nocturne</span>
          </button>
        </div>
      </div>
    </div>
  );
}
