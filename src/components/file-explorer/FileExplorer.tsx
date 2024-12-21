import {FileExplorerItem} from './FileExplorerItem';
import './FileExplorer.css';
import {ContextMenu} from "./context-menu/ContextMenu.tsx";
import {FileSystemItem} from "./types.ts";
import {FileExplorerProvider, useFileExplorerContext} from "./context/FileExplorerContext.tsx";
import {fileTree} from "../../data.ts";

const Content = ({data}: { data: FileSystemItem }) => {
    const {
        selectedFile,
        expandedFolders,
        contextMenu,
        handleFileSelect,
        toggleFolder,
        handleContextMenu,
    } = useFileExplorerContext();


    return (
        <div className="file-explorer">
            <FileExplorerItem
                item={data}
                level={0}
                selectedFile={selectedFile}
                onSelectFile={handleFileSelect}
                expandedFolders={expandedFolders}
                onToggleFolder={toggleFolder}
                onContextMenu={handleContextMenu}
            />
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                />
            )}
        </div>
    );
};

export const FileExplorer = () => {
    return <FileExplorerProvider>
        <Content data={fileTree}/>
    </FileExplorerProvider>
}