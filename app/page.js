import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SchoolsFooter from "./components/SchoolsFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e2229]">
      <Navbar />
      <Hero />
      <SchoolsFooter />
    </div>
  );
}
