import { useState } from "react";

const RealtimeLayout = () => {
  const [questionNo, setQuestionNo] = useState(null);

  return (
    <div>
      <h3>Realtime Coding</h3>

      <button onClick={() => setQuestionNo(1)}>Question 1</button>
      <button onClick={() => setQuestionNo(2)}>Question 2</button>
      <button onClick={() => setQuestionNo(3)}>Question 3</button>

      {questionNo && <h4>Realtime Question No: {questionNo}</h4>}
    </div>
  );
};

export default RealtimeLayout;