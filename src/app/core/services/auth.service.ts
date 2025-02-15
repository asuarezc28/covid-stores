import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AppURl } from 'src/app/config/app-urls.config';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any; 
    userInformation$ = new EventEmitter<object>();

    constructor(
        public afs: AngularFirestore,   
        public afAuth: AngularFireAuth, 
        public router: Router,
        public ngZone: NgZone 
    ) {

        this.afAuth.authState.subscribe(user => {
            if (user) {
                const userD = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                    login: "Log out"
                };
                this.userData = userD;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    SignIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    SignUp(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate([AppURl.AppAuth, AppURl.AppAuthVerifyEmailAddress]);
            });
    }

    ForgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }


    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error);
            });
    }

    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            login: "Log out"
        };
        this.router.navigate([AppURl.AppHome]);
        return userRef.set(userData, {
            merge: true
        });
    }

    SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            let changeForm = {
                uid: "",
                email: "",
                displayName: "",
                photoURL: "",
                emailVerified: false,
                login: "Log in"
            };
            this.userInformation$.emit(changeForm);
            this.router.navigate([AppURl.AppAuth, AppURl.AppAuthSignIn]);
        });
    }
}
