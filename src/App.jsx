import React, { useState, useEffect } from 'react';
import { Download, Globe, Cpu, Zap, Layout, Users, Shield, Check, Menu, X, Heart, Star, Lock, FileText, ArrowLeft } from 'lucide-react';

// --- TRANSLATIONS DATA ---
const translations = {
    en: {
        nav: {
            features: "Features",
            versions: "Versions",
            community: "Community",
            download: "Download",
            terms: "Terms",
            privacy: "Privacy"
        },
        hero: {
            badge: "✨ BETA 1.0.0 IS SPARKLY & LIVE ✨",
            title: "Play Minecraft in",
            titleAccent: "Pure Gold Style.",
            subtitle: "The cutest, fastest, and most luxurious launcher. Kesor brings a touch of magic to your gaming experience with high performance and gold-tier features.",
            ctaPrimary: "Download Beta 1.0.0",
            ctaSecondary: "View Features",
            previewText: "Preview Kesor Magic"
        },
        features: {
            title: "Cute & Powerful",
            subtitle: "Why Kesor is every player's favorite companion.",
            performance: {
                title: "Super-Fast Performance",
                desc: "Optimized architecture that saves your RAM. It runs as smooth as silk and as fast as a shooting star.",
                tag: "GOLD SPEED"
            },
            mods: {
                title: "Magic Mod Install",
                desc: "Install your favorite mods with one click. Everything is organized and sparklingly clean."
            },
            ui: {
                title: "Aesthetic Interface",
                desc: "A soft pink and gold UI designed to make you smile. Fully customizable with magical themes."
            },
            accounts: {
                title: "Multi-Account Magic",
                desc: "Switch between your Minecraft accounts effortlessly. Keep all your characters safe and sound."
            }
        },
        legal: {
            back: "Back to Home",
            termsTitle: "Terms of Service",
            privacyTitle: "Privacy Policy",
            termsContent: "By using Kesor Launcher Beta, you agree to our testing terms. This is pre-release software provided 'as is'. We are not responsible for any lost diamonds or game crashes during your testing journey. Please play responsibly and be kind to others in the community.",
            privacyContent: "We value your privacy like gold. Kesor Launcher only collects basic hardware data to optimize performance. Your Minecraft credentials are never stored on our servers; everything stays encrypted on your local device."
        },
        versions: {
            title: "The Journey",
            subtitle: "Watching Kesor grow step by step.",
            latest: "Current Magic",
            v1: {
                date: "Feb 12, 2026",
                items: [
                    "Initial Beta Public Release",
                    "Pink & Gold 'Blush' Theme",
                    "Integrated Mod Browser (Alpha)",
                    "Star-Light Optimization Engine"
                ]
            }
        },
        cta: {
            title: "Start your adventure?",
            subtitle: "Join the Kesor Beta family today and make your Minecraft experience more beautiful.",
            button: "Download for Windows",
            macos: "macOS (Apple Silicon)",
            linux: "Linux (.AppImage)"
        },
        footer: {
            disclaimer: "Not affiliated with Mojang Studios or Microsoft. Minecraft is a trademark of Mojang Synergies AB.",
            links: ["Privacy", "Terms", "Discord", "GitHub"]
        },
        modal: {
            title: "Magic is happening...",
            desc: "Your Kesor Launcher download is starting! Get ready for a sparkling new adventure.",
            button: "Let's Go!"
        }
    },
    kh: {
        nav: {
            features: "មុខងារ",
            versions: "កំណែប្រែ",
            community: "សហគមន៍",
            download: "ទាញយក",
            terms: "លក្ខខណ្ឌ",
            privacy: "ឯកជនភាព"
        },
        hero: {
            badge: "✨ BETA កំណែ ១.០.០ ចេញហើយ ✨",
            title: "លេង Minecraft តាមបែប",
            titleAccent: "មាសដ៏ប្រណិត។",
            subtitle: "កម្មវិធី Launcher ដែលស្អាតបំផុត លឿនបំផុត និងទំនើបបំផុត។ Kesor នាំមកនូវមន្តអាគមដល់ការលេងហ្គេមរបស់អ្នក ជាមួយនឹងសមត្ថភាពខ្ពស់ និងមុខងារកម្រិតមាស។",
            ctaPrimary: "ទាញយក Beta 1.0.0",
            ctaSecondary: "មើលមុខងារ",
            previewText: "មើលការបង្ហាញ Kesor"
        },
        features: {
            title: "ស្អាត និង ខ្លាំង",
            subtitle: "ហេតុអ្វីបានជា Kesor ជាមិត្តដ៏ល្អបំផុតរបស់អ្នកលេងគ្រប់រូប?",
            performance: {
                title: "សមត្ថភាពលឿនដូចផ្កាយ",
                desc: "រចនាសម្ព័ន្ធដែលបានកែលម្អ កាត់បន្ថយការប្រើ RAM។ វាដំណើរការរលូនដូចសូត្រ និងលឿនដូចផ្កាយដុះកន្ទុយ។",
                tag: "ល្បឿនមាស"
            },
            mods: {
                title: "ដំឡើង Mod បែបមន្តអាគម",
                desc: "ដំឡើង mod ដែលអ្នកចូលចិត្តត្រឹមតែមួយឃ្លីក។ គ្រប់យ៉ាងត្រូវបានរៀបចំយ៉ាងស្អាត និងមានរបៀបរៀបរយ។",
            },
            ui: {
                title: "ចំណុចប្រទាក់ផ្កាឈូក",
                desc: "UI ពណ៌ផ្កាឈូក និងមាសដែលរចនាឡើងដើម្បីផ្តល់ភាពរីករាយ។ អាចប្តូរ theme បានតាមចិត្ត។",
            },
            accounts: {
                title: "គ្រប់គ្រងគណនីច្រើន",
                desc: "ប្តូររវាងគណនី Minecraft របស់អ្នកយ៉ាងងាយស្រួល។ រក្សាតួអង្គរបស់អ្នកដោយសុវត្ថិភាពបំផុត។",
            }
        },
        legal: {
            back: "ត្រឡប់ទៅដើមវិញ",
            termsTitle: "លក្ខខណ្ឌប្រើប្រាស់",
            privacyTitle: "គោលការណ៍ឯកជនភាព",
            termsContent: "តាមរយៈការប្រើប្រាស់ Kesor Launcher Beta អ្នកយល់ព្រមតាមលក្ខខណ្ឌសាកល្បងរបស់យើង។ នេះគឺជាកម្មវិធីសាកល្បងដែលផ្តល់ជូន 'តាមស្ថានភាពជាក់ស្តែង'។ យើងមិនទទួលខុសត្រូវចំពោះការបាត់បង់ពេជ្រ ឬការគាំងហ្គេមអំឡុងពេលសាកល្បងឡើយ។ សូមលេងដោយការទទួលខុសត្រូវ។",
            privacyContent: "យើងឱ្យតម្លៃលើឯកជនភាពរបស់អ្នកដូចជាមាស។ Kesor Launcher ប្រមូលតែទិន្នន័យ Hardware មូលដ្ឋានដើម្បីបង្កើនប្រសិទ្ធភាព។ គណនី Minecraft របស់អ្នកមិនត្រូវបានរក្សាទុកនៅលើ Server របស់យើងទេ គ្រប់យ៉ាងគឺត្រូវបានការពារនៅក្នុងម៉ាស៊ីនរបស់អ្នក។"
        },
        versions: {
            title: "ការធ្វើដំណើរ",
            subtitle: "តាមដានការរីកចម្រើនរបស់ Kesor ជាជំហានៗ។",
            latest: "មន្តអាគមបច្ចុប្បន្ន",
            v1: {
                date: "១២ កុម្ភៈ ២០២៦",
                items: [
                    "ការចេញផ្សាយ Beta ជាសាធារណៈលើកដំបូង",
                    "ភាសារចនាថ្មី 'Blush' ពណ៌ផ្កាឈូក & មាស",
                    "កម្មវិធីស្វែងរក Mod (Alpha)",
                    "ម៉ាស៊ីនបង្កើនប្រសិទ្ធភាព Star-Light"
                ]
            }
        },
        cta: {
            title: "ចាប់ផ្តើមការផ្សងព្រេង?",
            subtitle: "ចូលរួមគ្រួសារ Kesor Beta ថ្ងៃនេះ និងធ្វើឱ្យបទពិសោធន៍ Minecraft របស់អ្នកកាន់តែស្រស់ស្អាត។",
            button: "ទាញយកសម្រាប់ Windows",
            macos: "macOS (Apple Silicon)",
            linux: "Linux (.AppImage)"
        },
        footer: {
            disclaimer: "មិនមានការពាក់ព័ន្ធជាមួយ Mojang Studios ឬ Microsoft ទេ។ Minecraft គឺជាពាណិជ្ជសញ្ញារបស់ Mojang Synergies AB។",
            links: ["ឯកជនភាព", "លក្ខខណ្ឌ", "Discord", "GitHub"]
        },
        modal: {
            title: "មន្តអាគមកំពុងកើតឡើង...",
            desc: "ការទាញយក Kesor Launcher របស់អ្នកកំពុងចាប់ផ្តើម! ត្រៀមខ្លួនសម្រាប់ការផ្សងព្រេងថ្មីដ៏អស្ចារ្យ។",
            button: "តោះទៅ!"
        }
    }
};

export default function App() {
    const [lang, setLang] = useState('en');
    const [view, setView] = useState('home'); // 'home', 'terms', 'privacy'
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        window.scrollTo(0, 0);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [view]);

    const toggleLang = () => {
        setLang(prev => prev === 'en' ? 'kh' : 'en');
    };

    const navigateTo = (newView) => {
        setView(newView);
        setIsMenuOpen(false);
    };

    // --- Sub-components for Views ---
    const LegalPage = ({ title, content }) => (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <button
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-pink-400 hover:text-amber-400 mb-8 font-bold transition-colors"
            >
                <ArrowLeft size={20} /> {t.legal.back}
            </button>
            <div className="bg-white/5 border border-pink-500/20 rounded-[2.5rem] p-10 md:p-16 backdrop-blur-xl">
                <h1 className="text-4xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">
                    {title}
                </h1>
                <div className="text-gray-300 leading-relaxed text-lg space-y-6">
                    <p>{content}</p>
                    <p>Last updated: February 12, 2026</p>
                </div>
            </div>
        </div>
    );

    const HomePage = () => (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-pink-500/10 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-amber-400/10 blur-[60px] rounded-full -z-10 animate-pulse"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] md:text-xs font-bold text-pink-400 mb-8 tracking-widest uppercase shadow-lg shadow-pink-500/5">
                        <Heart size={14} className="animate-pulse" />
                        {t.hero.badge}
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                        {t.hero.title} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">
              {t.hero.titleAccent}
            </span>
                    </h1>

                    <p className="text-pink-100/60 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                        {t.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/20"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">
                <Download size={22} />
                                {t.hero.ctaPrimary}
              </span>
                        </button>
                        <a href="#features" className="w-full sm:w-auto px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-pink-500/10 hover:border-pink-500/30 transition-all text-center">
                            {t.hero.ctaSecondary}
                        </a>
                    </div>

                    <div className="mt-24 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-amber-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video shadow-2xl">
                            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-pink-500/30 border border-pink-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/30 border border-amber-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20"></div>
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-black text-pink-300/50">KESOR BLUSH ENGINE</div>
                                <Star size={12} className="text-amber-400/40" />
                            </div>
                            <div className="h-full flex items-center justify-center bg-gradient-to-b from-transparent to-pink-500/5 cursor-pointer">
                                <div className="text-center group-hover:scale-110 transition-transform duration-700">
                                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-pink-500/40 border-4 border-white/10">
                                        <Zap size={40} fill="white" className="text-white" />
                                    </div>
                                    <p className="font-bold text-pink-200/60 uppercase tracking-widest text-sm">{t.hero.previewText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">{t.features.title}</h2>
                        <p className="text-xl text-pink-200/40">{t.features.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 group bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden transition-all hover:border-pink-500/40">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 border border-pink-500/20">
                                    <Cpu className="text-pink-400" size={32} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">{t.features.performance.title}</h3>
                                <p className="text-pink-100/50 text-lg leading-relaxed max-w-lg">
                                    {t.features.performance.desc}
                                </p>
                            </div>
                            <div className="mt-12 flex items-center gap-6 relative z-10">
                                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full w-4/5 bg-gradient-to-r from-pink-500 to-amber-400 rounded-full"></div>
                                </div>
                                <span className="text-6xl font-black text-white/5 italic select-none tracking-tighter uppercase">{t.features.performance.tag}</span>
                            </div>
                            <div className="absolute -top-10 -right-10 w-80 h-80 bg-pink-600/5 blur-[100px] rounded-full"></div>
                        </div>

                        <div className="group bg-white/5 border border-white/10 rounded-[3rem] p-10 transition-all hover:border-amber-400/40">
                            <div className="w-16 h-16 bg-amber-400/10 rounded-2xl flex items-center justify-center mb-8 border border-amber-400/20">
                                <Star className="text-amber-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t.features.mods.title}</h3>
                            <p className="text-pink-100/50 leading-relaxed">
                                {t.features.mods.desc}
                            </p>
                        </div>

                        <div className="group bg-white/5 border border-white/10 rounded-[3rem] p-10 transition-all hover:border-pink-400/40">
                            <div className="w-16 h-16 bg-pink-400/10 rounded-2xl flex items-center justify-center mb-8 border border-pink-400/20">
                                <Layout className="text-pink-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t.features.ui.title}</h3>
                            <p className="text-pink-100/50 leading-relaxed">
                                {t.features.ui.desc}
                            </p>
                        </div>

                        <div className="md:col-span-2 group bg-white/5 border border-white/10 rounded-[3rem] p-10 transition-all hover:border-rose-400/40">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1">
                                    <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-8 border border-rose-500/20">
                                        <Heart className="text-rose-500" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{t.features.accounts.title}</h3>
                                    <p className="text-pink-100/50 leading-relaxed">
                                        {t.features.accounts.desc}
                                    </p>
                                </div>
                                <div className="flex -space-x-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-24 h-24 rounded-3xl border-4 border-[#050505] bg-gradient-to-br from-pink-500 to-amber-400 flex items-center justify-center text-3xl font-black shadow-2xl transform hover:-translate-y-4 transition-transform duration-300">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Release Log */}
            <section id="versions" className="py-32 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">{t.versions.title}</h2>
                        <p className="text-pink-200/40">{t.versions.subtitle}</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-pink-500/20 to-transparent"></div>

                        <div className="relative pl-20 pb-12">
                            <div className="absolute left-0 w-16 h-16 bg-pink-600/20 rounded-full flex items-center justify-center border border-pink-500/30">
                                <Star className="text-amber-400" size={24} />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-sm">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                                    <div>
                                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em]">{t.versions.latest}</span>
                                        <h4 className="text-3xl font-black mt-2">1.0.0-BETA</h4>
                                    </div>
                                    <span className="text-sm font-bold text-pink-300/60 bg-pink-500/5 px-4 py-2 rounded-xl border border-pink-500/10">{t.versions.v1.date}</span>
                                </div>
                                <ul className="grid gap-5">
                                    {t.versions.v1.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-pink-100/60 font-medium">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    return (
        <div className={`min-h-screen bg-[#050505] text-white selection:bg-pink-500/40 ${lang === 'kh' ? 'font-khmer' : ''}`}>
            {/* --- Navigation --- */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'pt-2' : ''}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl px-6 py-3 shadow-2xl">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-amber-400 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-pink-500/20 border border-white/20">K</div>
                        <span className="text-xl font-black tracking-tight hidden sm:block">Kesor <span className="text-pink-400">Launcher</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-pink-200/50 uppercase tracking-widest">
                        <a href="#features" onClick={() => setView('home')} className="hover:text-pink-400 transition-colors">{t.nav.features}</a>
                        <a href="#versions" onClick={() => setView('home')} className="hover:text-pink-400 transition-colors">{t.nav.versions}</a>
                        <button onClick={() => navigateTo('terms')} className="hover:text-pink-400 transition-colors">{t.nav.terms}</button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all text-xs font-black tracking-widest"
                        >
                            <Globe size={14} className="text-amber-400" />
                            {lang === 'en' ? 'KH' : 'EN'}
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-pink-100 transition-all hidden sm:block shadow-lg"
                        >
                            {t.nav.download}
                        </button>
                        <button className="md:hidden p-2 text-pink-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Mobile Menu --- */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center gap-10 text-3xl font-black">
                    <a href="#features" onClick={() => navigateTo('home')}>{t.nav.features}</a>
                    <a href="#versions" onClick={() => navigateTo('home')}>{t.nav.versions}</a>
                    <button onClick={() => navigateTo('terms')}>{t.nav.terms}</button>
                    <button onClick={() => navigateTo('privacy')}>{t.nav.privacy}</button>
                    <button onClick={() => setIsModalOpen(true)} className="text-pink-500">{t.nav.download}</button>
                </div>
            )}

            {/* --- Main Content Switching --- */}
            <main>
                {view === 'home' && <HomePage />}
                {view === 'terms' && <LegalPage title={t.legal.termsTitle} content={t.legal.termsContent} />}
                {view === 'privacy' && <LegalPage title={t.legal.privacyTitle} content={t.legal.privacyContent} />}
            </main>

            {/* --- Final CTA --- */}
            {view === 'home' && (
                <section id="download" className="py-32 px-6">
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-pink-600 via-rose-600 to-amber-500 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-pink-500/20">
                        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                            <Star size={300} fill="white" />
                        </div>
                        <div className="absolute -bottom-20 -left-20 p-10 opacity-10">
                            <Heart size={300} fill="white" />
                        </div>

                        <h2 className="text-4xl md:text-7xl font-black mb-8 relative z-10 leading-tight">{t.cta.title}</h2>
                        <p className="text-pink-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-14 relative z-10 font-medium">
                            {t.cta.subtitle}
                        </p>

                        <div className="flex flex-col items-center gap-10 relative z-10">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-14 py-7 bg-white text-rose-600 rounded-[2rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-white/20"
                            >
                                {t.cta.button}
                            </button>
                            <div className="flex flex-wrap justify-center gap-10 text-sm font-black text-white/60 uppercase tracking-widest">
                                <a href="#" className="hover:text-white transition-colors">{t.cta.macos}</a>
                                <a href="#" className="hover:text-white transition-colors">{t.cta.linux}</a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* --- Footer --- */}
            <footer className="py-24 border-t border-white/5 px-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-pink-400 border border-pink-500/20 shadow-lg">K</div>
                        <span className="font-black text-2xl tracking-tight text-white/80">Kesor <span className="text-amber-400">Launcher</span></span>
                    </div>

                    <p className="text-pink-100/20 text-center text-sm max-w-lg mb-12 leading-relaxed italic">
                        {t.footer.disclaimer}
                    </p>

                    <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
                        <button onClick={() => navigateTo('privacy')} className="hover:text-pink-400 transition-colors">{t.footer.links[0]}</button>
                        <button onClick={() => navigateTo('terms')} className="hover:text-pink-400 transition-colors">{t.footer.links[1]}</button>
                        <a href="#" className="hover:text-pink-400 transition-colors">{t.footer.links[2]}</a>
                        <a href="#" className="hover:text-pink-400 transition-colors">{t.footer.links[3]}</a>
                    </div>

                    <div className="mt-16 flex items-center gap-4 text-pink-500/20">
                        <div className="h-px w-10 bg-current"></div>
                        <div className="text-[10px] font-black tracking-[0.5em] uppercase">KESOR LABS 2026</div>
                        <div className="h-px w-10 bg-current"></div>
                    </div>
                </div>
            </footer>

            {/* --- Download Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-[#0a0a0a] border border-pink-500/30 max-w-md w-full p-12 rounded-[3.5rem] text-center shadow-[0_0_100px_rgba(236,72,153,0.1)]">
                        <div className="w-24 h-24 bg-pink-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-pink-500/20">
                            <div className="animate-bounce">
                                <Download className="text-amber-400" size={40} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-white">{t.modal.title}</h3>
                        <p className="text-pink-100/40 text-lg leading-relaxed mb-12 font-medium">
                            {t.modal.desc}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 py-6 rounded-2xl font-black text-2xl hover:brightness-110 transition-all shadow-xl shadow-pink-500/20"
                        >
                            {t.modal.button}
                        </button>
                    </div>
                </div>
            )}

            {/* Add Custom Global CSS for Khmer Font (Fallback) */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap');
        .font-khmer {
          font-family: 'Kantumruy Pro', sans-serif ! from-inherit;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
}