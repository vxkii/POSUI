
// import React, { useState } from "react";
// import "../../css/Login.css";
// import sanjay2 from "../../img/sanjay2.jpeg"

 
// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!username.trim() || !password) {
//       alert("Please enter username and password");
//       return;
//     }

//     // Connect your backend login API here
//     console.log({
//       username,
//       password,
//       rememberMe,
//     });
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>Login</h1>
//           <p>Welcome back! Please login to your account.</p>
//           <img src={sanjay2} alt="" style={{width:500,height:500}} />
//         </div>

//         <div className="login-divider"></div>

//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <span className="input-icon">♙</span>
//             <input
//               type="text"
//               placeholder="Username or Email"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               autoComplete="username"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <span className="input-icon">♙</span>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//               required
//             />

//             <button
//               type="button"
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>


//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//         <div className="login-divider footer-divider"></div>

//         <p className="signup-text">
//          @2026 POS Management
//         </p>
//       </div>
//     </div>
//   );
// }

