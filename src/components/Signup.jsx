import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const navigate = useNavigate();

  //handleSubmit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== reEnterPassword) {
        throw new Error('Passwords do not match!');
      }

      if (!gender) {
        return alert('Please select a gender!');
      }

    await axios.post(
        'https://goalgear.onrender.com/signup',
        {
          firstName,
          lastName,
          emailId: email,
          age,
          gender,
          password,
        },
        { withCredentials: true }
      );

      setFirstName('');
      setLastName('');
      setEmail('');
      setAge(0);
      setGender('male');
      setPassword('');
      setReEnterPassword('');
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-10/12 border-2 mx-auto rounded-3xl h-svh overflow-hidden my-5 flex gap-0">
      <div className="w-6/12 relative h-full box-border object-cover">
        <img
          className="w-full h-full object-cover"
          src="/images/Signup2.jpg"
          alt="Signup"
        ></img>
        <div className="absolute w-10/12 top-[25px] left-[0px] bg-black bg-gradient-to-l from-green-800	 py-6 px-4 text-xl rounded-e-full font-bold text-white">
          <h3>
            Join us today and take the first step towards something
            extraordinary!
          </h3>
        </div>
      </div>
      <div className="bg-skyblue w-6/12 flex flex-col justify-center items-center">
        <h1 className="flex justify-center font-bold text-2xl">Signup</h1>
        <div>
          <form className="flex flex-col gap-[3px] justify-center mt-2 ">
            <label className="m-0">First Name </label>
            <input
              className="w-full p-2 pl-1 border-b-[1px] border-black  bg-transparent outline-none m-0 "
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>

            <label>Last Name</label>
            <input
              className="w-full p-2 pl-1 border-b-[1px] border-black  bg-transparent outline-none "
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>

            <label>Email</label>
            <input
              className="w-full p-2 pl-1 border-b-[1px] border-black  bg-transparent outline-none "
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label>Age</label>
            <input
              className="w-full p-2 pl-1 border-b-[1px] border-black  bg-transparent outline-none "
              type="text"
              placeholder="Age"
              required
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            ></input>

            <div className="flex gap-2 bg-transparent py-3">
              <label>Gender</label>
              <div>
                <input
                  className="bg-transparent "
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  required
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <label>Password</label>
            <input
              className="w-full p-2 pl-1 border-b-[1px] border-black  bg-transparent outline-none "
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <label>Re-enter Password</label>
            <input
              className="w-full p-2 pl-1 border-b-[1px] border-black  bg-transparent outline-none "
              type="password"
              placeholder="Password"
              required
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            ></input>

            <button
              className="mt-2 bg-green-600 rounded-xl py-2 font-bold text-white text-xl"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
