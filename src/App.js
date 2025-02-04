import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Terp Taster"; // 🏷️ Set the tab title
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <h1 className="text-4xl font-bold text-blue-500">Tailwind is Working! 🚀</h1>
    </div>
  );
}

export default App;
