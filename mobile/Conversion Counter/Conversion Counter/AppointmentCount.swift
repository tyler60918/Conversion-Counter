//
//  AppointmentCount.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 12/18/25.
//

import Foundation
import SwiftData

@Model
final class AppointmentCount {
    var count: String
    var date: String
    var createdAt: Date?
    
    init(count: String, date: String) {
        self.count = count
        self.date = date
        self.createdAt = Date()
    }
}
