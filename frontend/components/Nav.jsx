import Link from "next/link";

const Nav = ({user}) => {
    return <nav className="bg-blue-500 m-10 p-5 py-2.5 rounded-4xl flex flex-col md:flex-row gap-y-10 items-center justify-between text-white  text-xl font-medium italic">
        <div className="flex items-center">
          <img src="/logo.png" className="w-14 mr-5" />
          <a href="/" className="text-white"> Sign-ey</a>
        </div>
        

        <a href="/" className="text-white">Kezdőlap</a>
        <a href="/naplo" className="hover:text-white/60 transition duration-150">Napló</a>
        <a href="/statisztika" className="hover:text-white/60 transition duration-150">Statisztika</a>
        <a href="/felhasznalok " className="hover:text-white/60 transition duration-150">Felhasználók</a>
       
       <Link href="/profil" >
        <img
          src={
            "https://ui-avatars.com/api/?name=" +
            user?.name
          }
          className="w-12 h-12 rounded-full bg-mint"
        /></Link>
      </nav>
}


export default Nav;