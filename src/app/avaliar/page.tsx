"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAuthStatus, getNextArtistToRate, getUserDailyRatingCount, hasReachedDailyRatingLimit, saveRating, saveTransaction } from "@/lib/data";
import { Artist } from "@/lib/types";
import { formatCurrency, generateId } from "@/lib/utils";
import { toast } from "sonner";
import { Award, CheckCircle, Clock, Loader2, Music2, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { DailyRatingProgress } from "@/components/daily-rating-progress";
export default function AvaliarPage() {
  const router = useRouter();
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [allRated, setAllRated] = useState(false);
  const [reachedDailyLimit, setReachedDailyLimit] = useState(false);
  const [dailyRatingCount, setDailyRatingCount] = useState(0);
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

      // Check daily rating limit
      const hasReachedLimit = hasReachedDailyRatingLimit(currentUser.id);
      setReachedDailyLimit(hasReachedLimit);
      setDailyRatingCount(getUserDailyRatingCount(currentUser.id));

      // Get next artist to rate if limit not reached
      if (!hasReachedLimit) {
        const nextArtist = getNextArtistToRate(currentUser.id);
        if (nextArtist) {
          setCurrentArtist(nextArtist);
        } else {
          setAllRated(true);
        }
      }
      setIsLoading(false);
    }
  }, [router]);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = () => {
    if (!userId || !currentArtist) return;
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação de 1 a 5 estrelas");
      return;
    }
    setIsSubmitting(true);

    // Create rating object
    const newRating = {
      id: generateId(),
      userId,
      artistId: currentArtist.id,
      score: rating,
      comment: comment.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    // Create transaction object for the reward
    const newTransaction = {
      id: generateId(),
      userId,
      amount: 3,
      // R$3,00 for each rating
      type: "rating" as const,
      artistId: currentArtist.id,
      status: "completed" as const,
      createdAt: new Date().toISOString()
    };

    // Save rating and transaction
    saveRating(newRating);
    saveTransaction(newTransaction);

    // Update daily rating count
    const newCount = getUserDailyRatingCount(userId);
    setDailyRatingCount(newCount);

    // Show success message
    setShowSuccess(true);

    // Reset form after 2 seconds and load next artist
    setTimeout(() => {
      setRating(0);
      setComment("");
      setShowSuccess(false);

      // Check if user has reached daily limit after this rating
      if (hasReachedDailyRatingLimit(userId)) {
        setReachedDailyLimit(true);
        return;
      }

      // Get next artist
      const nextArtist = getNextArtistToRate(userId);
      if (nextArtist) {
        setCurrentArtist(nextArtist);
      } else {
        setAllRated(true);
      }
      setIsSubmitting(false);
    }, 2000);
  };
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50" data-unique-id="a21c01b1-fde1-4a9c-a0d0-1a38bcf42d83" data-loc="130:11-130:98" data-file-name="app/avaliar/page.tsx">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>;
  }
  if (reachedDailyLimit) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50" data-unique-id="d8767cc7-c5e4-423e-974d-d5e0a0e7a697" data-loc="135:11-135:98" data-file-name="app/avaliar/page.tsx">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center" data-unique-id="fc5593c6-c8e1-4b53-8bae-147ae72581a8" data-loc="136:8-136:87" data-file-name="app/avaliar/page.tsx">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6" data-unique-id="4636a921-335b-45ca-8ac7-d1c48e5c6ba8" data-loc="137:10-137:109" data-file-name="app/avaliar/page.tsx">
            <Clock className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2" data-unique-id="a229b7c9-e4ca-472c-b9b3-bc5805d890c1" data-loc="140:10-140:65" data-file-name="app/avaliar/page.tsx">
            Limite diário atingido
          </h1>
          <p className="text-slate-600 mb-4" data-unique-id="43015ef7-12b9-4328-9f74-930ec9862e4f" data-loc="143:10-143:45" data-file-name="app/avaliar/page.tsx">
            Você já realizou {dailyRatingCount} avaliações hoje, atingindo o limite diário de 50 avaliações.
          </p>
          <p className="text-slate-600 mb-6" data-unique-id="efb44f03-508a-41ea-af9d-579d61a195a8" data-loc="146:10-146:45" data-file-name="app/avaliar/page.tsx">
            Volte amanhã para continuar avaliando artistas e ganhando recompensas.
          </p>
          <div className="flex flex-col space-y-4" data-unique-id="a0e20ce4-34fe-4fde-b0ec-454853530cee" data-loc="149:10-149:51" data-file-name="app/avaliar/page.tsx">
            <Button onClick={() => router.push("/historico")} className="bg-blue-600 hover:bg-blue-700" data-unique-id="7ad1509e-982d-4081-b21c-cc6932fe1614" data-loc="150:12-150:104" data-file-name="app/avaliar/page.tsx">
              Ver minhas avaliações
            </Button>
            <Button onClick={() => router.push("/recompensas")} variant="outline" data-unique-id="64422b42-094e-4004-b903-0094737afe4b" data-loc="153:12-153:82" data-file-name="app/avaliar/page.tsx">
              Ver minhas recompensas
            </Button>
          </div>
        </div>
      </div>;
  }
  if (allRated) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50" data-unique-id="2be3d379-5b59-4b71-92e9-37889a500af3" data-loc="161:11-161:98" data-file-name="app/avaliar/page.tsx">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center" data-unique-id="e5b7edbf-0a6b-4d2e-a924-247fb00fa365" data-loc="162:8-162:87" data-file-name="app/avaliar/page.tsx">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2" data-unique-id="ce2f448d-bbcd-435f-96d7-e6614d6200d9" data-loc="164:10-164:65" data-file-name="app/avaliar/page.tsx">
            Parabéns!
          </h1>
          <p className="text-slate-600 mb-6" data-unique-id="7eddbbfe-00d4-48bb-b128-0bb09c916dd7" data-loc="167:10-167:45" data-file-name="app/avaliar/page.tsx">
            Você já avaliou todos os artistas disponíveis na plataforma. 
            Volte mais tarde para avaliar novos artistas.
          </p>
          <Button onClick={() => router.push("/historico")} className="bg-blue-600 hover:bg-blue-700" data-unique-id="6fd39396-132a-4b6a-bd97-52ab09bde5f8" data-loc="171:10-171:102" data-file-name="app/avaliar/page.tsx">
            Ver minhas avaliações
          </Button>
        </div>
      </div>;
  }
  return <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12" data-unique-id="24acc10f-edc3-4499-a05b-eb430a83fd7e" data-loc="177:9-177:69" data-file-name="app/avaliar/page.tsx">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="06f0e427-423b-4063-a973-45f4fb10718f" data-loc="178:6-178:62" data-file-name="app/avaliar/page.tsx">
        <div className="text-center mb-8" data-unique-id="c2d8d293-320e-4db2-afef-9222c8c1c274" data-loc="179:8-179:42" data-file-name="app/avaliar/page.tsx">
          <h1 className="text-3xl font-bold text-slate-900" data-unique-id="44163599-edde-461e-a21d-82b3f0cd52e3" data-loc="180:10-180:60" data-file-name="app/avaliar/page.tsx">Avaliar Artista</h1>
          <p className="mt-2 text-lg text-slate-600" data-unique-id="e6d69f1e-8d59-4596-8a1a-430e7cd92dbe" data-loc="181:10-181:53" data-file-name="app/avaliar/page.tsx">
            Dê sua opinião honesta e ganhe {formatCurrency(3)} por avaliação
          </p>
          <div className="mt-4" data-unique-id="fad645b1-2fec-4fa7-a39b-eaa2cc3d669f" data-loc="184:10-184:32" data-file-name="app/avaliar/page.tsx">
            {userId && <DailyRatingProgress userId={userId} />}
          </div>
        </div>
        
        {currentArtist && !showSuccess && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="bg-white rounded-xl shadow-md overflow-hidden" data-unique-id="ca9358ac-fa34-49ba-8a83-c27ceacce64c" data-loc="189:42-197:67" data-file-name="app/avaliar/page.tsx">
            <div className="md:flex" data-unique-id="a9126c35-17b0-490a-b0bc-cd606e2a04a9" data-loc="198:12-198:37" data-file-name="app/avaliar/page.tsx">
              <div className="md:flex-shrink-0 md:w-1/3" data-unique-id="df6ba791-f015-4216-8193-7cdeb33c97a6" data-loc="199:14-199:57" data-file-name="app/avaliar/page.tsx">
                <div className="relative h-80 md:h-full" data-unique-id="3d6ec88d-b68f-49f0-9698-e9d00dfd0116" data-loc="200:16-200:57" data-file-name="app/avaliar/page.tsx">
                  <Image src={currentArtist.imageUrl} alt={currentArtist.name} fill className="object-cover" data-unique-id="08ca8977-5b6a-45e6-b8ec-91280c16043c" data-loc="201:18-201:111" data-file-name="app/avaliar/page.tsx" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4" data-unique-id="761d1504-0da8-42e5-bc2f-0510e957302c" data-loc="202:18-202:118" data-file-name="app/avaliar/page.tsx">
                    <div className="flex items-center" data-unique-id="0b3e372f-1d61-4bd6-bb7b-93a211b7a450" data-loc="203:20-203:55" data-file-name="app/avaliar/page.tsx">
                      {currentArtist.platform === "Spotify" && <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2" data-unique-id="7fb6da35-3a9c-4801-a51f-dc11911511e2" data-loc="204:63-204:152" data-file-name="app/avaliar/page.tsx">
                          <Music2 size={12} className="text-white" />
                        </div>}
                      {currentArtist.platform === "YouTube" && <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center mr-2" data-unique-id="03f365c0-4cb4-45c6-b92a-dfe52cd8fc96" data-loc="207:63-207:150" data-file-name="app/avaliar/page.tsx">
                          <Music2 size={12} className="text-white" />
                        </div>}
                      {currentArtist.platform === "Deezer" && <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center mr-2" data-unique-id="1bdfe0fc-9c32-4400-a458-873eb2e7f272" data-loc="210:62-210:152" data-file-name="app/avaliar/page.tsx">
                          <Music2 size={12} className="text-white" />
                        </div>}
                      {currentArtist.platform === "SoundCloud" && <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center mr-2" data-unique-id="71b5829b-9848-43f2-aea2-f44fdacf3ed9" data-loc="213:66-213:156" data-file-name="app/avaliar/page.tsx">
                          <Music2 size={12} className="text-white" />
                        </div>}
                      {currentArtist.platform === "Apple Music" && <div className="h-5 w-5 rounded-full bg-pink-600 flex items-center justify-center mr-2" data-unique-id="2af1a879-2b82-46f0-83e6-b4ff47934d74" data-loc="216:67-216:155" data-file-name="app/avaliar/page.tsx">
                          <Music2 size={12} className="text-white" />
                        </div>}
                      <span className="text-sm font-medium text-white" data-unique-id="f651b196-1649-45ca-9443-ffcbc9be8567" data-loc="219:22-219:71" data-file-name="app/avaliar/page.tsx">{currentArtist.platform}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:w-2/3" data-unique-id="d867dd65-a45d-4caf-badd-23ffb63068f7" data-loc="225:14-225:44" data-file-name="app/avaliar/page.tsx">
                <div className="flex items-center justify-between mb-4" data-unique-id="dd57f68a-067d-44fd-8585-33e066f9c442" data-loc="226:16-226:72" data-file-name="app/avaliar/page.tsx">
                  <h2 className="text-2xl font-bold text-slate-900" data-unique-id="2d53d04f-7dca-4594-8ca1-ab316145a08f" data-loc="227:18-227:68" data-file-name="app/avaliar/page.tsx">
                    {currentArtist.name}
                  </h2>
                  {currentArtist.genre && <span className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full" data-unique-id="c8406e54-7d97-4d57-b6af-a642945f663d" data-loc="230:42-230:119" data-file-name="app/avaliar/page.tsx">
                      {currentArtist.genre}
                    </span>}
                </div>
                
                {currentArtist.followers && <p className="text-sm text-slate-500 mb-6" data-unique-id="2801952c-e8f1-4394-8af9-70b8cbf1137d" data-loc="235:44-235:87" data-file-name="app/avaliar/page.tsx">
                    {new Intl.NumberFormat("pt-BR").format(currentArtist.followers)} seguidores
                  </p>}
                
                <div className="mb-8" data-unique-id="a9538de6-4ccd-4b3a-b998-b47fcdc8d602" data-loc="239:16-239:38" data-file-name="app/avaliar/page.tsx">
                  <label className="block text-sm font-medium text-slate-700 mb-2" data-unique-id="f6fa93b3-ec74-4b40-b701-58a66ba8e70e" data-loc="240:18-240:83" data-file-name="app/avaliar/page.tsx">
                    Sua avaliação
                  </label>
                  <StarRating size="lg" value={rating} onChange={handleRatingChange} className="mb-1" />
                  <p className="text-xs text-slate-500" data-unique-id="e7f1591a-275b-4173-ba89-8830add1d883" data-loc="244:18-244:56" data-file-name="app/avaliar/page.tsx">
                    {rating === 0 && "Selecione uma avaliação"}
                    {rating === 1 && "Ruim"}
                    {rating === 2 && "Regular"}
                    {rating === 3 && "Bom"}
                    {rating === 4 && "Muito bom"}
                    {rating === 5 && "Excelente"}
                  </p>
                </div>
                
                <div className="mb-6" data-unique-id="fab04074-d9de-4621-950c-e811d6dcb160" data-loc="254:16-254:38" data-file-name="app/avaliar/page.tsx">
                  <label className="block text-sm font-medium text-slate-700 mb-2" data-unique-id="09cbb845-7124-4dd6-aed7-34e854b7ecbd" data-loc="255:18-255:83" data-file-name="app/avaliar/page.tsx">
                    Comentário (opcional)
                  </label>
                  <div className="relative" data-unique-id="6a96c061-9d5f-418f-9053-6d8e8fcec4af" data-loc="258:18-258:44" data-file-name="app/avaliar/page.tsx">
                    <div className="absolute left-3 top-3 text-slate-400" data-unique-id="7fb0b446-b2ea-4fff-accb-8d27fd99b34c" data-loc="259:20-259:74" data-file-name="app/avaliar/page.tsx">
                      <PenLine size={16} />
                    </div>
                    <Textarea placeholder="Compartilhe sua opinião sobre este artista..." value={comment} onChange={handleCommentChange} className="pl-9 min-h-[120px]" data-unique-id="2489bcd9-0152-414a-b545-6353d8a54bd2" data-loc="262:20-262:170" data-file-name="app/avaliar/page.tsx" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between" data-unique-id="44bb1a00-bf35-41eb-9a9d-f3bbc0adfb0d" data-loc="266:16-266:67" data-file-name="app/avaliar/page.tsx">
                  <div className="flex items-center text-green-600" data-unique-id="4156cf28-ca53-4245-874c-a2ebca75b348" data-loc="267:18-267:68" data-file-name="app/avaliar/page.tsx">
                    <Award className="h-5 w-5 mr-1" />
                    <span className="font-medium" data-unique-id="743ae903-cc1c-4107-b994-c18daafa1112" data-loc="269:20-269:50" data-file-name="app/avaliar/page.tsx">{formatCurrency(3)} de recompensa</span>
                  </div>
                  <Button variant="primary" disabled={isSubmitting} onClick={handleSubmit} data-unique-id="5930959f-5874-460e-894c-6d5469abd792" data-loc="271:18-271:91" data-file-name="app/avaliar/page.tsx">
                    {isSubmitting ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </> : "Enviar avaliação"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>}
        
        {showSuccess && <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-xl shadow-md p-8 text-center" data-unique-id="8da31521-0767-48f8-b95b-11b47f76ecd9" data-loc="282:24-288:67" data-file-name="app/avaliar/page.tsx">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4" data-unique-id="c93c51d7-f287-4b7c-9db4-2b3f32e2beda" data-loc="289:12-289:111" data-file-name="app/avaliar/page.tsx">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2" data-unique-id="8bb6502d-b772-45b6-a518-84014395566c" data-loc="292:12-292:67" data-file-name="app/avaliar/page.tsx">
              Avaliação enviada!
            </h2>
            <p className="text-lg text-slate-600 mb-2" data-unique-id="b1cb191b-252f-40ee-b704-52d5099816e4" data-loc="295:12-295:55" data-file-name="app/avaliar/page.tsx">
              Obrigado por avaliar {currentArtist?.name}
            </p>
            <p className="text-green-600 font-semibold flex items-center justify-center mb-6" data-unique-id="4fca7451-f705-4331-9e7f-5a745422ea25" data-loc="298:12-298:94" data-file-name="app/avaliar/page.tsx">
              <Award className="h-5 w-5 mr-1" />
              {formatCurrency(3)} foram adicionados ao seu saldo
            </p>
            <div className="flex items-center justify-center" data-unique-id="02c69fdc-34ee-422e-9443-2ab5f71a4b3a" data-loc="302:12-302:62" data-file-name="app/avaliar/page.tsx">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-2" />
              <span className="text-slate-500" data-unique-id="163d6af0-9480-48de-8c99-ce266048223b" data-loc="304:14-304:47" data-file-name="app/avaliar/page.tsx">Carregando próximo artista...</span>
            </div>
          </motion.div>}
      </div>
    </div>;
}