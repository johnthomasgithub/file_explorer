import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./FolderData/folderData";
function App() {
  const [explorerState, setExplorerState] = useState(explorer);
  return (
    <div className="App">
      <Folder explorer={explorerState} />
    </div>
  );
}

export default App;
