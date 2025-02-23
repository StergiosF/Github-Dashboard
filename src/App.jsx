import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import UserProfilePage from "./Pages/UserProfilePage";
import RepositoriesPage from "./Pages/RepositoriesPage";
import FollowersPage from "./Pages/FollowersPage";
import FollowingPage from "./Pages/FollowingPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/profile/:username" element={<UserProfilePage />} />
          <Route path="/repos/:username" element={<RepositoriesPage />} />
          <Route path="/followers/:username" element={<FollowersPage />} />
          <Route path="/following/:username" element={<FollowingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
