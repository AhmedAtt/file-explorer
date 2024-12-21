import {FileSystemItem} from "../../components/file-explorer/types";
import {useFileExplorer} from "../../components/file-explorer/hooks/useFileExplorer";
import {renderHook, act} from "@testing-library/react";

describe('useFileExplorer', () => {

    const mockFile: FileSystemItem = {
        type: 'file',
        name: 'test.ts',
        meta: 'ts'
    };

    describe('File Selection', () => {
        it('should select a file', () => {
            const {result} = renderHook(() => useFileExplorer());

            act(() => {
                result.current.handleFileSelect('test.ts');
            });

            expect(result.current.selectedFile).toBe('test.ts');
        });

        it('should change selected file', () => {
            const {result} = renderHook(() => useFileExplorer());

            act(() => {
                result.current.handleFileSelect('test1.ts');
                result.current.handleFileSelect('test2.ts');
            });

            expect(result.current.selectedFile).toBe('test2.ts');
        });
    });


    describe('Folder Management', () => {
        it('should expand a folder', () => {
            const {result} = renderHook(() => useFileExplorer());

            act(() => {
                result.current.toggleFolder('src');
            });

            expect(result.current.expandedFolders.has('src')).toBe(true);
        });

        it('should collapse an expanded folder', () => {
            const {result} = renderHook(() => useFileExplorer());

            act(() => {
                result.current.toggleFolder('src');
                result.current.toggleFolder('src');
            });

            expect(result.current.expandedFolders.has('src')).toBe(false);
        });
    });


    describe('Context Menu', () => {
        let consoleLogSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleLogSpy.mockRestore();
        });

        it('should close context menu when clicking outside', () => {
            const { result } = renderHook(() => useFileExplorer());

            act(() => {
                result.current.handleContextMenu(100, 200, mockFile);
            });

            expect(result.current.contextMenu).not.toBeNull();


            act(() => {
                document.dispatchEvent(new MouseEvent('click'));
            });

            expect(result.current.contextMenu).toBeNull();
        });

        it('should handle copy action', () => {
            const { result } = renderHook(() => useFileExplorer());

            act(() => {
                result.current.handleContextMenu(100, 200, mockFile);
            });

            act(() => {
                result.current.handleCopy();
            });

            expect(consoleLogSpy).toHaveBeenCalledWith('copy file:', mockFile.name);
            expect(result.current.contextMenu).toBeNull();
        });

        it('should handle delete action', () => {
            const { result } = renderHook(() => useFileExplorer());

            act(() => {
                result.current.handleContextMenu(100, 200, mockFile);
            });

            act(() => {
                result.current.handleDelete();
            });

            expect(consoleLogSpy).toHaveBeenCalledWith('delete file:', mockFile.name);
            expect(result.current.contextMenu).toBeNull();
        });

        it('should handle rename action', () => {
            const { result } = renderHook(() => useFileExplorer());

            act(() => {
                result.current.handleContextMenu(100, 200, mockFile);
            });

            act(() => {
                result.current.handleRename();
            });

            expect(consoleLogSpy).toHaveBeenCalledWith('rename file:', mockFile.name);
            expect(result.current.contextMenu).toBeNull();
        });
    });
});