import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  content?: string;
  children?: FileItem[];
}

const desktopFiles: FileItem[] = [
  {
    id: 'me',
    name: 'Me.txt',
    type: 'file',
    icon: '📄',
    content: `SWAGY - Portfolio & Creative Works

About Me:
I'm a creative developer passionate about building unique digital experiences.
My work spans from web development to creative coding projects.

Skills:
- Frontend Development (React, TypeScript, CSS)
- UI/UX Design
- Creative Coding
- Digital Art & Design

Philosophy:
"Making weird but cool stuff" - that's my motto. I believe in pushing 
boundaries and creating experiences that are both functional and memorable.

Contact:
Ready to collaborate on something amazing? Let's connect!`
  },
  {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    icon: '📁',
    children: [
      {
        id: 'web-projects',
        name: 'Web Projects',
        type: 'folder',
        icon: '🌐',
        children: [
          {
            id: 'portfolio',
            name: 'Portfolio.html',
            type: 'file',
            icon: '🌐',
            content: 'Modern portfolio website built with React and TypeScript'
          },
          {
            id: 'ecommerce',
            name: 'E-commerce Platform',
            type: 'file',
            icon: '🛒',
            content: 'Full-stack e-commerce solution with payment integration'
          }
        ]
      },
      {
        id: 'creative-projects',
        name: 'Creative Projects',
        type: 'folder',
        icon: '🎨',
        children: [
          {
            id: 'generative-art',
            name: 'Generative Art.js',
            type: 'file',
            icon: '🎨',
            content: 'Interactive generative art pieces using p5.js and Three.js'
          },
          {
            id: 'music-visualizer',
            name: 'Music Visualizer',
            type: 'file',
            icon: '🎵',
            content: 'Real-time audio visualization with WebGL shaders'
          }
        ]
      }
    ]
  },
  {
    id: 'music',
    name: 'Music Collection',
    type: 'folder',
    icon: '🎵',
    children: [
      {
        id: 'playlist1',
        name: 'Coding Vibes.m3u',
        type: 'file',
        icon: '🎵',
        content: 'Lo-fi hip hop and electronic music for coding sessions'
      },
      {
        id: 'playlist2',
        name: 'Creative Flow.m3u',
        type: 'file',
        icon: '🎵',
        content: 'Ambient and experimental tracks for creative work'
      }
    ]
  },
  {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    icon: '📥',
    children: [
      {
        id: 'resume',
        name: 'SWAGY_Resume.pdf',
        type: 'file',
        icon: '📄',
        content: 'Professional resume showcasing experience and skills'
      },
      {
        id: 'certificates',
        name: 'Certificates',
        type: 'folder',
        icon: '🏆',
        children: [
          {
            id: 'cert1',
            name: 'React_Certificate.pdf',
            type: 'file',
            icon: '📜',
            content: 'Advanced React Development Certification'
          }
        ]
      }
    ]
  }
];

export function MyComputerWindow() {
  const [currentPath, setCurrentPath] = useState<FileItem[]>([]);
  const [currentFiles, setCurrentFiles] = useState<FileItem[]>(desktopFiles);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [viewingContent, setViewingContent] = useState(false);

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === 'folder' && folder.children) {
      setCurrentPath([...currentPath, folder]);
      setCurrentFiles(folder.children);
      setSelectedFile(null);
      setViewingContent(false);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      
      if (newPath.length === 0) {
        setCurrentFiles(desktopFiles);
      } else {
        const parentFolder = newPath[newPath.length - 1];
        setCurrentFiles(parentFolder.children || []);
      }
      setSelectedFile(null);
      setViewingContent(false);
    }
  };

  const openFile = (file: FileItem) => {
    if (file.type === 'file' && file.content) {
      setSelectedFile(file);
      setViewingContent(true);
    } else if (file.type === 'folder') {
      navigateToFolder(file);
    }
  };

  const getCurrentPathString = () => {
    return 'C:\\Desktop\\' + currentPath.map(p => p.name).join('\\');
  };

  if (viewingContent && selectedFile) {
    return (
      <div className="h-full flex flex-col bg-gray-100">
        {/* File viewer header */}
        <div className="bg-gray-200 p-2 border-b flex items-center gap-2">
          <button
            onClick={() => setViewingContent(false)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-black text-sm border border-gray-400 rounded"
          >
            ← Back
          </button>
          <span className="text-sm font-bold">{selectedFile.name}</span>
        </div>

        {/* File content */}
        <div className="flex-1 p-4 overflow-auto">
          <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-4 border border-gray-300 rounded">
            {selectedFile.content}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-gray-200 p-2 border-b">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={navigateBack}
            disabled={currentPath.length === 0}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 text-black text-sm border border-gray-400 rounded"
          >
            ← Back
          </button>
          <span className="text-sm">Address:</span>
          <div className="flex-1 bg-white border border-gray-400 px-2 py-1 text-sm">
            {getCurrentPathString()}
          </div>
        </div>
      </div>

      {/* File listing */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {currentFiles.map((file) => (
            <div
              key={file.id}
              className="flex flex-col items-center p-2 hover:bg-blue-200 cursor-pointer rounded"
              onDoubleClick={() => openFile(file)}
            >
              <div className="text-3xl mb-1">{file.icon}</div>
              <span className="text-xs text-center break-words w-full">
                {file.name}
              </span>
            </div>
          ))}
        </div>

        {currentFiles.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            This folder is empty
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="bg-gray-200 p-2 border-t text-xs text-gray-600">
        {currentFiles.length} item(s) | My Computer
      </div>
    </div>
  );
}