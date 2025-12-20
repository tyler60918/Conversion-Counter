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
    @Query private var appointments: [AppointmentCount]

    var body: some View {
        TabView {
            InputView()
                .tabItem {
                    Label("Input", systemImage: "pencil")
                }
            StatsView()
                .tabItem {
                    Label("Stats", systemImage: "list.number")
                }
            GraphView()
                .tabItem {
                    Label("Graph", systemImage: "chart.bar")
                }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Item.self, inMemory: true)
}
