import {MouseEvent} from "react"
import {FileSystemItem} from "./types.ts";
import {ChevronDown, getIcon} from "../../assets/icons.tsx";
import "./FileExplorerItem.css";

type Props = {
    item: FileSystemItem;
    level: number;
    selectedFile: string | null;
    onSelectFile: (fileName: string) => void;
    expandedFolders: Set<string>;
    onToggleFolder: (folderName: string) => void;
    onContextMenu: (x: number, y: number, file: FileSystemItem) => void;
}

export const FileExplorerItem = ({
                                     item,
                                     level,
                                     selectedFile,
                                     onSelectFile,
                                     expandedFolders,
                                     onToggleFolder,
                                     onContextMenu
                                 }: Props) => {
    const Icon = getIcon(item);

    const iconClass = `file-item__icon ${
        item.type === 'folder'
            ? 'file-item__icon--folder'
            : `file-item__icon--${item.meta || 'file'}`
    }`;


    const handleClick = () => {
        if (item.type === 'folder') {
            onToggleFolder(item.name);
        } else {
            onSelectFile(item.name);
        }
    };

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        onContextMenu(e.clientX, e.clientY, item);
    };

    const isExpanded = item.type === 'folder' && expandedFolders.has(item.name);

    return (
        <div className="file-item">
            <div
                className={`file-item__content ${
                    selectedFile === item.name ? 'file-item__content--selected' : ''
                }`}
                style={{paddingLeft: `${level * 20}px`}}
                onClick={handleClick}
                onContextMenu={(e) => {
                    if (item.type === 'file') {
                        handleContextMenu(e);
                    }
                }}
            >

                <div className={"file-item__chevron-container"}>
                    {item.type === 'folder' && (
                        <ChevronDown
                            className={`file-item__chevron ${
                                isExpanded ? 'file-item__chevron--expanded' : ''
                            }`}
                        />
                    )}
                </div>
                <Icon className={iconClass}/>
                <span className="file-item__name">{item.name}</span>
            </div>

            {item.type === 'folder' && isExpanded && (
                <div className="file-item__children">
                    {item.data.map((child, index) => (
                        <FileExplorerItem
                            key={`${child.name}-${index}`}
                            item={child}
                            level={level + 1}
                            selectedFile={selectedFile}
                            onSelectFile={onSelectFile}
                            expandedFolders={expandedFolders}
                            onToggleFolder={onToggleFolder}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};