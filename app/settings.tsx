import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User, Bell, Shield, HelpCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const sections = [
    {
      title: 'Account',
      icon: <User size={24} color="#2563eb" />,
      items: [
        { title: 'Profile', description: 'Manage your account information' },
        { title: 'Notifications', description: 'Configure notification preferences' },
        { title: 'Security', description: 'Update security settings' },
      ],
    },
    {
      title: 'Support',
      icon: <HelpCircle size={24} color="#2563eb" />,
      items: [
        { title: 'Help Center', description: 'Get help with ClashSense' },
        { title: 'Contact Support', description: 'Reach out to our team' },
        { title: 'FAQs', description: 'Frequently asked questions' },
      ],
    },
    {
      title: 'About',
      icon: <Info size={24} color="#2563eb" />,
      items: [
        { title: 'App Version', description: '1.0.0' },
        { title: 'Terms of Service', description: 'Read our terms' },
        { title: 'Privacy Policy', description: 'Learn about data usage' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your preferences</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              {section.icon}
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.item}>
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 12,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  itemTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});