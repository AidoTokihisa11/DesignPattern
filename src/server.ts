import express from 'express';
import path from 'path';
import { RadioHubFacade } from './services/RadioHubFacade';
import { ThemeRegistry } from './services/ThemeRegistry';
import { MusicTheme } from './models/themes/MusicTheme';
import { SportTheme } from './models/themes/SportTheme';
import { NewsTheme } from './models/themes/NewsTheme';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

// Initialize Themes
const registry = ThemeRegistry.getInstance();
registry.registerTheme(new MusicTheme());
registry.registerTheme(new SportTheme());
registry.registerTheme(new NewsTheme());

// Initialize Facade
const facade = new RadioHubFacade();

// Pre-populate for testing
try {
    facade.createRadio("Skyrock", "Musique");
    facade.createRadio("RMC", "Sport");
    facade.createRadio("FranceInfo", "Actu");
} catch (e) {
    console.error("Error initializing radios:", e);
}

// Routes
app.get('/radios', (req, res) => {
    try {
        const radios = facade.getAllRadios();
        res.json(radios);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/subscribe', (req, res) => {
    try {
        const { auditeur, radio } = req.body;
        if (!auditeur || !radio) throw new Error("Missing 'auditeur' or 'radio' in body");
        
        facade.subscribeAuditeur(auditeur, radio);
        res.json({ message: `${auditeur} subscribed to ${radio}` });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/unsubscribe', (req, res) => {
    try {
        const { auditeur, radio } = req.body;
        if (!auditeur || !radio) throw new Error("Missing 'auditeur' or 'radio' in body");
        
        facade.unsubscribeAuditeur(auditeur, radio);
        res.json({ message: `${auditeur} unsubscribed from ${radio}` });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/message', (req, res) => {
    try {
        const { auditeur, radio, message } = req.body;
        if (!auditeur || !radio || !message) throw new Error("Missing parameters");
        
        facade.sendAnimatorMessage(auditeur, radio, message);
        res.json({ message: `Message sent to ${radio} animator` });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/listen', (req, res) => {
    try {
        const { auditeur, radio } = req.body;
        if (!auditeur || !radio) throw new Error("Missing parameters");
        
        const data = facade.listenToRadio(auditeur, radio);
        res.json(data);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/emit', (req, res) => {
    try {
        const { radio, type, content, details } = req.body;
        if (!radio || !type || !content) throw new Error("Missing parameters");

        facade.emitEmission(radio, type, content, details || {});
        res.json({ message: "Emission broadcasted successfully" });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/radios', (req, res) => {
    try {
        const { name, theme } = req.body;
        if (!name || !theme) throw new Error("Missing name or theme");
        facade.createRadio(name, theme);
        res.json({ message: `Radio ${name} created` });
    } catch (e: any) {
         res.status(400).json({ error: e.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`RadioHub Server running on port ${PORT}`);
});
