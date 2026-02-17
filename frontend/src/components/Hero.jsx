import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl mt-6 border border-white/5">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-[20s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent"
                >
                    Taste the <span className="text-primary">Extraordinary</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-300 mb-10 font-light"
                >
                    Experience culinary perfection with our curated menu of artisan dishes and signature cocktails.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-full overflow-hidden shadow-lg hover:shadow-primary/25 transition-all"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        View Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
            </div>
        </section>
    );
}
