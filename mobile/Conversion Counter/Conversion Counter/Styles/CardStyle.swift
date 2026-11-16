//
//  CardStyle.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/15/26.
//

import SwiftUI


// 1. Define the "CSS class" rules
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color(.systemBackground))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(Color.primary.opacity(0.12), lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.08), radius: 8, x: 0, y: 4)
    }
}

// 2. Create a clean shorthand modifier
extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}
