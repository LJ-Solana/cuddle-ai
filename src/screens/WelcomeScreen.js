import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
      {/* title */}
      <View>
        <Text style={{ fontSize: wp(10), textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>
          Cuddle
        </Text>
        <Text style={{ fontSize: wp(4), textAlign: 'center', fontWeight: '600', color: 'blue' }}>
          Your on-the-go pocket nanny.
        </Text>
      </View>

      {/* assistant image */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={{ height: wp(75), width: wp(75) }}
        />
      </View>

         {/* start button */}
         <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          marginHorizontal: wp(5),
          paddingVertical: wp(4),
          paddingHorizontal: wp(8),
          borderRadius: wp(20),
          marginBottom: wp(-20), 
          backgroundColor: 'blue',
        }} 
      >
        <Text style={{ fontSize: wp(4), textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
          Get Started Free (10 Questions)
        </Text>
      </TouchableOpacity>

      {/* Go Premium */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          marginHorizontal: wp(5),
          paddingVertical: wp(4),
          paddingHorizontal: wp(8),
          borderRadius: wp(20),
          backgroundColor: 'blue',
        }}
      >
        <Text style={{ fontSize: wp(4), textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
          Go Pro (Unlimited Questions)
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
