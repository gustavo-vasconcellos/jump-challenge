import { ConversionForm } from "@/components/ConversionForm";
import { ConversionsHistory } from "@/components/ConversionsHistory";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content max-w-md text-center gap-4 flex-col">
        <h1 className="md:text-5xl text-4xl font-bold text-primary">USD Rate Conversion</h1>
        <ConversionForm />
        <ConversionsHistory />
      </div>
    </div>
  );
}
