import React, { useState } from "react";

export default function PromptGenerator() {
  const cameras = [
    "Canon EOS R5 with RF 85mm f/1.2 lens",
    "Nikon Z9 and 70-200mm f/2.8 lens",
    "Sony A7R V with 50mm f/1.2 GM lens",
    "Fujifilm GFX100 II and GF 110mm f/2 lens",
    "Leica SL2-S with 50mm Summilux lens"
  ];

  const moods = [
    "soft window light, golden hour mood, gentle cinematic shadows",
    "dramatic softbox lighting, deep shadows, studio backdrop",
    "moody film lighting with rich contrast, European setting",
    "misty dawn light, outdoor setting with soft pastel tones",
    "cinematic Rembrandt lighting, intense editorial feel"
  ];

  const styles = {
    fashion: [
      "Vogue Italia, medium format realism, soft warm tones",
      "Vanity Fair, high contrast, rich color grading",
      "Harper's Bazaar, clean elegance, modern fashion",
      "retro film magazine, warm muted palette"
    ],
    "sci-fi": [
      "sci-fi editorial, holographic textures, neon lighting",
      "futuristic cyberpunk, chrome outfits, Blade Runner tones"
    ],
    surrealism: [
      "dreamlike surrealism, floating elements, artistic shadows",
      "Dazed, experimental layout, surreal concept"
    ]
  };

  const subjects = {
    fashion: [
      "freckled model with red hair in Alexander McQueen couture",
      "model in 90s streetwear leaning on a Parisian balcony",
      "elegant woman in a flowing gown walking through a marble hall",
      "young male model in trench coat under city lights"
    ],
    "sci-fi": [
      "futuristic model in iridescent armor with LED accents",
      "cyberpunk model standing under neon rain in Tokyo"
    ],
    surrealism: [
      "surreal model with multiple eyes and melting dress",
      "avant-garde model in sculptural fashion with bold pose"
    ]
  };

  const [theme, setTheme] = useState("all");
  const [prompt, setPrompt] = useState("");

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generatePrompt = () => {
    const camera = getRandom(cameras);
    const mood = getRandom(moods);

    let combinedStyles = [], combinedSubjects = [];

    if (theme === "all") {
      combinedStyles = [...styles.fashion, ...styles["sci-fi"], ...styles.surrealism];
      combinedSubjects = [...subjects.fashion, ...subjects["sci-fi"], ...subjects.surrealism];
    } else {
      combinedStyles = styles[theme];
      combinedSubjects = subjects[theme];
    }

    const style = getRandom(combinedStyles);
    const subject = getRandom(combinedSubjects);

    const finalPrompt = `Ultra-realistic portrait of a ${subject}, shot with ${camera}, lit with ${mood}, editorial style: ${style} --v 7 --ar 3:4 --q 2`;
    setPrompt(finalPrompt);
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    alert("Prompt copied to clipboard!");
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "midjourney_prompt.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">🎨 Midjourney Prompt Generator</h2>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="all">All Themes</option>
        <option value="fashion">Fashion</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="surrealism">Surrealism</option>
      </select>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button className="bg-black text-white px-4 py-2 rounded" onClick={generatePrompt}>
          🎲 Generate Prompt
        </button>
        <button className="bg-black text-white px-4 py-2 rounded" onClick={copyPrompt}>
          📋 Copy
        </button>
        <button className="bg-black text-white px-4 py-2 rounded" onClick={downloadPrompt}>
          💾 Download
        </button>
      </div>

      <textarea
        value={prompt}
        readOnly
        className="w-full max-w-xl h-48 p-4 border border-gray-300 rounded font-mono"
      />
    </div>
  );
}