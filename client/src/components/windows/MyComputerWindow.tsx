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
  // System Drives
  {
    id: 'c-drive',
    name: 'Local Disk (C:)',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/hard_drive-2.png',
    children: [
      {
        id: 'windows',
        name: 'Windows',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/folder_closed-4.png',
        children: [
          {
            id: 'system32',
            name: 'System32',
            type: 'folder',
            icon: 'https://win98icons.alexmeub.com/icons/png/folder_closed-4.png',
            children: []
          }
        ]
      },
      {
        id: 'program-files',
        name: 'Program Files',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/folder_closed-4.png',
        children: []
      }
    ]
  },
  {
    id: 'd-drive',
    name: 'CD-ROM (D:)',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/cd_drive-2.png',
    children: []
  },
  {
    id: 'floppy',
    name: 'Floppy (A:)',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/floppy_disk-2.png',
    children: []
  },
  // Desktop Files
  {
    id: 'me',
    name: 'Me.txt',
    type: 'file',
    icon: 'https://win98icons.alexmeub.com/icons/png/msagent-4.png',
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
    name: 'My Projects',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png',
    children: [
      {
        id: 'web-projects',
        name: 'Web Development',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/html-1.png',
        children: [
          {
            id: 'portfolio',
            name: 'Portfolio Website',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/html-1.png',
            content: 'Modern portfolio website built with React and TypeScript featuring Windows 98 aesthetic'
          },
          {
            id: 'ecommerce',
            name: 'E-commerce Platform',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/shopping_cart-4.png',
            content: 'Full-stack e-commerce solution with payment integration and inventory management'
          }
        ]
      },
      {
        id: 'creative-projects',
        name: 'Creative & Art',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/paint_brush-0.png',
        children: [
          {
            id: 'generative-art',
            name: 'Generative Art Collection',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/paint_brush-0.png',
            content: 'Interactive generative art pieces using p5.js and Three.js with real-time user interaction'
          },
          {
            id: 'music-visualizer',
            name: 'Audio Visualizer',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png',
            content: 'Real-time audio visualization with WebGL shaders and frequency analysis'
          }
        ]
      },
      {
        id: 'telegram-bots',
        name: 'Telegram Bots',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png',
        children: [
          {
            id: 'bot1',
            name: 'Assistant Bot',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png',
            content: 'AI-powered Telegram bot for automated customer support'
          },
          {
            id: 'bot2',
            name: 'Content Manager Bot',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png',
            content: 'Bot for managing and scheduling social media content'
          }
        ]
      }
    ]
  },
  {
    id: 'music',
    name: 'Music Collection',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png',
    children: [
      {
        id: 'playlist1',
        name: 'Coding Vibes.m3u',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png',
        content: 'Lo-fi hip hop and electronic music playlist perfect for coding sessions and deep focus work'
      },
      {
        id: 'playlist2',
        name: 'Creative Flow.m3u',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png',
        content: 'Ambient and experimental tracks designed to enhance creative workflow and artistic inspiration'
      },
      {
        id: 'retro-collection',
        name: 'Retro Collection',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/folder_closed-4.png',
        children: [
          {
            id: 'synthwave',
            name: 'Synthwave Hits.mp3',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png',
            content: '80s inspired synthwave tracks with nostalgic vibes'
          }
        ]
      }
    ]
  },
  {
    id: 'blog',
    name: 'Ideas & Blog',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/help_question_mark-0.png',
    children: [
      {
        id: 'tech-thoughts',
        name: 'Tech Thoughts.txt',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/notepad-3.png',
        content: 'Random thoughts about technology trends and future innovations'
      },
      {
        id: 'creative-ideas',
        name: 'Creative Ideas.txt',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/notepad-3.png',
        content: 'Collection of weird but cool project ideas and artistic concepts'
      }
    ]
  },
  {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png',
    children: [
      {
        id: 'resume',
        name: 'SWAGY_Resume.pdf',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/document-0.png',
        content: 'Professional resume showcasing development experience, creative projects, and technical skills'
      },
      {
        id: 'portfolio-assets',
        name: 'Portfolio Assets',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/folder_closed-4.png',
        children: [
          {
            id: 'screenshots',
            name: 'Project Screenshots',
            type: 'folder',
            icon: 'https://win98icons.alexmeub.com/icons/png/folder_closed-4.png',
            children: []
          }
        ]
      },
      {
        id: 'certificates',
        name: 'Certificates',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/certificate-0.png',
        children: [
          {
            id: 'cert1',
            name: 'React_Certification.pdf',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/certificate-0.png',
            content: 'Advanced React Development Certification from recognized training institute'
          },
          {
            id: 'cert2',
            name: 'JavaScript_Advanced.pdf',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/certificate-0.png',
            content: 'Advanced JavaScript Programming Certification'
          }
        ]
      }
    ]
  },
  {
    id: 'contact',
    name: 'Contact Info',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png',
    children: [
      {
        id: 'social-links',
        name: 'Social Media.txt',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/notepad-3.png',
        content: 'Social media profiles and professional networking links'
      },
      {
        id: 'email-template',
        name: 'Contact Template.txt',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/mail-0.png',
        content: 'Template for professional communication and project inquiries'
      }
    ]
  },
  // System Folders
  {
    id: 'control-panel',
    name: 'Control Panel',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/settings_gear-0.png',
    children: [
      {
        id: 'display',
        name: 'Display Properties',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/monitor-3.png',
        content: 'System display settings and screen resolution configuration'
      },
      {
        id: 'system',
        name: 'System Properties',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/computer_3-2.png',
        content: 'System information and performance settings'
      }
    ]
  },
  // Recycle Bin
  {
    id: 'recycle',
    name: 'Recycle Bin',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png',
    children: []
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
              <img 
                src={file.icon} 
                alt={file.name}
                className="w-8 h-8 mb-1 object-contain"
                draggable={false}
              />
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