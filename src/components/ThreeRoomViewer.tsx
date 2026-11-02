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
  Layers,
  Eye,
  Play,
  Pause,
  Compass,
} from "lucide-react";

type RoomType = "living" | "bedroom" | "kitchen";
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

const ROOM_HOTSPOTS: Record<RoomType, Hotspot[]> = {
  living: [
    {
      id: "millwork",
      name: "Acoustic Fluted Millwork",
      position: [0, 2.2, -4.3],
      cameraTarget: [0, 2, -4],
      cameraPosition: [0, 2.4, -1.2],
      description: "Custom tongue-and-groove American walnut acoustic panels with concealed vibration isolation.",
      spec: "Sound absorption NRC 0.85 · Hand-rubbed matte botanical oil",
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
  ],
  bedroom: [
    {
      id: "headboard",
      name: "Ribbed Headboard Wall",
      position: [0, 2, -4.2],
      cameraTarget: [0, 1.8, -4],
      cameraPosition: [0, 2.2, -1],
      description: "Full-height vertical ribbed paneling with embedded touch-dimming reading lights and acoustic backing.",
      spec: "Fluted American Oak · Integrated USB-C & Dali smart switches",
    },
    {
      id: "bed",
      name: "Floating Platform Bed",
      position: [0, 0.5, -1.5],
      cameraTarget: [0, 0.6, -1.5],
      cameraPosition: [2, 1.8, 1.2],
      description: "Low-profile Japanese-inspired cantilevered bed frame with hidden perimeter floor glow.",
      spec: "Solid Oak & Belgian Crema Linen Upholstery",
    },
    {
      id: "nightstand",
      name: "Cantilevered Nightstands",
      position: [-2.2, 0.6, -2.5],
      cameraTarget: [-2.2, 0.6, -2.5],
      cameraPosition: [-1.2, 1.5, -0.8],
      description: "Seamless mitered marble drawer fronts with push-latch silent Blum hardware.",
      spec: "Carrara / Viola Marble Slab · Soft-close concealed slide",
    },
  ],
  kitchen: [
    {
      id: "island",
      name: "Waterfall Island Monolith",
      position: [0, 0.9, 0],
      cameraTarget: [0, 0.9, 0],
      cameraPosition: [2.2, 1.8, 2],
      description: "Seamless bookmatched stone island with integrated flush induction hob and breakfast seating overhang.",
      spec: "3.2m Monolithic Slab · 60mm Mitered Apron Edge",
    },
    {
      id: "gantry",
      name: "Suspended Brass Gantry",
      position: [0, 3.2, 0],
      cameraTarget: [0, 3.0, 0],
      cameraPosition: [1.5, 2.8, 1.5],
      description: "Architectural ceiling-suspended brass rack for artisanal stemware with integrated directional micro-spots.",
      spec: "Hand-burnished Champagne Brass · 3000K Focused Downlights",
    },
    {
      id: "tambour",
      name: "Tambour Bar Base",
      position: [0, 0.5, 0.4],
      cameraTarget: [0, 0.5, 0.4],
      cameraPosition: [1.2, 1.2, 1.6],
      description: "Continuous convex timber fluting curving gracefully around the guest seating elevation.",
      spec: "Solid Rift Oak Tambour · Stain-resistant natural wax",
    },
  ],
};

export default function ThreeRoomViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeRoom, setActiveRoom] = useState<RoomType>("living");
  const [lightingMode, setLightingMode] = useState<LightingMode>("golden");
  const [materialTheme, setMaterialTheme] = useState<MaterialTheme>("carrara");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isTourRunning, setIsTourRunning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // References to 3D instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const roomGroupsRef = useRef<{
    living: THREE.Group;
    bedroom: THREE.Group;
    kitchen: THREE.Group;
  } | null>(null);

  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    sun: THREE.DirectionalLight;
    cove: THREE.PointLight;
    floorLamp: THREE.PointLight;
  } | null>(null);

  const dynamicMatsRef = useRef<{
    stone?: THREE.MeshStandardMaterial;
    metal?: THREE.MeshStandardMaterial;
    fabric?: THREE.MeshStandardMaterial;
    accent?: THREE.MeshStandardMaterial;
    wood?: THREE.MeshStandardMaterial;
    floor?: THREE.MeshStandardMaterial;
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
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2.5;
    controls.maxDistance = 11;
    controls.target.set(0, 1.2, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

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

    // Shared Materials
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x22201d, roughness: 0.35, metalness: 0.1 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3d24, roughness: 0.5 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xf2efe9, roughness: 0.25, metalness: 0.1 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xc9a34e, roughness: 0.3, metalness: 0.8 });
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0xded8cb, roughness: 0.85 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0x8a705a, roughness: 0.8 });

    dynamicMatsRef.current = {
      floor: floorMat,
      wood: woodMat,
      stone: stoneMat,
      metal: metalMat,
      fabric: fabricMat,
      accent: accentMat,
    };

    // Common Architectural Shell (Floor, Ceiling, Window, Walls)
    const shellGroup = new THREE.Group();

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    shellGroup.add(floor);

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), new THREE.MeshStandardMaterial({ color: 0x18191c, roughness: 0.8 }));
    backWall.position.set(0, 2.5, -4.5);
    backWall.receiveShadow = true;
    shellGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), new THREE.MeshStandardMaterial({ color: 0x1f2125, roughness: 0.85 }));
    leftWall.position.set(-5, 2.5, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    shellGroup.add(leftWall);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.MeshStandardMaterial({ color: 0x131417, roughness: 0.9 }));
    ceiling.position.set(0, 4.6, 0);
    ceiling.rotation.x = Math.PI / 2;
    shellGroup.add(ceiling);

    // Glass Window Wall
    const windowGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 4.2),
      new THREE.MeshPhysicalMaterial({ color: 0x88ccff, transmission: 0.9, opacity: 1, transparent: true, roughness: 0.1, ior: 1.5 })
    );
    windowGlass.position.set(4.8, 2.2, 0);
    windowGlass.rotation.y = -Math.PI / 2;
    shellGroup.add(windowGlass);

    [-3, -1, 1, 3].forEach((z) => {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8 }));
      mullion.position.set(4.78, 2.2, z);
      shellGroup.add(mullion);
    });

    scene.add(shellGroup);

    // Room 1: Living Salon Group
    const livingGroup = new THREE.Group();

    // Slat Wall
    for (let i = 0; i < 40; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.6, 0.04), woodMat);
      slat.position.set(-2.4 + i * 0.12, 2.3, -4.45);
      slat.castShadow = true;
      livingGroup.add(slat);
    }

    // Rug
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 4.4), new THREE.MeshStandardMaterial({ color: 0x3d3935, roughness: 0.9 }));
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, 0.2);
    rug.receiveShadow = true;
    livingGroup.add(rug);

    // Sofa
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 1.2), fabricMat);
    sofaBase.position.set(0, 0.25, -1.8);
    sofaBase.castShadow = true;
    livingGroup.add(sofaBase);

    [-1.15, 0, 1.15].forEach((x) => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.28, 1.1), fabricMat);
      seat.position.set(x, 0.52, -1.8);
      seat.castShadow = true;
      livingGroup.add(seat);
    });

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.65, 0.35), fabricMat);
    sofaBack.position.set(0, 0.8, -2.3);
    sofaBack.castShadow = true;
    livingGroup.add(sofaBack);

    // Pillows
    [-1.2, 1.2].forEach((x, idx) => {
      const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.2), accentMat);
      pillow.position.set(x, 0.75, -2.05);
      pillow.rotation.y = idx === 0 ? 0.2 : -0.2;
      pillow.castShadow = true;
      livingGroup.add(pillow);
    });

    // Coffee Monolith
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 0.9), stoneMat);
    tableTop.position.set(0, 0.42, 0);
    tableTop.castShadow = true;
    livingGroup.add(tableTop);

    [-0.55, 0.55].forEach((x) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.7), metalMat);
      leg.position.set(x, 0.19, 0);
      leg.castShadow = true;
      livingGroup.add(leg);
    });

    // Decorative Book & Bowl
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.1, 0.08, 24), new THREE.MeshStandardMaterial({ color: 0x242426, roughness: 0.6 }));
    bowl.position.set(-0.4, 0.52, 0.1);
    livingGroup.add(bowl);

    const book = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.04, 0.24), metalMat);
    book.position.set(0.35, 0.5, -0.08);
    book.rotation.y = 0.25;
    livingGroup.add(book);

    // Lounge Chair
    const chairSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 0.25, 24), new THREE.MeshStandardMaterial({ color: 0x222429, roughness: 0.65 }));
    chairSeat.position.set(1.9, 0.35, 0.4);
    chairSeat.castShadow = true;
    livingGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 24, 1, true, 0, Math.PI), new THREE.MeshStandardMaterial({ color: 0x222429, roughness: 0.65 }));
    chairBack.position.set(1.9, 0.65, 0.4);
    chairBack.rotation.y = Math.PI * 0.75;
    livingGroup.add(chairBack);

    // Floor Lamp
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.2, 16), metalMat);
    lampStem.position.set(-2.8, 1.1, 1.2);
    livingGroup.add(lampStem);

    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.35, 24, 1, true), metalMat);
    lampShade.position.set(-2.8, 2.15, 1.2);
    lampShade.rotation.z = 0.3;
    livingGroup.add(lampShade);

    // Pendant Ring
    const pendantRing = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.025, 16, 48), metalMat);
    pendantRing.position.set(0, 3.4, 0);
    pendantRing.rotation.x = Math.PI / 2;
    livingGroup.add(pendantRing);

    scene.add(livingGroup);

    // Room 2: Master Suite Group
    const bedroomGroup = new THREE.Group();
    bedroomGroup.visible = false;

    // Ribbed Headboard Backing
    const headboard = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.4, 0.15), woodMat);
    headboard.position.set(0, 1.5, -4.3);
    headboard.castShadow = true;
    bedroomGroup.add(headboard);

    // Platform Bed Base
    const bedPlatform = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.3, 3.4), woodMat);
    bedPlatform.position.set(0, 0.2, -2.4);
    bedPlatform.castShadow = true;
    bedroomGroup.add(bedPlatform);

    // Plush Mattress & Duvet
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.4, 3.0), fabricMat);
    mattress.position.set(0, 0.5, -2.4);
    mattress.castShadow = true;
    bedroomGroup.add(mattress);

    // Pillows (4 luxury hotel pillows)
    [-0.7, 0.7].forEach((x) => {
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 0.45), fabricMat);
      p1.position.set(x, 0.8, -3.4);
      p1.rotation.x = 0.2;
      bedroomGroup.add(p1);

      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.2, 0.35), accentMat);
      p2.position.set(x, 0.85, -3.1);
      p2.rotation.x = 0.3;
      bedroomGroup.add(p2);
    });

    // Cantilevered Nightstands
    [-2.0, 2.0].forEach((x) => {
      const ns = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.5), stoneMat);
      ns.position.set(x, 0.55, -4.0);
      ns.castShadow = true;
      bedroomGroup.add(ns);

      // Dropping Pendant Light above nightstand
      const dropCord = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 2.2, 8), metalMat);
      dropCord.position.set(x, 2.5, -4.0);
      bedroomGroup.add(dropCord);

      const dropOrb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffe6a3 }));
      dropOrb.position.set(x, 1.4, -4.0);
      bedroomGroup.add(dropOrb);
    });

    // Bedroom Area Rug
    const bedRug = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 4.6), new THREE.MeshStandardMaterial({ color: 0x33302c, roughness: 0.9 }));
    bedRug.rotation.x = -Math.PI / 2;
    bedRug.position.set(0, 0.01, -1.8);
    bedRug.receiveShadow = true;
    bedroomGroup.add(bedRug);

    scene.add(bedroomGroup);

    // Room 3: Kitchen & Island Bar Group
    const kitchenGroup = new THREE.Group();
    kitchenGroup.visible = false;

    // Waterfall Island Monolith
    const islandCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 1.4), stoneMat);
    islandCounter.position.set(0, 0.92, 0);
    islandCounter.castShadow = true;
    kitchenGroup.add(islandCounter);

    // Waterfall sides (left & right dropping stone slabs)
    [-1.75, 1.75].forEach((x) => {
      const dropSlab = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 1.4), stoneMat);
      dropSlab.position.set(x, 0.425, 0);
      dropSlab.castShadow = true;
      kitchenGroup.add(dropSlab);
    });

    // Fluted Tambour Base under island
    const islandBase = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.85, 1.1), woodMat);
    islandBase.position.set(0, 0.425, 0);
    kitchenGroup.add(islandBase);

    // Bar Stools (3 modern stools)
    [-1.0, 0, 1.0].forEach((x) => {
      const stoolSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.08, 24), accentMat);
      stoolSeat.position.set(x, 0.65, 0.95);
      stoolSeat.castShadow = true;
      kitchenGroup.add(stoolSeat);

      const stoolStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 12), metalMat);
      stoolStem.position.set(x, 0.31, 0.95);
      kitchenGroup.add(stoolStem);

      const stoolBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.03, 24), metalMat);
      stoolBaseMesh.position.set(x, 0.015, 0.95);
      kitchenGroup.add(stoolBaseMesh);
    });

    // Overhead Brass Gantry & Linear Light
    const gantryFrame = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.05, 0.8), metalMat);
    gantryFrame.position.set(0, 3.2, 0);
    kitchenGroup.add(gantryFrame);

    [-1.6, 1.6].forEach((x) => {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.35, 8), metalMat);
      rod.position.set(x, 3.9, 0);
      kitchenGroup.add(rod);
    });

    scene.add(kitchenGroup);

    roomGroupsRef.current = {
      living: livingGroup,
      bedroom: bedroomGroup,
      kitchen: kitchenGroup,
    };

    setIsLoading(false);

    // 8. Animation Loop
    let animationFrameId: number;
    let tourTime = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      pendantRing.rotation.z += delta * 0.15;

      // Cinematic Guided Tour Logic
      if (isTourRunning && cameraRef.current && controlsRef.current) {
        tourTime += delta * 0.22;
        const radius = 6.2;
        const camX = Math.sin(tourTime) * radius;
        const camZ = Math.cos(tourTime) * radius;
        const camY = 2.4 + Math.sin(tourTime * 1.5) * 0.8;

        cameraRef.current.position.set(camX, camY, camZ);
        controlsRef.current.target.set(Math.sin(tourTime * 0.5) * 0.5, 1.2, 0);
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !renderer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Room Switching
  useEffect(() => {
    if (!roomGroupsRef.current) return;
    const { living, bedroom, kitchen } = roomGroupsRef.current;

    living.visible = activeRoom === "living";
    bedroom.visible = activeRoom === "bedroom";
    kitchen.visible = activeRoom === "kitchen";

    setActiveHotspot(null);
  }, [activeRoom]);

  // Lighting Mode Updates
  useEffect(() => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { ambient, sun, cove, floorLamp } = lightsRef.current;

    if (lightingMode === "golden") {
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

  // Material Theme Updates
  useEffect(() => {
    const mats = dynamicMatsRef.current;
    if (!mats.stone || !mats.metal || !mats.fabric || !mats.accent || !mats.wood || !mats.floor)
      return;

    if (materialTheme === "carrara") {
      mats.stone.color.setHex(0xf2efe9);
      mats.stone.roughness = 0.2;
      mats.metal.color.setHex(0xc9a34e);
      mats.fabric.color.setHex(0xded8cb);
      mats.accent.color.setHex(0x8a705a);
      mats.wood.color.setHex(0x5a3d24);
      mats.floor.color.setHex(0x22201d);
    } else if (materialTheme === "smoked_oak") {
      mats.stone.color.setHex(0x1a1917);
      mats.stone.roughness = 0.15;
      mats.metal.color.setHex(0x36383e);
      mats.fabric.color.setHex(0x282a2e);
      mats.accent.color.setHex(0xc59f5b);
      mats.wood.color.setHex(0x1e1916);
      mats.floor.color.setHex(0x151618);
    } else {
      mats.stone.color.setHex(0xd9cdb8);
      mats.stone.roughness = 0.45;
      mats.metal.color.setHex(0x8c5b3b);
      mats.fabric.color.setHex(0xc8beaf);
      mats.accent.color.setHex(0xa84f32);
      mats.wood.color.setHex(0x855835);
      mats.floor.color.setHex(0x3a332a);
    }
  }, [materialTheme]);

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      setIsTourRunning(false);
      const nextState = !isAutoRotating;
      controlsRef.current.autoRotate = nextState;
      setIsAutoRotating(nextState);
    }
  };

  const toggleTour = () => {
    setIsTourRunning(!isTourRunning);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
      setIsAutoRotating(false);
    }
    setActiveHotspot(null);
  };

  const resetCamera = () => {
    setIsTourRunning(false);
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.autoRotate = false;
      setIsAutoRotating(false);
      setActiveHotspot(null);

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

  const selectHotspot = (hotspot: Hotspot) => {
    setIsTourRunning(false);
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

  const currentHotspots = ROOM_HOTSPOTS[activeRoom];

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      className="relative w-full h-[620px] md:h-[700px] rounded-3xl overflow-hidden border border-stone-800/80 bg-[#0A0B0E] shadow-2xl group select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {isLoading && (
        <div className="absolute inset-0 bg-[#0A0B0E] flex flex-col items-center justify-center gap-3 z-30">
          <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-stone-400 font-sans">
            Loading Three.js Spatial Engine...
          </p>
        </div>
      )}

      {/* Top Header: Room Selector & Tour Button */}
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none z-20">
        {/* Room Switcher Pills */}
        <div className="pointer-events-auto backdrop-blur-md bg-stone-900/85 border border-stone-700/70 rounded-full p-1 flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setActiveRoom("living")}
            className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition ${
              activeRoom === "living"
                ? "bg-amber-400 text-stone-950 font-semibold shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Living Salon
          </button>
          <button
            onClick={() => setActiveRoom("bedroom")}
            className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition ${
              activeRoom === "bedroom"
                ? "bg-amber-400 text-stone-950 font-semibold shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Master Suite
          </button>
          <button
            onClick={() => setActiveRoom("kitchen")}
            className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition ${
              activeRoom === "kitchen"
                ? "bg-amber-400 text-stone-950 font-semibold shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Kitchen Island
          </button>
        </div>

        {/* View Controls & Tour */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* 30s Guided Tour Button */}
          <button
            onClick={toggleTour}
            data-cursor="tour"
            className={`px-3 py-1.5 rounded-full border backdrop-blur-md text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition shadow-lg ${
              isTourRunning
                ? "bg-amber-400 text-stone-950 border-amber-300 font-semibold animate-pulse"
                : "bg-stone-900/85 border-amber-500/40 text-amber-300 hover:bg-stone-800"
            }`}
          >
            {isTourRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isTourRunning ? "Stop Tour" : "30s Tour"}</span>
          </button>

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

      {/* Hotspots Indicator Pills */}
      <div className="absolute left-4 bottom-24 md:bottom-6 z-20 flex flex-col gap-2 max-w-[280px] pointer-events-auto">
        <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium px-1 flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-amber-400" />
          Inspect Architectural Elements
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentHotspots.map((h) => {
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

      {/* Active Hotspot Inspector Card */}
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
