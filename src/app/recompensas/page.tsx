"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getArtistById, getAuthStatus, getUserBalance, getUserTransactions, saveTransaction } from "@/lib/data";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate, generateId } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle, CreditCard, DollarSign, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
export default function RecompensasPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== "undefined") {
      const {
        isAuthenticated,
        currentUser
      } = getAuthStatus();
      if (!isAuthenticated || !currentUser) {
        router.push("/login");
        return;
      }

      // Set user ID
      setUserId(currentUser.id);

      // Get user balance and transactions
      const userBalance = getUserBalance(currentUser.id);
      const userTransactions = getUserTransactions(currentUser.id);

      // Sort transactions by date (newest first)
      userTransactions.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setBalance(userBalance);
      setTransactions(userTransactions);
      setIsLoading(false);
    }
  }, [router]);
  const handleWithdraw = () => {
    if (!userId) return;

    // Check if user has sufficient balance
    if (balance < 25) {
      toast.error(`Você precisa ter pelo menos ${formatCurrency(25)} para realizar um saque`);
      return;
    }
    setIsWithdrawing(true);

    // Simulate processing
    setTimeout(() => {
      // Create withdrawal transaction with fee
      const withdrawTransaction = {
        id: generateId(),
        userId,
        amount: -25,
        // R$25,00 fee
        type: "withdrawal" as const,
        status: "completed" as const,
        createdAt: new Date().toISOString()
      };

      // Save transaction
      saveTransaction(withdrawTransaction);

      // Redirect to external payment processing (mock)
      window.open("https://exemplo.com/pagamento", "_blank");

      // Update local state
      setTransactions(prev => [withdrawTransaction, ...prev]);
      setBalance(prev => prev - 25);
      toast.success(`Taxa de ${formatCurrency(25)} paga com sucesso! Seu saque está sendo processado.`);
      setIsWithdrawing(false);
    }, 1500);
  };
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50" data-unique-id="7a87fa4b-7ffc-4267-b469-b1776c31caa9" data-loc="84:11-84:98" data-file-name="app/recompensas/page.tsx">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>;
  }
  return <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12" data-unique-id="149c52a8-1804-4bfb-9969-0576a12c0924" data-loc="88:9-88:69" data-file-name="app/recompensas/page.tsx">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="362c7a5b-3972-4621-a9de-5f19650961bb" data-loc="89:6-89:62" data-file-name="app/recompensas/page.tsx">
        <div className="mb-8" data-unique-id="93a1b49a-c11a-4af9-8ca8-57c3dfd63c08" data-loc="90:8-90:30" data-file-name="app/recompensas/page.tsx">
          <h1 className="text-3xl font-bold text-slate-900" data-unique-id="fd7e5fd2-fd7f-427e-9561-77fb597b3ee5" data-loc="91:10-91:60" data-file-name="app/recompensas/page.tsx">Recompensas</h1>
          <p className="mt-2 text-lg text-slate-600" data-unique-id="435d3123-76b9-4b7e-8830-23995ea9f874" data-loc="92:10-92:53" data-file-name="app/recompensas/page.tsx">
            Acompanhe seu saldo e realize saques das suas recompensas
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-unique-id="688f76f9-178b-4fd4-a049-000100a6ca41" data-loc="97:8-97:63" data-file-name="app/recompensas/page.tsx">
          {/* Left column - Balance and Withdraw */}
          <div className="lg:col-span-1 space-y-8" data-unique-id="f19ae8a9-cc89-4cd8-902a-9c1e122813b1" data-loc="99:10-99:51" data-file-name="app/recompensas/page.tsx">
            {/* Balance Card */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="bg-white rounded-xl shadow-md overflow-hidden" data-unique-id="9042b2eb-aa0a-4922-9de8-36a3245cc161" data-loc="101:12-109:71" data-file-name="app/recompensas/page.tsx">
              <div className="bg-blue-600 p-6 text-white" data-unique-id="e675b612-c466-449f-b50d-4bde87d0cfc6" data-loc="110:14-110:58" data-file-name="app/recompensas/page.tsx">
                <h2 className="text-xl font-semibold mb-1" data-unique-id="635505cf-c5ca-461d-a236-d394cd7a86bf" data-loc="111:16-111:59" data-file-name="app/recompensas/page.tsx">Seu Saldo</h2>
                <p className="text-sm opacity-80" data-unique-id="11a040d6-6556-4fc8-ac3a-187292f59618" data-loc="112:16-112:50" data-file-name="app/recompensas/page.tsx">Total de recompensas acumuladas</p>
              </div>
              <div className="p-6" data-unique-id="2cd8af9c-1520-4e19-a0d6-3ac5353c54b2" data-loc="114:14-114:35" data-file-name="app/recompensas/page.tsx">
                <div className="flex items-center justify-between" data-unique-id="a498a2d7-7153-462b-ba71-3aeb01048677" data-loc="115:16-115:67" data-file-name="app/recompensas/page.tsx">
                  <span className="text-3xl font-bold text-slate-900" data-unique-id="e5505f3f-2e18-4ded-8fa2-0b3747943c1f" data-loc="116:18-116:70" data-file-name="app/recompensas/page.tsx">
                    {formatCurrency(balance)}
                  </span>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-sm text-slate-500 mt-2" data-unique-id="1e27270a-0320-42d2-a3fe-58d12d2e10a1" data-loc="121:16-121:59" data-file-name="app/recompensas/page.tsx">
                  {transactions.filter(t => t.type === "rating").length} avaliações realizadas
                </p>
              </div>
            </motion.div>
            
            {/* Withdraw Card */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="bg-white rounded-xl shadow-md overflow-hidden" data-unique-id="24b1623b-8478-4c7c-8be4-f8c63ffdd042" data-loc="128:12-137:71" data-file-name="app/recompensas/page.tsx">
              <div className="bg-slate-800 p-6 text-white" data-unique-id="38b2275a-8a1b-4a48-ad4a-9148ebd2e938" data-loc="138:14-138:59" data-file-name="app/recompensas/page.tsx">
                <h2 className="text-xl font-semibold mb-1" data-unique-id="9b23579d-0de3-456b-9322-75bf4cec0ba0" data-loc="139:16-139:59" data-file-name="app/recompensas/page.tsx">Solicitar Saque</h2>
                <p className="text-sm opacity-80" data-unique-id="75142609-3d24-4298-b898-a8fe8a4ba1ac" data-loc="140:16-140:50" data-file-name="app/recompensas/page.tsx">
                  Taxa de {formatCurrency(25)} por saque
                </p>
              </div>
              <div className="p-6" data-unique-id="20b16488-8d50-4a4f-b843-f18a3160ae67" data-loc="144:14-144:35" data-file-name="app/recompensas/page.tsx">
                <div className="mb-4" data-unique-id="b784530c-4a59-4174-bc41-4cb2d580e0ed" data-loc="145:16-145:38" data-file-name="app/recompensas/page.tsx">
                  <h3 className="font-medium text-slate-900" data-unique-id="0b38f33c-d610-4d7f-a476-12f054c7ada1" data-loc="146:18-146:61" data-file-name="app/recompensas/page.tsx">Instruções</h3>
                  <p className="text-sm text-slate-600 mt-1" data-unique-id="d541b88d-f0f5-4df0-af82-2dbc64ab27fb" data-loc="147:18-147:61" data-file-name="app/recompensas/page.tsx">
                    Para retirar suas recompensas, você precisará pagar uma taxa de {formatCurrency(25)}.
                    Após o pagamento da taxa, você receberá seu saldo completo.
                  </p>
                </div>
                
                <div className="mb-6" data-unique-id="8e64fb75-91aa-4c08-bc47-43cc411dfd66" data-loc="153:16-153:38" data-file-name="app/recompensas/page.tsx">
                  <div className="flex items-center justify-between mb-2" data-unique-id="ddfc7d99-7021-4052-a160-246b0f3fb092" data-loc="154:18-154:74" data-file-name="app/recompensas/page.tsx">
                    <span className="text-sm text-slate-500" data-unique-id="6e4906c2-c705-4daf-8014-94ef2b56599e" data-loc="155:20-155:61" data-file-name="app/recompensas/page.tsx">Saldo disponível</span>
                    <span className="font-medium text-slate-900" data-unique-id="6c5f17c1-e3a1-4279-98cf-3396ec642261" data-loc="156:20-156:65" data-file-name="app/recompensas/page.tsx">{formatCurrency(balance)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2" data-unique-id="5bd67bc9-07d7-49f3-95cf-c8314c1925f9" data-loc="158:18-158:74" data-file-name="app/recompensas/page.tsx">
                    <span className="text-sm text-slate-500" data-unique-id="b6478d9a-8b04-435e-8663-d93a6c0832c4" data-loc="159:20-159:61" data-file-name="app/recompensas/page.tsx">Taxa de saque</span>
                    <span className="font-medium text-slate-900" data-unique-id="211f5843-ddf8-41e2-ac49-96d5c5bfc827" data-loc="160:20-160:65" data-file-name="app/recompensas/page.tsx">{formatCurrency(25)}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2" data-unique-id="00bd078a-5afe-4443-a3af-824a177278f2" data-loc="162:18-162:60" data-file-name="app/recompensas/page.tsx" />
                  <div className="flex items-center justify-between" data-unique-id="019d639d-b51b-4d4c-8839-fe0a91d44668" data-loc="163:18-163:69" data-file-name="app/recompensas/page.tsx">
                    <span className="text-sm font-medium text-slate-900" data-unique-id="373bba64-fc95-4ad0-a7ae-51cdd65c6b6d" data-loc="164:20-164:73" data-file-name="app/recompensas/page.tsx">Valor a receber</span>
                    <span className="font-bold text-green-600" data-unique-id="6507d6ff-4ca6-49b1-bcc0-a9906cb4d348" data-loc="165:20-165:63" data-file-name="app/recompensas/page.tsx">{formatCurrency(Math.max(0, balance - 25))}</span>
                  </div>
                </div>
                
                <Button variant="primary" onClick={handleWithdraw} disabled={isWithdrawing || balance < 25} className="w-full" data-unique-id="4bcab445-aebd-4f86-96a2-1833fb04347b" data-loc="169:16-169:127" data-file-name="app/recompensas/page.tsx">
                  {isWithdrawing ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </> : <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Solicitar saque
                    </>}
                </Button>
                
                {balance < 25 && <p className="text-xs text-amber-600 mt-2 text-center" data-unique-id="742d2ead-fc46-48f2-8443-1d752bf24073" data-loc="179:33-179:88" data-file-name="app/recompensas/page.tsx">
                    Você precisa de pelo menos {formatCurrency(25)} para solicitar um saque
                  </p>}
                
                <p className="text-xs text-center text-slate-500 mt-4" data-unique-id="7bacdf4a-b187-4f1e-8d56-668178fde9b5" data-loc="183:16-183:71" data-file-name="app/recompensas/page.tsx">
                  Após o pagamento da taxa, você será redirecionado para concluir seu saque.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Transaction History */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="lg:col-span-2" data-unique-id="4245afdb-caa6-4651-b56f-369890d5f0ef" data-loc="191:10-200:37" data-file-name="app/recompensas/page.tsx">
            <div className="bg-white rounded-xl shadow-md overflow-hidden" data-unique-id="a6815ff4-0c18-45d7-8a20-0a692d955d73" data-loc="201:12-201:75" data-file-name="app/recompensas/page.tsx">
              <div className="bg-slate-100 p-6 border-b border-slate-200" data-unique-id="079609b0-2894-4767-878a-cd55abc053d0" data-loc="202:14-202:74" data-file-name="app/recompensas/page.tsx">
                <h2 className="text-xl font-semibold text-slate-900" data-unique-id="a910629c-35db-4b18-8a81-16e45f1d3bbf" data-loc="203:16-203:69" data-file-name="app/recompensas/page.tsx">
                  Histórico de Transações
                </h2>
              </div>
              
              {transactions.length === 0 ? <div className="p-12 text-center" data-unique-id="e88fda01-5391-47e0-8262-8ca10f084a40" data-loc="208:43-208:77" data-file-name="app/recompensas/page.tsx">
                  <DollarSign className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1" data-unique-id="d6222d31-f719-43a5-bb7a-d60ebc06576d" data-loc="210:18-210:74" data-file-name="app/recompensas/page.tsx">
                    Nenhuma transação
                  </h3>
                  <p className="text-slate-500 mb-4" data-unique-id="d193fb08-4c9d-4ef5-9ff3-39937ae8595c" data-loc="213:18-213:53" data-file-name="app/recompensas/page.tsx">
                    Você ainda não realizou nenhuma avaliação ou saque.
                  </p>
                  <Button variant="outline" onClick={() => router.push("/avaliar")} data-unique-id="3d06cdb7-b23e-4c28-ac12-a3d4846f5460" data-loc="216:18-216:84" data-file-name="app/recompensas/page.tsx">
                    Avaliar artistas agora
                  </Button>
                </div> : <div className="overflow-hidden" data-unique-id="4e18c4c0-9e63-4219-9614-8bd546d05930" data-loc="219:25-219:58" data-file-name="app/recompensas/page.tsx">
                  <div className="overflow-x-auto" data-unique-id="38f6e9a4-56a8-42e2-95da-49da032bc3a7" data-loc="220:18-220:51" data-file-name="app/recompensas/page.tsx">
                    <table className="min-w-full divide-y divide-slate-200" data-unique-id="1968371f-e1bf-4a14-a7c4-bb0a54d73d0d" data-loc="221:20-221:76" data-file-name="app/recompensas/page.tsx">
                      <thead className="bg-slate-50" data-unique-id="3ab1125e-3e43-47aa-9963-a762932e270d" data-loc="222:22-222:53" data-file-name="app/recompensas/page.tsx">
                        <tr data-unique-id="513cfad3-3e39-4c1a-a019-d597ec271b23" data-loc="223:24-223:28" data-file-name="app/recompensas/page.tsx">
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="39e8e832-3305-4c18-828b-feea1182cdca" data-loc="224:26-224:134" data-file-name="app/recompensas/page.tsx">
                            Tipo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="665758f9-d2e6-475f-9780-a54c2b7e586b" data-loc="227:26-227:134" data-file-name="app/recompensas/page.tsx">
                            Detalhes
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="55b8dab2-e849-47a7-be63-b91154c2ae23" data-loc="230:26-230:134" data-file-name="app/recompensas/page.tsx">
                            Data
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="6ea5ca55-9395-482b-91f1-392a79be3fd8" data-loc="233:26-233:134" data-file-name="app/recompensas/page.tsx">
                            Valor
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200" data-unique-id="761bdbc5-4aa8-4cfb-a8d0-fd60134dd492" data-loc="238:22-238:76" data-file-name="app/recompensas/page.tsx">
                        {transactions.map(transaction => {
                      // Get artist name for rating transactions
                      let details = transaction.type === "rating" ? `Avaliação de ${transaction.artistId ? getArtistById(transaction.artistId)?.name : "artista"}` : "Saque de recompensas";
                      return <tr key={transaction.id} className="hover:bg-slate-50" data-unique-id="ba23db04-f4cd-458a-b6bc-a224ba77f428" data-loc="242:29-242:84" data-file-name="app/recompensas/page.tsx">
                              <td className="px-6 py-4 whitespace-nowrap" data-unique-id="f717cd4b-6c96-469b-a99a-eb019915f898" data-loc="243:30-243:74" data-file-name="app/recompensas/page.tsx">
                                <div className="flex items-center" data-unique-id="df875070-0c72-4f7b-bb58-0956e76838a2" data-loc="244:32-244:67" data-file-name="app/recompensas/page.tsx">
                                  {transaction.type === "rating" ? <ArrowUpCircle className="h-5 w-5 text-green-500 mr-2" /> : <ArrowDownCircle className="h-5 w-5 text-amber-500 mr-2" />}
                                  <span className="text-sm font-medium text-slate-900 capitalize" data-unique-id="74764bd5-e842-410a-aaa4-cc13d0708bc0" data-loc="246:34-246:98" data-file-name="app/recompensas/page.tsx">
                                    {transaction.type === "rating" ? "Crédito" : "Saque"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap" data-unique-id="f3ab61d4-1782-4bfd-bc58-b5fef5710884" data-loc="251:30-251:74" data-file-name="app/recompensas/page.tsx">
                                <div className="text-sm text-slate-900" data-unique-id="bad5c138-3bce-412f-a221-04629ae96ccc" data-loc="252:32-252:72" data-file-name="app/recompensas/page.tsx">
                                  {details}
                                </div>
                                <div className="text-xs text-slate-500" data-unique-id="f203ae0e-abef-458c-b0ad-9cb379770cc5" data-loc="255:32-255:72" data-file-name="app/recompensas/page.tsx">
                                  {transaction.status}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500" data-unique-id="cd7756d7-97af-435c-a097-c13daea514cc" data-loc="259:30-259:97" data-file-name="app/recompensas/page.tsx">
                                {formatDate(transaction.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap" data-unique-id="154cd8f6-4c9b-4353-bf21-d45c03234a32" data-loc="262:30-262:74" data-file-name="app/recompensas/page.tsx">
                                <div className={`text-sm font-medium ${transaction.amount > 0 ? "text-green-600" : "text-amber-600"}`} data-unique-id="41f7641c-adf3-4e73-8a09-950c8949cb51" data-loc="263:32-263:135" data-file-name="app/recompensas/page.tsx">
                                  {formatCurrency(Math.abs(transaction.amount))}
                                </div>
                              </td>
                            </tr>;
                    })}
                      </tbody>
                    </table>
                  </div>
                </div>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
}