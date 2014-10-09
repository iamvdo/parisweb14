precision mediump float; 
// Built-in attributes 
attribute vec4 a_position; 
attribute vec2 a_texCoord; 

// Built-in uniforms 
uniform mat4 u_projectionMatrix; 

// Uniforms passed in from CSS 
uniform mat4 transform; 
uniform vec2 curlPosition; 
uniform float curlDirection; 
uniform float curlRadius; 

// Varyings 
varying vec3 v_normal; 
varying float v_gradient; 

// Constants 
const float PI = 3.1415926; 

// Helper functions 
float rad(float deg) { 
	return deg * PI / 180.0; 
} 

// Main 
void main() { 
	vec4 position = a_position; 

	// Turn the curl direction into a vector. 
	float radCurlDirection = rad(curlDirection); 
	vec2 curlDirection = normalize(vec2(cos(radCurlDirection), sin(radCurlDirection))); 
	vec2 n = vec2(curlDirection.y, -curlDirection.x); 
	vec2 w = position.xy - curlPosition; 
	float d = dot(w, n); 
	vec2 dv = n * (2.0*d - PI*curlRadius); 

	// Projection angle (dr) 
	float dr = d/curlRadius; 
	float s = sin(dr); 
	float c = cos(dr); 

	// Projection of vertex on the curl axis projected on the xy plane (proj) 
	vec2 proj = position.xy - n*d; 
	vec3 center = vec3(proj, curlRadius); 
	// d > 0.0 (br1) 
	float br1 = clamp(sign(d), 0.0, 1.0); 
	// d > PI*u_curlRadius (br2) 
	float br2 = clamp(sign(d - PI*curlRadius), 0.0, 1.0); 
	vec3 vProj = vec3(s*n.x, s*n.y, 1.0 - c)*curlRadius; 
	vProj.xy += proj; 
	vec4 v = mix(position, vec4(vProj, position.w), br1); 
	v = mix(v, vec4(position.x - dv.x, position.y - dv.y, 2.0*curlRadius, a_position.w), br2); 
	v_normal = mix(vec3(0.0, 0.0, 1.0), (center - v.xyz)/curlRadius, br1); 
	v_normal = mix(v_normal, vec3(0.0, 0.0, -1.0), br2); 
	v_normal = normalize(v_normal); 

	// Scale the z axis appropriately for perspective values around 1000. 
	v.z *= 500.0; 

	// Position the vertex. 
	gl_Position = u_projectionMatrix * transform * v; 

	// Pass the backface gradient intensity to the fragment shader. 
	vec2 vw = v.xy - curlPosition; 
	float vd = dot(vw, -n); 
	v_gradient = -vd/curlRadius; 
}
























