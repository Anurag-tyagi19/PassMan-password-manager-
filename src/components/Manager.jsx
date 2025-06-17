import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();

  const [form, setform] = useState({});

  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    alert("copied to clipboard" + text);
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length >3 && form.password.length>3){
      setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log(passwordArray);
    setform({site:"",username:"", password:""})
    }
    else {
      alert("password not saved")
    }
  };

  const deletePassword = (id) => {
    console.log("deleting password with id:"+ id)
    let c = confirm("Do you wanna delete the password")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    
  }
  const editPassword = (id) => {
    console.log("editing password with id:"+ id)
    setform(passwordArray.filter(i=>id===id)[0]) 
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    // alert("show the pasword")
    passwordref.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      passwordref.current.type = "text";
      ref.current.src = "icons/eye.png";
    } else if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png";
      passwordref.current.type = "password";
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" mx-auto md:mycontainer md:px-0 min-h-[88.2vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span className="text-4xl">Pass</span>
          <span className="text-green-700 text-3xl">Man/&gt;</span>
        </h1>
        <p className="text-center font-bold text-green-900">
          Your own password manager
        </p>

        <div className="text-white flex flex-col p-4 items-center">
          <input
            name="site"
            onChange={handlechange}
            value={form.site}
            placeholder="Enter Website URL"
            type="text"
            className="my-3 border border-green-500 w-full rounded-full text-black p-4 py-1"
          />
          <div className=" w-full justify-between gap-8 md:flex-col">
            <input
              name="username"
              onChange={handlechange}
              value={form.username}
              placeholder="Enter Username"
              type="text"
              className="my-3 border border-green-500 w-full rounded-full text-black p-4 py-1"
            />
            <div className="relative">
              <input
                ref={passwordref}
                name="password"
                onChange={handlechange}
                value={form.password}
                placeholder="Enter Password"
                type="password"
                className="my-3 border border-green-500 w-full rounded-full text-black p-4 py-1 "
              />
              <span
                className="absolute right-[5px] top-[15px] cursor-pointer"
                onClick={showPassword}
              >
                {" "}
                <img
                  ref={ref}
                  className="p-1"
                  src="icons/eyecross.png"
                  width={30}
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-black flex justify-center items-center bg-green-500 rounded-full w-fit hover:bg-green-300 px-4 py-2 gap-2 border-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#121331,secondary:#000000"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passswords">
          <h2 className="text-2xl font-bold">Your Passswords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center px-6">
                        <div className="flex items-center justify-between ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#121331,secondary:#000000"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-between px-4">
                          {item.username}
                          <div
                            className="lordiconcopy"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#121331,secondary:#000000"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center  ">
                        <div className="flex items-center justify-between px-4">
                          {item.password}
                          <div
                            className="lordiconcopy"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#121331,secondary:#000000"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex justify-center items-center gap-2 ">
                        <span className="cursor-pointer" onClick={()=> {editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#000000"
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer" onClick={()=> {deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#000000"
                            // style="width:250px;height:250px"
                          ></lord-icon>
                        </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
