import React, { useMemo, useState, useRef, useEffect } from 'react';
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
  Animated,
  Easing,
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
  { id: 'kompetisi', label: 'Kompetisi', icon: '🏆', color: '#ff9f1c' },
  { id: 'report', label: 'Report', icon: '📋', color: '#2ec4b6' },
  { id: 'materi', label: 'Materi', icon: '☁️', color: '#9b59b6' },
];

const quickAccessItems = [
  { id: 'siswa', label: 'Siswa', icon: '👥', color: '#46c7a7' },
  { id: 'guru', label: 'Guru', icon: '👨‍🏫', color: '#5d79d8' },
  { id: 'kompetisi', label: 'Kompetisi', icon: '🏆', color: '#ff9f1c' },
  { id: 'kelas', label: 'Kelas', icon: '🏫', color: '#f39f1d' },
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

const schoolProfiles = [
  {
    id: 'smpn1-salatiga',
    name: 'SMP Negeri 1 Salatiga',
    city: 'Salatiga',
    accreditation: 'Akreditasi A',
    principal: 'Drs. Suyoto, M.Pd.',
    studentCount: 360,
    teacherCount: 32,
    classCount: 12,
  },
  {
    id: 'smpn2-salatiga',
    name: 'SMP Negeri 2 Salatiga',
    city: 'Salatiga',
    accreditation: 'Akreditasi A',
    principal: 'Dra. Susanti, M.Pd.',
    studentCount: 420,
    teacherCount: 36,
    classCount: 14,
  },
  {
    id: 'smpn3-salatiga',
    name: 'SMP Negeri 3 Salatiga',
    city: 'Salatiga',
    accreditation: 'Akreditasi A',
    principal: 'H. Budi Santoso, M.Pd.',
    studentCount: 390,
    teacherCount: 34,
    classCount: 13,
  },
];

const competitionPrograms = [
  { id: 'olimpiade', title: 'Olimpiade Sains', type: 'Nasional', period: '2026', participants: 64, color: '#ff9f1c' },
  { id: 'futsal', title: 'Festival Olahraga', type: 'Kabupaten', period: '2026', participants: 48, color: '#2f7af6' },
  { id: 'seni', title: 'Lomba Seni dan Budaya', type: 'Regional', period: '2026', participants: 52, color: '#7e57c2' },
  { id: 'bahasa', title: 'English Debate', type: 'Provinsi', period: '2026', participants: 30, color: '#2ec4b6' },
];

const studentHistory = [
  { name: 'ANASTASYA PUTRI', value: 9, type: 'Siswa', time: '09:11:28', status: 'Masuk' },
  { name: 'AMIRA', value: 9, type: 'Siswa', time: '09:08:35', status: 'Masuk' },
  { name: 'MUH.AKBAR', value: 8, type: 'Siswa', time: '09:03:46', status: 'Masuk' },
  { name: 'BESSE HASNIAH', value: 9, type: 'Siswa', time: '08:55:20', status: 'Masuk' },
  { name: 'ANDI MUSFIRAWATI F', value: 9, type: 'Siswa', time: '08:48:44', status: 'Masuk' },
];

const principal2026 = [
  {
    name: 'Drs. Suyoto, M.Pd.',
    position: 'Kepala Sekolah',
    unit: 'SMP Negeri 1 Salatiga',
    nip: '19661212 199103 1 011',
  },
];

const teachers2026 = [
  { name: 'Bopo Priyanto, S.Si', role: 'Guru Informatika', kelas: 'Wali Kelas VII-A', nip: '19930601 201903 2 019' },
  { name: 'Dewi Kusumaningtyas, S.Pd.', role: 'Guru Bahasa Indonesia', kelas: 'Wali Kelas VII-B', nip: '19880815 201903 2 020' },
  { name: 'Rinawati, S.Pd.', role: 'Guru Matematika', kelas: 'Wali Kelas VII-C', nip: '19891210 202001 2 004' },
  { name: 'Agus Setyawan, S.Pd.', role: 'Guru IPA', kelas: 'Wali Kelas VIII-A', nip: '19870518 201903 1 011' },
  { name: 'Siti Aisyah, S.Pd.', role: 'Guru IPS', kelas: 'Wali Kelas VIII-B', nip: '19900512 202001 2 015' },
  { name: 'Andi Prihantoro, S.Pd.', role: 'Guru Pendidikan Pancasila', kelas: 'Wali Kelas VIII-C', nip: '19890924 201903 1 018' },
  { name: 'Rina Oktaviana, S.Pd.', role: 'Guru Bahasa Inggris', kelas: 'Wali Kelas IX-A', nip: '19910321 202001 2 021' },
  { name: 'Fajar Nugroho, S.Pd.', role: 'Guru PJOK', kelas: 'Wali Kelas IX-B', nip: '19881109 201903 1 014' },
  { name: 'Hesti Wulandari, S.Pd.', role: 'Guru Seni Budaya', kelas: 'Wali Kelas IX-C', nip: '19920405 202001 2 026' },
  { name: 'Eko Susilo, S.Pd.', role: 'Guru TIK', kelas: 'Wali Kelas VII-D', nip: '19870312 201903 1 006' },
  { name: 'Maya Lestari, S.Pd.', role: 'Guru BK', kelas: 'Wali Kelas VIII-D', nip: '19900119 202001 2 032' },
  { name: 'Yogi Pratama, S.Pd.', role: 'Guru Agama', kelas: 'Wali Kelas IX-D', nip: '19851228 201903 1 009' },
];

const students2026 = [
  { name: 'ANASTASYA PUTRI', kelas: 'VII-A', nisn: '20260001', status: 'Aktif' },
  { name: 'AMIRA', kelas: 'VII-A', nisn: '20260002', status: 'Aktif' },
  { name: 'MUH. AKBAR', kelas: 'VII-A', nisn: '20260003', status: 'Aktif' },
  { name: 'BESSE HASNIAH', kelas: 'VII-A', nisn: '20260004', status: 'Aktif' },
  { name: 'ANDI MUSFIRAWATI F', kelas: 'VII-A', nisn: '20260005', status: 'Aktif' },
  { name: 'ADELIA NURSEPTI', kelas: 'VII-B', nisn: '20260006', status: 'Aktif' },
  { name: 'AZZAHRA NINDYA', kelas: 'VII-B', nisn: '20260007', status: 'Aktif' },
  { name: 'DANIEL PRATAMA', kelas: 'VII-B', nisn: '20260008', status: 'Aktif' },
  { name: 'FADHILA MAHARANI', kelas: 'VII-B', nisn: '20260009', status: 'Aktif' },
  { name: 'GILANG RAMADHAN', kelas: 'VII-B', nisn: '20260010', status: 'Aktif' },
  { name: 'HAFIZH NUR', kelas: 'VII-C', nisn: '20260011', status: 'Aktif' },
  { name: 'INTAN PERMATA', kelas: 'VII-C', nisn: '20260012', status: 'Aktif' },
  { name: 'JIHAN AULIA', kelas: 'VII-C', nisn: '20260013', status: 'Aktif' },
  { name: 'KARISMA AYU', kelas: 'VII-C', nisn: '20260014', status: 'Aktif' },
  { name: 'LUKMAN HAKIM', kelas: 'VII-C', nisn: '20260015', status: 'Aktif' },
  { name: 'MAYA SARI', kelas: 'VII-D', nisn: '20260016', status: 'Aktif' },
  { name: 'NADIA AMELIA', kelas: 'VII-D', nisn: '20260017', status: 'Aktif' },
  { name: 'OKTAVIANI R', kelas: 'VII-D', nisn: '20260018', status: 'Aktif' },
  { name: 'RAFI KURNIAWAN', kelas: 'VII-D', nisn: '20260019', status: 'Aktif' },
  { name: 'SALSABILA', kelas: 'VII-D', nisn: '20260020', status: 'Aktif' },
  { name: 'ALIFIA PUTRI', kelas: 'VIII-A', nisn: '20260021', status: 'Aktif' },
  { name: 'BINTANG RAHMAN', kelas: 'VIII-A', nisn: '20260022', status: 'Aktif' },
  { name: 'CINDY LESTARI', kelas: 'VIII-A', nisn: '20260023', status: 'Aktif' },
  { name: 'DAVA NUR', kelas: 'VIII-A', nisn: '20260024', status: 'Aktif' },
  { name: 'ELSA KARTIKA', kelas: 'VIII-A', nisn: '20260025', status: 'Aktif' },
  { name: 'FARHAN AZIZ', kelas: 'VIII-B', nisn: '20260026', status: 'Aktif' },
  { name: 'GITA AYU', kelas: 'VIII-B', nisn: '20260027', status: 'Aktif' },
  { name: 'HANA NUR', kelas: 'VIII-B', nisn: '20260028', status: 'Aktif' },
  { name: 'IMAM FAUZI', kelas: 'VIII-B', nisn: '20260029', status: 'Aktif' },
  { name: 'JESSICA RIA', kelas: 'VIII-B', nisn: '20260030', status: 'Aktif' },
  { name: 'KHALISA ANANDA', kelas: 'VIII-C', nisn: '20260031', status: 'Aktif' },
  { name: 'LAILA SAKINAH', kelas: 'VIII-C', nisn: '20260032', status: 'Aktif' },
  { name: 'M. FIKRI', kelas: 'VIII-C', nisn: '20260033', status: 'Aktif' },
  { name: 'NISA RAHMA', kelas: 'VIII-C', nisn: '20260034', status: 'Aktif' },
  { name: 'ORCHIDIA T', kelas: 'VIII-C', nisn: '20260035', status: 'Aktif' },
  { name: 'PANDU SETIAWAN', kelas: 'VIII-D', nisn: '20260036', status: 'Aktif' },
  { name: 'QONITA AZZAHRA', kelas: 'VIII-D', nisn: '20260037', status: 'Aktif' },
  { name: 'RIZKY RAMADAN', kelas: 'VIII-D', nisn: '20260038', status: 'Aktif' },
  { name: 'SHEILA NUR', kelas: 'VIII-D', nisn: '20260039', status: 'Aktif' },
  { name: 'TARISYA M', kelas: 'VIII-D', nisn: '20260040', status: 'Aktif' },
  { name: 'AULIA RAHMA', kelas: 'IX-A', nisn: '20260041', status: 'Aktif' },
  { name: 'BAGAS PRATAMA', kelas: 'IX-A', nisn: '20260042', status: 'Aktif' },
  { name: 'CANTIKA N', kelas: 'IX-A', nisn: '20260043', status: 'Aktif' },
  { name: 'DION FAJAR', kelas: 'IX-A', nisn: '20260044', status: 'Aktif' },
  { name: 'ELVIRA NUR', kelas: 'IX-A', nisn: '20260045', status: 'Aktif' },
  { name: 'FIRDAUS IHSAN', kelas: 'IX-B', nisn: '20260046', status: 'Aktif' },
  { name: 'GITA NURMALA', kelas: 'IX-B', nisn: '20260047', status: 'Aktif' },
  { name: 'HAFIDH SYAHPUTRA', kelas: 'IX-B', nisn: '20260048', status: 'Aktif' },
  { name: 'IKHSAN NUGROHO', kelas: 'IX-B', nisn: '20260049', status: 'Aktif' },
  { name: 'JELITA MAHARANI', kelas: 'IX-B', nisn: '20260050', status: 'Aktif' },
  { name: 'KUNIA RAHMA', kelas: 'IX-C', nisn: '20260051', status: 'Aktif' },
  { name: 'LUTFI RAHMAN', kelas: 'IX-C', nisn: '20260052', status: 'Aktif' },
  { name: 'MIRANDA PUTRI', kelas: 'IX-C', nisn: '20260053', status: 'Aktif' },
  { name: 'NADA AYU', kelas: 'IX-C', nisn: '20260054', status: 'Aktif' },
  { name: 'OZI FARIZ', kelas: 'IX-C', nisn: '20260055', status: 'Aktif' },
  { name: 'PRASETYO A', kelas: 'IX-D', nisn: '20260056', status: 'Aktif' },
  { name: 'QISWAH AULIA', kelas: 'IX-D', nisn: '20260057', status: 'Aktif' },
  { name: 'RATNA DEWI', kelas: 'IX-D', nisn: '20260058', status: 'Aktif' },
  { name: 'SURYANINGRUM', kelas: 'IX-D', nisn: '20260059', status: 'Aktif' },
  { name: 'TAMARA KHAIRUNNISA', kelas: 'IX-D', nisn: '20260060', status: 'Aktif' },
];

const totalStudents = students2026.length;
const totalTeachers = teachers2026.length;
const totalClasses = new Set(students2026.map((student) => student.kelas)).size;

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

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'students', label: 'Siswa', icon: '👥' },
  { id: 'teachers', label: 'Guru', icon: '👨‍🏫' },
  { id: 'competitions', label: 'Kompetisi', icon: '🏆' },
  { id: 'profile', label: 'Profil', icon: '👤' },
];

function App() {
  const [screen, setScreen] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('smpn1-salatiga');
  const animatedBackground = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedBackground, {
          toValue: 1,
          duration: 30000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedBackground, {
          toValue: 0,
          duration: 30000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedBackground]);

  const driftX = animatedBackground.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 130],
  });

  const activeSchool = schoolProfiles.find((school) => school.id === selectedSchool) || schoolProfiles[0];

  const filteredMenu = useMemo(() => {
    const source = screen === 'home' ? menuItems : secondaryMenu;
    if (!query.trim()) return source;
    return source.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, screen]);

  const filteredStudents = useMemo(() => {
    const source = students2026;
    if (!query.trim()) return source;
    return source.filter((student) => {
      const search = query.toLowerCase();
      return (
        student.name.toLowerCase().includes(search) ||
        student.kelas.toLowerCase().includes(search) ||
        student.nisn.toLowerCase().includes(search)
      );
    });
  }, [query]);

  const filteredTeachers = useMemo(() => {
    const source = teachers2026;
    if (!query.trim()) return source;
    return source.filter((teacher) => {
      const search = query.toLowerCase();
      return (
        teacher.name.toLowerCase().includes(search) ||
        teacher.role.toLowerCase().includes(search) ||
        teacher.kelas.toLowerCase().includes(search)
      );
    });
  }, [query]);

  const filteredCompetitions = useMemo(() => {
    const source = competitionPrograms;
    if (!query.trim()) return source;
    return source.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

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

  const renderHeroSchool = () => (
    <View style={styles.heroWindow}>
      <View style={styles.heroHeaderRow}>
        <Text style={styles.heroBadge}>Sekolah Digital</Text>
        <Text style={styles.heroDate}>2026</Text>
      </View>

      <Text style={styles.heroSchoolName}>{activeSchool.name}</Text>
      <Text style={styles.heroMeta}>{activeSchool.city} · {activeSchool.accreditation}</Text>

      <View style={styles.heroStatRow}>
        <View style={styles.heroStatBox}>
          <Text style={styles.heroStatValue}>{activeSchool.studentCount}</Text>
          <Text style={styles.heroStatLabel}>Siswa</Text>
        </View>
        <View style={styles.heroStatBox}>
          <Text style={styles.heroStatValue}>{activeSchool.teacherCount}</Text>
          <Text style={styles.heroStatLabel}>Guru</Text>
        </View>
        <View style={styles.heroStatBox}>
          <Text style={styles.heroStatValue}>{activeSchool.classCount}</Text>
          <Text style={styles.heroStatLabel}>Kelas</Text>
        </View>
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
        <Text style={styles.summaryLabel}>Jumlah Siswa</Text>
        <Text style={styles.summaryValue}>{totalStudents}</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Jumlah Guru</Text>
        <Text style={styles.summaryValue}>{totalTeachers}</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Kelas</Text>
        <Text style={styles.summaryValue}>{totalClasses}</Text>
      </View>
    </View>
  );

  const renderQuickAccess = () => (
    <View style={styles.quickAccessWrap}>
      <Text style={styles.quickAccessTitle}>Akses Cepat</Text>
      <View style={styles.quickAccessGrid}>
        {quickAccessItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.quickAccessCard} activeOpacity={0.9} onPress={() => setScreen(item.id === 'guru' ? 'teachers' : item.id === 'kompetisi' ? 'competitions' : item.id === 'siswa' ? 'students' : 'home')}>
            <View style={[styles.quickAccessIcon, { backgroundColor: item.color }]}>
              <Text style={styles.quickAccessIconText}>{item.icon}</Text>
            </View>
            <Text style={styles.quickAccessLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMenuGrid = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{moduleData[screen]?.title || 'Menu Utama'}</Text>
      <View style={styles.gridWrap}>
        {filteredMenu.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItemCard} activeOpacity={0.9} onPress={() => {
            if (item.id === 'kompetisi') setScreen('competitions');
            else if (item.id === 'siswa') setScreen('students');
            else if (item.id === 'jurnal-guru' || item.id === 'modul' || item.id === 'english' || item.id === 'tugas') setScreen('home');
          }}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSchoolSelector = () => (
    <View style={styles.selectorWrap}>
      <Text style={styles.selectorTitle}>Pilih Sekolah Model</Text>
      <View style={styles.selectorList}>
        {schoolProfiles.map((school) => (
          <TouchableOpacity
            key={school.id}
            style={[styles.selectorCard, selectedSchool === school.id && styles.selectorCardActive]}
            activeOpacity={0.9}
            onPress={() => setSelectedSchool(school.id)}
          >
            <Text style={[styles.selectorName, selectedSchool === school.id && styles.selectorNameActive]}>{school.name}</Text>
            <Text style={styles.selectorMeta}>{school.city} · {school.accreditation}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStudentScreen = () => (
    <View style={styles.screenWrap}>
      <Text style={styles.screenHeader}>Data Siswa 2026</Text>
      {filteredStudents.map((student, index) => (
        <View key={`${student.nisn}-${index}`} style={styles.listCard}>
          <View style={styles.listBadge}><Text style={styles.listBadgeText}>{student.kelas}</Text></View>
          <View style={styles.listBody}>
            <Text style={styles.listTitle}>{student.name}</Text>
            <Text style={styles.listMeta}>NISN: {student.nisn}</Text>
            <Text style={styles.listMeta}>Status: {student.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTeacherScreen = () => (
    <View style={styles.screenWrap}>
      <Text style={styles.screenHeader}>Data Guru & Wali Kelas</Text>
      {filteredTeachers.map((teacher, index) => (
        <View key={`${teacher.nip}-${index}`} style={styles.listCard}>
          <View style={styles.listBadgeDark}><Text style={styles.listBadgeText}>{teacher.kelas}</Text></View>
          <View style={styles.listBody}>
            <Text style={styles.listTitle}>{teacher.name}</Text>
            <Text style={styles.listMeta}>{teacher.role}</Text>
            <Text style={styles.listMeta}>{teacher.nip}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCompetitionScreen = () => (
    <View style={styles.screenWrap}>
      <Text style={styles.screenHeader}>Kompetisi Sekolah</Text>
      {filteredCompetitions.map((item) => (
        <View key={item.id} style={[styles.competitionCard, { borderLeftColor: item.color }]}>
          <Text style={styles.competitionTitle}>{item.title}</Text>
          <Text style={styles.listMeta}>{item.type} · {item.period}</Text>
          <View style={styles.competitionFooter}>
            <Text style={styles.competitionMeta}>{item.participants} Peserta</Text>
            <View style={[styles.competitionPill, { backgroundColor: item.color }]}>
              <Text style={styles.competitionPillText}>Aktif</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderProfileScreen = () => (
    <View style={styles.screenWrap}>
      <Text style={styles.screenHeader}>Profil Sekolah</Text>
      {principal2026.map((person, index) => (
        <View key={`${person.nip}-${index}`} style={styles.listCard}>
          <View style={styles.listBadgeDark}><Text style={styles.listBadgeText}>Kepala</Text></View>
          <View style={styles.listBody}>
            <Text style={styles.listTitle}>{person.name}</Text>
            <Text style={styles.listMeta}>{person.position}</Text>
            <Text style={styles.listMeta}>{person.unit}</Text>
            <Text style={styles.listMeta}>{person.nip}</Text>
          </View>
        </View>
      ))}

      <View style={styles.schoolInfoBox}>
        <Text style={styles.schoolInfoLabel}>Visi Sekolah</Text>
        <Text style={styles.schoolInfoText}>Menciptakan generasi unggul, berkarakter, dan siap bersaing di era digital.</Text>
      </View>

      <View style={styles.schoolInfoBox}>
        <Text style={styles.schoolInfoLabel}>Misi Sekolah</Text>
        <Text style={styles.schoolInfoText}>Menyelenggarakan pendidikan berintegritas, inovatif, dan berorientasi masa depan.</Text>
      </View>
    </View>
  );

  const renderHome = () => (
    <View>
      {renderHeroSchool()}
      {renderProfileCard()}
      {renderSummary()}
      {renderQuickAccess()}
      {renderMenuGrid()}
      {renderSchoolSelector()}
    </View>
  );

  const renderCurrentScreen = () => {
    switch (screen) {
      case 'students':
        return renderStudentScreen();
      case 'teachers':
        return renderTeacherScreen();
      case 'competitions':
        return renderCompetitionScreen();
      case 'profile':
        return renderProfileScreen();
      default:
        return renderHome();
    }
  };

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.navItem} onPress={() => setScreen(item.id)}>
          <Text style={screen === item.id ? styles.navIconActive : styles.navIcon}>{item.icon}</Text>
          <Text style={screen === item.id ? styles.navLabelActive : styles.navLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
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
          <Text style={styles.scanStatValue}>{totalStudents} / {totalStudents}</Text>
        </View>
        <View style={styles.scanStatBox}>
          <Text style={styles.scanStatText}>Pegawai</Text>
          <Text style={styles.scanStatValue}>{totalTeachers + principal2026.length} / {totalTeachers + principal2026.length}</Text>
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
      <Animated.View pointerEvents="none" style={styles.backgroundLayer}>
        <Animated.View style={[styles.backgroundTrack, { transform: [{ translateX: driftX }] }]}>
          <View style={styles.backgroundStrip} />
          <View style={[styles.backgroundStrip, { backgroundColor: '#e2f7ff' }]} />
          <View style={[styles.backgroundStrip, { backgroundColor: '#ffe7b2' }]} />
          <View style={[styles.backgroundStrip, { backgroundColor: '#dff7dc' }]} />
        </Animated.View>
        <View style={styles.orbBlue} />
        <View style={styles.orbYellow} />
        <View style={styles.orbGreen} />
      </Animated.View>

      <StatusBar barStyle="dark-content" backgroundColor="#dfe7e7" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {renderHeader()}

        <View style={styles.searchWrap}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari data sekolah..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        {renderCurrentScreen()}

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
    backgroundColor: 'transparent',
    paddingBottom: 12,
  },
  backgroundLayer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  backgroundTrack: {
    position: 'absolute',
    top: 0,
    left: -160,
    right: -160,
    height: 400,
    flexDirection: 'row',
    alignItems: 'flex-start',
    opacity: 0.35,
  },
  backgroundStrip: {
    width: 180,
    height: 420,
    borderRadius: 80,
    marginRight: 26,
    backgroundColor: '#cfe7ff',
    transform: [{ rotate: '-18deg' }],
  },
  orbBlue: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(94, 147, 255, 0.18)',
    top: 90,
    right: -60,
  },
  orbYellow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 196, 70, 0.18)',
    bottom: 140,
    left: -30,
  },
  orbGreen: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(60, 190, 120, 0.12)',
    bottom: 70,
    right: 80,
  },
  statusBarWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 12 : 10,
    paddingBottom: 8,
    backgroundColor: 'rgba(237, 242, 242, 0.8)',
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#d7dfe2',
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 18,
    color: '#111',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  heroWindow: {
    marginHorizontal: 18,
    marginTop: 18,
    backgroundColor: 'rgba(30, 76, 183, 0.96)',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#0f172a',
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroBadge: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#dbeafe',
    textTransform: 'uppercase',
  },
  heroDate: {
    fontSize: 12,
    fontWeight: '800',
    color: '#dbeafe',
  },
  heroSchoolName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  heroMeta: {
    fontSize: 14,
    color: '#dbeafe',
    fontWeight: '600',
  },
  heroStatRow: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
    gap: 10,
  },
  heroStatBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  heroStatLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#dbeafe',
    marginTop: 2,
  },
  quickAccessWrap: {
    marginHorizontal: 18,
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickAccessCard: {
    flex: 1,
    alignItems: 'center',
  },
  quickAccessIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  quickAccessIconText: {
    fontSize: 25,
  },
  quickAccessLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#202020',
    textAlign: 'center',
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
    flexWrap: 'wrap',
  },
  summaryCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dfe2e5',
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1c1c1c',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1c1c1c',
  },
  sectionWrap: {
    marginTop: 20,
    marginHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 26,
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
  selectorWrap: {
    marginHorizontal: 18,
    marginTop: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },
  selectorList: {
    gap: 10,
  },
  selectorCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#dfe2e5',
  },
  selectorCardActive: {
    borderColor: '#1d4ed8',
    backgroundColor: '#e0ebff',
  },
  selectorName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  selectorNameActive: {
    color: '#1d4ed8',
  },
  selectorMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginTop: 4,
  },
  screenWrap: {
    marginHorizontal: 18,
    marginTop: 16,
  },
  screenHeader: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  listCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dfe2e5',
  },
  listBadge: {
    backgroundColor: '#46c7a7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
  },
  listBadgeDark: {
    backgroundColor: '#5d79d8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
  },
  listBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
  listBody: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 2,
  },
  listMeta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginTop: 2,
  },
  competitionCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: '#dfe2e5',
  },
  competitionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  competitionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  competitionMeta: {
    fontSize: 13,
    color: '#555',
    fontWeight: '700',
  },
  competitionPill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  competitionPillText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  schoolInfoBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#dfe2e5',
  },
  schoolInfoLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginBottom: 6,
  },
  schoolInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(243,246,246,0.94)',
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
