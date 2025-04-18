import React, { useState, useEffect } from "react";

const TodoForm = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(""); // State để lưu lỗi

  useEffect(() => {
    if (task) {
      // Nếu đang chỉnh sửa task, thiết lập giá trị từ task
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStartDate(task.startDate || "");
      setExpirationDate(task.expirationDate || "");
      setTags(task.tags || "");
    } else {
      // Nếu tạo task mới, thiết lập startDate là ngày giờ hiện tại
      setStartDate(getCurrentDateTime());
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const start = new Date(startDate);
    const expiration = new Date(expirationDate);

    // Validate ngày kết thúc không được trước ngày bắt đầu
    if (!task && expiration < start) {
      setError("Expiration date cannot be earlier than start date.");
      return;
    }

    // Nếu không có lỗi, reset lỗi và gọi hàm onSave
    setError("");
    onSave({
      id: task?.id,
      title,
      description,
      startDate: task ? task.startDate : startDate, // Giữ nguyên startDate khi chỉnh sửa
      expirationDate,
      tags,
    });
  };

  // Lấy ngày và giờ hiện tại ở định dạng phù hợp cho thuộc tính `min`
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 10); // Cho phép quay lại tối đa 10 phút
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const date = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${date}T${hours}:${minutes}`; // Định dạng: YYYY-MM-DDTHH:mm
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task ? "Edit Task" : "New Task"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {!task && (
                <input
                  type="datetime-local"
                  className="form-control mb-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={getCurrentDateTime()} // Cho phép quay lại tối đa 10 phút
                  required
                />
              )}
              <input
                type="datetime-local"
                className="form-control mb-2"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                min={task ? task.startDate : startDate || getCurrentDateTime()}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100">
                {task ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;