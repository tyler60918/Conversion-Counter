//
//  DailyData.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 1/9/26.
//

import Foundation
import SwiftUI
import SwiftData

@Model
final class DailyData {
    var date = Date()
    var conversions: [Item] 
    var numAppointments: Int
    var conversionPercentage: Double = 0.0
    var numAccessory: Int = 0
    var numAppleCare: Int = 0
    var numTradeIn: Int = 0
    var numUpgrade: Int = 0
    
    init(date: Date = Calendar.current.startOfDay(for: Date.now), conversions: [Item] = [], numAppointments: Int = 0) {
        self.date = date
        self.conversions = conversions
        self.numAppointments = numAppointments
        calculateConvPercent()
    }
    
    func addConversion(_ conversion: Item) {
        conversions.append(conversion)
        calculateConvPercent()
    }
    
    func updateNumAppointments(_ numAppt: Int) {
        numAppointments = numAppt
        calculateConvPercent()
    }
    
    func calculateConvPercent() {
        print("Calculation conversion percentage")
        if conversions.isEmpty {
            print("Conversions empty")
            conversionPercentage = 0
            numUpgrade = 0
            numAccessory = 0
            numAppleCare = 0
            numTradeIn = 0
        } else {
            print("Conversions non-empty")
            if numAppointments > 0 {
                print("Conversion size: \(conversions.count)")
                print("Num Appointments: \(numAppointments)")
                print("Result: \(Double(conversions.count) / Double(numAppointments) * 100)")
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
