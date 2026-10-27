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
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const topMenu = [
  { id: 'rdm', label: 'RDM', icon: 'laptop', bg: '#f3f5ff', color: '#2f5ae7', iconSet: 'FontAwesome5' },
  { id: 'absen', label: 'Absen', icon: 'clipboard-check', bg: '#f7f5ff', color: '#7a5ef5', iconSet: 'FontAwesome5' },
  { id: 'izin', label: 'Izin Pegawai', icon: 'user-check', bg: '#f4f4ff', color: '#ff9f43', iconSet: 'FontAwesome5' },
  { id: 'scan', label: 'Scan Siswa', icon: 'qrcode', bg: '#ecf8ff', color: '#ff5a5f', iconSet: 'FontAwesome5' },
  { id: 'kelas', label: 'Absensi Kelas', icon: 'desktop', bg: '#f3f5ff', color: '#2e86de', iconSet: 'FontAwesome5' },
  { id: 'jurnal', label: 'Jurnal', icon: 'book', bg: '#eff6ff', color: '#3d63ff', iconSet: 'FontAwesome5' },
  { id: 'nilai', label: 'Penilaian', icon: 'chart-bar', bg: '#f3fbff', color: '#1d9bf0', iconSet: 'FontAwesome5' },
  { id: 'siswa', label: 'Siswa', icon: 'users', bg: '#ecfff7', color: '#0d9488', iconSet: 'FontAwesome5' },
  { id: 'kelas2', label: 'Kelas', icon: 'school', bg: '#fff6ea', color: '#f59e0b', iconSet: 'FontAwesome5' },
  { id: 'materi', label: 'Materi', icon: 'folder', bg: '#f5f3ff', color: '#8b5cf6', iconSet: 'FontAwesome5' },
  { id: 'pengumuman', label: 'Pelanggaran Siswa', icon: 'exclamation-circle', bg: '#fff1f2', color: '#f43f5e', iconSet: 'FontAwesome5' },
  { id: 'report', label: 'Report', icon: 'clipboard-list', bg: '#f8fafc', color: '#14b8a6', iconSet: 'FontAwesome5' },
];

const extraMenu = [
  { id: 'jurnalGuru', label: 'Jurnal Guru Wali', icon: 'book-reader', bg: '#f5f3ff', color: '#7f57d6', iconSet: 'FontAwesome5' },
  { id: 'modul', label: 'Modul Pembelajaran', icon: 'file-alt', bg: '#f7f0ff', color: '#9b6ef7', iconSet: 'FontAwesome5' },
  { id: 'nilai7', label: 'Jurnal 7 KAIH', icon: 'journal-whills', bg: '#edf6ff', color: '#4f8df8', iconSet: 'FontAwesome5' },
  { id: 'struktur', label: 'Struktur Kelas', icon: 'sitemap', bg: '#eefaf0', color: '#2fbf71', iconSet: 'FontAwesome5' },
  { id: 'jadwal', label: 'Jadwal Piket', icon: 'calendar-alt', bg: '#fff4df', color: '#f59e0b', iconSet: 'FontAwesome5' },
  { id: 'english', label: 'English Translator', icon: 'language', bg: '#eaf4ff', color: '#3b82f6', iconSet: 'FontAwesome5' },
  { id: 'ujian', label: 'Ujian Online', icon: 'file-signature', bg: '#fff5d6', color: '#d97706', iconSet: 'FontAwesome5' },
  { id: 'izinPegawai', label: 'Izin Pegawai', icon: 'user-check', bg: '#f2fffb', color: '#209f8d', iconSet: 'FontAwesome5' },
  { id: 'scanKamera', label: 'Scan Pakai Kamera', icon: 'camera', bg: '#f0f0f0', color: '#1f2958', iconSet: 'FontAwesome5' },
  { id: 'kartu', label: 'Kartu Siswa', icon: 'id-card', bg: '#f5f5f5', color: '#4b5563', iconSet: 'FontAwesome5' },
];

const summaryData = [
  { label: 'Jumlah Siswa', value: '7', width: '48%' },
  { label: 'Jumlah Kelas', value: '2', width: '48%' },
];

const scanStudents = [
  { name: 'ANASTASYA PUTRI', status: 'Siswa', time: '09:11:28', score: 9 },
  { name: 'AMIRA', status: 'Siswa', time: '09:08:35', score: 9 },
  { name: 'MUH.AKBAR', status: 'Siswa', time: '09:03:46', score: 8 },
  { name: 'BESSE HASNIAH', status: 'Siswa', time: '08:55:20', score: 9 },
  { name: 'ANDI MUSFIRAWATI F', status: 'Siswa', time: '08:48:44', score: 9 },
];

function IconRenderer({ iconSet, icon, color, size = 28 }) {
  if (iconSet === 'FontAwesome5') {
    return <FontAwesome5 name={icon} size={size} color={color} />;
  }

  if (iconSet === 'Ionicons') {
    return <Ionicons name={icon} size={size} color={color} />;
  }

  return <MaterialIcons name={icon} size={size} color={color} />;
}

function HomeScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.topHeaderShell}>
        <View style={styles.statusBarRow}>
          <Text style={styles.clockText}>3:10</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={14} color="#111" />
            <Ionicons name="wifi" size={15} color="#111" />
            <Ionicons name="battery-full" size={18} color="#111" />
          </View>
        </View>

        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarFace}>
              <Text style={styles.avatarEmoji}>😮</Text>
            </View>
          </View>

          <View style={styles.profileTextWrap}>
            <Text style={styles.profileName}>Bopo Priyanto, S.Si</Text>
            <Text style={styles.profileLabel}>Jabatan : Guru / Wali Kelas 1</Text>
            <Text style={styles.profileLabel}>Guru : Informatika</Text>
            <Text style={styles.profileLabel}>NIP : 19930601 2019032019</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Cari menu..."
            editable={false}
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.summaryRow}>
          {summaryData.map((item) => (
            <View key={item.label} style={[styles.summaryCard, { width: item.width }]}>
              <Text style={styles.summaryLabel}>{item.label} :</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionHeaderWrap}>
        <Text style={styles.sectionTitle}>MENU UTAMA</Text>
      </View>

      <View style={styles.gridWrap}>
        {topMenu.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.9}
            onPress={() => onNavigate(item.id === 'scan' ? 'scan' : item.id === 'kelas' ? 'history' : 'home')}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <IconRenderer iconSet={item.iconSet} icon={item.icon} color={item.color} size={34} />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeaderWrapExtra}>
        <Text style={styles.sectionTitleExtra}>FITUR LAINNYA</Text>
      </View>

      <View style={styles.gridWrapExtra}>
        {extraMenu.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.9}
            onPress={() => onNavigate(item.id === 'scanKamera' ? 'scan' : 'home')}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <IconRenderer iconSet={item.iconSet} icon={item.icon} color={item.color} size={32} />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function ScanScreen({ onNavigate }) {
  return (
    <View style={styles.scanPage}>
      <View style={styles.scanHeader}>
        <Ionicons name="camera" size={26} color="#fff" />
        <Text style={styles.scanHeaderText}>Scan Pakai Kamera</Text>
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

      <TouchableOpacity style={styles.backDarkButton} onPress={() => onNavigate('home')}>
        <Text style={styles.backDarkText}>Kembali ke Beranda</Text>
      </TouchableOpacity>

      <View style={styles.historyBlock}>
        <Text style={styles.historyTitle}>Riwayat Hari Ini</Text>

        {scanStudents.map((student, index) => (
          <View key={`${student.name}-${index}`} style={styles.historyRow}>
            <View style={styles.personCircle}>
              <Ionicons name="person-circle" size={46} color="#87d1ff" />
            </View>

            <View style={styles.historyInfo}>
              <View style={styles.historyNameRow}>
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

function HistoryScreen({ onNavigate }) {
  return (
    <View style={styles.kartuPage}>
      <View style={styles.kartuHeaderBar}>
        <View style={styles.kartuHeaderButtonLeft}>
          <Ionicons name="document-text" size={18} color="#2a2a2a" />
          <Text style={styles.kartuButtonText}>Cetak Kartu Siswa</Text>
        </View>
        <View style={styles.kartuHeaderButtonRight}>
          <Ionicons name="checkmark-circle" size={18} color="#fff" />
          <Text style={styles.kartuButtonTextRight}>Cetak Sekarang</Text>
        </View>
      </View>

      <View style={styles.cardListPreview}>
        {[1, 2, 3, 4].map((card) => (
          <View key={card} style={styles.studentCardPreview}>
            <View style={styles.studentCardLeft}>
              <Text style={styles.cardLabel}>SMP N 1 SALATIGA</Text>
              <Text style={styles.cardName}>KARTU DIGITAL SISWA</Text>
              <Text style={styles.cardMeta}>Nama: {card > 1 ? 'SISWA' : 'SISWA TEST'}</Text>
            </View>
            <View style={styles.cardQrBox}>
              <View style={styles.qrMini} />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.bottomBackButton} onPress={() => onNavigate('home')}>
        <Ionicons name="arrow-back" size={20} color="#111" />
      </TouchableOpacity>
    </View>
  );
}

function ProfileScreen({ onNavigate }) {
  return (
    <View style={styles.profilePage}>
      <Text style={styles.profilePageTitle}>Profil</Text>
      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={80} color="#4c78ff" />
        <Text style={styles.profilePageName}>Bopo Priyanto, S.Si</Text>
        <Text style={styles.profilePageInfo}>Guru / Wali Kelas 1</Text>
        <Text style={styles.profilePageInfo}>Informatika</Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => onNavigate('home')}>
        <Text style={styles.primaryButtonText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    switch (screen) {
      case 'scan':
        return <ScanScreen onNavigate={setScreen} />;
      case 'history':
        return <HistoryScreen onNavigate={setScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setScreen} />;
      default:
        return <HomeScreen onNavigate={setScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef2f3" />
      <View style={styles.appFrame}>{renderScreen()}</View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
          <Ionicons name="home" size={28} color={screen === 'home' ? '#2d59ff' : '#7a7a7a'} />
          <Text style={[styles.navLabel, screen === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('profile')}>
          <Ionicons name="person" size={28} color={screen === 'profile' ? '#2d59ff' : '#7a7a7a'} />
          <Text style={[styles.navLabel, screen === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
          <Ionicons name="log-out" size={28} color="#7a7a7a" />
          <Text style={styles.navLabel}>Logout</Text>
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
  appFrame: {
    flex: 1,
    backgroundColor: '#eef2f3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  topHeaderShell: {
    backgroundColor: '#eef2f3',
    paddingTop: 12,
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
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
  profileHeaderCard: {
    backgroundColor: '#5d6ef0',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarWrap: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  avatarFace: {
    width: 100,
    height: 100,
    backgroundColor: '#f7d438',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#1c1f3b',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 52,
    marginTop: 8,
  },
  profileTextWrap: {
    flex: 1,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
  },
  profileLabel: {
    fontSize: 16,
    color: '#f0f4ff',
    fontWeight: '600',
    marginBottom: 2,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingHorizontal: 18,
    marginTop: 2,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    height: 54,
    fontSize: 18,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 98,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 1,
  },
  summaryLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111',
  },
  sectionHeaderWrap: {
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 0.4,
  },
  sectionHeaderWrapExtra: {
    marginTop: 14,
    marginBottom: 12,
  },
  sectionTitleExtra: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 0.5,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  gridWrapExtra: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    marginBottom: 22,
  },
  menuItem: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#cfd6e6',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  menuText: {
    fontSize: 14,
    color: '#111',
    fontWeight: '700',
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
    backgroundColor: '#4d5de7',
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  scanHeaderText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginLeft: 10,
  },
  scanStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  scanStatCard: {
    backgroundColor: '#4d5de7',
    width: '48%',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanStatText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  scanStatNumber: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 6,
  },
  backDarkButton: {
    backgroundColor: '#333d4a',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  backDarkText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  historyBlock: {
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    padding: 14,
  },
  historyTitle: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
    color: '#111',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
  },
  personCircle: {
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
  },
  roleChip: {
    backgroundColor: '#4d5de7',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  historyScore: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1b1b1b',
    marginTop: 4,
    marginBottom: 2,
  },
  historyMeta: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  kartuPage: {
    flex: 1,
    backgroundColor: '#eef2f3',
    paddingHorizontal: 14,
    paddingTop: 18,
  },
  kartuHeaderBar: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  kartuHeaderButtonLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#eaeaf0',
    borderRadius: 14,
    paddingVertical: 16,
  },
  kartuHeaderButtonRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2ecf68',
    borderRadius: 14,
    paddingVertical: 16,
  },
  kartuButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '700',
  },
  kartuButtonTextRight: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardListPreview: {
    gap: 12,
  },
  studentCardPreview: {
    backgroundColor: '#f7f7f7',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe3eb',
  },
  studentCardLeft: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d2d75',
  },
  cardName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginTop: 6,
  },
  cardMeta: {
    fontSize: 13,
    color: '#333',
    marginTop: 4,
  },
  cardQrBox: {
    width: 94,
    height: 94,
    backgroundColor: '#dfe5f7',
    borderRadius: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#bfd0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrMini: {
    width: 64,
    height: 64,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    opacity: 0.2,
  },
  bottomBackButton: {
    position: 'absolute',
    right: 18,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  profilePage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2f3',
    paddingHorizontal: 20,
  },
  profilePageTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111',
    marginBottom: 20,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  profilePageName: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 12,
    color: '#111',
  },
  profilePageInfo: {
    fontSize: 18,
    color: '#3e3e3e',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2d59ff',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
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
    backgroundColor: '#f7f7f7',
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    paddingTop: 12,
    paddingBottom: 18,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  navLabel: {
    marginTop: 4,
    fontSize: 15,
    color: '#7a7a7a',
    fontWeight: '700',
  },
  navLabelActive: {
    color: '#2d59ff',
  },
});
