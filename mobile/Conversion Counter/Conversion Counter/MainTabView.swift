//
//  MainTabView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/12/26.
//

import SwiftUI

struct MainTabView: View {
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
    MainTabView()
}
