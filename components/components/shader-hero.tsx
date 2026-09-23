'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const vertexShader = `#version 300 es
precision highp float;
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 resolution;
uniform float time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.82, -0.57, 0.57, 0.82);
  for (int i = 0; i < 2; i++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.05;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution) / min(resolution.x, resolution.y);
  float t = time * 0.34;

  float haze = fbm(uv * 2.4 + vec2(t, -t * 0.45));
  float bands = 0.0;
  for (float i = 0.0; i < 5.0; i++) {
    float phase = i * 0.82;
    float wave = uv.y + 0.13 * sin(uv.x * (2.4 + i * 0.18) + t * (1.0 + i * 0.04) + phase);
    wave += 0.06 * sin(uv.x * 6.0 - t * 0.7 + haze * 2.0);
    float line = 0.006 / (abs(wave + (i - 3.0) * 0.075) + 0.012);
    bands += line * (0.25 - i * 0.014);
  }

  float core = 0.014 / (abs(uv.y + 0.1 * sin(uv.x * 3.0 + t) + haze * 0.08) + 0.018);
  vec3 yellow = vec3(1.0, 0.72, 0.0);
  vec3 amber = vec3(1.0, 0.31, 0.0);
  vec3 color = mix(amber, yellow, smoothstep(-0.4, 0.6, uv.x + haze));
  color *= bands + core * 0.38;
  color += yellow * pow(haze, 4.0) * 0.16;
  float vignette = 1.0 - smoothstep(0.35, 1.2, length(uv));
  color *= vignette;
  color = pow(color, vec3(0.9));
  fragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, 'resolution');
    const time = gl.getUniformLocation(program, 'time');
    const applyProgram = gl.useProgram.bind(gl);
    let frame = 0;
    let visible = true;
    let lastRenderTime = -Infinity;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      const renderScale = canvas.clientWidth < 720 ? 0.5 : 0.56;
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr * renderScale));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr * renderScale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = (now: number) => {
      if (now - lastRenderTime < 1000 / 24) {
        if (visible) frame = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = now;
      resize();
      applyProgram(program);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visible) frame = requestAnimationFrame(render);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible && !visible) frame = requestAnimationFrame(render);
      visible = nextVisible;
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    render(0);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <section className="hero">
      <div className="shader-fallback" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-word" aria-hidden="true">INVISTA</div>

      <div className="site-shell hero-content">
        <div className="hero-kicker">
          <span /> Comunicação integrada <span className="hero-kicker-muted">desde 2002</span>
        </div>
        <div className="hero-grid">
          <h1>
            Sua marca em <em>movimento.</em>
            <br />Seu negócio em evidência.
          </h1>
          <div className="hero-copy">
            <p>
              Estratégia, criatividade, mídia e execução para transformar presença em resultado — dentro e fora do digital.
            </p>
            <div className="hero-actions">
              <Link
                className="button"
                href="/diagnostico/"
              >
                Quero um diagnóstico <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="button button-ghost" href="#cases">
                Ver resultados <ArrowDown aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
