/* ═══════════════════════════════════════════
   MAIN — Portfolio Scene Engine v2
   Bigger Character & Trees · House & Room
   Cherry Blossoms · Day/Night · Fun Facts
   ═══════════════════════════════════════════ */

const App = {
    canvas: null, ctx: null,
    W: 0, H: 0,
    camera: { x: 0 },
    worldW: 3000,
    keys: {},
    character: { x: 800, y: 0, vx: 0, dir: 1, frame: 0 },
    petals: [],
    trees: [],
    clouds: [],
    signs: [],
    house: null,
    dayNight: { time: 0, isNight: false, cycleLen: 90 },
    funFacts: {
        list: [
            "I can solve a Rubik's cube in under 2 minutes!",
            "My favorite programming language is JavaScript.",
            "I want to study Biomedical Engineering in college.",
            "I've been coding since I was 14 years old.",
            "My favorite game of all time is Minecraft.",
            "I dream of creating my own game studio one day.",
            "I love watching anime in my free time.",
            "Medicine + Engineering + CS = my perfect career combo.",
            "I built this entire portfolio by myself!",
            "My school banned game websites... so I made my own 😎",
            "I'm working on a Roblox game releasing May 2026.",
            "Cherry blossoms are my favorite trees 🌸",
            "I'm from Avon, Indiana — Go Orioles!",
            "I love a good jazz playlist while I code.",
            "Fun fact: this site has 14 hidden achievements!",
        ],
        current: 0,
        lastChange: 0,
        interval: 90000, // 90 seconds
    },
    started: false,

    start() {
        if (this.started) return;
        this.started = true;

        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Input
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) e.preventDefault();
        });
        document.addEventListener('keyup', (e) => this.keys[e.code] = false);

        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        // UI Buttons
        document.getElementById('musicToggle').addEventListener('click', () => this.toggleMusic());
        document.getElementById('achievementsBtn').addEventListener('click', () => this.openModal('achievementsModal'));

        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(btn.dataset.close));
        });

        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                this.closeModal('gamesModal');
                this.launchGame(card.dataset.game);
            });
        });

        document.getElementById('backToPortfolio').addEventListener('click', () => this.closeGame());

        document.querySelectorAll('.modal').forEach(m => {
            m.addEventListener('click', (e) => { if (e.target === m) this.closeModal(m.id); });
        });

        this.initTrees();
        this.initClouds();
        this.initSigns();
        this.initHouse();
        this.initPetals();
        Achievements.init();
        this.drawAboutChar();
        this.showFunFact();

        this.loop();
    },

    resize() {
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.canvas.width = this.W;
        this.canvas.height = this.H;
        this.character.y = this.H - 110;
    },

    /* ═══════════ SCENE INIT ═══════════ */

    initTrees() {
        this.trees = [];
        const positions = [100, 420, 750, 1150, 1550, 1900, 2250, 2600, 2900];
        positions.forEach(x => {
            this.trees.push({
                x,
                height: 200 + Math.random() * 100,
                canopyR: 100 + Math.random() * 55,
                blossomHue: 330 + Math.random() * 20,
                sway: Math.random() * Math.PI * 2,
            });
        });
    },

    initClouds() {
        this.clouds = [];
        for (let i = 0; i < 10; i++) {
            this.clouds.push({
                x: Math.random() * this.worldW,
                y: 30 + Math.random() * 90,
                w: 90 + Math.random() * 140,
                speed: 0.12 + Math.random() * 0.25,
            });
        }
    },

    initSigns() {
        this.signs = [
            { x: 400, label: 'ABOUT ME', action: 'about', emoji: '📜' },
            { x: 1250, label: 'GAMES', action: 'games', emoji: '🎮' },
        ];
    },

    initHouse() {
        this.house = {
            x: 1800,
            w: 260,
            h: 200,
            roofH: 80,
            doorW: 50,
            doorH: 70,
        };
    },

    initPetals() {
        this.petals = [];
        for (let i = 0; i < 80; i++) this.petals.push(this.makePetal());
    },

    makePetal() {
        return {
            x: Math.random() * this.worldW,
            y: -20 - Math.random() * (this.H || 600),
            size: 3 + Math.random() * 5,
            speedY: 0.3 + Math.random() * 0.7,
            speedX: -0.4 + Math.random() * 0.8,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: 0.01 + Math.random() * 0.03,
            alpha: 0.5 + Math.random() * 0.5,
        };
    },

    /* ═══════════ FUN FACTS ═══════════ */

    showFunFact() {
        const ff = this.funFacts;
        const el = document.getElementById('funFactText');
        const container = document.getElementById('funFacts');
        if (!el || !container) return;

        el.textContent = ff.list[ff.current % ff.list.length];
        container.classList.remove('hidden');

        // Re-trigger animation
        container.style.animation = 'none';
        container.offsetHeight; // force reflow
        container.style.animation = '';

        ff.current++;
        ff.lastChange = performance.now();
    },

    updateFunFacts() {
        const now = performance.now();
        if (now - this.funFacts.lastChange > this.funFacts.interval) {
            this.showFunFact();
        }
    },

    /* ═══════════ MAIN LOOP ═══════════ */

    loop() {
        requestAnimationFrame(() => this.loop());
        const t = performance.now() / 1000;

        this.updateDayNight(t);
        this.updateCharacter();
        this.updateCamera();
        this.updatePetals();
        this.updateClouds(t);
        this.updateFunFacts();
        this.draw(t);
    },

    /* ═══════════ DAY/NIGHT ═══════════ */

    updateDayNight(t) {
        const cycle = this.dayNight.cycleLen;
        const phase = (t % (cycle * 2)) / (cycle * 2);
        this.dayNight.time = phase;
        const wasNight = this.dayNight.isNight;
        this.dayNight.isNight = phase > 0.5;
        if (!wasNight && this.dayNight.isNight) Achievements.unlock('night_owl');

        const display = document.getElementById('timeDisplay');
        if (display) {
            if (this.dayNight.isNight) { display.textContent = '🌙 Night'; display.style.color = '#BB86FC'; }
            else { display.textContent = '☀️ Day'; display.style.color = '#FFD54F'; }
        }
    },

    getDayNightFactor() {
        const p = this.dayNight.time;
        if (p < 0.4) return 0;
        if (p < 0.5) return (p - 0.4) / 0.1;
        if (p < 0.9) return 1;
        return 1 - (p - 0.9) / 0.1;
    },

    /* ═══════════ CHARACTER ═══════════ */

    updateCharacter() {
        const ch = this.character;
        const speed = 3.5;
        if (this.keys.ArrowLeft || this.keys.KeyA) { ch.vx = -speed; ch.dir = -1; }
        else if (this.keys.ArrowRight || this.keys.KeyD) { ch.vx = speed; ch.dir = 1; }
        else { ch.vx *= 0.8; if (Math.abs(ch.vx) < 0.2) ch.vx = 0; }

        ch.x += ch.vx;
        ch.x = Math.max(40, Math.min(this.worldW - 40, ch.x));
        ch.y = this.H - 110;

        if (Math.abs(ch.vx) > 0.5) {
            ch.frame += 0.15;
            Achievements.addWalk(Math.abs(ch.vx));
        }
    },

    updateCamera() {
        const target = this.character.x - this.W / 2;
        this.camera.x += (target - this.camera.x) * 0.08;
        this.camera.x = Math.max(0, Math.min(this.worldW - this.W, this.camera.x));
    },

    updatePetals() {
        this.petals.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(performance.now() / 1000 + p.rot) * 0.3;
            p.rot += p.rotSpeed;
            if (p.y > this.H + 20) { p.y = -20; p.x = this.camera.x + Math.random() * this.W; }
        });
    },

    updateClouds() {
        this.clouds.forEach(c => {
            c.x += c.speed;
            if (c.x > this.worldW + 200) c.x = -200;
        });
    },

    /* ═══════════ DRAW ═══════════ */

    draw(t) {
        const { ctx, W, H } = this;
        const cam = this.camera.x;
        const nf = this.getDayNightFactor();

        this.drawSky(nf);
        if (nf > 0.1) this.drawStars(t, nf);
        this.drawCelestial(t, nf);
        this.drawClouds(cam, nf);
        this.drawHills(cam, nf);
        this.drawGround(cam, nf);
        this.drawTrees(t, cam, nf);
        this.drawHouse(t, cam, nf);
        this.drawSigns(t, cam);
        this.drawCharacter(t, cam);
        this.drawPetals(cam);
        this.drawVignette();
    },

    drawSky(nf) {
        const { ctx, W, H } = this;
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        const lerp = (a, b, f) => a.map((v, i) => Math.round(v + (b[i] - v) * f));
        const top = lerp([135,206,250], [10,10,35], nf);
        const bot = lerp([200,230,201], [20,15,50], nf);
        grad.addColorStop(0, `rgb(${top})`);
        grad.addColorStop(1, `rgb(${bot})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
    },

    drawStars(t, nf) {
        const { ctx, W, H } = this;
        for (let i = 0; i < 80; i++) {
            const sx = (i * 97 + 10) % W;
            const sy = (i * 53 + 5) % (H * 0.5);
            const tw = 0.3 + Math.sin(t * 2 + i * 0.7) * 0.3;
            ctx.globalAlpha = tw * nf;
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(sx, sy, 1 + (i % 3) * 0.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
    },

    drawCelestial(t, nf) {
        const { ctx, W } = this;
        const cx = W * 0.82, cy = 65, r = 38;
        if (nf < 0.5) {
            ctx.globalAlpha = 1 - nf * 2;
            const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 3);
            glow.addColorStop(0, 'rgba(255,200,50,0.3)'); glow.addColorStop(1, 'rgba(255,200,50,0)');
            ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, r * 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FFE082'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = (nf - 0.5) * 2;
            const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.5);
            glow.addColorStop(0, 'rgba(200,200,220,0.2)'); glow.addColorStop(1, 'rgba(200,200,220,0)');
            ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, r * 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#dde'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = 'rgba(0,0,0,0.08)';
            ctx.beginPath(); ctx.arc(cx + 8, cy - 5, 7, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(cx - 10, cy + 8, 5, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 1;
        }
    },

    drawClouds(cam, nf) {
        const { ctx } = this;
        const b = 255 - Math.round(nf * 180);
        this.clouds.forEach(c => {
            const sx = c.x - cam * 0.3;
            ctx.fillStyle = `rgba(${b},${b},${b + 10},${0.55 - nf * 0.3})`;
            ctx.beginPath();
            ctx.arc(sx, c.y, c.w * 0.2, 0, Math.PI * 2);
            ctx.arc(sx + c.w * 0.22, c.y - c.w * 0.08, c.w * 0.26, 0, Math.PI * 2);
            ctx.arc(sx + c.w * 0.52, c.y, c.w * 0.22, 0, Math.PI * 2);
            ctx.arc(sx + c.w * 0.37, c.y + c.w * 0.05, c.w * 0.18, 0, Math.PI * 2);
            ctx.fill();
        });
    },

    drawHills(cam, nf) {
        const { ctx, W, H } = this;
        const lerpC = (d, n, f) => `rgb(${d.map((v, i) => Math.round(v + (n[i] - v) * f))})`;
        // Far hills
        ctx.fillStyle = lerpC([120,180,80], [20,40,25], nf);
        ctx.beginPath(); ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 2) {
            const wx = x + cam * 0.35;
            ctx.lineTo(x, H * 0.5 + Math.sin(wx * 0.003) * 55 + Math.sin(wx * 0.007) * 30);
        }
        ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
        // Near hills
        ctx.fillStyle = lerpC([100,160,60], [15,30,15], nf);
        ctx.beginPath(); ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 2) {
            const wx = x + cam * 0.55;
            ctx.lineTo(x, H * 0.6 + Math.sin(wx * 0.005 + 1) * 40 + Math.sin(wx * 0.01) * 22);
        }
        ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    },

    drawGround(cam, nf) {
        const { ctx, W, H } = this;
        const gy = H - 80;
        const lerpC = (d, n, f) => `rgb(${d.map((v, i) => Math.round(v + (n[i] - v) * f))})`;
        ctx.fillStyle = lerpC([90,150,50], [20,40,15], nf);
        ctx.fillRect(0, gy, W, H - gy);

        // Grass blades
        ctx.strokeStyle = nf < 0.5 ? `rgba(50,120,30,${0.35 - nf * 0.25})` : 'rgba(20,50,10,0.15)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < W; x += 7) {
            const wx = x + cam;
            ctx.beginPath();
            ctx.moveTo(x, gy);
            ctx.quadraticCurveTo(x + 2, gy - 7 - Math.sin(wx * 0.1) * 3, x + 4, gy);
            ctx.stroke();
        }

        // Flowers
        const cols = ['#FF6B9D', '#FFB74D', '#E040FB', '#FF5252', '#FFEB3B'];
        ctx.globalAlpha = 0.7 - nf * 0.4;
        for (let i = 0; i < 40; i++) {
            const fx = ((i * 79) % this.worldW) - cam;
            if (fx < -10 || fx > W + 10) continue;
            ctx.fillStyle = cols[i % cols.length];
            ctx.beginPath(); ctx.arc(fx, gy + 3 + (i % 5) * 3, 2.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
    },

    /* ═══════════ TREES (BIGGER) ═══════════ */

    drawTrees(t, cam, nf) {
        const { ctx, H } = this;
        const gy = H - 80;

        this.trees.forEach(tree => {
            const sx = tree.x - cam;
            if (sx < -200 || sx > this.W + 200) return;
            const sway = Math.sin(t * 0.5 + tree.sway) * 4;

            // Trunk (thicker)
            const tw = 18;
            ctx.fillStyle = nf > 0.5 ? '#2a1a10' : '#4a3020';
            ctx.beginPath();
            ctx.moveTo(sx - tw / 2, gy);
            ctx.lineTo(sx - tw / 2 + 3 + sway * 0.3, gy - tree.height);
            ctx.lineTo(sx + tw / 2 - 3 + sway * 0.3, gy - tree.height);
            ctx.lineTo(sx + tw / 2, gy);
            ctx.closePath(); ctx.fill();

            // Branches
            const by = gy - tree.height;
            ctx.strokeStyle = nf > 0.5 ? '#2a1a10' : '#4a3020';
            ctx.lineWidth = 4;
            [[-1, -0.6], [1, -0.4], [-0.5, -0.8], [0.7, -0.7]].forEach(([dx, dy]) => {
                ctx.beginPath();
                ctx.moveTo(sx + sway * 0.3, by + 20);
                ctx.quadraticCurveTo(
                    sx + dx * tree.canopyR * 0.5 + sway,
                    by + dy * tree.canopyR * 0.3,
                    sx + dx * tree.canopyR * 0.7 + sway,
                    by + dy * tree.canopyR * 0.5
                );
                ctx.stroke();
            });

            // Cherry blossom canopy (bigger, more blobs)
            const alpha = 0.85 - nf * 0.3;
            const cr = tree.canopyR;
            [
                [0, 0, cr * 0.85],
                [-cr * 0.45, cr * 0.1, cr * 0.65],
                [cr * 0.5, cr * 0.12, cr * 0.6],
                [-cr * 0.2, -cr * 0.4, cr * 0.55],
                [cr * 0.25, -cr * 0.35, cr * 0.5],
                [-cr * 0.55, -cr * 0.15, cr * 0.45],
                [cr * 0.6, -cr * 0.08, cr * 0.42],
                [0, -cr * 0.5, cr * 0.4],
            ].forEach(([ox, oy, r]) => {
                const grad = ctx.createRadialGradient(
                    sx + ox + sway, by + oy, r * 0.1,
                    sx + ox + sway, by + oy, r
                );
                const h = tree.blossomHue;
                grad.addColorStop(0, `hsla(${h},80%,80%,${alpha})`);
                grad.addColorStop(0.6, `hsla(${h},70%,70%,${alpha * 0.65})`);
                grad.addColorStop(1, `hsla(${h},60%,65%,0)`);
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.arc(sx + ox + sway, by + oy, r, 0, Math.PI * 2); ctx.fill();
            });
        });
    },

    /* ═══════════ HOUSE ═══════════ */

    drawHouse(t, cam, nf) {
        const { ctx, H } = this;
        const gy = H - 80;
        const h = this.house;
        const sx = h.x - cam;
        if (sx < -300 || sx > this.W + 300) return;

        const baseY = gy - h.h;
        const roofPeak = baseY - h.roofH;

        // House shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(sx - h.w / 2 + 8, gy - 4, h.w, 8);

        // House body
        const wallGrad = ctx.createLinearGradient(sx - h.w / 2, baseY, sx + h.w / 2, gy);
        const wb = nf > 0.5 ? 40 : 80;
        wallGrad.addColorStop(0, `rgb(${180 - nf * 80},${160 - nf * 70},${140 - nf * 60})`);
        wallGrad.addColorStop(1, `rgb(${160 - nf * 70},${140 - nf * 60},${120 - nf * 50})`);
        ctx.fillStyle = wallGrad;
        ctx.fillRect(sx - h.w / 2, baseY, h.w, h.h);

        // Wall border
        ctx.strokeStyle = `rgba(60,40,20,${0.5 - nf * 0.2})`;
        ctx.lineWidth = 3;
        ctx.strokeRect(sx - h.w / 2, baseY, h.w, h.h);

        // Roof
        ctx.fillStyle = nf > 0.5 ? '#5a2020' : '#8B4513';
        ctx.beginPath();
        ctx.moveTo(sx - h.w / 2 - 20, baseY);
        ctx.lineTo(sx, roofPeak);
        ctx.lineTo(sx + h.w / 2 + 20, baseY);
        ctx.closePath(); ctx.fill();

        ctx.strokeStyle = nf > 0.5 ? '#3a1010' : '#6B3010';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sx - h.w / 2 - 20, baseY);
        ctx.lineTo(sx, roofPeak);
        ctx.lineTo(sx + h.w / 2 + 20, baseY);
        ctx.closePath(); ctx.stroke();

        // Chimney
        ctx.fillStyle = nf > 0.5 ? '#3a2020' : '#6D4C41';
        ctx.fillRect(sx + h.w / 4, roofPeak - 10, 25, 50);
        ctx.fillStyle = nf > 0.5 ? '#2a1515' : '#5D4037';
        ctx.fillRect(sx + h.w / 4 - 3, roofPeak - 10, 31, 8);

        // Chimney smoke (night = cozy)
        if (nf > 0.3) {
            ctx.globalAlpha = nf * 0.3;
            for (let i = 0; i < 4; i++) {
                const sy2 = roofPeak - 20 - i * 18 + Math.sin(t * 2 + i) * 5;
                const sx2 = sx + h.w / 4 + 12 + Math.sin(t + i * 0.5) * 8;
                ctx.fillStyle = 'rgba(200,200,200,0.3)';
                ctx.beginPath(); ctx.arc(sx2, sy2, 6 + i * 3, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        // Door
        const doorX = sx - h.doorW / 2;
        const doorY = gy - h.doorH;
        ctx.fillStyle = nf > 0.5 ? '#3E2010' : '#6D4C41';
        ctx.fillRect(doorX, doorY, h.doorW, h.doorH);
        ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 2;
        ctx.strokeRect(doorX, doorY, h.doorW, h.doorH);

        // Doorknob
        ctx.fillStyle = '#FFD54F';
        ctx.beginPath(); ctx.arc(doorX + h.doorW - 10, doorY + h.doorH / 2, 4, 0, Math.PI * 2); ctx.fill();

        // Door frame
        ctx.fillStyle = nf > 0.5 ? '#2a1510' : '#4E342E';
        ctx.fillRect(doorX - 5, doorY - 5, h.doorW + 10, 5);
        ctx.fillRect(doorX - 5, doorY, 5, h.doorH);
        ctx.fillRect(doorX + h.doorW, doorY, 5, h.doorH);

        // Windows
        const winSize = 36;
        [[-h.w / 2 + 30, baseY + 35], [h.w / 2 - 30 - winSize, baseY + 35]].forEach(([wx, wy]) => {
            // Window glow at night
            if (nf > 0.3) {
                ctx.fillStyle = `rgba(255,200,100,${nf * 0.4})`;
                ctx.fillRect(sx + wx - 4, wy - 4, winSize + 8, winSize + 8);
            }
            // Window pane
            ctx.fillStyle = nf > 0.5
                ? `rgba(255,230,150,${0.3 + nf * 0.4})`
                : 'rgba(135,206,250,0.5)';
            ctx.fillRect(sx + wx, wy, winSize, winSize);
            // Window frame
            ctx.strokeStyle = nf > 0.5 ? '#3E2723' : '#5D4037';
            ctx.lineWidth = 3;
            ctx.strokeRect(sx + wx, wy, winSize, winSize);
            // Cross
            ctx.beginPath();
            ctx.moveTo(sx + wx + winSize / 2, wy);
            ctx.lineTo(sx + wx + winSize / 2, wy + winSize);
            ctx.moveTo(sx + wx, wy + winSize / 2);
            ctx.lineTo(sx + wx + winSize, wy + winSize / 2);
            ctx.stroke();
        });

        // "Enter" prompt when character is near
        const dist = Math.abs(this.character.x - h.x);
        if (dist < 100) {
            const bobble = Math.sin(t * 3) * 4;
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.font = 'bold 11px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('🏠 CLICK TO ENTER', sx, baseY - h.roofH - 20 + bobble);
            ctx.fillStyle = '#FFD54F';
            ctx.fillText('🏠 CLICK TO ENTER', sx - 1, baseY - h.roofH - 21 + bobble);
        }

        // Store screen bounds for click
        h._screenX = sx - h.w / 2 - 20;
        h._screenY = roofPeak;
        h._screenW = h.w + 40;
        h._screenH = gy - roofPeak;
    },

    /* ═══════════ SIGNS ═══════════ */

    drawSigns(t, cam) {
        const { ctx, H } = this;
        const gy = H - 80;

        this.signs.forEach(sign => {
            const sx = sign.x - cam;
            if (sx < -120 || sx > this.W + 120) return;
            const hover = Math.sin(t * 2) * 3;

            // Post
            ctx.fillStyle = '#5D4037'; ctx.fillRect(sx - 6, gy - 140, 12, 140);
            ctx.fillStyle = '#3E2723'; ctx.fillRect(sx - 8, gy - 142, 16, 7);

            // Board
            const bw = 190, bh = 65;
            const bx = sx - bw / 2, by = gy - 200 + hover;

            ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(bx + 4, by + 4, bw, bh);
            ctx.fillStyle = '#6D4C41'; ctx.fillRect(bx, by, bw, bh);
            ctx.fillStyle = '#8D6E63'; ctx.fillRect(bx, by, bw, 7);
            ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 3;
            ctx.strokeRect(bx, by, bw, bh);

            // Nails
            ctx.fillStyle = '#aaa';
            [[bx + 10, by + 10], [bx + bw - 10, by + 10]].forEach(([nx, ny]) => {
                ctx.beginPath(); ctx.arc(nx, ny, 3.5, 0, Math.PI * 2); ctx.fill();
            });

            // Text (bigger)
            ctx.fillStyle = '#FFD54F';
            ctx.font = 'bold 16px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(255,213,79,0.4)'; ctx.shadowBlur = 10;
            ctx.fillText(sign.emoji + ' ' + sign.label, sx, by + 42);
            ctx.shadowBlur = 0;

            sign._screenX = bx;
            sign._screenY = by;
            sign._screenW = bw;
            sign._screenH = bh;
        });
    },

    /* ═══════════ PIXEL CHARACTER (BIGGER) ═══════════ */

    drawCharacter(t, cam) {
        const { ctx, H } = this;
        const ch = this.character;
        const sx = ch.x - cam;
        const sy = ch.y;
        const S = 5; // Pixel scale (was 3, now 5 = much bigger)
        const walking = Math.abs(ch.vx) > 0.5;
        const breathe = Math.sin(t * 2) * 1.5;

        ctx.save();
        ctx.translate(sx, sy + breathe);
        if (ch.dir === -1) ctx.scale(-1, 1);

        const px = (x, y, w, h) => ctx.fillRect(x * S, y * S, w * S, h * S);
        const armSwing = walking ? Math.sin(ch.frame * 0.8) * 3 : 0;
        const legSwing = walking ? Math.sin(ch.frame * 0.8) * 2 : 0;

        // Hair (black, big)
        ctx.fillStyle = '#1a1a1a';
        px(-5, -22, 10, 6);
        px(-6, -20, 12, 4);
        px(-6, -16, 2, 9);
        px(4, -16, 2, 9);
        // Back hair drape
        px(-6, -16, 2, 12);

        // Red hair accessory
        ctx.fillStyle = '#e53935';
        px(-5, -19, 2, 2);

        // Face (brown skin)
        ctx.fillStyle = '#8D6E4C';
        px(-4, -16, 8, 8);

        // Eyes
        ctx.fillStyle = '#111';
        px(-3, -14, 2, 2);
        px(1, -14, 2, 2);

        // Eyebrows
        ctx.fillStyle = '#333';
        px(-3, -15, 2, 1);
        px(1, -15, 2, 1);

        // Mouth
        ctx.fillStyle = '#fff';
        px(-2, -10, 4, 1);

        // Neck
        ctx.fillStyle = '#8D6E4C';
        px(-1, -8, 2, 2);

        // Torso (orange/yellow)
        ctx.fillStyle = '#FFB74D';
        px(-5, -6, 10, 3);
        ctx.fillStyle = '#FF9800';
        px(-5, -3, 10, 3);
        ctx.fillStyle = '#F57C00';
        px(-5, 0, 10, 2);

        // Sleeves
        ctx.fillStyle = '#FFB74D';
        px(-7, -6, 2, 3);
        px(5, -6, 2, 3);

        // Arms (skin with swing)
        ctx.fillStyle = '#8D6E4C';
        ctx.fillRect(-7 * S, (-3 + armSwing) * S, 2 * S, 5 * S);
        ctx.fillRect(5 * S, (-3 - armSwing) * S, 2 * S, 5 * S);

        // Hands (golden/yellow holding something)
        ctx.fillStyle = '#FFD54F';
        ctx.fillRect(-7 * S, (2 + armSwing) * S, 2 * S, 2 * S);
        ctx.fillRect(5 * S, (2 - armSwing) * S, 2 * S, 2 * S);

        // Shorts (white/gray)
        ctx.fillStyle = '#ccc';
        px(-4, 2, 8, 3);
        ctx.fillStyle = '#bbb';
        px(-4, 4, 3, 1);
        px(1, 4, 3, 1);

        // Legs (brown skin with swing)
        ctx.fillStyle = '#8D6E4C';
        ctx.fillRect(-4 * S, (5 + legSwing) * S, 3 * S, 4 * S);
        ctx.fillRect(1 * S, (5 - legSwing) * S, 3 * S, 4 * S);

        // Shoes (dark + pink/coral soles)
        ctx.fillStyle = '#222';
        ctx.fillRect(-5 * S, (9 + legSwing) * S, 4 * S, 2 * S);
        ctx.fillRect(1 * S, (9 - legSwing) * S, 4 * S, 2 * S);
        ctx.fillStyle = '#FF8A80';
        ctx.fillRect(-5 * S, (10 + legSwing) * S, 4 * S, 1 * S);
        ctx.fillRect(1 * S, (10 - legSwing) * S, 4 * S, 1 * S);

        ctx.restore();

        // Name tag
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.font = 'bold 12px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Mayowa', sx + 1, sy - 115 + Math.sin(t * 1.5) * 3 + 1);
        ctx.fillStyle = '#fff';
        ctx.fillText('Mayowa', sx, sy - 115 + Math.sin(t * 1.5) * 3);
    },

    drawAboutChar() {
        const c = document.getElementById('aboutCharCanvas');
        if (!c) return;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        const s = 4, ox = 22, oy = 8;
        const px = (x, y, w, h) => ctx.fillRect(ox + x * s, oy + y * s, w * s, h * s);

        ctx.fillStyle = '#1a1a1a'; px(-5, 0, 10, 6); px(-6, 2, 12, 4); px(-6, 6, 2, 9); px(4, 6, 2, 9);
        ctx.fillStyle = '#e53935'; px(-5, 2, 2, 2);
        ctx.fillStyle = '#8D6E4C'; px(-4, 6, 8, 8);
        ctx.fillStyle = '#111'; px(-3, 8, 2, 2); px(1, 8, 2, 2);
        ctx.fillStyle = '#fff'; px(-2, 12, 4, 1);
        ctx.fillStyle = '#8D6E4C'; px(-1, 14, 2, 2);
        ctx.fillStyle = '#FF9800'; px(-5, 16, 10, 5);
        ctx.fillStyle = '#8D6E4C'; px(-7, 17, 2, 5); px(5, 17, 2, 5);
        ctx.fillStyle = '#ccc'; px(-4, 21, 8, 3);
        ctx.fillStyle = '#8D6E4C'; px(-4, 24, 3, 3); px(1, 24, 3, 3);
        ctx.fillStyle = '#222'; px(-5, 27, 4, 2); px(1, 27, 4, 2);
    },

    drawPetals(cam) {
        const { ctx } = this;
        const nf = this.getDayNightFactor();
        this.petals.forEach(p => {
            const sx = p.x - cam;
            if (sx < -20 || sx > this.W + 20) return;
            ctx.save();
            ctx.translate(sx, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = p.alpha * (1 - nf * 0.5);
            ctx.fillStyle = `hsl(${335 + Math.sin(p.rot) * 15},70%,${80 - nf * 20}%)`;
            ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });
        ctx.globalAlpha = 1;
    },

    drawVignette() {
        const { ctx, W, H } = this;
        const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.25)');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    },

    /* ═══════════ ROOM INTERIOR ═══════════ */

    drawRoom() {
        const c = document.getElementById('roomCanvas');
        if (!c) return;
        const ctx = c.getContext('2d');
        const W = c.width, H = c.height;
        ctx.imageSmoothingEnabled = false;

        // Floor
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(0, H * 0.6, W, H * 0.4);
        // Floor planks
        ctx.strokeStyle = '#4E342E'; ctx.lineWidth = 1;
        for (let y = H * 0.6; y < H; y += 25) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        for (let x = 0; x < W; x += 60) {
            ctx.beginPath(); ctx.moveTo(x, H * 0.6); ctx.lineTo(x, H); ctx.stroke();
        }

        // Wall
        const wallGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
        wallGrad.addColorStop(0, '#6A7FDB');
        wallGrad.addColorStop(1, '#5C6BC0');
        ctx.fillStyle = wallGrad;
        ctx.fillRect(0, 0, W, H * 0.6);

        // Wall border / baseboard
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, H * 0.6 - 4, W, 8);

        // ─── POSTERS ─── //
        // Game poster 1
        ctx.fillStyle = '#1a1a2e'; ctx.fillRect(50, 30, 90, 120);
        ctx.fillStyle = '#FF5252'; ctx.font = 'bold 14px "Press Start 2P"';
        ctx.textAlign = 'center'; ctx.fillText('🎮', 95, 75);
        ctx.fillStyle = '#fff'; ctx.font = '8px "Press Start 2P"';
        ctx.fillText('GAME', 95, 100); ctx.fillText('ON', 95, 115);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.strokeRect(50, 30, 90, 120);

        // Anime poster
        ctx.fillStyle = '#FFE0EC'; ctx.fillRect(170, 20, 80, 110);
        ctx.fillStyle = '#FF6B9D'; ctx.font = 'bold 28px serif';
        ctx.fillText('桜', 210, 75);
        ctx.fillStyle = '#e91e63'; ctx.font = '7px "Press Start 2P"';
        ctx.fillText('ANIME', 210, 100);
        ctx.strokeStyle = '#f48fb1'; ctx.lineWidth = 2; ctx.strokeRect(170, 20, 80, 110);

        // Roblox poster
        ctx.fillStyle = '#2a2a2a'; ctx.fillRect(520, 25, 100, 70);
        ctx.fillStyle = '#FF0000'; ctx.font = 'bold 11px "Press Start 2P"';
        ctx.fillText('ROBLOX', 570, 55);
        ctx.fillStyle = '#aaa'; ctx.font = '6px "Press Start 2P"';
        ctx.fillText('Coming 2026', 570, 75);
        ctx.strokeStyle = '#555'; ctx.lineWidth = 2; ctx.strokeRect(520, 25, 100, 70);

        // ─── DESK ─── //
        ctx.fillStyle = '#6D4C41';
        ctx.fillRect(300, H * 0.42, 250, 15); // desk top
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(310, H * 0.42 + 15, 10, 80); // left leg
        ctx.fillRect(530, H * 0.42 + 15, 10, 80); // right leg

        // Monitor
        ctx.fillStyle = '#111';
        ctx.fillRect(370, H * 0.2, 120, 85); // screen bezel
        ctx.fillStyle = '#1a1a3e';
        ctx.fillRect(375, H * 0.2 + 4, 110, 75); // screen
        // Code on screen
        ctx.fillStyle = '#39FF14'; ctx.font = '7px monospace'; ctx.textAlign = 'left';
        const codeLines = ['function play() {', '  score++;', '  render();', '}', '// Mayowa\'s code'];
        codeLines.forEach((l, i) => ctx.fillText(l, 380, H * 0.2 + 18 + i * 13));
        // Monitor stand
        ctx.fillStyle = '#333';
        ctx.fillRect(420, H * 0.2 + 85, 20, 15);
        ctx.fillRect(410, H * 0.2 + 98, 40, 5);

        // Keyboard
        ctx.fillStyle = '#333'; ctx.fillRect(380, H * 0.42 - 12, 80, 12);
        ctx.fillStyle = '#555';
        for (let kx = 383; kx < 457; kx += 8) {
            for (let ky = H * 0.42 - 10; ky < H * 0.42; ky += 6) {
                ctx.fillRect(kx, ky, 5, 4);
            }
        }

        // Mouse
        ctx.fillStyle = '#333';
        ctx.beginPath(); ctx.ellipse(475, H * 0.42 - 5, 10, 14, 0, 0, Math.PI * 2); ctx.fill();

        // ─── BED ─── //
        ctx.fillStyle = '#4527A0'; // purple bedsheet
        ctx.fillRect(20, H * 0.55, 180, 80);
        ctx.fillStyle = '#7E57C2'; // lighter cover
        ctx.fillRect(20, H * 0.55, 180, 25);
        // Pillow
        ctx.fillStyle = '#E8EAF6';
        ctx.beginPath(); ctx.ellipse(55, H * 0.55 + 12, 30, 14, 0, 0, Math.PI * 2); ctx.fill();
        // Bed frame
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(15, H * 0.53, 190, 6);
        ctx.fillRect(15, H * 0.55 + 78, 190, 8);

        // ─── BOOKSHELF ─── //
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(600, H * 0.3, 80, 130);
        // Shelves
        ctx.fillStyle = '#4E342E';
        [H * 0.3 + 42, H * 0.3 + 84].forEach(sy => ctx.fillRect(600, sy, 80, 5));
        // Books
        const bookColors = ['#FF5252','#2196F3','#4CAF50','#FF9800','#9C27B0','#FFEB3B','#00BCD4','#E91E63'];
        for (let i = 0; i < 8; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            ctx.fillStyle = bookColors[i];
            ctx.fillRect(608 + col * 22, H * 0.3 + 6 + row * 42, 16, 34);
        }

        // ─── LAMP ─── //
        ctx.fillStyle = '#FFD54F';
        ctx.beginPath(); ctx.moveTo(560, H * 0.42); ctx.lineTo(545, H * 0.28); ctx.lineTo(575, H * 0.28);
        ctx.closePath(); ctx.fill();
        // Lamp glow
        ctx.fillStyle = 'rgba(255,213,79,0.15)';
        ctx.beginPath(); ctx.arc(560, H * 0.32, 30, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#5D4037'; ctx.fillRect(557, H * 0.42, 6, 12);

        // ─── RUG ─── //
        ctx.fillStyle = 'rgba(106,27,154,0.3)';
        ctx.beginPath(); ctx.ellipse(W / 2, H * 0.82, 130, 40, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(156,39,176,0.3)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(W / 2, H * 0.82, 110, 32, 0, 0, Math.PI * 2); ctx.stroke();

        // ─── BACKPACK on floor ─── //
        ctx.fillStyle = '#1565C0';
        ctx.beginPath();
        ctx.roundRect(240, H * 0.72, 35, 45, 6); ctx.fill();
        ctx.fillStyle = '#0D47A1'; ctx.fillRect(245, H * 0.78, 25, 8);
        ctx.fillStyle = '#FFD54F'; ctx.fillRect(254, H * 0.72 + 4, 8, 8); // zipper

        // ─── SNEAKERS by door ─── //
        ctx.fillStyle = '#FF5252'; ctx.fillRect(630, H * 0.88, 22, 12);
        ctx.fillStyle = '#E53935'; ctx.fillRect(655, H * 0.89, 22, 11);
        ctx.fillStyle = '#fff'; ctx.fillRect(630, H * 0.88 + 8, 22, 3);
        ctx.fillRect(655, H * 0.89 + 7, 22, 3);

        // ─── GAMING HEADSET on desk ─── //
        ctx.fillStyle = '#333';
        ctx.beginPath(); ctx.arc(340, H * 0.42 - 8, 12, Math.PI, 0); ctx.stroke();
        ctx.fillStyle = '#444';
        ctx.beginPath(); ctx.ellipse(328, H * 0.42 - 5, 6, 8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(352, H * 0.42 - 5, 6, 8, 0, 0, Math.PI * 2); ctx.fill();

        // ─── CLOCK on wall ─── //
        ctx.fillStyle = '#fff'; ctx.strokeStyle = '#333'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(450, 45, 25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#111'; ctx.font = '7px "Press Start 2P"'; ctx.textAlign = 'center';
        ctx.fillText('12', 450, 32); ctx.fillText('6', 450, 66);
        ctx.fillText('3', 470, 49); ctx.fillText('9', 430, 49);
        // Clock hands
        const now = new Date();
        const hr = (now.getHours() % 12 + now.getMinutes() / 60) * (Math.PI * 2 / 12) - Math.PI / 2;
        const mn = (now.getMinutes() / 60) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = '#111'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(450, 45); ctx.lineTo(450 + Math.cos(hr) * 13, 45 + Math.sin(hr) * 13); ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(450, 45); ctx.lineTo(450 + Math.cos(mn) * 18, 45 + Math.sin(mn) * 18); ctx.stroke();

        // Reset
        ctx.textAlign = 'left';
    },

    /* ═══════════ INTERACTIONS ═══════════ */

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Signs
        this.signs.forEach(sign => {
            if (sign._screenX === undefined) return;
            if (mx >= sign._screenX && mx <= sign._screenX + sign._screenW &&
                my >= sign._screenY && my <= sign._screenY + sign._screenH) {
                AudioManager.playSfx('click');
                if (sign.action === 'about') { this.openModal('aboutModal'); Achievements.visitSection('about'); }
                else if (sign.action === 'games') { this.openModal('gamesModal'); Achievements.visitSection('games'); }
            }
        });

        // House
        const h = this.house;
        if (h && h._screenX !== undefined) {
            if (mx >= h._screenX && mx <= h._screenX + h._screenW &&
                my >= h._screenY && my <= h._screenY + h._screenH) {
                const dist = Math.abs(this.character.x - h.x);
                if (dist < 150) {
                    AudioManager.playSfx('click');
                    this.openModal('roomModal');
                    this.drawRoom();
                }
            }
        }

        // Character
        const ch = this.character;
        const csx = ch.x - this.camera.x;
        if (Math.abs(mx - csx) < 40 && Math.abs(my - ch.y + 30) < 70) {
            Achievements.unlock('first_click');
            this.showSpeech();
        }
    },

    showSpeech() {
        const phrases = [
            "Hey! Welcome to my portfolio!",
            "Check out my games! →",
            "I love Medicine, Engineering & CS!",
            "← Read about me over there!",
            "Thanks for stopping by!",
            "I'm working on Roblox games too!",
            "Walk to the house and click it! 🏠",
            "My school banned game sites... so I made my own 😎",
        ];
        const bubble = document.getElementById('speechBubble');
        const text = document.getElementById('speechText');
        text.textContent = phrases[Math.floor(Math.random() * phrases.length)];

        const sx = this.character.x - this.camera.x;
        bubble.style.left = sx + 'px';
        bubble.style.top = (this.character.y - 140) + 'px';
        bubble.classList.remove('hidden');

        clearTimeout(this._speechTimer);
        this._speechTimer = setTimeout(() => bubble.classList.add('hidden'), 3000);
    },

    /* ═══════════ MODALS & GAMES ═══════════ */

    openModal(id) { document.getElementById(id).classList.remove('hidden'); },
    closeModal(id) { document.getElementById(id).classList.add('hidden'); },

    launchGame(id) {
        this.closeModal('gamesModal');
        this.openModal('gamePlayModal');
        Games.launch(id);
    },

    closeGame() {
        Games.stop();
        this.closeModal('gamePlayModal');
    },

    toggleMusic() {
        const btn = document.getElementById('musicToggle');
        if (AudioManager.playing) { AudioManager.stop(); btn.textContent = '🎵 Music: OFF'; }
        else { AudioManager.start(); btn.textContent = '🎵 Music: ON'; Achievements.unlock('music_lover'); }
    }
};
