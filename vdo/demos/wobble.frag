precision mediump float; 

// Uniforms passed in from CSS 
uniform float angle; 

// Varyings 
varying vec4 v_normal;

// Main 
void main() { 
	
    float a = angle;

    a /= 60.0;
    if(a >= 0.5){
        a = 1.0 - a;
    }

	css_MixColor = vec4(vec3(0.0), v_normal.z * a * 8.0);
}

