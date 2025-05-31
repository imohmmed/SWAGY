import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  content?: string;
  children?: FileItem[];
  windowType?: string; // للربط مع نوافذ سطح المكتب
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
    windowType: 'me',
    content: `SWAGY - Creative Developer & Designer

About Me:
Creative developer passionate about building unique digital experiences.
Currently working on projects that confuse people… then impress them.

Skills & Expertise:
- Frontend Development (React, TypeScript, CSS)
- UI/UX Design
- E-commerce Development (Shopify)
- Creative Coding & Digital Art
- Retro Computing & Nostalgic Interfaces
- Arabic RTL Design Implementation

Quick Stats:
- Projects: 8+ completed
- Experience: 3+ years in development
- Ideas: Unlimited supply
- Coffee: Daily requirement

Philosophy:
"Making weird but cool stuff" - Creating experiences that are both 
functional and memorable, with a focus on authentic retro aesthetics.

Current Focus:
Building stylish Shopify stores, creative web experiences, and 
bringing Windows 98 nostalgia to modern web development.

Contact:
Ready to collaborate on something amazing? Let's build something cool together!`
  },
  {
    id: 'projects',
    name: 'My Projects',
    type: 'folder',
    icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png',
    windowType: 'projects',
    children: [
      {
        id: 'web-projects',
        name: 'Web Development',
        type: 'folder',
        icon: 'https://win98icons.alexmeub.com/icons/png/html-1.png',
        children: [
          {
            id: 'mora-modaa',
            name: 'Mora Modaa Store',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/shopping_cart-4.png',
            content: `Mora Modaa - Fashion E-commerce Platform

Description:
Fashion? Check. Vibes? Double check. A sleek Shopify store that feels like your closet before Eid — clean, scrollable, and packed with trendy fits.

Technologies Used:
- Shopify Platform
- Liquid Templating
- Custom CSS Styling
- Responsive Design

Features:
- Modern fashion catalog
- Clean, scrollable interface
- Mobile-optimized experience
- Arabic language support

URL: https://mora1.com/
Status: Live and operational`
          },
          {
            id: 'pixel-suite',
            name: 'Pixel Suite Gaming Store',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/games-0.png',
            content: `Pixel Suite - Gaming Digital Marketplace

Description:
A digital loot cave for gamers — skins, bundles, and that "add to cart" itch. Dark theme, clean layout, and yeah… built on Shopify because we like life easy.

Technologies Used:
- Shopify E-commerce Platform
- JavaScript for interactivity
- Dark Theme UI Design
- Gaming-focused UX

Features:
- Gaming skins and bundles
- Dark mode interface
- Digital product delivery
- Gamer-friendly checkout process

URL: https://pixelsuite.vip/
Status: Active gaming marketplace`
          },
          {
            id: 'crystal-gift',
            name: 'Crystal for Gift',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/present-0.png',
            content: `Crystal for Gift - Luxury Gifts Platform

Description:
Gifts that scream "I tried" — with class. A fancy-looking Shopify store serving luxury product vibes and a full Arabic experience. For when flowers just aren't enough.

Technologies Used:
- Shopify Platform
- Arabic RTL Implementation
- Luxury UI Components
- Custom Styling

Features:
- Premium gift catalog
- Full Arabic language support
- Right-to-left layout design
- Luxury brand aesthetics
- Gift packaging options

URL: https://crystal4gifts.com/
Status: Operational luxury marketplace`
          },
          {
            id: 'sls-cafe',
            name: 'SLS Cafe Website',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/coffee_cup-0.png',
            content: `SLS Cafe - Coffee Shop Experience

Description:
Not just a coffee shop — it's a whole mood ☕
Built to feel like your second home (but with better lighting). Clean layout, cozy colors, and the kind of website that makes you want to order a latte at 2AM.

Technologies Used:
- Shopify E-commerce
- Food & Beverage Optimization
- Cozy UI Design
- Mobile-First Approach

Features:
- Coffee menu showcase
- Cozy atmosphere design
- Online ordering system
- Cafe ambiance capture
- Mobile-optimized experience

URL: https://slscafe.com/
Status: Brewing success online`
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
            id: 'altaraf-links',
            name: 'Altaraf Links Hub',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/world-2.png',
            content: `Altaraf Links - Travel Link Hub

Description:
All the links, none of the drama 🔗
Simple, clean, and straight to the point — a stylish link hub for Al-Taraf Travel. Think of it like a digital business card, but with ✈️ vibes.

Technologies Used:
- Clean HTML/CSS Design
- Link Hub Architecture
- Travel Industry Focus
- Minimalist Interface

Features:
- Centralized link management
- Travel-themed design
- Quick access navigation
- Professional presentation
- Mobile-responsive layout

URL: https://altaraf.link
Status: Active link hub`
          },
          {
            id: 'filmora-tv',
            name: 'Filmora TV Platform',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/video_file-2.png',
            content: `Filmora TV - Streaming Platform

Description:
Like Netflix, but with more attitude 🎬
A streaming platform with personality and style.

Technologies Used:
- Streaming Technology
- Video Platform Architecture
- Entertainment UI/UX
- Content Management System

Features:
- Video streaming capabilities
- Entertainment-focused design
- Content organization
- User-friendly interface
- Media player integration

URL: https://filmora.tv
Status: Live streaming platform`
          },
          {
            id: 'windows98-portfolio',
            name: 'Windows 98 Portfolio',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/computer_3-2.png',
            content: `SWAGY Windows 98 Portfolio

Description:
Current project - A meticulously crafted Windows 98-inspired personal portfolio website delivering an authentic retro computing experience.

Technologies Used:
- React.js Frontend
- TypeScript
- Tailwind CSS
- Windows 98 UI Recreation
- Authentic Sound Effects

Features:
- Pixel-perfect Windows 98 interface
- Interactive desktop simulation
- Functional file explorer
- Nostalgic startup sequence
- Mobile-responsive design
- Multilingual support (Arabic/English)

Status: Currently in development`
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
            id: 'customer-support-bot',
            name: 'Customer Support Bot',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png',
            content: `Customer Support Bot - Telegram Automation

Description:
Automated customer service assistant for handling common inquiries and support tickets.

Technologies Used:
- Python Programming
- Telegram Bot API
- Natural Language Processing
- Database Integration

Features:
- 24/7 automated responses
- FAQ handling
- Ticket routing system
- Multi-language support
- Customer data management
- Integration with support systems

Capabilities:
- Handle common customer queries
- Escalate complex issues to humans
- Provide instant responses
- Track conversation history
- Generate support reports

Status: Deployed and operational`
          },
          {
            id: 'news-aggregator-bot',
            name: 'News Aggregator Bot',
            type: 'file',
            icon: 'https://win98icons.alexmeub.com/icons/png/newsletter-0.png',
            content: `News Aggregator Bot - Daily Updates

Description:
Daily news updates and summaries delivered directly to Telegram channels.

Technologies Used:
- Node.js Runtime
- Telegram Bot API
- RSS Feed Processing
- News API Integration

Features:
- Daily news compilation
- Category-based filtering
- Automated scheduling
- Summary generation
- Multi-source aggregation
- Custom news topics

Capabilities:
- Fetch news from multiple sources
- Generate concise summaries
- Schedule automated posts
- Filter by user preferences
- Provide trending topics
- Archive news history

Status: Active daily operation`
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
    windowType: 'music',
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
    windowType: 'blog',
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
    windowType: 'downloads',
    children: [
      {
        id: 'resume',
        name: 'SWAGY_Resume.pdf',
        type: 'file',
        icon: 'https://win98icons.alexmeub.com/icons/png/document-0.png',
        content: `SWAGY - Creative Developer Resume

Personal Information:
Name: SWAGY
Title: Creative Developer & Designer
Experience: 3+ years in web development
Location: Available for remote work

Professional Summary:
Creative developer with a passion for building unique digital experiences that confuse people… then impress them. Specialized in e-commerce development, retro computing interfaces, and bringing nostalgic aesthetics to modern web development.

Technical Skills:
- Frontend: React, TypeScript, JavaScript, CSS, HTML
- E-commerce: Shopify Platform, Liquid Templating
- Design: UI/UX Design, Retro Computing Interfaces
- Languages: Arabic RTL Implementation, Multi-language Support
- Tools: Git, Modern Development Workflow

Project Portfolio:
1. Mora Modaa (mora1.com) - Fashion e-commerce platform
2. Pixel Suite (pixelsuite.vip) - Gaming marketplace with dark theme
3. Crystal for Gift (crystal4gifts.com) - Luxury gifts with Arabic support
4. SLS Cafe (slscafe.com) - Coffee shop website with cozy design
5. Altaraf Links (altaraf.link) - Travel industry link hub
6. Filmora TV (filmora.tv) - Streaming platform
7. Windows 98 Portfolio - Current retro computing project
8. Telegram Bots - Customer support and news automation

Philosophy:
"Making weird but cool stuff" - Creating experiences that are both functional and memorable, with a focus on authentic aesthetics and user experience.

Contact:
Ready to collaborate on projects that stand out from the crowd.`
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

interface MyComputerWindowProps {
  onOpenWindow?: (windowType: string) => void;
}

export function MyComputerWindow({ onOpenWindow }: MyComputerWindowProps = {}) {
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
    // إذا كان الملف مرتبط بنافذة سطح المكتب، افتحها
    if (file.windowType && onOpenWindow) {
      onOpenWindow(file.windowType);
      return;
    }
    
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