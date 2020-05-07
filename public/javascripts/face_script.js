Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  ]).then(start)

  async function start(){
    console.log('Loded Models');
    const video = document.getElementById('vid');
    
    // const canvas = document.getElementById('overlay')
    
    onPlay(video);
  }

  async function onPlay(videoEl) {
    let results = await faceapi.detectAllFaces(videoEl).withFaceLandmarks();
    console.log(results);
    

    const canvas = $('#overlay').get(0)
    const dims = faceapi.matchDimensions(canvas, videoEl, true)
    dims.width = videoEl.clientWidth;
    dims.height = videoEl.clientHeight;
    canvas.width = videoEl.clientWidth;
    canvas.height = videoEl.clientHeight;
    const resizedResults = faceapi.resizeResults(results, dims)
    faceapi.draw.drawDetections(canvas, resizedResults)

    requestAnimationFrame(function(){
        onPlay(videoEl)
    })
  }
