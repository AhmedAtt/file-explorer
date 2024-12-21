import {createContext, ReactNode, useContext} from 'react';
import {useFileExplorer} from '../hooks/useFileExplorer';

const FileExplorerContext = createContext<ReturnType<typeof useFileExplorer> | null>(null);

export const FileExplorerProvider = ({children}: { children: ReactNode }) => {
    const fileExplorerState = useFileExplorer();

    return (
        <FileExplorerContext.Provider value={fileExplorerState}>
            {children}
        </FileExplorerContext.Provider>
    );
};

export const useFileExplorerContext = () => {
    const context = useContext(FileExplorerContext);
    if (!context) {
        throw new Error('useFileExplorerContext must be used within a FileExplorerProvider');
    }
    return context;
};