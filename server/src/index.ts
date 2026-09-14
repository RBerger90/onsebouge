import 'dotenv/config';
import { app } from './app.js'; // ⚠️ le ".js" est nécessaire même si le fichier est app.ts

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
