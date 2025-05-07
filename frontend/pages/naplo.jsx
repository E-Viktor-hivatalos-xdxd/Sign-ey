import Nav from "@/components/Nav";
import Login from "@/components/Login";
import { Check, SignIn, SignOut, UserCircle, UserCircleCheck, UserCircleDashed, UserSquare, X } from "@phosphor-icons/react/dist/ssr";
import moment from "moment";
import "moment/locale/hu";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard({ user, logs }) {

  const router = useRouter();

  moment.locale("hu");


  const status = {
    OPEN: <Check size={32} />,
    CLOSE: <X size={32} />,
  }

  if (user == null) return <Login />;
  return (
    <div className="">
      <Nav user={user} />
      <title>Sign-ey</title>
      <div className="px-10">

        

        <div className="flex gap-5 my-10">
          {router.query?.userID && <p className="py-2 px-4 bg-blue-500 text-white rounded-full flex items-center gap-x-2">
            Szürő:

            <span className="font-semibold">{logs[0]?.User?.name} </span>
            <X size={24} className="cursor-pointer" onClick={() => {
              router.push("/naplo")
            }
            } />
          </p>}


          {router.query?.groupID && <p className="py-2 px-4 bg-blue-500 text-white rounded-full flex items-center gap-x-2">
            Szürő:

            <span className="font-semibold">{logs[0]?.User?.Group?.name} </span>
            <X size={24} className="cursor-pointer" onClick={() => {
              router.push("/naplo")
            }
            } />
          </p>}

        </div>
        <div className="inline-block min-w-full overflow-hidden align-middle shadow rounded-2xl mb-10">
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
            <tbody className="bg-white divide-y divide-gray-200  overflow-y-auto">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-100 ">

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-5">
                    {log?.User?.name && <img

                      onClick={() => {
                        if (router.query.userID == log?.userID) {
                          return router.push("/naplo")
                        } else {
                          router.push("/naplo?userID=" + log?.userID)
                        }
                      }}
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

                    <button className="cursor-pointer" onClick={() => {
                      if (router.query.groupID == log?.User?.groupID) {
                        return router.push("/naplo")
                      } else {
                        router.push("/naplo?groupID=" + log?.User?.groupID)
                      }
                    }}>{log?.User?.Group?.name}</button></td>
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

  const { userID, groupID, } = ctx.query;

  const res2 = await fetch(`http://127.0.0.1:8080/api/logs?${userID && "&userID=" + userID}${groupID && "&groupID=" + groupID + ""}
    }`, {
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