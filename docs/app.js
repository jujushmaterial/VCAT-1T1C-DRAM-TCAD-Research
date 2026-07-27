const stateLabels = {
  waiting: "대기",
  "in-progress": "진행 중",
  review: "검토 중",
  completed: "완료",
  blocked: "문제 발생",
  locked: "선행 단계 대기"
};

let allPhases = [];
let activeFilter = "all";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "기록 없음";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function phaseCard(phase) {
  const assignee = phase.assignees?.length ? phase.assignees.join(", ") : "미정";
  return `
    <article class="phase-card" data-state="${phase.state}" data-phase-id="${phase.id}">
      <div class="phase-card__top">
        <span class="phase-number">P${phase.id}</span>
        <span class="status-chip">${stateLabels[phase.state] ?? phase.state}</span>
      </div>
      <h3>${escapeHtml(phase.title)}</h3>
      <p class="phase-card__tool">${escapeHtml(phase.tool)}</p>
      <p class="phase-card__reason">${escapeHtml(phase.reason)}</p>
      <div class="metric-row">
        <div class="metric-row__labels">
          <span>작업·결과물 진행률</span>
          <strong>${phase.progress}%</strong>
        </div>
        <div class="progress"><span style="width:${phase.progress}%"></span></div>
      </div>
      <div class="phase-card__meta">
        <span>담당 ${escapeHtml(assignee)}</span>
        <span>${phase.tasksDone + phase.outputsDone}/${phase.tasksTotal + phase.outputsTotal} 확인</span>
      </div>
      <div class="phase-card__actions">
        <button class="btn detail-button" data-phase-id="${phase.id}">내용 보기</button>
        <a class="btn btn--primary" href="${phase.issueUrl}" target="_blank" rel="noreferrer">작업 체크</a>
      </div>
    </article>`;
}

function renderPhases() {
  const grid = document.querySelector("#phase-grid");
  const filtered = activeFilter === "all"
    ? allPhases
    : allPhases.filter((phase) => phase.state === activeFilter);

  grid.innerHTML = filtered.length
    ? filtered.map(phaseCard).join("")
    : '<div class="empty">해당 상태의 단계가 없습니다.</div>';

  document.querySelectorAll(".detail-button").forEach((button) => {
    button.addEventListener("click", () => openDialog(Number(button.dataset.phaseId)));
  });
}

function updateSummary(statusData) {
  const progress = Number(statusData.overallProgress ?? 0);
  document.querySelector("#overall-progress").textContent = `${progress}%`;
  document.querySelector("#overall-progress-bar").style.width = `${progress}%`;
  document.querySelector("#last-updated").textContent = `최근 반영 ${formatDate(statusData.generatedAt)}`;

  const states = allPhases.map((phase) => phase.state);
  document.querySelector("#count-all").textContent = allPhases.length;
  document.querySelector("#count-progress").textContent = states.filter((state) => state === "in-progress").length;
  document.querySelector("#count-review").textContent = states.filter((state) => state === "review" || state === "completed").length;
  document.querySelector("#count-waiting").textContent = states.filter((state) => state === "waiting" || state === "locked").length;
}

function openDialog(id) {
  const phase = allPhases.find((item) => item.id === id);
  if (!phase) return;

  const assignee = phase.assignees?.length ? phase.assignees.join(", ") : "미정";
  const dialog = document.querySelector("#phase-dialog");
  document.querySelector("#dialog-content").innerHTML = `
    <span class="dialog-phase">PHASE ${phase.id} · ${stateLabels[phase.state] ?? phase.state}</span>
    <h2>${escapeHtml(phase.title)}</h2>
    <p><strong>사용 도구:</strong> ${escapeHtml(phase.tool)}</p>
    <div class="dialog-progress">
      <div class="metric-row__labels"><span>전체 진행률</span><strong>${phase.progress}%</strong></div>
      <div class="progress" data-state="${phase.state}"><span style="width:${phase.progress}%"></span></div>
    </div>
    <div class="dialog-section">
      <h3>과정의 이유</h3>
      <p>${escapeHtml(phase.reason)}</p>
    </div>
    <div class="dialog-section">
      <h3>다음 과정</h3>
      <p>${escapeHtml(phase.next)}</p>
    </div>
    <div class="dialog-section">
      <h3>현재 기록</h3>
      <p>담당자: ${escapeHtml(assignee)}<br>
      해야 할 것: ${phase.tasksDone}/${phase.tasksTotal}<br>
      결과물: ${phase.outputsDone}/${phase.outputsTotal}<br>
      최근 수정: ${formatDate(phase.updatedAt)}</p>
    </div>
    <div class="dialog-actions">
      <a class="btn btn--primary" href="${phase.issueUrl}" target="_blank" rel="noreferrer">GitHub 공동 체크리스트 열기</a>
    </div>`;
  dialog.showModal();
}

async function loadDashboard() {
  try {
    const [definitionResponse, statusResponse] = await Promise.all([
      fetch("data/phases.json", { cache: "no-store" }),
      fetch("data/status.json", { cache: "no-store" })
    ]);

    if (!definitionResponse.ok || !statusResponse.ok) {
      throw new Error("대시보드 데이터를 불러오지 못했습니다.");
    }

    const definitions = await definitionResponse.json();
    const statusData = await statusResponse.json();
    const statusMap = new Map(statusData.phases.map((phase) => [phase.id, phase]));

    allPhases = definitions.phases.map((phase) => ({
      ...phase,
      state: "waiting",
      progress: 0,
      tasksDone: 0,
      tasksTotal: 0,
      outputsDone: 0,
      outputsTotal: 0,
      assignees: [],
      updatedAt: null,
      ...(statusMap.get(phase.id) ?? {})
    }));

    updateSummary(statusData);
    renderPhases();
  } catch (error) {
    console.error(error);
    document.querySelector("#phase-grid").innerHTML = `
      <div class="empty">대시보드 데이터를 불러오지 못했습니다.<br>GitHub 저장소의 Issue에서 체크리스트를 확인해 주세요.</div>`;
    document.querySelector("#last-updated").textContent = "상태 불러오기 실패";
  }
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderPhases();
  });
});

document.querySelector("#dialog-close").addEventListener("click", () => {
  document.querySelector("#phase-dialog").close();
});

document.querySelector("#phase-dialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

loadDashboard();
