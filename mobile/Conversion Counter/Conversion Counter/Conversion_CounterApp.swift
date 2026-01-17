//
//  Conversion_CounterApp.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData

@main
struct Conversion_CounterApp: App {

    var body: some Scene {
        WindowGroup {
            ContentView()
                .modelContainer(for: [Item.self, DailyData.self])
        }
    }
}
