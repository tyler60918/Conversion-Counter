//
//  LoginPageView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/11/26.
//

import SwiftUI
import GoogleSignIn
import GoogleSignInSwift
import Auth
import Supabase

struct LoginPageView: View {
    @Environment(AuthModel.self) private var auth
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        VStack {
            Image("Icon")
                .resizable()
                .scaledToFit()
                .frame(width: 150)
                .clipShape(RoundedRectangle(cornerRadius: 30))
            
            Text("Sign up for Genius Bar Conversion Counter")
                .multilineTextAlignment(.center)
                .padding(20)
            
            GoogleSignInButton(action: handleSignIn)
            .padding(8)
            
            NavigationLink("Continue with Email") {
                RegisterFormView()
            }
            .padding(8)
        }
        .onDisappear { print("LoginPageView disappeared") }
    }
  
    func handleSignIn() {
        guard let rootVC = UIApplication.shared.connectedScenes
            .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
            .first?.rootViewController else { return }

        Task {
            do {
                let result = try await GIDSignIn.sharedInstance.signIn(withPresenting: rootVC)

                guard let idToken = result.user.idToken?.tokenString else {
                    print("No idToken found.")
                    return
                }
                let accessToken = result.user.accessToken.tokenString

                let session = try await supabase.auth.signInWithIdToken(
                    credentials: OpenIDConnectCredentials(
                        provider: .google,
                        idToken: idToken,
                        accessToken: accessToken
                    )
                )
                print("Signed in as:", session.user.email ?? "no email")
                await MainActor.run { dismiss() }
                // Signed in: supabase.auth.session is now available
            } catch {
                print("Sign in failed:", error)
            }
        }
    }
}

#Preview {
    LoginPageView()
}
