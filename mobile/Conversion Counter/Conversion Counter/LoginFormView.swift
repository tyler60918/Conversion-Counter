//
//  LoginFormView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/12/26.
//

import SwiftUI

struct LoginFormView: View {
    @Environment(AuthModel.self) private var auth
    @State private var email: String = ""
    @State private var password: String = ""
    
    var body: some View {
        VStack {
            Image("Icon")
                .resizable()
                .scaledToFit()
                .frame(width: 80)
                .clipShape(RoundedRectangle(cornerRadius: 10))
            
            Text("Login to the Genius Bar Conversion Counter")
                .multilineTextAlignment(.center)
                .padding(20)
            
            TextField("Email:", text: $email)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
                .textInputAutocapitalization(.never)
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal)
            
            SecureField("Password:", text: $password)
                .textContentType(.password)
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal)
            
            Button("Login") {
                // TODO: Add create account action
//                auth.signIn()
            }
            .padding()
            
        }
    }
}

#Preview {
    LoginFormView()
        .environment(AuthModel())
}
