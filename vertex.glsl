precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
varying vec3 fColor;

uniform mat4 model;
uniform mat4 projection;
uniform mat4 view;

void main() {
  fColor = vColor;
  gl_Position = projection * view * model * vec4(vPosition, 1.0);
}