import getTronicsLogo from "../../assets/search.svg";
import type { LogoProp } from "../../types/LogoProps";
const SearchIcon = ({
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

export default SearchIcon;
