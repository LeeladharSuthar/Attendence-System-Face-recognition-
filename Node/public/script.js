Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
            const video = document.getElementById('myVideo');
            video.srcObject = stream;

            video.addEventListener('play', () => {
                setInterval(async () => {
                    // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
                    // const landmarks = detections[0].landmarks._positions;  // detections = array of single object
                    // console.log(detections);  //This array contains the 68 facial landmark points

                    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
                    const descriptors = detections[0].descriptor // detections = arraay of single object
                    console.log(descriptors) // Array[128] containing descriptors

                }, 100);
            });
        })
        .catch((error) => {
            console.error('Error accessing webcam:', error);
        });
}
