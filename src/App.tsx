import { useEffect, useState } from "react";

function App() {
  const FIVE = 5;
  const [num, setNum] = useState(1);
  const [omr, setOmr] = useState<Array<Array<boolean>>>([
    Array(FIVE).fill(false),
  ]);
  const [answer, setAnswer] = useState<Array<Array<boolean>>>([
    Array(FIVE).fill(false),
  ]);
  const [scoreList, setScoreList] = useState([FIVE]);
  const [score, setScore] = useState(0);
  const [home, setHome] = useState(true);
  const changeOMR = (i: number, j: number) => {
    const tmp = omr.map((row, p) =>
      row.map((li, q) => (p === i && q === j ? !li : li))
    );
    setOmr(tmp);
    setScore(calcScore(tmp));
  };
  const reset = (n: number) => {
    setOmr(Array(n).fill(Array(FIVE).fill(false)));
    setScore(0);
  };
  const changeAnswer = (i: number, j: number) => {
    const tmp = answer.map((row, p) =>
      row.map((li, q) => (p === i && q === j ? !li : li))
    );
    setAnswer(tmp);
    reset(num);
  };
  const addAnswer = () => {
    if (num < 10) {
      setNum((n) => n + 1);
      const tmp = answer;
      tmp.push(Array(FIVE).fill(false));
      setAnswer(tmp);
      const sl = scoreList;
      sl.push(FIVE);
      setScoreList(sl);
    }
  };
  const subAnswer = () => {
    if (num > 1) {
      setNum((n) => n - 1);
      const tmp = answer;
      tmp.pop();
      setAnswer(tmp);
      const sl = scoreList;
      sl.pop();
      setScoreList(sl);
    }
  };
  const changeScore = (s: number, i: number) => {
    if (s % FIVE === 0) {
      const tmp = scoreList.map((li, p) => (p === i ? s : li));
      setScoreList(tmp);
      reset(num);
    }
  };
  const calcScore = (list: Array<Array<boolean>>) => {
    let res = 0;
    for (let i = 0; i < num; i++) {
      let tmp = 0;
      let zero = true;
      for (let j = 0; j < FIVE; j++) {
        if (list[i][j]) zero = false;
        if (list[i][j] === answer[i][j]) tmp += scoreList[i] / FIVE;
      }
      if (zero) tmp = 0;
      res += tmp;
    }
    return res;
  };
  useEffect(() => {
    reset(num);
  }, [num]);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {home ? (
        <>
          <div className="w-full h-20 flex items-center justify-center relative">
            <button
              onClick={() => {
                setHome(false);
              }}
              className="bg-orange-400 text-white rounded-[10px] p-3 absolute right-2"
            >
              답 설정
            </button>
            <div className="font-bold text-[50px]">{score}</div>
          </div>
          <div className="w-full flex flex-col items-center">
            {omr.map((l, i) => (
              <div
                key={i}
                className="w-[300px] flex items-center justify-between p-2"
              >
                {l.map((stat, j) => (
                  <button
                    key={j}
                    onClick={() => {
                      changeOMR(i, j);
                    }}
                    className="w-10 h-10 rounded-full border border-black border-solid"
                    style={{ backgroundColor: stat ? "black" : "white" }}
                  ></button>
                ))}
              </div>
            ))}
          </div>
          <div className="h-[20px]"></div>
          <button
            onClick={() => {
              reset(num);
            }}
            className="p-3 rounded-[10px] font-bold text-[18px] text-white bg-orange-400"
          >
            초기화
          </button>
          <div className="flex-grow"></div>
        </>
      ) : (
        <>
          <div className="w-full h-20 flex shrink-0 items-center justify-center relative">
            <button
              onClick={() => {
                setHome(true);
              }}
              className="bg-orange-400 text-white rounded-[10px] p-3 absolute right-2"
            >
              X
            </button>
            <button
              onClick={subAnswer}
              className="w-10 h-10 bg-orange-400 text-white text-[18px] font-bold rounded-[10px] flex items-center justify-center"
            >
              -
            </button>
            <div className="w-10"></div>
            <button
              onClick={addAnswer}
              className="w-10 h-10 bg-orange-400 text-white text-[18px] font-bold rounded-[10px] flex items-center justify-center"
            >
              +
            </button>
          </div>
          <div className="w-full h-full flex flex-col items-center">
            {answer.map((l, i) => (
              <div
                key={i}
                className="w-[300px] flex items-center justify-between p-2"
              >
                {l.map((stat, j) => (
                  <button
                    key={j}
                    onClick={() => {
                      changeAnswer(i, j);
                    }}
                    className="w-10 h-10 rounded-full border border-black border-solid"
                    style={{ backgroundColor: stat ? "black" : "white" }}
                  ></button>
                ))}
                <div className="h-10 rounded-[1px] border-y border-l border-black border-solid flex">
                  <button
                    onClick={() => {
                      changeScore(FIVE, i);
                    }}
                    className="relative h-full w-[20px] flex items-center justify-center text-white text-[12px] bg-orange-400 border-r border-black border-solid"
                    style={{
                      opacity: scoreList[i] === FIVE ? 1 : 0.6,
                    }}
                  >
                    <div className="absolute top-[2px] text-black text-[10px]">
                      {scoreList[i] === FIVE ? "v" : ""}
                    </div>
                    {FIVE}
                  </button>
                  <button
                    onClick={() => {
                      changeScore(FIVE * 2, i);
                    }}
                    className="relative h-full w-[20px] flex items-center justify-center text-white text-[12px] bg-orange-400 border-r border-black border-solid"
                    style={{
                      opacity: scoreList[i] === FIVE * 2 ? 1 : 0.6,
                    }}
                  >
                    <div className="absolute top-1 text-black text-[10px]">
                      {scoreList[i] === FIVE * 2 ? "v" : ""}
                    </div>
                    {FIVE * 2}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
