class todoTask {
  constructor(task, owner) {
    this.id = new Date().getTime();
    this.task = task;
    this.owner = owner;
    this.isDone = false;
  }

  /*
  task: Nội dung công việc.
  owner: username của người tạo ra task.
  isDone: Task này đã hoàn thành hay chưa.
  Sau đó, bạn cần tạo một mảng todoArr để chứa các Instance tượng trưng cho mỗi task. Và lưu dữ liệu đó xuống dưới LocalStorage.
  
  Mỗi khi người dùng nhấn vào nút để thêm mới một Todo, bạn sẽ xử lý việc lấy dữ liệu từ Input, các trường thông tin sẽ như sau:
  
  task: được lấy từ thẻ input mà người dùng nhập vào.
  owner: Username sẽ lấy theo User hiện đang login vào hệ thống.
  isDone: Khi tạo mới thì mặc định là false.
      */
}
