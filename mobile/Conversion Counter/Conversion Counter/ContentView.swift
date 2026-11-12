//
//  ContentView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var items: [Item]
    @Query private var data: [DailyData]
    @State private var auth = AuthModel()
    @State private var hasSeenLanding = false

    var body: some View {
        Group {
            if auth.isSignedIn {
                MainTabView()
            } else if hasSeenLanding {
                NavigationStack {
                    LoginPageView()
                }
            } else {
                LandingView(onSignIn: {
                    withAnimation { hasSeenLanding = true }
                })
            }
        }
        .environment(auth)
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Item.self, inMemory: true)
}
