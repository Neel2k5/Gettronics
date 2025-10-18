import getTronicsLogo from "../../assets/Gettronics.svg";
import type { LogoProp } from "../../types/LogoProps";
const Logo = ({
  width = "auto",
  height = "40px",
  className = "",
}: LogoProp) => {
  return (
    <div>
      <img
        style={{ height, width }}
        className={className}
        src={getTronicsLogo}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
