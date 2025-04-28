"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuthStatus, logout } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LogOut, Menu, User, X } from "lucide-react";
export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  useEffect(() => {
    // Check auth status whenever component mounts or pathname changes
    if (typeof window !== "undefined") {
      const {
        isAuthenticated,
        currentUser
      } = getAuthStatus();
      setIsAuthenticated(isAuthenticated);
      setCurrentUser(currentUser?.name || null);
    }
  }, [pathname]);
  useEffect(() => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  }, [pathname]);
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    window.location.href = "/";
  };
  const navItems = [{
    name: "Início",
    path: "/"
  }, {
    name: "Avaliar Artistas",
    path: "/avaliar",
    requiresAuth: true
  }, {
    name: "Histórico",
    path: "/historico",
    requiresAuth: true
  }, {
    name: "Recompensas",
    path: "/recompensas",
    requiresAuth: true
  }];
  const filteredNavItems = isAuthenticated ? navItems : navItems.filter(item => !item.requiresAuth);
  return <nav className="bg-white border-b border-slate-200 sticky top-0 z-40" data-unique-id="b4b10496-5be1-4ba4-904f-d41a13dbca66" data-loc="52:9-52:79" data-file-name="components/navbar.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="bcee0641-2b69-4edf-a65e-f380069ab608" data-loc="53:6-53:62" data-file-name="components/navbar.tsx">
        <div className="flex justify-between h-16" data-unique-id="dee8e15b-d6fe-4198-8fc1-8eed2048f339" data-loc="54:8-54:51" data-file-name="components/navbar.tsx">
          <div className="flex" data-unique-id="a9b9ba63-8545-427c-81d2-baeb72036ff7" data-loc="55:10-55:32" data-file-name="components/navbar.tsx">
            <Link href="/" className="flex-shrink-0 flex items-center" data-unique-id="ccdcbbc4-4342-4cb8-9454-388724ba8def" data-loc="56:12-56:71" data-file-name="components/navbar.tsx">
              <span className="text-xl font-bold text-slate-900" data-unique-id="03828d63-ad89-4032-8047-a7d5716d4057" data-loc="57:14-57:65" data-file-name="components/navbar.tsx">Creatr</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8" data-unique-id="5001fda5-a7b5-488d-8965-5cb50637cbd8" data-loc="59:12-59:65" data-file-name="components/navbar.tsx">
              {filteredNavItems.map(item => <Link key={item.path} href={item.path} className={cn("inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full", pathname === item.path ? "border-blue-500 text-slate-900" : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700")} data-unique-id="a1dadef6-f97e-4ae7-9448-202caa443393" data-loc="60:44-60:315" data-file-name="components/navbar.tsx">
                  {item.name}
                </Link>)}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4" data-unique-id="af89de95-5b5c-4dfd-a3d6-82d5ab91161a" data-loc="66:10-66:79" data-file-name="components/navbar.tsx">
            {isAuthenticated ? <div className="flex items-center space-x-4" data-unique-id="a1736d26-8f8d-4acb-976b-21fd3d1f5d7d" data-loc="67:31-67:76" data-file-name="components/navbar.tsx">
                <div className="flex items-center space-x-2" data-unique-id="fe2cbb22-406d-41b2-8f3f-58ddbcfd99be" data-loc="68:16-68:61" data-file-name="components/navbar.tsx">
                  <User size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700" data-unique-id="05219dd6-3d2d-4626-a5e2-4b4d82d5b277" data-loc="70:18-70:71" data-file-name="components/navbar.tsx">{currentUser}</span>
                </div>
                <button onClick={handleLogout} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700" data-unique-id="059d4f86-8f50-4774-9513-6cfcaf815117" data-loc="72:16-72:140" data-file-name="components/navbar.tsx">
                  <LogOut size={18} className="mr-1" />
                  Sair
                </button>
              </div> : <div className="flex items-center space-x-4" data-unique-id="b552cc56-0e92-4982-a03e-cfa1b60ac28e" data-loc="76:23-76:68" data-file-name="components/navbar.tsx">
                <Link href="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 text-sm bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80" data-unique-id="1737e810-c9c9-4ad3-9a7e-f9c2909c1bb1" data-loc="77:16-77:361" data-file-name="components/navbar.tsx">
                  Login
                </Link>
                <Link href="/registro" className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 text-sm bg-primary text-primary-foreground shadow hover:bg-primary/90" data-unique-id="ae71d614-df43-4ef9-91a9-24ae09005fa8" data-loc="80:16-80:355" data-file-name="components/navbar.tsx">
                  Cadastrar
                </Link>
              </div>}
          </div>

          <div className="flex items-center sm:hidden" data-unique-id="33fe0fa7-f6a5-46c6-8cb3-f0a2c1a9c556" data-loc="86:10-86:55" data-file-name="components/navbar.tsx">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-600" data-unique-id="0fca5149-a50f-4342-be00-99d0d322e519" data-loc="87:12-87:157" data-file-name="components/navbar.tsx">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && <div className="sm:hidden" data-unique-id="62d55619-ddb8-4e1c-ac53-462f9dc12b03" data-loc="95:27-95:54" data-file-name="components/navbar.tsx">
          <div className="pt-2 pb-3 space-y-1" data-unique-id="e6e60142-3cab-492a-a6ff-d5e035853adc" data-loc="96:10-96:47" data-file-name="components/navbar.tsx">
            {filteredNavItems.map(item => <Link key={item.path} href={item.path} className={cn("block px-3 py-2 text-base font-medium rounded-md", pathname === item.path ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")} data-unique-id="19569ba1-9a25-4c54-93ee-b99de517b837" data-loc="97:42-97:286" data-file-name="components/navbar.tsx">
                {item.name}
              </Link>)}

            {isAuthenticated ? <button onClick={handleLogout} className="w-full text-left block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md" data-unique-id="a0af3ac5-177f-4555-af2b-e150cbe5f1b9" data-loc="101:31-101:194" data-file-name="components/navbar.tsx">
                Sair
              </button> : <>
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md" data-unique-id="824ed241-e969-4e79-b056-a740007e5095" data-loc="104:16-104:151" data-file-name="components/navbar.tsx">
                  Login
                </Link>
                <Link href="/registro" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md" data-unique-id="1134968c-733d-4c08-8b34-849bce62c824" data-loc="107:16-107:154" data-file-name="components/navbar.tsx">
                  Cadastrar
                </Link>
              </>}
          </div>
        </div>}
    </nav>;
}