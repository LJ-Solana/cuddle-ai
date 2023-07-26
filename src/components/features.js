import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Features() {
  return (
    <ScrollView style={{height: hp(60)}} bounces={false} showsVerticalScrollIndicator={false} className="space-y-4">
        <Text style={{fontSize: wp(6.5)}} className="font-semibold text-center text-gray-700">Cuddle can help with:</Text>
        <View className="bg-feature1 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center space-x-1">
            <Text style={{ fontSize: hp(2.5)}}>🍼</Text>
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-white">Nutrition & Feeding</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-white font-medium">
            Expert guidance on feeding your newborn with Cuddle. From breastfeeding to formula feeding and introducing solids, we'll help you establish healthy feeding routines.
            </Text>
        </View>
        <View className="bg-feature2 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center space-x-1">
                <Text style={{ fontSize: hp(2.5)}}>👩‍🍼</Text>
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Bath & Changing</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
            Ensure bath time and nappy changing are safe and enjoyable with Cuddle. Our step-by-step instructions and tips will keep your baby comfortable and protected.
            </Text>
        </View>
        <View className="bg-feature3 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center space-x-1">
                <Text style={{ fontSize: hp(2.5)}}>😴</Text>
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-white">Sleep & Sensory</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-white font-medium">
            Rest easy as Cuddle provides sleep support for your little one. Discover helpful advice for creating a soothing sleep environment and addressing challenges. 
            </Text>
        </View>
    </ScrollView>
  )
}