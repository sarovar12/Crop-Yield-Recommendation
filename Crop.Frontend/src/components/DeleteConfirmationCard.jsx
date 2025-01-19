import { toast } from 'react-toastify';
import { deleteCourse } from '../../api/CourseAPI';

function DeleteConfirmationModal({ isOpen, onClose, courseName, courseId }) {
  const handleConfirm = async () => {
    console.log(`Deleting course: ${courseName}`);
    try {
      await deleteCourse(courseId);
      toast.success('Course Deleted Sucessfully');
      onClose();
    } catch {
      toast.error('Failed to delete this course');
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete the course "{courseName}"?
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteConfirmationModal;
