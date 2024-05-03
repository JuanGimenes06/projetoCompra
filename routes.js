import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/index';
import Acesso from './pages/form';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="index"
                component={Index}
                options={{ headerShown: false }} 
            />

            <Stack.Screen
                name="form"
                component={Acesso}
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    )
} 