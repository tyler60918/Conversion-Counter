//
//  GraphView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import SwiftUI
import SwiftData

struct GraphView: View {
    @Query private var conversions: [Item]
    @Query(sort: [SortDescriptor(\AppointmentCount.createdAt, order: .forward)]) private var appointments: [AppointmentCount]
    
    var body: some View {
        Text("Graphical Conversion")
            .font(.largeTitle)
    }
}

#Preview {
    GraphView()
}
