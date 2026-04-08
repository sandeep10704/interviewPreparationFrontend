import { useParams } from "react-router-dom";

const QuestionFormLayout = () => {
  const { setId } = useParams();

  return <div>HR Question Form - {setId}</div>;
};

export default QuestionFormLayout;