"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getArtistById, getAuthStatus, getUserRatings } from "@/lib/data";
import { Artist, Rating } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Clock, Loader2, MessageCircle, Search, Star } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { Input } from "@/components/ui/input";
type RatingWithArtist = Rating & {
  artist: Artist;
};
export default function HistoricoPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<RatingWithArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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

      // Get user ratings
      const userRatings = getUserRatings(currentUser.id);

      // Get artist details for each rating
      const ratingsWithArtist = userRatings.map(rating => {
        const artist = getArtistById(rating.artistId);
        return {
          ...rating,
          artist: artist!
        };
      });

      // Sort ratings by date (newest first)
      ratingsWithArtist.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setRatings(ratingsWithArtist);
      setIsLoading(false);
    }
  }, [router]);
  const filteredRatings = ratings.filter(rating => rating.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || rating.comment && rating.comment.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12" data-unique-id="9385f067-fbbc-4348-9ff4-16fbdb5906e3" data-loc="53:9-53:69" data-file-name="app/historico/page.tsx">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="51728440-e835-4025-99ef-bfbc99a7ede4" data-loc="54:6-54:62" data-file-name="app/historico/page.tsx">
        <div className="mb-8" data-unique-id="7de6eddc-a0d4-4fa8-a747-f7db98cdfb93" data-loc="55:8-55:30" data-file-name="app/historico/page.tsx">
          <h1 className="text-3xl font-bold text-slate-900" data-unique-id="af5e2eba-21f4-40a4-a362-825a8d6747e9" data-loc="56:10-56:60" data-file-name="app/historico/page.tsx">Histórico de Avaliações</h1>
          <p className="mt-2 text-lg text-slate-600" data-unique-id="591a5289-1999-4529-be3a-a1bf7482e02e" data-loc="57:10-57:53" data-file-name="app/historico/page.tsx">
            Veja todas as suas avaliações realizadas na plataforma
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8" data-unique-id="e3b59db2-4002-4144-a790-6f694a2bc085" data-loc="62:8-62:76" data-file-name="app/historico/page.tsx">
          <div className="p-6" data-unique-id="4e2cb5c1-1374-4023-a387-6b9b6fff1537" data-loc="63:10-63:31" data-file-name="app/historico/page.tsx">
            <div className="relative" data-unique-id="390b7572-d0bc-486f-a4b4-cdeb8baf9ac8" data-loc="64:12-64:38" data-file-name="app/historico/page.tsx">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input type="text" placeholder="Pesquisar avaliações por nome de artista ou comentário..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} data-unique-id="b1a76468-1dfe-4ba8-b78d-16c2bcbeda64" data-loc="66:14-66:190" data-file-name="app/historico/page.tsx" />
            </div>
          </div>
          
          {isLoading ? <div className="flex items-center justify-center p-12" data-unique-id="39db0dcb-e180-43f9-b5e6-9588be8a101b" data-loc="70:23-70:78" data-file-name="app/historico/page.tsx">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div> : filteredRatings.length === 0 ? <div className="text-center p-12 bg-slate-50" data-unique-id="20bc45b4-7307-475c-acba-048dfd6c1b75" data-loc="72:52-72:98" data-file-name="app/historico/page.tsx">
              {searchTerm ? <>
                  <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1" data-unique-id="4040b843-cbaa-4951-90fe-20dba49bd96b" data-loc="75:18-75:74" data-file-name="app/historico/page.tsx">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-slate-500" data-unique-id="3a297609-a31a-4b23-9a1d-62cf2d0b83e0" data-loc="78:18-78:48" data-file-name="app/historico/page.tsx">
                    Não foram encontradas avaliações para "{searchTerm}"
                  </p>
                </> : <>
                  <Star className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1" data-unique-id="32a0b889-16a4-4697-83eb-d2b1fbfbe6c1" data-loc="83:18-83:74" data-file-name="app/historico/page.tsx">
                    Nenhuma avaliação realizada
                  </h3>
                  <p className="text-slate-500 mb-4" data-unique-id="65baba21-7822-426b-ad7a-f3972ecdfa71" data-loc="86:18-86:53" data-file-name="app/historico/page.tsx">
                    Você ainda não avaliou nenhum artista. Comece agora mesmo!
                  </p>
                  <button onClick={() => router.push("/avaliar")} className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700" data-unique-id="3cfb5957-3be5-40b1-b9fc-7dd47a37a63b" data-loc="89:18-89:360" data-file-name="app/historico/page.tsx">
                    Avaliar artistas
                  </button>
                </>}
            </div> : <div data-unique-id="ad661061-9324-4f03-8ecf-95661cac86b9" data-loc="93:21-93:26" data-file-name="app/historico/page.tsx">
              <div className="overflow-x-auto" data-unique-id="d360140e-7580-43fc-9329-efd754dea2cc" data-loc="94:14-94:47" data-file-name="app/historico/page.tsx">
                <table className="min-w-full divide-y divide-slate-200" data-unique-id="0c18ab63-bdfa-4d9d-bfc3-62c3ec9ad20d" data-loc="95:16-95:72" data-file-name="app/historico/page.tsx">
                  <thead className="bg-slate-50" data-unique-id="bb23bf2a-52a3-4886-a21f-8f7511fc7c7b" data-loc="96:18-96:49" data-file-name="app/historico/page.tsx">
                    <tr data-unique-id="8c75ab9c-73b3-4b29-a76b-9a395a356b9f" data-loc="97:20-97:24" data-file-name="app/historico/page.tsx">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="8c7bfac6-b265-49ca-98e4-683e078bbb05" data-loc="98:22-98:130" data-file-name="app/historico/page.tsx">
                        Artista
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="4bc82b58-22ef-4ed5-b5d6-1f808fab5fd3" data-loc="101:22-101:130" data-file-name="app/historico/page.tsx">
                        Plataforma
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="c3dfbc36-cf47-4d8c-9fbd-15fe50d42fd7" data-loc="104:22-104:130" data-file-name="app/historico/page.tsx">
                        Avaliação
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="6a46bf38-6656-4ef1-a6fa-d3a8618bc0df" data-loc="107:22-107:130" data-file-name="app/historico/page.tsx">
                        Comentário
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" data-unique-id="fdb8ca42-f15f-4854-a841-37358186de3e" data-loc="110:22-110:130" data-file-name="app/historico/page.tsx">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200" data-unique-id="54ae9592-3e6d-4f30-9a47-42717c6a4415" data-loc="115:18-115:72" data-file-name="app/historico/page.tsx">
                    {filteredRatings.map(rating => <tr key={rating.id} className="hover:bg-slate-50" data-unique-id="6cc84610-60e1-409b-a764-2fe80584124a" data-loc="116:51-116:101" data-file-name="app/historico/page.tsx">
                        <td className="px-6 py-4 whitespace-nowrap" data-unique-id="59bec52f-0f8a-4f50-9ccf-4051137b589f" data-loc="117:24-117:68" data-file-name="app/historico/page.tsx">
                          <div className="flex items-center" data-unique-id="45b3d36c-8382-479a-837a-a3ea3f83d136" data-loc="118:26-118:61" data-file-name="app/historico/page.tsx">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden relative" data-unique-id="bb6b666a-044e-4266-851a-4ad4c98eedd4" data-loc="119:28-119:107" data-file-name="app/historico/page.tsx">
                              <Image src={rating.artist.imageUrl} alt={rating.artist.name} fill className="object-cover" data-unique-id="89d25782-40c4-46af-bdfe-e669e7b97c0b" data-loc="120:30-120:123" data-file-name="app/historico/page.tsx" />
                            </div>
                            <div className="ml-4" data-unique-id="98e26d8c-f2e1-4c67-abdd-b553ea8d3354" data-loc="122:28-122:50" data-file-name="app/historico/page.tsx">
                              <div className="text-sm font-medium text-slate-900" data-unique-id="ef25d343-5850-4a45-b3c0-084c45d41649" data-loc="123:30-123:82" data-file-name="app/historico/page.tsx">
                                {rating.artist.name}
                              </div>
                              <div className="text-sm text-slate-500" data-unique-id="2312a4e0-d826-4f4f-8586-97336fd7765f" data-loc="126:30-126:70" data-file-name="app/historico/page.tsx">
                                {rating.artist.genre}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" data-unique-id="68c45312-a20d-49d9-ae92-0604742820ce" data-loc="132:24-132:68" data-file-name="app/historico/page.tsx">
                          <div className="text-sm text-slate-900" data-unique-id="d0d9e2b5-b20f-4181-a8c1-2d1fc254f42f" data-loc="133:26-133:66" data-file-name="app/historico/page.tsx">
                            {rating.artist.platform}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" data-unique-id="8cbe0368-efd6-46e7-a8cf-679367466488" data-loc="137:24-137:68" data-file-name="app/historico/page.tsx">
                          <StarRating value={rating.score} readonly size="sm" />
                        </td>
                        <td className="px-6 py-4" data-unique-id="21bb46bb-558b-4d9d-b09a-94cf1d848ec7" data-loc="140:24-140:50" data-file-name="app/historico/page.tsx">
                          <div className="text-sm text-slate-500 max-w-xs truncate" data-unique-id="5a6f6683-9770-426b-a188-a87440f6fb56" data-loc="141:26-141:84" data-file-name="app/historico/page.tsx">
                            {rating.comment ? <div className="flex items-start" data-unique-id="82a14294-029f-4088-9dff-8af09198f244" data-loc="142:46-142:80" data-file-name="app/historico/page.tsx">
                                <MessageCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                                <span data-unique-id="e07549a6-bda7-46d4-b8cd-7c83ec008538" data-loc="144:32-144:38" data-file-name="app/historico/page.tsx">{rating.comment}</span>
                              </div> : <span className="text-slate-400 italic" data-unique-id="dded101f-bfa3-4718-a6b7-c96750b5d59b" data-loc="145:39-145:79" data-file-name="app/historico/page.tsx">Sem comentário</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" data-unique-id="f678c148-9b98-4e0a-b853-711a49b6eb4d" data-loc="148:24-148:68" data-file-name="app/historico/page.tsx">
                          <div className="text-sm text-slate-500 flex items-center" data-unique-id="0a4bd158-bea4-46d2-a536-b4b5aaae724f" data-loc="149:26-149:84" data-file-name="app/historico/page.tsx">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(rating.createdAt)}
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 border-t border-slate-200" data-unique-id="a2609c17-ccc1-41a8-81e5-bc73ac8678eb" data-loc="159:14-159:67" data-file-name="app/historico/page.tsx">
                <p className="text-sm text-slate-500" data-unique-id="a2a3eb16-0c0c-43e9-9a30-4bf5f23ff009" data-loc="160:16-160:54" data-file-name="app/historico/page.tsx">
                  Exibindo {filteredRatings.length} de {ratings.length} avaliações
                </p>
              </div>
            </div>}
        </div>
      </div>
    </div>;
}