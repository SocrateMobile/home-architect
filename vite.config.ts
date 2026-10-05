import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const fromRoot = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

const PUBLISHED_PREFIX = '/api/home_architect/published';
const PUBLISHED_FILE_RE = /^[a-zA-Z0-9_-]{1,64}-[A-Za-z0-9_-]{20,64}\.svg$/;
const MAX_PUBLISHED_BYTES = 4 * 1024 * 1024;

/**
 * Harnais de développement : sert les SVG « publiés » par le faux backend (dev/mock-hass.ts)
 * sous la même URL et avec les mêmes en-têtes que la vue HTTP de l'intégration, pour que
 * l'URL renvoyée par publish_svg soit réellement affichable. Le faux backend dépose (PUT) et
 * retire (DELETE) les fichiers, qui ne vivent qu'en mémoire du serveur de développement.
 */
function mockPublishedSvg(): Plugin {
  const files = new Map<string, { svg: Buffer; etag: string }>();
  return {
    name: 'home-architect:mock-published-svg',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(PUBLISHED_PREFIX, (req, res) => {
        const name = decodeURIComponent((req.url ?? '').split('?')[0].replace(/^\//, ''));
        if (!PUBLISHED_FILE_RE.test(name)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        if (req.method === 'PUT') {
          const chunks: Buffer[] = [];
          let size = 0;
          req.on('data', (chunk: Buffer) => {
            size += chunk.length;
            if (size <= MAX_PUBLISHED_BYTES) chunks.push(chunk);
          });
          req.on('end', () => {
            if (size > MAX_PUBLISHED_BYTES) {
              res.statusCode = 413;
            } else {
              const svg = Buffer.concat(chunks);
              files.set(name, { svg, etag: `"${createHash('sha256').update(svg).digest('hex').slice(0, 16)}"` });
              res.statusCode = 204;
            }
            res.end();
          });
          return;
        }
        if (req.method === 'DELETE') {
          files.delete(name);
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          res.statusCode = 405;
          res.setHeader('Allow', 'GET, HEAD, PUT, DELETE');
          res.end();
          return;
        }
        const file = files.get(name);
        if (!file) {
          res.statusCode = 404;
          res.end();
          return;
        }
        res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
        res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox");
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('ETag', file.etag);
        if (req.headers['if-none-match'] === file.etag) {
          res.statusCode = 304;
          res.end();
          return;
        }
        res.statusCode = 200;
        res.end(req.method === 'HEAD' ? undefined : file.svg);
      });
    }
  };
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // `npm run dev` : harnais de développement (dev/index.html + faux backend en mémoire).
    return {
      root: fromRoot('./dev'),
      plugins: [mockPublishedSvg()],
      server: {
        // Le harnais importe ../src : on autorise explicitement la racine du dépôt.
        fs: { allow: [fromRoot('.')] }
      }
    };
  }

  // `vite build` : deux bundles ES minifiés et leurs chunks partagés (constat F32).
  //  - home_architect-card.js  : carte + canevas, injecté sur toutes les pages (add_extra_js_url) ;
  //  - home_architect-panel.js : studio complet, chargé seulement par le panneau (module_url).
  return {
    // Chemins relatifs : les chunks sont résolus depuis l'URL du bundle (/home_architect_frontend/…).
    base: './',
    publicDir: false,
    build: {
      outDir: fromRoot('./custom_components/home_architect/frontend'),
      emptyOutDir: true,
      target: 'es2021',
      minify: 'esbuild',
      sourcemap: false,
      // Pas de <link rel="modulepreload"> injecté dans la page HA pour les import() dynamiques.
      modulePreload: false,
      rollupOptions: {
        input: {
          'home_architect-card': fromRoot('./src/card-entry.ts'),
          'home_architect-panel': fromRoot('./src/panel-entry.ts')
        },
        output: {
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js'
        }
      }
    }
  };
});
