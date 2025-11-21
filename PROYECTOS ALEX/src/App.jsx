import React, { useState, useRef, useEffect } from 'react';
import { Instagram, ExternalLink, Recycle, ShoppingBag, Search, Zap, MessageCircle, Send, X, Sparkles, Filter, ArrowUpDown, Package, Tag, Layers, Smartphone, Home, Gamepad2, Trophy, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc'); 
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Proyectos Alex. 🤖 ¿Buscas algo en concreto? Pregúntame por precios o categorías.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const apiKey = ""; 

  const wallapopProducts = [
    { id: 1, name: "Patinete Freestyle NKD", price: "70 €", link: "https://es.wallapop.com/item/patinete-freestyle-nkd-1199972777", condition: "Usado", category: "Deporte" },
    { id: 2, name: "Patinete Eléctrico Personalizado", price: "280 €", link: "https://es.wallapop.com/item/patinete-electrico-personalizado-1199945459", condition: "Custom", category: "Deporte" },
    { id: 3, name: "Patinete Eléctrico ZWHEEL", price: "310 €", link: "https://es.wallapop.com/item/patinete-electrico-1198789289", condition: "Seminuevo", category: "Deporte" },
    { id: 4, name: "Patinete Eléctrico (Modelo B)", price: "280 €", link: "https://es.wallapop.com/user/lexb-446364407", condition: "Usado", category: "Deporte" },
    { id: 5, name: "Cuentos para dormir", price: "5 €", link: "https://es.wallapop.com/item/cuentos-para-dormir-1050199734", condition: "Libros", category: "Ocio" },
    { id: 6, name: "Gafas VR para teléfono móvil", price: "5 €", link: "https://es.wallapop.com/item/gafas-3d-para-telefono-movil-1050200392", condition: "Nuevo", category: "Tech" },
    { id: 7, name: "Afeitadora PHILISHAVE Retro", price: "5 €", link: "https://es.wallapop.com/item/afeitadora-philishave-retro-1167564407", condition: "Vintage", category: "Hogar" },
    { id: 8, name: "Patinete manual Acrobático", price: "40 €", link: "https://es.wallapop.com/item/patinete-manual-decathlon-1185366491", condition: "Buen estado", category: "Deporte" },
    { id: 9, name: "Gafas de protección 3M", price: "5 €", link: "https://es.wallapop.com/item/gafas-de-proteccion-1090402335", condition: "Útil", category: "Hogar" },
    { id: 10, name: "Botijos (Colección Principal)", price: "1 €", link: "https://es.wallapop.com/item/botijos-1048603463", condition: "Decoración", category: "Hogar" },
    { id: 11, name: "Libros de Karlos Arguiñano", price: "5 €", link: "https://es.wallapop.com/item/libros-de-karlos-arguinano-1054113842", condition: "Cocina", category: "Cocina" },
    { id: 12, name: "Juegos de mesa (Pictureka)", price: "5 €", link: "https://es.wallapop.com/item/juegos-de-mesa-1049858529", condition: "Ocio", category: "Ocio" },
    { id: 13, name: "Sujeta auriculares", price: "8 €", link: "https://es.wallapop.com/item/sujeta-auriculares-1107526068", condition: "Setup", category: "Tech" },
    { id: 14, name: "Teclado G-LAB", price: "10 €", link: "https://es.wallapop.com/item/teclado-g-lab-1107530685", condition: "Gaming", category: "Tech" },
    { id: 15, name: "DVD Reproductor", price: "5 €", link: "https://es.wallapop.com/item/dvd-1104292239", condition: "Cine", category: "Tech" },
    { id: 16, name: "Cargador (Airsoft/Juguete)", price: "5 €", link: "https://es.wallapop.com/item/cargador-1090400496", condition: "Accesorios", category: "Ocio" },
    { id: 17, name: "Extractor de leche materna", price: "8 €", link: "https://es.wallapop.com/item/extractor-de-leche-materna-1104289219", condition: "Bebés", category: "Hogar" },
    { id: 18, name: "Ratón G-LAB", price: "10 €", link: "https://es.wallapop.com/item/raton-g-lab-1107528279", condition: "Gaming", category: "Tech" },
    { id: 19, name: "Alfombra teclado y ratón (RGB)", price: "10 €", link: "https://es.wallapop.com/item/alfombra-para-teclado-y-raton-1107539889", condition: "Setup", category: "Tech" },
    { id: 20, name: "Juegos de mesa (Mecánica)", price: "8 €", link: "https://es.wallapop.com/item/juegos-de-mesa-1088843193", condition: "Educativo", category: "Ocio" },
    { id: 21, name: "Cometa Decathlon", price: "5 €", link: "https://es.wallapop.com/item/cometa-1090426546", condition: "Aire Libre", category: "Deporte" },
    { id: 22, name: "Botijos (Lote Extra)", price: "5 €", link: "https://es.wallapop.com/item/botijos-1058525766", condition: "Decoración", category: "Hogar" }
  ];

  const getCategoryDetails = (category) => {
    switch(category) {
      case 'Deporte': return { color: 'from-blue-600 to-cyan-400', icon: <Trophy size={24} /> };
      case 'Tech': return { color: 'from-violet-600 to-fuchsia-400', icon: <Smartphone size={24} /> };
      case 'Hogar': return { color: 'from-amber-500 to-orange-400', icon: <Home size={24} /> };
      case 'Ocio': return { color: 'from-emerald-500 to-teal-400', icon: <Gamepad2 size={24} /> };
      case 'Cocina': return { color: 'from-red-500 to-rose-400', icon: <Utensils size={24} /> };
      default: return { color: 'from-gray-600 to-slate-400', icon: <Package size={24} /> };
    }
  };

  const filteredAndSortedProducts = [...wallapopProducts]
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const getPrice = (p) => parseInt(p.replace(' €', '').replace('.', ''));

      switch (sortBy) {
        case 'price-asc':
          return getPrice(a.price) - getPrice(b.price);
        case 'price-desc':
          return getPrice(b.price) - getPrice(a.price);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const productContext = wallapopProducts.map(p => `- ${p.name} (${p.price}): ${p.category}.`).join('\n');
      const systemInstruction = `Eres el asistente de ventas de Proyectos Alex. Productos:\n${productContext}\n. Sé breve, profesional y ayuda a vender.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
          })
        }
      );
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error técnico.";
      setChatMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'model', text: "Necesito API Key." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500 selection:text-black relative">
      <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-cyan-500/20">
                PA
            </div>
            <span className="font-bold text-xl tracking-tight">PROYECTOS <span className="text-cyan-400">ALEX</span></span>
          </div>
          <div className="flex gap-4"><a href="https://instagram.com/proyectos.alex" target="_blank" className="hover:text-cyan-400 transition-colors"><Instagram size={20} /></a></div>
        </div>
      </nav>

      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-cyan-400 font-medium backdrop-blur-sm">
            <Sparkles size={14} />
            <span>Comercio Local & Grandes Ideas</span>
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Donde los Pequeños <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Proyectos Crecen</span>
          </motion.h1>
          
          <motion.div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3 relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
              <input type="text" placeholder="Buscar patinetes, juegos..." className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className="relative w-full md:w-auto">
              <ArrowUpDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18}/>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full md:w-64 appearance-none bg-gray-800 border border-gray-700 rounded-xl py-4 pl-12 pr-10 text-white focus:border-cyan-500 outline-none cursor-pointer font-medium transition-all hover:bg-gray-750">
                <option value="price-asc">Precio: Bajo a Alto</option>
                <option value="price-desc">Precio: Alto a Bajo</option>
                <option value="category">Categoría (A-Z)</option>
              </select>
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16}/>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-black min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10 px-2 border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 text-white"><Layers className="text-cyan-400"/> Disponibles</h2>
              <p className="text-gray-500 text-sm mt-1">Explora la lista completa de artículos</p>
            </div>
            <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800">{filteredAndSortedProducts.length} ITEMS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
            {filteredAndSortedProducts.map((item) => {
              const { color, icon } = getCategoryDetails(item.category);
              return (
                <a key={item.id} href={item.link} target="_blank" className="block group relative">
                  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col shadow-lg">
                    <div className={`h-24 bg-gradient-to-br ${color} relative p-4 flex justify-between items-start`}>
                       <div className="bg-black/30 backdrop-blur-md p-2 rounded-lg text-white">
                          {icon}
                       </div>
                       <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                          {item.category}
                       </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={14} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">{item.condition}</span>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 leading-snug group-hover:text-cyan-400 transition-colors">{item.name}</h3>
                      
                      <div className="mt-auto pt-4 flex justify-between items-end border-t border-gray-800">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-0.5">Precio</span>
                          <span className="text-2xl font-bold text-white tracking-tight">{item.price}</span>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-full text-gray-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                          <ExternalLink size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          
          <div className="flex justify-center pb-20">
            <a href="https://es.wallapop.com/user/lexb-446364407" target="_blank" className="group flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all">
              <ShoppingBag size={20} className="text-cyan-400 group-hover:scale-110 transition-transform"/> 
              <span>Ver perfil completo en Wallapop</span>
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col h-[450px] overflow-hidden">
            <div className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
              <h3 className="font-bold text-white flex items-center gap-2">Alex IA <Sparkles size={14} className="text-cyan-400"/></h3>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                 <div className="flex justify-start">
                   <div className="bg-gray-800 text-gray-400 p-3 rounded-2xl rounded-tl-none text-xs border border-gray-700 animate-pulse">Escribiendo...</div>
                 </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Pregunta sobre los productos..." className="flex-1 bg-gray-900 text-white text-sm rounded-xl px-4 py-3 border border-gray-700 outline-none focus:border-cyan-500 transition-colors"/>
              <button type="submit" disabled={isChatLoading} className="bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><Send size={18}/></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        onClick={() => setIsChatOpen(!isChatOpen)} 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg shadow-cyan-500/30 z-50 group flex items-center gap-2 hover:shadow-xl transition-all border border-white/10"
      >
        {isChatOpen ? <X size={24}/> : <MessageCircle size={24}/>}
      </motion.button>

      <section className="py-24 bg-gray-950 border-t border-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">¿Te interesa comprar algo?</h2>
        <p className="text-gray-400 mb-8 text-lg">Escríbeme un mensaje directo por Instagram y cerramos el trato.</p>
        <div className="flex justify-center">
           <a href="https://www.instagram.com/proyectos.alex" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20">
              <Instagram size={24} />
              Enviar DM en Instagram
           </a>
        </div>
      </section>

      <footer className="py-8 bg-black border-t border-gray-900 text-center text-gray-600 text-xs font-mono">
        <p>© 2025 PROYECTOS ALEX.</p>
      </footer>
    </div>
  );
};

export default App;
