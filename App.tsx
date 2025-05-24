import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ClashesScreen from './src/screens/ClashesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'ClashSense',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen 
          name="Projects" 
          component={ProjectsScreen}
          options={{
            title: 'Projects',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen 
          name="Clashes" 
          component={ClashesScreen}
          options={{
            title: 'Clash Detection',
            headerLargeTitle: true,
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}