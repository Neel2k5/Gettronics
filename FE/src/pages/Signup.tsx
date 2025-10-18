import { useState } from "react";
import Logo from "../components/util/Logo";
import { usePageSelectionStore } from "../global-states/pageSelectionStore";

const Signup = () => {
  const { setPage } = usePageSelectionStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URI}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        alert(data.message || "Signup successful!");
        setPage("LOGIN"); // redirect to login page
      } else {
        console.error("Signup failed:", data.message);
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-[430px] sm:h-[440px] w-[380px] sm:w-[440px] rounded-md flex justify-between flex-col p-4 sm:p-5 bg-white">
        <div className="flex justify-end mt-4">
          <Logo className="h-[40px]" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <div
            onClick={() => setPage("LOGIN")}
            className="hover:text-[#cb3300] cursor-pointer text-[#FF4000]"
          >
            Already have an account? Login.
          </div>

          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#D0D0D0] font-inconsolata text-[25px] text-[#000000] p-2 w-[350px] sm:w-[400px] outline-[#FF4000]"
          />
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#D0D0D0] font-inconsolata text-[25px] text-[#000000] p-2 w-[350px] sm:w-[400px] outline-[#FF4000]"
          />
          <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#D0D0D0] font-inconsolata text-[25px] text-[#000000] p-2 w-[350px] sm:w-[400px] outline-[#FF4000]"
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`bg-[#FF4000] text-[25px] text-white font-kdam-thmor p-2 py-4 w-[350px] sm:w-[400px] ${
              loading ? "opacity-50 cursor-not-allowed" : "active:bg-[#ff8e69] hover:bg-[#bd2f00]"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
