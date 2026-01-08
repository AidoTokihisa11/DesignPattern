const API_URL = 'http://localhost:3000';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchRadios();
    log("Interface de contrôle prête.", "system");
});

// Logs helper
function log(msg, type = 'info') {
    const el = document.getElementById('logs');
    const line = document.createElement('div');
    
    // Determine class
    let className = 'log-entry';
    if (type === 'error' || type === true) className += ' error';
    else if (type === 'success') className += ' success';
    else if (type === 'system') className += ' system';
    else className += ' info';
    
    line.className = className;
    
    // Add Time
    const now = new Date();
    const time = now.toLocaleTimeString();

    line.innerHTML = `<span class="time">[${time}]</span> ${msg}`;
    el.prepend(line);
}

function clearLogs() {
    document.getElementById('logs').innerHTML = '<div class="log-entry system">> Logs effacés</div>';
}

// Fetch Radios
async function fetchRadios() {
    try {
        const res = await fetch(`${API_URL}/radios`);
        const radios = await res.json();
        
        const list = document.getElementById('radio-list');
        const countBadge = document.getElementById('radio-count');
        
        const subSelect = document.getElementById('subscribe-radio-select');
        const emitSelect = document.getElementById('emit-radio-select');
        
        list.innerHTML = '';
        subSelect.innerHTML = '';
        emitSelect.innerHTML = '';
        countBadge.innerText = `${radios.length} stations`;

        radios.forEach(r => {
            // Update List (Card View)
            const item = document.createElement('div');
            item.className = 'radio-card';
            
            // Icon based on theme
            let icon = '📻';
            if(r.theme === 'Musique') icon = '🎵';
            if(r.theme === 'Sport') icon = '⚽';
            if(r.theme === 'Actu') icon = '📰';

            item.innerHTML = `
                <span class="radio-icon">${icon}</span>
                <span class="radio-name">${r.name}</span>
                <span class="radio-theme">${r.theme}</span>
            `;
            list.appendChild(item);

            // Update Selects
            const opt1 = new Option(r.name, r.name);
            const opt2 = new Option(r.name, r.name);
            subSelect.add(opt1);
            emitSelect.add(opt2);
        });
    } catch (e) {
        log(`Erreur chargement radios: ${e.message}`, 'error');
    }
}

// Actions
async function createRadio() {
    const name = document.getElementById('new-radio-name').value;
    const theme = document.getElementById('new-radio-theme').value;
    
    if (!name) return log("Nom de la radio requis", 'error');

    try {
        const res = await fetch(`${API_URL}/radios`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, theme })
        });
        const data = await res.json();
        if (res.ok) {
            log(`Succès: ${data.message}`, 'success');
            fetchRadios(); // Refresh
            document.getElementById('new-radio-name').value = '';
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        log(e.message, 'error');
    }
}

async function subscribe() {
    const auditeur = document.getElementById('auditeur-name').value;
    const radio = document.getElementById('subscribe-radio-select').value;

    if (!auditeur) return log("Nom d'auditeur requis", 'error');

    try {
        const res = await fetch(`${API_URL}/subscribe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ auditeur, radio })
        });
        const data = await res.json();
        if (res.ok) {
            log(data.message, 'success');
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        log(e.message, 'error');
    }
}

async function unsubscribe() {
    const auditeur = document.getElementById('auditeur-name').value;
    const radio = document.getElementById('subscribe-radio-select').value;

    if (!auditeur) return log("Nom d'auditeur requis", 'error');

    try {
        const res = await fetch(`${API_URL}/unsubscribe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ auditeur, radio })
        });
        const data = await res.json();
        if (res.ok) {
            log(data.message, 'success');
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        log(e.message, 'error');
    }
}

async function sendMessage() {
    const auditeur = document.getElementById('auditeur-name').value;
    const radio = document.getElementById('subscribe-radio-select').value;
    const message = document.getElementById('animator-message').value;

    if (!auditeur) return log("Nom d'auditeur requis", 'error');
    if (!message) return log("Message requis", 'error');

    try {
        const res = await fetch(`${API_URL}/message`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ auditeur, radio, message })
        });
        const data = await res.json();
        if (res.ok) {
            log(data.message, 'info');
            document.getElementById('animator-message').value = '';
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        log(e.message, 'error');
    }
}

async function listen() {
    const auditeur = document.getElementById('auditeur-name').value;
    const radio = document.getElementById('subscribe-radio-select').value;

    if (!auditeur) return log("Nom d'auditeur requis", 'error');

    try {
        const res = await fetch(`${API_URL}/listen`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ auditeur, radio })
        });
        const data = await res.json();
        if (res.ok) {
            log(`Connexion au flux : ${data.url}`, 'success');
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        log(e.message, 'error');
    }
}

async function emit() {
    const radio = document.getElementById('emit-radio-select').value;
    const type = document.getElementById('emit-type').value;
    const content = document.getElementById('emit-content').value;

    if (!content) return log("Contenu de l'émission requis", 'error');

    // Mock details based on type
    let details = {};
    if (type === 'Musique') details = { artist: "Artiste Inconnu", duration: "3:45" };
    if (type === 'Sport') details = { match: "Finale", score: "2-1" };
    if (type === 'Actu') details = { source: "AFP", urgency: "Haute" };

    try {
        const res = await fetch(`${API_URL}/emit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ radio, type, content, details })
        });
        const data = await res.json();
        if (res.ok) {
            log(`[ON AIR] ${radio}: ${content}`, 'success');
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        log(e.message, 'error');
    }
}
