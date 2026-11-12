//
//  AuthModel.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/12/26.
//

import SwiftUI
import Observation

@Observable
class AuthModel {
    var isSignedIn = false

    func signIn() { isSignedIn = true }
    func signOut() { isSignedIn = false }
}
