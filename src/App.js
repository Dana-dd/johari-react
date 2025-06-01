import React, { useState } from 'react';
import './App.css';

const questions = [
  "나는 상대방 의견에 공감하면 이를 바로 인정한다.",
  "나는 상대방의 잘못을 지적할 필요가 있을 때에는 직접 말한다.",
  "나는 상대방으로부터 납득하기 어려운 말을 들을 경우, 상황파악을 위한 질문을 하고 잘 들어본다.",
  "나의 의견에 대해 상대방이 어떻게 생각하는지 물어본다.",
  "나는 나의 느낌을 상대방에게 솔직하게 표현한다.",
  "나는 상대방의 감정을 존중한다.",
  "나는 걱정거리가 생길 경우 다른 사람을 찾아가 터놓고 의논한다.",
  "나는 혼자 이야기를 계속하여 상대방을 불안하게 하지 않는다.",
  "나는 진심으로 상대방의 이야기를 들어준다.",
  "나는 누군가가 찾아오면 그의 의견을 듣고, 대화를 독단적으로 끌고 가지 않는다.",
  "나는 상대방이 서운한 점을 표현하면 차분하게 그에게 설명한다.",
  "나는 상대방의 의견을 잘 받아들인다.",
  "나는 달가운 일이 아닐지라도 상대방이 알아야 할 사항이라면 알려준다.",
  "상대방의 의견이 나와 다를 경우, 나의 생각을 말하고 함께 검토해본다.",
  "나는 말하기 거북한 내용이라도 상대방에게 솔직히 말한다.",
  "나는 나의 실수에 대해 상대방에게 변명을 하지 않고 비판에 귀를 기울인다.",
  "나는 상대방에게 있는 그대로를 나타내며 가식이 없는 편이다.",
  "나는 나의 의견에 찬성하지 않는 사람이라도 그의 의견을 끝까지 듣는다.",
  "나는 상대방에게 그의 생각을 편하게 말하도록 권장한다.",
  "내가 옳다고 확신하는 것은 상대방을 잘 설득한다."
];

const App = () => {
  const [scores, setScores] = useState(Array(20).fill(5));
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = parseInt(value, 10);
    setScores(newScores);
  };

  const calculateScores = () => {
    const openScore = scores.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0);  // 홀수: 자기개방
    const feedbackScore = scores.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0); // 짝수: 피드백수용
    const maxScore = 100;

    return {
      x: openScore,
      y: feedbackScore,
      normX: openScore / maxScore,
      normY: feedbackScore / maxScore
    };
  };

  const { x, y, normX, normY } = calculateScores();

  const interpretResults = () => {
    if (x >= 75 && y >= 75)
      return "💡 당신은 매우 개방적이며 피드백도 잘 수용합니다. 이상적인 조하리 창 구조를 보이고 있습니다.";
    if (x >= 75 && y < 75)
      return "📢 자신의 생각은 잘 표현하지만, 타인의 피드백 수용은 부족할 수 있습니다.";
    if (x < 75 && y >= 75)
      return "👂 타인의 의견을 잘 수용하지만, 자신의 감정이나 생각 표현이 부족할 수 있습니다.";
    return "🔒 자신을 드러내는 것과 피드백 수용 모두 개선이 필요합니다.";
  };

  const improvementTips = () => {
    if (x >= 75 && y >= 75)
      return "✅ 현재 상태를 잘 유지하고, 타인에게도 피드백을 적극 권장해보세요.";
    if (x >= 75 && y < 75)
      return "🧘 타인의 피드백을 열린 마음으로 받아들이는 연습이 필요합니다. 예: 비판을 방어하지 않고 듣기.";
    if (x < 75 && y >= 75)
      return "🗣 자신의 감정과 생각을 더 솔직하게 표현해보세요. 예: 자신의 감정을 말로 정확히 전달하기.";
    return "🌱 자기를 표현하고 타인의 의견을 수용하는 연습을 동시에 하세요. 예: 대화 중 감정 표현 및 피드백 요약하기.";
  };

  const quadrantDescription = () => (
    <div className="quadrants">
      <h3>🧭 각 사분면 설명</h3>
      <ul>
        <li><strong>개방 영역:</strong> 나도 알고 남도 아는 나. 관계 형성이 잘 됩니다.</li>
        <li><strong>맹점 영역:</strong> 남은 알지만 나는 모르는 나. 피드백 수용이 필요합니다.</li>
        <li><strong>비밀 영역:</strong> 나만 아는 나. 자기 개방이 필요합니다.</li>
        <li><strong>미지의 영역:</strong> 나도 남도 모르는 나. 경험과 성찰을 통해 탐색할 수 있습니다.</li>
      </ul>
    </div>
  );

  const idealExample = () => (
    <div className="ideal">
      <h3>🌟 이상적인 조하리 창 예시</h3>
      <p>개방 영역이 넓고 다른 영역이 작을수록 관계가 원활합니다. 이를 위해 자기 개방과 피드백 수용을 늘려야 합니다.</p>
    </div>
  );

  return (
    <div className="container">
      <h1>조하리 창 자기진단</h1>
      <p className="instruction">
        아래는 인간관계에서 나타날 수 있는 일반적인 행동양식입니다.<br />
        각 항목이 자신의 행동양식을 얼마나 잘 나타내는지 1~10점으로 표시해 주세요.
      </p>

      <div className="question-grid">
        {questions.map((q, i) => (
          <div key={i} className="question-row">
            <div className="question-number">{i + 1}</div>
            <div className="question-text">{q}</div>
            <div className="slider-container">
              <input type="range" min="0" max="10" value={scores[i]} onChange={(e) => handleChange(i, e.target.value)} />
              <span className="score-display">{scores[i]}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="result-button" onClick={() => setShowResult(true)}>결과 보기</button>

      {showResult && (
        <div className="results-box">
          <h2>📊 결과 요약</h2>
          <p>자기 개방성 점수: <strong>{x}</strong> / 100</p>
          <p>피드백 수용성 점수: <strong>{y}</strong> / 100</p>
          <p className="interpret">{interpretResults()}</p>
          <p className="tip"><strong>개선 팁:</strong> {improvementTips()}</p>

          <div className="canvas">
            <svg width="320" height="320">
              <rect x="0" y="0" width={320 * normX} height={320 * normY} fill="#a1d99b" />
              <rect x={320 * normX} y="0" width={320 * (1 - normX)} height={320 * normY} fill="#fc9272" />
              <rect x="0" y={320 * normY} width={320 * normX} height={320 * (1 - normY)} fill="#fdd0a2" />
              <rect x={320 * normX} y={320 * normY} width={320 * (1 - normX)} height={320 * (1 - normY)} fill="#d9d9d9" />
              <line x1={320 * normX} y1="0" x2={320 * normX} y2="320" stroke="black" strokeDasharray="4" />
              <line x1="0" y1={320 * normY} x2="320" y2={320 * normY} stroke="black" strokeDasharray="4" />
              <text x="10" y="20" fontSize="14" fill="#3f9142">개방 영역</text>
              <text x="220" y="20" fontSize="14" fill="#a63603">맹점 영역</text>
              <text x="10" y="310" fontSize="14" fill="#e6550d">비밀 영역</text>
              <text x="220" y="310" fontSize="14" fill="#636363">미지 영역</text>
            </svg>
          </div>

          {quadrantDescription()}
          {idealExample()}

          <div className="feedback-box">
            <h3>📝 피드백 공유</h3>
            <textarea
              placeholder="느낀 점이나 목표를 입력해보세요"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <p className="thankyou">{feedback && "💬 감사합니다! 입력한 피드백은 로컬에만 저장됩니다."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
