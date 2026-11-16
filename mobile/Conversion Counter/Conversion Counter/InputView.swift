//
//  InputView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData
import GoogleSignIn
import Supabase
import Auth

struct InputView: View {
    @Environment(\.modelContext) private var context
    @Query private var data: [DailyData]

    @State private var typeOfConversion = "Accessory"
    @State private var typeOfInput = "Conversion"
    @State private var itemPurchased = ""
    @State private var inputDate: Date = Calendar.current.startOfDay(for: Date.now)
    @State private var itemAdded = false
    @State private var toastOpacity = 1.0
    @State private var showError = false
    @State private var numAppointments = ""
    @State private var textFieldText = "Enter accessory that was purchased"
    
    @FocusState private var fieldIsFocused: Bool
    
    
    var body: some View {
        ZStack {
            VStack() {
                HStack {
                    Text("Log Conversion")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(20)
                    
                    Spacer()
                    
                    Button("Sign out") {
                        Task {
                            do {
                                try await supabase.auth.signOut()
                                GIDSignIn.sharedInstance.signOut()
                            } catch {
                                print("Sign out failed:", error)
                            }
                        }
                    }
                    Spacer()
                }
                
                Text("Record a sale from your Genius Bar appointment")
                
                VStack(alignment: .leading) {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Date")
                            .font(.headline)
                        
                        HStack {
                            DatePicker(
                                "",
                                selection: $inputDate,
                                displayedComponents: [.date]
                            )
                            .labelsHidden()
                            Stepper(
                                "",
                                onIncrement: {inputDate = inputDate.addingTimeInterval(86_400)},
                                onDecrement: {inputDate = inputDate.addingTimeInterval(-86_400)}
                            )
                            .labelsHidden()
                        }
                    }
                    .padding()
                    
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Appointments Taken")
                            .font(.headline)
                        
                        HStack {
                            TextField("0", text: $numAppointments)
                                .padding()
                                .multilineTextAlignment(.center)
                                .keyboardType(.numberPad)
                                .focused($fieldIsFocused)
                                .frame(width: 60)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                                        .stroke(Color.primary.opacity(0.12), lineWidth: 1)
                                )
                            
                            Button("Save") {
                                fieldIsFocused = false
                                if numAppointments == "0" || numAppointments == "" {
                                    showError = true
                                    toastOpacity = 1.0
                                } else {
                                    if let existingData = data.first(where: { Calendar.current.isDate($0.date, inSameDayAs: inputDate) }) {
                                        existingData.updateNumAppointments(Int(numAppointments)!)
                                        try? context.save()
                                    } else {
                                        let newDailyData = DailyData(date: inputDate, numAppointments: Int(numAppointments)!)
                                        context.insert(newDailyData)
                                        try? context.save()
                                    }
                                    numAppointments = ""
                                    itemAdded = true
                                    toastOpacity = 1.0
                                }
                            }
                            .buttonStyle(.primary)
                        }
                    }
                    .padding()
                }
                .cardStyle()
                
                
                
                Spacer()
                
                
                
                VStack(spacing: 8) {
                    VStack(spacing: 20) {
                        HStack(spacing: 20) {
                            Button("Accessory") {
                                typeOfConversion = "Accessory"
                                textFieldText = "Enter Accessory that was purchased"
                            }
                            .buttonStyle(.primary)
                            
                            Button("AppleCare") {
                                typeOfConversion = "AppleCare"
                                textFieldText = "Enter device that AppleCare was added to"
                            }
                            .buttonStyle(.primary)
                        }
                        HStack(spacing: 20) {
                            Button("Trade-In") {
                                typeOfConversion = "Trade-In"
                                textFieldText = "Enter device that was traded-in"
                            }
                            .buttonStyle(.primary)
                            
                            Button("Upgrade") {
                                typeOfConversion = "Upgrade"
                                textFieldText = "Enter device that was purchased"
                            }
                            .buttonStyle(.primary)
                        }
                    }
                    
                    
                    TextField(textFieldText, text: $itemPurchased)
                        .padding()
                        .multilineTextAlignment(.center)
                        .autocorrectionDisabled(true)
                        .focused($fieldIsFocused)
                    

                    
                    Button("Add Conversion") {
                        fieldIsFocused = false
                        if typeOfConversion == "Conversion Type" || itemPurchased.isEmpty {
                            showError = true
                            toastOpacity = 1.0
                        } else {
                            let newItem = Item(convType: typeOfConversion, itemName: itemPurchased, date: inputDate)
                            if let existingData = data.first(where: { Calendar.current.isDate($0.date, inSameDayAs: inputDate) }) {
                                existingData.addConversion(newItem)
                                try? context.save()
                            } else {
                                let newDailyData = DailyData(date: inputDate, conversions: [newItem])
                                context.insert(newDailyData)
                                try? context.save()
                            }
                            itemPurchased = ""
                            itemAdded = true
                            toastOpacity = 1.0
                        }
                    }
                    .buttonStyle(.secondary)
                    
                }
                .cardStyle()
                
                Spacer()
                
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
}

#Preview {
    InputView()
}
