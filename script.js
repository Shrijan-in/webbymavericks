// --- Intersection Observer for Scroll Animations ---
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // Handle horizontal scroll on Work Carousel for mouse wheel
    const workCarousel = document.querySelector('.work-carousel');
    if (workCarousel) {
        workCarousel.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                const scrollLeft = workCarousel.scrollLeft;
                const maxScrollLeft = workCarousel.scrollWidth - workCarousel.clientWidth;
                if ((e.deltaY > 0 && scrollLeft < maxScrollLeft - 1) || (e.deltaY < 0 && scrollLeft > 1)) {
                    e.preventDefault();
                    workCarousel.scrollBy({
                        left: e.deltaY > 0 ? 300 : -300,
                        behavior: 'smooth'
                    });
                }
            }
        }, { passive: false });
    }

    // Dynamic Hover colors for Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.dataset.lastHue = Math.floor(Math.random() * 360);
        card.addEventListener('mouseenter', function() {
            let lastHue = parseInt(this.dataset.lastHue || "0");
            // Jump by at least 90-150 degrees to guarantee a distinctly different color
            let newHue = (lastHue + 90 + Math.floor(Math.random() * 180)) % 360; 
            this.dataset.lastHue = newHue;
            
            // Apply dynamic colors mimicking the premium styling glow
            this.style.backgroundColor = `hsla(${newHue}, 80%, 15%, 0.6)`;
            this.style.borderColor = `hsla(${newHue}, 80%, 65%, 0.4)`;
            this.style.boxShadow = `0 20px 40px hsla(${newHue}, 100%, 50%, 0.15)`;
            
            // Make the icon match the dynamic theme!
            let icon = this.querySelector('.material-symbols-outlined');
            if (icon) icon.style.color = `hsl(${newHue}, 90%, 75%)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderColor = '';
            this.style.boxShadow = '';
            
            let icon = this.querySelector('.material-symbols-outlined');
            if (icon) icon.style.color = '';
        });
    });
    
    // Active Navigation Scroll Spy
    const navSections = document.querySelectorAll('#home, #services, #works, #contact');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px'
    });

    navSections.forEach(sec => {
        scrollSpyObserver.observe(sec);
    });
});

// --- Dynamic Canvas Global Background Animation ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d', { alpha: false }); // optimization: no transparent background processing needed, we draw black

let width, height, maxScrollHeight;
let time = 0;
let scrollY = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxScrollHeight = Math.max(document.body.scrollHeight, height * 3);
}
window.addEventListener('resize', resize);

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
}, { passive: true });

// Mouse Tracking
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;
const trail = [];

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// --- Interative Space Environment Setup ---

// 1. Stars (Parallax layers)
const stars = [];
const numStars = window.innerWidth < 768 ? 200 : 400; // Performance tuning
for(let i=0; i<numStars; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 5), // Spread across a deep vertical space
        size: Math.random() * 1.5,
        parallaxOffset: Math.random() * 0.8 + 0.2, // Depth factor
        brightness: Math.random()
    });
}

// 2. Planets & Galaxies
const celestialBodies = [];
const bodyColors = [
    ['#d946ef', '#c026d3'], // Vibrant Purple
    ['#ffdf96', '#6f5500'], // Gold/Orange
    ['#ebd3ff', '#a855f7'], // Light Purple
    ['#ffb4ab', '#93000a'], // Reddish
];

for(let i=0; i<8; i++) {
    let colorSet = bodyColors[Math.floor(Math.random() * bodyColors.length)];
    celestialBodies.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 5),
        radius: Math.random() * 40 + 20,
        colorOuter: colorSet[0],
        colorInner: colorSet[1],
        parallaxOffset: Math.random() * 0.4 + 0.1,
        orbitTimeBase: Math.random() * 100,
        type: Math.random() > 0.3 ? 'planet' : 'galaxy'
    });
}

// 3. The Interactive 3D Cursor Geometry (Rocket Model)
const geomVertices = [
    {x: 0, y: -2, z: 0},       // 0: Nose
    {x: -0.5, y: -0.5, z: 0.5},// 1: Front top-L
    {x: 0.5, y: -0.5, z: 0.5}, // 2: Front top-R
    {x: 0.5, y: -0.5, z: -0.5},// 3: Front bot-R
    {x: -0.5, y: -0.5, z: -0.5},// 4: Front bot-L
    {x: -0.5, y: 1, z: 0.5},   // 5: Rear top-L
    {x: 0.5, y: 1, z: 0.5},    // 6: Rear top-R
    {x: 0.5, y: 1, z: -0.5},   // 7: Rear bot-R
    {x: -0.5, y: 1, z: -0.5},  // 8: Rear bot-L
    {x: -1.2, y: 1.5, z: 0},   // 9: Left Fin
    {x: 1.2, y: 1.5, z: 0},    // 10: Right Fin
    {x: 0, y: 1.5, z: 1.2},    // 11: Top Fin
    {x: 0, y: 1.5, z: -1.2}    // 12: Bottom Fin
];
const geomEdges = [
    [0,1], [0,2], [0,3], [0,4], // Nose cone
    [1,2], [2,3], [3,4], [4,1], // Body top ring
    [1,5], [2,6], [3,7], [4,8], // Body vertical sides
    [5,6], [6,7], [7,8], [8,5], // Body bottom ring
    [5,9], [8,9],   // Left Fin
    [6,10], [7,10], // Right fin
    [5,11], [6,11], // Top fin
    [7,12], [8,12]  // Bottom fin
];

function project3D(x, y, z, cx, cy, rotX, rotY, rotZ, scale) {
    // Barrel roll (spin around its local Y axis pointing up)
    let tempX = x * Math.cos(rotY) - z * Math.sin(rotY);
    let tempZ = z * Math.cos(rotY) + x * Math.sin(rotY);
    x = tempX; z = tempZ;

    // Pitch/Roll tilt
    let tempY = y * Math.cos(rotX) - z * Math.sin(rotX);
    tempZ = z * Math.cos(rotX) + y * Math.sin(rotX);
    y = tempY; z = tempZ;
    
    // Heading (Rotate around global Z axis to point to mouse path)
    tempX = x * Math.cos(rotZ) - y * Math.sin(rotZ);
    tempY = y * Math.cos(rotZ) + x * Math.sin(rotZ);
    x = tempX; y = tempY;
    
    return {
        x: cx + x * scale,
        y: cy + y * scale,
        z: z
    };
}

const shootingStars = [];
let rocketHeading = 0;

// --- Main Render Loop ---

function render() {
    // Fill deep black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Render Stars
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<stars.length; i++) {
        let s = stars[i];
        // Calculate vertical parallax
        let py = s.y - (scrollY * s.parallaxOffset);
        
        // Wrap vertically to keep canvas populated
        if(py < -10) s.y += (maxScrollHeight + height);
        if(py > maxScrollHeight + height) s.y -= (maxScrollHeight + height);
        
        // Viewport culling (Optimize!)
        if (py >= -5 && py <= height + 5) {
            let twinkle = s.brightness + Math.sin(time + i) * 0.3;
            ctx.globalAlpha = Math.max(0.1, Math.min(1, twinkle));
            ctx.beginPath();
            ctx.arc(s.x, py, s.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;

    // Render Shooting Stars
    if (Math.random() < 0.015) {
        shootingStars.push({
            x: Math.random() * width * 1.5,
            y: -100,
            vx: -15 - Math.random() * 15,
            vy: 15 + Math.random() * 15,
            life: 1
        });
    }
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 0.015;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 3, ss.y - ss.vy * 3);
        ctx.strokeStyle = `rgba(235, 211, 255, ${Math.max(0, ss.life)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (ss.life <= 0) shootingStars.splice(i, 1);
    }

    // Render Celestial Bodies (Interactive Planets/Galaxies)
    for(let i=0; i<celestialBodies.length; i++) {
        let b = celestialBodies[i];
        let py = b.y - (scrollY * b.parallaxOffset);
        
        // Wrap vertically
        if(py < -200) b.y += height * 5;
        if(py > height * 5 + 200) b.y -= height * 5;

        // Viewport culling
        if(py >= -b.radius-50 && py <= height + b.radius+50) {
            // Interactive element: Repel slightly from cursor
            let dx = mouseX - b.x;
            let dy = mouseY - py;
            let dist = Math.sqrt(dx*dx + dy*dy);
            
            let reactiveX = b.x;
            let reactiveY = py;
            
            if(dist < 200) {
                let force = (200 - dist) / 200; // 0 to 1
                reactiveX -= (dx * force * 0.2);
                reactiveY -= (dy * force * 0.2);
            }

            // Draw Body
            if (b.type === 'planet') {
                const grad = ctx.createRadialGradient(reactiveX - b.radius*0.3, reactiveY - b.radius*0.3, 0, reactiveX, reactiveY, b.radius);
                grad.addColorStop(0, b.colorOuter);
                grad.addColorStop(0.6, b.colorInner);
                grad.addColorStop(1, 'transparent');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(reactiveX, reactiveY, b.radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Saturn-like ring randomly
                if(i % 3 === 0) {
                    ctx.beginPath();
                    ctx.ellipse(reactiveX, reactiveY, b.radius * 1.8, b.radius * 0.4, time * 0.2 + i, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255,255,255,0.15)`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            } else {
                // Galaxy spiral representation
                ctx.save();
                ctx.translate(reactiveX, reactiveY);
                ctx.rotate(time * 0.1 * b.parallaxOffset);
                let gGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, b.radius * 2);
                gGrad.addColorStop(0, `${b.colorOuter}`);
                gGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = gGrad;
                ctx.globalAlpha = 0.5;
                ctx.beginPath(); ctx.arc(0, 0, b.radius * 2, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
        }
    }
    ctx.globalAlpha = 1;

    // --- Interactive 3D Cursor Trailing Logic ---
    let dx = mouseX - targetX;
    let dy = mouseY - targetY;
    
    // Smooth trailing spring
    targetX += dx * 0.15; 
    targetY += dy * 0.15;
    
    // Maintain heading angle towards movement
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        let rawAngle = Math.atan2(dy, dx);
        // Simple lerp for visual rotation
        let diff = rawAngle - rocketHeading;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        rocketHeading += diff * 0.1;
    }
    
    trail.push({x: targetX, y: targetY});
    if (trail.length > 25) trail.shift(); 
    
    // Draw Dynamic Ribbon Trail behind the Rocket
    if (trail.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
            let xc = (trail[i].x + trail[i - 1].x) / 2;
            let yc = (trail[i].y + trail[i - 1].y) / 2;
            ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, xc, yc);
        }
        ctx.quadraticCurveTo(trail[trail.length - 1].x, trail[trail.length - 1].y, targetX, targetY);
        ctx.strokeStyle = 'rgba(217, 70, 239, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
    
    // Draw 3D Rocket Element
    let rotY = time * 3; // Barrel roll speed
    let rotX = 0; // Slight pitch up/down optional
    let rotZ = rocketHeading + Math.PI / 2; // Point nose towards path
    const radius = 18; // Size of the rocket
    
    ctx.strokeStyle = 'rgba(235, 211, 255, 1)'; 
    ctx.lineWidth = 1;
    for(let edge of geomEdges) {
        let p1 = project3D(geomVertices[edge[0]].x, geomVertices[edge[0]].y, geomVertices[edge[0]].z, targetX, targetY, rotX, rotY, rotZ, radius);
        let p2 = project3D(geomVertices[edge[1]].x, geomVertices[edge[1]].y, geomVertices[edge[1]].z, targetX, targetY, rotX, rotY, rotZ, radius);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    // Glowing 3D Vertices
    for(let i=0; i<geomVertices.length; i++) {
        let p = project3D(geomVertices[i].x, geomVertices[i].y, geomVertices[i].z, targetX, targetY, rotX, rotY, rotZ, radius);
        if(p.z > 0) { 
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1, 2 - p.z*0.5), 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.fillStyle = 'rgba(217, 70, 239, 0.4)';
            ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2); ctx.fill();
        }
    }

    time += 0.01;
    requestAnimationFrame(render);
}

// Kickoff
resize();
render();
