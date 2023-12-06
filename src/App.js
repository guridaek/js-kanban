import "./App.css";
import Kanban from "./components/Kanban/Kanban";

function App({ $target }) {
  const kanban = new Kanban({ $target: $target });
}

export default App;
