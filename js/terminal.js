// TERMINAL 

function initTerminal() {
    console.log("📟 Terminal Modülü Yükleniyor...");

    const modal = document.getElementById('terminal-overlay');
    const openBtn = document.getElementById('terminal-btn');
    const closeBtn = document.getElementById('close-terminal');
    const input = document.getElementById('cmd-input');
    const outputDiv = document.getElementById('terminal-output');
    const bodyDiv = document.getElementById('terminal-body');

    if (!modal || !openBtn || !input) { 
        return; 
    }

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open'); 
        
        if(typeof Toast !== 'undefined') {
            const msg = (typeof currentLang !== 'undefined' && currentLang === 'en') 
                ? 'Terminal Mode Activated 📟' 
                : 'Terminal Modu Aktif 📟';
            Toast.show(msg, 'info');
        }

        setTimeout(() => {
            input.focus();
        }, 100);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });

    const windowEl = document.querySelector('.terminal-window');
    if (windowEl) {
        windowEl.addEventListener('click', () => {
            input.focus();
        });
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            if (command) {
                processCommand(command);
            }
            input.value = ''; 
        }
    });

    function processCommand(cmd) {
        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span style="color:#38bdf8">guest@enes:~$</span> ${cmd}`;
        outputDiv.appendChild(cmdLine);

        let response = '';

        switch (cmd) {
            case 'help':
                response = `
                    <div class="cmd-info">Mevcut Komutlar:</div>
                    <div>- <span class="cmd-success">about</span>: Hakkımda kısa bilgi</div>
                    <div>- <span class="cmd-success">projects</span>: Projelerimi listele</div>
                    <div>- <span class="cmd-success">social</span>: Sosyal medya linkleri</div>
                    <div>- <span class="cmd-success">contact</span>: İletişim bilgileri</div>
                    <div>- <span class="cmd-success">bonus</span>: Projedeki tüm ekstraları gör!</div>
                    <div>- <span class="cmd-success">clear</span>: Ekranı temizle</div>
                    <div>- <span class="cmd-success">exit</span>: Terminali kapat</div>
                `;
                break;
            
            case 'about':
                response = "Merhaba! Ben Enes. Sakarya Üniversitesi Bilişim Sistemleri Mühendisliği öğrencisiyim.";
                break;

            case 'projects':
                response = `
                    <div>Yükleniyor...</div>
                    <div>1. Kule Savunma (C#)</div>
                    <div>2. SPA Portfolyo (Web)</div>
                `;
                break;

            case 'social':
                response = `
                    <div>GitHub: <a href="https://github.com/enesimo16" target="_blank" style="color:#fff">github.com/enesimo16</a></div>
                    <div>LinkedIn: <a href="https://www.linkedin.com/in/enes-yel-44a1ab297/" target="_blank" style="color:#fff">linkedin.com/in/enes-yel</a></div>
                `;
                break;
            
            case 'contact':
                response = "Email: enes@sakarya.edu.tr";
                break;

            case 'bonus':
                response = `
                    <div class="cmd-info">Bonus komutunu buldunuz! Tebrikler :)</div>
                    <div>İşte projeye eklenen ekstra özellikler:</div>
                    <br>
                    <div>✅ PWA (Mobil Uygulama)</div>
                    <div>✅ Scroll Reveal Animasyonları</div>
                    <div>✅ Dil Desteği (TR/EN)</div>
                    <div>✅ Dark Theme / Light Theme</div>
                    <div>✅ Typewriter (Yazı Yazma) Efekti</div>
                    <div>✅ Canlı Hava Durumu API</div>
                    <div>✅ CV İndir & QR Kod</div>
                    <div>✅ Scroll Progress Bar</div>
                    <div>✅ Back to Top Butonu</div>
                    <div>✅ 3D Tilt (Eğilme) Efekti</div>
                    <div>✅ Yazdırma Tasarımı (Ctrl + P)</div>
                    <div>✅ Konami Code (Klavyeden 'enes' yaz)</div>
                    <div>✅ Skeleton Loading & Custom Cursor</div>
                    <div>✅ Canvas İnteraktif Arkaplan</div>
                    <div>✅ Audio Etkileşimli Sesler</div>
                    <div>✅ Toast Bildirimleri</div>
                    <br>
                    <div class="cmd-success" style="font-weight:bold;">★ Best of Bests - TERMINAL CLI ★</div>
                `;
                break;

            case 'clear':
                outputDiv.innerHTML = '';
                return;

            case 'exit':
                modal.classList.remove('open');
                return;

            case 'sudo':
                response = "<span class='cmd-error'>Yetkisiz erişim! Bu terminalde sudo yoktur.</span>";
                break;

            default:
                response = `<span class='cmd-error'>Komut bulunamadı: ${cmd}</span>. 'help' yazın.`;
        }

        const respLine = document.createElement('div');
        respLine.className = 'output-line';
        respLine.innerHTML = response;
        outputDiv.appendChild(respLine);

        bodyDiv.scrollTop = bodyDiv.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', initTerminal);