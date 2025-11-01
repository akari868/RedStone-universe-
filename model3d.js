// ===========================
// 3D Push-Pull Model Handler
// ===========================

let scene, camera, renderer, controls;
let pushCube, pullCube, dataNode, smartContract, dApp;
let raycaster, mouse;
let pushArrow, pullArrow;
let pushFlowParticles = [];
let pullFlowParticles = [];
let animationEnabled = true;

function init3DModel() {
    const container = document.querySelector('.model-container');
    const canvas = document.getElementById('threejs-canvas');
    
    if (!container || !canvas) {
        console.warn('Container or canvas not found');
        return;
    }
    
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }
    
    // Scene setup
    scene = new THREE.Scene();
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    scene.background = new THREE.Color(isDarkTheme ? 0x1a1a1a : 0xf0f0f0);
    
    // Camera setup
    const containerWidth = container.clientWidth;
    const containerHeight = 600;
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Controls - check if OrbitControls is available
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.minDistance = 5;
        controls.maxDistance = 15;
    } else {
        console.warn('OrbitControls not available, using basic rotation');
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
    scene.add(hemisphereLight);
    
    // Create central data node (Oracle)
    const dataNodeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const dataNodeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        emissive: 0x003300,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    dataNode = new THREE.Mesh(dataNodeGeometry, dataNodeMaterial);
    dataNode.position.set(0, 0, 0);
    dataNode.userData = { type: 'oracle' };
    scene.add(dataNode);
    
    // Create Smart Contract
    const contractGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 32);
    const contractMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffff00,
        emissive: 0x333300,
        shininess: 80
    });
    smartContract = new THREE.Mesh(contractGeometry, contractMaterial);
    smartContract.position.set(-3, 0, 0);
    smartContract.rotation.x = Math.PI / 2;
    smartContract.userData = { type: 'contract' };
    scene.add(smartContract);
    
    // Create DApp
    const dAppGeometry = new THREE.DodecahedronGeometry(0.8, 0);
    const dAppMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff00ff,
        emissive: 0x330033,
        shininess: 80
    });
    dApp = new THREE.Mesh(dAppGeometry, dAppMaterial);
    dApp.position.set(3, 0, 0);
    dApp.userData = { type: 'dapp' };
    scene.add(dApp);
    
    // Create Push Model elements (Red)
    const pushGeometry = new THREE.CapsuleGeometry(0.5, 1.2, 4, 8);
    const pushMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff4444,
        emissive: 0x330000,
        shininess: 100
    });
    pushCube = new THREE.Mesh(pushGeometry, pushMaterial);
    pushCube.position.set(-4.5, 2, 0);
    pushCube.rotation.z = Math.PI / 2;
    pushCube.userData = { type: 'push' };
    scene.add(pushCube);
    
    // Create Pull Model elements (Blue)
    const pullGeometry = new THREE.CapsuleGeometry(0.5, 1.2, 4, 8);
    const pullMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4444ff,
        emissive: 0x000033,
        shininess: 100
    });
    pullCube = new THREE.Mesh(pullGeometry, pullMaterial);
    pullCube.position.set(4.5, 2, 0);
    pullCube.rotation.z = Math.PI / 2;
    pullCube.userData = { type: 'pull' };
    scene.add(pullCube);
    
    // Create arrows for data flow
    // Push Model Arrow (Oracle → Smart Contract)
    const pushDir = new THREE.Vector3(-1, 0, 0);
    const pushOrigin = new THREE.Vector3(-1, 0, 0);
    pushArrow = new THREE.ArrowHelper(pushDir, pushOrigin, 2, 0xff6666, 0.4, 0.2);
    scene.add(pushArrow);
    
    // Pull Model Arrow (DApp → Oracle)
    const pullDir = new THREE.Vector3(-1, 0, 0);
    const pullOrigin = new THREE.Vector3(3, 0, 0);
    pullArrow = new THREE.ArrowHelper(pullDir, pullOrigin, 2, 0x6666ff, 0.4, 0.2);
    scene.add(pullArrow);
    
    // Add labels
    addTextLabel("Oracle", dataNode.position, 0x00ff00);
    addTextLabel("Smart Contract", smartContract.position, 0xffff00);
    addTextLabel("DApp", dApp.position, 0xff00ff);
    addTextLabel("Push Model", pushCube.position, 0xff4444);
    addTextLabel("Pull Model", pullCube.position, 0x4444ff);
    
    // Add edge highlights
    const edges1 = new THREE.EdgesGeometry(pushGeometry);
    const line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
    pushCube.add(line1);
    
    const edges2 = new THREE.EdgesGeometry(pullGeometry);
    const line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
    pullCube.add(line2);
    
    // Create particle systems for data flow
    createFlowParticles();
    
    // Raycaster for hover detection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Mouse move handler
    canvas.addEventListener('mousemove', onMouseMove);
    
    // Click handler for animation toggle
    canvas.addEventListener('click', () => {
        animationEnabled = !animationEnabled;
        const infoBox = document.getElementById('model-info-box');
        if (infoBox) {
            infoBox.textContent = animationEnabled ? 
                "Hover on elements to learn more • Drag to rotate • Scroll to zoom" : 
                "Animation paused • Click to resume • Hover for info";
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', onWindowResize);
    
    // Update info box to show it's ready
    const infoBox = document.getElementById('model-info-box');
    if (infoBox) {
        infoBox.textContent = 'Hover on elements to learn more • Drag to rotate • Scroll to zoom • Click to pause/resume animation';
        infoBox.style.background = 'rgba(0, 0, 0, 0.7)';
    }
    
    // Start animation
    animate();
    
    console.log('Enhanced 3D model initialized successfully');
}

function addTextLabel(text, position, color) {
    // In a real implementation, we would use a proper text rendering solution
    // For now, we'll just log the label positions for reference
    console.log(`Label: ${text} at position (${position.x}, ${position.y}, ${position.z})`);
}

function createFlowParticles() {
    // Create particles for push flow (Oracle → Smart Contract)
    for (let i = 0; i < 10; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xff6666 });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.userData = { 
            type: 'pushParticle',
            progress: Math.random(),
            speed: 0.01 + Math.random() * 0.01
        };
        scene.add(particle);
        pushFlowParticles.push(particle);
    }
    
    // Create particles for pull flow (DApp → Oracle)
    for (let i = 0; i < 10; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x6666ff });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.userData = { 
            type: 'pullParticle',
            progress: Math.random(),
            speed: 0.01 + Math.random() * 0.01
        };
        scene.add(particle);
        pullFlowParticles.push(particle);
    }
}

function updateFlowParticles() {
    // Update push flow particles
    pushFlowParticles.forEach(particle => {
        particle.userData.progress += particle.userData.speed;
        if (particle.userData.progress > 1) {
            particle.userData.progress = 0;
        }
        
        // Move particle along the path from Oracle to Smart Contract
        particle.position.x = dataNode.position.x - (dataNode.position.x - smartContract.position.x) * particle.userData.progress;
        particle.position.y = dataNode.position.y;
        particle.position.z = dataNode.position.z;
    });
    
    // Update pull flow particles
    pullFlowParticles.forEach(particle => {
        particle.userData.progress += particle.userData.speed;
        if (particle.userData.progress > 1) {
            particle.userData.progress = 0;
        }
        
        // Move particle along the path from DApp to Oracle
        particle.position.x = dApp.position.x - (dApp.position.x - dataNode.position.x) * particle.userData.progress;
        particle.position.y = dataNode.position.y;
        particle.position.z = dataNode.position.z;
    });
}

function onMouseMove(event) {
    const canvas = document.getElementById('threejs-canvas');
    const rect = canvas.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([pushCube, pullCube, dataNode, smartContract, dApp]);
    
    const infoBox = document.getElementById('model-info-box');
    
    // Reset scale for all objects
    [pushCube, pullCube, dataNode, smartContract, dApp].forEach(obj => {
        if (obj) obj.scale.set(1, 1, 1);
    });
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        object.scale.set(1.1, 1.1, 1.1);
        
        switch(object.userData.type) {
            case 'push':
                infoBox.textContent = "Push Model: Oracle proactively pushes data to Smart Contracts at regular intervals";
                infoBox.style.background = 'rgba(255, 68, 68, 0.9)';
                break;
            case 'pull':
                infoBox.textContent = "Pull Model: DApps request data on-demand through RedStone SDK when needed";
                infoBox.style.background = 'rgba(68, 68, 255, 0.9)';
                break;
            case 'oracle':
                infoBox.textContent = "Oracle: Central data source that fetches and validates real-world data";
                infoBox.style.background = 'rgba(0, 255, 0, 0.9)';
                break;
            case 'contract':
                infoBox.textContent = "Smart Contract: On-chain code that uses oracle data for DeFi applications";
                infoBox.style.background = 'rgba(255, 255, 0, 0.9)';
                break;
            case 'dapp':
                infoBox.textContent = "DApp: Decentralized application that interacts with smart contracts";
                infoBox.style.background = 'rgba(255, 0, 255, 0.9)';
                break;
        }
    } else {
        infoBox.textContent = "Hover on elements to learn more • Drag to rotate • Scroll to zoom • Click to pause/resume animation";
        infoBox.style.background = 'rgba(0, 0, 0, 0.7)';
    }
}

function onWindowResize() {
    const container = document.querySelector('.model-container');
    if (!container) return;
    
    const containerWidth = container.clientWidth;
    const containerHeight = 600;
    
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerWidth, containerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (animationEnabled) {
        // Rotate main elements
        if (pushCube && pullCube) {
            pushCube.rotation.y += 0.01;
            pullCube.rotation.y -= 0.01;
        }
        
        // Pulsate the data node
        if (dataNode) {
            const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
            dataNode.scale.set(scale, scale, scale);
        }
        
        // Update flow particles
        updateFlowParticles();
    }
    
    // Update controls if available
    if (controls && controls.update) {
        controls.update();
    }
    
    // Render scene
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Update 3D model theme when site theme changes
function update3DModelTheme(theme) {
    if (scene) {
        scene.background = new THREE.Color(theme === 'dark' ? 0x1a1a1a : 0xf0f0f0);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js library not loaded');
        const infoBox = document.getElementById('model-info-box');
        if (infoBox) {
            infoBox.textContent = 'Loading 3D model...';
            infoBox.style.background = 'rgba(255, 68, 68, 0.9)';
        }
        // Retry after a delay
        setTimeout(() => {
            if (typeof THREE !== 'undefined') {
                init3DModel();
            } else {
                if (infoBox) {
                    infoBox.textContent = 'Error loading 3D model. Please refresh the page.';
                }
            }
        }, 1000);
    } else {
        // Initialize immediately if loaded
        init3DModel();
    }
});

// Export for theme updates
if (typeof window !== 'undefined') {
    window.update3DModelTheme = update3DModelTheme;
}