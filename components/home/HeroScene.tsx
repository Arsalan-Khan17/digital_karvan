"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroSceneProps {
  isDark?: boolean;
}

export default function HeroScene({ isDark = true }: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  // Track isDark changes so the animation loop can read the current value
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Shape definitions ────────────────────────────────────────────────
    // Each shape has two colour entries: [lightModeColor, darkModeColor]
    const shapeData: Array<{
      geo: THREE.BufferGeometry;
      pos: [number, number, number];
      colors: [number, number];        // [light, dark]
      opacities: [number, number];     // [light, dark]
    }> = [
      { geo: new THREE.IcosahedronGeometry(1.2, 0),  pos: [-4.5, 2.2, -2],   colors: [0xe11d48, 0xe11d48], opacities: [0.55, 0.55] },
      { geo: new THREE.IcosahedronGeometry(0.65, 0), pos: [4.4, -1.8, -1],   colors: [0x888888, 0x555555], opacities: [0.40, 0.35] },
      { geo: new THREE.TorusGeometry(1.0, 0.3, 5, 8), pos: [3.8, 2.8, -3],   colors: [0xe11d48, 0xe11d48], opacities: [0.30, 0.30] },
      { geo: new THREE.OctahedronGeometry(1.05),       pos: [-2.8, -3.0, -2], colors: [0x777777, 0x444444], opacities: [0.35, 0.30] },
      { geo: new THREE.TetrahedronGeometry(0.85),      pos: [5.8, 0.5, -5],   colors: [0x999999, 0x666666], opacities: [0.28, 0.22] },
      { geo: new THREE.IcosahedronGeometry(0.5, 0),    pos: [-5.8, -0.8, -3], colors: [0xe11d48, 0xe11d48], opacities: [0.50, 0.48] },
      { geo: new THREE.TorusGeometry(0.65, 0.2, 4, 6), pos: [0.5, 4.0, -4],  colors: [0x888888, 0x444444], opacities: [0.28, 0.22] },
      { geo: new THREE.OctahedronGeometry(0.6),         pos: [-1.5, 3.5, -1], colors: [0xe11d48, 0xe11d48], opacities: [0.30, 0.25] },
    ];

    const meshes: THREE.Mesh[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const rotSpeeds: [number, number][] = [];

    shapeData.forEach(({ geo, pos, colors, opacities }) => {
      const dark = isDarkRef.current;
      const mat = new THREE.MeshBasicMaterial({
        color: dark ? colors[1] : colors[0],
        wireframe: true,
        transparent: true,
        opacity: dark ? opacities[1] : opacities[0],
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
      scene.add(mesh);
      meshes.push(mesh);
      materials.push(mat);
      rotSpeeds.push([
        (Math.random() * 0.007 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        (Math.random() * 0.009 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      ]);
    });

    // ── Background lines ─────────────────────────────────────────────────
    const lineCount = 12;
    const lineMaterials: THREE.LineBasicMaterial[] = [];
    for (let i = 0; i < lineCount; i++) {
      const points = [
        new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 4),
        new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 4),
      ];
      const lineMat = new THREE.LineBasicMaterial({
        color: isDarkRef.current ? 0x222222 : 0xcccccc,
        transparent: true,
        opacity: isDarkRef.current ? 0.40 : 0.35,
      });
      lineMaterials.push(lineMat);
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat));
    }

    // ── Particles ────────────────────────────────────────────────────────
    const pCount = 250;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    // Vertex colors: mix of accent red + neutral
    const pColors = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const isAccent = Math.random() > 0.65;
      if (isAccent) {
        pColors[i * 3] = 0.88; pColors[i * 3 + 1] = 0.11; pColors[i * 3 + 2] = 0.28;
      } else {
        // neutral — slightly dark in dark mode, medium gray in light mode
        const v = isDarkRef.current ? 0.8 : 0.5;
        pColors[i * 3] = v; pColors[i * 3 + 1] = v; pColors[i * 3 + 2] = v;
      }
    }
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.04, transparent: true, opacity: isDarkRef.current ? 0.65 : 0.55, vertexColors: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Mouse tracking ───────────────────────────────────────────────────
    let targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.4;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.9;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ───────────────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();
    let prevDark = isDarkRef.current;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Hot-swap material colours when theme flips
      const dark = isDarkRef.current;
      if (dark !== prevDark) {
        prevDark = dark;
        shapeData.forEach(({ colors, opacities }, i) => {
          materials[i].color.setHex(dark ? colors[1] : colors[0]);
          materials[i].opacity = dark ? opacities[1] : opacities[0];
        });
        lineMaterials.forEach((lm) => {
          lm.color.setHex(dark ? 0x222222 : 0xcccccc);
          lm.opacity = dark ? 0.40 : 0.35;
        });
        pMat.opacity = dark ? 0.65 : 0.55;
      }

      meshes.forEach((mesh, i) => {
        mesh.rotation.x += rotSpeeds[i][0];
        mesh.rotation.y += rotSpeeds[i][1];
        mesh.position.y += Math.sin(t * 0.4 + i * 1.3) * 0.0007;
      });

      particles.rotation.y = t * 0.035;
      particles.rotation.x = t * 0.018;

      camera.position.x += (targetX * 0.5 - camera.position.x) * 0.025;
      camera.position.y += (-targetY * 0.35 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ───────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
    // Run only once; isDark changes are handled reactively via isDarkRef
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
