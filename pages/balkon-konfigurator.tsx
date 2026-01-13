import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

// TypeScript Interfaces
interface BalconyConfig {
  type: 'anbau' | 'vorstell' | 'winkel' | 'lisenen' | 'haenge';
  width: number;
  depth: number;
  count: number;
  firstHeight: number;
  floorHeight: number;
  supportPosition: 'inside' | 'outside';
  supportMaterial: 'steel' | 'aluminum' | 'wood' | 'any';
  supportShape: 'round' | 'square';
  supportSurface: 'verzinkt' | 'pulver';
  supportColor: string;
  railingSurface: 'verzinkt' | 'pulver' | 'edelstahl';
  railingColor: string;
  railingFill: 'stab-rund' | 'stab-flach' | 'glas-klar' | 'glas-matt' | 'geschlossen' | 'strukturblech' | 'hpl';
  hplColor: string;
  floorType: string;
  hasRoof: boolean;
  roofHeight: number;
  roofMaterial: 'geschlossen' | 'glas-klar' | 'glas-matt';
  privacyLeft: boolean;
  privacyRight: boolean;
}

// Farbpalette
const COLORS = {
  verzinkt: 0x888888,
  anthrazit: 0x2F3941,
  greige: 0x848176,
  braun: 0x46342D,
  gruen: 0x0E4035,
  weiss: 0xF6F6F6,
  weissalu: 0xEEEEEE,
  edelstahl: 0xEEEEEE,
  holz: 0xD4A574,
  glas_klar: 0xFFFFFF,
  glas_matt: 0xF0F0F0
};

const FLOOR_COLORS: Record<string, number> = {
  'wood-larch': 0xD4A574,
  'wood-bangkirai': 0x8B6914,
  'wpc': 0x6B5B4F,
  'alu-silver': 0xF2F2F2,
  'alu-anthracite': 0x4A4A4A,
  'alu-brown': 0xB89A7A,
  'alu-yellow': 0xE6D8B8,
  'stone': 0x9E9E9E,
  'balkoplan': 0xE0E0E0
};

const HPL_COLORS: Record<string, number> = {
  'hpl-wood-1': 0x8B7355,
  'hpl-wood-2': 0xA0826D,
  'hpl-white': 0xFFFFFF,
  'hpl-grey-light': 0xE5E5E5,
  'hpl-grey-medium': 0x9E9E9E,
  'hpl-grey-dark': 0x616161,
  'hpl-black': 0x212121,
  'hpl-brown': 0x5D4037,
  'hpl-beige': 0xD7CCC8,
  'hpl-anthracite': 0x424242,
  'hpl-silver': 0xBDBDBD,
  'hpl-green': 0x4CAF50,
  'hpl-yellow': 0xFFD700,
  'hpl-yellow-light': 0xFFF9C4,
  'hpl-red': 0xD32F2F,
  'hpl-red-light': 0xEF5350,
  'hpl-orange': 0xFF6F00,
  'hpl-blue': 0x1976D2,
  'hpl-blue-light': 0x64B5F6,
  'hpl-turquoise': 0x00897B,
  'hpl-purple': 0x7B1FA2,
  'hpl-pink': 0xE91E63
};

export default function BalkonKonfigurator() {
  // State Management
  const [config, setConfig] = useState<BalconyConfig>({
    type: 'anbau',
    width: 4,
    depth: 1.5,
    count: 1,
    firstHeight: 3,
    floorHeight: 3,
    supportPosition: 'inside',
    supportMaterial: 'steel',
    supportShape: 'round',
    supportSurface: 'verzinkt',
    supportColor: 'anthrazit',
    railingSurface: 'verzinkt',
    railingColor: 'anthrazit',
    railingFill: 'stab-rund',
    hplColor: 'hpl-white',
    floorType: 'wood-larch',
    hasRoof: false,
    roofHeight: 3,
    roofMaterial: 'geschlossen',
    privacyLeft: false,
    privacyRight: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Three.js Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const balconyGroupRef = useRef<THREE.Group | null>(null);
  const wallRef = useRef<THREE.Mesh | null>(null);
  const groundRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Helper Functions
  const getSupportColor = useCallback(() => {
    if (config.supportMaterial === 'wood') {
      return 0x8B4513;
    }
    if (config.supportSurface === 'verzinkt') return COLORS.verzinkt;
    return COLORS[config.supportColor as keyof typeof COLORS] || COLORS.anthrazit;
  }, [config.supportMaterial, config.supportSurface, config.supportColor]);

  const getRailingColor = useCallback(() => {
    if (config.railingSurface === 'verzinkt') return COLORS.verzinkt;
    if (config.railingSurface === 'edelstahl') return COLORS.edelstahl;
    return COLORS[config.railingColor as keyof typeof COLORS] || COLORS.anthrazit;
  }, [config.railingSurface, config.railingColor]);

  // Three.js Initialization
  const initThreeJS = useCallback(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 20, 80);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 8, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(80, 80);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x7ec850,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    groundRef.current = ground;

    // Wall (wird dynamisch in updateBalconyModel aktualisiert)
    const wallGeometry = new THREE.BoxGeometry(20, 20, 0.3);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc }); // Eierschalenfarben
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 10, -0.15); // Wand bei z = -0.15 (wie in HTML)
    wall.receiveShadow = true;
    scene.add(wall);
    wallRef.current = wall;

    // Balcony Group
    const balconyGroup = new THREE.Group();
    scene.add(balconyGroup);
    balconyGroupRef.current = balconyGroup;

    // Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    setIsLoading(false);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize Three.js on mount
  useEffect(() => {
    initThreeJS();
    return () => {
      // Cleanup
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initThreeJS]);

  // Update 3D Model when config changes
  useEffect(() => {
    if (sceneRef.current && balconyGroupRef.current) {
      updateBalconyModel();
    }
  }, [config]);

  // Update Balcony Model
  const updateBalconyModel = useCallback(() => {
    if (!balconyGroupRef.current) return;

    // Clear existing model
    while (balconyGroupRef.current.children.length > 0) {
      const child = balconyGroupRef.current.children[0];
      balconyGroupRef.current.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    }

    // Update wall height dynamically
    if (wallRef.current && sceneRef.current) {
      const { count, firstHeight, floorHeight } = config;
      const totalHeight = firstHeight + (count - 1) * floorHeight + 10;
      
      // Remove old wall
      sceneRef.current.remove(wallRef.current);
      if (wallRef.current.geometry) wallRef.current.geometry.dispose();
      if (wallRef.current.material instanceof THREE.Material) wallRef.current.material.dispose();
      
      // Create new wall with correct height
      const wallGeometry = new THREE.BoxGeometry(20, totalHeight, 0.3);
      const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc }); // Eierschalenfarben
      const wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.position.set(0, totalHeight / 2, -0.15); // Wand bei z = -0.15
      wall.receiveShadow = true;
      sceneRef.current.add(wall);
      wallRef.current = wall;
      
      // Add windows for each balcony
      const windowGeometry = new THREE.PlaneGeometry(1.5, 2);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.6
      });
      
      for (let i = 0; i < count; i++) {
        const windowHeight = firstHeight + (i * floorHeight);
        
        const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
        window1.position.set(-3, windowHeight, 0.01);
        wall.add(window1);
        
        const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
        window2.position.set(3, windowHeight, 0.01);
        wall.add(window2);
      }
    }

    // Create balconies based on config
    createBalconies();
  }, [config]);

  // Create Balconies
  const createBalconies = useCallback(() => {
    if (!balconyGroupRef.current) return;

    const { width, depth, count, firstHeight, floorHeight, type, supportPosition, hasRoof, roofHeight } = config;
    const topBalconyHeight = firstHeight + ((count - 1) * floorHeight);
    let totalSupportHeight = firstHeight + (count - 1) * floorHeight;

    // Calculate support heights for roof
    let supportHeights: number[] | null = null;
    if (hasRoof && count > 0) {
      const roofDepth = depth + 0.3;
      const roofAngle = (10 * Math.PI) / 180;
      const roofThickness = 0.1;
      const roofCenterY = topBalconyHeight + roofHeight - (Math.tan(roofAngle) * roofDepth) / 2;
      const roofCenterZ = 0.15;
      const roofThicknessVertical = (roofThickness / 2) * Math.cos(roofAngle);

      if (type === 'lisenen') {
        // Lisenenbalkon: Stützen an der Wand bis zur Dachunterseite an der Wand
        const wallZ = -depth / 2;
        const deltaZWall = wallZ - roofCenterZ;
        const heightLossAtWall = deltaZWall * Math.tan(roofAngle);
        const roofCenterAtWallY = roofCenterY - heightLossAtWall;
        const roofBottomAtWall = roofCenterAtWallY - roofThicknessVertical;
        totalSupportHeight = roofBottomAtWall;
      } else if (type === 'vorstell') {
        // Vorstellbalkon: Vordere und hintere Stützen haben unterschiedliche Höhen
        const rearOffset = 0.10;
        const frontSupportZ = supportPosition === 'inside' ? depth / 2 : depth / 2 + 0.06;
        const deltaZFront = frontSupportZ - roofCenterZ;
        const heightLossAtFront = deltaZFront * Math.tan(roofAngle);
        const roofCenterAtFrontY = roofCenterY - heightLossAtFront;
        const roofBottomAtFront = roofCenterAtFrontY - roofThicknessVertical;
        const frontSupportHeight = roofBottomAtFront;

        const rearSupportZ = -depth / 2 + rearOffset;
        const deltaZRear = rearSupportZ - roofCenterZ;
        const heightLossAtRear = deltaZRear * Math.tan(roofAngle);
        const roofCenterAtRearY = roofCenterY - heightLossAtRear;
        const roofBottomAtRear = roofCenterAtRearY - roofThicknessVertical;
        const rearSupportHeight = roofBottomAtRear;

        // Array: [vorne-links, vorne-rechts, hinten-links, hinten-rechts]
        supportHeights = [frontSupportHeight, frontSupportHeight, rearSupportHeight, rearSupportHeight];
      } else if (type === 'anbau') {
        // Anbaubalkon: Vordere Stützen bis zum Schnittpunkt
        const supportZLocal = supportPosition === 'inside' ? depth / 2 : depth / 2 + 0.06;
        const deltaZSupport = supportZLocal - roofCenterZ;
        const heightLossAtSupport = deltaZSupport * Math.tan(roofAngle);
        const roofCenterAtSupportY = roofCenterY - heightLossAtSupport;
        const roofBottomAtSupport = roofCenterAtSupportY - roofThicknessVertical;
        totalSupportHeight = roofBottomAtSupport;
      } else if (type === 'winkel') {
        // Winkelprofil: Bei 2 Stützen wie Anbaubalkon, bei 4 Stützen wie Vorstellbalkon
        if (supportPosition === 'inside') {
          // 2 Stützen vorne
          const supportZLocal = depth / 2;
          const deltaZSupport = supportZLocal - roofCenterZ;
          const heightLossAtSupport = deltaZSupport * Math.tan(roofAngle);
          const roofCenterAtSupportY = roofCenterY - heightLossAtSupport;
          const roofBottomAtSupport = roofCenterAtSupportY - roofThicknessVertical;
          totalSupportHeight = roofBottomAtSupport;
        } else {
          // 4 Stützen wie Vorstellbalkon
          const rearOffset = 0.10;
          const frontSupportZ = depth / 2;
          const deltaZFront = frontSupportZ - roofCenterZ;
          const heightLossAtFront = deltaZFront * Math.tan(roofAngle);
          const roofCenterAtFrontY = roofCenterY - heightLossAtFront;
          const roofBottomAtFront = roofCenterAtFrontY - roofThicknessVertical;
          const frontSupportHeight = roofBottomAtFront;

          const rearSupportZ = -depth / 2 + rearOffset;
          const deltaZRear = rearSupportZ - roofCenterZ;
          const heightLossAtRear = deltaZRear * Math.tan(roofAngle);
          const roofCenterAtRearY = roofCenterY - heightLossAtRear;
          const roofBottomAtRear = roofCenterAtRearY - roofThicknessVertical;
          const rearSupportHeight = roofBottomAtRear;

          supportHeights = [frontSupportHeight, frontSupportHeight, rearSupportHeight, rearSupportHeight];
        }
      }
    }

    // Create supports
    createSupports(totalSupportHeight, topBalconyHeight, supportHeights);

    // Create balconies
    for (let i = 0; i < count; i++) {
      const balconyHeight = firstHeight + (i * floorHeight);
      createSingleBalcony(balconyHeight, i === count - 1);
    }

    // Create roof
    if (hasRoof && count > 0) {
      createRoof(topBalconyHeight);
    }

    // Balkon positionieren: z = depth / 2 (wie in HTML-Datei)
    // Die hintere Kante ist dann bei z = 0, die Wand bei z = -0.15 (15cm dahinter)
    balconyGroupRef.current.position.z = depth / 2;
  }, [config, getSupportColor, getRailingColor]);

  // Create Supports
  const createSupports = useCallback((totalHeight: number, topBalconyHeight: number, individualHeights: number[] | null = null) => {
    if (!balconyGroupRef.current) return;

    const { type, width, depth, supportPosition, supportShape, supportMaterial } = config;
    const supportColor = getSupportColor();
    const supportMaterialMesh = new THREE.MeshStandardMaterial({ 
      color: supportColor,
      metalness: config.supportSurface === 'verzinkt' ? 0.4 : 0.5,
      roughness: config.supportSurface === 'verzinkt' ? 0.5 : 0.5
    });

    let supportPositions: [number, number][] = [];

    if (type === 'haenge') {
      return; // No supports for hanging balcony
    } else if (type === 'lisenen') {
      supportPositions = [
        [-width / 2 - 0.06, -depth / 2],
        [width / 2 + 0.06, -depth / 2]
      ];
    } else if (type === 'vorstell') {
      const rearOffset = 0.10;
      if (supportPosition === 'inside') {
        supportPositions = [
          [-width / 2, depth / 2],
          [width / 2, depth / 2],
          [-width / 2, -depth / 2 + rearOffset],
          [width / 2, -depth / 2 + rearOffset]
        ];
      } else {
        supportPositions = [
          [-width / 2 - 0.06, depth / 2],
          [width / 2 + 0.06, depth / 2],
          [-width / 2 - 0.06, -depth / 2 + rearOffset],
          [width / 2 + 0.06, -depth / 2 + rearOffset]
        ];
      }
    } else if (type === 'winkel') {
      if (supportPosition === 'inside') {
        supportPositions = [
          [-width / 2, depth / 2],
          [width / 2, depth / 2]
        ];
      } else {
        const rearOffset = 0.10;
        supportPositions = [
          [-width / 2, depth / 2],
          [width / 2, depth / 2],
          [-width / 2, -depth / 2 + rearOffset],
          [width / 2, -depth / 2 + rearOffset]
        ];
      }
    } else {
      // Anbaubalkon
      if (supportPosition === 'inside') {
        supportPositions = [
          [-width / 2, depth / 2],
          [width / 2, depth / 2]
        ];
      } else {
        supportPositions = [
          [-width / 2 - 0.06, depth / 2],
          [width / 2 + 0.06, depth / 2]
        ];
      }
    }

    // Create supports
    supportPositions.forEach(([x, z], index) => {
      const supportHeight = individualHeights ? individualHeights[index] : totalHeight;
      let supportGeometry: THREE.BufferGeometry;
      const supportRadius = 0.06;

      if (supportShape === 'round') {
        supportGeometry = new THREE.CylinderGeometry(supportRadius, supportRadius, supportHeight, 16);
      } else {
        const squareSize = 0.12;
        supportGeometry = new THREE.BoxGeometry(squareSize, supportHeight, squareSize);
      }

      const support = new THREE.Mesh(supportGeometry, supportMaterialMesh);
      support.position.set(x, supportHeight / 2, z);
      support.castShadow = true;
      balconyGroupRef.current!.add(support);
    });
  }, [config, getSupportColor]);

  // Create Single Balcony
  const createSingleBalcony = useCallback((height: number, isTop: boolean) => {
    if (!balconyGroupRef.current) return;

    const { width, depth, floorType, railingFill, railingSurface, railingColor, hplColor, privacyLeft, privacyRight } = config;
    const railingColorValue = getRailingColor();
    const floorColor = FLOOR_COLORS[floorType] || FLOOR_COLORS['wood-larch'];

    // Balkonplatte (Unterkonstruktion)
    const platformGeometry = new THREE.BoxGeometry(width, 0.15, depth);
    const platformMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      metalness: 0.3,
      roughness: 0.7
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = height;
    platform.castShadow = true;
    platform.receiveShadow = true;
    balconyGroupRef.current.add(platform);

    // Belag (verschiedene Materialien)
    const floorGeometry = new THREE.BoxGeometry(width - 0.2, 0.05, depth - 0.2);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: floorColor,
      metalness: floorType.startsWith('alu') ? 0.6 : (floorType === 'stone' ? 0.1 : 0.1),
      roughness: floorType === 'stone' ? 0.8 : (floorType.startsWith('alu') ? 0.3 : 0.5)
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = height + 0.1;
    floor.castShadow = true;
    balconyGroupRef.current.add(floor);

    // Railing
    createRailing(height, railingColorValue, railingFill, railingSurface);

    // Privacy screens
    if (privacyLeft) {
      createPrivacyScreen(height, 'left', railingColorValue, railingSurface);
    }
    if (privacyRight) {
      createPrivacyScreen(height, 'right', railingColorValue, railingSurface);
    }
  }, [config, getRailingColor]);

  // Create Railing
  const createRailing = useCallback((height: number, railingColor: number, railingFill: string, railingSurface: string) => {
    if (!balconyGroupRef.current) return;

    const { width, depth } = config;
    const railingHeight = 0.9;
    const handrailThickness = 0.08;
    const handrailTop = height + 1.0 + (handrailThickness / 2);

    let railingMaterial: THREE.Material;

    if (railingFill === 'glas-klar' || railingFill === 'glas-matt') {
      if (railingFill === 'glas-klar') {
        railingMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.3,
          transmission: 0.9,
          roughness: 0.05,
          metalness: 0,
          ior: 1.5,
          side: THREE.DoubleSide
        });
      } else {
        railingMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.7,
          metalness: 0.1,
          roughness: 0.6
        });
      }
    } else {
      railingMaterial = new THREE.MeshStandardMaterial({
        color: railingColor,
        metalness: railingSurface === 'edelstahl' ? 0.9 : 0.3,
        roughness: railingSurface === 'edelstahl' ? 0.1 : 0.7
      });
    }

    // Handrail
    const handrailGeometry = new THREE.CylinderGeometry(handrailThickness / 2, handrailThickness / 2, width, 8);
    const handrail = new THREE.Mesh(handrailGeometry, railingMaterial);
    handrail.rotation.z = Math.PI / 2;
    handrail.position.set(0, handrailTop, depth / 2);
    handrail.castShadow = true;
    balconyGroupRef.current.add(handrail);

    // Side handrails
    const sideRailGeometry = new THREE.BoxGeometry(0.08, 0.08, depth);
    const railLeft = new THREE.Mesh(sideRailGeometry, railingMaterial);
    railLeft.position.set(-width / 2, handrailTop, 0);
    railLeft.castShadow = true;
    balconyGroupRef.current.add(railLeft);

    const railRight = new THREE.Mesh(sideRailGeometry, railingMaterial);
    railRight.position.set(width / 2, handrailTop, 0);
    railRight.castShadow = true;
    balconyGroupRef.current.add(railRight);

    // Helper function for glass panels
    const calculateGlassPanels = (length: number, maxPanelWidth = 1.25, gap = 0.005) => {
      const numPanels = Math.ceil(length / maxPanelWidth);
      const numGaps = numPanels - 1;
      const totalGapWidth = numGaps * gap;
      const availableWidth = length - totalGapWidth;
      const panelWidth = availableWidth / numPanels;
      return { numPanels, panelWidth, gap };
    };

    // Railing panels based on fill type - FRONT
    if (railingFill === 'stab-rund' || railingFill === 'stab-flach') {
      const barHeight = handrailTop - height;
      const barGeometry = railingFill === 'stab-rund' 
        ? new THREE.CylinderGeometry(0.005, 0.005, barHeight, 8)
        : new THREE.BoxGeometry(0.01, barHeight, 0.04);
      
      const numBars = Math.floor(width / 0.15);
      for (let i = 0; i <= numBars; i++) {
        const bar = new THREE.Mesh(barGeometry, railingMaterial);
        const xPos = -width / 2 + (i * width / numBars);
        bar.position.set(xPos, height + barHeight / 2, depth / 2);
        bar.castShadow = true;
        balconyGroupRef.current.add(bar);
      }

      // LEFT SIDE
      const numSideBars = Math.floor(depth / 0.15);
      for (let i = 0; i <= numSideBars; i++) {
        const bar = new THREE.Mesh(barGeometry, railingMaterial);
        const zPos = -depth / 2 + (i * depth / numSideBars);
        bar.position.set(-width / 2, height + barHeight / 2, zPos);
        bar.castShadow = true;
        balconyGroupRef.current.add(bar);
      }

      // RIGHT SIDE
      for (let i = 0; i <= numSideBars; i++) {
        const bar = new THREE.Mesh(barGeometry, railingMaterial);
        const zPos = -depth / 2 + (i * depth / numSideBars);
        bar.position.set(width / 2, height + barHeight / 2, zPos);
        bar.castShadow = true;
        balconyGroupRef.current.add(bar);
      }
    } else if (railingFill === 'glas-klar' || railingFill === 'glas-matt') {
      // FRONT - Glass panels with gaps
      const frontPanels = calculateGlassPanels(width);
      for (let i = 0; i < frontPanels.numPanels; i++) {
        const panelGeo = new THREE.BoxGeometry(frontPanels.panelWidth, railingHeight, 0.01);
        const panel = new THREE.Mesh(panelGeo, railingMaterial);
        const startX = -width / 2;
        const xPos = startX + (i * (frontPanels.panelWidth + frontPanels.gap)) + (frontPanels.panelWidth / 2);
        panel.position.set(xPos, height + railingHeight / 2, depth / 2);
        panel.castShadow = true;
        balconyGroupRef.current.add(panel);
      }

      // LEFT SIDE
      const leftPanels = calculateGlassPanels(depth);
      for (let i = 0; i < leftPanels.numPanels; i++) {
        const panelGeo = new THREE.BoxGeometry(0.01, railingHeight, leftPanels.panelWidth);
        const panel = new THREE.Mesh(panelGeo, railingMaterial);
        const startZ = -depth / 2;
        const zPos = startZ + (i * (leftPanels.panelWidth + leftPanels.gap)) + (leftPanels.panelWidth / 2);
        panel.position.set(-width / 2, height + railingHeight / 2, zPos);
        panel.castShadow = true;
        balconyGroupRef.current.add(panel);
      }

      // RIGHT SIDE
      const rightPanels = calculateGlassPanels(depth);
      for (let i = 0; i < rightPanels.numPanels; i++) {
        const panelGeo = new THREE.BoxGeometry(0.01, railingHeight, rightPanels.panelWidth);
        const panel = new THREE.Mesh(panelGeo, railingMaterial);
        const startZ = -depth / 2;
        const zPos = startZ + (i * (rightPanels.panelWidth + rightPanels.gap)) + (rightPanels.panelWidth / 2);
        panel.position.set(width / 2, height + railingHeight / 2, zPos);
        panel.castShadow = true;
        balconyGroupRef.current.add(panel);
      }
    } else if (railingFill === 'geschlossen' || railingFill === 'strukturblech') {
      // FRONT
      const frontPlate = new THREE.Mesh(
        new THREE.BoxGeometry(width, railingHeight, 0.02),
        railingMaterial
      );
      frontPlate.position.set(0, height + railingHeight / 2, depth / 2);
      frontPlate.castShadow = true;
      balconyGroupRef.current.add(frontPlate);

      // LEFT SIDE
      const leftPlate = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, railingHeight, depth),
        railingMaterial
      );
      leftPlate.position.set(-width / 2, height + railingHeight / 2, 0);
      leftPlate.castShadow = true;
      balconyGroupRef.current.add(leftPlate);

      // RIGHT SIDE
      const rightPlate = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, railingHeight, depth),
        railingMaterial
      );
      rightPlate.position.set(width / 2, height + railingHeight / 2, 0);
      rightPlate.castShadow = true;
      balconyGroupRef.current.add(rightPlate);
    } else if (railingFill === 'hpl') {
      // HPL with panel math
      const hplColorValue = HPL_COLORS[config.hplColor] || HPL_COLORS['hpl-white'];
      const hplMaterial = new THREE.MeshStandardMaterial({
        color: hplColorValue,
        metalness: 0.1,
        roughness: 0.6
      });

      // FRONT
      const frontPanels = calculateGlassPanels(width);
      for (let i = 0; i < frontPanels.numPanels; i++) {
        const panelGeo = new THREE.BoxGeometry(frontPanels.panelWidth, railingHeight, 0.02);
        const panel = new THREE.Mesh(panelGeo, hplMaterial);
        const startX = -width / 2;
        const xPos = startX + (i * (frontPanels.panelWidth + frontPanels.gap)) + (frontPanels.panelWidth / 2);
        panel.position.set(xPos, height + railingHeight / 2, depth / 2);
        panel.castShadow = true;
        balconyGroupRef.current.add(panel);
      }

      // LEFT SIDE
      const leftPanels = calculateGlassPanels(depth);
      for (let i = 0; i < leftPanels.numPanels; i++) {
        const panelGeo = new THREE.BoxGeometry(0.02, railingHeight, leftPanels.panelWidth);
        const panel = new THREE.Mesh(panelGeo, hplMaterial);
        const startZ = -depth / 2;
        const zPos = startZ + (i * (leftPanels.panelWidth + leftPanels.gap)) + (leftPanels.panelWidth / 2);
        panel.position.set(-width / 2, height + railingHeight / 2, zPos);
        panel.castShadow = true;
        balconyGroupRef.current.add(panel);
      }

      // RIGHT SIDE
      const rightPanels = calculateGlassPanels(depth);
      for (let i = 0; i < rightPanels.numPanels; i++) {
        const panelGeo = new THREE.BoxGeometry(0.02, railingHeight, rightPanels.panelWidth);
        const panel = new THREE.Mesh(panelGeo, hplMaterial);
        const startZ = -depth / 2;
        const zPos = startZ + (i * (rightPanels.panelWidth + rightPanels.gap)) + (rightPanels.panelWidth / 2);
        panel.position.set(width / 2, height + railingHeight / 2, zPos);
        panel.castShadow = true;
        balconyGroupRef.current.add(panel);
      }
    }
  }, [config]);

  // Create Privacy Screen
  const createPrivacyScreen = useCallback((height: number, side: 'left' | 'right', color: number, surface: string) => {
    if (!balconyGroupRef.current) return;

    const { width, depth } = config;
    const railingHeight = 0.9;
    const upperHeight = 1.0;
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: surface === 'edelstahl' ? 0.9 : 0.3,
      roughness: surface === 'edelstahl' ? 0.1 : 0.7
    });

    const xPos = side === 'left' ? -width / 2 : width / 2;

    // Lower part
    const lowerGeo = new THREE.BoxGeometry(0.02, railingHeight, depth);
    const lowerPanel = new THREE.Mesh(lowerGeo, material);
    lowerPanel.position.set(xPos, height + railingHeight / 2, 0);
    lowerPanel.castShadow = true;
    balconyGroupRef.current.add(lowerPanel);

    // Upper part
    const upperGeo = new THREE.BoxGeometry(0.02, upperHeight, depth);
    const upperPanel = new THREE.Mesh(upperGeo, material);
    upperPanel.position.set(xPos, height + railingHeight + upperHeight / 2, 0);
    upperPanel.castShadow = true;
    balconyGroupRef.current.add(upperPanel);
  }, [config]);

  // Create Roof
  const createRoof = useCallback((topHeight: number) => {
    if (!balconyGroupRef.current) return;

    const { width, depth, roofHeight, roofMaterial } = config;
    const roofWidth = width + 0.3;
    const roofDepth = depth + 0.3;
    const roofAngle = (10 * Math.PI) / 180;
    const heightDifference = Math.tan(roofAngle) * roofDepth;

    const roofGeometry = new THREE.BoxGeometry(roofWidth, 0.1, roofDepth);
    let roofMaterialMesh: THREE.Material;

    if (roofMaterial === 'glas-klar') {
      roofMaterialMesh = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.9,
        transmission: 0.95,
        roughness: 0.05,
        metalness: 0,
        ior: 1.5,
        reflectivity: 0.5,
        clearcoat: 1.0,
        side: THREE.DoubleSide
      });
    } else if (roofMaterial === 'glas-matt') {
      roofMaterialMesh = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.7,
        metalness: 0.1,
        roughness: 0.6
      });
    } else {
      roofMaterialMesh = new THREE.MeshStandardMaterial({ 
        color: COLORS.weiss,
        metalness: 0.2,
        roughness: 0.6
      });
    }

    const roof = new THREE.Mesh(roofGeometry, roofMaterialMesh);
    roof.position.set(0, topHeight + roofHeight - heightDifference/2, 0.15);
    roof.rotation.x = roofAngle;
    roof.castShadow = true;
    roof.receiveShadow = true;
    balconyGroupRef.current.add(roof);

    // Roof frame (using support color)
    const frameColor = getSupportColor();
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: frameColor,
      metalness: config.supportMaterial === 'wood' ? 0.1 : (config.supportSurface === 'verzinkt' ? 0.4 : 0.5),
      roughness: config.supportMaterial === 'wood' ? 0.7 : (config.supportSurface === 'verzinkt' ? 0.5 : 0.5)
    });

    const frameThickness = 0.05;
    const frameHeight = 0.08;
    const roofCenterY = topHeight + roofHeight - heightDifference/2;
    const roofCenterZ = 0.15;

    // Front frame
    const frontFrameGeo = new THREE.BoxGeometry(roofWidth, frameHeight, frameThickness);
    const frontFrame = new THREE.Mesh(frontFrameGeo, frameMaterial);
    const frontZ = roofCenterZ + roofDepth/2 * Math.cos(roofAngle);
    const frontY = roofCenterY - roofDepth/2 * Math.sin(roofAngle) - frameHeight/2;
    frontFrame.position.set(0, frontY, frontZ);
    frontFrame.rotation.x = roofAngle;
    frontFrame.castShadow = true;
    balconyGroupRef.current.add(frontFrame);

    // Rear frame
    const rearFrameGeo = new THREE.BoxGeometry(roofWidth, frameHeight, frameThickness);
    const rearFrame = new THREE.Mesh(rearFrameGeo, frameMaterial);
    const rearZ = roofCenterZ - roofDepth/2 * Math.cos(roofAngle);
    const rearY = roofCenterY + roofDepth/2 * Math.sin(roofAngle) - frameHeight/2;
    rearFrame.position.set(0, rearY, rearZ);
    rearFrame.rotation.x = roofAngle;
    rearFrame.castShadow = true;
    balconyGroupRef.current.add(rearFrame);

    // Side frames
    const leftFrameGeo = new THREE.BoxGeometry(frameThickness, frameHeight, roofDepth);
    const leftFrame = new THREE.Mesh(leftFrameGeo, frameMaterial);
    leftFrame.position.set(-roofWidth/2 + frameThickness/2, roofCenterY - frameHeight/2, roofCenterZ);
    leftFrame.rotation.x = roofAngle;
    leftFrame.castShadow = true;
    balconyGroupRef.current.add(leftFrame);

    const rightFrameGeo = new THREE.BoxGeometry(frameThickness, frameHeight, roofDepth);
    const rightFrame = new THREE.Mesh(rightFrameGeo, frameMaterial);
    rightFrame.position.set(roofWidth/2 - frameThickness/2, roofCenterY - frameHeight/2, roofCenterZ);
    rightFrame.rotation.x = roofAngle;
    rightFrame.castShadow = true;
    balconyGroupRef.current.add(rightFrame);
  }, [config, getSupportColor]);

  // Price Calculation

  // Reset Camera
  const resetCameraPosition = (view: 'front' | 'side' | 'top' | 'default') => {
    if (!cameraRef.current || !controlsRef.current) return;

    const positions = {
      front: { x: 0, y: 4, z: 12 },
      side: { x: 12, y: 4, z: 0 },
      top: { x: 0, y: 15, z: 0.1 },
      default: { x: 12, y: 10, z: 12 },
    };

    const pos = positions[view];
    cameraRef.current.position.set(pos.x, pos.y, pos.z);
    const midHeight = config.firstHeight + ((config.count - 1) * config.floorHeight / 2);
    controlsRef.current.target.set(0, midHeight, config.depth / 2);
    controlsRef.current.update();
  };

  // Handlers
  const handleConfigChange = (key: keyof BalconyConfig, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value };
      
      // Abhängigkeiten: Holz nur Quadratstützen
      if (key === 'supportMaterial' && value === 'wood') {
        newConfig.supportShape = 'square';
      }
      
      // Abhängigkeiten: Aluminium nur Pulverbeschichtet
      if (key === 'supportMaterial' && value === 'aluminum') {
        newConfig.supportSurface = 'pulver';
      }
      
      // Abhängigkeiten: Winkelprofil nur Stahl
      if (key === 'type' && value === 'winkel') {
        if (newConfig.supportMaterial === 'aluminum' || newConfig.supportMaterial === 'wood') {
          newConfig.supportMaterial = 'steel';
        }
      }
      
      return newConfig;
    });
  };

  return (
    <>
      <Head>
        <title>Balkonkonfigurator: Balkon online konfigurieren & in 3D visualisieren</title>
        <meta 
          name="description" 
          content="Konfigurieren Sie Ihren Balkon online: Balkontyp, Maße, Materialien und Farben. Erhalten Sie eine erste Kostenschätzung und planen Sie Vorstell-, Anlehn- oder Hängebalkon in 3D." 
        />
        <meta name="keywords" content="balkon konfigurator, 3d balkon planer, balkon online gestalten, balkonanbau visualisieren, balkon kosten berechnen" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/balkon-konfigurator/" />

        <meta property="og:title" content="3D Balkon-Konfigurator | BalkonFuchs" />
        <meta property="og:description" content="Gestalten Sie Ihren Traumbalkon im 3D-Konfigurator. 5 Balkontypen, alle Materialien, sofortige Preisberechnung." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/balkon-konfigurator/" />
        <meta property="og:image" content="https://balkonfuchs.de/images/konfigurator-preview.jpg" />
        <meta property="og:locale" content="de_DE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3D Balkon-Konfigurator | BalkonFuchs" />
        <meta name="twitter:description" content="Gestalten Sie Ihren Traumbalkon im 3D-Konfigurator." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "BalkonFuchs 3D-Konfigurator",
            "description": "Interaktiver 3D-Balkon-Konfigurator zur Planung und Visualisierung von Balkonanbauten",
            "url": "https://balkonfuchs.de/balkon-konfigurator/",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "provider": {
              "@type": "Organization",
              "name": "BalkonFuchs",
              "url": "https://balkonfuchs.de"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-[#1a1a2e] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Hauptüberschrift */}
            <h1 className="text-4xl md:text-5xl font-bold">
              Balkonkonfigurator: <span className="text-orange-500">Traumbalkon in 3 Minuten visualisieren</span>
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-xl md:text-2xl text-gray-300">
              3D-Konfiguration für Ihren individuellen Balkonanbau 2026
            </h2>
            
            {/* SEO-Beschreibung Zeile 1 */}
            <p className="text-orange-400 font-medium">
              3D Balkon-Konfigurator - Interaktive Visualisierung für alle Balkontypen und Materialien
            </p>
            
            {/* SEO-Beschreibung Zeile 2 */}
            <p className="text-gray-400 max-w-3xl mx-auto">
              <span className="text-orange-400 font-semibold">Wie soll Ihr Balkon aussehen?</span>
              {' '}Unser intelligenter{' '}
              <span className="text-orange-400">3D-Konfigurator</span>
              {' '}lässt Sie aus{' '}
              <span className="text-orange-400">5 Balkontypen</span>
              , verschiedenen{' '}
              <span className="text-orange-400">Materialien</span>
              {' '}und{' '}
              <span className="text-orange-400">Farben</span>
              {' '}wählen. Erhalten Sie eine sofortige{' '}
              <span className="text-orange-400 font-semibold">Kostenschätzung</span>
              {' '}und starten Sie Ihr Projekt!
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mt-8 px-4">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: '16.67%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Konfiguration</span>
              <span>Schritt 1 von 6</span>
            </div>
          </div>
        </div>
        
        <main className="max-w-7xl mx-auto px-4 py-8">

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Viewer */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div 
                  ref={containerRef}
                  className="w-full h-[500px] lg:h-[calc(100vh-200px)] relative"
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-300">3D-Modell wird geladen...</p>
                      </div>
                    </div>
                  )}

                  {/* Kamera-Buttons - Inside 3D Container (oben links) */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <button
                      onClick={() => resetCameraPosition('front')}
                      className="px-3 py-1.5 text-xs bg-gray-800/90 backdrop-blur-sm rounded-lg hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
                      title="Frontansicht"
                    >
                      Vorne
                    </button>
                    <button
                      onClick={() => resetCameraPosition('side')}
                      className="px-3 py-1.5 text-xs bg-gray-800/90 backdrop-blur-sm rounded-lg hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
                      title="Seitenansicht"
                    >
                      Seite
                    </button>
                    <button
                      onClick={() => resetCameraPosition('top')}
                      className="px-3 py-1.5 text-xs bg-gray-800/90 backdrop-blur-sm rounded-lg hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
                      title="Draufsicht"
                    >
                      Oben
                    </button>
                    <button
                      onClick={() => resetCameraPosition('default')}
                      className="px-3 py-1.5 text-xs bg-gray-800/90 backdrop-blur-sm rounded-lg hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
                      title="3D-Ansicht"
                    >
                      3D
                    </button>
                  </div>

                  {/* Hinweistexte - Inside 3D Container (unten) */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
                    {/* Visualisierungshinweis */}
                    <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
                      <p className="text-xs text-gray-300">
                        ℹ️ Diese Visualisierung dient zur ersten Orientierung. Die finale Ausführung wird individuell an Ihr Gebäude angepasst.
                      </p>
                    </div>
                    {/* Tipp zur Bedienung */}
                    <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
                      <p className="text-xs text-blue-300">
                        💡 <strong>Tipp:</strong> Klicken und ziehen Sie, um den Balkon zu drehen. Scrollen Sie zum Zoomen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Balkontyp */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Balkontyp (Statisches System)</label>
                  <select
                    value={config.type}
                    onChange={(e) => handleConfigChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  >
                    <option value="anbau">Anbaubalkon (2 Stützen vorne)</option>
                    <option value="vorstell">Vorstellbalkon (4 Stützen)</option>
                    <option value="winkel">Winkelprofil-System</option>
                    <option value="lisenen">Lisenenbalkon (2 Stützen an Wand)</option>
                    <option value="haenge">Hängebalkon (0 Stützen)</option>
                  </select>
                </div>

                {/* Stützenposition */}
                {(config.type === 'anbau' || config.type === 'vorstell' || config.type === 'winkel') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      {config.type === 'winkel' ? 'Stützenanzahl' : 'Stützenposition'}
                    </label>
                    <select
                      value={config.supportPosition}
                      onChange={(e) => handleConfigChange('supportPosition', e.target.value)}
                      className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                    >
                      <option value="inside">
                        {config.type === 'winkel' ? '2 Stützen (vorne)' : 'Innen (in Balkonecken)'}
                      </option>
                      <option value="outside">
                        {config.type === 'winkel' ? '4 Stützen (vorne + hinten)' : 'Außen (außerhalb Geländer)'}
                      </option>
                    </select>
                  </div>
                )}

                {/* Anzahl Balkone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Anzahl Balkone übereinander</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={config.count}
                      onChange={(e) => handleConfigChange('count', parseInt(e.target.value))}
                      className="flex-1 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-300 min-w-[60px]">
                      Balkone: {config.count}
                    </span>
                  </div>
                </div>

                {/* Höhe bis zum ersten Balkon */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Höhe bis zum ersten Balkon</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="0.1"
                      value={config.firstHeight}
                      onChange={(e) => handleConfigChange('firstHeight', parseFloat(e.target.value))}
                      className="flex-1 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-300 min-w-[60px]">
                      Höhe: {config.firstHeight.toFixed(1)} m
                    </span>
                  </div>
                </div>

                {/* Geschosshöhe */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Geschosshöhe (zwischen Balkonen)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="2.8"
                      max="4"
                      step="0.05"
                      value={config.floorHeight}
                      onChange={(e) => handleConfigChange('floorHeight', parseFloat(e.target.value))}
                      className="flex-1 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-300 min-w-[60px]">
                      Höhe: {config.floorHeight.toFixed(2)} m
                    </span>
                  </div>
                </div>

                {/* Tragkonstruktion */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Tragkonstruktion (Stützen)</label>
                  
                  {/* Material */}
                  <div className="mb-3">
                    <label className="block text-xs text-gray-400 mb-1">Material:</label>
                    <select
                      value={config.supportMaterial}
                      onChange={(e) => handleConfigChange('supportMaterial', e.target.value)}
                      className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white text-sm"
                    >
                      <option value="steel">Stahl</option>
                      <option value="aluminum">Aluminium</option>
                      <option value="wood">Holz</option>
                      <option value="any">Ist mir egal</option>
                    </select>
                    {config.supportMaterial === 'wood' && (
                      <p className="text-xs text-orange-400 font-semibold mt-1">
                        ℹ️ Sonderkonstruktion - Einzelanfrage erforderlich
                      </p>
                    )}
                  </div>

                  {/* Stützenform */}
                  <div className="mb-3">
                    <label className="block text-xs text-gray-400 mb-1">Stützenform:</label>
                    <select
                      value={config.supportShape}
                      onChange={(e) => handleConfigChange('supportShape', e.target.value)}
                      disabled={config.supportMaterial === 'wood'}
                      className={`w-full p-2 border border-gray-300 rounded-lg text-sm ${
                        config.supportMaterial === 'wood' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="round">Rundstütze</option>
                      <option value="square">Quadratstütze</option>
                    </select>
                    {config.supportMaterial === 'wood' && (
                      <p className="text-xs text-red-400 font-semibold mt-1">
                        ⚠️ Bei Holz nur Quadratstützen möglich
                      </p>
                    )}
                  </div>

                  {/* Oberfläche */}
                  <div className="mb-3">
                    <label className="block text-xs text-gray-400 mb-1">Oberfläche:</label>
                    <div className="flex gap-4 mt-1">
                      <label className="text-sm flex items-center gap-1 text-gray-300">
                        <input
                          type="radio"
                          name="support-surface"
                          value="verzinkt"
                          checked={config.supportSurface === 'verzinkt'}
                          onChange={(e) => handleConfigChange('supportSurface', e.target.value)}
                          disabled={config.supportMaterial === 'wood' || config.supportMaterial === 'aluminum'}
                          className={config.supportMaterial === 'wood' || config.supportMaterial === 'aluminum' ? 'opacity-50' : ''}
                        />
                        Verzinkt
                      </label>
                      <label className="text-sm flex items-center gap-1 text-gray-300">
                        <input
                          type="radio"
                          name="support-surface"
                          value="pulver"
                          checked={config.supportSurface === 'pulver'}
                          onChange={(e) => handleConfigChange('supportSurface', e.target.value)}
                          disabled={config.supportMaterial === 'wood'}
                          className={config.supportMaterial === 'wood' ? 'opacity-50' : ''}
                        />
                        Pulverbeschichtet
                      </label>
                    </div>
                  </div>

                  {/* Farbe (nur bei Pulverbeschichtet) */}
                  {config.supportSurface === 'pulver' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Farbe:</label>
                      <select
                        value={config.supportColor}
                        onChange={(e) => handleConfigChange('supportColor', e.target.value)}
                        className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white text-sm"
                      >
                        <option value="anthrazit">Anthrazit (RAL 7016)</option>
                        <option value="greige">Grau-Beige (RAL 7030)</option>
                        <option value="braun">Dunkelbraun (RAL 8014)</option>
                        <option value="gruen">Dunkelgrün (RAL 6005)</option>
                        <option value="weiss">Weiß (RAL 9016)</option>
                        <option value="weissalu">Weißaluminium (RAL 9006)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Geländer */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Geländer</label>
                  
                  {/* Oberfläche */}
                  <div className="mb-3">
                    <label className="block text-xs text-gray-400 mb-1">Oberfläche:</label>
                    <div className="flex gap-2 flex-wrap mt-1">
                      <label className="text-sm flex items-center gap-1 text-gray-300">
                        <input
                          type="radio"
                          name="railing-surface"
                          value="verzinkt"
                          checked={config.railingSurface === 'verzinkt'}
                          onChange={(e) => handleConfigChange('railingSurface', e.target.value)}
                        />
                        Verzinkt
                      </label>
                      <label className="text-sm flex items-center gap-1 text-gray-300">
                        <input
                          type="radio"
                          name="railing-surface"
                          value="pulver"
                          checked={config.railingSurface === 'pulver'}
                          onChange={(e) => handleConfigChange('railingSurface', e.target.value)}
                        />
                        Pulverbeschichtet
                      </label>
                      <label className="text-sm flex items-center gap-1 text-gray-300">
                        <input
                          type="radio"
                          name="railing-surface"
                          value="edelstahl"
                          checked={config.railingSurface === 'edelstahl'}
                          onChange={(e) => handleConfigChange('railingSurface', e.target.value)}
                        />
                        Edelstahl
                      </label>
                    </div>
                  </div>

                  {/* Farbe (nur bei Pulverbeschichtet) */}
                  {config.railingSurface === 'pulver' && (
                    <div className="mb-3">
                      <label className="block text-xs text-gray-400 mb-1">Farbe:</label>
                      <select
                        value={config.railingColor}
                        onChange={(e) => handleConfigChange('railingColor', e.target.value)}
                        className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white text-sm"
                      >
                        <option value="anthrazit">Anthrazit (RAL 7016)</option>
                        <option value="greige">Grau-Beige (RAL 7030)</option>
                        <option value="braun">Dunkelbraun (RAL 8014)</option>
                        <option value="gruen">Dunkelgrün (RAL 6005)</option>
                        <option value="weiss">Weiß (RAL 9016)</option>
                        <option value="weissalu">Weißaluminium (RAL 9006)</option>
                      </select>
                    </div>
                  )}

                  {/* Füllung */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Füllung:</label>
                    <select
                      value={config.railingFill}
                      onChange={(e) => handleConfigChange('railingFill', e.target.value)}
                      className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white text-sm"
                    >
                      <option value="stab-rund">Stabgeländer (Rundstäbe Ø10mm)</option>
                      <option value="stab-flach">Flachstahlgeländer (10×40mm)</option>
                      <option value="glas-klar">Klarglas</option>
                      <option value="glas-matt">Milchglas</option>
                      <option value="geschlossen">Geschlossene Füllung</option>
                      <option value="strukturblech">Strukturblech (florale Füllung)</option>
                      <option value="hpl">HPL-Platte (Trespa Meteon)</option>
                    </select>
                  </div>

                  {/* HPL-Farbe */}
                  {config.railingFill === 'hpl' && (
                    <div className="mt-3">
                      <label className="block text-xs text-gray-400 mb-1">HPL-Farbe:</label>
                      <select
                        value={config.hplColor}
                        onChange={(e) => handleConfigChange('hplColor', e.target.value)}
                        className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white text-sm"
                      >
                        <optgroup label="Holz">
                          <option value="hpl-wood-1">Holzoptik 1</option>
                          <option value="hpl-wood-2">Holzoptik 2</option>
                        </optgroup>
                        <optgroup label="Farben">
                          <option value="hpl-white">Weiß</option>
                          <option value="hpl-grey-light">Hellgrau</option>
                          <option value="hpl-grey-medium">Mittelgrau</option>
                          <option value="hpl-grey-dark">Dunkelgrau</option>
                          <option value="hpl-black">Schwarz</option>
                          <option value="hpl-brown">Braun</option>
                          <option value="hpl-beige">Beige</option>
                          <option value="hpl-anthracite">Anthrazit</option>
                          <option value="hpl-silver">Silber</option>
                          <option value="hpl-green">Grün</option>
                          <option value="hpl-yellow">Gelb</option>
                          <option value="hpl-yellow-light">Hellgelb</option>
                          <option value="hpl-red">Rot</option>
                          <option value="hpl-red-light">Hellrot</option>
                          <option value="hpl-orange">Orange</option>
                          <option value="hpl-blue">Blau</option>
                          <option value="hpl-blue-light">Hellblau</option>
                          <option value="hpl-turquoise">Türkis</option>
                          <option value="hpl-purple">Lila</option>
                          <option value="hpl-pink">Rosa</option>
                        </optgroup>
                      </select>
                      <p className="text-xs text-gray-400 mt-1">
                        Referenz: <a href="https://www.trespa.com/de_DE/Trespa-meteon" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Trespa Meteon</a>
                      </p>
                    </div>
                  )}
                </div>

                {/* Balkonboden */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Balkonboden</label>
                  <select
                    value={config.floorType}
                    onChange={(e) => handleConfigChange('floorType', e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  >
                    <optgroup label="Holz">
                      <option value="wood-larch">Sibirische Lärche</option>
                      <option value="wood-bangkirai">Bangkirai</option>
                    </optgroup>
                    <optgroup label="Kunststoff">
                      <option value="wpc">WPC (Wood-Plastic-Composite)</option>
                    </optgroup>
                    <optgroup label="Aluminiumdiele">
                      <option value="alu-yellow">Granit gelb</option>
                      <option value="alu-brown">Granit Braun</option>
                      <option value="alu-anthracite">Granit Dunkel</option>
                      <option value="alu-silver">Granit Hell</option>
                    </optgroup>
                    <optgroup label="Stein/Beton">
                      <option value="stone">Steinplattenbelag</option>
                      <option value="balkoplan">Beschichtete Industrieplatte</option>
                    </optgroup>
                  </select>
                </div>

                {/* Sichtschutz */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Sichtschutz (optional)</label>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={config.privacyLeft}
                        onChange={(e) => handleConfigChange('privacyLeft', e.target.checked)}
                        className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500"
                      />
                      Links (+1,00m Höhe)
                    </label>
                    <label className="text-sm flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={config.privacyRight}
                        onChange={(e) => handleConfigChange('privacyRight', e.target.checked)}
                        className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500"
                      />
                      Rechts (+1,00m Höhe)
                    </label>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Geschlossene Füllung in Geländerfarbe</p>
                </div>

                {/* Balkonbreite */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Balkonbreite</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="2"
                      max="5"
                      step="0.01"
                      value={config.width}
                      onChange={(e) => handleConfigChange('width', parseFloat(e.target.value))}
                      className="flex-1 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-300 min-w-[80px]">
                      Breite: {config.width.toFixed(2)} m
                    </span>
                  </div>
                </div>

                {/* Balkontiefe */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Balkontiefe</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max={config.type === 'haenge' ? 1.5 : 3}
                      step="0.01"
                      value={config.depth}
                      onChange={(e) => handleConfigChange('depth', parseFloat(e.target.value))}
                      className="flex-1 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-300 min-w-[80px]">
                      Tiefe: {config.depth.toFixed(2)} m
                    </span>
                  </div>
                  {config.type === 'haenge' && (
                    <p className="text-xs text-red-400 font-semibold mt-1">
                      ⚠️ Hängebalkon: Max. {config.depth.toFixed(2)}m Tiefe bei {config.width.toFixed(2)}m Breite
                    </p>
                  )}
                </div>

                {/* Überdachung */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Balkonüberdachung</label>
                  <div>
                    <label className="text-sm flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={config.hasRoof}
                        onChange={(e) => {
                          if (config.type === 'haenge') {
                            handleConfigChange('hasRoof', false);
                          } else {
                            handleConfigChange('hasRoof', e.target.checked);
                          }
                        }}
                        disabled={config.type === 'haenge'}
                        className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500"
                      />
                      Überdachung über oberstem Balkon
                    </label>
                    {config.type === 'haenge' && (
                      <p className="text-xs text-red-400 font-semibold mt-1">
                        ⚠️ Überdachung nicht möglich bei Hängebalkon
                      </p>
                    )}
                    
                    {config.hasRoof && (
                      <>
                        <div className="mt-3">
                          <label className="block text-xs text-gray-400 mb-1">Material:</label>
                          <select
                            value={config.roofMaterial}
                            onChange={(e) => handleConfigChange('roofMaterial', e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white text-sm"
                          >
                            <option value="geschlossen">Geschlossen (weiß)</option>
                            <option value="glas-klar">Transparentes Glas</option>
                            <option value="glas-matt">Milchglas</option>
                          </select>
                        </div>
                        
                        <div className="mt-3">
                          <label className="block text-sm font-semibold text-gray-300 mb-3">Höhe der Überdachung</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="2.8"
                              max="4"
                              step="0.05"
                              value={config.roofHeight}
                              onChange={(e) => handleConfigChange('roofHeight', parseFloat(e.target.value))}
                              className="flex-1 accent-orange-500"
                            />
                            <span className="text-sm font-medium text-gray-300 min-w-[80px]">
                              Höhe: {config.roofHeight.toFixed(2)} m
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => {
                      const midHeight = config.firstHeight + ((config.count - 1) * config.floorHeight / 2);
                      if (cameraRef.current && controlsRef.current) {
                        cameraRef.current.position.set(12, midHeight + 5, 12);
                        controlsRef.current.target.set(0, midHeight, config.depth / 2);
                        controlsRef.current.update();
                      }
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    🔄 Ansicht zurücksetzen
                  </button>
                  
                  <button
                    onClick={() => {
                      if (rendererRef.current && cameraRef.current) {
                        rendererRef.current.render(sceneRef.current!, cameraRef.current);
                        const screenshot = rendererRef.current.domElement.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.download = `balkonfuchs-konfigurator-${Date.now()}.png`;
                        link.href = screenshot;
                        link.click();
                      }
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    📸 Screenshot erstellen
                  </button>
                  
                  <button
                    onClick={() => {
                      // Konfiguration in localStorage speichern
                      localStorage.setItem('balkonkonfigurator_data', JSON.stringify(config));
                      // Weiterleitung zur Kontaktdaten-Seite
                      window.location.href = '/balkon-konfigurator/kontakt';
                    }}
                    className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
                  >
                    🎯 Jetzt Angebot anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Content Sections für SEO */}
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
          
          {/* A) Section: Balkon konfigurieren – so funktioniert's */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Balkon konfigurieren – so funktioniert's</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Genehmigung prüfen</h3>
                <p className="text-gray-300 mb-4">Prüfen Sie, ob Sie eine Genehmigung für Ihr Balkon-Projekt benötigen.</p>
                <a href="/genehmigung/" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Genehmigung prüfen
                  <span>→</span>
                </a>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Kosten berechnen</h3>
                <p className="text-gray-300 mb-4">Erhalten Sie eine erste Kostenschätzung für Ihr Balkon-Projekt.</p>
                <a href="/kalkulator/" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Kosten berechnen
                  <span>→</span>
                </a>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Anbieter finden</h3>
                <p className="text-gray-300 mb-4">Finden Sie qualifizierte Partner in Ihrer Region für die Umsetzung.</p>
                <a href="/planer/" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Partner finden
                  <span>→</span>
                </a>
              </div>
            </div>
          </section>

          {/* B) Section: Balkontypen, die Sie konfigurieren können */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Balkontypen, die Sie konfigurieren können</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Vorstellbalkon</h3>
                <p className="text-gray-300 text-sm mb-4">Ein Vorstellbalkon wird von vier Stützen getragen und bietet maximale Flexibilität bei der Planung.</p>
                <p className="text-gray-300 text-sm mb-4">Ideal für Gebäude ohne tragende Außenwand oder bei besonderen architektonischen Anforderungen.</p>
                <a href="#vorstellbalkon" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Details ansehen
                  <span>→</span>
                </a>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Anlehnbalkon</h3>
                <p className="text-gray-300 text-sm mb-4">Ein Anlehnbalkon wird an der Gebäudewand befestigt und benötigt nur zwei Stützen vorne.</p>
                <p className="text-gray-300 text-sm mb-4">Die kostengünstigste Variante für den nachträglichen Balkonanbau.</p>
                <a href="#anlehnbalkon" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Details ansehen
                  <span>→</span>
                </a>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Hängebalkon</h3>
                <p className="text-gray-300 text-sm mb-4">Ein Hängebalkon wird vollständig von der Gebäudestruktur getragen, ohne sichtbare Stützen.</p>
                <p className="text-gray-300 text-sm mb-4">Maximale Ästhetik, erfordert jedoch eine entsprechende Statik des Gebäudes.</p>
                <a href="#haengebalkon" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Details ansehen
                  <span>→</span>
                </a>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Anbaubalkon</h3>
                <p className="text-gray-300 text-sm mb-4">Ein Anbaubalkon wird direkt an die Gebäudefassade angebaut und benötigt zwei Stützen.</p>
                <p className="text-gray-300 text-sm mb-4">Klassische Lösung für den nachträglichen Balkonanbau mit gutem Preis-Leistungs-Verhältnis.</p>
                <a href="#anbaubalkon" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                  Details ansehen
                  <span>→</span>
                </a>
              </div>
            </div>
          </section>

          {/* C) Section: Vorstellbalkon */}
          <section id="vorstellbalkon">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Vorstellbalkon</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Ein Vorstellbalkon wird von vier Stützen getragen und ist damit vollständig unabhängig von der Gebäudestruktur. Diese Konstruktion bietet maximale Flexibilität bei der Planung und eignet sich besonders für Gebäude ohne tragende Außenwand oder bei besonderen architektonischen Anforderungen.
              </p>
              <p>
                Vorstellbalkone können in verschiedenen Größen und Ausführungen konfiguriert werden. Die vier Stützen ermöglichen eine gleichmäßige Lastverteilung und erlauben größere Spannweiten als andere Balkontypen. Sie eignen sich sowohl für Neubauten als auch für nachträgliche Anbauten.
              </p>
              <p>
                Bei der Planung eines Vorstellbalkons sollten Sie die statischen Anforderungen, die Bodenbeschaffenheit und die örtlichen Baubestimmungen berücksichtigen. Eine Genehmigung ist in den meisten Fällen erforderlich, da es sich um eine bauliche Anlage handelt.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 transition-colors">Genehmigung prüfen</a>
              <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 transition-colors">Kosten berechnen</a>
              <a href="/planer/" className="text-orange-400 hover:text-orange-300 transition-colors">Planung starten</a>
            </div>
          </section>

          {/* D) Section: Anlehnbalkon */}
          <section id="anlehnbalkon">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Anlehnbalkon</h2>
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Ein Anlehnbalkon wird an der Gebäudewand befestigt und benötigt nur zwei Stützen vorne. Diese Konstruktion ist die kostengünstigste Variante für den nachträglichen Balkonanbau und eignet sich besonders für Gebäude mit tragender Außenwand.
              </p>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Häufige Fragen zum Anlehnbalkon</h3>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Brauche ich eine Genehmigung für einen Anlehnbalkon?</h4>
                  <p className="text-gray-300">Das hängt von der Größe und Ihrem Bundesland ab. In den meisten Fällen ist eine Genehmigung erforderlich, wenn der Balkon eine bestimmte Größe überschreitet. Nutzen Sie unseren <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 underline">Genehmigungscheck</a> für eine schnelle Antwort.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Wie viel kostet ein Anlehnbalkon?</h4>
                  <p className="text-gray-300">Die Kosten für einen Anlehnbalkon liegen in der Regel zwischen 3.000€ und 8.000€, abhängig von Größe, Materialien und Ausstattung. Nutzen Sie unseren <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">BalkonKalkulator</a> für eine detaillierte Kostenschätzung.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Welche Materialien eignen sich für einen Anlehnbalkon?</h4>
                  <p className="text-gray-300">Anlehnbalkone werden typischerweise aus Stahl oder Aluminium gefertigt. Die Stützen können verzinkt oder pulverbeschichtet sein. Das Geländer kann aus verschiedenen Materialien wie Stahl, Aluminium oder Glas bestehen.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Anbaubalkon Section */}
          <section id="anbaubalkon">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Anbaubalkon</h2>
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Ein Anbaubalkon wird direkt an die Gebäudefassade angebaut und benötigt zwei Stützen vorne. Diese Konstruktion ist eine klassische Lösung für den nachträglichen Balkonanbau und bietet ein gutes Preis-Leistungs-Verhältnis. Anbaubalkone eignen sich besonders für Gebäude mit tragender Außenwand.
              </p>
            </div>
          </section>

          {/* E) Section: Hängebalkon */}
          <section id="haengebalkon">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Hängebalkon</h2>
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Ein Hängebalkon wird vollständig von der Gebäudestruktur getragen, ohne sichtbare Stützen. Diese Konstruktion bietet maximale Ästhetik und eignet sich besonders für moderne Architektur. Hängebalkone erfordern jedoch eine entsprechende Statik des Gebäudes und sind daher häufig bei Neubauten oder umfangreichen Sanierungen zu finden.
              </p>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Häufige Fragen zum Hängebalkon</h3>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Kann ich einen Hängebalkon nachträglich anbauen?</h4>
                  <p className="text-gray-300">Ein nachträglicher Anbau ist möglich, erfordert jedoch eine umfassende statische Prüfung des Gebäudes. Die Gebäudestruktur muss die zusätzlichen Lasten tragen können. Eine detaillierte Planung mit einem Statiker ist in der Regel erforderlich.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Wie viel kostet ein Hängebalkon?</h4>
                  <p className="text-gray-300">Hängebalkone sind aufgrund der komplexeren Konstruktion in der Regel teurer als andere Balkontypen. Die Kosten liegen zwischen 5.000€ und 15.000€, abhängig von Größe und Ausführung. Nutzen Sie unseren <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">BalkonKalkulator</a> für eine erste Kostenschätzung.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Welche Vorteile hat ein Hängebalkon?</h4>
                  <p className="text-gray-300">Hängebalkone bieten eine maximale Ästhetik ohne sichtbare Stützen, mehr Flexibilität bei der Gestaltung des Außenbereichs und eine ungestörte Sicht. Sie eignen sich besonders für moderne Architektur und hochwertige Immobilien.</p>
                </div>
              </div>
            </div>
          </section>

          {/* F) FAQ Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">FAQ zum Balkonkonfigurator</h2>
            <div className="space-y-4">
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6" open>
                <summary className="text-lg font-bold text-white cursor-pointer">Was kann ich im Balkonkonfigurator konfigurieren?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Im Balkonkonfigurator können Sie Ihren Balkon Schritt für Schritt planen – zum Beispiel Balkontyp, Maße, Materialien, Farben und Geländer-Varianten. So erhalten Sie eine erste Visualisierung und eine belastbare Orientierung für die weitere Planung.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Welche Balkontypen kann ich konfigurieren?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Sie können je nach Auswahl unter anderem <a href="#vorstellbalkon" className="text-orange-400 hover:text-orange-300 underline">Vorstellbalkon</a>, <a href="#anlehnbalkon" className="text-orange-400 hover:text-orange-300 underline">Anlehnbalkon</a> und <a href="#haengebalkon" className="text-orange-400 hover:text-orange-300 underline">Hängebalkon</a> konfigurieren. Die verfügbaren Typen hängen von den Optionen im Konfigurator und den Voraussetzungen Ihres Gebäudes ab.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Wie lange dauert es, einen Balkon zu konfigurieren?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Für eine erste Konfiguration reichen meist wenige Minuten. Wenn Sie mehrere Varianten vergleichen (z. B. Materialien oder Geländer), dauert es entsprechend länger – Sie können aber jederzeit anpassen.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Muss ich „3D" können, um den Konfigurator zu nutzen?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Nein. Die 3D-Ansicht dient der einfachen Orientierung. Sie wählen Optionen aus – der Konfigurator visualisiert das Ergebnis automatisch.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Wie genau ist die Visualisierung?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Die Visualisierung ist eine erste Orientierung und zeigt typische Proportionen und Varianten. Die finale Ausführung wird in der Praxis immer an Ihr Gebäude und die statischen Anforderungen angepasst.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Wie erhalte ich eine Kostenschätzung?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Auf Basis Ihrer Auswahl kann der Konfigurator einen ersten Kostenrahmen ableiten. Für eine genaue Kalkulation sind zusätzliche Details nötig (z. B. Gebäudezustand, Anschlussdetails, Montageaufwand, örtliche Anforderungen). Nutzen Sie für eine detaillierte Kalkulation unseren <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">BalkonKalkulator</a>.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Welche Angaben brauche ich, um meinen Balkon zu konfigurieren?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Hilfreich sind grobe Maße (Breite/Tiefe), die gewünschte Balkonart, die Anzahl der Ebenen (falls relevant) sowie Material-/Designwünsche. Wenn Sie nicht alles wissen, können Sie mit einer Standard-Variante starten und später verfeinern.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Ist ein Balkon immer genehmigungspflichtig?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Das hängt von Bundesland, Gebäudesituation und Bauart ab. Der Konfigurator ersetzt keine Behördenprüfung – für eine erste Einschätzung sollten Sie zusätzlich einen <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 underline">Genehmigungscheck</a> nutzen und bei Bedarf fachliche Beratung einholen.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Was ist der Unterschied zwischen Vorstellbalkon, Anlehnbalkon und Hängebalkon?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  <a href="#vorstellbalkon" className="text-orange-400 hover:text-orange-300 underline">Vorstellbalkon</a>: steht auf Stützen/Fundamenten vor dem Gebäude. <a href="#anlehnbalkon" className="text-orange-400 hover:text-orange-300 underline">Anlehnbalkon</a>: liegt konstruktiv am Gebäude an und wird je nach System zusätzlich abgestützt. <a href="#haengebalkon" className="text-orange-400 hover:text-orange-300 underline">Hängebalkon</a>: wird überwiegend über eine Tragkonstruktion/Abhängung gehalten und benötigt geeignete Anbindungspunkte. Welche Lösung passt, hängt von Statik, Fassade und Nutzung ab.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Kann ich mehrere Varianten vergleichen?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Ja. Es lohnt sich, Varianten zu testen (z. B. Balkontyp, Material, Geländer), um Optik und Kostenrahmen zu vergleichen. So gehen Sie vorbereitet in die nächste Planungsstufe.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Kann ich meine Konfiguration speichern oder später weiterbearbeiten?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Wenn eine Speicherfunktion vorhanden ist, können Sie Ihre Planung sichern und später fortsetzen. Falls nicht, empfiehlt es sich, Ihre Auswahl zu notieren oder Screenshots zu erstellen, damit Sie später gezielt weiterarbeiten können.
                </p>
              </details>
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <summary className="text-lg font-bold text-white cursor-pointer">Was passiert nach der Konfiguration?</summary>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Nach der Konfiguration haben Sie eine klare Basis für die nächsten Schritte: <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 underline">Genehmigung prüfen</a>, <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">Kosten</a> konkretisieren und die Umsetzung planen. Je nach Angebot können Sie anschließend eine Anfrage stellen oder mit einem passenden Fachbetrieb die Detailplanung starten.
                </p>
              </details>
            </div>
          </section>

        </div>

        <Footer />
        <ZohoSalesIQ />
      </div>
    </>
  );
}

