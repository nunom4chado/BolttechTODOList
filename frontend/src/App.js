import { useState } from "react";

import AuthContext from "./auth/context";
import AuthView from "./components/AuthView/AuthLayout";
import NavBar from "./components/Navbar/NavBar";
import ProjectsView from "./components/ProjectsView/ProjectsView";
import authStorage from "./auth/storage";

function App() {
  const [user, setUser] = useState(authStorage.getUser());

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavBar />
      {user ? <ProjectsView /> : <AuthView />}
    </AuthContext.Provider>
  );
}

export default App;
