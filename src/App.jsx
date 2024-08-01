import RoutesFile from "./Routes";
import Footer from "./components/headerAndFooter/Footer";
import Header from "./components/headerAndFooter/Header";

const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <RoutesFile />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
