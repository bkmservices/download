const express = require("express"); const ytdl = require("ytdl-core"); const fbDownloader = require("fb-video-downloader"); const TikTokScraper = require("tiktok-scraper");

const app = express(); const PORT = 3000;

// Route pour YouTube app.get("/youtube", async (req, res) => { const videoUrl = req.query.url; if (!videoUrl) return res.status(400).json({ error: "URL manquante" });

try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
    res.json({ download_url: format.url });
} catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du lien" });
}

});

// Route pour Facebook app.get("/facebook", async (req, res) => { const videoUrl = req.query.url; if (!videoUrl) return res.status(400).json({ error: "URL manquante" });

try {
    const video = await fbDownloader(videoUrl);
    res.json({ download_url: video.hd || video.sd });
} catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du lien" });
}

});

// Route pour TikTok app.get("/tiktok", async (req, res) => { const videoUrl = req.query.url; if (!videoUrl) return res.status(400).json({ error: "URL manquante" });

try {
    const video = await TikTokScraper.getVideoMeta(videoUrl);
    res.json({ download_url: video.videoUrl });
} catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du lien" });
}

});

// Lancer le serveur app.listen(PORT, () => { console.log(Serveur en cours sur http://localhost:${PORT}); });

