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
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const topMenu = [
  { id: 'rdm', label: 'RDM', icon: 'laptop', bg: '#f3f6ff', color: '#e04b45', iconSet: 'FontAwesome5' },
  { id: 'absen', label: 'Absen', icon: 'clipboard-check', bg: '#f7f6ff', color: '#7a5ef5', iconSet: 'FontAwesome5' },
  { id: 'izin', label: 'Izin Pegawai', icon: 'user-check', bg: '#f2f2ff', color: '#f39c12', iconSet: 'FontAwesome5' },
  { id: 'scan', label: 'Scan Siswa', icon: 'qrcode', bg: '#ecfbff', color: '#ec5d5b', iconSet: 'FontAwesome5' },
  { id: 'absenKelas', label: 'Absensi Kelas', icon: 'desktop', bg: '#ebf6ff', color: '#2d9cdb', iconSet: 'FontAwesome5' },
  { id: 'jurnal', label: 'Jurnal', icon: 'book', bg: '#eef7ff', color: '#3f6ef5', iconSet: 'FontAwesome5' },
  { id: 'penilaian', label: 'Penilaian', icon: 'chart-bar', bg: '#edf9ff', color: '#1b9ad8', iconSet: 'FontAwesome5' },
  { id: 'siswa', label: 'Siswa', icon: 'users', bg: '#eefff8', color: '#1ab386', iconSet: 'FontAwesome5' },
  { id: 'kelas', label: 'Kelas', icon: 'school', bg: '#fff7eb', color: '#f5a623', iconSet: 'FontAwesome5' },
  { id: 'materi', label: 'Materi', icon: 'folder', bg: '#f8f3ff', color: '#8d5ef4', iconSet: 'FontAwesome5' },
  { id: 'pelanggaran', label: 'Pelanggaran Siswa', icon: 'exclamation-circle', bg: '#fff1f2', color: '#e94b5d', iconSet: 'FontAwesome5' },
  { id: 'report', label: 'Report', icon: 'clipboard-list', bg: '#f0fbff', color: '#2bb8a7', iconSet: 'FontAwesome5' },
];

const extraMenu = [
  { id: 'jurnalGuru', label: 'Jurnal Guru Wali', icon: 'book-reader', bg: '#f9f4ff', color: '#a66de4', iconSet: 'FontAwesome5' },
  { id: 'modul', label: 'Modul Pembelajaran', icon: 'file-alt', bg: '#f8f0ff', color: '#8d6ae6', iconSet: 'FontAwesome5' },
  { id: 'kaih', label: 'Jurnal 7 KAIH', icon: 'journal-whills', bg: '#eef6ff', color: '#4b7ded', iconSet: 'FontAwesome5' },
  { id: 'struktur', label: 'Struktur Kelas', icon: 'sitemap', bg: '#f0faf5', color: '#26b26f', iconSet: 'FontAwesome5' },
  { id: 'jadwal', label: 'Jadwal Piket', icon: 'calendar-alt', bg: '#fff7e6', color: '#f49d20', iconSet: 'FontAwesome5' },
  { id: 'translate', label: 'English Translator', icon: 'language', bg: '#ecf2ff', color: '#5d79f6', iconSet: 'FontAwesome5' },
  { id: 'ujian', label: 'Ujian Online', icon: 'file-signature', bg: '#fff6d9', color: '#f0b41d', iconSet: 'FontAwesome5' },
  { id: 'izinPegawai', label: 'Izin Pegawai', icon: 'user-check', bg: '#effefb', color: '#1aa78d', iconSet: 'FontAwesome5' },
  { id: 'scanKamera', label: 'Scan Pakai Kamera', icon: 'camera', bg: '#eceff8', color: '#4d5de7', iconSet: 'FontAwesome5' },
  { id: 'kartu', label: 'Kartu Siswa', icon: 'id-card', bg: '#f3f5f8', color: '#4d667a', iconSet: 'FontAwesome5' },
];

const summaryData = [
  { label: 'Jumlah Siswa', value: '7' },
  { label: 'Jumlah Kelas', value: '2' },
];

const scanStudents = [
  { name: 'ANASTASYA PUTRI', status: 'Siswa', time: '09:11:28', score: 9 },
  { name: 'AMIRA', status: 'Siswa', time: '09:08:35', score: 9 },
  { name: 'MUH.AKBAR', status: 'Siswa', time: '09:03:46', score: 8 },
  { name: 'BESSE HASNIAH', status: 'Siswa', time: '08:55:20', score: 9 },
  { name: 'ANDI MUSFIRAWATI F', status: 'Siswa', time: '08:48:44', score: 9 },
];

function IconRenderer({ iconSet, icon, color, size = 28 }) {
  return iconSet === 'FontAwesome5' ? (
    <FontAwesome5 name={icon} size={size} color={color} />
  ) : (
    <Ionicons name={icon} size={size} color={color} />
  );
}

function HomeScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <Text style={styles.clock}>3:10</Text>
        <View style={styles.trayIcons}>
          <Ionicons name="cellular" size={14} color="#111" />
          <Ionicons name="wifi" size={15} color="#111" />
          <Ionicons name="battery-full" size={18} color="#111" />
        </View>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarFace}>
            <Text style={styles.avatarEmoji}>😮</Text>
          </View>
        </View>

        <View style={styles.profileText}>
          <Text style={styles.name}>Bopo Priyanto, S.Si</Text>
          <Text style={styles.meta}>Jabatan : Guru / Wali Kelas 1</Text>
          <Text style={styles.meta}>Guru : Informatika</Text>
          <Text style={styles.meta}>NIP : 19930601 2019032019</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Cari menu..."
          placeholderTextColor="#717171"
          editable={false}
          style={styles.searchInput}
        />
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
        {topMenu.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.9}
            onPress={() => onNavigate(item.id === 'scan' ? 'scan' : 'home')}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <IconRenderer iconSet={item.iconSet} icon={item.icon} color={item.color} size={34} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, styles.sectionTitleExtra]}>FITUR LAINNYA</Text>

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
            <Text style={styles.menuLabel}>{item.label}</Text>
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

      <TouchableOpacity style={styles.darkButton} onPress={() => onNavigate('home')}>
        <Text style={styles.darkButtonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>

      <View style={styles.historyPanel}>
        <Text style={styles.historyTitle}>Riwayat Hari Ini</Text>

        {scanStudents.map((student, index) => (
          <View key={`${student.name}-${index}`} style={styles.historyRow}>
            <View style={styles.personCircle}>
              <Ionicons name="person-circle" size={44} color="#8ed6ff" />
            </View>

            <View style={styles.historyInfo}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyName}>{student.name}</Text>
                <View style={styles.roleChip}>
                  <Text style={styles.roleText}>{student.status}</Text>
                </View>
              </View>
              <Text style={styles.score}>{student.score}</Text>
              <Text style={styles.metaText}>Masuk: {student.time} | Pulang: --</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function ProfileScreen({ onNavigate }) {
  return (
    <View style={styles.profilePage}>
      <Text style={styles.profilePageTitle}>Profil</Text>
      <View style={styles.profilePanel}>
        <Ionicons name="person-circle" size={85} color="#4c78ff" />
        <Text style={styles.profileNameLarge}>Bopo Priyanto, S.Si</Text>
        <Text style={styles.profileMetaLarge}>Guru / Wali Kelas 1</Text>
        <Text style={styles.profileMetaLarge}>Informatika</Text>
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
      case 'profile':
        return <ProfileScreen onNavigate={setScreen} />;
      default:
        return <HomeScreen onNavigate={setScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef2f3" />
      <View style={styles.appWrap}>{renderScreen()}</View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
          <Ionicons name="home" size={30} color={screen === 'home' ? '#2d59ff' : '#717171'} />
          <Text style={[styles.navLabel, screen === 'home' && styles.navActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('profile')}>
          <Ionicons name="person" size={30} color={screen === 'profile' ? '#2d59ff' : '#717171'} />
          <Text style={[styles.navLabel, screen === 'profile' && styles.navActive]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
          <Ionicons name="log-out" size={30} color="#717171" />
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
  appWrap: {
    flex: 1,
    backgroundColor: '#eef2f3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  clock: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  trayIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileCard: {
    backgroundColor: '#4d5de7',
    borderRadius: 22,
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
  avatarFace: {
    width: 100,
    height: 100,
    backgroundColor: '#f6d257',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#1f2340',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 52,
    marginTop: 4,
  },
  profileText: {
    flex: 1,
    paddingLeft: 8,
  },
  name: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '900',
    marginBottom: 6,
  },
  meta: {
    color: '#edf2ff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  searchBox: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dfe4ea',
    paddingHorizontal: 18,
    marginBottom: 16,
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
    marginBottom: 18,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    minHeight: 110,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontSize: 20,
    color: '#111',
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 35,
    color: '#111',
    fontWeight: '900',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111',
    marginTop: 12,
    marginBottom: 16,
  },
  sectionTitleExtra: {
    marginTop: 16,
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
    marginBottom: 24,
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
    shadowColor: '#d5d9e7',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
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
    backgroundColor: '#4d5de7',
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
    backgroundColor: '#4d5de7',
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
    backgroundColor: '#f1f1f1',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 6,
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
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  personCircle: {
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyName: {
    fontSize: 23,
    fontWeight: '900',
    color: '#111',
    maxWidth: '70%',
  },
  roleChip: {
    backgroundColor: '#4d5de7',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  score: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e1e1e',
    marginTop: 4,
  },
  metaText: {
    color: '#2b2b2b',
    fontSize: 15,
    fontWeight: '600',
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
    paddingHorizontal: 20,
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
    borderTopColor: '#d7d7d7',
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
    color: '#717171',
    fontWeight: '700',
    marginTop: 4,
  },
  navActive: {
    color: '#2d59ff',
  },
});

"}]} ivoq to=functions.push_files  <>