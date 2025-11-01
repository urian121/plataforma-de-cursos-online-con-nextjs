import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SchoolsFooter from "./components/SchoolsFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <Hero />
      <SchoolsFooter />
    </div>
  );
}
