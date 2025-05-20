import React, { useState } from 'react';

const questions = [
  '나의 일에 대해 다른 사람에게서 이런 저런 잔소리를 들으면 기분이 나쁘다.',
  '자기 일을 다른 사람에게 말하는 것은 속이 빈 사람이라는 생각이 든다.',
  '남의 말을 듣고 있는 중, 지루해지면, "말하자면 이런다는 말이지요?"라고 말의 허리를 자르는 일이 많다.',
  '“신비롭다”라는 말을 들을 만큼 자신을 내보이지 않는 것이 좋다.',
  '다른 사람이 무엇이라고 말하건 구애받을 필요는 없다.',
  '하고 싶은 말이 있어도 꼭 참고, 혼자 속으로 처리하는 일이 많다.',
  '다른 사람에게서 여러 가지 상담을 제안 받는 일이 거의 없다.',
  '다른 사람에게서 주의를 받거나 비판을 받으면 무의식적으로 반론하고 싶어진다.',
  '타인의 일이나 의견에 대하여 의논하거나 나의 생각을 말해주지 않는다.',
  '나의 기분이나 생각을 솔직하게 이야기하기보다 애매모호하게 흐리는 경우가 있다.'
];

const App = () => {
  const [scores, setScores] = useState(Array(10).fill(0));

  const handleChange = (index, value) => {
    const updated = [...scores];
    updated[index] = parseInt(value, 10);
    setScores(updated);
  };

  const calculateScores = () => {
    const oddSum = scores.filter((_, i) => i % 2 === 0).reduce((acc, val) => acc + val, 0);
    const evenSum = scores.filter((_, i) => i % 2 === 1).reduce((acc, val) => acc + val, 0);
    const x = 10 - oddSum / 5; // 가로축
    const y = 10 - evenSum / 5; // 세로축
    return { x, y };
  };

  const { x, y } = calculateScores();
  const normX = x / 10;
  const normY = y / 10;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">조하리 창 자기 진단</h1>

      {questions.map((q, i) => (
        <div key={i} className="flex flex-col space-y-2">
          <label className="font-medium">
            {i + 1}. {q}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={scores[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-full"
          />
          <span className="text-sm">선택 점수: {scores[i]}</span>
        </div>
      ))}

      <div className="mt-8 p-4 bg-gray-100 rounded-xl">
        <h2 className="text-xl font-semibold">결과</h2>
        <p>가로축 점수 (자기 개방성): {x.toFixed(2)}</p>
        <p>세로축 점수 (피드백 수용성): {y.toFixed(2)}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">조하리 창 시각화</h2>
        <svg width="300" height="300" className="border border-gray-400">
          <rect x="0" y="0" width={300 * normX} height={300 * normY} fill="#c3f0ca" /> {/* 개방 */}
          <rect x={300 * normX} y="0" width={300 * (1 - normX)} height={300 * normY} fill="#f9d2d2" /> {/* 맹점 */}
          <rect x="0" y={300 * normY} width={300 * normX} height={300 * (1 - normY)} fill="#ffe9b0" /> {/* 비밀 */}
          <rect x={300 * normX} y={300 * normY} width={300 * (1 - normX)} height={300 * (1 - normY)} fill="#e0e0e0" /> {/* 미지 */}

          <line x1={300 * normX} y1="0" x2={300 * normX} y2="300" stroke="black" strokeDasharray="4" />
          <line x1="0" y1={300 * normY} x2="300" y2={300 * normY} stroke="black" strokeDasharray="4" />

          <line x1={300 * normX - 5} y1={300 * normY} x2={300 * normX + 5} y2={300 * normY} stroke="black" strokeWidth="2" />
          <line x1={300 * normX} y1={300 * normY - 5} x2={300 * normX} y2={300 * normY + 5} stroke="black" strokeWidth="2" />

          <text x="10" y="20" fontSize="12">개방 영역</text>
          <text x="220" y="20" fontSize="12">맹점 영역</text>
          <text x="10" y="290" fontSize="12">비밀 영역</text>
          <text x="220" y="290" fontSize="12">미지 영역</text>
        </svg>
      </div>
    </div>
  );
};

export default App;
