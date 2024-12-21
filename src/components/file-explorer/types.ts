type FileItem = {
    type: 'file';
    name: string;
    meta: "ts" | "js" | "html" | "svg" | "img" ;
}

type FolderItem = {
    type: 'folder';
    name: string;
    data: (FileItem | FolderItem)[];
}

export type FileSystemItem = FileItem | FolderItem;