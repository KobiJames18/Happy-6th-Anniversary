(function() {
    'use strict';

    // ── Fun Animation Effects ──
    
    // Create floating particles
    function createParticles() {
        const app = document.querySelector('.app');
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${['#b3596b', '#d4b483', '#b8925c', '#cf94a0', '#7d3346'][Math.floor(Math.random() * 5)]};
                animation-delay: ${Math.random() * 4}s;
                animation-duration: ${Math.random() * 3 + 3}s;
            `;
            app.appendChild(particle);
        }
    }
    
    // Create confetti explosion
    function createConfetti(x, y) {
        const colors = ['#b3596b', '#d4b483', '#b8925c', '#cf94a0', '#7d3346', '#f4e7dc', '#ecdcda'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                animation-delay: ${Math.random() * 0.3}s;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    // Little hearts burst from wherever you tap
    function spawnTapHearts(x, y) {
        const emojis = ['❤️', '💕', '💖', '🌹'];
        const count = 3 + Math.floor(Math.random() * 2); // 3–4 hearts per tap
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('span');
            heart.className = 'tap-heart';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const dx = (Math.random() - 0.5) * 70;
            const rot = (Math.random() - 0.5) * 60;
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.setProperty('--dx', dx + 'px');
            heart.style.setProperty('--rot', rot + 'deg');
            heart.style.fontSize = (0.9 + Math.random() * 0.6) + 'rem';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    }
    document.addEventListener('click', (e) => spawnTapHearts(e.clientX, e.clientY));

    // Initialize particles
    createParticles();

    // ── DOM refs ──
    const pageWelcome = document.getElementById('page-welcome');
    const pageLanding = document.getElementById('page-landing');
    const pageMagic = document.getElementById('page-magic');
    const pageMain = document.getElementById('page-main');
    const btnBegin = document.getElementById('btnBegin');
    const btnExplore = document.getElementById('btnExplore');
    const magicInput = document.getElementById('magicInput');
    const magicBtn = document.getElementById('magicBtn');
    const magicError = document.getElementById('magicError');

    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = {
        music: document.getElementById('sec-music'),
        gallery: document.getElementById('sec-gallery'),
        notes: document.getElementById('sec-notes'),
    };

    // ── Lyrics elements ──
    const lyricsHeader = document.getElementById('lyrics-header');
    const lyricsTitle = document.getElementById('lyricsTitle');
    const lyricsArtist = document.getElementById('lyricsArtist');
    const lyricsBody = document.getElementById('lyrics-body');

    // ── audio players ──
    const audioMap = {
    Ruth: document.getElementById('audio-Ruth'),
    Billie: document.getElementById('audio-Billie'),
    CKay: document.getElementById('audio-CKay'),
    Crayon: document.getElementById('audio-Crayon'),
    PostMalone: document.getElementById('audio-Post Malone'),
};

    // ── LIGHTBOX ──
(function setupLightbox() {
    // Create lightbox DOM elements
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="" />
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.lightbox-close');
    const lightboxImg = overlay.querySelector('.lightbox-image');
    const caption = overlay.querySelector('.lightbox-caption');

    // Get all gallery items that contain a photo
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const img = item.querySelector('.emoji img');
        if (!img) return; // emoji-only items (no photo) aren't clickable

        item.style.cursor = 'pointer';
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking the play button or other interactive elements
            if (e.target.closest('.play-btn')) return;

            const imgSrc = img.getAttribute('src');
            const label = this.querySelector('.label')?.textContent || 'Memory';
            
            lightboxImg.src = imgSrc;
            lightboxImg.alt = label;
            caption.textContent = label;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close functions
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // Clear src to prevent memory issues
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    }

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e) {
        // Close if clicking the overlay background (not the image)
        if (e.target === this) closeLightbox();
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });

    console.log('✨ Lightbox ready — click any gallery image to enlarge');
})();

    // ── FULL, COMPLETE LYRICS (no cuts) ──
    const lyricsMap = {
           Dandelions: ``,

        Ruth: `Maybe it's the way you say my name
Maybe it's the way you play your game
But it's so good, I've never known anybody like you
But it's so good, I've never dreamed of nobody like you
And I've heard of a love that comes once in a lifetime
And I'm pretty sure that you are that love of mine
'Cause I'm in a field of dandelions
Wishing on every one that you'd be mine, mine
And I see forever in your eyes
I feel okay when I see you smile, smile
Wishing on dandelions all of the time
Praying to God that one day you'll be mine
Wishing on dandelions all of the time, all of the time
I think that you are the one for me
'Cause it gets so hard to breathe
When you're looking at me, I've never felt so alive and free
When you're looking at me, I've never felt so happy
And I've heard of a love that comes once in a lifetime
And I'm pretty sure that you are, that love of mine
'Cause I'm in a field of dandelions
Wishing on every one that you'd be mine, mine
And I see forever in your eyes
I feel okay when I see you smile, smile
Wishing on dandelions all of the time
Praying to God that one day you'll be mine
Wishing on dandelions all of the time
All of the time
Dandelion, into the wind you go
Won't you let my darling know?
Dandelion, into the wind you go
Won't you let my darling know that?
I'm in a field of dandelions
Wishing on every one that you'd be mine, mine
Oh, and I see forever in your eyes
I feel okay when I see you smile, smile
Wishing on dandelions all of the time
Praying to God that one day you'll be mine
Wishing on dandelions all of the time, all of the time
I'm in a field of dandelions
Wishing on every one that you'd be mine, mine`,
            Billie: `('Til I'm in the grave)
I want you to stay
'Til I'm in the grave
'Til I rot away, dead and buried
'Til I'm in the casket you carry
If you go, I'm going too, uh
'Cause it was always you, alright
And if I'm turnin' blue, please don't save me
Nothing left to lose without my baby
Birds of a feather, we should stick together, I know
I said I'd never think I wasn't better alone
Can't change the weather, might not be forever
But if it's forever, it's even better
And I don't know what I'm cryin' for
I don't think I could love you more
It might not be long, but baby, I
I'll love you 'til the day that I die
'Til the day that I die
'Til the light leaves my eyes
'Til the day that I die
I want you to see, hm
How you look to me, hm
You wouldn't believe if I told ya
You would keep the compliments I throw ya
But you're so full of shit, uh
Tell me it's a bit, no
Say you don't see it, your mind's polluted
Say you wanna quit, don't be stupid
And I don't know what I'm cryin' for
I don't think I could love you more
Might not be long, but baby, I
Don't wanna say goodbye
Birds of a feather, we should stick together, I know ('til the day that I die)
I said I'd never think I wasn't better alone ('til the light leaves my eyes)
Can't change the weather, might not be forever ('til the day I die)
But if it's forever, it's even better
I knew you in another life
You had that same look in your eyes
I love you, don't act so surprised`,

         CKay: `All because of you, I be on the phone, all night long, oh
No be small thing wey you do to me, oh no, no, no
I be on my business, shawty
But you be on my mind, shawty
Ebelebe oloma, my honey, ahh-ahh

[Pre-Chorus]
Kiss me through the cellular, kiss me through the phone
Can't you see I'm into ya?
Can't you see I'm in love?
Kiss me through the cellular, kiss me through the phone
You're messin' with my medulla, highkey, I don kolo, oh no, no

[Chorus]
Emiliana, oh Emiliana, oh Emiliana, oh no
Emiliana, oh Emiliana, oh Emiliana, oh no
You're one in a million, oh, in a million, oh, in a million, oh no
My Emiliana, oh Emiliana, oh Emiliana, oh no

[Instrumental Break]
(CKay yo dey here, yeah)

[Verse 2]
Girl, I wanna, wanna know what it feel like
What it feel like
Make I know as e bе for real life
For real lifе
Inna my condo
Lovin' up your body, in fast and slow mo
If I hit you with my combo
Girl, you will never ever let me go, hold on to me, oh no-oh

[Pre-Chorus]
Kiss me through the cellular, kiss me through the phone
Can't you see I'm into ya? Can't you see I'm in love?
Kiss me through the cellular, kiss me through the phone
You're messin' with my medulla, highkey, I don kolo, oh no, no

[Chorus]
Emiliana, oh Emiliana, oh Emiliana, oh no
Emiliana, oh Emiliana, oh Emiliana, oh no
You're one in a million, oh, in a million, oh, in a million, oh no
My Emiliana, oh Emiliana, oh Emiliana, oh no`

    };

    // ── state ──
    let currentPlaying = null;
    let currentAudio = null;
    const MAGIC_WORD = 'Teddy';

    // ── page transitions ──
    function goToPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    }

    // ── opening the seal on the welcome page ──
    if (btnBegin) {
        btnBegin.addEventListener('click', () => {
            const rect = btnBegin.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            btnBegin.classList.add('opened');
            setTimeout(() => goToPage('page-landing'), 420);
        });
    }

    btnExplore.addEventListener('click', (e) => {
        const rect = btnExplore.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        goToPage('page-magic');
        magicInput.value = '';
        magicError.classList.remove('show');
        magicInput.focus();
    });

    function tryUnlock() {
        const word = magicInput.value.trim();
        if (word === MAGIC_WORD) {
            magicError.classList.remove('show');
            goToPage('page-main');
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                const allBtns = document.querySelectorAll('.play-btn');
                allBtns.forEach(b => {
                    b.classList.remove('playing');
                    b.innerHTML = '<i class="fas fa-play"></i>';
                });
                currentPlaying = null;
                currentAudio = null;
                resetLyrics();
            }
        } else {
            magicError.classList.add('show');
            magicInput.value = '';
            magicInput.focus();
            setTimeout(() => {
                magicError.classList.remove('show');
            }, 3000);
        }
    }

    magicBtn.addEventListener('click', tryUnlock);
    magicInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') tryUnlock();
    });

    // ── Lyrics UI ──
    function resetLyrics() {
        lyricsHeader.style.display = 'none';
        lyricsBody.innerHTML = `<div class="lyrics-idle">🎵 Tap a song to see its lyrics...</div>`;
        lyricsBody.classList.remove('paused');
    }

    function updateLyrics(songKey, isPlaying) {
        const lyrics = lyricsMap[songKey];
        if (!lyrics) {
            resetLyrics();
            return;
        }

 const songTitleMap = {
    Ruth: "Dandelions",
    Billie: "BIRDS OF A FEATHER",
    CKay: "Emiliana",
    Crayon: "Ngozi",
    PostMalone: "Sunflower"
};

const artistMap = {
    Ruth: "Ruth B.",
    Billie: "Billie Eilish",
    CKay: "CKay",
    Crayon: "Crayon ft. Ayra Starr",
    PostMalone: "Post Malone & Swae Lee"
};
 
const audioMap = {
    Ruth: document.getElementById("audio-Ruth"),
    Billie: document.getElementById("audio-Billie"),
    CKay: document.getElementById("audio-CKay"),
    Crayon: document.getElementById("audio-Crayon"),
    PostMalone: document.getElementById("audio-PostMalone")
};

        lyricsHeader.style.display = 'flex';
        lyricsTitle.textContent = songTitleMap[songKey] || 'Song';
        lyricsArtist.textContent = artistMap[songKey] || 'Artist';

        const lines = lyrics.split('\n');
        let html = '';
        if (isPlaying) {
            html += `<span class="playing-indicator"></span> `;
        }
        html += lines.map(line => line.trim() ? line : '&nbsp;').join('<br>');
        lyricsBody.innerHTML = html;
        lyricsBody.classList.toggle('paused', !isPlaying);

        // auto-scroll to top of lyrics
        const container = document.getElementById('lyrics-container');
        if (container) container.scrollTop = 0;
    }

    // ── tab switching ──
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.dataset.section;
            if (!section) return;

            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            Object.keys(sections).forEach(key => {
                sections[key].classList.toggle('active', key === section);
            });

            // music keeps playing in the background when you browse
            // other tabs — it only stops if you pause it yourself
        });
    });

    // ── music playback ──
    const playBtns = document.querySelectorAll('.play-btn');

    playBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const rect = this.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            
            const songKey = this.dataset.song;
            if (!songKey || !audioMap[songKey]) return;

            const audio = audioMap[songKey];

            if (currentPlaying === songKey) {
                if (audio.paused) {
                    audio.play().catch(() => {});
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    this.classList.add('playing');
                    updateLyrics(songKey, true);
                } else {
                    audio.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    this.classList.remove('playing');
                    updateLyrics(songKey, false);
                }
                return;
            }

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                const prevBtn = document.querySelector(`.play-btn[data-song="${currentPlaying}"]`);
                if (prevBtn) {
                    prevBtn.innerHTML = '<i class="fas fa-play"></i>';
                    prevBtn.classList.remove('playing');
                }
            }

            audio.currentTime = 0;
            audio.play().catch(() => {});
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.classList.add('playing');

            currentPlaying = songKey;
            currentAudio = audio;

            updateLyrics(songKey, true);

            audio.onended = () => {
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.classList.remove('playing');
                currentPlaying = null;
                currentAudio = null;
                resetLyrics();
            };
        });
    });

    document.querySelectorAll('.music-item').forEach(item => {
        item.addEventListener('click', function() {
            const btn = this.querySelector('.play-btn');
            if (btn) btn.click();
        });
    });

    // Add confetti to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const rect = this.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            const btn = document.querySelector(`.play-btn[data-song="${currentPlaying}"]`);
            if (btn) {
                btn.innerHTML = '<i class="fas fa-play"></i>';
                btn.classList.remove('playing');
            }
            currentPlaying = null;
            currentAudio = null;
            resetLyrics();
        }
    });

    resetLyrics();
    console.log('❤️ For My Baby — full, complete lyrics loaded');
})();