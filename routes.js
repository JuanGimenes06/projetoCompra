import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/index';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="index"
                component={Index}
                options={{ headerShown: false }} 
            />

        </Stack.Navigator>
    )
} 