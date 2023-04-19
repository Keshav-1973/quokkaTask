import auth from '@react-native-firebase/auth';

export const AuthProvider = {
    login: async (email: string, password: string) => {
        let data
        await auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                data = res
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        data = 'auth/user-not-found'
                        break;
                    case 'auth/wrong-password':
                        data = 'auth/wrong-password'
                        break;
                    case 'auth/operation-not-allowed':
                        data = 'auth/operation-not-allowed'
                        break;
                    default:
                        console.log(error.message, ".....error");
                        break;
                }
            });
        return data
    },
    register: async (email: any, password: any) => {
        let data
        await auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                data = res
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.log(`Email address ${email} already in use.`);
                        break;
                    case 'auth/invalid-email':
                        console.log(`Email address ${email} is invalid.`);
                        break;
                    case 'auth/operation-not-allowed':
                        console.log(`Error during sign up.`);
                        break;
                    case 'auth/weak-password':
                        console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                        break;
                    default:
                        console.log(error.message);
                        break;
                }
            });
        return data
    },
    logout: async () => {
        try {
            return await auth().signOut();
        } catch (e) {
            console.log(e);
        }
    },
}