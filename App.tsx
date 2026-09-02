/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PatientDiagnosisStudio } from './components/PatientDiagnosisStudio';
import { PrayerMapQiblaStudio } from './components/PrayerMapQiblaStudio';
import { TakseerTracker } from './components/TakseerTracker';
import { TakseerMatrixSuggester } from './components/TakseerMatrixSuggester';
import { AbjadArabiStudio } from './components/AbjadArabiStudio';
import { AbjadCalculator } from './components/AbjadCalculator';
import { HisabiyatRoohStudio } from './components/HisabiyatRoohStudio';
import { TakseerStudio } from './components/TakseerStudio';
import { TakseerAflatoonStudio } from './components/TakseerAflatoonStudio';
import { TakseerAflatoonTakleebStudio } from './components/TakseerAflatoonTakleebStudio';
import { MadarijZakatRijalGhaibStudio } from './components/MadarijZakatRijalGhaibStudio';
import { RozanaJaffriWerdStudio } from './components/RozanaJaffriWerdStudio';
import { IstikharaStudio } from './components/IstikharaStudio';
import { NaqshGenerator } from './components/NaqshGenerator';
import { AamalHub } from './components/AamalHub';
import { SaatPlanetaryClock } from './components/SaatPlanetaryClock';
import { EclipsePlanetaryStudio } from './components/EclipsePlanetaryStudio';
import { BooksEncyclopedia } from './components/BooksEncyclopedia';
import { HisarShield } from './components/HisarShield';
import { GeminiJafrConsultant } from './components/GeminiJafrConsultant';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { FooterDownloadBanner } from './components/FooterDownloadBanner';
import { AuthorAppProfile } from './components/AuthorAppProfile';
import { StartingProfileBanner } from './components/StartingProfileBanner';
import { TantraJantraMantraStudio } from './components/TantraJantraMantraStudio';
import { TalismiQadeemStudio } from './components/TalismiQadeemStudio';
import { ShifaAlAsqamTab } from './components/ShifaAlAsqamTab';
import { MoonCalendarStudio } from './components/MoonCalendarStudio';
import { SihrAlUshaqStudio } from './components/SihrAlUshaqStudio';
import { TamtamHindiStudio } from './components/TamtamHindiStudio';
import { MujarrabatIbnSinaStudio } from './components/MujarrabatIbnSinaStudio';
import { JafrSymbolismStudio } from './components/JafrSymbolismStudio';
import { JafrOperationsIndex } from './components/JafrOperationsIndex';
import { ShamsAlMaarifStudio } from './components/ShamsAlMaarifStudio';
import { QuranicSurahsOperationsStudio } from './components/QuranicSurahsOperationsStudio';
import { RuhaniHaziratMeditationStudio } from './components/RuhaniHaziratMeditationStudio';
import { TakseerAdvancedArticles } from './components/TakseerAdvancedArticles';
import { LegalEthicalDisclaimerBanner } from './components/LegalEthicalDisclaimerBanner';
import { ShadiZaichaStudio } from './components/ShadiZaichaStudio';
import { RamalTashkheesStudio } from './components/RamalTashkheesStudio';
import { MokamalHamzadStudio } from './components/MokamalHamzadStudio';
import { AainaAmliyatStudio } from './components/AainaAmliyatStudio';
import { PlanetaryLohStudio } from './components/PlanetaryLohStudio';
import { DownloadProvider } from './context/DownloadContext';
import { BookOpen, Sparkles, Compass, Flame, Shield, Clock, Award, Check, Download, Smartphone, ShieldCheck, UserCheck } from 'lucide-react';

export default function App() {
  return (
    <DownloadProvider>
      <MainAppContent />
    </DownloadProvider>
  );
}

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<string>('matrix-suggester');
  const [transferredText, setTransferredText] = useState<string>('یا ودود یا حبیب');
  const [transferredAdad, setTransferredAdad] = useState<number>(786);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);

  const handleSendToTakseer = (text: string) => {
    setTransferredText(text);
    setActiveTab('takseer');
  };

  const handleSendToTakseerAflatoon = (text: string) => {
    setTransferredText(text);
    setActiveTab('aflatoon');
  };

  const handleSendToMatrixSuggester = (text: string) => {
    setTransferredText(text);
    setActiveTab('matrix-suggester');
  };

  const handleSendToNaqsh = (adad: number) => {
    setTransferredAdad(adad);
    setActiveTab('naqsh');
  };

  const handleSendToIstikhara = (text: string) => {
    setTransferredText(text);
    setActiveTab('istikhara');
  };

  return (
    <div className="min-h-screen bg-[#fdfaf1] text-[#2c1e14] font-urdu selection:bg-[#bc6c25] selection:text-white relative parchment-pattern">
      {/* Background Soft Natural Warm Glow Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#faedcd]/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#ccd5ae]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-[#e7d8c9]/60 rounded-full blur-3xl" />
      </div>

      {/* Atmospheric Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Starting Profile Banner (Visible on all tabs except when directly on profile-guide tab) */}
        {activeTab !== 'profile-guide' && (
          <StartingProfileBanner
            onOpenFullProfile={() => setActiveTab('profile-guide')}
            onOpenAppGuide={() => setActiveTab('profile-guide')}
          />
        )}

        {activeTab === 'profile-guide' && (
          <AuthorAppProfile
            onOpenApkModal={() => setIsApkModalOpen(true)}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'planetary-loh' && (
          <PlanetaryLohStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
            onNavigateToSaat={() => setActiveTab('saat')}
          />
        )}

        {activeTab === 'ramal-tashkhees' && (
          <RamalTashkheesStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'mokamal-hamzad' && (
          <MokamalHamzadStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'aaina-amliyat' && (
          <AainaAmliyatStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'shadi-zaicha' && (
          <ShadiZaichaStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'ruhani-hazirat' && (
          <RuhaniHaziratMeditationStudio />
        )}

        {activeTab === 'quranic-operations' && (
          <QuranicSurahsOperationsStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
            onSendToTakseerAflatoon={handleSendToTakseerAflatoon}
            onSendToIstikhara={handleSendToIstikhara}
          />
        )}

        {activeTab === 'shams-al-maarif' && (
          <ShamsAlMaarifStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
            onNavigateToHisar={() => setActiveTab('hisar')}
          />
        )}

        {activeTab === 'takseer-articles' && (
          <TakseerAdvancedArticles
            onSendToTakseer={handleSendToTakseer}
            onSendToTakseerAflatoon={handleSendToTakseerAflatoon}
            onSendToNaqsh={handleSendToNaqsh}
          />
        )}

        {activeTab === 'operations-index' && (
          <JafrOperationsIndex
            onNavigateTab={(tabId) => setActiveTab(tabId)}
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'jafr-symbolism' && (
          <JafrSymbolismStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'mujarrabat-ibn-sina' && (
          <MujarrabatIbnSinaStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'sihr-al-ushaq' && (
          <SihrAlUshaqStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'tamtam-hindi' && (
          <TamtamHindiStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'shifa-al-asqam' && (
          <ShifaAlAsqamTab
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'moon-calendar' && (
          <MoonCalendarStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'talismi-qadeem' && (
          <TalismiQadeemStudio
            onSendToNaqsh={(text, adad) => {
              setTransferredText(text);
              handleSendToNaqsh(adad);
            }}
          />
        )}

        {activeTab === 'tantra-jantra-mantra' && (
          <TantraJantraMantraStudio
            onSendToNaqsh={(text, adad) => {
              setTransferredText(text);
              handleSendToNaqsh(adad);
            }}
          />
        )}

        {activeTab === 'eclipse' && (
          <EclipsePlanetaryStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'diagnosis' && (
          <PatientDiagnosisStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'prayer-map' && (
          <PrayerMapQiblaStudio
            onSendToMatrixSuggester={handleSendToMatrixSuggester}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'tracker' && (
          <TakseerTracker onSelectTakseerWord={handleSendToTakseer} />
        )}

        {activeTab === 'matrix-suggester' && (
          <TakseerMatrixSuggester
            initialText={transferredText}
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
            onSendToAflatoon={handleSendToTakseerAflatoon}
          />
        )}

        {activeTab === 'istikhara' && (
          <IstikharaStudio
            onSendToMatrixSuggester={handleSendToMatrixSuggester}
            onSendToTakseer={handleSendToTakseer}
          />
        )}

        {activeTab === 'abjad-arabi' && (
          <AbjadArabiStudio
            onSendToNaqsh={handleSendToNaqsh}
            onSendToTakseer={handleSendToTakseer}
            onSendToTakseerAflatoon={handleSendToTakseerAflatoon}
            onSendToIstikhara={handleSendToIstikhara}
          />
        )}

        {activeTab === 'abjad' && (
          <AbjadCalculator
            onSendToTakseer={handleSendToTakseer}
            onSendToTakseerAflatoon={handleSendToTakseerAflatoon}
            onSendToNaqsh={handleSendToNaqsh}
            onSendToIstikhara={handleSendToIstikhara}
            onSendToMatrixSuggester={handleSendToMatrixSuggester}
          />
        )}

        {activeTab === 'hisabiyat-rooh' && (
          <HisabiyatRoohStudio
            onSendToTakseer={handleSendToTakseer}
            onSendToTakseerAflatoon={handleSendToTakseerAflatoon}
            onSendToNaqsh={handleSendToNaqsh}
          />
        )}

        {activeTab === 'takseer' && (
          <TakseerStudio initialText={transferredText} />
        )}

        {activeTab === 'aflatoon' && (
          <TakseerAflatoonStudio initialTalib={transferredText} />
        )}

        {activeTab === 'madarij-rijal-studio' && (
          <MadarijZakatRijalGhaibStudio />
        )}

        {activeTab === 'takleeb-video-studio' && (
          <TakseerAflatoonTakleebStudio />
        )}

        {activeTab === 'rozana-jaffri-werd' && (
          <RozanaJaffriWerdStudio
            onSendToTakseer={handleSendToTakseer}
            onSendToTakseerAflatoon={handleSendToTakseerAflatoon}
            onSendToNaqsh={handleSendToNaqsh}
          />
        )}

        {activeTab === 'naqsh' && (
          <NaqshGenerator initialAdad={transferredAdad} />
        )}

        {activeTab === 'aamal' && (
          <AamalHub
            onNavigateToNaqsh={handleSendToNaqsh}
            onNavigateToEclipse={() => setActiveTab('eclipse')}
            onNavigateToOperationsIndex={() => setActiveTab('operations-index')}
          />
        )}

        {activeTab === 'saat' && (
          <SaatPlanetaryClock onNavigateToEclipse={() => setActiveTab('eclipse')} />
        )}

        {activeTab === 'books' && (
          <BooksEncyclopedia />
        )}

        {activeTab === 'hisar' && (
          <HisarShield />
        )}

        {activeTab === 'consultant' && (
          <GeminiJafrConsultant />
        )}

        {/* Global Ethical, Legal & Sharia Warning / Disclaimer Banner Under All Tabs */}
        <LegalEthicalDisclaimerBanner />
      </main>

      {/* Antique Natural Tones Footer with Software Creator Distinction & APK Download */}
      <footer className="relative z-10 border-t-2 border-[#d4a373] bg-[#2c1e14] py-8 text-center text-xs text-[#a89078]">
        <div className="mx-auto max-w-7xl px-4 space-y-4">
          {/* Direct APK / App Download Banner with Live Visual Progress Bar in Footer */}
          <FooterDownloadBanner onOpenModal={() => setIsApkModalOpen(true)} />

          <button
            onClick={() => setActiveTab('profile-guide')}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#3d2b1f] hover:bg-[#4a3526] border border-[#bc6c25] text-xs text-[#faedcd] shadow-sm transition-all cursor-pointer transform hover:scale-105 group"
            title="تعارفِ مصنف و رہنما ایپ کا مکمل صفحہ دیکھیں"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#bc6c25] to-[#283618] flex items-center justify-center text-[#dda15e] ring-1.5 ring-[#dda15e] shrink-0">
              <Award className="h-4 w-4" />
            </div>
            <span>سافٹ ویئر تخلیق کار و محقق:</span>
            <span className="font-amiri font-bold text-base text-[#dda15e] group-hover:underline">
              حاجی ساجد علی گورگیج البلوشی
            </span>
            <UserCheck className="h-4 w-4 text-[#dda15e] ml-1" />
          </button>

          <p className="font-amiri text-base font-bold text-[#fdfaf1]">
            مستند جفری سافٹ ویئر و انسائیکلوپیڈیا از علوم کاش البرنی
          </p>
          <p className="text-[#d4a373]">
            ماخوذ از کتب: قوانین طلسم، قوانین افلاطون، مفتاح الجفر، رموز الجفر، علم تکسیر و نقوش، اور اعمال تسخیر
          </p>
          <p className="text-[11px] text-[#8d6e63]">
            طراحی شدہ برائے علمی، تحقیقی و عملی مقاصد | جملہ حقوق بحق کاش البرنی لائبریری و حاجی ساجد علی گورگیج البلوشی محفوظ ہیں © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* APK & Package Download Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />
    </div>
  );
}

