import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const projects = [
  {
    id: '1',
    name: 'Hospital Wing Extension',
    client: 'City General Hospital',
    progress: 65,
    clashes: 24,
  },
  {
    id: '2',
    name: 'Tech Campus Building B',
    client: 'Innovation Tech',
    progress: 42,
    clashes: 45,
  },
  {
    id: '3',
    name: 'Downtown Office Tower',
    client: 'Metropolitan Developments',
    progress: 88,
    clashes: 12,
  },
];

export default function ProjectsScreen() {
  const router = useRouter();

  const renderProject = ({ item }) => (
    <TouchableOpacity 
      style={styles.projectCard}
      onPress={() => router.push(`/projects/${item.id}`)}
    >
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.clientName}>{item.client}</Text>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Progress</Text>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${item.progress}%` }]} 
          />
        </View>
        <Text style={styles.progressText}>{item.progress}%</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{item.clashes}</Text>
          <Text style={styles.statLabel}>Open Clashes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>Manage your active coordination projects</Text>
      </View>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listContent: {
    padding: 16,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  clientName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e5e5',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});