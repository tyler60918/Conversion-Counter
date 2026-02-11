//
//  StatsView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData

struct StatsView: View {
    @Query private var data: [DailyData]
    @Environment(\.modelContext) private var context
    @State private var editMode: Bool = false
    @State private var filterName: String = "All"
    @State private var sortType: String = "Date Sold"
    @State private var searchDate: Date = Calendar.current.startOfDay(for: Date.now)
    @State private var today: Date = Calendar.current.startOfDay(for: Date.now)
    
    private var formattedSearchDate: String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "EEEE, MMM d, yyyy"
        return dateFormatter.string(from: searchDate)
    }
    
    var body: some View {
        GeometryReader { geometry in
            VStack(spacing: 20) {
                Text("Statistics")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(20)
                
                let todayData = data.first(where: { Calendar.current.isDate($0.date, inSameDayAs: searchDate) })
                let sortedConv = todayData?.conversions.sorted { return $0.convType < $1.convType } ?? []
                let filtered = sortedConv.filter { item in
                    (filterName == "All" || item.convType == filterName)
                }
                
                HStack {
                    Spacer()
                    Menu {
                        Picker("Filter", selection: $filterName) {
                            Text("All").tag("All")
                            Label("Accessories", systemImage: "bag").tag("Accessory")
                            Label("Upgrades", systemImage: "arrow.up.circle").tag("Upgrade")
                            Label("Trade-Ins", systemImage: "arrow.2.squarepath").tag("Trade-In")
                            Label("AppleCare", systemImage: "applelogo").tag("AppleCare")
                        }
                    } label: {
                        Label("Filter", systemImage: "line.3.horizontal.decrease")
                            .font(.title2)
                    }
                    Spacer()
                    Button(
                        action: {
                            editMode = !editMode
                        },
                        label: {
                            editMode ? Text("Done") : Text("Edit")
                        }
                    )
                    .disabled(filtered.isEmpty && !editMode)
                    Spacer()
                }
                Spacer()
                
                ScrollView {
                    Text(formattedSearchDate)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .font(.title2)
                        .fontWeight(.bold)
                        .padding(EdgeInsets(top: 0, leading: 20, bottom: 5, trailing: 20))
                    
                    
                    // Items list
                    if filtered.isEmpty {
                        Text("No items")
                            .foregroundStyle(.secondary)
                            .padding(EdgeInsets(top: 35, leading: 0, bottom: 0, trailing: 0))
                    } else {
                        ForEach(filtered) { item in
                            HStack {
                                Text(item.convType)
                                    .foregroundStyle(.primary)
                                    .fontWeight(.bold)
                                Spacer()
                                Text(item.itemName)
                                    .foregroundStyle(.primary)
                                // Edit Mode Delete Button
                                if editMode {
                                    Button(
                                        action: {
                                            todayData?.conversions.remove(at: todayData!.conversions.firstIndex(of: item)!)
                                            todayData?.calculateConvPercent()
                                        }, label: {
                                            Label(
                                                "",
                                                systemImage: "minus.circle.fill"
                                            )
                                            .foregroundStyle(Color.red)
                                            .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 0))
                                        }
                                    )
                                }
                            }
                            .padding(EdgeInsets(top: 5, leading: 40, bottom: 5, trailing: 40))
                        }
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: geometry.size.height / 2, alignment: .center)
                Spacer()
                
                Text("Appointments: \(todayData?.numAppointments ?? 0)")
                Text("Conversion %: \(todayData?.conversionPercentage ?? 0, specifier: "%.02f")%")
                
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
        .modelContainer(for: [Item.self], inMemory: true)
}

struct Previews_StatsView_LibraryContent: LibraryContentProvider {
    var views: [LibraryItem] {
        LibraryItem(/*@START_MENU_TOKEN@*/Text("Hello, World!")/*@END_MENU_TOKEN@*/)
    }
}
