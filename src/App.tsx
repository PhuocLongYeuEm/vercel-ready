import "./App.css";

/**
 * App.tsx - wrapper React UI that loads the original site inside an iframe
 * iframe src -> /Code/web_split.html
 * Title/header preserved: "Lock Child Keeper"
 */

export default function App() {
  return (
    <div className="app-root">
      <main className="app-main">
        <iframe
          title="lock-child-keeper-original"
          className="app-iframe"
          src="/Code/web_split.html"
          allow="fullscreen; autoplay; clipboard-read; clipboard-write; encrypted-media; microphone; camera; geolocation"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </main>
    </div>
  );
}
