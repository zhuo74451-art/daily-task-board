function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "460px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "12px" }}>我的每日任务看板</h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          这是我第一个自己搭起来并上传到 GitHub 的项目。
        </p>

        <div
          style={{
            padding: "16px",
            background: "#f0f4ff",
            borderRadius: "12px",
            marginBottom: "12px",
          }}
        >
          今日重点任务：完成 GitHub、Cursor、React 入门
        </div>

        <div
          style={{
            padding: "16px",
            background: "#f8f8f8",
            borderRadius: "12px",
            marginBottom: "12px",
          }}
        >
          当前进度：项目已经成功运行并推送到 GitHub
        </div>

        <div
          style={{
            padding: "16px",
            background: "#eefbf3",
            borderRadius: "12px",
          }}
        >
          下一步目标：开始加入任务列表、优先级和日志功能
        </div>
      </div>
    </div>
  );
}

export default App;