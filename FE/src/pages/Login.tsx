import { useState } from "react";
import Logo from "../components/util/Logo";
import { usePageSelectionStore } from "../global-states/pageSelectionStore";

const Login = () => {
  const { setPage } = usePageSelectionStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BE_URI}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // important for JWT cookie
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        setPage("HOME"); // redirect to home page or dashboard
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-[430px] sm:h-[440px]  w-[380px] sm:w-[440px] rounded-md flex justify-between flex-col p-4 sm:p-5 bg-white">
        <div className="flex justify-end mt-4">
          <Logo className="h-[40px]" />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <div
            onClick={() => setPage("SIGNUP")}
            className="hover:text-[#cb3300] cursor-pointer text-[#FF4000]"
          >
            Don't have an account? Signup.
          </div>
          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#D0D0D0] font-inconsolata text-[25px] text-[#000000] p-2 w-[350px] sm:w-[400px] outline-[#FF4000]"
          />
          <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#D0D0D0] font-inconsolata text-[25px] text-[#000000] p-2 w-[350px] sm:w-[400px] outline-[#FF4000]"
          />
          <button
            onClick={handleLogin}
            className="bg-[#FF4000] active:bg-[#ff8e69] hover:bg-[#bd2f00] text-[25px] text-white font-kdam-thmor p-2 py-4 w-[350px] sm:w-[400px]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
