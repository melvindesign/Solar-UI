import { fileURLToPath } from 'url'
import { join, resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
// mcp/src/lib/ (ou mcp/dist/lib/ une fois compilé) → 3 niveaux jusqu'à la racine
const PROJECT_ROOT = resolve(__dirname, '../../../')

export const PATHS = {
  projectRoot: PROJECT_ROOT,
  contentComponents: join(PROJECT_ROOT, 'content/components'),
  contentCore: join(PROJECT_ROOT, 'content/core'),
  contentFoundation: join(PROJECT_ROOT, 'content/foundation'),
  contentOverview: join(PROJECT_ROOT, 'content/overview'),
  contentTheming: join(PROJECT_ROOT, 'content/theming'),
  componentsUi: join(PROJECT_ROOT, 'registry/solar/ui'),
  globalsCss: join(PROJECT_ROOT, 'app/globals.css'),
  themeCss: join(PROJECT_ROOT, 'registry/solar/theme.css'),
  themesDir: join(PROJECT_ROOT, 'registry/solar/themes'),
  registryJson: join(PROJECT_ROOT, 'registry.json'),
  componentsMeta: join(PROJECT_ROOT, 'content/components/_meta.js'),
  coreMeta: join(PROJECT_ROOT, 'content/core/_meta.js'),
}
