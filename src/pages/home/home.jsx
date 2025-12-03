import Features from "./features";
import Preview from "./preview";
import CodeSnippetSection from "./code-snippet-section";
import Hero from "./hero";
import pageTransition from "../../utils/page-transition";

const Home = () => {
  return (
    <main>

      <Hero />

      <Features />

      <Preview />

      <CodeSnippetSection />

    </main>
  );
};

export default Home;
