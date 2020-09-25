import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { AppURl } from 'src/app/config/app-urls.config';
import { SecureInnerPagesGuard } from 'src/app/core/guard/secure-inner-pages.guard';

const routes: Routes = [
    { path: AppURl.AppAuthRoot, redirectTo: AppURl.AppAuthSignIn, pathMatch: 'full' },
    { path: AppURl.AppAuthSignIn, component: SignInPageComponent, canActivate: [SecureInnerPagesGuard] },
    { path: AppURl.AppAuthSignUp, component: SignUpPageComponent, canActivate: [SecureInnerPagesGuard] },
    { path: AppURl.AppAuthForgotPassword, component: ForgotPasswordPageComponent, canActivate: [SecureInnerPagesGuard] },
    { path: AppURl.AppAuthVerifyEmailAddress, component: VerifyEmailPageComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
