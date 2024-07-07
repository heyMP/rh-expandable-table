import css from "rollup-plugin-import-css";
import { defineConfig } from 'vite'

const plugin = () => ({
  name: 'css-inline',
  enforce: 'pre',
  resolveId(id, importer) {
    if (id.endsWith('.css')) { // or a more robust check if needed
      return this.resolve(id + '?inline', importer)
    }
  }
});

export default defineConfig({
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [
  //       plugin()
  //     ]
  //   }
  // }
});
