import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'oufit-medium': require('./../assets/fonts/Outfit-Medium.ttf')
  })
  return <Stack screenOptions={{headerShown : false}}/>;
}
