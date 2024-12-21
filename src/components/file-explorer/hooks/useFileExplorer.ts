import {useState, useEffect} from "react";
import {FileSystemItem} from "../types";


export const useFileExplorer = ()=>{
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file: FileSystemItem } | null>(null);


    useEffect(() => {
        const handleClickOutside = () => {
            setContextMenu(null);
        };

        if (contextMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [contextMenu]);

    const handleFileSelect = (fileName: string) => {
        setSelectedFile(fileName);
    };

    const toggleFolder = (folderName: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(folderName)) {
                newSet.delete(folderName);
            } else {
                newSet.add(folderName);
            }
            return newSet;
        });
    };

    const handleContextMenu = (x: number, y: number, file: FileSystemItem) => {
        setContextMenu({ x, y, file });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleCopy = () => {
        if (contextMenu) {
            console.log('copy file:', contextMenu.file.name);
            closeContextMenu();
        }
    };

    const handleDelete = () => {
        if (contextMenu) {
            console.log('delete file:', contextMenu.file.name);
            closeContextMenu();
        }
    };

    const handleRename = () => {
        if (contextMenu) {
            console.log('rename file:', contextMenu.file.name);
            closeContextMenu();
        }
    };

    return {
        selectedFile,
        expandedFolders,
        contextMenu,
        handleFileSelect,
        toggleFolder,
        handleContextMenu,
        closeContextMenu,
        handleCopy,
        handleDelete,
        handleRename
    };
}