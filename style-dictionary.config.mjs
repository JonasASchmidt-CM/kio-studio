/**
 * Style Dictionary configuration (DECISIONS.md D4).
 *
 * Pipeline: tokens/tokens.json (W3C DTCG, Git-canonical)
 *   → Style Dictionary
 *   → src/styles/tokens.css (CSS custom properties, prefixed `--kio-*`)
 *   → consumed by src/index.css, which maps shadcn/Tailwind theme vars onto them.
 *
 * The `--kio-` prefix namespaces our tokens so they never collide with the
 * semantic theme vars shadcn generates (e.g. `--primary`, `--background`).
 */
export default {
  source: ['tokens/tokens.json'],
  // Our tokens use the DTCG syntax ($value/$type); tell Style Dictionary so.
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'kio',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            // Preserve aliases as var() references (e.g. border → neutral.200).
            outputReferences: true,
          },
        },
      ],
    },
  },
}
