import { useState } from "react";

import AuthContext from "./auth/context";
import AuthView from "./components/AuthView/AuthLayout";
import NavBar from "./components/Navbar/NavBar";
import ProjectsView from "./components/ProjectsView/ProjectsView";

function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavBar />
      {user ? <ProjectsView /> : <AuthView />}
    </AuthContext.Provider>
  );
}

export default App;
