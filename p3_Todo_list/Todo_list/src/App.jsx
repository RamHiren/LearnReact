import { useRef, useState } from 'react'
import './App.css'

function App() {
    const [name, setName] = useState("");
    const [activities, setActivities] = useState([]);
    const inputEle = useRef("");

    const setInputChange = (e) => {
        setName(e.target.value)
    };

    const ActivityAdd = () => {
        if (name) {
            setActivities([...activities, { name, completed: false }]);
            setName("");
            inputEle.current.focus(); //focus of input field after adding activity
        }
    };

    const handleClick = (index) => {
        setActivities(activities.map((act, i) =>
            i === index ? { ...act, completed: !act.completed } : act
        ));
    };

    const handleDelete = (index) => {
        setActivities(activities.filter((act, i) => i !== index));
    };

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen min-w-full flex items-center justify-center">
                <div className='h-[80vh] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-900 p-7 rounded-xl shadow-lg sm:mx-4 sm:my-6'>
                    <div className="flex w-full items-center mb-6">
                        <input
                            ref={inputEle}
                            type="text"
                            placeholder='Add Your Activity'
                            className="outline-none flex-grow p-3 my-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-indigo-500"
                            value={name}
                            onChange={setInputChange}
                        />
                        <button
                            className="p-3 px-5 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition duration-300"
                            onClick={ActivityAdd}
                        >
                            Add
                        </button>
                    </div>

                    <ul className="text-white space-y-4">
                        {activities.map((activity, index) => (
                            <li
                                key={index}
                                className={`p-3 flex justify-between items-center rounded-lg ${activity.completed ? 'bg-green-500' : 'bg-gray-800'} hover:bg-gray-700 transition duration-200`}
                            >
                                <span className={`flex-grow ${activity.completed ? 'line-through text-gray-300' : ''}`}>
                                    {activity.name}
                                </span>
                                <div className="flex space-x-3">
                                    <button
                                        className="text-white hover:text-green-400"
                                        onClick={() => handleClick(index)}
                                    >
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                    <button
                                        className="text-white hover:text-red-400"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default App
