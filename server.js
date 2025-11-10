// server.js - Backend ya Jordain Kin Music (Node.js + Express)
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jkin33';

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve frontend static files (index.html placed in project root)
app.use(express.static(path.join(__dirname, '/')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g,'_');
    cb(null, safe);
  }
});
const upload = multer({ storage });

// Songs metadata file
const metaFile = path.join(__dirname, 'songs.json');
if (!fs.existsSync(metaFile)) fs.writeFileSync(metaFile, '[]');

// POST /upload - protected by admin password
app.post('/upload', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), (req, res) => {
  try {
    const provided = (req.body.admin_password || '').toString();
    if (provided !== ADMIN_PASSWORD) {
      return res.status(403).json({ error: 'Nenosiri la admin si sahihi.' });
    }
    if (!req.files || !req.files.audio || req.files.audio.length === 0) {
      return res.status(400).json({ error: 'Haiwezekani: Hakuna faili la audio.' });
    }
    const audio = req.files.audio[0];
    const cover = req.files.cover && req.files.cover[0];
    const title = (req.body.title || audio.originalname).toString();

    // Build public URLs
    const base = `${req.protocol}://${req.get('host')}`;
    const audioUrl = `${base}/uploads/${audio.filename}`;
    const coverUrl = cover ? `${base}/uploads/${cover.filename}` : null;

    // Save metadata
    const meta = JSON.parse(fs.readFileSync(metaFile));
    const entry = {
      id: Date.now().toString(36),
      title,
      filename: audio.filename,
      url: audioUrl,
      cover_url: coverUrl
    };
    meta.unshift(entry);
    fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));

    return res.json({ message: 'Wimbo umehifadhiwa', entry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Tatizo la server' });
  }
});

// GET /songs - list songs metadata
app.get('/songs', (req, res) => {
  try {
    const meta = JSON.parse(fs.readFileSync(metaFile));
    res.json(meta);
  } catch (e) {
    res.status(500).json({ error: 'Haiwezi kusoma orodha ya nyimbo' });
  }
});

// Serve uploads directory
app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Server inakimbia kwenye http://localhost:${PORT}`);
});
