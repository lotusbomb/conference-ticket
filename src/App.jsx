
import "tailwindcss"
import './App.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
// import ParentComponent from "../components/ParentComponent"
import Ticket from "../components/Ticket"
import Attendee from "../components/Attendee"
import Confirmation from "../components/Confirmation"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      {/* <ParentComponent/> */}
      {/* <Ticket/> */}
      {/* <Attendee/> */}
      {/* <Confirmation/> */}
      <Hero/>
      {/* <Stepper/> */}
    </>
  )
}

export default App
