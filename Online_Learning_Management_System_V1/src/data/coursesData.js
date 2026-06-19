export const instructors = [
  {
    id: 'jsmith',
    name: 'John Smith',
    role: 'Senior Full-Stack Architect',
    avatar: 'JS',
    bio: 'John has over 12 years of experience writing production applications for Fortune 500 companies. He specializes in React, Node.js, Distributed Systems, and cloud architecture. He is passionate about making technical concepts easy to understand.',
    rating: 4.8,
    students: '105,000+',
    reviewsCount: 5630,
    expertise: 'Web Development, Software Engineering, Architecture'
  },
  {
    id: 'sconnor',
    name: 'Sarah Connor',
    role: 'Principal UI/UX Designer',
    avatar: 'SC',
    bio: 'Sarah is an award-winning digital designer with a decade of experience creating mobile and web products. She has led design teams at tech unicorns and focuses on human-centered design, prototyping, and accessibility compliance.',
    rating: 4.9,
    students: '28,000+',
    reviewsCount: 890,
    expertise: 'Figma, Design Systems, Typography, Wireframing'
  },
  {
    id: 'jdoe',
    name: 'Dr. Jane Doe',
    role: 'Lead AI Research Scientist',
    avatar: 'JD',
    bio: 'Jane holds a PhD in Computer Science with a focus on Deep Learning. Formerly a researcher at Google Brain and OpenAI, she has authored 15+ peer-reviewed papers on neural network optimization and computer vision models.',
    rating: 4.9,
    students: '42,000+',
    reviewsCount: 1240,
    expertise: 'Python, PyTorch, Deep Learning, Natural Language Processing'
  },
  {
    id: 'rgreen',
    name: 'Ryan Green',
    role: 'Director of Growth Marketing',
    avatar: 'RG',
    bio: 'Ryan is a digital marketing consultant who has helped scale startups from early-stage to series C. He specializes in SEO optimization, growth loops, performance marketing metrics, and conversion rate analysis.',
    rating: 4.7,
    students: '15,000+',
    reviewsCount: 420,
    expertise: 'SEO, Google Analytics, Performance Branding, Growth Funnels'
  }
];

export const courses = [
  {
    id: 'full-stack-web-dev',
    instructorId: 'jsmith',
    title: 'Full-Stack Web Development Masterclass',
    category: 'Development',
    difficulty: 'Beginner',
    price: 'Free',
    rating: 4.8,
    reviewsCount: 3420,
    duration: '42 hours',
    lecturesCount: 12,
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and database design from absolute scratch to cloud deployment.',
    longDescription: 'Dive deep into modern web engineering. This comprehensive, project-based course takes you from writing your first line of HTML to designing databases and deploying containerized full-stack web applications on cloud infrastructure. You will work on three hands-on projects, master asynchronous JavaScript, learn standard authentication protocols, and build highly performant single page applications.',
    syllabus: [
      {
        chapterTitle: 'Module 1: The Modern Web Core',
        lessons: [
          { 
            id: 'fs-1-1', 
            title: '1.1 Course Overview & Development Environment Setup', 
            duration: '15 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Welcome to the Full-Stack Web Development Course. In this lesson, we will set up our local development workspaces. We will install Node.js (which provides the JavaScript runtime), configure Visual Studio Code with useful productivity extensions, and verify Git installation. A clean environment ensures smooth React compile cycles.',
            quizzes: [
              {
                question: 'What runtime environment does Node.js provide?',
                options: [
                  'Python runtime interpreter',
                  'JavaScript runtime outside the web browser',
                  'Java Virtual Machine interface',
                  'Ruby server container framework'
                ],
                answerIndex: 1,
                explanation: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser, typically on servers.'
              },
              {
                question: 'Which tool is used to manage multiple installed Node.js versions?',
                options: [
                  'npm',
                  'Webpack',
                  'NVM (Node Version Manager)',
                  'Express'
                ],
                answerIndex: 2,
                explanation: 'Node Version Manager (NVM) allows you to install, switch, and manage multiple active versions of Node.js on a single machine.'
              },
              {
                question: 'What is the primary purpose of the package.json file?',
                options: [
                  'To store custom CSS code settings',
                  'To track project metadata and dependencies',
                  'To host static html files',
                  'To configure database tables'
                ],
                answerIndex: 1,
                explanation: 'The package.json file is the heart of any Node.js project. It records important metadata about the project and lists the dependency packages required.'
              },
              {
                question: 'Which Git command initializes a new local repository?',
                options: [
                  'git commit',
                  'git push',
                  'git init',
                  'git clone'
                ],
                answerIndex: 2,
                explanation: 'The git init command initializes a new, empty Git repository or reinitializes an existing one in the current working directory.'
              },
              {
                question: 'In VS Code, which file stores workspace-specific custom settings?',
                options: [
                  '.vscode/settings.json',
                  'package.json',
                  'index.html',
                  'src/main.jsx'
                ],
                answerIndex: 0,
                explanation: 'VS Code stores workspace-specific settings inside the settings.json file within the .vscode directory at the root of your workspace.'
              },
              {
                question: 'What does CLI stand for in development scopes?',
                options: [
                  'Component Library Interface',
                  'Computer Logic Integration',
                  'Command Line Interface',
                  'Common Language Infrastructure'
                ],
                answerIndex: 2,
                explanation: 'CLI stands for Command Line Interface, which allows developers to interact with programs by typing text commands into a terminal.'
              },
              {
                question: 'What is npm?',
                options: [
                  'Node Package Manager',
                  'Network Protocol Manager',
                  'New Project Module',
                  'Neutral Parse Model'
                ],
                answerIndex: 0,
                explanation: 'npm (Node Package Manager) is the default package manager for the JavaScript runtime environment Node.js, used to share and install open source libraries.'
              },
              {
                question: 'What does the "git status" command do?',
                options: [
                  'Pushes code to GitHub remote repositories',
                  'Deletes untracked temporary files',
                  'Displays the state of the working directory and the staging area',
                  'Creates a new branch on git log'
                ],
                answerIndex: 2,
                explanation: 'git status displays the state of the working directory and the staging area, showing which changes are staged, which are unstaged, and which files are untracked.'
              },
              {
                question: 'Which command installs package dependencies listed in package.json?',
                options: [
                  'npm install',
                  'npm run dev',
                  'git clone',
                  'node compile'
                ],
                answerIndex: 0,
                explanation: 'npm install download and install all the dependency packages listed in your project\'s package.json file into the node_modules folder.'
              },
              {
                question: 'What is the purpose of a .gitignore file?',
                options: [
                  'To list the project authors and licensing guidelines',
                  'To specify intentionally untracked files that Git should ignore',
                  'To style terminal printout statements',
                  'To define database authentication passwords'
                ],
                answerIndex: 1,
                explanation: 'A .gitignore file specifies intentionally untracked files (like node_modules, temp files, environmental variables) that Git should ignore and not track in source control.'
              }
            ]
          },
          { 
            id: 'fs-1-2', 
            title: '1.2 Deep Dive into HTML5 Semantics & Accessibility', 
            duration: '25 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'HTML5 introduced semantic tags like header, nav, section, article, and footer to define layout components. Using these elements instead of generic div elements improves web accessibility for screen readers and aids search engine crawlers in index parsing.',
            quizzes: [
              {
                question: 'Which HTML5 tag defines navigation links?',
                options: [
                  '<section>',
                  '<article>',
                  '<nav>',
                  '<header>'
                ],
                answerIndex: 2,
                explanation: 'The <nav> HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents.'
              },
              {
                question: 'What is the primary purpose of semantic HTML tags?',
                options: [
                  'To style page layouts with animations',
                  'To clearly describe the meaning of elements to both the browser and developer, aiding accessibility and SEO',
                  'To secure API routing calls',
                  'To compile React elements into database registries'
                ],
                answerIndex: 1,
                explanation: 'Semantic elements clearly describe their meaning in a human- and machine-readable way, which helps search engine optimization (SEO) and web accessibility engines.'
              },
              {
                question: 'Under WCAG AA standards, what is the minimum contrast ratio required for normal body text?',
                options: [
                  '1:1',
                  '3:1',
                  '4.5:1',
                  '7:1'
                ],
                answerIndex: 2,
                explanation: 'The Web Content Accessibility Guidelines (WCAG) AA standard requires a contrast ratio of at least 4.5:1 for normal body text against its background.'
              },
              {
                question: 'Which attribute provides descriptive alternative text for screen readers on images?',
                options: [
                  'title',
                  'src',
                  'alt',
                  'href'
                ],
                answerIndex: 2,
                explanation: 'The alt attribute is crucial for accessibility. It provides descriptive alternative text for screen readers to explain image contents to visually impaired users.'
              },
              {
                question: 'Which tag represents primary, independent, self-contained content?',
                options: [
                  '<div class="content">',
                  '<article>',
                  '<aside>',
                  '<section>'
                ],
                answerIndex: 1,
                explanation: 'The <article> element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable.'
              },
              {
                question: 'What does ARIA stand for in web accessibility contexts?',
                options: [
                  'Accessible Rich Internet Applications',
                  'Automated Route Interface Assembly',
                  'Array Render Index Allocation',
                  'Architectural Responsive Input Access'
                ],
                answerIndex: 0,
                explanation: 'ARIA stands for Accessible Rich Internet Applications. It is a set of roles and attributes that define ways to make web content and applications more accessible.'
              },
              {
                question: 'What is the purpose of the aria-label attribute?',
                options: [
                  'To define custom CSS color variables',
                  'To provide a text label description for elements that lack visible text labels on the screen',
                  'To link components to backend database tables',
                  'To trigger TTS speech narrations'
                ],
                answerIndex: 1,
                explanation: 'The aria-label attribute is used to define a string that labels the interactive element it is applied to, especially when there is no visible text label.'
              },
              {
                question: 'Which tag represents self-contained content, often with a caption?',
                options: [
                  '<figure>',
                  '<picture>',
                  '<aside>',
                  '<footer>'
                ],
                answerIndex: 0,
                explanation: 'The <figure> element represents self-contained content, optionally with a caption, and is typically referenced as a single unit from the main flow of the document.'
              },
              {
                question: 'How many h1 elements should a webpage ideally contain for SEO best practices?',
                options: [
                  'Zero',
                  'Exactly one',
                  'Three or more',
                  'As many as there are sections'
                ],
                answerIndex: 1,
                explanation: 'For SEO and document layout structure hierarchy, a page should contain exactly one <h1> element representing the primary title of the page content.'
              },
              {
                question: 'Which HTML5 element represents introductory content, typically a group of introductory or navigational aids?',
                options: [
                  '<section>',
                  '<header>',
                  '<aside>',
                  '<footer>'
                ],
                answerIndex: 1,
                explanation: 'The <header> element represents a container for introductory content or a set of navigational links, often containing headings, logos, search forms, and authors.'
              }
            ]
          },
          { 
            id: 'fs-1-3', 
            title: '1.3 Styling with Advanced CSS Grid & Flexbox Architectures', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'CSS layout mechanisms are essential for modern interfaces. Flexbox is optimized for 1-dimensional layouts (menus, listings, align items in a row), whereas CSS Grid manages 2-dimensional grid alignments. Combining them lets us build robust, fluid templates.'
          },
          { 
            id: 'fs-1-4', 
            title: '1.4 Modern Responsive Design and Fluid Typographies', 
            duration: '20 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Responsive web design enables sites to adapt to screens of any width. We will write CSS media queries to apply adjustments, use fluid CSS clamp() models for fonts, and design flexible layouts that resize smoothly from compact phones to massive 4K monitors.'
          }
        ]
      },
      {
        chapterTitle: 'Module 2: Advanced JavaScript & DOM Operations',
        lessons: [
          { 
            id: 'fs-2-1', 
            title: '2.1 Scope, Closures, and ES6+ Language Standard Specs', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Understand block scope, lexical environments, and JavaScript closures. A closure occurs when an inner function remembers and accesses variables from its outer scope, even after the outer function executes. This concept is fundamental for managing state.'
          },
          { 
            id: 'fs-2-2', 
            title: '2.2 Asynchronous JavaScript: Promises, Event Loop & Async/Await', 
            duration: '45 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'JavaScript operates on a single-threaded event loop. We handle async tasks (like API network calls) using Promises and the modern async/await syntax. This prevents thread blocking, keeping web interfaces responsive during background data loading.'
          },
          { 
            id: 'fs-2-3', 
            title: '2.3 Dynamic Browser Rendering & Event Manipulation', 
            duration: '28 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Interact with the Document Object Model (DOM) to update rendering dynamically. Learn event delegation, bubble dispatching, and prevent default form behaviors to construct interactive page widgets without reloading the document.'
          }
        ]
      },
      {
        chapterTitle: 'Module 3: React Fundamentals & State Management',
        lessons: [
          { 
            id: 'fs-3-1', 
            title: '3.1 Introduction to JSX, Props, and Functional Components', 
            duration: '32 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'React represents components using JSX, a syntax extending JavaScript that yields structural templates. Learn functional component rules, how properties (props) flow down from parents to children, and component composition best practices.'
          },
          { 
            id: 'fs-3-2', 
            title: '3.2 State Management with useState, useEffect & useRef', 
            duration: '40 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'State allows components to store dynamic values. We use the useState hook for local state variables, useEffect for managing side-effects (like syncing local storage or fetching APIs), and useRef to reference mutable values or DOM elements directly.'
          },
          { 
            id: 'fs-3-3', 
            title: '3.3 Global Context and Routing Structures with React Router', 
            duration: '38 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Avoid prop drilling by passing state globally using the React Context API. Additionally, we integrate React Router (BrowserRouter, Routes, Route, Link) to establish multi-page paths and navigation states within a Single Page Application.'
          }
        ]
      },
      {
        chapterTitle: 'Module 4: Backend Integration & Deployment',
        lessons: [
          { 
            id: 'fs-4-1', 
            title: '4.1 Creating RESTful Services with Express and Node.js', 
            duration: '42 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Build a server utilizing Node.js and Express. Set up endpoint routing (GET, POST, PUT, DELETE), parse JSON body inputs, handle cross-origin requests (CORS), and design standardized REST APIs to exchange data with React applications.'
          },
          { 
            id: 'fs-4-2', 
            title: '4.2 Connecting Databases & Deploying to Production Servers', 
            duration: '50 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Connect the backend to a database to store data persistently. Perform database operations, secure user passwords using hashing, write configuration environmental files, and configure deployment settings on hosting platforms.'
          }
        ]
      }
    ],
    quizzes: [
      {
        question: 'Which of the following is true about JavaScript Closure?',
        options: [
          'It is a method of hiding data that makes it inaccessible under any circumstances.',
          'It allows an inner function to access variables from its outer enclosing scope even after the outer function has finished executing.',
          'It forces variables to be garbage collected immediately after execution.',
          'It is only supported in browser environments, not in Node.js.'
        ],
        answerIndex: 1,
        explanation: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time, allowing access to outer scope variables.'
      },
      {
        question: 'In React, what hook is used to perform side effects in functional components?',
        options: [
          'useState',
          'useContext',
          'useMemo',
          'useEffect'
        ],
        answerIndex: 3,
        explanation: 'The useEffect hook lets you perform side effects (data fetching, subscriptions, manual DOM mutations) in React functional components, serving a similar purpose as class lifecycle methods.'
      },
      {
        question: 'What is the purpose of the key prop when rendering arrays in React?',
        options: [
          'To encrypt the array elements to prevent scraping.',
          'To link elements to a CSS styles manifest.',
          'To help React identify which items have changed, been added, or been removed, optimizing DOM re-rendering.',
          'To bind components to the global application state store.'
        ],
        answerIndex: 2,
        explanation: 'Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity, ensuring performant reconciliations.'
      },
      {
        question: 'Which block of code allows us to catch errors during asynchronous async/await calls?',
        options: [
          'if / else blocks',
          'try / catch blocks',
          'then / catch chains',
          'throw new Error()'
        ],
        answerIndex: 1,
        explanation: 'When writing asynchronous operations using async/await, we wrap the await calls inside standard JavaScript try/catch blocks to gracefully handle potential rejections or server failures.'
      },
      {
        question: 'What is the Virtual DOM in React?',
        options: [
          'A copy of the actual DOM stored in cloud databases.',
          'A lightweight, in-memory representation of the real DOM used to calculate and apply minimum UI updates efficiently.',
          'An offline browser mode for rendering HTML templates.',
          'A CSS styling framework built on React components.'
        ],
        answerIndex: 1,
        explanation: 'The Virtual DOM is a programming concept where an ideal, or "virtual", representation of a user interface is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation.'
      },
      {
        question: 'Which tag in HTML5 is considered semantic?',
        options: [
          '<div>',
          '<span>',
          '<article>',
          '<b>'
        ],
        answerIndex: 2,
        explanation: 'Semantic elements clearly describe their meaning to both the browser and the developer. Tag <article> is semantic, whereas <div> and <span> are non-semantic containers.'
      },
      {
        question: 'What does CSS Grid allow us to do that Flexbox is not primarily designed for?',
        options: [
          'Change font typographies dynamically.',
          'Position elements in a single horizontal row.',
          'Construct complex two-dimensional layouts containing both rows and columns.',
          'Handle click events using layout animations.'
        ],
        answerIndex: 2,
        explanation: 'CSS Grid is a two-dimensional layout system that handles both columns and rows. Flexbox is a one-dimensional layout system, ideal for laying out items in a single axis.'
      },
      {
        question: 'How do you prevent a form from reloading the webpage on submit in React?',
        options: [
          'Call e.preventDefault() in the event handler.',
          'Return false inside the form render function.',
          'Add a disabled attribute to the submit button.',
          'Wrap the inputs in a div instead of a form.'
        ],
        answerIndex: 0,
        explanation: 'Calling preventDefault() on the event object prevents the browser\'s default form submission action, which would otherwise reload the page.'
      },
      {
        question: 'In Express, what parameters do standard middleware functions take?',
        options: [
          '(req, res)',
          '(req, res, next)',
          '(err, req, res)',
          '(next, callback)'
        ],
        answerIndex: 1,
        explanation: 'Middleware functions have access to the request object (req), the response object (res), and the next middleware function in the application\'s request-response cycle, traditionally named next.'
      },
      {
        question: 'What is the default state value of a boolean hook: const [val, setVal] = useState()?',
        options: [
          'false',
          'true',
          'undefined',
          'null'
        ],
        answerIndex: 2,
        explanation: 'If no initial state argument is passed to useState(), the hook defaults to returning undefined as the initial state value.'
      }
    ]
  },
  {
    id: 'ui-ux-design',
    instructorId: 'sconnor',
    title: 'UI/UX Design Essentials & Prototyping',
    category: 'Design',
    difficulty: 'Beginner',
    price: 'Free',
    rating: 4.9,
    reviewsCount: 1890,
    duration: '24 hours',
    lecturesCount: 8,
    description: 'Master Figma, wireframing, color theory, visual hierarchy, and interactive prototypes to build professional interfaces.',
    longDescription: 'Design is not just what it looks like, design is how it works. This course offers hands-on training to master digital UI/UX design. You will start with the fundamentals of color theory, grid alignments, visual hierarchies, and modern typographies, before transitioning into advanced Figma features like auto-layout, components, variants, and interactive motion prototyping. By the end, you will have completed a professional design case-study portfolio.',
    syllabus: [
      {
        chapterTitle: 'Module 1: User Research & Wireframes',
        lessons: [
          { 
            id: 'ds-1-1', 
            title: '1.1 Introduction to UX Principles and User Research Cycles', 
            duration: '20 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'UX design focuses on user workflows. In this module, we discuss quantitative research methods, conducting surveys, analyzing interfaces, and mapping how design aligns with user needs.'
          },
          { 
            id: 'ds-1-2', 
            title: '1.2 Creating User Personas, User Journeys, and Sitemap Audits', 
            duration: '25 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Personas are fictional representations of target users. We create them to guide product features. We also map out user journeys to trace every interaction step and conduct sitemap audits to plan user navigation paths.'
          },
          { 
            id: 'ds-1-3', 
            title: '1.3 Low-Fidelity Paper Sketching to Interactive Digital Wireframes', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Start with pencil and paper. Sketching multiple layouts quickly generates design ideas. Once validated, we replicate these structures digitally as low-fidelity wireframes in Figma to plan spacing and structure.'
          }
        ]
      },
      {
        chapterTitle: 'Module 2: Mastering Visual UI Design in Figma',
        lessons: [
          { 
            id: 'ds-2-1', 
            title: '2.1 Figma Workspace Setup, Vector Networks & Constraints', 
            duration: '25 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Get familiar with Figma tools. Learn vector networks for custom icons, construct shapes, and use constraints to control how elements resize relative to their parents.'
          },
          { 
            id: 'ds-2-2', 
            title: '2.2 Color Systems, Typography Rules & Visual Hierarchy Schemes', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Visual styling establishes page hierarchy. Select harmonious colors, establish typography sizes, and arrange layouts so the eye naturally focuses on key actions first.'
          },
          { 
            id: 'ds-2-3', 
            title: '2.3 Dynamic Layouts: Figma Auto-Layout, Components & Variables', 
            duration: '45 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Auto-layout lets frames adjust dynamically based on text changes. We also create reusable components, establish variants, and map design tokens to variables for consistency.'
          }
        ]
      },
      {
        chapterTitle: 'Module 3: Prototyping & Design Systems',
        lessons: [
          { 
            id: 'ds-3-1', 
            title: '3.1 Interactive Prototyping: Overlays, Smart Animate & Interactions', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Link screens together in prototype mode. Use transitions, trigger overlays, and apply Figma Smart Animate to generate smooth micro-interactions that mirror production interfaces.'
          },
          { 
            id: 'ds-3-2', 
            title: '3.2 Organizing Design Systems & Handoff workflows for Developers', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'A design system maintains UI consistency. Organize text styles, colors, and components. Learn to share files with engineering, inspect spacing, and export assets efficiently.'
          }
        ]
      }
    ],
    quizzes: [
      {
        question: 'What is the primary difference between UI and UX?',
        options: [
          'UI focuses on the structure of the site, while UX focuses on the backend databases.',
          'UI is about the visual presentation and interaction style, while UX is about the overall user satisfaction and efficiency.',
          'UI handles SEO marketing, while UX handles vector graphics creation.',
          'There is no difference; they are exactly the same concept.'
        ],
        answerIndex: 1,
        explanation: 'User Interface (UI) focuses on the visual design, typography, spacing, colors, and layout elements the user interacts with. User Experience (UX) focuses on the overall journey, research, architecture, ease of use, and efficacy of the product.'
      },
      {
        question: 'Which Figma feature allows a container to grow/shrink dynamically when items inside are modified?',
        options: [
          'Vector Network',
          'Constraints Tool',
          'Auto-Layout',
          'Component Variants'
        ],
        answerIndex: 2,
        explanation: 'Auto-Layout is a dynamic styling engine in Figma that enables designers to construct frames that expand, stack, wrap, and space out elements automatically, mimicking web flexbox controls.'
      },
      {
        question: 'What is the role of a User Persona in UI/UX Design?',
        options: [
          'To hire software engineers for building interfaces.',
          'To represent a typical user profile, guiding design choices to fit actual user needs.',
          'To serve as an official legal document outlining service agreements.',
          'To host design feedback forums on social media.'
        ],
        answerIndex: 1,
        explanation: 'A user persona represents a research-based archetype of your target users, helping designers make customer-focused choices throughout the product lifecycle.'
      },
      {
        question: 'Which of the following is considered a primary color contrast ratio standard for body text under WCAG AA rules?',
        options: [
          '1:1',
          '2:1',
          '4.5:1',
          '21:1'
        ],
        answerIndex: 2,
        explanation: 'Web Content Accessibility Guidelines (WCAG) AA standards require a minimum contrast ratio of 4.5:1 for standard body text, ensuring readability for users with visual impairments.'
      },
      {
        question: 'In wireframing, what does the term low-fidelity mean?',
        options: [
          'High resolution mockup with final branding.',
          'Static paper or digital layouts using lines, boxes, and placeholder text to focus on structure and layout without visual details.',
          'Fast CSS animations for transitions.',
          'A wireframe exported directly to React code.'
        ],
        answerIndex: 1,
        explanation: 'Low-fidelity wireframes are basic sketches or grids that map out page structures, elements, and content priority, omitting detailed styling, fonts, or assets.'
      },
      {
        question: 'What is Figma Smart Animate used for?',
        options: [
          'To generate auto-layout configurations automatically.',
          'To morph matching layers across prototype frames to create smooth, fluid micro-interactions.',
          'To export vector shapes to web SVG codes.',
          'To check design systems for color contrast violations.'
        ],
        answerIndex: 2,
        explanation: 'Smart Animate looks for matching layers across frames, recognizes differences in position, size, opacity, or rotation, and automatically creates smooth transitions between them.'
      },
      {
        question: 'What is a Design System?',
        options: [
          'A set of code editors used by design teams.',
          'A complete directory of reusable components, visual guidelines, typography rules, and tokens that ensure design consistency.',
          'A project management methodology for tracking backlogs.',
          'An automated interface compiler.'
        ],
        answerIndex: 1,
        explanation: 'A design system is a single source of truth containing visual tokens, typography rules, interactive component libraries, and guidelines that keep design and development aligned.'
      },
      {
        question: 'In layout design, what does the rule of visual hierarchy establish?',
        options: [
          'The order in which a user notices and processes information on a page.',
          'The security layer of the admin panels.',
          'The server response speeds.',
          'The size limit of graphics files.'
        ],
        answerIndex: 0,
        explanation: 'Visual hierarchy guides the user\'s eyes through the layout in a intentional order of importance, using size, contrast, color, and spacing to highlight key actions.'
      },
      {
        question: 'What is the main goal of usability testing?',
        options: [
          'To inspect CSS style sheets for compilation bugs.',
          'To test server database load limits.',
          'To observe actual users interacting with a product to identify friction points and areas for improvement.',
          'To register domain names and host packages.'
        ],
        answerIndex: 2,
        explanation: 'Usability testing involves observing real users perform tasks on an interface, highlighting navigation challenges, confusing layouts, or interface bugs.'
      },
      {
        question: 'What does developer handoff refer to in digital product design?',
        options: [
          'When engineers write styling code for designer review.',
          'When designers compile React templates.',
          'The process of sharing completed design files, assets, redlines, and layout measurements with developers to guide coding.',
          'When administrators activate live domains.'
        ],
        answerIndex: 2,
        explanation: 'Handoff is the step where design assets, layout measurements, typography styles, and interactive specs are delivered to the engineering team for implementation.'
      }
    ]
  },
  {
    id: 'machine-learning-ai',
    instructorId: 'jdoe',
    title: 'Machine Learning & AI Bootcamp 2026',
    category: 'Data Science',
    difficulty: 'Intermediate',
    price: 'Free',
    rating: 4.9,
    reviewsCount: 920,
    duration: '35 hours',
    lecturesCount: 10,
    description: 'Develop and deploy neural networks, classifications, and custom transformers using Python and PyTorch.',
    longDescription: 'Enter the world of modern intelligence systems. This intermediate bootcamp covers statistical foundations, model evaluations, regression algorithms, decision trees, support vector machines, and advances into deep learning with multi-layer neural networks. You will gain practical experience designing, training, and testing deep networks using PyTorch, loading large scale models, and running inferences.',
    syllabus: [
      {
        chapterTitle: 'Module 1: Foundations of Machine Learning',
        lessons: [
          { 
            id: 'ml-1-1', 
            title: '1.1 Core Statistics, Probabilities & Linear Algebra Fundamentals', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Machine Learning is built on math. In this lesson, we review vectors, matrices, dot products, derivatives for gradient steps, probability rules, and statistical distributions.'
          },
          { 
            id: 'ml-1-2', 
            title: '1.2 Data Preprocessing, Cleaning, and Feature Engineering', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Models are only as good as their data. Learn to handle missing values, encode categorical items, scale numeric values using normalization, and extract features to improve model accuracy.'
          },
          { 
            id: 'ml-1-3', 
            title: '1.3 Supervised Learning: Linear and Logistic Regressions', 
            duration: '40 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Learn fundamental supervised learning algorithms. We write linear regressions to predict continuous numeric outcomes and logistic regressions to classify binary categories.'
          }
        ]
      },
      {
        chapterTitle: 'Module 2: Advanced Classifications & PyTorch Core',
        lessons: [
          { 
            id: 'ml-2-1', 
            title: '2.1 Decision Trees, Random Forests, and SVM Classifiers', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Explore non-linear structures. Study decision tree logic, build ensemble Random Forests to prevent variance, and configure Support Vector Machines (SVM) to divide datasets using custom kernels.'
          },
          { 
            id: 'ml-2-2', 
            title: '2.2 PyTorch Tensors, Gradients, and Custom Dataset Lodgers', 
            duration: '45 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'PyTorch is a leading deep learning library. Master tensor structures, construct auto-grad backpropagation loops, and write custom Dataset classes to load training data efficiently.'
          },
          { 
            id: 'ml-2-3', 
            title: '2.3 Building Feedforward Neural Network Architectures', 
            duration: '50 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Design multi-layer perceptrons. Chain linear layers, configure activation functions (ReLU, Sigmoid), calculate loss, and update network weights using SGD and Adam optimizers.'
          }
        ]
      },
      {
        chapterTitle: 'Module 3: Neural Networks, Transformers & Deployment',
        lessons: [
          { 
            id: 'ml-3-1', 
            title: '3.1 Convolutional Nets (CNN) and Recurrent Networks (RNN)', 
            duration: '40 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Study specialized architectures. We train Convolutional Neural Networks (CNN) for image analysis and Recurrent Neural Networks (RNN) with LSTM blocks for sequence modeling.'
          },
          { 
            id: 'ml-3-2', 
            title: '3.2 Transformers: Self-Attention Mechanics & Language Models', 
            duration: '55 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Transformers revolutionized natural language processing. Study key-value-query vectors, multi-head self-attention mechanics, and analyze how LLMs process textual contexts.'
          },
          { 
            id: 'ml-3-3', 
            title: '3.3 Exporting Models via ONNX and Deploying Inference APIs', 
            duration: '42 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Move models from development to production. Save weights, export neural networks to the ONNX format for cross-platform speed, and deploy inference APIs using web frameworks.'
          }
        ]
      }
    ],
    quizzes: [
      {
        question: 'What is overfitting in Machine Learning models?',
        options: [
          'When the model fails to learn anything from both the training and validation sets.',
          'When the model performs exceptionally well on the training data but fails to generalize to unseen test data.',
          'When the network has too few parameters and cannot capture linear relationships.',
          'When the model requires too much RAM memory during training.'
        ],
        answerIndex: 1,
        explanation: 'Overfitting occurs when a machine learning model learns the detail and noise in the training data to an extent that it negatively impacts the performance of the model on new data. Essentially, it memorizes the training data instead of learning general patterns.'
      },
      {
        question: 'What optimization algorithm is standard for calculating weight updates in PyTorch?',
        options: [
          'Gradient Descent / Adam',
          'Fast Fourier Transforms',
          'Dynamic Programming Solutions',
          'Bubble Sort Algorithm'
        ],
        answerIndex: 0,
        explanation: 'PyTorch uses optimization algorithms like Stochastic Gradient Descent (SGD), Adam, and RMSprop to adjust parameters/weights based on the calculated gradients to minimize the loss function.'
      },
      {
        question: 'What does the loss function measure in training cycles?',
        options: [
          'The memory leakage rate of GPU devices.',
          'The mathematical discrepancy between the model predictions and actual target values.',
          'The speed of gradient backpropagation operations.',
          'The amount of training inputs ignored by classifiers.'
        ],
        answerIndex: 1,
        explanation: 'A loss function quantifies how far off a model\'s predictions are from the true labels. The goal of training is to minimize this loss value.'
      },
      {
        question: 'What mathematically allows Neural Networks to model non-linear boundaries?',
        options: [
          'Matrix Transpositions',
          'Gradient Descent Steps',
          'Activation Functions (e.g. ReLU, Sigmoid)',
          'Tensor Reshaping Actions'
        ],
        answerIndex: 2,
        explanation: 'Without activation functions, a neural network is just a combination of linear algebra operations. Activation functions introduce non-linearities, allowing networks to learn complex decision boundaries.'
      },
      {
        question: 'In deep learning, what is backpropagation?',
        options: [
          'Shifting database elements to secondary backups.',
          'An algorithm that calculates gradients of the loss function with respect to weights using the chain rule, propagating errors backward.',
          'Loading batches of validation datasets to RAM.',
          'Converting model weights to standard FP16 variables.'
        ],
        answerIndex: 1,
        explanation: 'Backpropagation computes the gradient of the loss function for a single weight by the chain rule, flowing backwards from the output layer to compute parameter updates.'
      },
      {
        question: 'What is a Tensor in PyTorch?',
        options: [
          'A database index tracker.',
          'A multi-dimensional array containing numeric values, optimized for execution on accelerators like GPUs.',
          'A string parsing component.',
          'A design system color variable.'
        ],
        answerIndex: 1,
        explanation: 'Tensors are the core data structure in PyTorch, similar to NumPy arrays but with the ability to run on GPUs to accelerate matrix operations.'
      },
      {
        question: 'Which architecture is best suited for image feature extraction?',
        options: [
          'Linear Regression',
          'RNN (Recurrent Neural Network)',
          'CNN (Convolutional Neural Network)',
          'K-Means Clustering'
        ],
        answerIndex: 2,
        explanation: 'CNNs use convolutional layers that apply filters to input images, extracting spatial hierarchies and features like edges, shapes, and objects.'
      },
      {
        question: 'What is the core operational mechanic behind Transformer models?',
        options: [
          'Recurrent feedback loops',
          'Decision tree pruning',
          'Self-Attention mechanisms',
          'Support Vector optimization'
        ],
        answerIndex: 2,
        explanation: 'Transformers rely on self-attention mechanisms to weigh the relationships between words in a sequence, regardless of their distance from one another.'
      },
      {
        question: 'Why do we split data into training, validation, and test datasets?',
        options: [
          'To ensure the database does not overflow.',
          'To train the model on validation parameters directly.',
          'To fit parameters, evaluate tuning choices, and test final generalization performance on unseen data.',
          'To speed up compiler rendering rates.'
        ],
        answerIndex: 2,
        explanation: 'We train on the training set, tune hyperparameters on the validation set, and perform final performance evaluations on the test set to ensure model generalization.'
      },
      {
        question: 'What does ONNX format allow us to do with trained networks?',
        options: [
          'Clean out dataset outliers automatically.',
          'Export models to a universal open format, allowing runtime execution across different frameworks and hardware.',
          'Compile Python code into standard React templates.',
          'Secure databases with end-to-end encryption.'
        ],
        answerIndex: 1,
        explanation: 'Open Neural Network Exchange (ONNX) is an open ecosystem that allows AI developers to share models across different frameworks (like PyTorch, TensorFlow) and optimize inference runtimes.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    instructorId: 'rgreen',
    title: 'Digital Marketing & Brand Strategy',
    category: 'Marketing',
    difficulty: 'Beginner',
    price: 'Free',
    rating: 4.6,
    reviewsCount: 380,
    duration: '15 hours',
    lecturesCount: 6,
    description: 'Unlock search engine optimization, Google Analytics, content marketing, and growth marketing funnels.',
    longDescription: 'Grow any business online. This course covers target audience persona identification, writing high-conversion copy, search engine optimization (SEO) techniques, search engine marketing (SEM) paid ads, social media management metrics, and setting up complex conversion funnels inside tools like Google Analytics. You will learn to optimize return on ad spend and build sustainable brand equity.',
    syllabus: [
      {
        chapterTitle: 'Module 1: SEO & Content Engine',
        lessons: [
          { 
            id: 'dm-1-1', 
            title: '1.1 Introduction to SEO and Keyword Ranking Algorithms', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Search Engine Optimization (SEO) improves organic site visibility. Learn keyword research, on-page optimization (headings, alt texts), and how search crawlers evaluate content relevance.'
          },
          { 
            id: 'dm-1-2', 
            title: '1.2 Copywriting Rules: Crafting Headlines That Convert', 
            duration: '25 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Copywriting drives user action. Learn psychological copywriting patterns, structured value propositions, and how to write headlines that improve click-through rates.'
          },
          { 
            id: 'dm-1-3', 
            title: '1.3 Setting Up Social Content Calendars & Distributions', 
            duration: '20 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Consistent branding builds audience trust. Plan content schedules, adjust assets for different channels (LinkedIn, Instagram), and analyze user engagement statistics.'
          }
        ]
      },
      {
        chapterTitle: 'Module 2: Analytics & Conversion Funnels',
        lessons: [
          { 
            id: 'dm-2-1', 
            title: '2.1 Google Analytics (GA4) Integration & Event Trackers', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'GA4 tracks customer paths in detail. Configure tracking codes, set up custom interaction events, and build conversion reports to analyze user behavior.'
          },
          { 
            id: 'dm-2-2', 
            title: '2.2 Building Pay-Per-Click (PPC) Ad Campaigns in Google/Meta', 
            duration: '40 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Paid ads deliver immediate traffic. Learn to set ad budgets, structure campaigns, perform A/B testing on copy variants, and calculate return on ad spend (ROAS).'
          },
          { 
            id: 'dm-2-3', 
            title: '2.3 Email Lifecycle flows, Lead Magnets & A/B testing', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Email marketing retains customers. Create lead magnets to build subscriber lists, schedule welcome email flows, and run A/B tests on subject lines.'
          }
        ]
      }
    ],
    quizzes: [
      {
        question: 'What does the term CTR stand for in growth marketing analysis?',
        options: [
          'Calculated Target Retention',
          'Conversion Transfer Rate',
          'Click-Through Rate',
          'Customer Total Revenue'
        ],
        answerIndex: 2,
        explanation: 'Click-Through Rate (CTR) measures the percentage of users who clicked on a specific link, call-to-action, or ad out of the total number of users who viewed it (impressions).'
      },
      {
        question: 'What is the main objective of Search Engine Optimization (SEO)?',
        options: [
          'To increase paid search rankings.',
          'To improve website loading speeds on desktop servers.',
          'To optimize web content, structure, and authority to drive organic, unpaid traffic from search engines.',
          'To write backend database storage models.'
        ],
        answerIndex: 2,
        explanation: 'SEO focuses on organic search visibility. By optimizing keywords, site performance, headings, and backlinks, we improve rankings without paying for ads directly.'
      },
      {
        question: 'What does GA4 use to track user interactions compared to Universal Analytics sessions?',
        options: [
          'Page reloads',
          'Events with custom parameters',
          'IP addresses tracking',
          'Database logs'
        ],
        answerIndex: 1,
        explanation: 'Google Analytics 4 (GA4) uses an event-based measurement model that tracks user interactions (clicks, pageviews, form submits) as separate events with custom parameters.'
      },
      {
        question: 'What formula is used to calculate ROAS (Return on Ad Spend)?',
        options: [
          'Ad Spend / Gross Revenue',
          'Gross Revenue generated from ads / Ad Spend cost',
          'Total impressions * Click Rate',
          'New Customers / Cost of Acquisition'
        ],
        answerIndex: 1,
        explanation: 'ROAS is calculated by dividing the gross revenue generated by the advertising campaign by the total cost of that campaign. A higher ROAS indicates more efficient ad spend.'
      },
      {
        question: 'What is a Lead Magnet?',
        options: [
          'A styling sheet that aligns call-to-action buttons.',
          'An incentive (like a free eBook, checklist, or webinar) offered to potential customers in exchange for their email address.',
          'An automated script that crawls site backlinks.',
          'A database index table.'
        ],
        answerIndex: 1,
        explanation: 'A lead magnet is a marketing tool that provides immediate value to users, encouraging them to join your email list.'
      },
      {
        question: 'What is A/B testing in email marketing campaigns?',
        options: [
          'Testing if emails render correctly on Chrome vs Safari.',
          'Comparing two versions of an email (like different subject lines or calls-to-action) with different segments of your audience to determine which performs better.',
          'Sending emails to both administrators and students.',
          'Encrypting user email lists.'
        ],
        answerIndex: 1,
        explanation: 'A/B testing splits your audience to test one variable (such as subject line wording or CTA placement) to see which variant gets more clicks or opens.'
      },
      {
        question: 'What does CPC stand for in paid search campaigns?',
        options: [
          'Calculated Product Cost',
          'Cost Per Click',
          'Conversion Page Count',
          'Click Processing Code'
        ],
        answerIndex: 1,
        explanation: 'Cost Per Click (CPC) is the actual price you pay for each click on your advertising campaign on platforms like Google Ads or Meta Ads.'
      },
      {
        question: 'In content marketing, what does on-page SEO optimize?',
        options: [
          'Server response times and host locations.',
          'The elements directly on your webpage (like title tags, content quality, headers, and image alt text) to improve search relevance.',
          'Link profiles on external blogs.',
          'Database migrations.'
        ],
        answerIndex: 1,
        explanation: 'On-page SEO involves optimizing variables you control directly on the page—like content, headings, meta tags, and alt text—to help search engines index the page.'
      },
      {
        question: 'What is the top stage of a standard marketing funnel called?',
        options: [
          'Conversion / Action',
          'Retention / Advocacy',
          'Awareness / Attention',
          'Consideration / evaluation'
        ],
        answerIndex: 2,
        explanation: 'A standard marketing funnel begins with Awareness (Top of Funnel), where potential customers first learn about your brand or product.'
      },
      {
        question: 'What does bounce rate measure on website analytics pages?',
        options: [
          'The speed at which a user navigates between pages.',
          'The percentage of visitors who leave the site after viewing only a single page, without interacting further.',
          'The number of database write operations that failed.',
          'The average time a user spends reading text.'
        ],
        answerIndex: 1,
        explanation: 'Bounce rate is the percentage of sessions where a user loads a single page on your site and exits without triggering any other events or visiting other pages.'
      }
    ]
  },
  {
    id: 'product-management',
    instructorId: 'jsmith',
    title: 'Product Management from A to Z',
    category: 'Business',
    difficulty: 'Advanced',
    price: 'Free',
    rating: 4.7,
    reviewsCount: 510,
    duration: '18 hours',
    lecturesCount: 8,
    description: 'Learn roadmap design, agile scrum sprints, product spec document (PRD) creation, and client metrics.',
    longDescription: 'Coordinate engineering, design, and commercial stakeholders. In this course, you will learn the core disciplines of Product Management. Start by mastering user research cycles and problem definitions. Transition into writing comprehensive Product Requirement Documents (PRDs), designing product roadmap timelines, structuring agile team workflows using Scrum and Kanban, and tracking vital analytics like Daily Active Users, Retention Churn, and Net Promoter Scores.',
    syllabus: [
      {
        chapterTitle: 'Module 1: Strategy & Roadmapping',
        lessons: [
          { 
            id: 'pm-1-1', 
            title: '1.1 The Product Lifecycle: Idea Validation and Product-Market Fit', 
            duration: '30 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Every product goes through development, growth, maturity, and decline stages. Learn to validate ideas, conduct user interviews, and iterate features to achieve Product-Market Fit.'
          },
          { 
            id: 'pm-1-2', 
            title: '1.2 Writing a PRD: Product Requirement Document Outline', 
            duration: '35 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'A PRD aligns your team on what is being built and why. Learn to structure user stories, define target user personas, outline feature specs, and set success metrics.'
          },
          { 
            id: 'pm-1-3', 
            title: '1.3 Mapping Product Timelines & Strategic Alignment Plans', 
            duration: '28 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Roadmaps communicate product direction. Learn to balance near-term features with long-term vision, manage stakeholder expectations, and plan releases without committing to rigid dates.'
          }
        ]
      },
      {
        chapterTitle: 'Module 2: Execution & Product Metrics',
        lessons: [
          { 
            id: 'pm-2-1', 
            title: '2.1 Working with Agile Teams: Scrum Cycles, Backlogs & Sprints', 
            duration: '32 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Scrum is a popular framework for agile development. Learn to run sprint planning sessions, prioritize backlogs, manage standups, and handle retrospectives with engineering teams.'
          },
          { 
            id: 'pm-2-2', 
            title: '2.2 Product Analytics: DAU/MAU, LTV, CAC & Churn Formulations', 
            duration: '38 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Metrics drive product decisions. Master customer acquisition cost (CAC), user lifetime value (LTV), retention metrics, and analyze user churn data.'
          },
          { 
            id: 'pm-2-3', 
            title: '2.3 Stakeholder Management, User Testing & Feedbacks', 
            duration: '25 mins', 
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Collaborate effectively across design, engineering, and marketing teams. Learn user testing methodologies, analyze feedback, and handle conflicting priorities.'
          }
        ]
      }
    ],
    quizzes: [
      {
        question: 'What is a PRD in product development contexts?',
        options: [
          'Process Resource Diagram',
          'Product Requirement Document',
          'Programmatic Routing Detail',
          'Public Relations Delivery'
        ],
        answerIndex: 1,
        explanation: 'A Product Requirement Document (PRD) defines the value proposition, user problems, release requirements, feature specifications, and success metrics for a product version to align engineering, design, and commercial teams.'
      },
      {
        question: 'Which metric measures the ratio of daily to monthly active users, indicating product engagement stickiness?',
        options: [
          'LTV / CAC',
          'DAU / MAU',
          'Net Promoter Score',
          'Churn Rate'
        ],
        answerIndex: 1,
        explanation: 'The DAU/MAU ratio measures product engagement stickiness. A higher ratio indicates that monthly users return frequently on a daily basis.'
      },
      {
        question: 'In Agile Scrum, what is a Product Backlog?',
        options: [
          'A folder containing outdated visual assets.',
          'An ordered, living list of requirements, user stories, and features needed for the product, managed by the Product Owner.',
          'A backup directory of server database configurations.',
          'An archive of support tickets.'
        ],
        answerIndex: 1,
        explanation: 'The product backlog is an ordered, prioritized list of all the work needed on the product, serving as the single source of requirements.'
      },
      {
        question: 'What is churn rate?',
        options: [
          'The rate at which new servers are activated.',
          'The percentage of customers who stop using your product or cancel their subscription over a given timeframe.',
          'The speed at which developers push code.',
          'The average time spent inside an interface.'
        ],
        answerIndex: 1,
        explanation: 'Churn rate is the percentage of users who drop off. High churn suggests usability issues or a lack of long-term product value.'
      },
      {
        question: 'What is an MVP (Minimum Viable Product)?',
        options: [
          'Most Valuable Programmer on the team.',
          'A version of a product with just enough features to satisfy early customers and collect validated learning for future iterations.',
          'A secure database environment.',
          'A fully customized, enterprise-ready software release.'
        ],
        answerIndex: 1,
        explanation: 'An MVP is the simplest version of a product that can be released to gather user feedback with minimal development effort.'
      },
      {
        question: 'What does CAC measure?',
        options: [
          'Customer Acquisition Cost: the total cost to acquire a single new customer, including marketing and sales expenses.',
          'Calculated Account Count.',
          'Customer Action Cycle.',
          'Conversion Analysis Curve.'
        ],
        answerIndex: 0,
        explanation: 'CAC represents the average expense incurred to convert a prospect into a customer, computed by dividing marketing/sales costs by customers acquired.'
      },
      {
        question: 'What is the main role of a Product Manager compared to a Project Manager?',
        options: [
          'A Product Manager writes the code scripts directly.',
          'A Product Manager focuses on the "What" and "Why" of the product, while a Project Manager focuses on "When" and "How" to execute.',
          'A Product Manager handles SEO paid ads only.',
          'There is no difference; they are duplicate roles.'
        ],
        answerIndex: 1,
        explanation: 'Product Managers define the vision, user needs, and product roadmap (what and why). Project Managers manage the timelines, resource planning, and execution scope (when and how).'
      },
      {
        question: 'What does NPS measure?',
        options: [
          'Net Product Space on server disks.',
          'Net Promoter Score: user loyalty and satisfaction based on their likelihood to recommend the product to others.',
          'Network Processing Speed.',
          'Navigation Path Sequence.'
        ],
        answerIndex: 1,
        explanation: 'NPS is a standard customer loyalty metric calculated from responses to a single question: "On a scale of 0-10, how likely are you to recommend us?"'
      },
      {
        question: 'In agile development, what is a sprint?',
        options: [
          'A quick database query script.',
          'A set, time-boxed period (typically 2-4 weeks) during which a specific backlog of work must be completed and made ready for review.',
          'A design review dashboard session.',
          'The speed of server calculations.'
        ],
        answerIndex: 1,
        explanation: 'A sprint is a short, repeatable cycle in agile methodologies where development teams work to deliver a functional product increment.'
      },
      {
        question: 'What is Product-Market Fit?',
        options: [
          'When the design matches standard CSS guidelines.',
          'The degree to which a product satisfies a strong market demand, with active users retaining well and acquiring organic growth.',
          'When a server compiles React code successfully.',
          'When the sales team establishes enterprise packages.'
        ],
        answerIndex: 1,
        explanation: 'Product-Market fit means being in a good market with a product that can satisfy that market, resulting in sustainable growth and retention.'
      }
    ]
  }
];
