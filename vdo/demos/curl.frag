/** spec: css */
precision mediump float; 

// Uniforms passed in from CSS. 
// uniform float bleedThrough; 
uniform float bleedFront;
uniform vec4 backColor;

// Varyings 
varying vec3 v_normal; 
varying float v_gradient; 

// Main 
void main() { 
	if (gl_FrontFacing) { 
		// Front shadows. 
		css_MixColor = vec4(vec3(bleedFront), 1.0 - v_normal.z ); 
	} else { 
		// Back shine. 
		// float gradient = clamp(v_gradient, 0.0, 1.0); 
		// css_MixColor = vec4(vec3(0.2), gradient * bleedThrough + (1.0 - bleedThrough)); 

		// Back color
		css_MixColor = backColor;

	}
}