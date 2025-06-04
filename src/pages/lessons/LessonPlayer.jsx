import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FaList, FaQuestion } from 'react-icons/fa';

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const [showAskDoubtModal, setShowAskDoubtModal] = useState(false);
  const [doubt, setDoubt] = useState('');

  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: 'Introduction to React Hooks',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Learn about React Hooks and their usage in modern React applications.',
    resources: [
      { id: '1', title: 'Hooks Documentation', type: 'pdf' },
      { id: '2', title: 'Example Code', type: 'code' }
    ]
  };

  // Mock upcoming lessons
  const upcomingLessons = [
    { id: '2', title: 'useState Hook Deep Dive', duration: '15:00' },
    { id: '3', title: 'useEffect Hook Explained', duration: '20:00' },
    { id: '4', title: 'Custom Hooks', duration: '25:00' }
  ];

  const handleSubmitDoubt = async (e) => {
    e.preventDefault();
    // In a real implementation, this would submit to an API
    console.log('Submitting doubt:', doubt);
    setShowAskDoubtModal(false);
    setDoubt('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9">
              <ReactPlayer
                url={lesson.videoUrl}
                width="100%"
                height="100%"
                controls
                className="rounded-t-lg"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <button
                  onClick={() => setShowAskDoubtModal(true)}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <FaQuestion className="mr-2" />
                  Ask Doubt
                </button>
              </div>

              <p className="text-gray-600 mb-6">{lesson.description}</p>

              <div>
                <h2 className="text-lg font-semibold mb-3">Resources</h2>
                <div className="space-y-2">
                  {lesson.resources.map(resource => (
                    <div
                      key={resource.id}
                      className="flex items-center p-3 border rounded hover:bg-gray-50"
                    >
                      <span className="text-primary mr-2">
                        {resource.type === 'pdf' ? '📄' : '💻'}
                      </span>
                      <span>{resource.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaList className="text-primary mr-2" />
            <h2 className="text-lg font-semibold">Upcoming Lessons</h2>
          </div>

          <div className="space-y-3">
            {upcomingLessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500">Duration: {lesson.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAskDoubtModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Ask a Doubt</h2>
            <form onSubmit={handleSubmitDoubt}>
              <textarea
                value={doubt}
                onChange={(e) => setDoubt(e.target.value)}
                placeholder="Type your question here..."
                className="w-full p-3 border rounded mb-4 h-32"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAskDoubtModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}