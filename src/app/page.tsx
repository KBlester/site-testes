"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getArtists, getAuthStatus, initializeArtists } from "@/lib/data";
import { Artist } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Award, CheckCircle, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ArtistCard } from "@/components/artist-card";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize artists data if not exists
      initializeArtists();

      // Get artists and auth status
      setArtists(getArtists());
      const {
        isAuthenticated
      } = getAuthStatus();
      setIsAuthenticated(isAuthenticated);
    }
  }, []);
  return <div className="flex flex-col min-h-screen" data-unique-id="35521240-1833-4eca-aff6-3e613273a6c4" data-loc="29:9-29:53" data-file-name="app/page.tsx">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white" data-unique-id="49e78a3d-5e1b-4a3c-9a2a-92d244a8166b" data-loc="31:6-31:89" data-file-name="app/page.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="b3020c5a-9c68-4d3c-aace-e96e0abe59e8" data-loc="32:8-32:64" data-file-name="app/page.tsx">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-unique-id="21ab5f6f-f9bc-45bf-8c0c-cbd1813a18bd" data-loc="33:10-33:79" data-file-name="app/page.tsx">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="space-y-6" data-unique-id="74574ba9-2719-4dc0-931e-b8521a79d5fd" data-loc="34:12-42:35" data-file-name="app/page.tsx">
              <h1 className="text-4xl sm:text-5xl font-bold" data-unique-id="ffa050e8-c6ac-4113-ae50-d661bfb4f929" data-loc="43:14-43:61" data-file-name="app/page.tsx">
                Avalie seus artistas favoritos e ganhe recompensas
              </h1>
              <p className="text-xl opacity-90" data-unique-id="11b4b13a-a59e-47b7-912a-fbc34a7652d0" data-loc="46:14-46:48" data-file-name="app/page.tsx">
                Descubra, avalie e compartilhe suas opiniões sobre artistas das principais 
                plataformas de streaming musical.
              </p>
              <div className="flex flex-wrap gap-4" data-unique-id="5b7be949-11de-4741-8006-b3323372434f" data-loc="50:14-50:52" data-file-name="app/page.tsx">
                <Link href={isAuthenticated ? "/avaliar" : "/login"} data-unique-id="1c13c388-bd53-4f52-8f9a-0d356de0b0b5" data-loc="51:16-51:69" data-file-name="app/page.tsx">
                  <Button variant="primary" size="lg" className="text-base font-medium bg-white text-blue-600 hover:bg-blue-50" data-unique-id="e496b1b3-5ed6-4d01-8715-0b855c1a4243" data-loc="52:18-52:128" data-file-name="app/page.tsx">
                    {isAuthenticated ? "Começar a avaliar" : "Entrar para avaliar"}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                {!isAuthenticated && <Link href="/registro" data-unique-id="b21f63d9-fc7d-4986-8fda-d67ac6425e6f" data-loc="57:37-57:60" data-file-name="app/page.tsx">
                    <Button variant="outline" size="lg" className="text-base font-medium bg-transparent border-white text-white hover:bg-white/10" data-unique-id="abd09c7a-d86b-4ae4-9736-2661a5e71408" data-loc="58:20-58:147" data-file-name="app/page.tsx">
                      Criar conta
                    </Button>
                  </Link>}
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="relative aspect-video rounded-xl overflow-hidden shadow-2xl hidden lg:block" data-unique-id="81be8c2c-a9b9-41d9-bd1c-aeb931e2ead7" data-loc="65:12-74:101" data-file-name="app/page.tsx">
              <Image src="https://picsum.photos/200" alt="Concerto musical" fill className="object-cover" data-unique-id="b050a45b-5b26-4b36-b642-cc8ccc54da86" data-loc="75:14-75:108" data-file-name="app/page.tsx" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white" data-unique-id="3a542341-a908-4a6b-bc2b-8e627f31241f" data-loc="82:6-82:42" data-file-name="app/page.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="98eade8f-3fb3-41c1-9956-22bfb3387fe0" data-loc="83:8-83:64" data-file-name="app/page.tsx">
          <div className="text-center mb-12" data-unique-id="8330e78a-3e02-4cee-bef8-022b34118fe8" data-loc="84:10-84:45" data-file-name="app/page.tsx">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" data-unique-id="0c478854-db62-4e02-b7c4-8a172803b732" data-loc="85:12-85:67" data-file-name="app/page.tsx">
              Como funciona
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto" data-unique-id="b299c7f2-a8ed-464c-9bf2-932fce4864c8" data-loc="88:12-88:68" data-file-name="app/page.tsx">
              Avalie artistas de plataformas populares e receba recompensas por cada avaliação
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-unique-id="851220ea-11e6-48d4-9792-126f85b2bbda" data-loc="93:10-93:65" data-file-name="app/page.tsx">
            {[{
            icon: <Users className="h-8 w-8 text-blue-600" data-unique-id={`1add25fb-13fd-4052-9172-0da02475d071_${i}`} data-loc="95:18-95:61" data-file-name="app/page.tsx" />,
            title: "Descubra Artistas",
            description: "Explore artistas de diversas plataformas como Spotify, YouTube, Deezer e mais."
          }, {
            icon: <Star className="h-8 w-8 text-yellow-500" data-unique-id={`6b18a84b-d7ad-4ed5-a14b-ef6e2e671d5d_${i}`} data-loc="99:18-99:62" data-file-name="app/page.tsx" />,
            title: "Avalie e Comente",
            description: "Dê sua avaliação honesta e compartilhe comentários sobre os artistas."
          }, {
            icon: <Award className="h-8 w-8 text-green-600" data-unique-id={`516763b6-7219-400d-9fea-337074113f2c_${i}`} data-loc="103:18-103:62" data-file-name="app/page.tsx" />,
            title: "Ganhe Recompensas",
            description: "Receba R$3,00 para cada avaliação realizada e acumule seu saldo."
          }].map((item, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: i * 0.1
          }} className="bg-slate-50 rounded-xl p-6 flex flex-col items-center text-center" data-unique-id="7828517a-b53b-4e80-b0fa-790dcc421608" data-loc="106:30-117:91" data-file-name="app/page.tsx">
                <div className="bg-white p-3 rounded-full mb-4 shadow-sm" data-unique-id="067bc217-c1a8-4c8d-afa7-53127e0a9019" data-loc="118:16-118:74" data-file-name="app/page.tsx">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900" data-unique-id="5c9ed455-de5c-46dd-8654-c9bbcf3dc910" data-loc="121:16-121:74" data-file-name="app/page.tsx">{item.title}</h3>
                <p className="text-slate-600" data-unique-id="5e4289bb-e1f5-40d5-9a16-1a2a7d6855e5" data-loc="122:16-122:46" data-file-name="app/page.tsx">{item.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* Featured Artists Section */}
      <section className="py-16 bg-slate-50" data-unique-id="ef6964ff-05be-4851-9fb4-ee39b793b5ab" data-loc="129:6-129:45" data-file-name="app/page.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="44cdc7a4-5441-4e5c-bf2d-f719f82e048c" data-loc="130:8-130:64" data-file-name="app/page.tsx">
          <div className="flex justify-between items-center mb-8" data-unique-id="d5eb215a-61a9-4e2e-ba34-2feea329cca5" data-loc="131:10-131:66" data-file-name="app/page.tsx">
            <h2 className="text-3xl font-bold text-slate-900" data-unique-id="5687f44a-d99f-4da9-86fb-c35d35752025" data-loc="132:12-132:62" data-file-name="app/page.tsx">
              Artistas em Destaque
            </h2>
            <Link href={isAuthenticated ? "/avaliar" : "/login"} data-unique-id="8ddb29a8-6341-4cd9-aa42-7da036abbea4" data-loc="135:12-135:65" data-file-name="app/page.tsx">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" data-unique-id="ec065192-6114-4d93-b4ee-0178fd45e40b" data-loc="136:14-136:101" data-file-name="app/page.tsx">
                Ver todos
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center" data-unique-id="30be055f-9198-426a-950c-4a65fb205ca1" data-loc="143:10-143:116" data-file-name="app/page.tsx">
            {artists.slice(0, 5).map((artist, i) => <motion.div key={artist.id} initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: i * 0.1
          }} data-unique-id="834f1040-3957-409c-9c66-710e18f9ab4a" data-loc="144:52-153:13" data-file-name="app/page.tsx">
                <ArtistCard artist={artist} data-unique-id={`37688c2c-cb1b-4b30-8a60-b9181ead4514_${i}`} data-loc="154:16-154:46" data-file-name="app/page.tsx" />
              </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white" data-unique-id="5f1a533e-501a-4d0e-a853-1c314874299d" data-loc="161:6-161:56" data-file-name="app/page.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-unique-id="73083594-ba4b-4bc8-92aa-f5847dce72a4" data-loc="162:8-162:76" data-file-name="app/page.tsx">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="max-w-3xl mx-auto" data-unique-id="951deacf-77bf-4813-9f44-8f4f22b5fd2b" data-loc="163:10-173:41" data-file-name="app/page.tsx">
            <h2 className="text-3xl font-bold mb-6" data-unique-id="3413c0c9-6ede-453b-9db3-21d888636874" data-loc="174:12-174:52" data-file-name="app/page.tsx">
              Comece a avaliar artistas agora mesmo
            </h2>
            <p className="text-xl mb-8 opacity-90" data-unique-id="65255a26-05a9-44e6-a6f8-9f05dae70cd2" data-loc="177:12-177:51" data-file-name="app/page.tsx">
              Contribua com sua opinião e ganhe R$3,00 para cada avaliação realizada.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-unique-id="0e45f6d6-527a-4b9e-9968-218a8f0febd4" data-loc="180:12-180:65" data-file-name="app/page.tsx">
              <Link href={isAuthenticated ? "/avaliar" : "/login"} data-unique-id="307b6bbe-8bf3-4405-a966-beced2012361" data-loc="181:14-181:67" data-file-name="app/page.tsx">
                <Button variant="primary" size="lg" className="text-base font-medium bg-white text-blue-600 hover:bg-blue-50" data-unique-id="4735270d-8542-40a6-916b-fea213a09353" data-loc="182:16-182:126" data-file-name="app/page.tsx">
                  {isAuthenticated ? "Começar a avaliar" : "Fazer login"}
                </Button>
              </Link>
              {!isAuthenticated && <Link href="/registro" data-unique-id="8c62124d-89c4-415b-81e8-23d0c0c91fc5" data-loc="186:35-186:58" data-file-name="app/page.tsx">
                  <Button variant="outline" size="lg" className="text-base font-medium bg-transparent border-white text-white hover:bg-white/10" data-unique-id="12cfe31e-5f71-4a0b-81f4-3dbd2fafd44d" data-loc="187:18-187:145" data-file-name="app/page.tsx">
                    Criar uma conta
                  </Button>
                </Link>}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white" data-unique-id="ca194159-84d4-46c5-ad3d-d3f8a9b0aba3" data-loc="197:6-197:42" data-file-name="app/page.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="87aa1b68-57e7-4bce-835a-13e23b1fda87" data-loc="198:8-198:64" data-file-name="app/page.tsx">
          <div className="text-center mb-12" data-unique-id="12642a5a-47c0-4683-ae42-184393028b5c" data-loc="199:10-199:45" data-file-name="app/page.tsx">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" data-unique-id="c8ac424d-0815-45fd-a6d7-731805fe0c50" data-loc="200:12-200:67" data-file-name="app/page.tsx">
              Recursos da plataforma
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto" data-unique-id="368ccaa5-b11b-4da4-b7da-234cf19e1bc8" data-loc="203:12-203:68" data-file-name="app/page.tsx">
              Tudo o que você precisa para avaliar artistas e receber recompensas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-unique-id="afbfbbc1-f9d5-4acf-adb0-83f3934afded" data-loc="208:10-208:80" data-file-name="app/page.tsx">
            {[{
            title: "Recompensas por avaliação",
            description: "Ganhe R$3,00 para cada avaliação que você realizar na plataforma.",
            icon: <CheckCircle className="h-6 w-6 text-green-500" data-unique-id={`18d96c90-b7f5-46a8-b393-90ff2455d0bb_${i}`} data-loc="212:18-212:68" data-file-name="app/page.tsx" />
          }, {
            title: "Histórico de avaliações",
            description: "Acompanhe todas as avaliações que você já realizou na plataforma.",
            icon: <CheckCircle className="h-6 w-6 text-green-500" data-unique-id={`eaf60259-2b86-4c77-94d9-9deae397998e_${i}`} data-loc="216:18-216:68" data-file-name="app/page.tsx" />
          }, {
            title: "Saque de recompensas",
            description: "Realize saques do seu saldo acumulado pagando apenas uma pequena taxa.",
            icon: <CheckCircle className="h-6 w-6 text-green-500" data-unique-id={`ad006fad-49c4-46ee-ab11-26eb7136839e_${i}`} data-loc="220:18-220:68" data-file-name="app/page.tsx" />
          }, {
            title: "Diversidade de artistas",
            description: "Avalie artistas de diferentes plataformas e gêneros musicais.",
            icon: <CheckCircle className="h-6 w-6 text-green-500" data-unique-id={`4e0f08b2-06d0-42f1-85fb-f72a12471899_${i}`} data-loc="224:18-224:68" data-file-name="app/page.tsx" />
          }, {
            title: "Interface intuitiva",
            description: "Navegue facilmente pela plataforma com uma interface moderna e intuitiva.",
            icon: <CheckCircle className="h-6 w-6 text-green-500" data-unique-id={`c725e5a7-506a-40b3-b84b-7e50055918a3_${i}`} data-loc="228:18-228:68" data-file-name="app/page.tsx" />
          }, {
            title: "Feedback imediato",
            description: "Receba confirmação instantânea de suas avaliações e créditos.",
            icon: <CheckCircle className="h-6 w-6 text-green-500" data-unique-id={`701eb2df-ce67-4a82-921f-6b8c8a2ac509_${i}`} data-loc="232:18-232:68" data-file-name="app/page.tsx" />
          }].map((feature, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.3,
            delay: i * 0.1
          }} className="bg-slate-50 p-6 rounded-lg" data-unique-id="5334ece7-ef32-4d07-a81f-389904c43f55" data-loc="233:33-244:52" data-file-name="app/page.tsx">
                <div className="flex items-start" data-unique-id="07d83768-26bd-463d-b63a-f6451830c336" data-loc="245:16-245:50" data-file-name="app/page.tsx">
                  <div className="mr-4 mt-1" data-unique-id="2179ab57-a7a1-4e7c-85f6-c39eaa47c598" data-loc="246:18-246:45" data-file-name="app/page.tsx">
                    {feature.icon}
                  </div>
                  <div data-unique-id="8af28770-64ea-4787-bb1b-ac6c7f937837" data-loc="249:18-249:23" data-file-name="app/page.tsx">
                    <h3 className="text-lg font-semibold mb-2 text-slate-900" data-unique-id="b216eeee-78bf-48b9-a341-f0b6e4db9958" data-loc="250:20-250:78" data-file-name="app/page.tsx">{feature.title}</h3>
                    <p className="text-slate-600" data-unique-id="7bfbbb0e-35f7-45b5-a173-ca2503117e75" data-loc="251:20-251:50" data-file-name="app/page.tsx">{feature.description}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
}