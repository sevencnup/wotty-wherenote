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
    float horizontalSpread = mix(0.76, 1.0, smoothstep(0.72, 1.8, aspect));
    float x = (vUv.x - 0.5) * horizontalSpread + 0.5;
    float time = uTime * uMotion;
    float pointerX = (uPointer.x - 0.5) * 0.026 * uMotion;
    float pointerY = (uPointer.y - 0.5) * 0.012 * uMotion;

    float distantEdge = 0.36
      + sin((x + pointerX) * 5.7 + time * 0.12) * 0.055
      + gaussian(x, 0.84 + pointerX, 0.20) * 0.29
      + gaussian(x, 0.18, 0.30) * 0.055
      + pointerY;

    float middleEdge = 0.31
      + sin(x * 7.2 - 1.15 - time * 0.10) * 0.065
      + gaussian(x, 0.57 - pointerX, 0.18) * 0.22
      + gaussian(x, 0.97, 0.28) * 0.075
      - pointerY * 0.65;

    float ridgeEdge = 0.265
      + sin(x * 6.1 + 0.75 + time * 0.085) * 0.048
      + gaussian(x, 0.28 + pointerX * 0.5, 0.19) * 0.13
      + gaussian(x, 0.72, 0.30) * 0.045;

    float foregroundEdge = 0.18
      + sin(x * 4.8 - 0.45 - time * 0.055) * 0.036
      + gaussian(x, 0.70, 0.40) * 0.055;

    float distantMask = fillBelow(vUv.y, distantEdge, 0.035);
    float middleMask = fillBelow(vUv.y, middleEdge, 0.032);
    float ridgeMask = fillBelow(vUv.y, ridgeEdge, 0.028);
    float foregroundMask = fillBelow(vUv.y, foregroundEdge, 0.024);

    vec3 color = vec3(0.975, 0.983, 0.977);
    color = mix(color, vec3(0.815, 0.905, 0.855), distantMask * 0.70);
    color = mix(color, vec3(0.765, 0.885, 0.815), middleMask * 0.68);
    color = mix(color, vec3(0.855, 0.930, 0.890), ridgeMask * 0.82);
    color = mix(color, vec3(0.976, 0.989, 0.981), foregroundMask * 0.96);

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
