
uniform float time;
uniform float progress;

varying vec2 vUv;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);
vec3 colorC = vec3(0.2235, 1.0, 0.5216);
vec3 colorD = vec3(0.8706, 0.2235, 1.0);

void main(){
  vec3 color = vec3(0.0);
  float pct = abs(cos(time*0.001));
  vec3 color1 = mix(colorA, colorC, progress);
  vec3 color2 = mix(colorB, colorD, progress);
  color = mix(color1, color2 , pct);
  gl_FragColor =  vec4(color,1.0);
}
