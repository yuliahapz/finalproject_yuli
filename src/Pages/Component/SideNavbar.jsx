// HARAP DIBACA EHEHEHHEHEHHE
// icon pakai heroicons v1 instal dulu (npm install @heroicons/react@v1)


import React, { useState } from "react";
import { HomeIcon, SearchIcon, PlusCircleIcon, UserIcon } from "@heroicons/react/outline";

const SideNavbar = () => {
    // State untuk kontrol sidebar terlihat atau tidak
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  
    // Fungsi untuk mengubah tampilan sidebar (toggle)
    const toggleNavbar = () => {
      setIsNavbarVisible(!isNavbarVisible); // Membalik nilai dari isNavbarVisible
    };
  
    return (
      <div>
        {/* Tombol untuk membuka/menutup sidebar, hanya ditampilkan di layar kecil (di bawah 1024px) */}
        <button
          className="fixed top-4 left-4 bg-black text-white p-2 rounded z-50 focus:outline-none lg:hidden" // style button
          onClick={toggleNavbar} // Panggil fungsi toggleNavbar saat tombol diklik
        >
          ☰ {/* Ikon untuk tombol toggle (bentuk hamburger) */}
        </button>
  
        {/* Sidebar yang akan tampil di layar kecil dan besar */}
        <nav
          className={`fixed top-0 left-0 h-full w-48 bg-black text-white flex flex-col items-center justify-start p-4 space-y-4 transform transition-transform ${
            isNavbarVisible ? "translate-x-0" : "-translate-x-full" // Jika isNavbarVisible true, sidebar terlihat
          } lg:translate-x-0 z-40`} // Pada layar besar (di atas 1024px), sidebar selalu terlihat
        >
          {/* Link ke halaman Home dengan ikon Home */}
          <a href="/" className="flex flex-col items-center text-white">
            <HomeIcon className="h-6 w-6 mb-1" /> {/* Ikon Home */}
            <span>Home</span> {/* Teks label */}
          </a>
  
          {/* Link ke halaman Search dengan ikon Search */}
          <a href="/search" className="flex flex-col items-center text-white">
            <SearchIcon className="h-6 w-6 mb-1" /> {/* Ikon Search */}
            <span>Search</span> {/* Teks label */}
          </a>
  
          {/* Link ke halaman Post dengan ikon PlusCircle */}
          <a href="/post" className="flex flex-col items-center text-white">
            <PlusCircleIcon className="h-6 w-6 mb-1" /> {/* Ikon Plus */}
            <span>Post</span> {/* Teks label */}
          </a>
  
          {/* Link ke halaman Profile dengan ikon User */}
          <a href="/profile" className="flex flex-col items-center text-white">
            <UserIcon className="h-6 w-6 mb-1" /> {/* Ikon Profile */}
            <span>Profile</span> {/* Teks label */}
          </a>
        </nav>
      </div>
    );
  };
  

export default SideNavbar;

