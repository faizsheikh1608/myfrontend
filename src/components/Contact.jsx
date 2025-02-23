import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate()
  return (
    <div className=" w-[100vp] mt-5 mx-5">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="mt-3 text-xl">Last updated on 22-02-2025 23:55:03</p>
      <p className="mt-3 text-xl">You may contact us using the information below:</p>
      <p className="mt-2 text-lg">Merchant Legal entity name: FAIZ M YAQUB SHEIKH</p>
      <p className="mt-1 text-lg"> 
        Registered Address: shree takies road, ansariward, Gondia, Maharashtra,
        PIN: 441601
      </p>
      <p className="mt-1 text-lg">
        Operational Address: shree takies road, ansariward, Gondia, Maharashtra,
        PIN: 441601
      </p>
      <p className="mt-1 text-lg">Telephone No: 8390438280</p>
      <p className="mt-1 text-lg">E-Mail ID: sheikhfaiz7861@gmail.com</p>
      <button onClick={() => navigate('/')} className="mt-2 bg-green-600 py-1 px-3 rounded-xl text-m text-white cursor-pointer">Back To Home</button>
    </div>
  );
};

export default Contact;
