import { Translation } from '../types';

export const translations: Record<string, Translation> = {
  en: {
    start: 'Start',
    myComputer: 'My Computer',
    run: 'Run...',
    settings: 'Settings',
    shutdown: 'Shut Down...',
    close: 'Close',
    minimize: 'Minimize',
    maximize: 'Maximize',
    
    // Desktop Icons
    myComputerIcon: 'MyComputer',
    meIcon: 'Me.txt',
    projectsIcon: 'My Projects',
    musicIcon: 'Music Player',
    blogIcon: 'ideas.txt',
    downloadsIcon: 'Downloads',
    contactIcon: 'Contact Me',
    terminalIcon: 'Terminal',
    recycleIcon: 'Recycle Bin',
    gamesIcon: 'Games',
    
    // Window Titles
    mycomputerTitle: 'My Computer',
    meTitle: 'Me.txt - Notepad',
    projectsTitle: 'My Projects - Windows Explorer',
    musicTitle: 'MoHmmeD_playlist.m3u - Winamp',
    blogTitle: 'ideas.txt - Notepad',
    downloadsTitle: 'Downloads',
    contactTitle: 'Send Email',
    terminalTitle: 'MS-DOS Prompt',
    recycleTitle: 'Recycle Bin',
    gamesTitle: 'Games - Windows Explorer',
    
    // Common
    name: 'Name',
    email: 'Email',
    message: 'Message',
    subject: 'Subject',
    send: 'Send',
    clear: 'Clear',
    download: 'Download Now',
    play: 'Play',
    pause: 'Pause',
    next: 'Next',
    previous: 'Previous',
    draw: 'Draw',
    undo: 'Undo',
    
    // About content
    aboutMe: 'About Me:',
    swagy: 'MoHmmeD',
    engineerModel: 'Engineer, Model & Programmer',
    heyyy: 'Heyyy',
    aboutDescription: '*Heyyy!*\nI\'m *Mohammed Abdulkarim* — a proud *Biomedical Engineering* graduate from *Al-Farahidi University*\n(I genuinely enjoy diving into circuits, signals, and all the nerdy stuff)\nBut wait, there\'s more!\nI\'m also deep into *programming*, *fashion*, and anything that screams weird but cool.\n\nI like working on things that make people say, *"Wait, what even is this?"* — and then two minutes later, *"Okay, that\'s actually genius."*',
    specializedIn: 'Specialized in:',
    webDev: 'Web Development',
    uiuxDesign: 'UI/UX Design',
    creativeCoding: 'Creative Coding',
    retroComputing: 'Retro Computing',
    currentlyBuilding: 'Currently working on projects that confuse people… then impress them.',
    
    // Quick stats
    quickStats: 'Quick Stats:',
    projects: 'Projects: 8+',
    experience: 'Experience: 3+ years',
    ideas: 'Ideas: Unlimited',
    music: 'Music: Daily',
    
    // Contact
    contactDescription: 'Other Ways to Reach Me:',
    generalInquiry: 'General Inquiry',
    projectCollaboration: 'Project Collaboration',
    jobOpportunity: 'Job Opportunity',
    technicalSupport: 'Technical Support',
    other: 'Other',
    
    // Games
    gamesAvailable: 'games available',
    selectedGame: 'Selected',
    selectGameToPlay: 'Select a game to play',
    ready: 'Ready',
    
    // Game titles and descriptions
    minesweeperTitle: 'Minesweeper',
    minesweeperDescription: 'Find all the hidden mines without clicking on them. Numbers indicate nearby mines.',
    solitaireTitle: 'Solitaire',
    solitaireDescription: 'Classic card game. Arrange all cards by suit from A to K.',
    snakeTitle: 'Snake',
    snakeDescription: 'Control the snake to eat food and grow longer. Don\'t hit the walls or yourself!',
    tetrisTitle: 'Tetris',
    tetrisDescription: 'Arrange falling blocks to complete lines and score points.',
    pongTitle: 'Pong',
    pongDescription: 'Classic tennis-style game. Don\'t let the ball escape from your side!',
    comingSoon: 'Coming Soon...',
    
    // Minesweeper specific
    minesweeperWon: 'Congratulations! You won!',
    minesweeperLost: 'Game Over! Try again.',
    minesweeperInstructions: 'Instructions:',
    minesweeperLeftClick: 'Left click: Reveal cell',
    minesweeperRightClick: 'Right click: Flag/unflag',
    minesweeperLongPress: 'Mobile: Long press to flag',
    difficulty: 'Difficulty',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    expert: 'Expert',
    easy: 'Easy',
    normal: 'Normal',
    hard: 'Hard',
    options: 'Options',
    mode: 'Mode',
    mobileToggleMode: 'Toggle mode: Reveal/Flag',
    currentMode: 'Current mode',
    
    gameInstructions: 'Instructions:',
    
    // Solitaire specific
    newGame: 'New Game',
    congratulations: 'Congratulations! You won!',
    solitaireInstructions1: 'Click stock to draw cards',
    solitaireInstructions2: 'Drag cards to build sequences',
    solitaireInstructions3: 'Build foundations from Ace to King',
    
    // Snake specific
    gameOver: 'Game Over!',
    finalScore: 'Final Score',
    paused: 'Paused',
    resume: 'Resume',
    snakeInstructions1: 'Use arrow keys or WASD to move',
    snakeInstructions2: 'Eat the red food to grow',
    snakeInstructions3: 'Avoid walls and your own tail',
    snakeInstructions4: 'Press Space to pause/resume',
    
    // Tetris specific
    tetrisScore: 'Score',
    tetrisLevel: 'Level',
    tetrisLines: 'Lines',
    tetrisNext: 'Next',
    tetrisHold: 'Hold',
    tetrisControls: 'Controls',
    tetrisDrop: 'Drop',
    tetrisGameOver: 'Game Over!',
    tetrisPaused: 'Paused',
    
    // Pong specific
    pongScore: 'Score',
    pongPlayer: 'Player',
    pongComputer: 'Computer',
    pongGameOver: 'Game Over!',
    pongWinner: 'Winner',
    pongFirstTo: 'First to 10 points wins',
    pongInstructions1: 'Use ↑↓ arrow keys or W/S to control your paddle',
    pongInstructions2: 'Don\'t let the ball escape from your side!',
    pongInstructions3: 'First player to reach 10 points wins',
    pongInstructions4: 'Press P to pause/resume the game',
    
    // Downloads
    availableDownloads: 'Available Downloads',
    downloadInstructions: 'Download Instructions:',
    resumeDesc: 'My official CV — aka "how I look on paper"',
    brandGuidelinesDesc: 'Logos, colors, brand rules — basically the MoHmmeD style guide',
    resumeSize: 'Size: 2.3 MB | Updated: Nov 2024',
    brandSize: 'Size: 4.2 MB | Updated: Sep 2024',
    rightClickSave: 'Right-click and "Save As" for smooth downloading',
    filesClean: 'All files are clean and virus-free',
    differentFormat: 'Need a different format? Just hit me up',
    updatedRegularly: 'Updated regularly (because I actually care)',
    resumeTitle: 'Resume_MoHmmeD_2024.pdf',
    brandTitle: 'Brand_Guidelines.pdf',
    resumeDescription: 'My official CV — aka "how I look on paper"',
    brandDescription: 'Logos, colors, brand rules — basically the MoHmmeD style guide.',
    downloadInstruction1: 'Right-click and "Save As" for smooth downloading',
    downloadInstruction2: 'All files are clean and virus-free 🧼',
    downloadInstruction3: 'Need a different format? Just hit me up',
    downloadInstruction4: 'Updated regularly (because I actually care)',
    downloadNow: 'Download Now',
    
    // Contact Form
    sendEmailTo: 'Send Email to MoHmmeD',
    yourFullName: 'Your Full Name',
    typeMessage: 'Type your message here...',
    sending: 'Sending...',
    shoppingWebsite: 'Shopping website',
    from: 'From:',
    attachFile: 'Attach File (0)',
    otherWaysToReach: 'Other Ways to Reach Me',
    
    // My Computer
    back: '← Back',
    address: 'Address:',
    emptyFolder: 'This folder is empty',
    systemType: 'System Type: 90s kid / Modern dev hybrid',
    meFile: 'Me.txt',
    localDisk: 'Local Disk (C:)',
    controlPanel: 'Control Panel',
    contactInfo: 'Contact Info',
    ideasFile: 'Ideas.txt',
    items: 'item(s)',
    
    // Terminal
    terminalWelcome: 'Microsoft(R) MS-DOS(R) Version 6.22',
    terminalCopyright: '(C)Copyright Microsoft Corp 1981-1994.',
    helpCommand: 'Available commands: about, swag, clear, music, ascii, exit, hack, matrix, love, play, open music, whoami',
    aboutResponse: 'MoHmmeD Terminal\nFor stylish minds only.',
    swagResponse: '🧢 Loading ultimate swag mode...',
    musicResponse: '🎶 MoHmmeD_playlist.m3u loaded successfully.',
    asciiResponse: '¯\\_(ツ)_/¯',
    hackResponse: '💀 Access denied. FBI is watching.',
    loveResponse: 'You typed it. Respect.',
    playResponse: '🎶 Now playing: MoHmmeD_playlist.m3u',
    openMusicResponse: '🎵 Opening Music Player...',
    whoamiResponse: 'Name: MoHmmeD\nRole: Designer / Developer / Curator of Coolness\nStatus: Always in style',
    exitResponse: 'Thank you for visiting! Window will close in 3 seconds...',
    commandNotFound: 'is not recognized as an internal or external command.',
    
    // Recycle Bin
    recycleStatus: 'Status:',
    recycleEmpty: 'Empty (0 objects)',
    recycleQuote: '"No regrets here — just past versions of you."',
    emptyBin: 'Empty Recycle Bin',
    properties: 'Properties',
    recycleBinAlreadyEmpty: 'Recycle Bin is already empty!',
    recycleBinProperties: 'Recycle Bin Properties:\nLocation: Desktop\nSize: 0 bytes\nContains: 0 files',
    recycleTip1: '💡 Pro Tip: Sometimes letting go is the best way forward.',
    recycleTip2: '🔄 Every deletion is a chance for something new.',
    
    // Music  
    musicPlayer: 'Music Player',
    nowPlaying: 'Now Playing:',
    playlist: 'Playlist:',
    
    // Projects Categories
    projectCategories: 'Project Categories',
    workedWith: 'Worked With',
    liveWebsites: 'Live Websites', 
    telegramBots: 'Telegram Bots',
    selectCategory: 'Select a category to view projects',
    
    // Project Buttons
    instagram: 'Instagram',
    visitWebsite: 'Visit Website',
    readMore: 'Read More',
    openBot: 'Open Bot',
    details: 'Details',
    
    // Blog Window
    blogTitle1: 'Why I Still Design Like It\'s 1998',
    blogDate1: 'December 2024',
    blogContent1: 'Modern design is cool, but nothing beats a chunky pixel button with a shadow you can trip over. Call it nostalgia... or taste.',
    blogTitle2: '2 AM: Me vs One Stupid Semicolon',
    blogDate2: 'November 2024',
    blogContent2: 'Winner: The semicolon.\nLesson: Always respect the semicolon.',
    blogTitle3: 'Who Said Developers Can\'t Be Stylish?',
    blogDate3: 'October 2024',
    blogContent3: 'I debug in AirPods Max and baggy pants. If the looks are clean, the code is cleaner.',
    blogTitle4: 'Retro UIs > Modern Headaches',
    blogDate4: 'September 2024',
    blogContent4: 'Windows 98 taught me one thing:\nClick, drag, feel happy.\nModern apps?\nClick, wait, crash.',
    showerThoughtsTitle: 'Shower Thoughts',
    showerThoughtsDate: 'January 2025',
    showerThought1: 'If you can\'t fix the bug, at least fix your look.',
    showerThought2: 'My shoes? Too clean to walk.',
    showerThought3: 'Coffee ≠ creativity, but music = genius.',
    showerThought4: 'Why is it always "localhost:3000" and never "localhost: how are you?"',
    showerThought5: 'Fashion rule #1: If it confuses your mom, you\'re doing it right.',
    // Company Names (English translations)
    'Mora': 'Mora',
    'SLS': 'SLS', 
    'Pixel Suite': 'Pixel Suite',
    'printday7': 'printday7',
    'Alali Plus': 'Alali Plus',
    'crystal4gift': 'crystal4gift',
    'candyshopali': 'candyshopali',
    'Al Taraf': 'Al Taraf',
    
    // Company Descriptions (English)
    'moraDesc': 'Mobile applications and technology solutions company',
    'slsDesc': 'Logistics and shipping solutions company',
    'pixelSuiteDesc': 'Design and website development studio',
    'printday7Desc': 'Professional printing services',
    'alaliPlusDesc': 'E-commerce platform',
    'crystal4giftDesc': 'Gifts and accessories store',
    'candyshopaliDesc': 'Sweets and food store',
    'altarafDesc': 'Integrated services and solutions company',
    'caravanDesc': 'Smart IT solutions for businesses in Iraq',
    'swanDecorationsDesc': 'Luxury decorations and event design services',
    
    // Full project descriptions for "Other Websites" section
    'moraModaaFullDesc': 'Fashion? Check. Vibes? Double check. A sleek Shopify store that feels like your closet before Eid — clean, scrollable, and packed with trendy fits.',
    'printday7FullDesc': 'Helped PrintDay7 with backend and frontend improvements — solved technical issues, improved performance, and customized features to make the platform run smoother for users.',
    'pixelSuiteFullDesc': 'A digital loot cave for gamers — skins, bundles, and that "add to cart" itch. Dark theme, clean layout, and yeah… built on Shopify because we like life easy.',
    'crystal4giftFullDesc': 'Crystal gifts with luxury vibes. Clean Arabic support, RTL layout, and smooth shopping flow. Built for elegance and cultural authenticity.',
    'slsCafeFullDesc': 'All the café feels, none of the queue. An online menu experience that captures the cozy vibes of SLS Café — warm, inviting, and smooth as their coffee.',
    'altarafLinksFullDesc': 'All the links, none of the drama 🔗 Simple, clean, and straight to the point — a stylish link hub for Al-Taraf Travel. Think of it like a digital business card, but with ✈️ vibes.',
    'altarafNetFullDesc': 'A travel company I co-created that makes vacations feel like music videos. Clean branding, custom website, and golden vibes all the way.',
    'filmoraTvFullDesc': 'Like Netflix, but with more attitude 🎬 A streaming platform with personality and style.',
    'swanDecorationFullDesc': 'Elegance meets artistry. Swan Decoration brings luxury event design and premium decorations to life — weddings, parties, and corporate events with a royal touch.',
    
    // Telegram Bots descriptions
    'quranBotDesc': '1. Set your country – Get accurate prayer times based on your location.\n2. Daily prayer times – From Fajr to Isha, always on time.\n3. Azkar & Hadiths – Auto reminders to keep your heart fresh.\n4. Quran access – Read it. Listen to it. Anytime.\n5. Random Ayahs – Spiritual surprises, daily.\n6. Low effort, high reward – You chill, bot does the rest.',
    'serviceBotDesc': 'A general-purpose service bot that handles customer inquiries, provides automated responses, and streamlines business communication.',
    'customerServiceBotDesc': 'Automated customer support system that handles common queries, escalates complex issues, and provides instant responses with conversation tracking.',
    'addToCloseFriendsBotDesc': 'Social media automation tool for managing Instagram close friends lists and engagement tracking.',
    'hrSystemBotDesc': 'Human resources management bot that automates employee onboarding, leave requests, and HR document processing.',
    'downloaderBotDesc': 'Media downloader bot that fetches content from various platforms including YouTube, Instagram, and other social media sites.',
    'newsAggregatorBotDesc': 'Daily news updates and summaries delivered directly to Telegram channels with category-based filtering and automated scheduling.',
    'botsMakerBotDesc': '1. Choose a bot type – Downloader, translator, whatever you need.\n2. Add your token – That\'s it, your bot is live!\n3. Full control – Your name, your bot, your rules.\n4. Broadcast ready – Send messages to your users anytime.\n5. No code needed – Just click and create.\nMake bots like a boss.',
    

    
    // Blog
    onDesign: 'On Design & Creativity',
    designThought: 'Design is not just about making things look good. It\'s about solving problems, telling stories, and creating experiences that matter. Every pixel, every interaction, every moment of delight counts.',
    lateNight: 'Late Night Coding Sessions',
    codingThought: 'There\'s something magical about coding at 2 AM. The world is quiet, the mind is focused, and the code just flows. These are the moments when the best ideas are born.',
    retroNostalgia: 'Retro Computing Nostalgia',
    retroThought: 'Why does Windows 98 still feel so satisfying? Maybe it\'s the skeuomorphic design, the clear visual hierarchy, or just the nostalgia. Modern UIs could learn a lot from the past.',
    quickThoughts: 'Quick Thoughts',
    endOfFile: '--- End of File ---'
  },
  ar: {
    start: 'ابدأ',
    myComputer: 'جهاز الكمبيوتر',
    run: 'تشغيل...',
    settings: 'الإعدادات',
    shutdown: 'إيقاف التشغيل...',
    close: 'إغلاق',
    minimize: 'تصغير',
    maximize: 'تكبير',
    
    // Desktop Icons
    myComputerIcon: 'جهازالكمبيوتر',
    meIcon: 'Me.txt',
    projectsIcon: 'مشاريعي',
    musicIcon: 'مشغل الموسيقى',

    blogIcon: 'ideas.txt',
    downloadsIcon: 'التحميلات',
    contactIcon: 'تواصل معي',
    terminalIcon: 'الطرفية',
    recycleIcon: 'سلة المهملات',
    gamesIcon: 'الألعاب',
    
    // Window Titles
    mycomputerTitle: 'جهاز الكمبيوتر',
    meTitle: 'Me.txt - المفكرة',
    projectsTitle: 'مشاريعي - مستكشف ويندوز',
    musicTitle: 'MoHmmeD_playlist.m3u - مشغل الموسيقى',
    blogTitle: 'ideas.txt - المفكرة',
    downloadsTitle: 'التحميلات',
    contactTitle: 'إرسال إيميل',
    terminalTitle: 'موجه الأوامر',
    recycleTitle: 'سلة المهملات',
    gamesTitle: 'الألعاب - مستكشف ويندوز',
    
    // Common
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    subject: 'الموضوع',
    send: 'إرسال',
    clear: 'مسح',
    download: 'تحميل الآن',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    next: 'التالي',
    previous: 'السابق',
    draw: 'سحب',
    undo: 'تراجع',
    
    // About content
    aboutMe: 'نبذة عني:',
    swagy: 'سواجي',
    engineerModel: 'مهندس، موديل ومبرمج',
    heyyy: 'مرحباً',
    aboutDescription: '*مرحباً!*\nأنا *محمد عبدالكريم* — خريج فخور في *الهندسة الطبية الحيوية* من *جامعة الفراهيدي*\n(أستمتع حقاً بالغوص في الدوائر والإشارات وكل الأشياء التقنية)\nولكن انتظر، هناك المزيد!\nأنا أيضاً مولع بـ*البرمجة* و*الموضة* وأي شيء يصرخ غريب لكن رائع.\n\nأحب العمل على أشياء تجعل الناس يقولون، *"انتظر، ما هذا حتى؟"* — ثم بعد دقيقتين *"حسناً، هذا عبقري فعلاً."*',
    specializedIn: 'متخصص في:',
    webDev: 'تطوير الويب',
    uiuxDesign: 'تصميم واجهة المستخدم وتجربة المستخدم',
    creativeCoding: 'البرمجة الإبداعية',
    retroComputing: 'الحوسبة القديمة',
    currentlyBuilding: 'أعمل حالياً على مشاريع تربك الناس... ثم تثير إعجابهم.',
    
    // Quick stats
    quickStats: 'إحصائيات سريعة:',
    projects: 'المشاريع: +8',
    experience: 'الخبرة: +3 سنوات',
    ideas: 'الأفكار: لا محدود',
    music: 'الموسيقى: يومية',
    
    // Contact
    contactDescription: 'طرق أخرى للتواصل معي:',
    generalInquiry: 'استفسار عام',
    projectCollaboration: 'تعاون في مشروع',
    jobOpportunity: 'فرصة عمل',
    technicalSupport: 'دعم تقني',
    other: 'أخرى',
    
    // Games
    gamesAvailable: 'ألعاب متاحة',
    selectedGame: 'المحدد',
    selectGameToPlay: 'اختر لعبة للبدء',
    ready: 'جاهز',
    
    // Game titles and descriptions  
    minesweeperTitle: 'كاشف الألغام',
    minesweeperDescription: 'ابحث عن جميع الألغام المخفية بدون النقر عليها. الأرقام تشير إلى الألغام المجاورة.',
    solitaireTitle: 'سوليتير',
    solitaireDescription: 'لعبة ورق كلاسيكية. رتب جميع الأوراق حسب النوع من A إلى K.',
    snakeTitle: 'الثعبان',
    snakeDescription: 'تحكم بالثعبان لأكل الطعام والنمو. لا تصطدم بالجدران أو بنفسك!',
    tetrisTitle: 'تتريس',
    tetrisDescription: 'رتب القطع المتساقطة لإكمال الصفوف واكسب النقاط.',
    pongTitle: 'بونغ',
    pongDescription: 'لعبة تنس كلاسيكية. لا تدع الكرة تفلت من جهتك!',
    comingSoon: 'قريباً...',
    
    // Minesweeper specific
    minesweeperWon: 'تهانينا! لقد فزت!',
    minesweeperLost: 'انتهت اللعبة! حاول مرة أخرى.',
    minesweeperInstructions: 'التعليمات:',
    minesweeperLeftClick: 'نقرة يسار: كشف الخلية',
    minesweeperRightClick: 'نقرة يمين: وضع/إزالة العلم',
    minesweeperLongPress: 'الجوال: اضغط مطولاً للعلم',
    difficulty: 'الصعوبة',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    expert: 'خبير',
    easy: 'سهل',
    normal: 'عادي',
    hard: 'صعب',
    options: 'خيارات',
    mode: 'الوضع',
    mobileToggleMode: 'تبديل الوضع: كشف/علم',
    currentMode: 'الوضع الحالي',
    
    gameInstructions: 'التعليمات:',
    
    // Solitaire specific
    newGame: 'لعبة جديدة',
    congratulations: 'تهانينا! لقد فزت!',
    solitaireInstructions1: 'انقر على المخزون لسحب الأوراق',
    solitaireInstructions2: 'اسحب الأوراق لبناء التسلسلات',
    solitaireInstructions3: 'ابني الأسس من الآس إلى الملك',
    
    // Snake specific
    gameOver: 'انتهت اللعبة!',
    finalScore: 'النتيجة النهائية',
    paused: 'متوقف',
    resume: 'استكمال',
    snakeInstructions1: 'استخدم أسهم الاتجاه أو WASD للحركة',
    snakeInstructions2: 'كل الطعام الأحمر لتنمو',
    snakeInstructions3: 'تجنب الجدران وذيلك',
    snakeInstructions4: 'اضغط مسافة للإيقاف/الاستكمال',
    
    // Tetris specific
    tetrisScore: 'النقاط',
    tetrisLevel: 'المستوى',
    tetrisLines: 'الخطوط',
    tetrisNext: 'التالي',
    tetrisHold: 'احتفظ',
    tetrisControls: 'التحكم',
    tetrisDrop: 'إسقاط',
    tetrisGameOver: 'انتهت اللعبة!',
    tetrisPaused: 'متوقف',
    
    // Pong specific
    pongScore: 'النقاط',
    pongPlayer: 'اللاعب',
    pongComputer: 'الكمبيوتر',
    pongGameOver: 'انتهت اللعبة!',
    pongWinner: 'الفائز',
    pongFirstTo: 'أول من يصل 10 نقاط يفوز',
    pongInstructions1: 'استخدم أسهم ↑↓ أو W/S للتحكم في المضرب',
    pongInstructions2: 'لا تدع الكرة تفلت من جهتك!',
    pongInstructions3: 'أول من يصل 10 نقاط يفوز',
    pongInstructions4: 'اضغط P للإيقاف/الاستكمال',
    
    // Downloads
    availableDownloads: 'التحميلات المتاحة',
    downloadInstructions: 'تعليمات التحميل:',
    resumeDesc: 'سيرتي الذاتية الرسمية — أو كما أبدو "على الورق"',
    brandGuidelinesDesc: 'الشعارات والألوان وقواعد العلامة التجارية — دليل أسلوب سواجي',
    resumeSize: 'الحجم: 2.3 ميجابايت | محدث: نوفمبر 2024',
    brandSize: 'الحجم: 4.2 ميجابايت | محدث: سبتمبر 2024',
    rightClickSave: 'انقر بالزر الأيمن واختر "حفظ باسم" للتحميل السلس',
    filesClean: 'جميع الملفات نظيفة وخالية من الفيروسات',
    differentFormat: 'تحتاج صيغة مختلفة؟ فقط راسلني',
    updatedRegularly: 'محدث بانتظام (لأنني أهتم فعلاً)',
    resumeTitle: 'Resume_MoHmmeD_2024.pdf',
    brandTitle: 'Brand_Guidelines.pdf',
    downloadNow: 'تحميل الآن',
    
    // Contact Form
    sendEmailTo: 'إرسال إيميل إلى سواجي',
    yourFullName: 'اسمك الكامل',
    typeMessage: 'اكتب رسالتك هنا...',
    sending: 'جاري الإرسال...',
    shoppingWebsite: 'موقع التسوق',
    from: 'من:',
    attachFile: 'إرفاق ملف (0)',
    otherWaysToReach: 'طرق أخرى للتواصل معي',
    
    // My Computer
    back: '← رجوع',
    address: 'العنوان:',
    emptyFolder: 'هذا المجلد فارغ',
    systemType: 'نوع النظام: هجين بين طفل التسعينات ومطور حديث',

    meFile: 'Me.txt',
    localDisk: 'القرص المحلي (C:)',
    controlPanel: 'لوحة التحكم',
    contactInfo: 'معلومات التواصل',
    downloads: 'التحميلات',
    ideasFile: 'Ideas.txt',
    recycleBin: 'سلة المهملات',
    
    // Terminal
    terminalWelcome: 'Microsoft(R) MS-DOS(R) Version 6.22',
    terminalCopyright: '(C)Copyright Microsoft Corp 1981-1994.',
    helpCommand: 'الأوامر المتاحة: about, swag, clear, music, ascii, exit, hack, matrix, love, play, open music, whoami',
    aboutResponse: 'MoHmmeD Terminal\nللعقول الأنيقة فقط.',
    swagResponse: '🧢 تحميل وضع الأناقة القصوى...',
    musicResponse: '🎶 تم تحميل MoHmmeD_playlist.m3u بنجاح.',
    asciiResponse: '¯\\_(ツ)_/¯',
    hackResponse: '💀 تم رفض الوصول. مكتب التحقيقات الفيدرالي يراقب.',
    loveResponse: 'لقد كتبتها. احترام.',
    playResponse: '🎶 يتم تشغيل: MoHmmeD_playlist.m3u',
    openMusicResponse: '🎵 فتح مشغل الموسيقى...',
    whoamiResponse: 'الاسم: MoHmmeD\nالدور: مصمم / مطور / أمين الأناقة\nالحالة: دائماً أنيق',
    exitResponse: 'شكراً لزيارتك! ستُغلق النافذة خلال 3 ثوانٍ...',
    commandNotFound: 'لا يُعرف كأمر داخلي أو خارجي.',
    
    // Recycle Bin
    recycleStatus: 'الحالة:',
    recycleEmpty: 'فارغة (0 عناصر)',
    recycleQuote: '"لا ندم هنا — فقط إصدارات سابقة منك."',
    emptyBin: 'إفراغ سلة المهملات',
    properties: 'خصائص',
    recycleBinAlreadyEmpty: 'سلة المهملات فارغة بالفعل!',
    recycleBinProperties: 'خصائص سلة المهملات:\nالموقع: سطح المكتب\nالحجم: 0 بايت\nيحتوي على: 0 ملفات',
    recycleTip1: '💡 نصيحة: أحياناً التخلي هو أفضل طريق للمضي قدماً.',
    recycleTip2: '🔄 كل حذف هو فرصة لشيء جديد.',
    
    // Music
    musicPlayer: 'مشغل الموسيقى',
    nowPlaying: 'يُشغل الآن:',
    playlist: 'قائمة التشغيل:',
    volume: 'مستوى الصوت',
    shuffle: 'عشوائي',
    repeat: 'تكرار',
    
    // Projects Categories
    projectCategories: 'فئات المشاريع',
    workedWith: 'تعاونت معهم',
    liveWebsites: 'مواقع مباشرة',
    telegramBots: 'بوتات تيليجرام',
    selectCategory: 'اختر فئة لعرض المشاريع',
    
    // Project Buttons
    instagram: 'انستجرام',
    visitWebsite: 'زيارة الموقع',
    readMore: 'اقرأ المزيد',
    openBot: 'فتح البوت',
    details: 'التفاصيل',
    
    // Blog Window (Arabic)
    blogTitle1: 'لماذا ما زلت أصمم كأنها 1998',
    blogDate1: 'ديسمبر 2024',
    blogContent1: 'التصميم الحديث رائع، لكن لا شيء يضاهي زر البكسل الضخم بظل يمكن أن تتعثر فيه. اسمه الحنين... أو الذوق.',
    blogTitle2: 'الساعة 2 صباحاً: أنا ضد فاصلة منقوطة واحدة غبية',
    blogDate2: 'نوفمبر 2024',
    blogContent2: 'الفائز: الفاصلة المنقوطة.\nالدرس: احترم دائماً الفاصلة المنقوطة.',
    blogTitle3: 'من قال أن المطورين لا يمكن أن يكونوا أنيقين؟',
    blogDate3: 'أكتوبر 2024',
    blogContent3: 'أقوم بإصلاح الأخطاء بسماعات AirPods Max وبنطلون واسع. إذا كان المظهر نظيفاً، فالكود أنظف.',
    blogTitle4: 'واجهات المستخدم الرجعية > صداع العصر الحديث',
    blogDate4: 'سبتمبر 2024',
    blogContent4: 'علمني ويندوز 98 شيئاً واحداً:\nانقر، اسحب، اشعر بالسعادة.\nتطبيقات اليوم؟\nانقر، انتظر، تعطل.',
    showerThoughtsTitle: 'أفكار الحمام',
    showerThoughtsDate: 'يناير 2025',
    showerThought1: 'إذا لم تستطع إصلاح الخطأ، على الأقل اصلح مظهرك.',
    showerThought2: 'حذائي؟ نظيف جداً للمشي.',
    showerThought3: 'القهوة ≠ الإبداع، لكن الموسيقى = العبقرية.',
    showerThought4: 'لماذا دائماً "localhost:3000" وليس أبداً "localhost: كيف حالك؟"',
    showerThought5: 'قاعدة الموضة #1: إذا أربكت والدتك، فأنت تفعل الشيء الصحيح.',
    
    // Company Names (Arabic translations)
    'Mora': 'مورا',
    'SLS': 'سلس',
    'Pixel Suite': 'بكسل سوت',
    'printday7': 'برينت داي ٧',
    'Alali Plus': 'العالي بلس',
    'crystal4gift': 'كريستال فور جيفت',
    'candyshopali': 'كاندي شوب علي',
    'Al Taraf': 'الأطراف',
    
    // Company Descriptions (Arabic)
    'moraDesc': 'شركة موبايل تطبيقات وحلول تقنية',
    'slsDesc': 'شركة حلول لوجستية وشحن',
    'pixelSuiteDesc': 'استوديو تصميم وتطوير مواقع',
    'printday7Desc': 'خدمات طباعة احترافية',
    'alaliPlusDesc': 'منصة تجارة إلكترونية',
    'crystal4giftDesc': 'متجر هدايا وإكسسوارات',
    'candyshopaliDesc': 'متجر حلويات ومأكولات',
    'altarafDesc': 'شركة خدمات وحلول متكاملة',
    'caravanDesc': 'حلول تقنية ذكية للشركات في العراق',
    'swanDecorationsDesc': 'خدمات ديكورات فاخرة وتصميم فعاليات',
    
    // وصف المشاريع الكاملة لقسم "المواقع الأخرى"
    'moraModaaFullDesc': 'موضة؟ تمام. أجواء؟ تمام مضاعف. متجر شوبيفاي أنيق يشبه خزانتك قبل العيد — نظيف، قابل للتصفح، ومليء بالإطلالات العصرية.',
    'printday7FullDesc': 'ساعدت PrintDay7 بتحسينات الباك إند والفرونت إند — حلّيت المشاكل التقنية، حسّنت الأداء، وخصصت الميزات لجعل المنصة تعمل بسلاسة أكثر للمستخدمين.',
    'pixelSuiteFullDesc': 'كهف رقمي للغنائم خاص بالجيمرز — اسكنز، باقات، وحكة "أضف للسلة". ثيم داكن، تصميم نظيف، وأجل... مبني على شوبيفاي لأننا نحب الحياة سهلة.',
    'crystal4giftFullDesc': 'هدايا كريستالية بأجواء فاخرة. دعم عربي نظيف، تخطيط RTL، وتدفق تسوق سلس. مبني للأناقة والأصالة الثقافية.',
    'slsCafeFullDesc': 'كل أحاسيس الكافيه، بدون طابور. تجربة قائمة طعام أونلاين تلتقط الأجواء المريحة لكافيه SLS — دافئة، مرحبة، وناعمة مثل قهوتهم.',
    'altarafLinksFullDesc': 'كل الروابط، بدون دراما 🔗 بسيط، نظيف، ومباشر للنقطة — مركز روابط أنيق لسفريات الأطراف. فكر فيه كبطاقة عمل رقمية، لكن بأجواء ✈️.',
    'altarafNetFullDesc': 'شركة سفريات شاركت في إنشائها وتجعل العطلات تبدو مثل الفيديو كليبات. علامة تجارية نظيفة، موقع مخصص، وأجواء ذهبية طوال الطريق.',
    'filmoraTvFullDesc': 'مثل نيتفلكس، لكن بطابع أكثر جرأة 🎬 منصة بث بشخصية وأسلوب.',
    'swanDecorationFullDesc': 'الأناقة تلتقي بالفن. سوان ديكوريشن تجلب تصميم الفعاليات الفاخرة والديكورات المميزة للحياة — حفلات زفاف، مناسبات، وفعاليات الشركات بلمسة ملكية.',
    
    // وصوفات بوتات التيليجرام
    'quranBotDesc': '1. حدد بلدك - احصل على أوقات صلاة دقيقة بناءً على موقعك.\n2. أوقات الصلاة اليومية - من الفجر للعشاء، دائماً في الوقت.\n3. أذكار وأحاديث - تذكيرات تلقائية لتحافظ على قلبك منتعش.\n4. الوصول للقرآن - اقرأه. استمع إليه. في أي وقت.\n5. آيات عشوائية - مفاجآت روحية، يومياً.\n6. جهد قليل، ثواب كثير - أنت ترتاح، البوت يقوم بالباقي.',
    'serviceBotDesc': 'بوت خدمة عام يتعامل مع استفسارات العملاء، ويقدم ردود تلقائية، ويبسط التواصل التجاري.',
    'customerServiceBotDesc': 'نظام دعم عملاء تلقائي يتعامل مع الاستفسارات الشائعة، يصعد القضايا المعقدة، ويقدم ردود فورية مع تتبع المحادثات.',
    'addToCloseFriendsBotDesc': 'أداة أتمتة وسائل التواصل الاجتماعي لإدارة قوائم الأصدقاء المقربين في انستجرام وتتبع التفاعل.',
    'hrSystemBotDesc': 'بوت إدارة موارد بشرية يؤتمت تأهيل الموظفين، طلبات الإجازة، ومعالجة وثائق الموارد البشرية.',
    'downloaderBotDesc': 'بوت تحميل وسائط يجلب المحتوى من منصات مختلفة بما في ذلك يوتيوب، انستجرام، ومواقع التواصل الاجتماعي الأخرى.',
    'newsAggregatorBotDesc': 'تحديثات إخبارية يومية وملخصات تُرسل مباشرة لقنوات التيليجرام مع تصفية بناءً على الفئات وجدولة تلقائية.',
    'botsMakerBotDesc': '1. اختر نوع البوت - تحميل، ترجمة، أي شي تحتاجه.\n2. أضف التوكن حقك - خلاص، البوت شغال!\n3. تحكم كامل - اسمك، البوت حقك، قوانينك.\n4. جاهز للبث - أرسل رسائل لمستخدمينك في أي وقت.\n5. ما يحتاج كود - بس كليك وخلق.\nاصنع بوتات مثل البوس.',
    
    // Projects
    projectsDescription: 'مجموعة من مشاريعي الرقمية',
    viewProject: 'عرض المشروع',
    technologies: 'التقنيات المستخدمة',
    completedProjects: 'المشاريع المكتملة',
    category: 'الفئة',
    status: 'الحالة',
    
    // Blog
    onDesign: 'حول التصميم والإبداع',
    designThought: 'التصميم ليس مجرد جعل الأشياء تبدو جميلة. إنه حل المشكلات وسرد القصص وخلق تجارب مهمة. كل بكسل وكل تفاعل وكل لحظة بهجة مهمة.',
    lateNight: 'جلسات البرمجة في وقت متأخر من الليل',
    codingThought: 'هناك شيء سحري في البرمجة في الساعة الثانية صباحاً. العالم هادئ والعقل مركز والكود يتدفق فقط. هذه هي اللحظات التي تولد فيها أفضل الأفكار.',
    retroNostalgia: 'الحنين للحوسبة القديمة',
    retroThought: 'لماذا لا يزال ويندوز 98 يبدو مُرضياً؟ ربما يكون التصميم المحاكي أو التسلسل الهرمي البصري الواضح أو مجرد الحنين. يمكن لواجهات المستخدم الحديثة أن تتعلم الكثير من الماضي.',
    quickThoughts: 'أفكار سريعة',
    endOfFile: '--- نهاية الملف ---'
  }
};
