import { Link } from "react-router-dom"

const AddTo = () => {

  return (<div className="w-[100vp] mx-[38%] mt-[150px]">
    <h1 className="text-2xl font-bold ">Please Add Some Thing</h1>
    <Link to="/"><button className="mx-12 rounded-2xl mt-4 bg-green-600 text-lg px-3 text-white cursor-pointer py-2">Add Something</button></Link>
  </div>)
}

export default AddTo