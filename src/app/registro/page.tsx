"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateId } from "@/lib/utils";
import { getUserByEmail, saveAuthStatus, saveUser } from "@/lib/data";
import type { User } from "@/lib/types";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"]
});
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      registerSchema.parse(formData);
      if (typeof window !== "undefined") {
        // Check if email already exists
        const existingUser = getUserByEmail(formData.email);
        if (existingUser) {
          setErrors({
            email: "Este e-mail já está em uso"
          });
          return;
        }

        // Create new user
        setIsLoading(true);

        // Simulate network request
        setTimeout(() => {
          const newUser: User = {
            id: generateId(),
            name: formData.name,
            email: formData.email,
            password: formData.password
          };

          // Save user to localStorage
          saveUser(newUser);

          // Login the user
          saveAuthStatus({
            isAuthenticated: true,
            currentUser: newUser
          });
          toast.success("Conta criada com sucesso!");

          // Redirect to home page
          router.push("/");
        }, 1000);
      }
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
        toast.error("Erro ao criar conta");
      }
      setIsLoading(false);
    }
  };
  return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50" data-unique-id="4d8ad6a0-cf81-45d0-9c45-1f820e13dcbd" data-loc="109:9-109:96" data-file-name="app/registro/page.tsx">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" data-unique-id="74a9ea2b-f7a0-4ac2-b759-f4eea4a1a441" data-loc="110:6-110:73" data-file-name="app/registro/page.tsx">
        <div className="text-center mb-8" data-unique-id="08d47972-e1ad-4cde-a922-d88481ca8b8e" data-loc="111:8-111:42" data-file-name="app/registro/page.tsx">
          <h1 className="text-2xl font-bold text-slate-900" data-unique-id="471249b7-acfa-4452-9c36-85c935c3de26" data-loc="112:10-112:60" data-file-name="app/registro/page.tsx">Criar conta</h1>
          <p className="text-slate-600 mt-2" data-unique-id="789291b4-6c68-4f10-ad87-0b2e90bad079" data-loc="113:10-113:45" data-file-name="app/registro/page.tsx">
            Crie sua conta para começar a avaliar artistas e receber recompensas
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6" data-unique-id="4d1b311e-a8e0-4bff-8c2d-a8a42c9952b8" data-loc="118:8-118:60" data-file-name="app/registro/page.tsx">
          <div className="space-y-2" data-unique-id="c166a000-ce04-4166-86b2-32eb641c9202" data-loc="119:10-119:37" data-file-name="app/registro/page.tsx">
            <label htmlFor="name" className="text-sm font-medium text-slate-700" data-unique-id="20cde2d7-8f77-46f5-bae8-1201d795db10" data-loc="120:12-120:81" data-file-name="app/registro/page.tsx">
              Nome completo
            </label>
            <div className="relative" data-unique-id="7dfa2181-c867-42e8-b1d8-3aca048a5695" data-loc="123:12-123:38" data-file-name="app/registro/page.tsx">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-unique-id="951dcc94-f65f-4b8a-8597-29f58b173f1f" data-loc="124:14-124:87" data-file-name="app/registro/page.tsx">
                <UserIcon size={18} />
              </div>
              <Input id="name" name="name" type="text" placeholder="Seu nome" value={formData.name} onChange={handleChange} className={`pl-10 ${errors.name ? "border-red-500" : ""}`} autoComplete="name" data-unique-id="2eb0a676-4454-4942-9530-6f0fb45c18e5" data-loc="127:14-127:205" data-file-name="app/registro/page.tsx" />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1" data-unique-id="a9486ffc-3c72-476f-baaa-b1bed6e2a622" data-loc="129:28-129:69" data-file-name="app/registro/page.tsx">{errors.name}</p>}
          </div>
          
          <div className="space-y-2" data-unique-id="db458074-543f-45b7-8cc0-0dc7ece87143" data-loc="132:10-132:37" data-file-name="app/registro/page.tsx">
            <label htmlFor="email" className="text-sm font-medium text-slate-700" data-unique-id="3220e666-aeff-41a7-a265-cb8626a03e56" data-loc="133:12-133:82" data-file-name="app/registro/page.tsx">
              E-mail
            </label>
            <div className="relative" data-unique-id="4dfc8110-00f5-4a09-ba68-704170ba6cc9" data-loc="136:12-136:38" data-file-name="app/registro/page.tsx">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-unique-id="10024337-1710-461e-9c87-939d717452e1" data-loc="137:14-137:87" data-file-name="app/registro/page.tsx">
                <Mail size={18} />
              </div>
              <Input id="email" name="email" type="email" placeholder="seuemail@exemplo.com" value={formData.email} onChange={handleChange} className={`pl-10 ${errors.email ? "border-red-500" : ""}`} autoComplete="email" data-unique-id="167434a9-4a07-466a-8a21-0bf7eec4d6a3" data-loc="140:14-140:223" data-file-name="app/registro/page.tsx" />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1" data-unique-id="4cdc9ab7-69dd-4089-bbaf-5c7c29a7c654" data-loc="142:29-142:70" data-file-name="app/registro/page.tsx">{errors.email}</p>}
          </div>
          
          <div className="space-y-2" data-unique-id="e8161404-2802-4c50-b13b-9e45f4acd548" data-loc="145:10-145:37" data-file-name="app/registro/page.tsx">
            <label htmlFor="password" className="text-sm font-medium text-slate-700" data-unique-id="a7444020-8ff3-4d1a-ae60-08b773dc635f" data-loc="146:12-146:85" data-file-name="app/registro/page.tsx">
              Senha
            </label>
            <div className="relative" data-unique-id="d19c09b6-9ad6-44b9-80e7-63140368b6ad" data-loc="149:12-149:38" data-file-name="app/registro/page.tsx">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-unique-id="174f02f3-d6b9-4205-b25b-b774f516339d" data-loc="150:14-150:87" data-file-name="app/registro/page.tsx">
                <Lock size={18} />
              </div>
              <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className={`pl-10 ${errors.password ? "border-red-500" : ""}`} autoComplete="new-password" data-unique-id="f80859fd-6f4a-470a-b81e-f19607a646f4" data-loc="153:14-153:233" data-file-name="app/registro/page.tsx" />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1" data-unique-id="d72272f1-7a41-4a02-827f-65e7a21af1ef" data-loc="155:32-155:73" data-file-name="app/registro/page.tsx">{errors.password}</p>}
          </div>
          
          <div className="space-y-2" data-unique-id="1c50a20a-9f9a-40bf-a99c-8214764115d5" data-loc="158:10-158:37" data-file-name="app/registro/page.tsx">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700" data-unique-id="0e885c99-aa64-4b0a-b29f-96267b9592b0" data-loc="159:12-159:92" data-file-name="app/registro/page.tsx">
              Confirme a senha
            </label>
            <div className="relative" data-unique-id="168b5772-4c88-4362-9088-b6af8fd9fe0c" data-loc="162:12-162:38" data-file-name="app/registro/page.tsx">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-unique-id="3abc877b-8378-4349-b8ce-0af0559839c8" data-loc="163:14-163:87" data-file-name="app/registro/page.tsx">
                <Lock size={18} />
              </div>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`} autoComplete="new-password" data-unique-id="bc34af75-7842-4f6d-8e9f-545668372ab0" data-loc="166:14-166:261" data-file-name="app/registro/page.tsx" />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1" data-unique-id="39169142-25a2-4b91-b8c9-95744b587543" data-loc="168:39-168:80" data-file-name="app/registro/page.tsx">{errors.confirmPassword}</p>}
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading} data-unique-id="97ad868f-1eb4-4732-b179-d3befec6c3be" data-loc="171:10-171:102" data-file-name="app/registro/page.tsx">
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
        
        <div className="mt-6 text-center" data-unique-id="cde525d4-a9a6-4eb3-8628-6a4d9e548f95" data-loc="176:8-176:42" data-file-name="app/registro/page.tsx">
          <p className="text-sm text-slate-600" data-unique-id="7e522e93-a9e1-46fa-bd1f-b4730a528984" data-loc="177:10-177:48" data-file-name="app/registro/page.tsx">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-500" data-unique-id="c6e77896-54c0-400e-8fe0-4c344bf9b863" data-loc="179:12-179:78" data-file-name="app/registro/page.tsx">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>;
}