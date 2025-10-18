import NavBar from "./components/util/NavBar"
import { usePageSelectionStore } from "./global-states/pageSelectionStore"
import { PageMap } from "./pages/PageMap";
function App() {

  const currentPage = usePageSelectionStore((state)=>state.currentPage);
  return (
    <div className="flex flex-col">
      <div className="z-[999]">

      <NavBar/>
      </div>
      <div className={`bg-[#C8C8C8] h-[calc(100vh-60px)] w-screen`}>
          {PageMap[currentPage]}
      </div>
    </div>
  )
}

export default App
