//
//  Conversion_CounterApp.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData
import GoogleSignIn

@main
struct Conversion_CounterApp: App {
    @State private var auth = AuthModel()

        var body: some Scene {
            WindowGroup {
                ContentView()
                    .environment(auth)
                    .onOpenURL { url in
                        GIDSignIn.sharedInstance.handle(url)
                    }
                    .task { await auth.listen() }
            }
        }
}
