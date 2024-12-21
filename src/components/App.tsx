import {useState} from 'react';
import {FileExplorer} from "./file-explorer/FileExplorer.tsx";
import {FolderIcon} from "../assets/icons.tsx";
import './App.css';


export const App = () => {
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);

    return (
        <div className="app">
            <div className="app__activity-bar">
                <button
                    className={`app__activity-button ${isExplorerOpen ? 'app__activity-button--active' : ''}`}
                    onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                    aria-label="Toggle Explorer"
                >
                    <FolderIcon/>
                </button>
            </div>

            <div className={`app__explorer ${!isExplorerOpen ? 'app__explorer--collapsed' : ''}`}>
                <FileExplorer/>
            </div>

            <div className="app__content">
                {/* Main content */}
            </div>
        </div>
    );
};