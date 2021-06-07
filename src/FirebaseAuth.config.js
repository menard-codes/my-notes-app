export const uiConfig = (firebase) => ({
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    tosUrl: '/terms-of-service',
    privacyPolicyUrl: '/privacy',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
})