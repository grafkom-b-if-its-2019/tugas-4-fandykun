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

    var nameNormal = [0.0, 0.0, 0.0];
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

    var uvDummy = [0.0, 0.0];
    var nameVertices = [
      0.55, 0.4, 0, ...nameNormal,
      0.47, 0.28, 0, ...nameNormal,
      0.1, 0.4, 0, ...nameNormal,
      0.2, 0.28, 0, ...nameNormal,
      0.1, -0.4, 0, ...nameNormal,
      0.2, -0.4, 0, ...nameNormal,
      0.2, -0.4, 0, ...nameNormal,
      0.2, 0.1, 0, ...nameNormal,
      0.2, 0.1, 0, ...nameNormal,
      0.55, 0.1, 0, ...nameNormal,
      0.2, -0.02, 0, ...nameNormal,
      0.55, -0.02, 0, ...nameNormal,
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

    var normalZ1 = [0.0, 0.0, 1.0];
    var normalZ2 = [0.0, 0.0, -1.0];
    var normalY1 = [0.0, 1.0, 0.0];
    var normalY2 = [0.0, -1.0, 0.0];
    var normalX1 = [1.0, 0.0, 0.0];
    var normalX2 = [-1.0, 0.0, 0.0];

    var cubeVertices = [
      // // x, y, z                  normal
      //   ...sideB,   0.0, 1.0,   ...normalZ1,  // Depan (BAD-BDC) Merah
      //   ...sideA,   0.0, 0.0,   ...normalZ1,
      //   ...sideD,   1.0, 0.0,   ...normalZ1,
      //   ...sideB,   0.0, 1.0,   ...normalZ1,
      //   ...sideD,   1.0, 0.0,   ...normalZ1,
      //   ...sideC,   1.0, 1.0,   ...normalZ1,

      ...sideC,   /*0.0, 0.5, */  ...normalX2, // Kanan (CDH-CHG) Hijau
      ...sideD,   /*0.0, 0.0, */  ...normalX2,
      ...sideH,   /*0.25, 0.0,*/   ...normalX2,
      ...sideC,   /*0.0, 0.5, */  ...normalX2,
      ...sideH,   /*0.25, 0.0,*/   ...normalX2,
      ...sideG,   /*0.25, 0.5,*/   ...normalX2,

      ...sideD,   /*0.25, 0.5,*/   ...normalY1, // Bawah (DAE-DEH) Biru
      ...sideA,   /*0.25, 0.0,*/   ...normalY1,
      ...sideE,   /*0.5, 0.0, */  ...normalY1,
      ...sideD,   /*0.25, 0.5,*/   ...normalY1,
      ...sideE,   /*0.5, 0.0, */  ...normalY1,
      ...sideH,   /*0.5, 0.5, */  ...normalY1,
      
      ...sideE,   /*0.5, 0.5, */  ...normalZ1, // Belakang (EFG-EGH) Kuning
      ...sideF,   /*0.5, 0.0, */  ...normalZ1,
      ...sideG,   /*0.75, 0.0,*/   ...normalZ1,
      ...sideE,   /*0.5, 0.5, */  ...normalZ1,
      ...sideG,   /*0.75, 0.0,*/   ...normalZ1,
      ...sideH,   /*0.75, 0.5,*/   ...normalZ1,

      ...sideF,   /*0.0, 1.0, */  ...normalX1, // Kiri (FEA-FAB) Cyan
      ...sideE,   /*0.0, 0.5, */  ...normalX1,
      ...sideA,   /*0.25, 0.5,*/   ...normalX1,
      ...sideF,   /*0.0, 1.0, */  ...normalX1,
      ...sideA,   /*0.25, 0.5,*/   ...normalX1,
      ...sideB,   /*0.25, 1.0,*/   ...normalX1,

      ...sideG,   /*0.25, 1.0,*/   ...normalY2, // Atas (GFB-GBC) Magenta
      ...sideF,   /*0.25, 0.5,*/   ...normalY2,
      ...sideB,   /*0.5, 0.5, */  ...normalY2,
      ...sideG,   /*0.25, 1.0,*/   ...normalY2,
      ...sideB,   /*0.5, 0.5, */  ...normalY2,
      ...sideC,   /*0.5, 1.0, */  ...normalY2,
    ];

    var vertices = [];
    vertices.push(...cubeVertices);
    vertices.push(...nameVertices);

    // console.log(vertices);

    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vNormal = gl.getAttribLocation(program, 'vNormal');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );

    gl.vertexAttribPointer(
      vNormal, 
      3, 
      gl.FLOAT, 
      gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vNormal);

    var texCoords = [
      0.0, 0.5, 
      0.0, 0.0, 
      0.25, 0.0,
      0.0, 0.5, 
      0.25, 0.0,
      0.25, 0.5,
      
      0.25, 0.5,
      0.25, 0.0,
      0.5, 0.0, 
      0.25, 0.5,
      0.5, 0.0, 
      0.5, 0.5, 
      
      0.5, 0.5, 
      0.5, 0.0, 
      0.75, 0.0,
      0.5, 0.5, 
      0.75, 0.0,
      0.75, 0.5,
      
      0.0, 1.0, 
      0.0, 0.5, 
      0.25, 0.5,
      0.0, 1.0, 
      0.25, 0.5,
      0.25, 1.0,
      
      0.25, 1.0,
      0.25, 0.5,
      0.5, 0.5, 
      0.25, 1.0,
      0.5, 0.5, 
      0.5, 1.0, 
    ]

    for(var i =0;i < 12;i++)
      texCoords.push(0, 0)

    console.log(texCoords);

    var texBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
    gl.vertexAttribPointer(
      vTexCoord, 
      2, 
      gl.FLOAT, 
      gl.FALSE, 
      2 * Float32Array.BYTES_PER_ELEMENT, 
      0
    );

    gl.enableVertexAttribArray(vTexCoord);

    var thetaValue = 0.02;
    var theta = [0.0, 0.0, 0.0];
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;
    var axis = zAxis;
    var scale = 0.35, scaler = -0.0118;
    var x = 0.00118, y = 0.001, z = 0.005;
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

    var mmLoc = gl.getUniformLocation(program, 'model');
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');

    // Uniform untuk definisi cahaya
    var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
    var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
    var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');
    
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();
    var mmName = glMatrix.mat4.create();
    var lightColor = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);
    var lightPosition = glMatrix.vec3.fromValues(0, 0, 0);
    var ambientColor = glMatrix.vec3.fromValues(0.17, 0.0, 0.118);

    gl.uniform3fv(lightColorLoc, lightColor);
    gl.uniform3fv(lightPositionLoc, lightPosition);
    gl.uniform3fv(ambientColorLoc, ambientColor);

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, -0.3),    // posisi kamera
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
      // Bersihkan buffer canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

      // theta[axis] += glMatrix.glMatrix.toRadian(0.5);
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -1.5]);
      glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
      glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      // glMatrix.mat4.rotateZ(mm, mm, thetaValue);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      gl.drawArrays(gl.TRIANGLES, 0, 30);

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

      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);
      glMatrix.vec3.transformMat4(lightPosition, [0.0, 0.0, 0.0], mm);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      console.log(lightPosition)

      gl.drawArrays(gl.TRIANGLE_STRIP, 30, 12);

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
    }
    var lastX, lastY, dragging;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        var factor = 10 / canvas.height;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        theta[yAxis] += dx;
        theta[xAxis] += dy;
      }
      lastX = x;
      lastY = y;
    }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keypress', onKeyPress);

    // Uniform untuk tekstur
    var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
    gl.uniform1i(sampler0Loc, 0);
    // Inisialisasi tekstur
    var texture = gl.createTexture();
    if (!texture) {
      reject(new Error('Gagal membuat objek tekstur'));
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Sementara warnai tekstur dengan sebuah 1x1 piksel biru
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    initTexture(function () {
      render();
    });

    function initTexture(callback, args) {
      var imageSource = 'images/selfie-01.jpg';
      var promise = new Promise(function(resolve, reject) {
        var image = new Image();
        if (!image) {
          reject(new Error('Gagal membuat objek gambar'));
        }
        image.onload = function() {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          resolve('Sukses');
        }
        image.src = imageSource;
      });
      promise.then(function() {
        if (callback) {
          callback(args);
        }
      }, function (error) {
        console.log('Galat pemuatan gambar', error);
      });
    }

    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

  }
})();
