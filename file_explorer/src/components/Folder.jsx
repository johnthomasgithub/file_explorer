import React, { useEffect, useState } from "react";

const Folder = ({ explorerData }) => {
  const [explorer, setExplorer] = useState(explorerData);
  const [isOpen, setIsOpen] = useState(false);
  const [openFileInput, setOpenFileInput] = useState(false);
  const [openFolderInput, setOpenFolderInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    console.log(explorer);
  }, [explorer]);
  const handleCreateAction = (type) => {
    let newObj = {
      id: "" + Math.floor(Math.random() * 1000) + 1,
      name: inputValue,
      isFolder: openFolderInput ? true : false,
      items: [],
    };
    let temp = explorer;
    console.log(explorer);
    temp.items.push(newObj);
    setExplorer(temp);
    setInputValue("");
  };
  if (explorer.isFolder) {
    return (
      <div className="folder-parent">
        <span className="folder" onClick={() => setIsOpen(!isOpen)}>
          📁 {explorer.name}
          <div>
            <span
              onClick={(ev) => {
                ev.stopPropagation();
                setOpenFolderInput(!openFolderInput);
              }}
            >
              📁
            </span>
            <span
              onClick={(ev) => {
                ev.stopPropagation();
                setOpenFileInput(!openFileInput);
              }}
            >
              📄
            </span>
          </div>
        </span>
        {openFileInput && (
          <div className="new-file">
            File :{" "}
            <input
              value={inputValue}
              onChange={(ev) => setInputValue(ev.target.value)}
              onKeyUp={(ev) => {
                if (ev.key === "Enter") {
                  handleCreateAction("file");
                  setOpenFileInput(false);
                }
              }}
            />{" "}
            <span
              onClick={() => {
                setOpenFileInput(!openFileInput);
                setInputValue("");
              }}
            >
              ⛔
            </span>
          </div>
        )}
        {openFolderInput && (
          <div className="new-file">
            Folder:{" "}
            <input
              value={inputValue}
              onChange={(ev) => {
                setInputValue(ev.target.value);
              }}
              onKeyUp={(ev) => {
                if (ev.key === "Enter") {
                  handleCreateAction("folder");
                  setOpenFolderInput(false);
                }
              }}
            />{" "}
            <span
              onClick={() => {
                setOpenFolderInput(!openFolderInput);
                setInputValue("");
              }}
            >
              ⛔
            </span>
          </div>
        )}
        {isOpen &&
          explorer.items.map((item, index) => {
            return (
              <div key={item.id} className="item">
                <Folder explorerData={item} />
              </div>
            );
          })}
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
};

export default Folder;
