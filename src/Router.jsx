import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

// layouts
import BodyLayout from "./Components/Body/BodyLayout";
import HomeLayout from "./Components/Body/Home/HomeLayout";
import HrLayout from "./Components/Body/Hr/HrLayout";
import TechnicalLayout from "./Components/Body/Technical/TechnicalLayout";
import CodingLayout from "./Components/Body/Coding/CodingLayout";
import ProfileLayout from "./Components/Body/Profile/ProfileLayout";

// HR children
import HrQuestionForm from "./Components/Body/Hr/QuestionForm/QuestionFormLayout";
import HrOneQuestion from "./Components/Body/Hr/OneQuestionForm/OneQuestionFormLayout";
import HrRealtime from "./Components/Body/Hr/RealtimeQuestionForm/RealtimeQuestionFormLayout";
import HrRealtimeOne from "./Components/Body/Hr/RealtimeOneQuestionForm/RealtimeOneQuestionFormLayout";

// Technical children
import TechQuestionForm from "./Components/Body/Technical/QuestionForm/QuestionFormLayout";
import TechOneQuestion from "./Components/Body/Technical/OneQuestionForm/OneQuestionFormLayout";
import TechRealtime from "./Components/Body/Technical/RealtimeQuestionForm/RealtimeQuestionFormLayout";
import TechRealtimeOne from "./Components/Body/Technical/RealtimeOneQuestionForm/RealtimeOneQuestionFormLayout";

import NormalLayout from "./Components/Body/Coding/Normal/NormalLayout";
import RealtimeLayout from "./Components/Body/Coding/Realtime/RealtimeLayout";
import PlaygroundLayout from "./Components/Body/Coding/Playground/PlaygroundLayout";
// auth
import Login from "./Pages/Login";
import Signup from "./Pages/Singup";

const Router = createBrowserRouter([
{
path: "/",
element: <Layout />,
children: [

{
element: <BodyLayout />,
children: [

{
index: true,
element: <HomeLayout />
},

{
path: "profile",
element: <ProfileLayout />
},

// -------- HR --------
{
path: "hr",
element: <HrLayout />,
children: [
{
path: ":setId/question-form",
element: <HrQuestionForm />
},
{
path: ":setId/one-question",
element: <HrOneQuestion />
},
{
path: ":setId/realtime",
element: <HrRealtime />
},
{
path: ":setId/realtime-one",
element: <HrRealtimeOne />
}
]
},

// -------- TECHNICAL --------
{
path: "technical",
element: <TechnicalLayout />,
children: [
{
path: ":setId/question-form",
element: <TechQuestionForm />
},
{
path: ":setId/one-question",
element: <TechOneQuestion />
},
{
path: ":setId/realtime",
element: <TechRealtime />
},
{
path: ":setId/realtime-one",
element: <TechRealtimeOne />
}
]
},

{
path: "coding",
element: <CodingLayout />,
children: [
{ path: "normal", element: <NormalLayout /> },
{ path: "realtime", element: <RealtimeLayout /> },
{ path: "playground", element: <PlaygroundLayout /> }
]
}

]
},

{
path: "login",
element: <Login />
},
{
path: "signup",
element: <Signup />
}

]
}
]);

export default Router;