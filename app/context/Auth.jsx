// "use client";

// import { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext(null);
// const { Provider } = AuthContext;

// const useAuth = () => {
//   const auth = useContext(AuthContext);
//   return auth;
// };

// const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     token: "",
//     user: {},
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));
//     setAuthState({ token, user });
//   }, []);

//   const setUserAuthInfo = (data) => {
//     const token = localStorage.setItem("token", data.token);
//     const user = localStorage.setItem("user", JSON.stringify(data.user));
//     setAuthState({ token, user });
//   };

//   const isUserAuthenticated = () => {
//     return !!authState.token;
//   };

//   return (
//     <Provider
//       value={{
//         authState,
//         setUserAuthInfo,
//         isUserAuthenticated,
//       }}
//     >
//       {children}
//     </Provider>
//   );
// };

// export { AuthProvider, useAuth };

"use client";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: "",
    user: null,
  });

  // ✅ Load auth data once on app start (for refresh persistence)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuthState({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  // ✅ IMPORTANT: only update React state here
  const setUserAuthInfo = ({ token, user }) => {
    setAuthState({ token, user });
  };

  const isUserAuthenticated = () => {
    return !!authState.token;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setUserAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
