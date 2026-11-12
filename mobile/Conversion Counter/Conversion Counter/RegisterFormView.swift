//
//  RegisterFormView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/11/26.
//

import SwiftUI

struct RegisterFormView: View {
    @Environment(AuthModel.self) private var auth
    @State private var firstName: String = ""
    @State private var lastName: String = ""
    @State private var email: String = ""
    @State private var password: String = ""
    
    var body: some View {
        VStack {
            Image("Icon")
                .resizable()
                .scaledToFit()
                .frame(width: 80)
                .clipShape(RoundedRectangle(cornerRadius: 10))
            
            Text("Sign up for Genius Bar Conversion Counter")
                .multilineTextAlignment(.center)
                .padding(20)
            
            TextField("First name:", text: $firstName)
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal)
            
            TextField("Last name:", text: $lastName)
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal)
            
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
            
            Button("Create Account") {
                // TODO: Add create account action
                auth.signIn()
            }
            .padding()
            
            Text("Already have an account?")
                .padding(8)
            
            NavigationLink("Login") {
                LoginFormView()
            }
        }
    }
}

#Preview {
    RegisterFormView()
        .environment(AuthModel())
}
