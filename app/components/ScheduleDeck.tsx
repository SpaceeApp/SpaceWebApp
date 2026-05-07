'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import '../[locale]/schedule/schedule.css';

const logoSrc = '/space-logo.png';
const simoneSrc = '/team-simone.jpg';
const andreaSrc = '/team-andrea.jpg';

type SlideProps = {
  onNext: () => void;
  onPrev: () => void;
  index: number;
  total: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

const SectionHeader = ({
  section, title, index, total, sub,
}: { section: string; title: string; index: number; total: number; sub?: string }) => (
  <div className="absolute top-10 flex w-full justify-between px-10 text-xs font-mono border-b border-gray-800 pb-4">
    <span className="text-gray-400">
      <span className="text-[#5E5CE6]">{section}</span> — {title}
    </span>
    <span className="text-gray-400">
      {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
      {sub && <> — <span className="text-[#5E5CE6]">{sub}</span></>}
    </span>
  </div>
);

const SectionFooter = ({ left, right }: { left: string; right: string }) => (
  <div className="absolute bottom-16 flex w-full justify-between px-10 text-xs font-mono text-gray-400 border-t border-gray-800 pt-4">
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-3 rounded-full bg-[#5E5CE6]/10 border border-[#5E5CE6]/40 text-white text-base font-medium tracking-tight backdrop-blur-sm hover:bg-[#5E5CE6]/20 hover:border-[#5E5CE6]/70 transition-all flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-[#5E5CE6]" />
    {children}
  </div>
);

const SpaceLogo = ({ size = 160 }: { size?: number }) => (
  <img src={logoSrc} width={size} style={{ height: 'auto', filter: 'url(#remove-white)', display: 'block' }} alt="SPACE" />
);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES
// ─────────────────────────────────────────────────────────────────────────────

const SlideIntro = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative w-full">
      <div className="absolute top-10 flex w-full justify-between px-10 text-xs font-mono text-gray-400">
        <span style={{ fontFamily: "'Conthrax', sans-serif" }} className="text-white">SPACE</span>
        <span className="uppercase tracking-widest">{t('intro.tagline')}</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="z-0"><SpaceLogo size={240} /></div>
        <h1
          className="relative z-10 text-white font-black tracking-tighter mt-4"
          style={{ fontSize: '11rem', lineHeight: '0.9', fontFamily: "'Conthrax', sans-serif" }}
        >
          SPACE
        </h1>
        <p className="text-white text-3xl mt-6 font-light tracking-tight">
          {t('intro.centerCaption')}
        </p>
      </div>

      <div className="absolute bottom-16 flex w-full justify-between px-10 text-xs font-mono text-gray-400 uppercase tracking-widest">
        <span style={{ fontFamily: "'Conthrax', sans-serif" }}>SPACE</span>
        <span className="animate-pulse text-[#5E5CE6]">
          → {t('intro.footerHint')} <span className="text-white">→</span> {t('common.pressToBegin')} · {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

const SlideWhatIsSpace = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const pills = t.raw('whatIsSpace.pills') as string[];
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('whatIsSpace.section')} title={t('whatIsSpace.title')} index={index} total={total} />
      <div className="flex-1 flex flex-col justify-center mt-20 mb-24">
        <div className="flex items-end gap-6 mb-14">
          <h1 className="text-white font-black tracking-tighter leading-none" style={{ fontSize: '11rem', fontFamily: "'Conthrax', sans-serif" }}>
            SPACE
          </h1>
          <span className="text-gray-500 italic text-2xl pb-4">{t('whatIsSpace.wordmarkSub')}</span>
        </div>
        <div className="border-l-4 border-[#5E5CE6] pl-8 max-w-5xl mb-14">
          <p className="text-4xl text-gray-300 leading-snug font-light">
            {t('whatIsSpace.descriptionPre')} <strong className="text-white font-bold">{t('whatIsSpace.descriptionWord')}</strong> {t('whatIsSpace.descriptionMid')}{' '}
            <strong className="text-[#5E5CE6] font-semibold">{t('whatIsSpace.highest')}</strong>{t('whatIsSpace.comma')}
            <strong className="text-[#5E5CE6] font-semibold">{t('whatIsSpace.fast')}</strong> {t('whatIsSpace.and')}{' '}
            <strong className="text-[#5E5CE6] font-semibold">{t('whatIsSpace.crossPlatform')}</strong>{t('whatIsSpace.period')}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {pills.map((p) => <Pill key={p}>{p}</Pill>)}
        </div>
      </div>
      <SectionFooter left={t('whatIsSpace.footerLeft')} right={t('whatIsSpace.footerRight')} />
    </div>
  );
};

// ── Problem slide helpers ────────────────────────────────────────────────────

type ChatMessage = { author: string; color: string; body: string; self?: boolean };

const STEP_MS = 1500;

const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16.003 0C7.16.003.005 7.156.001 15.997a15.97 15.97 0 002.13 7.99L0 32l8.244-2.165a16.002 16.002 0 007.762 1.977h.006C24.85 31.812 32 24.658 32 15.817 32 11.547 30.34 7.534 27.32 4.514A15.86 15.86 0 0016.003 0zm0 29.13h-.004a13.27 13.27 0 01-6.762-1.85l-.485-.288-5.027 1.32 1.342-4.9-.316-.503a13.26 13.26 0 01-2.034-7.07c.003-7.347 5.985-13.327 13.34-13.327 3.563 0 6.91 1.39 9.428 3.91a13.225 13.225 0 013.903 9.426c-.003 7.347-5.985 13.282-13.385 13.282zm7.31-9.93c-.4-.2-2.37-1.17-2.737-1.303-.367-.134-.633-.2-.9.2-.267.4-1.034 1.303-1.267 1.57-.234.267-.467.3-.867.1-.4-.2-1.69-.624-3.218-1.987-1.19-1.06-1.992-2.37-2.226-2.77-.234-.4-.025-.617.176-.816.18-.18.4-.467.6-.7.2-.234.267-.4.4-.667.134-.267.067-.5-.034-.7-.1-.2-.9-2.17-1.234-2.97-.325-.78-.655-.674-.9-.687a17.16 17.16 0 00-.767-.014c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.337s1.434 3.87 1.634 4.137c.2.267 2.823 4.31 6.84 6.04 1.957.844 3.484 1.348 4.674 1.726 1.964.624 3.752.535 5.165.325 1.575-.235 4.85-1.984 5.535-3.9.685-1.918.685-3.564.48-3.9-.205-.336-.737-.534-1.537-.934z" />
  </svg>
);

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-[280px] h-[520px] rounded-[3rem] bg-black relative overflow-hidden"
    style={{ boxShadow: '0 0 0 8px #1a1a1e, 0 0 0 10px #252530, 0 40px 90px -10px rgba(94,92,230,0.55), 0 0 80px -20px rgba(94,92,230,0.25)' }}
  >
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-3xl z-50 border border-[#0a0a0a]" />
    {children}
  </div>
);

const LockScreen = ({ withNotif }: { withNotif: boolean }) => {
  const t = useTranslations('schedule');
  return (
    <div className="absolute inset-0 animate-screen-on flex flex-col items-center pt-14"
         style={{ background: 'linear-gradient(160deg, #1a1f3a 0%, #0a0a1c 50%, #1a0a2c 100%)' }}>
      <div className="absolute top-3 left-6 flex items-center gap-1 text-white text-[10px] font-semibold z-10">9:41</div>
      <div className="absolute top-3 right-6 flex items-center gap-1 text-white z-10">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M2 22h20V2L2 22z" /></svg>
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9h2v9H5zm4-3h2v12H9zm4-3h2v15h-2zm4 6h2v9h-2z" /></svg>
        <svg className="w-4 h-3" fill="none" viewBox="0 0 24 12" stroke="currentColor"><rect x="1" y="2" width="18" height="8" rx="2" strokeWidth={1.5} /><rect x="3" y="4" width="14" height="4" rx="1" fill="currentColor" /></svg>
      </div>
      <div className="text-white/60 text-xs mt-6 font-light tracking-wide">{t('problem.lockDate')}</div>
      <div className="text-white text-7xl font-thin mt-1" style={{ letterSpacing: '-0.02em' }}>9:41</div>
      {withNotif && (
        <div className="mt-12 mx-4 w-[88%] bg-white/[0.08] backdrop-blur-xl rounded-2xl p-3 flex items-start gap-3 border border-white/10 animate-notif-in">
          <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="text-white text-[11px] font-semibold uppercase tracking-wider">WhatsApp</span>
              <span className="text-white/50 text-[10px]">{t('problem.notifTime')}</span>
            </div>
            <div className="text-white text-sm font-semibold mt-0.5">{t('problem.notifTitle')}</div>
            <div className="text-white/80 text-xs mt-0.5 truncate">
              <span className="text-orange-300">{t('problem.notifAuthor')}</span> {t('problem.notifBody')}
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
    </div>
  );
};

const ChatScreen = ({ messageCount, messages }: { messageCount: number; messages: ChatMessage[] }) => {
  const t = useTranslations('schedule');
  return (
    <div className="absolute inset-0 flex flex-col animate-screen-on" style={{ backgroundColor: '#0b141a' }}>
      <div className="bg-[#1f2c33] pt-9 pb-3 px-3 flex items-center gap-2.5 border-b border-black/40 shrink-0">
        <span className="text-[#00a884] text-xl">‹</span>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-semibold truncate">{t('problem.chatTitle')}</div>
          <div className="text-white/50 text-[10px]">{t('problem.chatMembers')}</div>
        </div>
        <svg className="w-5 h-5 text-[#aebac1]" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
        <svg className="w-5 h-5 text-[#aebac1]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 10.5c-1.04 0-2.05-.16-3-.46-.3-.1-.63-.02-.86.21l-1.84 1.83c-2.34-1.19-4.27-3.11-5.46-5.45l1.83-1.84c.23-.23.31-.56.21-.86-.3-.95-.46-1.96-.46-3 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" /></svg>
      </div>
      <div className="flex-1 flex flex-col justify-end gap-1.5 p-3 overflow-hidden"
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        {messages.slice(0, messageCount).map((msg, i) =>
          msg.self ? (
            <div key={i} className="bg-[#005c4b] rounded-2xl rounded-tr-sm py-2 px-3 max-w-[78%] animate-message-in shadow-sm self-end">
              <div className="text-gray-100 text-[13px] leading-snug">{msg.body}</div>
              <div className="text-white/50 text-[9px] text-right mt-0.5 flex items-center gap-1 justify-end">
                <span>9:4{i + 2}</span>
                <svg className="w-3 h-3 text-[#53bdeb]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.03 5.21l-1.06-1.06-7.97 7.97 1.06 1.06 7.97-7.97zm5.66-1.06l-1.06-1.06L11.34 14.36 6.4 9.42 5.34 10.49l5.99 5.99L23.69 4.15zM.41 10.49l5.99 5.99 1.06-1.06L1.47 9.42.41 10.49z" />
                </svg>
              </div>
            </div>
          ) : (
            <div key={i} className="bg-[#1f2c33] rounded-2xl rounded-tl-sm py-2 px-3 max-w-[78%] animate-message-in shadow-sm self-start">
              <div className={`text-[11px] font-semibold mb-0.5 ${msg.color}`}>{msg.author}</div>
              <div className="text-gray-100 text-[13px] leading-snug">{msg.body}</div>
              <div className="text-white/40 text-[9px] text-right mt-0.5">9:4{i + 2}</div>
            </div>
          )
        )}
      </div>
      <div className="bg-[#1f2c33] p-2 flex items-center gap-2 shrink-0">
        <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-2 text-white/40 text-xs flex items-center gap-2">
          <span>😊</span>
          <span>{t('problem.composerPlaceholder')}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </div>
      </div>
    </div>
  );
};

const SlideProblem = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const messages = t.raw('problem.messages') as ChatMessage[];
  const bullets = t.raw('problem.bullets') as Array<{ pre: string; accent: string; post: string }>;
  const totalSteps = 3 + messages.length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= totalSteps - 1) return;
    const timer = setTimeout(() => setStep(step + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [step, totalSteps]);

  let phoneState: 'off' | 'lock' | 'lockNotif' | 'chat';
  let messageCount = 0;
  if (step === 0) phoneState = 'off';
  else if (step === 1) phoneState = 'lock';
  else if (step === 2) phoneState = 'lockNotif';
  else { phoneState = 'chat'; messageCount = Math.min(step - 2, messages.length); }

  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('problem.section')} title={t('problem.title')} index={index} total={total} />
      <div className="flex-1 flex items-center justify-between gap-16 mt-20 mb-24">
        <div className="shrink-0 relative">
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[#5E5CE6]/20 blur-[70px] rounded-full pointer-events-none" />
          <PhoneFrame>
            {phoneState === 'off' && <div key="off" className="absolute inset-0 bg-black" />}
            {(phoneState === 'lock' || phoneState === 'lockNotif') && (
              <LockScreen key="lock" withNotif={phoneState === 'lockNotif'} />
            )}
            {phoneState === 'chat' && <ChatScreen key="chat" messageCount={messageCount} messages={messages} />}
          </PhoneFrame>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-black tracking-tighter leading-[0.88]" style={{ fontSize: '7.5rem' }}>
            {t('problem.headlineLine1')}<br />
            {t('problem.headlineLine2')}<br />
            <span className="text-[#5E5CE6]">{t('problem.headlineAccent')}</span>
          </h2>
          <div className="mt-10 space-y-4 border-l-2 border-gray-800 pl-6">
            {bullets.map((b, i) => (
              <p key={i} className="text-xl text-gray-400 font-light">
                {b.pre}<span className="text-[#5E5CE6] font-medium">{b.accent}</span>{b.post}
              </p>
            ))}
          </div>
        </div>
      </div>
      <SectionFooter left={t('problem.footerLeft')} right={t('problem.footerRight')} />
    </div>
  );
};

const SlideSolution = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col items-center justify-center h-full px-20 text-center relative w-full">
      <SectionHeader section={t('solution.section')} title={t('solution.title')} index={index} total={total} />
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-white font-black tracking-tighter leading-[0.85] animate-line-1" style={{ fontSize: '6.5rem' }}>
          {t('solution.line1Top')}<br />
          <span className="text-[#5E5CE6]">{t('solution.line1Accent')}</span>
        </h2>
        <h2 className="text-white font-black tracking-tighter leading-[0.85] animate-line-2" style={{ fontSize: '6.5rem' }}>
          {t('solution.line2Top')}<br />
          <span className="text-[#5E5CE6]">{t('solution.line2Accent')}</span>
        </h2>
      </div>
      <SectionFooter left={t('solution.footerLeft')} right={t('solution.footerRight')} />
    </div>
  );
};

// ── Product slide helpers ─────────────────────────────────────────────────────

const SmallPhone = ({ children, lifted }: { children: React.ReactNode; lifted?: boolean }) => (
  <div
    className={`w-[110px] h-[212px] sm:w-[180px] sm:h-[347px] lg:w-[250px] lg:h-[480px] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-black relative overflow-hidden ${lifted ? '-translate-y-3 sm:-translate-y-5 lg:-translate-y-6' : ''}`}
    style={{ boxShadow: '0 0 0 6px #1a1a1e, 0 0 0 7px #2a2a2e, 0 25px 50px -12px rgba(94,92,230,0.25)' }}
  >
    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 sm:w-14 sm:h-4 lg:w-20 lg:h-5 bg-black rounded-2xl z-50 border border-[#0a0a0a]" />
    {children}
  </div>
);

const PhoneStatusBar = ({ light = true }: { light?: boolean }) => (
  <div className={`pt-2 pb-1 px-4 flex justify-between items-center text-[9px] font-semibold relative z-10 ${light ? 'text-white' : 'text-black'}`}>
    <span>9:41</span>
    <span className="flex gap-1 items-center">
      <svg className="w-3 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9h2v9H5zm4-3h2v12H9zm4-3h2v15h-2zm4 6h2v9h-2z" /></svg>
      <svg className="w-4 h-2.5" fill="none" viewBox="0 0 24 12" stroke="currentColor">
        <rect x="1" y="2" width="18" height="8" rx="2" strokeWidth={1.5} />
        <rect x="3" y="4" width="14" height="4" rx="1" fill="currentColor" />
      </svg>
    </span>
  </div>
);

const YourSpacesScreen = () => (
  <div className="absolute inset-0 overflow-hidden">
    <img src="/ScreenSpace.jpg" alt="Spaces" className="w-full h-full object-contain" />
  </div>
);

const GalleryScreen = () => (
  <div className="absolute inset-0 overflow-hidden">
    <img src="/ScreenGallery.jpg" alt="Gallery" className="w-full h-full object-contain" />
  </div>
);

const MemoryScreen = () => (
  <div className="absolute inset-0 overflow-hidden">
    <img src="/ScreenProfile.png" alt="Profile" className="w-full h-full object-contain" />
  </div>
);

const PhoneShowcase = ({ label, title, lifted, delay, children }: {
  label: string; title: string; lifted?: boolean; delay: string; children: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-2 sm:gap-4 lg:gap-5 animate-rise" style={{ animationDelay: delay }}>
    <SmallPhone lifted={lifted}>{children}</SmallPhone>
    <div className="text-center">
      <p className="text-[#5E5CE6] text-[8px] sm:text-[9px] lg:text-[10px] font-mono tracking-[0.25em] uppercase mb-1 sm:mb-1.5">{label}</p>
      <p className="text-white text-sm sm:text-base lg:text-lg font-bold tracking-tight">{title}</p>
    </div>
  </div>
);

const SlideProductPreview = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const showcases = t.raw('product.showcases') as Array<{ label: string; title: string }>;
  return (
    <div className="flex flex-col h-full relative w-full pt-20 pb-28">
      <SectionHeader section={t('product.section')} title={t('product.title')} index={index} total={total} />
      <div className="flex-1 flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 px-4 sm:px-12 lg:px-20">
        <PhoneShowcase label={showcases[0].label} title={showcases[0].title} delay="0.1s">
          <YourSpacesScreen />
        </PhoneShowcase>
        <PhoneShowcase label={showcases[1].label} title={showcases[1].title} lifted delay="0.3s">
          <GalleryScreen />
        </PhoneShowcase>
        <PhoneShowcase label={showcases[2].label} title={showcases[2].title} delay="0.5s">
          <MemoryScreen />
        </PhoneShowcase>
      </div>
      <SectionFooter left={t('product.footerLeft')} right={t('product.footerRight')} />
    </div>
  );
};

const SlideLandscapeIntro = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col items-center justify-center h-full px-20 text-center relative w-full">
      <SectionHeader section={t('landscapeIntro.section')} title={t('landscapeIntro.title')} index={index} total={total} />
      <div className="flex flex-col items-center gap-16">
        <h3 className="text-gray-400 font-light tracking-tight italic animate-rise" style={{ fontSize: '2.75rem', animationDelay: '0.15s' }}>
          {t('landscapeIntro.headline1')}
        </h3>
        <h2 className="text-white font-black tracking-tighter animate-rise" style={{ fontSize: '6.5rem', animationDelay: '0.55s' }}>
          <span style={{ fontFamily: "'Conthrax', sans-serif" }}>SPACE</span>{' '}
          <span className="text-[#5E5CE6]">{t('landscapeIntro.headline2Suffix')}</span>
        </h2>
      </div>
      <SectionFooter left={t('landscapeIntro.footerLeft')} right={t('landscapeIntro.footerRight')} />
    </div>
  );
};

const CheckIcon = () => (
  <svg className="w-7 h-7 text-[#5E5CE6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
const CrossIcon = () => (
  <svg className="w-6 h-6 text-[#FF3B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const PartialIcon = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
  </svg>
);

type Mark = 'check' | 'partial' | 'cross';
const renderMark = (m: Mark) => {
  if (m === 'check') return <CheckIcon />;
  if (m === 'partial') return <PartialIcon />;
  return <CrossIcon />;
};

const COMPETITORS: { name: string; marks: [Mark, Mark, Mark, Mark, Mark] }[] = [
  { name: 'AirDrop',        marks: ['cross', 'check', 'cross',   'cross', 'cross']   },
  { name: 'Google Photos',  marks: ['check', 'check', 'partial', 'cross', 'cross']   },
  { name: 'Apple Photos',   marks: ['cross', 'check', 'partial', 'cross', 'cross']   },
  { name: 'Google Drive',   marks: ['check', 'check', 'check',   'cross', 'cross']   },
  { name: 'WhatsApp',       marks: ['check', 'cross', 'cross',   'cross', 'partial'] },
  { name: 'Instagram',      marks: ['check', 'cross', 'cross',   'cross', 'check']   },
];

const SlideLandscapeMatrix = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const columns = t.raw('landscapeMatrix.columns') as Array<{ l1: string; l2: string }>;
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('landscapeMatrix.section')} title={t('landscapeMatrix.title')} index={index} total={total} />
      <div className="flex-1 flex flex-col justify-center mt-20 mb-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-x-4 gap-y-1 items-center">
          <div className="font-bold text-gray-500 uppercase tracking-widest text-xs border-b border-gray-800 pb-4">
            {t('landscapeMatrix.competitorsHeader')}
          </div>
          {columns.map((col, i) => (
            <div key={i} className="font-bold text-white text-center text-base uppercase tracking-wide border-b border-gray-800 pb-4 leading-tight">
              {col.l1}<br />{col.l2}
            </div>
          ))}
          {COMPETITORS.map((comp) => (
            <React.Fragment key={comp.name}>
              <div className="text-gray-300 font-semibold text-2xl py-2.5 tracking-tight">{comp.name}</div>
              {comp.marks.map((m, i) => (
                <div key={i} className="flex justify-center py-2.5">{renderMark(m)}</div>
              ))}
            </React.Fragment>
          ))}
          <div className="col-span-6 h-px bg-gradient-to-r from-transparent via-[#5E5CE6]/40 to-transparent my-2" />
          <div className="font-black text-[#5E5CE6] tracking-tighter leading-none" style={{ fontSize: '3.5rem', fontFamily: "'Conthrax', sans-serif" }}>
            SPACE
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#5E5CE6]/10 rounded-xl py-4 flex justify-center border border-[#5E5CE6]/30">
              <CheckIcon />
            </div>
          ))}
        </div>
      </div>
      <SectionFooter left={t('landscapeMatrix.footerLeft')} right={t('landscapeMatrix.footerRight')} />
    </div>
  );
};

const SlideMarketIntro = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative w-full">
      <SectionHeader section={t('marketIntro.section')} title={t('marketIntro.title')} index={index} total={total} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#5E5CE6] rounded-full blur-[180px] opacity-8 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-gray-600 text-xs font-mono tracking-[0.3em] uppercase">{t('marketIntro.eyebrow')}</p>
        <h2 className="text-white font-black tracking-tighter leading-[0.88]" style={{ fontSize: '9rem' }}>
          {t('marketIntro.headlineLine1')}<br />
          <span className="text-[#5E5CE6]">{t('marketIntro.headlineAccent')}</span>
        </h2>
        <div className="w-px h-10 bg-gradient-to-b from-[#5E5CE6]/60 to-transparent" />
        <p className="text-gray-500 text-lg font-light tracking-wide">{t('marketIntro.sub')}</p>
      </div>
      <SectionFooter left={t('marketIntro.footerLeft')} right={t('marketIntro.footerRight')} />
    </div>
  );
};

const SlideMarketTrends = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const linePoints = '38,72 59,64 80,62 101,60 123,57 144,50 165,44 186,60 207,55 228,36 250,29 271,25 292,22';
  const areaFill = `${linePoints} 292,95 38,95`;
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('marketTrends.section')} title={t('marketTrends.title')} index={index} total={total} />
      <div className="flex flex-1 flex-col justify-start mt-24 mb-16 max-w-5xl mx-auto w-full">
        <h2 className="text-white text-5xl font-bold tracking-tight leading-tight mb-3">
          {t('marketTrends.headlinePre')} <span className="text-[#5E5CE6]">{t('marketTrends.headlineAccent')}</span>
        </h2>
        <p className="text-gray-400 text-xl mb-8">{t('marketTrends.lead')}</p>
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="bg-[#1a1a1e] border border-gray-800 rounded-3xl p-6 flex flex-col">
            <p className="text-white font-semibold text-sm mb-5">{t('marketTrends.card1.title')}</p>
            <svg viewBox="0 0 300 115" className="w-full mb-5">
              <defs>
                <linearGradient id="lgMkt1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5E5CE6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#5E5CE6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="38" y1="60" x2="292" y2="60" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="38" y1="43" x2="292" y2="43" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="38" y1="25" x2="292" y2="25" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 3" />
              <text x="34" y="63" fill="#4b5563" fontSize="9" fontFamily="monospace" textAnchor="end">1T</text>
              <text x="34" y="46" fill="#4b5563" fontSize="9" fontFamily="monospace" textAnchor="end">1.5T</text>
              <text x="34" y="28" fill="#4b5563" fontSize="9" fontFamily="monospace" textAnchor="end">2T</text>
              <polygon points={areaFill} fill="url(#lgMkt1)" />
              <polyline points={linePoints} fill="none" stroke="#5E5CE6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="292" cy="22" r="4" fill="#5E5CE6" />
              <text x="288" y="15" fill="#5E5CE6" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">2.1T</text>
              <line x1="38" y1="95" x2="292" y2="95" stroke="#374151" strokeWidth="1" />
              <text x="38" y="108" fill="#6b7280" fontSize="9" fontFamily="monospace">2013</text>
              <text x="186" y="108" fill="#6b7280" fontSize="9" fontFamily="monospace" textAnchor="middle">2020</text>
              <text x="292" y="108" fill="#6b7280" fontSize="9" fontFamily="monospace" textAnchor="end">2025</text>
            </svg>
            <div className="text-[#5E5CE6] font-black text-3xl mb-1">{t('marketTrends.card1.stat')}</div>
            <p className="text-gray-500 text-sm">{t('marketTrends.card1.caption')}</p>
          </div>
          <div className="bg-gradient-to-b from-[#5E5CE6]/20 to-[#1a1a1e] border border-[#5E5CE6]/30 rounded-3xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#5E5CE6]" />
            <p className="text-white font-semibold text-sm mb-5">{t('marketTrends.card2.title')}</p>
            <svg viewBox="0 0 290 125" className="w-full mb-5">
              <text x="288" y="10" fill="#4b5563" fontSize="8" fontFamily="monospace" textAnchor="end">{t('marketTrends.card2.axisLabel')}</text>
              <text x="74" y="26" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="end">WhatsApp</text>
              <rect x="78" y="12" width="200" height="22" rx="4" fill="#5E5CE6" />
              <text x="272" y="27" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">7B</text>
              <text x="74" y="56" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="end">Snapchat</text>
              <rect x="78" y="42" width="109" height="22" rx="4" fill="#5E5CE6" opacity="0.55" />
              <text x="192" y="57" fill="#d1d5db" fontSize="10" fontFamily="monospace">3.8B</text>
              <text x="74" y="86" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="end">Facebook</text>
              <rect x="78" y="72" width="60" height="22" rx="4" fill="#5E5CE6" opacity="0.3" />
              <text x="143" y="87" fill="#9ca3af" fontSize="10" fontFamily="monospace">2.1B</text>
              <text x="74" y="116" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="end">Instagram</text>
              <rect x="78" y="102" width="34" height="22" rx="4" fill="#5E5CE6" opacity="0.15" />
              <text x="117" y="117" fill="#6b7280" fontSize="10" fontFamily="monospace">1.2B</text>
            </svg>
            <div className="text-white font-black text-3xl mb-1">{t('marketTrends.card2.stat')}</div>
            <p className="text-gray-400 text-sm">{t('marketTrends.card2.caption')}</p>
          </div>
          <div className="bg-[#1a1a1e] border border-gray-800 rounded-3xl p-6 flex flex-col">
            <p className="text-white font-semibold text-sm mb-5">{t('marketTrends.card3.title')}</p>
            <svg viewBox="0 0 200 120" className="w-full mb-5">
              <line x1="10" y1="100" x2="190" y2="100" stroke="#374151" strokeWidth="1" />
              <rect x="38" y="76" width="50" height="24" rx="3" fill="#374151" />
              <text x="63" y="71" fill="#6b7280" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">630</text>
              <rect x="112" y="25" width="50" height="75" rx="3" fill="#5E5CE6" />
              <text x="137" y="20" fill="white" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2,000</text>
              <text x="63" y="114" fill="#6b7280" fontSize="10" fontFamily="monospace" textAnchor="middle">2015</text>
              <text x="137" y="114" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="middle">2025</text>
            </svg>
            <div className="text-[#5E5CE6] font-black text-3xl mb-1">{t('marketTrends.card3.stat')}</div>
            <p className="text-gray-500 text-sm">{t('marketTrends.card3.caption')}</p>
          </div>
        </div>
      </div>
      <SectionFooter left={t('marketTrends.footerLeft')} right={t('marketTrends.footerRight')} />
    </div>
  );
};

const SlideBusinessModel = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('businessModel.section')} title={t('businessModel.title')} index={index} total={total} />
      <div className="flex-1 flex flex-col justify-center mt-20 mb-20 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-white text-5xl font-bold tracking-tight mb-3">
            {t('businessModel.headlinePre')} <span className="text-[#5E5CE6]">{t('businessModel.headlineAccent')}</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl">{t('businessModel.lead')}</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#0c0c14] border-2 border-[#5E5CE6] rounded-3xl p-10 flex flex-col relative shadow-[0_0_50px_rgba(94,92,230,0.12)]">
            <div className="absolute -top-3.5 left-10 px-4 py-1 bg-[#5E5CE6] text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
              {t('businessModel.freemium.badge')}
            </div>
            <div className="flex items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#5E5CE6]/15 border border-[#5E5CE6]/30 flex items-center justify-center text-[#5E5CE6] shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-black text-3xl tracking-tight mb-1">{t('businessModel.freemium.title')}</h3>
                <p className="text-[#5E5CE6] text-xs font-mono tracking-widest uppercase">
                  {t('businessModel.freemium.subtitlePre')} <span style={{ fontFamily: "'Conthrax', sans-serif" }}>SPACE</span>{t('businessModel.freemium.subtitleSuffix')}
                </p>
              </div>
            </div>
            <div className="space-y-5 flex-1">
              <div className="flex gap-4">
                <div className="w-px bg-gray-800 shrink-0 ml-1" />
                <div>
                  <p className="text-white font-semibold text-lg mb-1">{t('businessModel.freemium.freeForeverTitle')}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{t('businessModel.freemium.freeForeverBody')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-px bg-[#5E5CE6]/40 shrink-0 ml-1" />
                <div>
                  <p className="text-white font-semibold text-lg mb-1">
                    <span style={{ fontFamily: "'Conthrax', sans-serif" }}>SPACE</span><span className="text-[#5E5CE6]">+</span>{t('businessModel.freemium.premiumTitleSuffix')}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">{t('businessModel.freemium.premiumBody')}</p>
                  <p className="text-gray-600 text-xs mt-2 font-mono">{t('businessModel.freemium.pricingNote')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1e] border border-gray-800 rounded-3xl p-10 flex flex-col">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-black text-3xl tracking-tight mb-1">{t('businessModel.zeroAds.title')}</h3>
                <p className="text-[#5E5CE6] text-xs font-mono tracking-widest uppercase">{t('businessModel.zeroAds.subtitle')}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('businessModel.zeroAds.body')}{' '}
                <span className="text-white font-semibold">{t('businessModel.zeroAds.bodyEmphasis')}</span>
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-[#0c0c14] rounded-2xl p-4 text-center border border-gray-800">
                  <p className="text-white font-black text-2xl mb-1">0</p>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{t('businessModel.zeroAds.stat1Label')}</p>
                </div>
                <div className="bg-[#0c0c14] rounded-2xl p-4 text-center border border-gray-800">
                  <p className="text-white font-black text-2xl mb-1">0</p>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{t('businessModel.zeroAds.stat2Label')}</p>
                </div>
                <div className="bg-[#0c0c14] rounded-2xl p-4 text-center border border-gray-800">
                  <p className="text-[#5E5CE6] font-black text-2xl mb-1">∞</p>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{t('businessModel.zeroAds.stat3Label')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionFooter left={t('businessModel.footerLeft')} right={t('businessModel.footerRight')} />
    </div>
  );
};

const StackIconSmartphone = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <line x1="9" y1="7" x2="15" y2="7" strokeOpacity="0.5" />
    <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const StackIconGear = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const StackIconCloud = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10a6 6 0 00-11.9-1A4 4 0 105 17h13a3 3 0 000-6z" />
  </svg>
);
const TechTag = ({ label }: { label: string }) => (
  <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-white/[0.06] border border-white/[0.1] text-gray-400 whitespace-nowrap">
    {label}
  </span>
);
const StackConnector = () => (
  <div className="flex items-center self-center shrink-0 px-1">
    <svg width="40" height="20" viewBox="0 0 40 20">
      <line x1="2" y1="10" x2="28" y2="10" stroke="#5E5CE6" strokeWidth="1.2" strokeOpacity="0.25" strokeDasharray="3 3" />
      <polygon points="26,6 38,10 26,14" fill="#5E5CE6" fillOpacity="0.25" />
    </svg>
  </div>
);

const STACK_ICONS = [<StackIconSmartphone key="sm" />, <StackIconGear key="g" />, <StackIconCloud key="cl" />];
const STACK_ACCENTS = ['#5E5CE6', '#0ea5e9', '#34d399'];
const STACK_BG = ['rgba(94,92,230,0.06)', 'rgba(14,165,233,0.05)', 'rgba(52,211,153,0.05)'];
const STACK_BORDER = ['rgba(94,92,230,0.2)', 'rgba(14,165,233,0.18)', 'rgba(52,211,153,0.18)'];
const STACK_TAGS = [
  ['React Native', 'TypeScript'],
  ['NativeWind 4', 'React Navigation 7', 'Context API'],
  ['Supabase', 'PostgreSQL', 'Auth', 'Storage', 'Realtime'],
];

const SlideTechStack = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const blocks = t.raw('techStack.blocks') as Array<{ eyebrow: string; title: string; subtitle: string; description: string }>;
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('techStack.section')} title={t('techStack.title')} index={index} total={total} />
      <div className="flex-1 flex flex-col justify-center mt-16 mb-20 w-full max-w-5xl mx-auto gap-8">
        <h2 className="text-white text-4xl font-bold tracking-tight">
          {t('techStack.headlinePre')} <span className="text-[#5E5CE6]">{t('techStack.headlineAccent')}</span>
        </h2>
        <div className="flex items-stretch gap-0 w-full">
          {blocks.map((block, i) => (
            <React.Fragment key={block.eyebrow}>
              {i > 0 && <StackConnector />}
              <div
                className="flex-1 flex flex-col gap-5 rounded-3xl p-7 backdrop-blur-sm"
                style={{ background: STACK_BG[i], border: `1px solid ${STACK_BORDER[i]}` }}
              >
                <div className="flex flex-col gap-3">
                  <span style={{ color: STACK_ACCENTS[i] }}>{STACK_ICONS[i]}</span>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: STACK_ACCENTS[i] }}>{block.eyebrow}</p>
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl tracking-tight leading-tight">{block.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{block.subtitle}</p>
                </div>
                <p className="text-gray-300 text-base leading-relaxed flex-1">{block.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/[0.06]">
                  {STACK_TAGS[i].map((tag) => <TechTag key={tag} label={tag} />)}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <p className="text-gray-700 text-xs font-mono tracking-widest text-center uppercase">{t('techStack.footerNote')}</p>
      </div>
      <SectionFooter left={t('techStack.footerLeft')} right={t('techStack.footerRight')} />
    </div>
  );
};

const TEAM_MEMBERS = [
  { name: 'Simone Copetti',    photo: simoneSrc, linkedin: 'https://www.linkedin.com/in/simone-copetti-9235b232a' },
  { name: 'Andrea Citton',    photo: andreaSrc, linkedin: 'https://www.linkedin.com/in/andrea-citton-675785286/' },
  { name: 'Bernardo Cecchini', photo: '',        linkedin: 'https://www.linkedin.com/in/bernardo-cecchini-84a748353' },
  { name: 'Matteo Bertini',   photo: '',        linkedin: 'https://www.linkedin.com/in/matteo-bertini' },
];

const SlideTeam = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('team.section')} title={t('team.title')} index={index} total={total} />
      <div className="flex-1 flex flex-col justify-center mt-20 max-w-5xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-white text-5xl font-bold tracking-tight">
            {t('team.headlinePre')} <span className="text-[#5E5CE6]" style={{ fontFamily: "'Conthrax', sans-serif" }}>{t('team.headlineAccent')}</span>
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="bg-[#0e0e16] border border-gray-800 rounded-3xl overflow-hidden flex flex-col">
              <div className="w-full aspect-square bg-gradient-to-br from-[#1c1c28] to-[#0c0c14] flex items-center justify-center border-b border-gray-800 relative overflow-hidden">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/60 to-transparent" />
              </div>
              <div className="px-6 py-5 flex items-end justify-between">
                <div>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                     className="text-white font-bold text-base tracking-tight leading-snug mb-1 hover:text-[#5E5CE6] transition-colors block whitespace-nowrap">
                    {member.name}
                  </a>
                  <p className="text-[#5E5CE6] text-[10px] font-mono tracking-[0.2em] uppercase">{t('team.role')}</p>
                </div>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors shrink-0 ml-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionFooter left={t('team.footerLeft')} right={t('team.footerRight')} />
    </div>
  );
};

const SlideVision = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative w-full">
      <SectionHeader section={t('vision.section')} title={t('vision.title')} index={index} total={total} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#5E5CE6] rounded-full blur-[160px] opacity-10 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8 mt-10">
        <p className="text-gray-600 text-xs font-mono tracking-[0.3em] uppercase">{t('vision.eyebrow')}</p>
        <h2 className="text-white font-black tracking-tighter leading-[0.88]" style={{ fontSize: '9rem' }}>
          {t('vision.headlineLine1')}<br />
          <span className="text-[#5E5CE6]">{t('vision.headlineAccent')}</span>
        </h2>
        <div className="w-px h-10 bg-gradient-to-b from-[#5E5CE6]/60 to-transparent" />
        <p className="text-gray-400 text-xl font-light max-w-xl leading-relaxed">
          {t('vision.sub')}<br />{t('vision.subLine2')}
        </p>
      </div>
      <SectionFooter left={t('vision.footerLeft')} right={t('vision.footerRight')} />
    </div>
  );
};

const SlideVisionExpanded = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const lines = t.raw('visionExpanded.lines') as string[];
  const communities = t.raw('visionExpanded.communities') as Array<{ emoji: string; name: string; sub: string }>;
  const lineColors = ['text-gray-600', 'text-gray-500', 'text-gray-300', 'text-[#5E5CE6]'];
  return (
    <div className="flex flex-col h-full px-20 relative w-full">
      <SectionHeader section={t('visionExpanded.section')} title={t('visionExpanded.title')} index={index} total={total} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#5E5CE6] rounded-full blur-[180px] opacity-8 pointer-events-none" />
      <div className="flex-1 flex gap-16 items-center mt-16 max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-gray-600 text-xs font-mono tracking-[0.3em] uppercase">{t('visionExpanded.eyebrow')}</p>
          <div className="flex flex-col gap-0" style={{ fontSize: '4.2rem', lineHeight: '1.05' }}>
            {lines.map((line, i) => {
              const parts = line.split('SPACE');
              return (
                <span key={i} className={`${lineColors[i]} font-black tracking-tighter`}>
                  {parts.length > 1 ? parts.map((part, j) => (
                    <span key={j}>{part}{j < parts.length - 1 && <span style={{ fontFamily: "'Conthrax', sans-serif" }}>SPACE</span>}</span>
                  )) : line}
                </span>
              );
            })}
          </div>
        </div>
        <div className="w-px self-stretch bg-gradient-to-b from-transparent via-gray-800 to-transparent shrink-0" />
        <div className="flex flex-col gap-4 flex-1">
          {communities.map(({ emoji, name, sub }) => (
            <div key={name} className="flex items-center gap-5 bg-[#0e0e16] border border-gray-800 rounded-2xl px-6 py-4">
              <span className="text-3xl shrink-0">{emoji}</span>
              <div>
                <p className="text-white font-bold text-lg leading-tight">{name}</p>
                <p className="text-gray-600 text-sm font-mono mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionFooter left={t('visionExpanded.footerLeft')} right={t('visionExpanded.footerRight')} />
    </div>
  );
};

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.17 8.17 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  Instagram: <InstagramIcon />,
  TikTok: <TikTokIcon />,
  X: <XIcon />,
};

const SlideCTA = ({ index, total }: SlideProps) => {
  const t = useTranslations('schedule');
  const socials = t.raw('cta.socials') as Array<{ label: string; href: string }>;
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#5E5CE6] rounded-full blur-[140px] opacity-10 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-white font-black tracking-tighter" style={{ fontSize: '13rem', lineHeight: '0.9', fontFamily: "'Conthrax', sans-serif" }}>
          SPACE
        </h1>
        <p className="text-gray-300 text-3xl font-light tracking-tight">{t('cta.tagline')}</p>
        <div className="w-px h-12 bg-gradient-to-b from-[#5E5CE6] to-transparent" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-[#5E5CE6] text-[10px] font-mono tracking-[0.25em] uppercase">{t('cta.contactLabel')}</p>
          <a href={`mailto:${t('cta.contactEmail')}`} className="text-white font-bold text-2xl hover:text-[#5E5CE6] transition-colors">
            {t('cta.contactEmail')}
          </a>
        </div>
        <div className="flex gap-3">
          {socials.map((s) => (
            <button
              key={s.label}
              onClick={(e) => { e.stopPropagation(); window.open(s.href, '_blank'); }}
              className="w-11 h-11 rounded-full border border-gray-800 bg-[#0e0e16] hover:border-[#5E5CE6]/60 hover:text-[#5E5CE6] text-gray-400 transition-all flex items-center justify-center"
            >
              {SOCIAL_ICONS[s.label]}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gray-700 text-xs font-mono tracking-widest uppercase">
        {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')} · {t('common.endOfDeck')}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHELL
// ─────────────────────────────────────────────────────────────────────────────

const DESIGN_W = 1280;
const DESIGN_H = 720;

function useSlideScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

const SLIDES: React.FC<SlideProps>[] = [
  SlideIntro,
  SlideWhatIsSpace,
  SlideProblem,
  SlideSolution,
  SlideProductPreview,
  SlideLandscapeIntro,
  SlideLandscapeMatrix,
  SlideMarketIntro,
  SlideMarketTrends,
  SlideBusinessModel,
  SlideTechStack,
  SlideVision,
  SlideVisionExpanded,
  SlideTeam,
  SlideCTA,
];

const TRANSITION_MS = 550;

export default function ScheduleDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [enterClass, setEnterClass] = useState('slide-enter');
  const scale = useSlideScale();
  const total = SLIDES.length;

  const startTransition = (next: number, dir: 'next' | 'prev') => {
    if (animating || next === currentSlide) return;
    setDirection(dir);
    setEnterClass(dir === 'next' ? 'slide-enter-next' : 'slide-enter-prev');
    setPrevSlide(currentSlide);
    setCurrentSlide(next);
    setAnimating(true);
    setTimeout(() => { setPrevSlide(null); setAnimating(false); }, TRANSITION_MS);
  };

  const goNext = () => startTransition(Math.min(currentSlide + 1, total - 1), 'next');
  const goPrev = () => startTransition(Math.max(currentSlide - 1, 0), 'prev');
  const goTo   = (idx: number) => startTransition(idx, idx > currentSlide ? 'next' : 'prev');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, animating, total]);

  const Current = SLIDES[currentSlide];
  const Prev    = prevSlide !== null ? SLIDES[prevSlide] : null;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .slide-enter { animation: fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes zoomEnter {
          from { opacity: 0; transform: scale(1.08); filter: blur(6px); }
          to   { opacity: 1; transform: scale(1);    filter: blur(0);   }
        }
        @keyframes zoomExit {
          from { opacity: 1; transform: scale(1);    filter: blur(0);   }
          to   { opacity: 0; transform: scale(0.92); filter: blur(6px); }
        }
        .slide-enter-next, .slide-enter-prev { animation: zoomEnter ${TRANSITION_MS}ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards; }
        .slide-exit-next,  .slide-exit-prev  { animation: zoomExit  ${TRANSITION_MS}ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards; }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-glow { animation: pulse-glow 4s ease-in-out infinite; }
        @keyframes screen-on { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-screen-on { animation: screen-on 0.5s ease-out both; }
        @keyframes notif-in {
          0%   { opacity: 0; transform: translateY(-24px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-notif-in { animation: notif-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @keyframes message-in {
          0%   { opacity: 0; transform: translateY(10px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-message-in { animation: message-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @keyframes line-rise {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-line-1   { animation: line-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s  both; }
        .animate-line-sep { animation: line-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s  both; }
        .animate-line-2   { animation: line-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.85s both; }
        .animate-rise     { animation: line-rise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
      `}</style>

      <div className="w-screen h-screen bg-[#020204] text-white font-sans overflow-hidden select-none relative flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5E5CE6]/20 rounded-full blur-[120px] animate-glow mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4A48D4]/10 rounded-full blur-[150px] animate-glow mix-blend-screen" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 z-0 opacity-20"
             style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 shrink-0" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'center center' }}>
          {Prev && (
            <div
              key={`prev-${prevSlide}`}
              className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none ${direction === 'next' ? 'slide-exit-next' : 'slide-exit-prev'}`}
            >
              <Prev onNext={goNext} onPrev={goPrev} index={prevSlide! + 1} total={total} />
            </div>
          )}
          <div
            key={`curr-${currentSlide}`}
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${enterClass}`}
            onClick={goNext}
          >
            <Current onNext={goNext} onPrev={goPrev} index={currentSlide + 1} total={total} />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); goTo(idx); }}
                className={`rounded-full transition-all duration-500 ease-out ${
                  idx === currentSlide ? 'w-3 h-3 bg-[#5E5CE6] shadow-[0_0_10px_#5E5CE6]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
