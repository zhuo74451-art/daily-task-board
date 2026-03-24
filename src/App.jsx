const tasks = [
  {
    id: 1,
    title: "完成 GitHub 和 Cursor 入门",
    priority: "高",
    status: "进行中",
  },
  {
    id: 2,
    title: "搭建每日任务看板基础页面",
    priority: "高",
    status: "已完成",
  },
  {
    id: 3,
    title: "学习 React 最基础的数据展示",
    priority: "中",
    status: "待开始",
  },
];

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <h1 style={{ marginTop: 0, marginBottom: "12px" }}>我的每日任务看板</h1>
          <p style={{ color: "#666", marginBottom: 0 }}>
            这是我第一个自己搭起来、能运行、能上传 GitHub 的项目。
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "20px" }}>今日任务</h2>

          <div style={{ display: "grid", gap: "12px" }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: "16px",
                  background: "#f8faff",
                  borderRadius: "14px",
                  border: "1px solid #e6ecf5",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
                  {task.title}
                </div>
                <div style={{ color: "#555", fontSize: "14px" }}>
                  优先级：{task.priority} ｜ 状态：{task.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;