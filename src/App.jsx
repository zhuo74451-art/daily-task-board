function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "420px",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{ marginTop: 0, marginBottom: "12px" }}>我的每日任务看板</h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          这是我第一个自己跑起来的 React 项目。
        </p>

        <div style={{
          padding: "16px",
          background: "#f0f4ff",
          borderRadius: "12px",
          marginBottom: "12px"
        }}>
          今日重点任务：完成 GitHub 和 Cursor 入门
        </div>

        <div style={{
          padding: "16px",
          background: "#f8f8f8",
          borderRadius: "12px"
        }}>
          当前进度：项目已成功启动
        </div>
      </div>
    </div>
  )
}

export default App