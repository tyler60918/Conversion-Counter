//
//  LoginPageView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/11/26.
//

import SwiftUI

struct LoginPageView: View {
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
            
            Button("Continue with Google") {
                // TODO: Add Google Login Action
            }
            .padding(8)
            
            NavigationLink("Continue with Email") {
                RegisterFormView()
            }
            .padding(8)
        }
    }
}

#Preview {
    LoginPageView()
}
