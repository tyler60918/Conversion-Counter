//
//  AuthModel.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/12/26.
//

import SwiftUI
import Observation
import Supabase

@MainActor
@Observable
class AuthModel {
    var isAuthenticated = false
    var isLoading = true

    func listen() async {
        for await (event, session) in supabase.auth.authStateChanges {
            isAuthenticated = session != nil && !(session?.isExpired ?? true)
            isLoading = false
        }
        print("Auth listener stopped")
    }
}
