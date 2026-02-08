import WeddingPage from "./pages/WeddingPage.jsx";

function App() {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init("a56edb622e662e0ab42bd1fb5924b955");
  }

  return <WeddingPage />;
}

export default App;
