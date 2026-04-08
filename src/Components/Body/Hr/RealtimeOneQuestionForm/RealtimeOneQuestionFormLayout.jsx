import { useParams } from "react-router-dom";

const RealtimeOneQuestionFormLayout = () => {
  const { setId } = useParams();

  return <div>HR Realtime One - {setId}</div>;
};

export default RealtimeOneQuestionFormLayout;