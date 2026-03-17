document.addEventListener('DOMContentLoaded', () => {
    // Basic Intersection Observer for site-wide animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // --- NOKIA OS INTERACTIVE LOGIC ---
    const phoneScreen = document.getElementById('hero-screen');
    const physBtns = document.querySelectorAll('.phys-btn, .call-btn-circle');
    
    // System State
    let currentScreen = 'main';
    let selectedIndex = 0;

    const screens = {
        'main': {
            title: 'KA-STUDIO',
            subtitle: 'KA THE WIZARD',
            links: [
                { text: '1. BOOK SESSION', target: 'booking' },
                { text: '2. BEATS & LEASES', target: 'beats' },
                { text: '3. MIX MASTER', target: 'rates' },
                { text: '4. CONTACT', target: 'contact' }
            ]
        },
        'booking': {
            title: 'BOOKING_HUB',
            subtitle: 'DIRECT ACCESS',
            content: `
                <div class="pixel-dialer">
                    <div class="avatar-mini">🧙‍♂️</div>
                    <p class="pixel-text-micro">INITIATE CALL?</p>
                    <div class="aggro-cta-group-mini">
                        <a href="https://wa.me/yournumber" class="pixel-mini-btn">WHATSAPP</a>
                        <a href="tel:+44000000000" class="pixel-mini-btn">CALL</a>
                    </div>
                </div>
            `,
            isAction: true
        },
        'beats': {
            title: 'BEATS_LOG',
            subtitle: 'LEASING OPTIONS',
            content: `
                <ul class="pixel-list">
                    <li>MP3 LEASE: £25</li>
                    <li>WAV LEASE: £50</li>
                    <li>STEM LEASE: £100</li>
                    <li>EXCLUSIVE: DM</li>
                </ul>
            `
        },
        'rates': {
            title: 'MIX_MASTER',
            subtitle: 'PRICING_DEALS',
            content: `
                <ul class="pixel-list">
                    <li>MIX/MASTER: £60</li>
                    <li>VOCAL TUNING: £30</li>
                    <li>4H BLOCK: £120</li>
                    <li>FULL DAY: £250</li>
                </ul>
            `
        },
        'contact': {
            title: 'CONTACT_SYS',
            subtitle: 'GET IN TOUCH',
            content: `
                <div class="pixel-contact">
                    <p>TW3 HOUNSLOW</p>
                    <p>@KATHEWIZARD</p>
                    <p>KA@HUB.STUDIO</p>
                </div>
            `
        }
    };

    function renderScreen() {
        const data = screens[currentScreen];
        
        // Update Screen Elements
        let html = `
            <div class="screen-header">
                <span>${data.title}</span>
                <span class="os-clock">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="screen-body">
                <h3 class="pixel-text-mini">${data.subtitle}</h3>
        `;

        if (currentScreen === 'main') {
            html += `<ul class="pixel-menu-interactive">`;
            data.links.forEach((link, i) => {
                html += `<li class="${i === selectedIndex ? 'active' : ''}">${link.text}</li>`;
            });
            html += `</ul>`;
            html += `<div class="screen-footer"><span>SELECT</span><span>EXIT</span></div>`;
        } else {
            html += data.content;
            html += `<div class="screen-footer"><span>_</span><span>BACK</span></div>`;
        }

        html += `</div>`;
        phoneScreen.innerHTML = html;
        
        // Local styles for specific screens
        const listItems = phoneScreen.querySelectorAll('.pixel-list li');
        listItems.forEach((li, i) => {
            li.style.animation = `blink 1s steps(2, start) ${i * 0.1}s infinite`;
        });
    }

    function handleKey(key) {
        if (key === 'back' || key === 'clr') {
            currentScreen = 'main';
            selectedIndex = 0;
        } else if (currentScreen === 'main') {
            if (key === 'up') selectedIndex = (selectedIndex - 1 + screens.main.links.length) % screens.main.links.length;
            if (key === 'down') selectedIndex = (selectedIndex + 1) % screens.main.links.length;
            if (key === 'ok' || key === 'select' || key === 'right') {
                currentScreen = screens.main.links[selectedIndex].target;
            }
            if (['1','2','3','4'].includes(key)) {
                const idx = parseInt(key) - 1;
                selectedIndex = idx;
                currentScreen = screens.main.links[idx].target;
            }
        }
        
        if (key === 'call') {
            window.location.href = 'tel:+44000000000';
        }
        
        // Add physical press effect (visual only as CSS handles click state)
        console.log(`Key pressed: ${key}`);
        renderScreen();
    }

    physBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-key');
            handleKey(key);
        });
    });

    renderScreen();

    // Clock update
    setInterval(() => {
        const clocks = document.querySelectorAll('.os-clock');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        clocks.forEach(c => c.textContent = time);
    }, 10000);
});
