import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "daily-task-board-v2";

const initialTasks = [
  {
    id: 1,
    title: "完成 GitHub 和 Cursor 入门",
    priority: "高",
    status: "进行中",
    progress: 60,
    category: "学习",
    log: "今天已经完成项目创建、Git 提交和 GitHub 推送。",
    createdAt: Date.now() - 3000,
  },
  {
    id: 2,
    title: "搭建每日任务看板基础页面",
    priority: "高",
    status: "已完成",
    progress: 100,
    category: "项目",
    log: "基础页面已经跑通，并完成首轮 UI 替换。",
    createdAt: Date.now() - 2000,
  },
  {
    id: 3,
    title: "学习 React 最基础的数据展示",
    priority: "中",
    status: "待开始",
    progress: 0,
    category: "学习",
    log: "下一步重点理解 state、map 和事件处理。",
    createdAt: Date.now() - 1000,
  },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("中");
  const [category, setCategory] = useState("学习");
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("全部");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesStatus =
        filterStatus === "全部" ? true : task.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchText, filterStatus]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((task) => task.status === "已完成").length;
    const doing = tasks.filter((task) => task.status === "进行中").length;
    const todo = tasks.filter((task) => task.status === "待开始").length;
    return { total, done, doing, todo };
  }, [tasks]);

  function resetForm() {
    setTitle("");
    setPriority("中");
    setCategory("学习");
    setEditingId(null);
  }

  function handleSubmit() {
    if (!title.trim()) return;

    if (editingId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title,
                priority,
                category,
              }
            : task
        )
      );
      resetForm();
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      priority,
      category,
      status: "待开始",
      progress: 0,
      log: "刚创建，下一步开始推进。",
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    resetForm();
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) resetForm();
  }

  function handleEdit(task) {
    setTitle(task.title);
    setPriority(task.priority);
    setCategory(task.category);
    setEditingId(task.id);
  }

  function handleStatusChange(id) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        if (task.status === "待开始") {
          return {
            ...task,
            status: "进行中",
            progress: task.progress === 0 ? 25 : task.progress,
            log: "任务已开始推进。",
          };
        }

        if (task.status === "进行中") {
          return {
            ...task,
            status: "已完成",
            progress: 100,
            log: "任务已完成。",
          };
        }

        return {
          ...task,
          status: "待开始",
          progress: 0,
          log: "任务重新打开，等待开始。",
        };
      })
    );
  }

  function handleProgressChange(id, delta) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        const nextProgress = Math.max(0, Math.min(100, task.progress + delta));

        let nextStatus = task.status;
        if (nextProgress === 0) nextStatus = "待开始";
        else if (nextProgress === 100) nextStatus = "已完成";
        else nextStatus = "进行中";

        return {
          ...task,
          progress: nextProgress,
          status: nextStatus,
          log: `任务进度已更新到 ${nextProgress}%。`,
        };
      })
    );
  }

  function handlePriorityQuickChange(id, nextPriority) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, priority: nextPriority, log: `优先级已调整为${nextPriority}。` }
          : task
      )
    );
  }

  function handleLogChange(id, value) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, log: value } : task))
    );
  }

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { 高: 0, 中: 1, 低: 2 };
    const byPriority = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (byPriority !== 0) return byPriority;
    return b.createdAt - a.createdAt;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef4ff 0%, #f7f9fc 100%)",
        padding: "32px 20px 60px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  color: "#4f46e5",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                每日作战面板
              </div>
              <h1 style={{ margin: 0, fontSize: "34px" }}>我的每日任务看板</h1>
              <p
                style={{
                  color: "#6b7280",
                  marginTop: "12px",
                  marginBottom: 0,
                  lineHeight: 1.7,
                }}
              >
                现在这个版本已经支持新增、编辑、删除、优先级调整、状态切换、进度管理、任务日志、搜索筛选和本地保存。
              </p>
            </div>
            <div
              style={{
                minWidth: "220px",
                background: "#f8fbff",
                border: "1px solid #e6eefc",
                borderRadius: "18px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  marginBottom: "10px",
                }}
              >
                今日摘要
              </div>
              <div style={{ fontSize: "15px", lineHeight: 1.8 }}>
                总任务：{stats.total}
                <br />
                待开始：{stats.todo}
                <br />
                进行中：{stats.doing}
                <br />
                已完成：{stats.done}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
              alignSelf: "start",
            }}
          >
            <h2 style={{ marginTop: 0 }}>任务表单</h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              先把任务写清楚，再决定优先级。别追求一次做很多，先把最重要的一件事往前推。
            </p>

            <div style={{ display: "grid", gap: "14px", marginTop: "18px" }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="输入任务名称"
                style={inputStyle}
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={inputStyle}
              >
                <option value="高">高优先级</option>
                <option value="中">中优先级</option>
                <option value="低">低优先级</option>
              </select>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
              >
                <option value="学习">学习</option>
                <option value="项目">项目</option>
                <option value="工作">工作</option>
                <option value="生活">生活</option>
              </select>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={handleSubmit} style={primaryButtonStyle}>
                  {editingId ? "保存修改" : "新增任务"}
                </button>
                <button onClick={resetForm} style={secondaryButtonStyle}>
                  重置表单
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>任务列表</h2>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="搜索任务"
                  style={{ ...inputStyle, minWidth: "180px", margin: 0 }}
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ ...inputStyle, minWidth: "140px", margin: 0 }}
                >
                  <option value="全部">全部状态</option>
                  <option value="待开始">待开始</option>
                  <option value="进行中">进行中</option>
                  <option value="已完成">已完成</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {sortedTasks.length === 0 ? (
                <div
                  style={{
                    padding: "24px",
                    background: "#f8fafc",
                    borderRadius: "16px",
                    color: "#64748b",
                  }}
                >
                  当前没有匹配的任务。
                </div>
              ) : (
                sortedTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "18px",
                      padding: "18px",
                      background: "#fbfdff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            marginBottom: "8px",
                          }}
                        >
                          {task.title}
                        </div>
                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: "14px",
                            lineHeight: 1.8,
                          }}
                        >
                          分类：{task.category} ｜ 优先级：{task.priority} ｜ 状态：
                          {task.status}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleEdit(task)}
                          style={secondaryButtonStyle}
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          style={dangerButtonStyle}
                        >
                          删除
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: "14px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          marginBottom: "8px",
                          color: "#475569",
                        }}
                      >
                        当前进度：{task.progress}%
                      </div>
                      <div
                        style={{
                          height: "10px",
                          background: "#e5e7eb",
                          borderRadius: "999px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${task.progress}%`,
                            height: "100%",
                            background:
                              "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginTop: "14px",
                      }}
                    >
                      <button
                        onClick={() => handleStatusChange(task.id)}
                        style={secondaryButtonStyle}
                      >
                        切换状态
                      </button>
                      <button
                        onClick={() => handleProgressChange(task.id, 10)}
                        style={secondaryButtonStyle}
                      >
                        进度 +10%
                      </button>
                      <button
                        onClick={() => handleProgressChange(task.id, -10)}
                        style={secondaryButtonStyle}
                      >
                        进度 -10%
                      </button>
                      <button
                        onClick={() => handlePriorityQuickChange(task.id, "高")}
                        style={secondaryButtonStyle}
                      >
                        设为高优先级
                      </button>
                      <button
                        onClick={() => handlePriorityQuickChange(task.id, "中")}
                        style={secondaryButtonStyle}
                      >
                        设为中优先级
                      </button>
                      <button
                        onClick={() => handlePriorityQuickChange(task.id, "低")}
                        style={secondaryButtonStyle}
                      >
                        设为低优先级
                      </button>
                    </div>

                    <div style={{ marginTop: "14px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#475569",
                          marginBottom: "8px",
                        }}
                      >
                        任务日志
                      </div>
                      <textarea
                        value={task.log}
                        onChange={(e) => handleLogChange(task.id, e.target.value)}
                        placeholder="记录任务推进到哪里、卡在哪里、下一步做什么"
                        style={{
                          width: "100%",
                          minHeight: "88px",
                          borderRadius: "14px",
                          border: "1px solid #dbe3ef",
                          padding: "12px",
                          fontSize: "14px",
                          resize: "vertical",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid #dbe3ef",
  fontSize: "15px",
  boxSizing: "border-box",
  background: "#fcfdff",
};

const primaryButtonStyle = {
  padding: "12px 16px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
  color: "#ffffff",
  fontSize: "15px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "10px 14px",
  border: "1px solid #dbe3ef",
  borderRadius: "12px",
  background: "#ffffff",
  color: "#334155",
  fontSize: "14px",
  cursor: "pointer",
};

const dangerButtonStyle = {
  padding: "10px 14px",
  border: "none",
  borderRadius: "12px",
  background: "#ef4444",
  color: "#ffffff",
  fontSize: "14px",
  cursor: "pointer",
};

export default App;