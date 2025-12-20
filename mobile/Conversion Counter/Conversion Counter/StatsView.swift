//
//  StatsView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData

struct StatsView: View {
    @Query private var conversions: [Item]
    @Query(sort: [SortDescriptor(\AppointmentCount.createdAt, order: .forward)]) private var appointments: [AppointmentCount]
    @Environment(\.modelContext) private var context
    @State private var filterName: String = "All"
    @State private var sortType: String = "Date Sold"
    @State private var searchDate: Date = Date.now
    private var searchDateString: String {
        searchDate.formatted(
            .dateTime
                .year()
                .month(.twoDigits)
                .day(.twoDigits)
        )
    }
    
    var body: some View {
        GeometryReader { geometry in
            VStack(spacing: 20) {
                Text("Statistics")
                    .font(.largeTitle)
                Menu {
                    Picker("Filter", selection: $filterName) {
                        Text("All").tag("All")
                        Label("Accessories", systemImage: "bag").tag("Accessory")
                        Label("Upgrades", systemImage: "arrow.up.circle").tag("Upgrade")
                        Label("Trade-Ins", systemImage: "arrow.2.squarepath").tag("Trade-In")
                    }
                } label: {
                    Label("Filter", systemImage: "line.3.horizontal.decrease")
                        .font(.title2)
                }
                Spacer()
                
                let sortedConv = conversions.sorted {
                    return $0.convType < $1.convType
                }
                
                let filtered = sortedConv.filter { item in
                    (filterName == "All" || item.convType == filterName) && item.date == searchDateString
                }
                
                let groupedByDate = Dictionary(grouping: filtered, by: { $0.date })
                let itemsForDate = groupedByDate[searchDateString] ?? []
                
                ScrollView {
                    Text(searchDateString)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .font(.title2)
                        .fontWeight(.bold)
                        .padding(EdgeInsets(top: 0, leading: 20, bottom: 5, trailing: 20))
                    
                    
                    
                    if itemsForDate.isEmpty {
                        Text("No items")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(itemsForDate) { item in
                            HStack {
                                Text(item.convType)
                                    .foregroundStyle(.primary)
                                    .fontWeight(.bold)
                                Spacer()
                                Text(item.itemName)
                                    .foregroundStyle(.primary)
                            }
                            .padding(EdgeInsets(top: 5, leading: 40, bottom: 5, trailing: 40))
                        }
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: geometry.size.height / 2, alignment: .center)
                Spacer()
                
                let groupApptByDate = Dictionary(grouping: appointments, by: { $0.date })
                let numAppointments = groupApptByDate[searchDateString]?.last?.count ?? "0" // Getting the last entered number of appointments from the list
                let appointmentCountInt = Int(numAppointments) ?? 0
                
                
                let conversionsForDate = itemsForDate.count
                let percent = appointmentCountInt > 0 ? String((Double(conversionsForDate) / Double(appointmentCountInt) * 100).rounded()) : "0"
                
                Text("Appointments: \(numAppointments)")
                Text("Conversion %: \(percent)%")
                
                Spacer()
                HStack {
                    DatePicker(
                        "",
                        selection: $searchDate,
                        displayedComponents: [.date]
                    )
                    .labelsHidden()
                    Stepper(
                        "",
                        onIncrement: {searchDate = searchDate.addingTimeInterval(86_400)},
                        onDecrement: {searchDate = searchDate.addingTimeInterval(-86_400)}
                    )
                    .labelsHidden()
                }
                .padding(EdgeInsets(top: 10, leading: 20, bottom: 20, trailing: 20))
            }
        }
    }
}

#Preview {
    StatsView()
        .modelContainer(for: [Item.self, AppointmentCount.self], inMemory: true)
}

struct Previews_StatsView_LibraryContent: LibraryContentProvider {
    var views: [LibraryItem] {
        LibraryItem(/*@START_MENU_TOKEN@*/Text("Hello, World!")/*@END_MENU_TOKEN@*/)
    }
}
