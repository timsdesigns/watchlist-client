import { createRoot } from "react-dom/client";

// “index.html” → “index.jsx” → “index.scss.” instead of classic “index.html” → “index.css” structure
import "./index.scss";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Main component (touches upon all dependencies)
const WatchlistApp = ()=>
  // <div className="watchlist"><div>Good morning</div></div>;
  // <MainView />;
  <Container fluid data-bs-theme="dark">
    <MainView />
  </Container>;

// Finding app root
const container = document.querySelector("#root");
const root = createRoot(container);

// Render in DOM element via React
root.render(<WatchlistApp/>);