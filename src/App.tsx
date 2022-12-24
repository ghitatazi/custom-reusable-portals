import "./App.css";
import { ShowModalButton } from "./components/modals/ShowModalButton";
import { TooltipButton } from "./components/tooltips/TooltipButton";

function App() {
  return (
    <div className="App">
      <TooltipButton
        wording={"show tooltip"}
        content={<div>This is my tooltip content</div>}
      />
      <ShowModalButton
        wording={"show full screen modal"}
        content={<div>This is my modal content</div>}
      />
    </div>
  );
}

export default App;
