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
    @Query private var data: [DailyData]
    
    @State private var startDate: Date = Date.init(timeIntervalSinceNow: -24*60*60*7)
    @State private var endDate: Date = Date.now
    
    @State private var graphType = "Bar"
    
    var body: some View {
        VStack {
            Text("Graphical View")
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
            
            var filteredData: [DailyData] {
                print("Daily Data Count: \(data.count)")
                let filtered = data.filter { item in
                    (item.date <= endDate) && (item.date >= startDate)
                }
                print("Filtered data count: \(filtered.count)")
                for item in filtered {
                    print("Date: \(item.date), Conversion %: \(item.conversionPercentage)")
                }
                return filtered
            }
            
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
                    //Line chart
                    ForEach(filteredData) { dataPoint in
                        LineMark(
                            x: .value("Date", dataPoint.date),
                            y: .value("Conversion %", dataPoint.conversionPercentage)
                        )
                    }
                case "Bar":
                    //Bar chart
                    ForEach(filteredData) { dataPoint in
                        BarMark(
                            x: .value("Date", dataPoint.date),
                            y: .value("Conversion %", dataPoint.conversionPercentage)
                        )
                        .annotation(position: .top) {
                            Text("\(dataPoint.conversionPercentage, specifier: "%.0f")%")
                        }
                    }
                case "Plot":
                    //Plot chart
                    ForEach(filteredData) { dataPoint in
                        PointMark(
                            x: .value("Date", dataPoint.date),
                            y: .value("Conversion %", dataPoint.conversionPercentage)
                        )
                    }
                default:
                    fatalError("Unexpected graph type")
                }
            }
            .chartXScale(domain: startDate...endDate)
            .chartYAxis {
                AxisMarks(format: Decimal.FormatStyle.Percent.percent.scale(1))
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("Date")
                    .font(.title2)
            }
            .chartYAxisLabel(position: .leading, alignment: .center) {
                Text("Conversion %")
                    .font(.title2)
            }
            .padding(20)
        }
    }
}

#Preview {
    GraphView()
}
