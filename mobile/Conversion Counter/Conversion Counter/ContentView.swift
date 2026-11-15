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
    @State private var hasSeenLanding = false

    @Environment(AuthModel.self) private var auth

        var body: some View {
            NavigationStack {
                Group {
                    if auth.isLoading {
                        ProgressView()
                    } else if auth.isAuthenticated {
                        MainTabView()
                    } else {
                        LandingView()
                    }
                }
            }
        }
}

#Preview {
    ContentView()
        .modelContainer(for: Item.self, inMemory: true)
        .environment(AuthModel())
}
