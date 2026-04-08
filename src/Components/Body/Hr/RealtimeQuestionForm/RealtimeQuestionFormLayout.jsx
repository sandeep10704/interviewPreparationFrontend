import { useParams } from "react-router-dom";

const RealtimeQuestionFormLayout = () => {
  const { setId } = useParams();

  return <div>HR Realtime - {setId}</div>;
};

export default RealtimeQuestionFormLayout;