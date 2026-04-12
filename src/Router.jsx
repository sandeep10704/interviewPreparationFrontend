import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Loading from "./Components/Common/Loading";


const BodyLayout = lazy(() => import("./Components/Body/BodyLayout"));
const HomeLayout = lazy(() => import("./Components/Body/Home/HomeLayout"));
const HrLayout = lazy(() => import("./Components/Body/Hr/HrLayout"));
const TechnicalLayout = lazy(() => import("./Components/Body/Technical/TechnicalLayout"));
const CodingLayout = lazy(() => import("./Components/Body/Coding/CodingLayout"));
const ProfileLayout = lazy(() => import("./Components/Body/Profile/ProfileLayout"));


const HrQuestionForm = lazy(() => import("./Components/Body/Hr/QuestionForm/QuestionFormLayout"));
const HrOneQuestion = lazy(() => import("./Components/Body/Hr/OneQuestionForm/OneQuestionFormLayout"));
const HrRealtime = lazy(() => import("./Components/Body/Hr/RealtimeQuestionForm/RealtimeQuestionFormLayout"));
const HrRealtimeOne = lazy(() => import("./Components/Body/Hr/RealtimeOneQuestionForm/RealtimeOneQuestionFormLayout"))

const TechQuestionForm = lazy(() => import("./Components/Body/Technical/QuestionForm/QuestionFormLayout"));
const TechOneQuestion = lazy(() => import("./Components/Body/Technical/OneQuestionForm/OneQuestionFormLayout"));
const TechRealtime = lazy(() => import("./Components/Body/Technical/RealtimeQuestionForm/RealtimeQuestionFormLayout"));
const TechRealtimeOne = lazy(() => import("./Components/Body/Technical/RealtimeOneQuestionForm/RealtimeOneQuestionFormLayout"));


const NormalLayout = lazy(() => import("./Components/Body/Coding/Normal/NormalLayout"));
const RealtimeLayout = lazy(() => import("./Components/Body/Coding/Realtime/RealtimeLayout"));
const PlaygroundLayout = lazy(() => import("./Components/Body/Coding/Playground/PlaygroundLayout"));


const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Singup"));

const suspenseWrapper = (element) => (
    <Suspense fallback={<Loading />}>
        {element}
    </Suspense>
);

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: suspenseWrapper(<BodyLayout />),
                children: [
                    {
                        index: true,
                        element: suspenseWrapper(<HomeLayout />)
                    },
                    {
                        path: "profile",
                        element: suspenseWrapper(<ProfileLayout />)
                    },
                    // -------- HR --------
                    {
                        path: "hr",
                        element: suspenseWrapper(<HrLayout />),
                        children: [
                            {
                                path: ":setId/question-form",
                                element: suspenseWrapper(<HrQuestionForm />)
                            },
                            {
                                path: ":setId/one-question",
                                element: suspenseWrapper(<HrOneQuestion />)
                            },
                            {
                                path: ":setId/realtime",
                                element: suspenseWrapper(<HrRealtime />)
                            },
                            {
                                path: ":setId/realtime-one",
                                element: suspenseWrapper(<HrRealtimeOne />)
                            }
                        ]
                    },
                    // -------- TECHNICAL --------
                    {
                        path: "technical",
                        element: suspenseWrapper(<TechnicalLayout />),
                        children: [
                            {
                                path: ":setId/question-form",
                                element: suspenseWrapper(<TechQuestionForm />)
                            },
                            {
                                path: ":setId/one-question",
                                element: suspenseWrapper(<TechOneQuestion />)
                            },
                            {
                                path: ":setId/realtime",
                                element: suspenseWrapper(<TechRealtime />)
                            },
                            {
                                path: ":setId/realtime-one",
                                element: suspenseWrapper(<TechRealtimeOne />)
                            }
                        ]
                    },
                    {
                        path: "coding",
                        element: suspenseWrapper(<CodingLayout />),
                        children: [
                            { path: "normal", element: suspenseWrapper(<NormalLayout />) },
                            { path: "realtime", element: suspenseWrapper(<RealtimeLayout />) },
                            { path: "playground", element: suspenseWrapper(<PlaygroundLayout />) }
                        ]
                    }
                ]
            },
            {
                path: "login",
                element: suspenseWrapper(<Login />)
            },
            {
                path: "signup",
                element: suspenseWrapper(<Signup />)
            }
        ]
    }
]);

export default Router;