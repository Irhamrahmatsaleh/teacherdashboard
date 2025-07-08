// import { useState, useEffect, useRef } from "react";
// import {
//   ChevronDown,
//   ChevronUp,
//   FileText,
//   CheckCircle,
//   Trophy,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { useSidebar } from "@/components/ui/sidebar";
// import Loading from "@/components/Loading";
// import { useCourseProgressData } from "@/hooks/useCourseProgressData";

// const ChaptersSidebar = () => {
//   const router = useRouter();
//   const { setOpen } = useSidebar();
//   const [expandedSections, setExpandedSections] = useState<string[]>([]);

//   const {
//     user,
//     course,
//     userProgress,
//     chapterId,
//     courseId,
//     isLoading,
//     updateChapterProgress,
//   } = useCourseProgressData();

//   const sidebarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setOpen(false);
//   }, []);

//   if (isLoading) return <Loading />;
//   if (!user) return <div>Please sign in to view course progress.</div>;
//   if (!course || !userProgress) return <div>Error loading course content</div>;

//   const toggleSection = (sectionTitle: string) => {
//     setExpandedSections((prevSections) =>
//       prevSections.includes(sectionTitle)
//         ? prevSections.filter((title) => title !== sectionTitle)
//         : [...prevSections, sectionTitle]
//     );
//   };

//   const handleChapterClick = (sectionId: string, chapterId: string) => {
//     router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
//       scroll: false,
//     });
//   };

//   return (
//     <div ref={sidebarRef} className="chapters-sidebar">
//       <div className="chapters-sidebar__header">
//         <h2 className="chapters-sidebar__title">{course.title}</h2>
//         <hr className="chapters-sidebar__divider" />
//       </div>
//       {course.sections.map((section, index) => (
//         <Section
//           key={section.sectionId}
//           section={section}
//           index={index}
//           sectionProgress={userProgress.sections.find(
//             (s) => s.sectionId === section.sectionId
//           )}
//           chapterId={chapterId as string}
//           courseId={courseId as string}
//           expandedSections={expandedSections}
//           toggleSection={toggleSection}
//           handleChapterClick={handleChapterClick}
//           updateChapterProgress={updateChapterProgress}
//         />
//       ))}
//     </div>
//   );
// };

// const Section = ({
//   section,
//   index,
//   sectionProgress,
//   chapterId,
//   courseId,
//   expandedSections,
//   toggleSection,
//   handleChapterClick,
//   updateChapterProgress,
// }: {
//   section: any;
//   index: number;
//   sectionProgress: any;
//   chapterId: string;
//   courseId: string;
//   expandedSections: string[];
//   toggleSection: (sectionTitle: string) => void;
//   handleChapterClick: (sectionId: string, chapterId: string) => void;
//   updateChapterProgress: (
//     sectionId: string,
//     chapterId: string,
//     completed: boolean
//   ) => void;
// }) => {
//   const completedChapters =
//     sectionProgress?.chapters.filter((c: any) => c.completed).length || 0;
//   const totalChapters = section.chapters.length;
//   const isExpanded = expandedSections.includes(section.sectionTitle);

//   return (
//     <div className="chapters-sidebar__section">
//       <div
//         onClick={() => toggleSection(section.sectionTitle)}
//         className="chapters-sidebar__section-header"
//       >
//         <div className="chapters-sidebar__section-title-wrapper">
//           <p className="chapters-sidebar__section-number">
//             Section 0{index + 1}
//           </p>
//           {isExpanded ? (
//             <ChevronUp className="chapters-sidebar__chevron" />
//           ) : (
//             <ChevronDown className="chapters-sidebar__chevron" />
//           )}
//         </div>
//         <h3 className="chapters-sidebar__section-title">
//           {section.sectionTitle}
//         </h3>
//       </div>
//       <hr className="chapters-sidebar__divider" />

//       {isExpanded && (
//         <div className="chapters-sidebar__section-content">
//           <ProgressVisuals
//             section={section}
//             sectionProgress={sectionProgress}
//             completedChapters={completedChapters}
//             totalChapters={totalChapters}
//           />
//           <ChaptersList
//             section={section}
//             sectionProgress={sectionProgress}
//             chapterId={chapterId}
//             courseId={courseId}
//             handleChapterClick={handleChapterClick}
//             updateChapterProgress={updateChapterProgress}
//           />
//         </div>
//       )}
//       <hr className="chapters-sidebar__divider" />
//     </div>
//   );
// };

// const ProgressVisuals = ({
//   section,
//   sectionProgress,
//   completedChapters,
//   totalChapters,
// }: {
//   section: any;
//   sectionProgress: any;
//   completedChapters: number;
//   totalChapters: number;
// }) => {
//   return (
//     <>
//       <div className="chapters-sidebar__progress">
//         <div className="chapters-sidebar__progress-bars">
//           {section.chapters.map((chapter: any) => {
//             const isCompleted = sectionProgress?.chapters.find(
//               (c: any) => c.chapterId === chapter.chapterId
//             )?.completed;
//             return (
//               <div
//                 key={chapter.chapterId}
//                 className={cn(
//                   "chapters-sidebar__progress-bar",
//                   isCompleted && "chapters-sidebar__progress-bar--completed"
//                 )}
//               ></div>
//             );
//           })}
//         </div>
//         <div className="chapters-sidebar__trophy">
//           <Trophy className="chapters-sidebar__trophy-icon" />
//         </div>
//       </div>
//       <p className="chapters-sidebar__progress-text">
//         {completedChapters}/{totalChapters} COMPLETED
//       </p>
//     </>
//   );
// };

// const ChaptersList = ({
//   section,
//   sectionProgress,
//   chapterId,
//   courseId,
//   handleChapterClick,
//   updateChapterProgress,
// }: {
//   section: any;
//   sectionProgress: any;
//   chapterId: string;
//   courseId: string;
//   handleChapterClick: (sectionId: string, chapterId: string) => void;
//   updateChapterProgress: (
//     sectionId: string,
//     chapterId: string,
//     completed: boolean
//   ) => void;
// }) => {
//   return (
//     <ul className="chapters-sidebar__chapters">
//       {section.chapters.map((chapter: any, index: number) => (
//         <Chapter
//           key={chapter.chapterId}
//           chapter={chapter}
//           index={index}
//           sectionId={section.sectionId}
//           sectionProgress={sectionProgress}
//           chapterId={chapterId}
//           courseId={courseId}
//           handleChapterClick={handleChapterClick}
//           updateChapterProgress={updateChapterProgress}
//         />
//       ))}
//     </ul>
//   );
// };

// const Chapter = ({
//   chapter,
//   index,
//   sectionId,
//   sectionProgress,
//   chapterId,
//   courseId,
//   handleChapterClick,
//   updateChapterProgress,
// }: {
//   chapter: any;
//   index: number;
//   sectionId: string;
//   sectionProgress: any;
//   chapterId: string;
//   courseId: string;
//   handleChapterClick: (sectionId: string, chapterId: string) => void;
//   updateChapterProgress: (
//     sectionId: string,
//     chapterId: string,
//     completed: boolean
//   ) => void;
// }) => {
//   const chapterProgress = sectionProgress?.chapters.find(
//     (c: any) => c.chapterId === chapter.chapterId
//   );
//   const isCompleted = chapterProgress?.completed;
//   const isCurrentChapter = chapterId === chapter.chapterId;

//   const handleToggleComplete = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     updateChapterProgress(sectionId, chapter.chapterId, !isCompleted);
//   };

//   return (
//     <li
//       className={cn("chapters-sidebar__chapter", {
//         "chapters-sidebar__chapter--current": isCurrentChapter,
//       })}
//       onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
//     >
//       {isCompleted ? (
//         <div
//           className="chapters-sidebar__chapter-check"
//           onClick={handleToggleComplete}
//           title="Toggle completion status"
//         >
//           <CheckCircle className="chapters-sidebar__check-icon" />
//         </div>
//       ) : (
//         <div
//           className={cn("chapters-sidebar__chapter-number", {
//             "chapters-sidebar__chapter-number--current": isCurrentChapter,
//           })}
//         >
//           {index + 1}
//         </div>
//       )}
//       <span
//         className={cn("chapters-sidebar__chapter-title", {
//           "chapters-sidebar__chapter-title--completed": isCompleted,
//           "chapters-sidebar__chapter-title--current": isCurrentChapter,
//         })}
//       >
//         {chapter.title}
//       </span>
//       {chapter.type === "Text" && (
//         <FileText className="chapters-sidebar__text-icon" />
//       )}
//     </li>
//   );
// };

// export default ChaptersSidebar;

















import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import Loading from "@/components/Loading";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";

const ChaptersSidebar = () => {
  const router = useRouter();
  const { setOpen } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    user,
    course,
    userProgress,
    chapterId,
    courseId,
    isLoading,
    updateChapterProgress,
  } = useCourseProgressData();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isMobile]);

  useEffect(() => {
    setOpen(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view course progress.</div>;
  if (!course || !userProgress) return <div>Error loading course content</div>;

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(sectionTitle)
        ? prevSections.filter((title) => title !== sectionTitle)
        : [...prevSections, sectionTitle]
    );
  };

  const handleChapterClick = (sectionId: string, chapterId: string) => {
    router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
      scroll: false,
    });

    // Close mobile menu when chapter is selected
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const SidebarContent = () => (
    <div ref={sidebarRef} className="chapters-sidebar">
      {/* Mobile Header with Close Button */}
      {isMobile && (
        <div className="flex justify-end items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <button
            onClick={toggleMobileMenu}
            className="bg-transparent border-none p-2 cursor-pointer rounded-md transition-colors duration-200 flex items-center justify-center hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-white-50" />
          </button>
        </div>
      )}

      <div className="chapters-sidebar__header">
        <h2 className="chapters-sidebar__title">{course.title}</h2>
        <hr className="chapters-sidebar__divider" />
      </div>

      {course.sections.map((section, index) => (
        <Section
          key={section.sectionId}
          section={section}
          index={index}
          sectionProgress={userProgress.sections.find(
            (s) => s.sectionId === section.sectionId
          )}
          chapterId={chapterId as string}
          courseId={courseId as string}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-5 right-5 z-[1000] bg-transparent border-none rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
          aria-label="Open chapters menu"
        >
          <Menu className="w-6 h-6 text-white -mt-3 ml-6" />
        </button>
      )}


      {/* Desktop Sidebar */}
      {!isMobile && <SidebarContent />}

      {/* Mobile Overlay and Sidebar */}
      {isMobile && (
        <div
          ref={overlayRef}
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-[1001] transition-all duration-300 backdrop-blur-sm",
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out",
              isMobileMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
            )}
          >
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

const Section = ({
  section,
  index,
  sectionProgress,
  chapterId,
  courseId,
  expandedSections,
  toggleSection,
  handleChapterClick,
  updateChapterProgress,
}: {
  section: any;
  index: number;
  sectionProgress: any;
  chapterId: string;
  courseId: string;
  expandedSections: string[];
  toggleSection: (sectionTitle: string) => void;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  const completedChapters =
    sectionProgress?.chapters.filter((c: any) => c.completed).length || 0;
  const totalChapters = section.chapters.length;
  const isExpanded = expandedSections.includes(section.sectionTitle);

  return (
    <div className="chapters-sidebar__section">
      <div
        onClick={() => toggleSection(section.sectionTitle)}
        className="chapters-sidebar__section-header"
      >
        <div className="chapters-sidebar__section-title-wrapper">
          <p className="chapters-sidebar__section-number">
            Section 0{index + 1}
          </p>
          {isExpanded ? (
            <ChevronUp className="chapters-sidebar__chevron" />
          ) : (
            <ChevronDown className="chapters-sidebar__chevron" />
          )}
        </div>
        <h3 className="chapters-sidebar__section-title">
          {section.sectionTitle}
        </h3>
      </div>
      <hr className="chapters-sidebar__divider" />

      {isExpanded && (
        <div className="chapters-sidebar__section-content">
          <ProgressVisuals
            section={section}
            sectionProgress={sectionProgress}
            completedChapters={completedChapters}
            totalChapters={totalChapters}
          />
          <ChaptersList
            section={section}
            sectionProgress={sectionProgress}
            chapterId={chapterId}
            courseId={courseId}
            handleChapterClick={handleChapterClick}
            updateChapterProgress={updateChapterProgress}
          />
        </div>
      )}
      <hr className="chapters-sidebar__divider" />
    </div>
  );
};

const ProgressVisuals = ({
  section,
  sectionProgress,
  completedChapters,
  totalChapters,
}: {
  section: any;
  sectionProgress: any;
  completedChapters: number;
  totalChapters: number;
}) => {
  return (
    <>
      <div className="chapters-sidebar__progress">
        <div className="chapters-sidebar__progress-bars">
          {section.chapters.map((chapter: any) => {
            const isCompleted = sectionProgress?.chapters.find(
              (c: any) => c.chapterId === chapter.chapterId
            )?.completed;
            return (
              <div
                key={chapter.chapterId}
                className={cn(
                  "chapters-sidebar__progress-bar",
                  isCompleted && "chapters-sidebar__progress-bar--completed"
                )}
              ></div>
            );
          })}
        </div>
        <div className="chapters-sidebar__trophy">
          <Trophy className="chapters-sidebar__trophy-icon" />
        </div>
      </div>
      <p className="chapters-sidebar__progress-text">
        {completedChapters}/{totalChapters} COMPLETED
      </p>
    </>
  );
};

const ChaptersList = ({
  section,
  sectionProgress,
  chapterId,
  courseId,
  handleChapterClick,
  updateChapterProgress,
}: {
  section: any;
  sectionProgress: any;
  chapterId: string;
  courseId: string;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  return (
    <ul className="chapters-sidebar__chapters">
      {section.chapters.map((chapter: any, index: number) => (
        <Chapter
          key={chapter.chapterId}
          chapter={chapter}
          index={index}
          sectionId={section.sectionId}
          sectionProgress={sectionProgress}
          chapterId={chapterId}
          courseId={courseId}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </ul>
  );
};

const Chapter = ({
  chapter,
  index,
  sectionId,
  sectionProgress,
  chapterId,
  courseId,
  handleChapterClick,
  updateChapterProgress,
}: {
  chapter: any;
  index: number;
  sectionId: string;
  sectionProgress: any;
  chapterId: string;
  courseId: string;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  const chapterProgress = sectionProgress?.chapters.find(
    (c: any) => c.chapterId === chapter.chapterId
  );
  const isCompleted = chapterProgress?.completed;
  const isCurrentChapter = chapterId === chapter.chapterId;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();

    updateChapterProgress(sectionId, chapter.chapterId, !isCompleted);
  };

  return (
    <li
      className={cn("chapters-sidebar__chapter", {
        "chapters-sidebar__chapter--current": isCurrentChapter,
      })}
      onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
    >
      {isCompleted ? (
        <div
          className="chapters-sidebar__chapter-check"
          onClick={handleToggleComplete}
          title="Toggle completion status"
        >
          <CheckCircle className="chapters-sidebar__check-icon" />
        </div>
      ) : (
        <div
          className={cn("chapters-sidebar__chapter-number", {
            "chapters-sidebar__chapter-number--current": isCurrentChapter,
          })}
        >
          {index + 1}
        </div>
      )}
      <span
        className={cn("chapters-sidebar__chapter-title", {
          "chapters-sidebar__chapter-title--completed": isCompleted,
          "chapters-sidebar__chapter-title--current": isCurrentChapter,
        })}
      >
        {chapter.title}
      </span>
      {chapter.type === "Text" && (
        <FileText className="chapters-sidebar__text-icon" />
      )}
    </li>
  );
};

export default ChaptersSidebar;
