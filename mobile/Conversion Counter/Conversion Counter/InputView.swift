//
//  InputView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData

struct InputView: View {
    @Environment(\.modelContext) private var context
    @Query private var data: [DailyData]

    @State private var typeOfConversion = "Accessory"
    @State private var typeOfInput = "Conversion"
    @State private var itemPurchased = ""
    @State private var today: Date = Calendar.current.startOfDay(for: Date.now)
    @State private var itemAdded = false
    @State private var toastOpacity = 1.0
    @State private var showError = false
    @State private var numAppointments = ""
    
    @FocusState private var fieldIsFocused: Bool
    
    
    var body: some View {
        ZStack {
            VStack {
                Text("Input")
                    .font(.largeTitle)
                
                    Picker("Input Type", selection: $typeOfInput) {
                        Text("Conversion").tag("Conversion")
                        Text("Appointment Count").tag("Appointment Count")
                    }
                    .pickerStyle(.menu)
                
                if typeOfInput == "Conversion" {
                    Picker("Conversion Type", selection: $typeOfConversion) {
                        Text("Accessory").tag("Accessory")
                        Text("AppleCare").tag("AppleCare")
                        Text("Trade-In").tag("Trade-In")
                        Text("Upgrade").tag("Upgrade")
                    }
                    .pickerStyle(.palette)
                    .padding(EdgeInsets(top: 0, leading: 25, bottom: 0, trailing: 25))
                    
                    switch typeOfConversion {
                    case "Accessory":
                        TextField("Enter accessory that was purchased", text: $itemPurchased)
                            .padding()
                            .multilineTextAlignment(.center)
                            .autocorrectionDisabled(true)
                            .focused($fieldIsFocused)
                    case "AppleCare":
                        TextField("Enter item AppleCare was attached to", text: $itemPurchased)
                            .padding()
                            .multilineTextAlignment(.center)
                            .autocorrectionDisabled(true)
                            .focused($fieldIsFocused)
                    case "Upgrade":
                        TextField("Enter device that was purchased", text: $itemPurchased)
                            .padding()
                            .multilineTextAlignment(.center)
                            .autocorrectionDisabled(true)
                            .focused($fieldIsFocused)
                    case "Trade-In":
                        TextField("Enter device that was traded-in", text: $itemPurchased)
                            .padding()
                            .multilineTextAlignment(.center)
                            .autocorrectionDisabled(true)
                            .focused($fieldIsFocused)
                    default:
                        Text("Please select a conversion category")
                    }
                    
                    Button("Add item") {
                        fieldIsFocused = false
                        if typeOfConversion == "Conversion Type" || itemPurchased.isEmpty {
                            showError = true
                            toastOpacity = 1.0
                        } else {
                            let newItem = Item(convType: typeOfConversion, itemName: itemPurchased, date: today)
                            if let existingData = data.first(where: { Calendar.current.isDate($0.date, inSameDayAs: today) }) {
                                existingData.addConversion(newItem)
                                try? context.save()
                            } else {
                                let newDailyData = DailyData(date: today, conversions: [newItem])
                                context.insert(newDailyData)
                                try? context.save()
                            }
                            itemPurchased = ""
                            itemAdded = true
                            toastOpacity = 1.0
                        }
                    }
                } else {
                    TextField("Enter number of Appointments", text: $numAppointments)
                        .padding()
                        .multilineTextAlignment(.center)
                        .keyboardType(.numberPad)
                        .focused($fieldIsFocused)
                        
                    Button("Submit Appointment Number") {
                        fieldIsFocused = false
                        if numAppointments == "0" || numAppointments == "" {
                            showError = true
                            toastOpacity = 1.0
                        } else {
                            if let existingData = data.first(where: { Calendar.current.isDate($0.date, inSameDayAs: today) }) {
                                existingData.updateNumAppointments(Int(numAppointments)!)
                                try? context.save()
                            } else {
                                let newDailyData = DailyData(date: today, numAppointments: Int(numAppointments)!)
                                context.insert(newDailyData)
                                try? context.save()
                            }
                            numAppointments = ""
                            itemAdded = true
                            toastOpacity = 1.0
                        }
                    }
                }
            }
            
            if showError {
                ToastView(message: "Missing field/invalid selection", width: 400)
                    .opacity(toastOpacity)
                    .transition(.opacity)
                    .task {
                        try? await Task.sleep(nanoseconds: 1_500_000_000)
                        withAnimation(.easeInOut(duration: 0.4)) {
                            toastOpacity = 0
                            showError = false
                        }
                    }
            }
            if itemAdded {
                ToastView(message: "Item added", width: 200)
                    .opacity(toastOpacity)
                    .transition(.opacity)
                    .task {
                        try? await Task.sleep(nanoseconds: 1_500_000_000)
                        withAnimation(.easeInOut(duration: 0.4)) {
                            toastOpacity = 0
                            itemAdded = false
                        }
                    }
            }
        }
    }
}

#Preview {
//    InputView(data: DailyData(date: Date.now(), conversions: <#T##[Item]#>))
}
