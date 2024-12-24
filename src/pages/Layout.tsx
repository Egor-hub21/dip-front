// src/pages/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidenav, SidenavContainer, SidenavItem, SidenavProvider } from '../components/ui/sidenav';
import { Navbar } from '../components/ui/navbar/navbar';
import { AiOutlineCloudUpload, AiOutlineFileText, AiOutlineHome } from 'react-icons/ai';


const Layout: React.FC = () => {
  const navItems: SidenavItem[] = [
    { icon: AiOutlineHome, label: "Главная", to: "" },
    { icon: AiOutlineFileText, label: "Данные схем", to: "schemes" },
    { icon: AiOutlineCloudUpload, label: "Файлы", to: "files" },
  ];
  return (
    <SidenavProvider>
      <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
        <main>
          <div className="Layout">
            <Navbar />
            <Outlet />
          </div>
        </main>
      </SidenavContainer>
    </SidenavProvider>
  );
};

export default Layout;
