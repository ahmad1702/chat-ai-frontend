import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  ActionFunction,
  Routes,
  Route,
} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import ChatPage from "./pages";
import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
};

export default App;