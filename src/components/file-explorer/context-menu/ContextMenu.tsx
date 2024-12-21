import "./ContextMenu.css";
import {useFileExplorerContext} from "../context/FileExplorerContext.tsx";

type Props = {
    x: number;
    y: number;
}

export const ContextMenu = ({x, y}: Props) => {
    const {
        handleCopy,
        handleDelete,
        handleRename,
    } = useFileExplorerContext();

    return (
        <div
            className="context-menu"
            style={{left: x, top: y}}
        >
            <button className="context-menu__item" onClick={handleCopy}>
                Copy
            </button>
            <button className="context-menu__item" onClick={handleDelete}>
                Delete
            </button>
            <button className="context-menu__item" onClick={handleRename}>
                Rename
            </button>
        </div>
    );
};