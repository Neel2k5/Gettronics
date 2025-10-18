import navArrow from "../../assets/NavArrow.svg";
import type { LogoProp } from "../../types/LogoProps";
const NavArrow = ({
  width = "auto",
  height = "40px",
  className = "",
}: LogoProp) => {
  return (
    <div>
      <img
        style={{ height, width }}
        className={className}
        src={navArrow}
        alt="Logo"
      />
    </div>
  );
};

export default NavArrow;
