//
//  DailyData.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 1/9/26.
//

import Foundation
import SwiftUI

class DailyData: Identifiable {
    var date = Date()
    var conversions: [Item] {
        didSet {
            calculateConvPercent()
        }
    }
    var numAppointments: Int = 0
    var conversionPercentage: Double = 0.0
    var numAccessory: Int = 0
    var numAppleCare: Int = 0
    var numTradeIn: Int = 0
    var numUpgrade: Int = 0
    var id: Date { Calendar.current.startOfDay(for: date) }
    
    init(date: Date = Date(), conversions: [Item]) {
        self.date = date
        self.conversions = conversions
    }
    
    func calculateConvPercent() {
        if conversions.isEmpty {
            numAppointments = 0
            conversionPercentage = 0
            numUpgrade = 0
            numAccessory = 0
            numAppleCare = 0
            numTradeIn = 0
        } else {
            if numAppointments > 0 {
                conversionPercentage = Double(conversions.count) / Double(numAppointments) * 100
            }
            
            for item in conversions {
                switch item.convType {
                case "Accessory":
                    numAccessory += 1
                case "AppleCare":
                    numAppleCare += 1
                case "Trade-In":
                    numTradeIn += 1
                case "Upgrade":
                    numUpgrade += 1
                default:
                    break
                }
            }
        }
    }
}
