import "./App.css";
import Kanban from "./components/Kanban/Kanban";

function App({ $target }) {
  new Kanban({ $target: $target });
}

export default App;
