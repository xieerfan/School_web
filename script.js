// 获取免责声明按钮和内容区域
const disclaimerOverlay = document.getElementById('disclaimerOverlay');
const agreeButton = document.getElementById('agreeButton');
const mainContent = document.getElementById('mainContent');

// 展示主内容，隐藏免责声明
agreeButton.addEventListener('click', () => {
  disclaimerOverlay.style.display = 'none';
  mainContent.style.display = 'block';
});

// 播放抽签逻辑
async function drawOnce() {
  const video = document.getElementById('drawVideo');
  const resultOverlay = document.getElementById('resultOverlay');
  const resultText = document.getElementById('resultText');

  // 播放视频
  video.play();

  // 等待视频播放结束
  video.onended = async () => {
    try {
      // 从外部 JSON 文件加载学生数据
      const response = await fetch('students.json');
      const students = await response.json();

      // 获取符合权重条件的学生
      const weightedStudents = getWeightedStudents(students);
      const randomIndex = Math.floor(Math.random() * weightedStudents.length);
      const drawnStudentId = weightedStudents[randomIndex].id;

      // 使用动画效果显示抽签结果
      resultText.innerText = drawnStudentId;
      resultOverlay.style.display = 'flex';
      resultOverlay.style.transform = 'scale(0.5)'; // 初始缩小
      setTimeout(() => {
        resultOverlay.style.transform = 'scale(1.2)'; // 放大效果
      }, 100);
      setTimeout(() => {
        resultOverlay.style.transform = 'scale(1)'; // 恢复正常大小
      }, 300);
    } catch (error) {
      console.error('加载学生数据失败:', error);
    }
  };
}

// 自动抽组逻辑
async function drawGroup() {
  const video = document.getElementById('drawVideo');
  const resultOverlay = document.getElementById('resultOverlay');
  const resultText = document.getElementById('resultText');

  // 播放视频
  video.play();

  // 等待视频播放结束
  video.onended = async () => {
    try {
      // 随机抽取组号（1到8组）
      const groupNumber = Math.floor(Math.random() * 8) + 1;

      // 使用动画效果显示抽组结果
      resultText.innerText = `第${groupNumber}组`;
      resultOverlay.style.display = 'flex';
      resultOverlay.style.transform = 'scale(0.5)'; // 初始缩小
      setTimeout(() => {
        resultOverlay.style.transform = 'scale(1.2)'; // 放大效果
      }, 100);
      setTimeout(() => {
        resultOverlay.style.transform = 'scale(1)'; // 恢复正常大小
      }, 300);
    } catch (error) {
      console.error('抽组失败:', error);
    }
  };
}

// 返回主页面
function goBack() {
  const resultOverlay = document.getElementById('resultOverlay');
  resultOverlay.style.display = 'none';

  // 停止并重置视频播放
  const video = document.getElementById('drawVideo');
  video.pause();
  video.currentTime = 0;
}

// 根据权重筛选学生
function getWeightedStudents(students) {
  const date = new Date();
  const weekOfMonth = Math.ceil(date.getDate() / 7);
  return students.filter(student => {
    if (student.weight === -4) return false;
    if (student.weight === -3) return weekOfMonth === 1;
    if (student.weight === -2) return weekOfMonth === 1 || weekOfMonth === 2;
    if (student.weight === -1) return weekOfMonth === 1;
    return true;
  });
}



