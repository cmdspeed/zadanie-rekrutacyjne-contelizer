import React, { useState } from "react";

export const Task1 = () => {
  const [originalText, setOriginalText] = useState<string>("");
  const [processedText, setProcessedText] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setOriginalText(text);
      setProcessedText(processText(text));
    };
    reader.readAsText(file, "utf-8");
  };

  const shuffleWord = (word: string) => {
    if (word.length <= 3) return word;

    const firstLetter = word[0];
    const lastLetter = word.at(-1);
    const middle = word.slice(1, -1);

    const shuffled = middle
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return firstLetter + shuffled + lastLetter;
  };

  const processText = (text: string) => {
    return text
      .split(/(\s+)/)
      .map((single) => {
        return single.replaceAll(/([A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)/g, (match) =>
          shuffleWord(match)
        );
      })
      .join("");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center p-10">
      <h1 className="font-bold mb-10">
        Zadanie 1: Przetasuj litery w środku wyrazów
      </h1>
      <div className="mb-4">
        <label
          htmlFor="fileInput"
          className=" bg-green-950 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-900 transition"
        >
          Wybierz plik tekstowy
        </label>

        <input
          id="fileInput"
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {originalText && (
        <div className="w-full max-w-3xl mt-6">
          <h2 className="font-semibold mb-5">Oryginalny tekst:</h2>
          <pre className="bg-white p-4 rounded shadow mb-6">{originalText}</pre>

          <h2 className="font-semibold mb-5">Przetworzony tekst:</h2>
          <pre className="bg-green-50 p-4 rounded shadow">{processedText}</pre>
        </div>
      )}
    </div>
  );
};
