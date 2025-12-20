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

    @State private var typeOfConversion = "Accessory"
    @State private var typeOfInput = "Conversion"
    @State private var itemPurchased = ""
    @State private var date = Date.now.formatted(
        .dateTime
            .year()
            .month(.twoDigits)
            .day(.twoDigits)
    )
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
                        Text("Trade-In").tag("Trade-In")
                        Text("Upgrade").tag("Upgrade")
                    }
                    .pickerStyle(.palette)
                    .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
                    
                    TextField("Enter purchased item", text: $itemPurchased)
                        .padding()
                        .multilineTextAlignment(.center)
                        .autocorrectionDisabled(true)
                        .focused($fieldIsFocused)
                    
                    Button("Add item") {
                        fieldIsFocused = false
                        if typeOfConversion == "Conversion Type" || itemPurchased.isEmpty {
                            showError = true
                            toastOpacity = 1.0
                        } else {
                            let newItem = Item(convType: typeOfConversion, itemName: itemPurchased, date: date)
                            context.insert(newItem)
                            print("Sold \(itemPurchased) in category \(typeOfConversion) on \(date)")
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
                            let newAppointmentCount = AppointmentCount(count: numAppointments, date: date)
                            context.insert(newAppointmentCount)
                            print("Took \(numAppointments) appointments on \(date)")
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
                        try? await Task.sleep(nanoseconds: 2_000_000_000)
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
                        try? await Task.sleep(nanoseconds: 2_000_000_000)
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
    InputView()
}
