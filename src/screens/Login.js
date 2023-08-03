import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { User } from '../constants/UserSchema';

const Login = ({ navigation }) => {

    let regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#fff',
        },
        input: {
            width: '85%',
            height: wp(11),
            marginVertical: wp(2),
            borderColor: 'gray',
            borderWidth: wp(0.2),
            paddingHorizontal: wp(3),
            borderRadius: wp(10),
            alignSelf: 'center'
        },
        button: {
            width: '85%',
            height: wp(11),
            justifyContent: 'center',
            borderRadius: wp(20),
            backgroundColor: 'blue',
            marginVertical: wp(6),
            alignSelf: 'center'
        }
    });


    const [authType, setAuthType] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const insets = useSafeAreaInsets()

    const changeAuthState = () => {
        setEmail('')
        setPassword('')
        setAuthType(authType == 'Login' ? 'Signup' : 'Login')
    }

    const logout = async () => {
        await auth.signOut()
            .then(() => {
                // Logout successful
                console.log("User logged out successfully!");
                // You can now redirect the user to the login page or another appropriate page.
            })
            .catch((error) => {
                // Handle errors during the logout process
                console.error("Error logging out:", error);
            });
    }

    const handleSignUp = async () => {
        if (email == '') {
            Alert.alert('Alert!', 'Please enter your email.')
            return false;
        }
        if (regemail.test(email) !== true) {
            Alert.alert('Alert!', 'Invalid email address.')
            return false;
        }


        if (password == '') {
            Alert.alert('Alert!', 'Please enter your password.')
            return false;
        }

        if (password.length < 8) {
            Alert.alert('Alert!', 'Password should be minimum 8 characters.')
            return false;
        }


        setLoading(true)
        try {
            await auth().createUserWithEmailAndPassword(email, password).then((res) => {
                console.log('User registered successfully!', res);
                const newUser = new User({
                    Created: new Date(),
                    ID: res.user.uid,
                    userInfo: {
                        userName: res.user.displayName,
                        email: res.user.email,
                        emailVerified: res.user.emailVerified,
                        isAnonymous: res.user.isAnonymous,
                        phoneNumber: res.user.phoneNumber,
                        photoURL: res.user.photoURL,
                    }

                })
                firestore().collection('Test-Users').doc(res.user.uid).set(newUser).finally(() => {
                    sendEmail(res)
                })
            })
            // You can perform additional actions here after successful registration
        } catch (error) {
            console.log('Error signing up:', error.message);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false)
        }
    };

    const sendEmail = async (res) => {
        await res.user.sendEmailVerification()
            .then((res) => {
                Alert.alert('Alert!', "Please verify your email.");

            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    }
    const updateEmailStatus = async (res) => {
        const id = res.user.uid
        await firestore().collection('Test-Users').doc(id).update({
            'UserDetails.userInfo.emailVerified': true,
        }).finally(() => {
            navigation.navigate('Welcome')
        })
    }

    const checkUserDoc = async (res) => {
        const id = res.user.uid
        const newUser = new User({
            Created: new Date(),
            ID: res.user.uid,
            userInfo: {
                userName: res.user.displayName,
                email: res.user.email,
                emailVerified: res.user.emailVerified,
                isAnonymous: res.user.isAnonymous,
                phoneNumber: res.user.phoneNumber,
                photoURL: res.user.photoURL,
            }

        })

        const userDoc = await firestore().collection('Test-Users').doc(id).get();

        if (userDoc.exists) {
            if (userDoc._data.UserDetails.userInfo.emailVerified == false) {
                updateEmailStatus(res)
            }
        } else {
            await firestore().collection('Test-Users').doc(res.user.uid).set(newUser).finally(() => {

            })

        }
    }

    const handleSignIn = async () => {

        if (email == '') {
            Alert.alert('Alert!', 'Please enter your email.')
            return false;
        }

        if (regemail.test(email) !== true) {
            Alert.alert('Alert!', 'Invalid email address.')
            return false;
        }

        if (password == '') {
            Alert.alert('Alert!', 'Please enter your password.')
            return false;
        }

        if (password.length < 8) {
            Alert.alert('Alert!', 'Password should be minimum 8 characters.')
            return false;
        }


        setLoading(true)

        try {
            await auth().signInWithEmailAndPassword(email, password).then((res) => {
                const user = res.user;

                if (user.emailVerified) {
                    checkUserDoc(res)
                } else {
                    checkUserDoc(res)
                    sendEmail(res)
                }


            }).catch((error) => {
                // Handle errors during the login process
                Alert.alert('Error', error.message);
                console.log(error);
            });
            // You can navigate to the home screen or perform additional actions after successful login
        } catch (error) {
            console.log('Error signing in:', error.message);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false)
        }
    };

    return (

        <View
            pointerEvents={loading ? 'none' : 'auto'}
            style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', paddingTop: insets.top, }}>

            <KeyboardAwareScrollView
                // keyboardOpeningTime={200}
                extraScrollHeight={50}
                enableOnAndroid={true}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    justifyContent: 'center',
                    flex: 1
                }}
                showsVerticalScrollIndicator={false}>

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
                        style={{ height: wp(40), width: wp(40) }}
                        resizeMode={'contain'}
                    />
                </View>


                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    returnKeyType='next'
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />

                <TouchableOpacity
                    onPress={() => authType == 'Login' ? handleSignIn() : handleSignUp()}
                    style={styles.button}
                >
                    {
                        loading ?
                            <ActivityIndicator size={'small'} color={'#fff'} />
                            :
                            <Text style={{ fontSize: wp(4), textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                                {authType}
                            </Text>
                    }
                </TouchableOpacity>

                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <Text style={{ fontSize: wp(3.5), color: 'blue', fontWeight: '300' }}>
                        {authType == 'Login' ? `Don't have an account? ` : `Already have an account? `}
                        <TouchableOpacity
                            onPress={() => {
                                changeAuthState()
                            }}
                        >
                            <Text style={{ fontSize: wp(3.5), color: 'blue', fontWeight: '700' }}>
                                {authType == 'Login' ? 'Signup' : 'Login'}
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};



export default Login;
