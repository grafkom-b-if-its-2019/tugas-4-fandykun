(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Inisialisasi shaders dan program untuk cube
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    var nameColor = [1.0, 0.0, 1.0];
    var cubeColor = [1.0, 0.0, 1.0];

    var namePoints = [
      [0.55, 0.4, 0],
      [0.47, 0.28, 0],
      [0.1, 0.4, 0],
      [0.2, 0.28, 0],
      [0.1, -0.4, 0],
      [0.2, -0.4, 0],
      [0.2, 0.1, 0],
      [0.55, 0.1, 0],
      [0.2, -0.02, 0],
      [0.55, -0.02, 0]
    ]

    var nameVertices = [
      0.55, 0.4, 0, ...nameColor,
      0.47, 0.28, 0, ...nameColor,
      0.1, 0.4, 0, ...nameColor,
      0.2, 0.28, 0, ...nameColor,
      0.1, -0.4, 0, ...nameColor,
      0.2, -0.4, 0, ...nameColor,
      0.2, -0.4, 0, ...nameColor,
      0.2, 0.1, 0, ...nameColor,
      0.2, 0.1, 0, ...nameColor,
      0.55, 0.1, 0, ...nameColor,
      0.2, -0.02, 0, ...nameColor,
      0.55, -0.02, 0, ...nameColor,
    ]

    // Definisi verteks dan buffer
    /* 
      A (-0.5, -0.5,  0.5)
      B (-0.5,  0.5,  0.5)
      C ( 0.5,  0.5,  0.5)
      D ( 0.5, -0.5,  0.5)
      E (-0.5, -0.5, -0.5)
      F (-0.5,  0.5, -0.5)
      G ( 0.5,  0.5, -0.5)
      H ( 0.5, -0.5, -0.5)
    */

    var sideA = [-0.5, -0.5,  0.5];
    var sideB = [-0.5,  0.5,  0.5];
    var sideC = [ 0.5,  0.5,  0.5];
    var sideD = [ 0.5, -0.5,  0.5];
    var sideE = [-0.5, -0.5, -0.5];
    var sideF = [-0.5,  0.5, -0.5];
    var sideG = [ 0.5,  0.5, -0.5];
    var sideH = [ 0.5, -0.5, -0.5];

    var cubePoints = [
      sideA,
      sideB,
      sideC,
      sideD,
      sideE,
      sideF,
      sideG,
      sideH
    ]

    console.log(cubePoints);

    var cubeVertices = [
      // x, y, z            r, g, b
      ...sideB,   ...cubeColor,  // Depan (BAD-BDC) Merah
      ...sideA,   ...cubeColor,
      ...sideD,   ...cubeColor,
      ...sideA,   ...cubeColor,
      ...sideD,   ...cubeColor,
      ...sideC,   ...cubeColor,
      ...sideB,   ...cubeColor,
      ...sideC,   ...cubeColor,

      ...sideC,   ...cubeColor, // Kanan (CDH-CHG) Hijau
      ...sideD,   ...cubeColor,
      ...sideH,   ...cubeColor,
      ...sideD,   ...cubeColor,
      ...sideH,   ...cubeColor,
      ...sideG,   ...cubeColor,
      ...sideC,   ...cubeColor,
      ...sideG,   ...cubeColor,

      ...sideD,   ...cubeColor, // Bawah (DAE-DEH) Biru
      ...sideA,   ...cubeColor,
      ...sideE,   ...cubeColor,
      ...sideA,   ...cubeColor,
      ...sideE,   ...cubeColor,
      ...sideH,   ...cubeColor,
      ...sideD,   ...cubeColor,
      ...sideH,   ...cubeColor,
      
      ...sideE,   ...cubeColor, // Belakang (EFG-EGH) Kuning
      ...sideF,   ...cubeColor,
      ...sideG,   ...cubeColor,
      ...sideF,   ...cubeColor,
      ...sideG,   ...cubeColor,
      ...sideH,   ...cubeColor,
      ...sideE,   ...cubeColor,
      ...sideH,   ...cubeColor,

      ...sideF,   ...cubeColor, // Kiri (FEA-FAB) Cyan
      ...sideE,   ...cubeColor,
      ...sideA,   ...cubeColor,
      ...sideE,   ...cubeColor,
      ...sideA,   ...cubeColor,
      ...sideB,   ...cubeColor,
      ...sideF,   ...cubeColor,
      ...sideB,   ...cubeColor,

      ...sideG,   ...cubeColor, // Atas (GFB-GBC) Magenta
      ...sideF,   ...cubeColor,
      ...sideB,   ...cubeColor,
      ...sideF,   ...cubeColor,
      ...sideB,   ...cubeColor,
      ...sideC,   ...cubeColor,
      ...sideG,   ...cubeColor,
      ...sideC,   ...cubeColor,
    ];

    var vertices = [];
    vertices.push(...cubeVertices);
    vertices.push(...nameVertices);

    // console.log(vertices);

    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    
    gl.vertexAttribPointer(
      vColor, 
      3, 
      gl.FLOAT, 
      gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 
      3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var thetaValue = 0.02;
    var theta = [0.0, 0.0, 0.0];
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;
    var axis = yAxis;
    var scale = 0.6, scaler = -0.0118;
    var x = 0.0118, y = 0.0118, z = 0.0118;
    var transX = 0.0, transY = 0.0, transZ = 0.0;
    var rotName = 0;
    var rotValue = 0.0118;

    var cubePlane = {
      top: null,
      bottom: null,
      left: null,
      right: null,
      front: null,
      back: null
    }

    // Definisi model, view dan projection
    var mmLoc = gl.getUniformLocation(program, 'model');
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');
    var mm = glMatrix.mat4.create();
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();
    var mmName = glMatrix.mat4.create();

    glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.5]);

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, -0.75),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );
    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);

    function matrixMultiplication(matA, matB) {
      var matC1 = matA[0]*matB[0] + matA[4]*matB[1] + matA[8]*matB[2] + matA[12]*matB[3];
      var matC2 = matA[1]*matB[0] + matA[5]*matB[1] + matA[9]*matB[2] + matA[13]*matB[3];
      var matC3 = matA[2]*matB[0] + matA[6]*matB[1] + matA[10]*matB[2] + matA[14]*matB[3];
      var matC4 = matA[3]*matB[0] + matA[7]*matB[1] + matA[11]*matB[2] + matA[15]*matB[3];
      return [matC1, matC2, matC3, matC4];
    }

    function calculateDistance(point, plane) {
      var v = glMatrix.vec3.create();
      var a = glMatrix.vec3.create();
      var b = glMatrix.vec3.create();
      var c = glMatrix.vec3.create();
      glMatrix.vec3.subtract(v, point, plane[0]);
      glMatrix.vec3.subtract(a, plane[1], plane[0]);
      glMatrix.vec3.subtract(b, plane[2], plane[1]);
      glMatrix.vec3.cross(c, a, b);
      return Math.abs(glMatrix.vec3.dot(v, c));
    }

    /**
     * 
     * @param {Array} namePos 
     */
    function collideAvoidance(namePos) {
      var eps = 0.01;
      var detectX = false, detectY = false, detectZ = false;

      for(var i = 0;i < namePos.length; i++) {
        if(calculateDistance(namePos[i], cubePlane.front) < eps)
          detectZ = true;
        if(calculateDistance(namePos[i], cubePlane.back) < eps)
          detectZ = true;
        if(calculateDistance(namePos[i], cubePlane.top) < eps)
          detectY = true;
        if(calculateDistance(namePos[i], cubePlane.bottom) < eps)
          detectY = true;
        if(calculateDistance(namePos[i], cubePlane.left) < eps)
          detectX = true;
        if(calculateDistance(namePos[i], cubePlane.right) < eps)
          detectX = true;
      }

      if(detectX){ x *= -1;  rotValue *= -1;} ;
      if(detectY) y *= -1;
      if(detectZ){ z *= -1;  rotValue *= -1;};
    }

    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Bersihkan buffer canvas

      // theta[axis] += thetaValue;
      if(axis == xAxis) glMatrix.mat4.rotateX(mm, mm, thetaValue);
      if(axis == yAxis) glMatrix.mat4.rotateY(mm, mm, thetaValue);
      if(axis == zAxis) glMatrix.mat4.rotateZ(mm, mm, thetaValue);
      gl.uniformMatrix4fv(mmLoc, false, mm);
      gl.drawArrays(gl.LINES, 0, 48);

      var currentPosName = [];
      var currentPosCube = [];

      for(var v = 0;v < cubePoints.length; v++) {
        var vertice = matrixMultiplication(mm, [...cubePoints[v], 1.0]);
        currentPosCube.push(vertice);
      }

      cubePlane.front = [currentPosCube[0], currentPosCube[1], currentPosCube[2]];
      cubePlane.back = [currentPosCube[4], currentPosCube[5], currentPosCube[6]];
      cubePlane.top = [currentPosCube[1], currentPosCube[2], currentPosCube[6]];
      cubePlane.bottom = [currentPosCube[0], currentPosCube[4], currentPosCube[7]];
      cubePlane.left = [currentPosCube[0], currentPosCube[1], currentPosCube[5]];
      cubePlane.right = [currentPosCube[2], currentPosCube[6], currentPosCube[7]];

      glMatrix.mat4.copy(mmName, mm);
      glMatrix.mat4.translate(mm, mm, [transX, transY, transZ]);
      glMatrix.mat4.rotateY(mm, mm, rotName);
      glMatrix.mat4.scale(mm, mm, [scale, scale, scale]);
      
      gl.uniformMatrix4fv(mmLoc, false, mm);
      gl.drawArrays(gl.TRIANGLE_STRIP, 48, 12);

      for(var v = 0;v < namePoints.length; v++) {
        var vertice = matrixMultiplication(mm, [...namePoints[v], 1.0]);
        currentPosName.push(vertice);
      }

      glMatrix.mat4.copy(mm, mmName);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      collideAvoidance(currentPosName);
      rotName += rotValue;
      transX += x;
      transY += y;
      transZ += z;

      requestAnimationFrame(render); 
    }
  
    function onKeyPress(event) {
      if(event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      }
      else if(event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      }
      else if(event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
      else if(event.keyCode == 83 || event.keyCode == 115) {
        thetaValue = 0.0;
      }
      else if(event.keyCode == 32) {
        thetaValue = 0.5;
      }
    }
  
    document.addEventListener('keypress', onKeyPress);

    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    render();
  }
})();
