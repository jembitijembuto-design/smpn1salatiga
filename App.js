import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const SCHOOL_WEBSITE = 'https://smpn1salatiga.sch.id';

const schoolProfile = {
  name: 'Bopo Priyanto, S.Si',
  jabatan: 'Guru / Wali Kelas 1',
  guru: 'Informatika',
  nip: '19930601 2019032019',
};

const summaryData = [
  { label: 'Jumlah Siswa', value: '7' },
  { label: 'Jumlah Kelas', value: '2' },
];

const primaryMenu = [
  { id: 'modul', label: 'Modul Ajar', icon: 'book-reader', color: '#ef5350', bg: '#eef3ff' },
  { id: 'absen', label: 'Absen', icon: 'clipboard-check', color: '#7d5ef5', bg: '#f8f3ff' },
  { id: 'izin', label: 'Izin Pegawai', icon: 'user-check', color: '#f3a63d', bg: '#fff8eb' },
  { id: 'scan', label: 'Scan Siswa', icon: 'qrcode', color: '#f15a5d', bg: '#ebf9ff' },
  { id: 'kelas', label: 'Absensi Kelas', icon: 'desktop', color: '#2c9cdc', bg: '#edf7ff' },
  { id: 'jurnal', label: 'Jurnal', icon: 'book', bg: '#eef5ff', color: '#4b7bed' },
  { id: 'nilai', label: 'Penilaian', icon: 'chart-bar', color: '#1eaedb', bg: '#edfbff' },
  { id: 'siswa', label: 'Siswa', icon: 'users', color: '#15b883', bg: '#effef7' },
  { id: 'kelas2', label: 'Kelas', icon: 'school', color: '#f4b344', bg: '#fff9ed' },
  { id: 'materi', label: 'Materi', icon: 'folder', color: '#8f6ce9', bg: '#f8f4ff' },
  { id: 'pelanggaran', label: 'Pelanggaran Siswa', icon: 'exclamation-circle', color: '#eb5368', bg: '#fff1f3' },
  { id: 'report', label: 'Report', icon: 'clipboard-list', color: '#29bca8', bg: '#edfdf9' },
];

const extraMenu = [
  { id: 'kurikulum', label: 'Kurikulum 2026', icon: 'book-open', color: '#6f5ef8', bg: '#f4f1ff' },
  { id: 'kompetensi', label: 'Kompetensi Siswa', icon: 'award', color: '#3d8bfd', bg: '#edf6ff' },
  { id: 'lks', label: 'LKS / Tugas', icon: 'tasks', color: '#f59e0b', bg: '#fff7e8' },
  { id: 'tka', label: 'Materi TKA', icon: 'graduation-cap', color: '#4f86ff', bg: '#edf8ff' },
  { id: 'garuda', label: 'Aplikasi Garuda', icon: 'rocket', color: '#f59e0b', bg: '#fffaf0' },
  { id: 'website', label: 'Website Sekolah', icon: 'globe', color: '#4165d8', bg: '#edf2ff' },
  { id: 'english', label: 'English Translator', icon: 'language', color: '#5a74ef', bg: '#edf3ff' },
  { id: 'ujian', label: 'Ujian Online', icon: 'file-signature', color: '#d9a217', bg: '#fff7d9' },
  { id: 'izinPegawai', label: 'Izin Pegawai', icon: 'user-check', color: '#18a78d', bg: '#f0fdf9' },
  { id: 'scanKamera', label: 'Scan Pakai Kamera', icon: 'camera', color: '#4657d7', bg: '#edf1f9' },
];

const scanStudents = [
  { name: 'ANASTASYA PUTRI', status: 'Siswa', time: '09:11:28', score: 9 },
  { name: 'AMIRA', status: 'Siswa', time: '09:08:35', score: 9 },
  { name: 'MUH.AKBAR', status: 'Siswa', time: '09:03:46', score: 8 },
  { name: 'BESSE HASNIAH', status: 'Siswa', time: '08:55:20', score: 9 },
  { name: 'ANDI MUSFIRAWATI F', status: 'Siswa', time: '08:48:44', score: 9 },
];

const curriculumItems = [
  'Kurikulum Merdeka 2026',
  'Implementasi Profil Pelajar Pancasila',
  'Pembelajaran berbasis proyek',
  'Literasi, numerasi, dan digital',
  'Penilaian autentik dan portofolio',
  'Integrasi TKA, bakat minat, dan PPPK',
];

const curriculumModules = [
  { subject: 'Bahasa Indonesia', topic: 'Membaca kritis dan menulis argumentatif', target: 'Keterampilan literasi', duration: '4 pertemuan' },
  { subject: 'Matematika', topic: 'Numerasi dan pemecahan masalah kontekstual', target: 'Berpikir logis', duration: '4 pertemuan' },
  { subject: 'IPA', topic: 'Klasifikasi makhluk hidup dan ekosistem', target: 'Scientific reasoning', duration: '3 pertemuan' },
  { subject: 'IPAS', topic: 'Sistem tata surya dan perubahan lingkungan', target: 'Analisis fenomena alam', duration: '4 pertemuan' },
  { subject: 'Informatika', topic: 'Algoritma, dasar pemrograman, dan literasi digital', target: 'Computational thinking', duration: '5 pertemuan' },
  { subject: 'Pendidikan Pancasila', topic: 'Kewarganegaraan, norma, dan semangat kebangsaan', target: 'Karakter nasional', duration: '3 pertemuan' },
];

const competencyItems = [
  { title: 'Literasi', detail: 'Mampu memahami teks, mencari informasi, dan mengekspresikan ide secara jelas.' },
  { title: 'Numerasi', detail: 'Mampu menganalisis data sederhana, berhitung, dan memecahkan soal kontekstual.' },
  { title: 'Digital', detail: 'Mampu menggunakan perangkat digital untuk belajar, mencari informasi, dan mengolah data.' },
  { title: 'Karakter', detail: 'Menunjukkan sikap disiplin, jujur, tanggung jawab, dan gotong royong.' },
  { title: 'Kreativitas', detail: 'Mampu menghasilkan karya sederhana berbasis proyek atau tugas kolaboratif.' },
  { title: 'Komunikasi', detail: 'Mampu menyampaikan ide secara lisan maupun tulisan dengan baik.' },
];

const studentWorksheets = [
  { title: 'LKS Bahasa Indonesia', description: 'Membaca teks dan menulis ringkasan', level: 'Kelas 7' },
  { title: 'LKS Matematika', description: 'Operasi bilangan, persamaan dasar, dan grafik', level: 'Kelas 7' },
  { title: 'LKS IPA', description: 'Pengamatan, laporan eksperimen, dan klasifikasi', level: 'Kelas 7' },
  { title: 'LKS Informatika', description: 'Flowchart, logika dasar, dan algoritma', level: 'Kelas 7' },
  { title: 'LKS Projek', description: 'Proyek lintas mata pelajaran berbasis tema', level: 'Kelas 7' },
  { title: 'LKS Refleksi', description: 'Evaluasi diri, target belajar, dan jurnal', level: 'Kelas 7' },
];

const tkaPractice = [
  { title: 'Literasi Bahasa', detail: 'Membaca pemahaman, ide pokok, dan inferensi.' },
  { title: 'Numerasi', detail: 'Operasi hitung, aljabar dasar, dan pemecahan masalah.' },
  { title: 'Logika', detail: 'Pola, hubungan, dan penalaran deduktif/s induktif.' },
  { title: 'Analisis Data', detail: 'Membaca tabel, diagram, dan grafik sederhana.' },
  { title: 'Pemecahan Masalah', detail: 'Situasi nyata dan solusi berbasis fakta.' },
  { title: 'Literasi Digital', detail: 'Penggunaan perangkat dan internet untuk belajar efektif.' },
];

const renderMenuIcon = (icon, color, size) => <FontAwesome5 name={icon} size={size} color={color} />;

function HomeScreen({ onScreenChange }) {
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.statusRow}>
        <Text style={styles.clockText}>21:38</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={14} color="#111" />
          <Ionicons name="wifi" size={15} color="#111" />
          <Ionicons name="battery-full" size={18} color="#111" />
        </View>
      </View>

      <View style={styles.greetingCard}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarFace}>😮</Text>
          </View>
        </View>

        <View style={styles.greetingTextWrap}>
          <Text style={styles.greetingName}>{schoolProfile.name}</Text>
          <Text style={styles.greetingMeta}>Jabatan : {schoolProfile.jabatan}</Text>
          <Text style={styles.greetingMeta}>Guru : {schoolProfile.guru}</Text>
          <Text style={styles.greetingMeta}>NIP : {schoolProfile.nip}</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <TextInput placeholder="Cari menu..." placeholderTextColor="#5f5f5f" editable={false} style={styles.searchInput} />
      </View>

      <View style={styles.summaryRow}>
        {summaryData.map((item) => (
          <View key={item.label} style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{item.label} :</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>MENU UTAMA</Text>

      <View style={styles.gridWrap}>
        {primaryMenu.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.9} onPress={() => onScreenChange(item.id)}>
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              {renderMenuIcon(item.icon, item.color, 32)}
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, styles.extraTitle]}>FITUR LAINNYA</Text>

      <View style={styles.gridWrapExtra}>
        {extraMenu.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.9} onPress={() => onScreenChange(item.id)}>
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              {renderMenuIcon(item.icon, item.color, 30)}
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function ScanScreen({ onScreenChange }) {
  return (
    <View style={styles.scanPage}>
      <View style={styles.scanHeader}>
        <Ionicons name="camera" size={24} color="#fff" />
        <Text style={styles.scanTitle}>Scan Pakai Kamera</Text>
      </View>

      <View style={styles.scanStatsRow}>
        <View style={styles.scanStatCard}>
          <Text style={styles.scanStatText}>Siswa</Text>
          <Text style={styles.scanStatNumber}>5 / 69</Text>
        </View>
        <View style={styles.scanStatCard}>
          <Text style={styles.scanStatText}>Pegawai</Text>
          <Text style={styles.scanStatNumber}>0 / 11</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.darkButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.darkButtonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>

      <View style={styles.historyPanel}>
        <Text style={styles.historyTitle}>Riwayat Hari Ini</Text>
        {scanStudents.map((student, index) => (
          <View key={`${student.name}-${index}`} style={styles.historyRow}>
            <Ionicons name="person-circle" size={44} color="#8ad7ff" />
            <View style={styles.historyInfo}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyName}>{student.name}</Text>
                <View style={styles.roleChip}>
                  <Text style={styles.roleText}>{student.status}</Text>
                </View>
              </View>
              <Text style={styles.historyScore}>{student.score}</Text>
              <Text style={styles.historyMeta}>Masuk: {student.time} | Pulang: --</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function ModuleScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>Modul Ajar</Text>
      </View>
      <ScrollView style={styles.scrollCard} contentContainerStyle={{ paddingBottom: 10 }}>
        {curriculumModules.map((item) => (
          <View key={item.subject} style={styles.moduleCard}>
            <Text style={styles.moduleSubject}>{item.subject}</Text>
            <Text style={styles.moduleTopic}>{item.topic}</Text>
            <Text style={styles.moduleMeta}>Target: {item.target}</Text>
            <Text style={styles.moduleMeta}>Durasi: {item.duration}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function CompetencyScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>Kompetensi Siswa</Text>
      </View>
      <ScrollView style={styles.scrollCard} contentContainerStyle={{ paddingBottom: 10 }}>
        {competencyItems.map((item) => (
          <View key={item.title} style={styles.moduleCard}>
            <Text style={styles.moduleSubject}>{item.title}</Text>
            <Text style={styles.moduleTopic}>{item.detail}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function WorksheetScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>LKS / Tugas Siswa</Text>
      </View>
      <ScrollView style={styles.scrollCard} contentContainerStyle={{ paddingBottom: 10 }}>
        {studentWorksheets.map((item) => (
          <View key={item.title} style={styles.moduleCard}>
            <Text style={styles.moduleSubject}>{item.title}</Text>
            <Text style={styles.moduleTopic}>{item.description}</Text>
            <Text style={styles.moduleMeta}>{item.level}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function TkaScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>Materi TKA</Text>
      </View>
      <ScrollView style={styles.scrollCard} contentContainerStyle={{ paddingBottom: 10 }}>
        {tkaPractice.map((item) => (
          <View key={item.title} style={styles.moduleCard}>
            <Text style={styles.moduleSubject}>{item.title}</Text>
            <Text style={styles.moduleTopic}>{item.detail}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function CurriculumScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>Kurikulum 2026</Text>
      </View>
      <ScrollView style={styles.scrollCard} contentContainerStyle={{ paddingBottom: 10 }}>
        {curriculumItems.map((item) => (
          <View key={item} style={styles.infoListItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.infoText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function GarudaScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>Aplikasi Garuda</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Aplikasi Garuda merupakan portal pendukung siswa dan guru untuk administrasi, evaluasi, dan kebutuhan pembelajaran digital sekolah.</Text>
        <Text style={styles.infoText}>• Integrasi aset digital sekolah</Text>
        <Text style={styles.infoText}>• Sinkronisasi data peserta didik dan guru</Text>
        <Text style={styles.infoText}>• Dokumentasi pembelajaran dan pelaporan</Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function WebsiteScreen({ onScreenChange }) {
  return (
    <View style={styles.infoPage}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>Website Sekolah</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Sumber informasi sekolah:</Text>
        <Text style={styles.websiteLink} onPress={() => Linking.openURL(SCHOOL_WEBSITE)}>{SCHOOL_WEBSITE}</Text>
        <Text style={styles.infoText}>Koneksi aktif melalui tautan resmi sekolah untuk berita, pengumuman, dan informasi akademik.</Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProfileScreen({ onScreenChange }) {
  return (
    <View style={styles.profilePage}>
      <Text style={styles.profilePageTitle}>Profil</Text>
      <View style={styles.profilePanel}>
        <Ionicons name="person-circle" size={82} color="#4c78ff" />
        <Text style={styles.profileNameLarge}>{schoolProfile.name}</Text>
        <Text style={styles.profileMetaLarge}>{schoolProfile.jabatan}</Text>
        <Text style={styles.profileMetaLarge}>{schoolProfile.guru}</Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onScreenChange('home')}>
        <Text style={styles.primaryButtonText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');

  const handleScreenChange = (nextScreen) => {
    if (nextScreen === 'website') {
      Linking.openURL(SCHOOL_WEBSITE);
      return;
    }

    if (nextScreen === 'modul') {
      setScreen('module');
      return;
    }

    if (nextScreen === 'kompetensi') {
      setScreen('kompetensi');
      return;
    }

    if (nextScreen === 'lks') {
      setScreen('worksheet');
      return;
    }

    if (nextScreen === 'tka') {
      setScreen('tka');
      return;
    }

    if (nextScreen === 'kurikulum') {
      setScreen('kurikulum');
      return;
    }

    if (nextScreen === 'garuda') {
      setScreen('garuda');
      return;
    }

    setScreen(nextScreen);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'scan':
        return <ScanScreen onScreenChange={handleScreenChange} />;
      case 'module':
        return <ModuleScreen onScreenChange={handleScreenChange} />;
      case 'kompetensi':
        return <CompetencyScreen onScreenChange={handleScreenChange} />;
      case 'worksheet':
        return <WorksheetScreen onScreenChange={handleScreenChange} />;
      case 'tka':
        return <TkaScreen onScreenChange={handleScreenChange} />;
      case 'kurikulum':
        return <CurriculumScreen onScreenChange={handleScreenChange} />;
      case 'garuda':
        return <GarudaScreen onScreenChange={handleScreenChange} />;
      case 'website':
        return <WebsiteScreen onScreenChange={handleScreenChange} />;
      case 'profile':
        return <ProfileScreen onScreenChange={handleScreenChange} />;
      default:
        return <HomeScreen onScreenChange={handleScreenChange} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef2f3" />
      <View style={styles.appWrap}>{renderScreen()}</View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
          <Ionicons name="home" size={30} color={screen === 'home' ? '#2d59ff' : '#7a7a7a'} />
          <Text style={[styles.navLabel, screen === 'home' && styles.navActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('profile')}>
          <Ionicons name="person" size={30} color={screen === 'profile' ? '#2d59ff' : '#7a7a7a'} />
          <Text style={[styles.navLabel, screen === 'profile' && styles.navActive]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => Linking.openURL(SCHOOL_WEBSITE)}>
          <Ionicons name="globe" size={30} color="#7a7a7a" />
          <Text style={styles.navLabel}>Website</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3',
  },
  appWrap: {
    flex: 1,
    backgroundColor: '#eef2f3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  clockText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greetingCard: {
    backgroundColor: '#5d6ef0',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrap: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 98,
    height: 98,
    borderRadius: 50,
    backgroundColor: '#f6d259',
    borderWidth: 4,
    borderColor: '#1c2143',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFace: {
    fontSize: 52,
  },
  greetingTextWrap: {
    flex: 1,
    paddingLeft: 8,
  },
  greetingName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  greetingMeta: {
    color: '#edf3ff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dfe4ec',
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  searchInput: {
    height: 58,
    fontSize: 18,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    minHeight: 110,
    backgroundColor: '#f2f2f2',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 35,
    fontWeight: '900',
    color: '#111',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111',
    marginTop: 10,
    marginBottom: 16,
  },
  extraTitle: {
    marginTop: 18,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    columnGap: 10,
  },
  gridWrapExtra: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
    columnGap: 10,
    marginBottom: 28,
  },
  menuItem: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconBox: {
    width: 92,
    height: 92,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#d0d8ef',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  menuLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    lineHeight: 18,
  },
  scanPage: {
    flex: 1,
    backgroundColor: '#eef2f3',
    paddingHorizontal: 14,
    paddingTop: 18,
  },
  scanHeader: {
    backgroundColor: '#4f5fe8',
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  scanTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginLeft: 8,
  },
  scanStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  scanStatCard: {
    backgroundColor: '#4f5fe8',
    width: '48%',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanStatText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  scanStatNumber: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 8,
  },
  darkButton: {
    backgroundColor: '#333d4a',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  darkButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  historyPanel: {
    backgroundColor: '#f2f2f2',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
  },
  historyTitle: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
    marginBottom: 12,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  historyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyName: {
    fontSize: 23,
    fontWeight: '900',
    color: '#111',
    maxWidth: '70%',
  },
  roleChip: {
    backgroundColor: '#4f5fe8',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  historyScore: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1d1d1d',
    marginTop: 4,
  },
  historyMeta: {
    color: '#2d2d2d',
    fontSize: 15,
    fontWeight: '600',
  },
  infoPage: {
    flex: 1,
    backgroundColor: '#eef2f3',
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  infoHeader: {
    backgroundColor: '#4f5fe8',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  infoText: {
    color: '#2d2d2d',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  websiteLink: {
    color: '#2d59ff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  profilePage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2f3',
    paddingHorizontal: 18,
  },
  profilePageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
    marginBottom: 18,
  },
  profilePanel: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  profileNameLarge: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    marginTop: 12,
    textAlign: 'center',
  },
  profileMetaLarge: {
    fontSize: 18,
    color: '#444',
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: '#2d59ff',
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 18,
  },
  navItem: {
    alignItems: 'center',
    minWidth: 90,
  },
  navLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7a7a7a',
    marginTop: 4,
  },
  navActive: {
    color: '#2d59ff',
  },
  scrollCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
  },
  moduleCard: {
    backgroundColor: '#f6f8ff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e4e9f7',
  },
  moduleSubject: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111',
    marginBottom: 6,
  },
  moduleTopic: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2d2d2d',
    marginBottom: 6,
  },
  moduleMeta: {
    fontSize: 14,
    color: '#4856d8',
    fontWeight: '700',
  },
  infoListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  bullet: {
    fontSize: 18,
    color: '#4f5fe8',
    marginRight: 8,
    fontWeight: '900',
  },
});






































































































































