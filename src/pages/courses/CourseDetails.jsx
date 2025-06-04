import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaFile, FaQuestionCircle, FaTasks } from 'react-icons/fa';

export default function CourseDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data
  const course = {
    id,
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch to advanced level',
    instructor: 'John Doe',
    duration: '40 hours',
    lessons: 48,
    enrolled: 1234,
    rating: 4.5,
    chapters: [
      {
        title: 'Introduction to Web Development',
        lessons: [
          { title: 'Welcome to the Course', duration: '10:00', type: 'video' },
          { title: 'Setting Up Your Environment', duration: '15:00', type: 'video' },
        ]
      },
      {
        title: 'HTML Fundamentals',
        lessons: [
          { title: 'Basic HTML Structure', duration: '20:00', type: 'video' },
          { title: 'HTML Forms and Tables', duration: '25:00', type: 'video' },
          { title: 'HTML Quiz', type: 'quiz' },
        ]
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <span>By {course.instructor}</span>
          <span>•</span>
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.lessons} lessons</span>
          <span>•</span>
          <span>{course.enrolled} students</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'curriculum'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  Curriculum
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Course Description</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {course.chapters.map((chapter, index) => (
                    <div key={index} className="border rounded-lg">
                      <div className="p-4 bg-gray-50 font-medium">
                        {chapter.title}
                      </div>
                      <div className="divide-y">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="p-4 flex items-center justify-between hover:bg-gray-50"
                          >
                            <div className="flex items-center">
                              {lesson.type === 'video' ? (
                                <FaPlay className="text-primary mr-3" />
                              ) : lesson.type === 'quiz' ? (
                                <FaQuestionCircle className="text-primary mr-3" />
                              ) : (
                                <FaFile className="text-primary mr-3" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            {lesson.duration && (
                              <span className="text-sm text-gray-500">
                                {lesson.duration}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completion</span>
                <span>0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-0"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <FaPlay className="mr-2 text-gray-500" />
                <span>0/{course.lessons} lessons completed</span>
              </div>
              <div className="flex items-center text-sm">
                <FaQuestionCircle className="mr-2 text-gray-500" />
                <span>0 quizzes completed</span>
              </div>
              <div className="flex items-center text-sm">
                <FaTasks className="mr-2 text-gray-500" />
                <span>0 assignments submitted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}