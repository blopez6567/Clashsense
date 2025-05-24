import { StyleSheet, View, Text, FlatList } from 'react-native';

const clashes = [
  {
    id: '1',
    type: 'Critical',
    description: 'Ductwork interference with structural beam on Level 3',
    location: 'Level 3 - Grid A-5',
    discipline: 'MECH',
  },
  {
    id: '2',
    type: 'Major',
    description: 'Electrical conduit clashing with plumbing main',
    location: 'Level 2 - Utility Room',
    discipline: 'ELEC',
  },
  {
    id: '3',
    type: 'Minor',
    description: 'Sprinkler head clearance issue',
    location: 'Level 1 - Office Area',
    discipline: 'FP',
  },
];

export default function ClashesScreen() {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'critical':
        return '#ef4444';
      case 'major':
        return '#f59e0b';
      case 'minor':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const renderClash = ({ item }) => (
    <View style={styles.clashCard}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
        <Text style={styles.discipline}>{item.discipline}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={clashes}
      renderItem={renderClash}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  clashCard: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  discipline: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 12,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
});