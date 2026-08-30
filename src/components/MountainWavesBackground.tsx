import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uMotion;

  varying vec2 vUv;

  float gaussian(float x, float center, float width) {
    float distanceFromCenter = (x - center) / width;
    return exp(-distanceFromCenter * distanceFromCenter);
  }

  float fillBelow(float y, float edge, float softness) {
    return 1.0 - smoothstep(edge - softness, edge + softness, y);
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float horizontalSpread = mix(0.82, 1.0, smoothstep(0.72, 1.8, aspect));
    float x = (vUv.x - 0.5) * horizontalSpread + 0.5;
    float time = uTime * uMotion;
    float pointerX = (uPointer.x - 0.5) * 0.018 * uMotion;
    float pointerY = (uPointer.y - 0.5) * 0.008 * uMotion;

    float rearX = x + pointerX + sin(time * 0.09) * 0.008;
    float rearEdge = 0.47
      - gaussian(rearX, 0.11, 0.11) * 0.12
      + gaussian(rearX, 0.29, 0.09) * 0.08
      - gaussian(rearX, 0.43, 0.10) * 0.10
      + gaussian(rearX, 0.58, 0.11) * 0.16
      - gaussian(rearX, 0.70, 0.10) * 0.07
      + gaussian(rearX, 0.83, 0.20) * 0.12
      + gaussian(rearX, 1.00, 0.10) * 0.25
      + pointerY;

    float frontX = x + pointerX * 0.35 - sin(time * 0.055) * 0.006;
    float frontEdge = 0.18
      - gaussian(frontX, 0.20, 0.25) * 0.04
      + gaussian(frontX, 0.76, 0.35) * 0.26
      - gaussian(frontX, 1.03, 0.20) * 0.04
      - pointerY * 0.35;

    float edgeSoftness = 1.0 / max(uResolution.y, 1.0);
    float rearMask = fillBelow(vUv.y, rearEdge, edgeSoftness);
    float frontMask = fillBelow(vUv.y, frontEdge, edgeSoftness);

    vec3 backgroundColor = vec3(0.984, 0.988, 0.985);
    float rearDepth = smoothstep(0.0, max(rearEdge, 0.001), vUv.y);
    vec3 rearColor = mix(
      vec3(0.885, 0.945, 0.912),
      vec3(0.755, 0.875, 0.810),
      rearDepth
    );
    float frontDepth = smoothstep(0.0, max(frontEdge, 0.001), vUv.y);
    vec3 frontColor = mix(
      vec3(0.940, 0.966, 0.951),
      vec3(0.978, 0.985, 0.980),
      frontDepth
    );

    vec3 color = mix(backgroundColor, rearColor, rearMask);
    color = mix(color, frontColor, frontMask);

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

export function MountainWavesBackground({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let animationFrame = 0;
    let contextLost = false;
    let disposed = false;
    let pageVisible = !document.hidden;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uMotion: { value: reducedMotion ? 0 : 1 },
    };

    const stopAnimation = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const renderFrame = (time: number) => {
      if (!renderer || !scene || !camera || disposed || contextLost) {
        return;
      }

      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      mount.classList.add('mountain-waves-background--ready');
    };

    const animate = (time: number) => {
      renderFrame(time);

      if (!disposed && !contextLost && pageVisible && !reducedMotion) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      stopAnimation();

      if (disposed || contextLost) {
        return;
      }

      if (pageVisible && !reducedMotion) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        renderFrame(performance.now());
      }
    };

    const handleResize = () => {
      if (!renderer) {
        return;
      }

      const { width, height } = mount.getBoundingClientRect();
      const renderWidth = Math.max(1, Math.round(width));
      const renderHeight = Math.max(1, Math.round(height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(renderWidth, renderHeight, false);
      uniforms.uResolution.value.set(renderWidth * pixelRatio, renderHeight * pixelRatio);
      renderFrame(performance.now());
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }

      uniforms.uPointer.value.set(
        event.clientX / Math.max(window.innerWidth, 1),
        1 - event.clientY / Math.max(window.innerHeight, 1),
      );
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      uniforms.uMotion.value = reducedMotion ? 0 : 1;
      startAnimation();
    };

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      startAnimation();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stopAnimation();
      mount.classList.remove('mountain-waves-background--ready');
    };

    const handleContextRestored = () => {
      contextLost = false;
      handleResize();
      startAnimation();
    };

    try {
      const canvas = document.createElement('canvas');
      const contextAttributes: WebGLContextAttributes = {
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      };
      const context = canvas.getContext('webgl2', contextAttributes)
        ?? canvas.getContext('webgl', contextAttributes);

      if (!context) {
        return;
      }

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
      });

      scene.add(new THREE.Mesh(geometry, material));

      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = 'mountain-waves-canvas';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
      mount.appendChild(renderer.domElement);

      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(mount);
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.addEventListener('change', handleMotionPreference);

      handleResize();
      startAnimation();
    } catch {
      mount.classList.remove('mountain-waves-background--ready');
    }

    return () => {
      disposed = true;
      stopAnimation();
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionPreference);

      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        renderer.dispose();
        renderer.domElement.remove();
      }

      geometry?.dispose();
      material?.dispose();
      mount.classList.remove('mountain-waves-background--ready');
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`mountain-waves-background pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] w-full select-none overflow-hidden sm:h-[620px] lg:h-[720px] ${className}`}
      aria-hidden="true"
    >
      <div className="mountain-waves-fallback" />
    </div>
  );
}
