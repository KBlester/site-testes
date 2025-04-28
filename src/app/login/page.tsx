"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuthStatus, getUserByEmail, saveAuthStatus } from "@/lib/data";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
});
export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data
      loginSchema.parse(formData);

      // Attempt login
      setIsLoading(true);

      // Simulate network request
      setTimeout(() => {
        if (typeof window !== "undefined") {
          const user = getUserByEmail(formData.email);
          if (!user || user.password !== formData.password) {
            toast.error("E-mail ou senha incorretos");
            setIsLoading(false);
            return;
          }

          // Update auth status in localStorage
          saveAuthStatus({
            isAuthenticated: true,
            currentUser: user
          });
          toast.success("Login realizado com sucesso!");

          // Redirect to home page
          router.push("/");
        }
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format errors from Zod
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error("Erro ao fazer login");
      }
      setIsLoading(false);
    }
  };
  return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50" data-unique-id="13ae85f3-07e1-4c57-ba53-2e5f53458fdb" data-loc="88:9-88:96" data-file-name="app/login/page.tsx">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" data-unique-id="2b7cfd4e-0f18-4311-85b6-4adead41cd40" data-loc="89:6-89:73" data-file-name="app/login/page.tsx">
        <div className="text-center mb-8" data-unique-id="48f12101-33be-4d59-9db6-fd39d1c1b9a6" data-loc="90:8-90:42" data-file-name="app/login/page.tsx">
          <h1 className="text-2xl font-bold text-slate-900" data-unique-id="4d2f0284-6e93-4845-9072-7c7de1a8e7c5" data-loc="91:10-91:60" data-file-name="app/login/page.tsx">Login</h1>
          <p className="text-slate-600 mt-2" data-unique-id="ecce812d-efc9-4958-9a94-1b5c0a5d4f9e" data-loc="92:10-92:45" data-file-name="app/login/page.tsx">
            Entre na sua conta para avaliar artistas e receber recompensas
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6" data-unique-id="0fec1eae-2ca0-4258-8382-185f0682d711" data-loc="97:8-97:60" data-file-name="app/login/page.tsx">
          <div className="space-y-2" data-unique-id="62168b36-bac0-41c2-82f8-7a7b50adaae2" data-loc="98:10-98:37" data-file-name="app/login/page.tsx">
            <label htmlFor="email" className="text-sm font-medium text-slate-700" data-unique-id="8befebda-b9c5-435b-bd32-f6948bf5395e" data-loc="99:12-99:82" data-file-name="app/login/page.tsx">
              E-mail
            </label>
            <div className="relative" data-unique-id="c3d07997-1def-4ad7-8636-b1ccde1620da" data-loc="102:12-102:38" data-file-name="app/login/page.tsx">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-unique-id="0637736e-a129-40a1-ada3-b8c3172142af" data-loc="103:14-103:87" data-file-name="app/login/page.tsx">
                <Mail size={18} />
              </div>
              <Input id="email" name="email" type="email" placeholder="seuemail@exemplo.com" value={formData.email} onChange={handleChange} className={`pl-10 ${errors.email ? "border-red-500" : ""}`} autoComplete="email" data-unique-id="34f2f02b-bd10-465e-be49-aa9ac9f71d41" data-loc="106:14-106:223" data-file-name="app/login/page.tsx" />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1" data-unique-id="ed2d4891-6166-4889-b307-400690acc393" data-loc="108:29-108:70" data-file-name="app/login/page.tsx">{errors.email}</p>}
          </div>
          
          <div className="space-y-2" data-unique-id="52fe5299-bfdf-428b-b127-d12712161362" data-loc="111:10-111:37" data-file-name="app/login/page.tsx">
            <div className="flex justify-between items-center" data-unique-id="4a75deb0-0530-4a64-9b79-6f366cee212d" data-loc="112:12-112:63" data-file-name="app/login/page.tsx">
              <label htmlFor="password" className="text-sm font-medium text-slate-700" data-unique-id="97ebb9fd-261b-4f8b-a3f3-c22f153af780" data-loc="113:14-113:87" data-file-name="app/login/page.tsx">
                Senha
              </label>
              <Link href="#" className="text-xs text-blue-600 hover:text-blue-500" data-unique-id="2c6f48ad-16ad-4c5c-9524-813751c7ca0a" data-loc="116:14-116:83" data-file-name="app/login/page.tsx">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative" data-unique-id="6d1288d0-1e7e-49c2-8ab1-b0e5d42745dd" data-loc="120:12-120:38" data-file-name="app/login/page.tsx">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-unique-id="15356c35-2472-4ffd-bc14-ad30982b8add" data-loc="121:14-121:87" data-file-name="app/login/page.tsx">
                <Lock size={18} />
              </div>
              <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className={`pl-10 ${errors.password ? "border-red-500" : ""}`} autoComplete="current-password" data-unique-id="98da16a6-26d7-49cf-94ea-803288f31a98" data-loc="124:14-124:237" data-file-name="app/login/page.tsx" />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1" data-unique-id="1d67765b-88a7-4cdb-8524-d5d2f5836a57" data-loc="126:32-126:73" data-file-name="app/login/page.tsx">{errors.password}</p>}
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading} data-unique-id="9e5e3a4e-3b10-482c-acef-3662a079f11e" data-loc="129:10-129:102" data-file-name="app/login/page.tsx">
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        
        <div className="mt-6 text-center" data-unique-id="160e1e88-1956-431a-baa4-3b8cfa4375f6" data-loc="134:8-134:42" data-file-name="app/login/page.tsx">
          <p className="text-sm text-slate-600" data-unique-id="9af65c9c-c912-413c-9682-4ae059e217db" data-loc="135:10-135:48" data-file-name="app/login/page.tsx">
            Não tem uma conta?{" "}
            <Link href="/registro" className="text-blue-600 hover:text-blue-500" data-unique-id="c9baf853-4945-4cb5-83ef-6a62ed73c717" data-loc="137:12-137:81" data-file-name="app/login/page.tsx">
              Crie uma agora
            </Link>
          </p>
        </div>
      </div>
    </div>;
}