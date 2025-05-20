import Nav from "@/components/Nav";
import Login from "@/components/Login";
import { Check, Clock, IdentificationCard, LockKey, LockKeyOpen, SignIn, SignOut, UserSquare, WarningDiamond, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useState } from "react";
import moment from "moment";
import "moment/locale/hu";

export default function Home({ user, logs }) {
  const [ora, setOra] = useState();
  moment.locale("hu");

  const UpdateTime = () => {
    setOra(new Date().toLocaleTimeString("hu"))
  }
  setInterval(UpdateTime)


  const status = {
    OPEN: <Check size={32} />,
    CLOSE: <X size={32} />,
  }

  if (user == null) return <Login />;

  function action(parameter) {
    const statusMessage = {
      OPEN: "nyitás",
      CLOSE: "zárás"
    }
    fetch("http://127.0.0.1:8080/api//door/", {

      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: parameter
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (res?.succes) {
          alert("Sikeres " + statusMessage[parameter])
        } else {
          alert("Sikertelen " + statusMessage[parameter])
        }
      })
  }

  return (
    <div className="max-h-screen overflow-hidden">
      <title>Sign-ey</title>
      <Nav user={user} />


      <div className="grid grid-cols-1 md:grid-cols-2 m-10 gap-10 rounded-4xl">
        <div className="bg-blue-700 flex flex-col items-center rounded-4xl p-10 gap-y-2.5">
          <h1 className="text-black text-6xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl bg-white w-full text-center h-full flex justify-center items-center rounded-xl font-bold min-h-32">
            {ora}
          </h1>
          <h2 className="text-white/90 text-xl">
            {new Date().toLocaleDateString("hu")}
          </h2>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <button className="hover:bg-black flex items-center py-2.5 px-4 hover:text-white text-xl rounded-xl border-[3px] border-black cursor-pointer"
            onClick={() => {
              action("OPEN")
            }}
          >
            <LockKeyOpen size={32} weight="bold" />
            <span className="pl-4 font-semibold">Nyitás</span>
          </button>

          <button className="hover:bg-black flex items-center py-2.5 px-4 hover:text-white text-xl rounded-xl border-[3px] border-black  cursor-pointer"
            onClick={() => {
              action("CLOSE")
            }}
          >
            <LockKey size={32} weight="bold" />
            <span className="pl-4 font-semibold">Zárás</span>
          </button>
          <Link href={"/felhasznalok"} className="hover:bg-black flex items-center py-2.5 px-4 hover:text-white text-xl rounded-xl border-[3px] border-black  cursor-pointer">
            <IdentificationCard size={32} weight="bold" />

            <span className="pl-4 font-semibold">Kártya hozzáadása</span>
          </Link>

          <button className="hover:bg-black flex items-center py-2.5 px-4 hover:text-white text-xl rounded-xl border-[3px] border-black  cursor-pointer"
            onClick={() => {
              action("OPEN")
            }}>
            <WarningDiamond size={32} weight="bold" />
            <span className="pl-4 font-semibold">Vészhelyzet</span>

          </button>
        </div>


        <div className="inline-block min-w-full overflow-hidden align-middle shadow rounded-2xl mb-10 col-span-2 ">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left ">Felhasználó</th>
                <th className="px-6 py-3 text-left">Irány</th>
                <th className="px-6 py-3 text-left">Idő</th>
                <th className="px-6 py-3 text-left">Rendszer</th>
                <th className="px-6 py-3 text-left">Csoport</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 overflow-auto ">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-100 ">

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-5">
                    {log?.User?.name && <img


                      src={
                        "https://ui-avatars.com/api/?name=" +
                        log?.User?.name
                      }
                      className="w-12 h-12 rounded-full bg-mint cursor-pointer"
                    />}
                    <Link href={"/felhasznalok/" + log?.User?.email} >{log?.User?.name}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {log?.entryTime && <>
                      <SignIn size={32} />

                    </>

                    }{log?.exitTime && <> <SignOut size={32} /></>

                    }

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap ">
                    {log?.entryTime && <>

                      {moment(log?.entryTime).fromNow()}
                    </>

                    }{log?.exitTime && <> {moment(log?.exitTime).fromNow()}</>

                    }

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap ">{status[log?.action]}</td>
                  <td className="px-6 py-4 whitespace-nowrap"


                  >


                    {log?.User?.Group?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>



  );

}


export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers?.cookie;

  const res = await fetch(`http://127.0.0.1:8080/api/user`, {
    headers: { cookie },
  });
  const user = res.ok ? await res.json() : null;


  const res2 = await fetch(`http://127.0.0.1:8080/api/logs?limit=12`, {
    headers: { cookie },
  });
  const logs = res2.ok ? await res2.json() : null;

  return {
    props: {
      logs: logs,
      user: user
    },

  };
}