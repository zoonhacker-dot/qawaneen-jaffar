# Build status

## Completed source-level fixes
- ESM-safe Vite configuration (`__dirname` is now defined correctly).
- Configurable server port and Gemini model/key.
- Capacitor configuration for Android packaging.
- Production static serving and SPA fallback retained.
- Server startup failures now exit with a clear error.
- Secret and generated directories are excluded from version control.

## Still required outside this environment
This workspace could not complete dependency installation within the available execution time, so a full TypeScript/build verification was not performed here. Run:

```bash
npm install
npm run lint
npm run build
npx cap sync android
```

Then open Android Studio with `npm run android:open` and build the APK.
