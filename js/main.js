import * as THREE from 'three';
import { GEM_DATA } from './gem-data.js';

let scene, camera, renderer;
let gems = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

const tooltip = document.getElementById('tooltip');
const ttName = document.getElementById('tt-name');
const ttDesc = document.getElementById('tt-desc');

function formatText(text) { return text ? text.replace(/&([0-9a-f])/g, '') : ''; }

function init() {
    const container = document.getElementById('dock-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    scene = new THREE.Scene();

    // TELEPHOTO LENS (Low FOV to flatten perspective)
    camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 200);
    // Adjusted: Further back + Zoomed in = Parallel vertical lines
    camera.position.set(0, 5, 55);
    // Look lower to keep dock centered
    camera.lookAt(0, -2.0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(2, 5, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    createDock();

    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    animate();
}

function createDock() {
    const loader = new THREE.TextureLoader();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    const scale = 2.6;
    const spacing = 2.6;

    const startX = -((GEM_DATA.length - 1) * spacing) / 2;

    GEM_DATA.forEach((data, index) => {
        const texture = loader.load(data.texture);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;

        const matParams = {
            map: texture,
            roughness: 0.3,
            metalness: 0.1,
            emissive: data.color || 0xffffff,
            emissiveIntensity: 0
        };

        let materials;
        if (data.topTexture) {
            const topTex = loader.load(data.topTexture);
            topTex.magFilter = THREE.NearestFilter;
            topTex.colorSpace = THREE.SRGBColorSpace;
            const sideMat = new THREE.MeshStandardMaterial(matParams);
            const topMat = new THREE.MeshStandardMaterial({ ...matParams, map: topTex });
            materials = [sideMat, sideMat, topMat, topMat, sideMat, sideMat];
        } else {
            materials = new THREE.MeshStandardMaterial(matParams);
        }

        const mesh = new THREE.Mesh(boxGeo, materials);
        const xPos = startX + (index * spacing);

        mesh.position.set(xPos, 0, 0);
        mesh.scale.setScalar(scale);
        mesh.rotation.set(0, 0, 0);

        mesh.castShadow = true;

        mesh.userData = { data: data, hovered: false };
        scene.add(mesh);
        gems.push(mesh);

        // --- REFLECTION ---
        let refMaterials;
        if (Array.isArray(materials)) {
            refMaterials = materials.map(m => {
                const c = m.clone(); c.transparent = true; c.opacity = 0.3; return c;
            });
        } else {
            refMaterials = materials.clone(); refMaterials.transparent = true; refMaterials.opacity = 0.3;
        }

        const refMesh = new THREE.Mesh(boxGeo, refMaterials);

        refMesh.scale.set(scale, -scale, scale);
        // Correct position logic for kissing contact
        refMesh.position.set(xPos, -2.6, 0);
        refMesh.rotation.set(0, 0, 0);

        scene.add(refMesh);

        mesh.userData.ref = refMesh;
    });
}

function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(gems);

    if (intersects.length > 0) {
        document.body.style.cursor = 'help';
        const hoveredGem = intersects[0].object;

        gems.forEach(g => {
            if (g !== hoveredGem) {
                g.userData.hovered = false;
                setGlow(g, 0);
            }
        });

        if (!hoveredGem.userData.hovered) {
            hoveredGem.userData.hovered = true;
            setGlow(hoveredGem, 0.6);
            showTooltip(hoveredGem.userData.data, hoveredGem);
        }
    } else {
        document.body.style.cursor = 'default';
        gems.forEach(g => {
            if (g.userData.hovered) {
                g.userData.hovered = false;
                setGlow(g, 0);
            }
        });
        tooltip.classList.remove('active');
    }
}

function setGlow(mesh, val) {
    if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.emissiveIntensity = val);
    } else {
        mesh.material.emissiveIntensity = val;
    }
}

function showTooltip(data, mesh) {
    ttName.innerText = formatText(data.name).toUpperCase();
    ttDesc.innerText = data.description;

    // Calculate Position
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(mesh.matrixWorld);
    vector.y += 1.8; // Offset above gem

    vector.project(camera);

    const container = renderer.domElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const rect = container.getBoundingClientRect();

    const x = (vector.x * 0.5 + 0.5) * width + rect.left;
    const y = -(vector.y * 0.5 - 0.5) * height + rect.top;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;

    tooltip.classList.add('active');
}

function animate() {
    requestAnimationFrame(animate);

    gems.forEach(gem => {
        if (gem.userData.hovered) {
            gem.position.y = THREE.MathUtils.lerp(gem.position.y, 0.4, 0.15);
            if (gem.userData.ref) {
                gem.userData.ref.position.y = THREE.MathUtils.lerp(gem.userData.ref.position.y, -3.0, 0.15);
            }
        } else {
            gem.position.y = THREE.MathUtils.lerp(gem.position.y, 0, 0.15);
            if (gem.userData.ref) {
                gem.userData.ref.position.y = THREE.MathUtils.lerp(gem.userData.ref.position.y, -2.6, 0.15);
            }
        }
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('dock-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

try { init(); } catch (e) { console.error(e); }
