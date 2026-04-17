import React, { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./store/authSlice";

import HeaderLayout from "./Components/Header/HeaderLayout";
import FooterLayout from "./Components/Footer/FooterLayout";
import { speakSarvam } from "./store/sarvamSlice";
import VoiceFloatingPlayer from "./Components/Common/VoiceFloatingPlayer";



const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Robust Token Refresh Listener
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const serialized = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          token
        };
        dispatch(setUser(serialized));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/coding/playground"
  ];

  const isPublic = publicRoutes.includes(location.pathname);

  if (!user && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  const hideLayout = [
    "/login",
    "/signup",
    "/realtime",
    "/realtime-one",
    "/playground"
  ].some(path => location.pathname.includes(path));

  if (hideLayout) {
    return <Outlet />;
  }

  // test voice
  const testVoice = () => {
    dispatch(
      speakSarvam(
        "Hello, welcome to AI interview platform. Tell me about yourself."
      )
    );
  };

  return (
    <>
      <HeaderLayout />

      <main className="min-h-[80vh] w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* TEST BUTTON */}
      <button
        onClick={testVoice}
        className="fixed bottom-6 left-6 z-50 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold shadow-lg"
      >
        Test Voice
      </button>

      {/* FLOATING VOICE PLAYER */}
      <VoiceFloatingPlayer />
      

      {!location.pathname.startsWith('/coding') && <FooterLayout />}
    </>
  );
};

export default Layout;