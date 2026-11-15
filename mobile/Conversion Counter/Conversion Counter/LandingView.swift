//
//  LandingView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 10/30/26.
//

import SwiftUI

struct LandingView: View {
    
    var body: some View {
        VStack {
            Image("Icon")
                .resizable()
                .scaledToFit()
                .frame(width: 150)
                .clipShape(RoundedRectangle(cornerRadius: 30))
            
            Text("Track your individual conversions including accessories, AppleCare, trade-ins, and upgrades, along with your number of appointments and see statistics over time")
                .multilineTextAlignment(.center)
                .padding(20)
            
            NavigationLink("Sign in to continue") {
                LoginPageView()
            }
        }
    }
}

#Preview {
    LandingView()
}
