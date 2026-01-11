import express, { Request, Response } from 'express';
import path from 'path';
import { RadioHubFacade } from './services/RadioHubFacade';
import { ThemeRegistry } from './services/ThemeRegistry';
import { MusicTheme } from './models/themes/MusicTheme';
import { SportTheme } from './models/themes/SportTheme';
import { NewsTheme } from './models/themes/NewsTheme';

enum HttpCode {
    OK = 200,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}

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

// Helper for error handling
const handleError = (res: Response, error: unknown) => {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(HttpCode.BAD_REQUEST).json({ error: message });
};

// Routes
app.get('/radios', (_req: Request, res: Response) => {
    try {
        const radios = facade.getAllRadios();
        res.status(HttpCode.OK).json(radios);
    } catch (e) {
        res.status(HttpCode.SERVER_ERROR).json({ error: e instanceof Error ? e.message : "Server Error" });
    }
});

app.post('/subscribe', (req: Request, res: Response) => {
    try {
        const { auditeur, radio } = req.body;
        if (!auditeur || !radio) throw new Error("Missing 'auditeur' or 'radio' in body");
        
        facade.subscribeAuditeur(auditeur, radio);
        res.status(HttpCode.OK).json({ message: `${auditeur} subscribed to ${radio}` });
    } catch (e) {
        handleError(res, e);
    }
});

app.post('/unsubscribe', (req: Request, res: Response) => {
    try {
        const { auditeur, radio } = req.body;
        if (!auditeur || !radio) throw new Error("Missing 'auditeur' or 'radio' in body");
        
        facade.unsubscribeAuditeur(auditeur, radio);
        res.status(HttpCode.OK).json({ message: `${auditeur} unsubscribed from ${radio}` });
    } catch (e) {
        handleError(res, e);
    }
});

app.post('/message', (req: Request, res: Response) => {
    try {
        const { auditeur, radio, message } = req.body;
        if (!auditeur || !radio || !message) throw new Error("Missing parameters");
        
        facade.sendAnimatorMessage(auditeur, radio, message);
        res.status(HttpCode.OK).json({ message: `Message sent to ${radio} animator` });
    } catch (e) {
        handleError(res, e);
    }
});

app.post('/listen', (req: Request, res: Response) => {
    try {
        const { auditeur, radio } = req.body;
        if (!auditeur || !radio) throw new Error("Missing parameters");
        
        const data = facade.listenToRadio(auditeur, radio);
        res.status(HttpCode.OK).json(data);
    } catch (e) {
        handleError(res, e);
    }
});

app.post('/emit', (req: Request, res: Response) => {
    try {
        const { radio, type, content, details } = req.body;
        if (!radio || !type || !content) throw new Error("Missing parameters");

        facade.emitEmission(radio, type, content, details || {});
        res.status(HttpCode.OK).json({ message: "Emission broadcasted successfully" });
    } catch (e) {
        handleError(res, e);
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
