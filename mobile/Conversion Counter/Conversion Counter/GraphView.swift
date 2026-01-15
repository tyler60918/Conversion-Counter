//
//  GraphView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import Charts
import SwiftUI
import SwiftData

struct GraphView: View {
    @Query private var conversions: [Item]
    @Query(sort: [SortDescriptor(\AppointmentCount.createdAt, order: .forward)]) private var appointments: [AppointmentCount]
    @State private var startDate: Date = Date.init(timeIntervalSinceNow: -24*60*60*7)
    @State private var endDate: Date = Date.now
    
    @State private var graphType = "Line"

    
    var body: some View {
        Text("Graphical Conversion")
            .font(.largeTitle)
        
        HStack(spacing: 20) {
            Button("Week") {
                startDate = Date.init(timeIntervalSinceNow: -24*60*60*7)
            }
            .font(.title2)
            Button("Month") {
                if let previousMonthDate = Calendar.current.date(byAdding: .month, value: -1, to: endDate) {
                    startDate = previousMonthDate
                }
            }
            .font(.title2)
            Button("YTD") {
                let calendar = Calendar.current
                let components = calendar.dateComponents([.year], from: Date())
                if let year = components.year,
                   let janFirst = calendar.date(from: DateComponents(year: year, month: 1, day: 1)) {
                    startDate = calendar.startOfDay(for: janFirst)
                }
            }
            .font(.title2)
            Button("Year") {
                if let previousYearDate = Calendar.current.date(byAdding: .year, value: -1, to: endDate) {
                    startDate = previousYearDate
                }
            }
            .font(.title2)
        }
        .padding(5)
        
        HStack {
            DatePicker(
                "",
                selection: $startDate,
                displayedComponents: [.date]
            )
            .labelsHidden()
            
            Text("--")
                .font(.title)
            
            DatePicker(
                "",
                selection: $endDate,
                displayedComponents: [.date]
            )
            .labelsHidden()
        }
        .padding(EdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20))
        
        Picker("Graph Type", selection: $graphType) {
            Text("Line Chart").tag("Line")
            Text("Bar Chart").tag("Bar")
            Text("Plot Chart").tag("Plot")
        }
        .pickerStyle(.menu)
        
        Spacer()
        
        Chart {
            switch graphType {
            case "Line":
                ForEach 
            case "Bar":
                //Bar chart
            case "Plot":
                //Plot chart
            default:
                EmptyView()
            }
        }
    }
}

#Preview {
    GraphView()
}
