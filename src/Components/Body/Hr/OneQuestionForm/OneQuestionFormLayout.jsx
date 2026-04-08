import { useParams } from "react-router-dom";

const OneQuestionFormLayout = () => {
  const { setId } = useParams();

  return <div>HR One Question - {setId}</div>;
};

export default OneQuestionFormLayout;