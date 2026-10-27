import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

const menuItems = [
  { id: 'rdm', label: 'RDM', icon: '📘', color: '#2f7af6' },
  { id: 'absen', label: 'Absen', icon: '📝', color: '#f4b942' },
  { id: 'izin', label: 'Izin Pegawai', icon: '✅', color: '#7e57c2' },
  { id: 'scan', label: 'Scan Siswa', icon: '📷', color: '#e74a5a' },
  { id: 'absen-kelas', label: 'Absensi Kelas', icon: '💻', color: '#3da1ff' },
  { id: 'jurnal', label: 'Jurnal', icon: '📚', color: '#71a8ff' },
  { id: 'penilaian', label: 'Penilaian', icon: '📊', color: '#49a5ff' },
  { id: 'siswa', label: 'Siswa', icon: '👥', color: '#46c7a7' },
  { id: 'kelas', label: 'Kelas', icon: '🏫', color: '#f39f1d' },
  { id: 'pelanggaran', label: 'Pelanggaran Siswa', icon: '⚠️', color: '#f77e3b' },
  { id: 'report', label: 'Report', icon: '📋', color: '#2ec4b6' },
  { id: 'materi', label: 'Materi', icon: '☁️', color: '#9b59b6' },
];

const secondaryMenu = [
  { id: 'jurnal-guru', label: 'Jurnal Guru', icon: '👨‍🏫', color: '#f39f1d' },
  { id: 'modul', label: 'Modul Pembelajaran', icon: '📘', color: '#ff9f1c' },
  { id: 'jur-nal', label: 'Jurnal 7 KAIH', icon: '📖', color: '#5d9cec' },
  { id: 'struktur', label: 'Struktur Kelas', icon: '👥', color: '#6c63ff' },
  { id: 'jadwal', label: 'Jadwal Piket', icon: '🗓️', color: '#e76f51' },
  { id: 'english', label: 'English Translator', icon: 'A-Z', color: '#ff8fab' },
  { id: 'ujian', label: 'Ujian Online', icon: '📝', color: '#5ecb8b' },
  { id: 'izin-pgw', label: 'Izin Pegawai', icon: '✅', color: '#6a6ae8' },
  { id: 'phone', label: 'Scan Pakai Kamera', icon: '📱', color: '#d45d79' },
  { id: 'tugas', label: 'LKS', icon: '📄', color: '#fca311' },
];

const studentHistory = [
  { name: 'ANASTASYA PUTRI', value: 9, type: 'Siswa', time: '09:11:28', status: 'Masuk' },
  { name: 'AMIRA', value: 9, type: 'Siswa', time: '09:08:35', status: 'Masuk' },
  { name: 'MUH.AKBAR', value: 8, type: 'Siswa', time: '09:03:46', status: 'Masuk' },
  { name: 'BESSE HASNIAH', value: 9, type: 'Siswa', time: '08:55:20', status: 'Masuk' },
  { name: 'ANDI MUSFIRAWATI F', value: 9, type: 'Siswa', time: '08:48:44', status: 'Masuk' },
];

const moduleData = {
  home: {
    title: 'Menu Utama',
    items: menuItems,
  },
  lain: {
    title: 'Fitur Lainnya',
    items: secondaryMenu,
  },
};

function App() {
  const [selectedTab, setSelectedTab] = useState('home');
  const [query, setQuery] = useState('');

  const filteredMenu = useMemo(() => {
    const source = selectedTab === 'home' ? menuItems : secondaryMenu;
    if (!query.trim()) return source;
    return source.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, selectedTab]);

  const renderHeader = () => (
    <View style={styles.statusBarWrap}>
      <Text style={styles.timeText}>21:38</Text>
      <View style={styles.statusIcons}>
        <Text>📶</Text>
        <Text>📡</Text>
        <Text>🔋</Text>
      </View>
    </View>
  );

  const renderProfileCard = () => (
    <View style={styles.profileCard}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarFace}>
          <Text style={styles.avatarText}>◉</Text>
        </View>
      </View>

      <View style={styles.profileTextWrap}>
        <Text style={styles.nameText}>Bopo Priyanto, S.Si</Text>
        <Text style={styles.metaText}>Jabatan : Guru / Wali Kelas 1</Text>
        <Text style={styles.metaText}>Guru : Informatika</Text>
        <Text style={styles.metaText}>NIP : 19930601 2019032019</Text>
      </View>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summaryRow}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Jumlah Siswa :</Text>
        <Text style={styles.summaryValue}>1</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Jumlah Kelas :</Text>
        <Text style={styles.summaryValue}>1</Text>
      </View>
    </View>
  );

  const renderMenuGrid = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{moduleData[selectedTab].title}</Text>
      <View style={styles.gridWrap}>
        {filteredMenu.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItemCard} activeOpacity={0.9}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => setSelectedTab('home')}>
        <Text style={selectedTab === 'home' ? styles.navIconActive : styles.navIcon}>🏠</Text>
        <Text style={selectedTab === 'home' ? styles.navLabelActive : styles.navLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => setSelectedTab('lain')}>
        <Text style={selectedTab === 'lain' ? styles.navIconActive : styles.navIcon}>👤</Text>
        <Text style={selectedTab === 'lain' ? styles.navLabelActive : styles.navLabel}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <Text style={styles.navIcon}>↩️</Text>
        <Text style={styles.navLabel}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDetailScreen = () => (
    <View style={styles.detailScreen}>
      <View style={styles.topBanner}>
        <Text style={styles.bannerText}>📷 Scan Pakai Kamera</Text>
      </View>

      <View style={styles.scanStatsRow}>
        <View style={styles.scanStatBox}>
          <Text style={styles.scanStatText}>Siswa</Text>
          <Text style={styles.scanStatValue}>5 / 69</Text>
        </View>
        <View style={styles.scanStatBox}>
          <Text style={styles.scanStatText}>Pegawai</Text>
          <Text style={styles.scanStatValue}>0 / 11</Text>
        </View>
      </View>

      <View style={styles.backButtonWrap}>
        <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Riwayat Hari Ini</Text>
        {studentHistory.map((item, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyAvatar}>◉</View>
            <View style={styles.historyBody}>
              <Text style={styles.historyName}>{item.name}</Text>
              <Text style={styles.historyValue}>{item.value}</Text>
              <Text style={styles.historyMeta}>Masuk: {item.time} | Pulang: --</Text>
            </View>
            <View style={styles.roleBadge}><Text style={styles.roleText}>{item.type}</Text></View>
          </View>
        ))}
      </View>

      <View style={styles.mobileFooter}>
        <Text style={styles.footerLine} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#dfe7e7" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {renderHeader()}

        <View style={styles.searchWrap}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari menu..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        {renderProfileCard()}
        {renderSummary()}
        {renderMenuGrid()}

        <View style={styles.marginBottom} />
      </ScrollView>

      {renderBottomNav()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7ecec',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#e7ecec',
  },
  statusBarWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 12 : 10,
    paddingBottom: 8,
    backgroundColor: '#edf2f2',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  searchWrap: {
    paddingHorizontal: 18,
    marginTop: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#d7dfe2',
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 18,
    color: '#111',
  },
  profileCard: {
    marginHorizontal: 18,
    marginTop: 16,
    backgroundColor: '#5d79d8',
    borderRadius: 32,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#efc84f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  avatarFace: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f6d982',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#3e3f47',
  },
  avatarText: {
    fontSize: 32,
    color: '#111',
  },
  profileTextWrap: {
    flex: 1,
  },
  nameText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8f9ff',
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 18,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f3f2f2',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dfe2e5',
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1c1c',
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1c1c1c',
  },
  sectionWrap: {
    marginTop: 20,
    marginHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuItemCard: {
    width: '30%',
    minWidth: 90,
    marginBottom: 18,
    alignItems: 'center',
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconText: {
    fontSize: 36,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#202020',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f3f6f6',
    borderTopWidth: 1,
    borderTopColor: '#d7dfe2',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 34,
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 34,
    marginBottom: 4,
    color: '#1d4ed8',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3d3d3d',
  },
  navLabelActive: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  marginBottom: {
    height: 40,
  },
  detailScreen: {
    paddingHorizontal: 18,
    paddingTop: 10,
    backgroundColor: '#e5e6e7',
  },
  topBanner: {
    backgroundColor: '#5a52cc',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  scanStatsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  scanStatBox: {
    flex: 1,
    backgroundColor: '#5a52cc',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanStatText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  scanStatValue: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  backButtonWrap: {
    backgroundColor: '#343a40',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 18,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  historyContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    padding: 12,
  },
  historyTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#8ad0ff',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 26,
    marginRight: 12,
  },
  historyBody: {
    flex: 1,
  },
  historyName: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  historyValue: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  historyMeta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  roleBadge: {
    backgroundColor: '#5a52cc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 10,
  },
  roleText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  mobileFooter: {
    alignItems: 'center',
    marginTop: 18,
    paddingBottom: 18,
  },
  footerLine: {
    width: 90,
    height: 5,
    borderRadius: 99,
    backgroundColor: '#1d1d1d',
  },
});

export default App;
