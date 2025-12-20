//
//  ToastView.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/16/25.
//

import SwiftUI

struct ToastView: View {
    
    var message: String
    var width = CGFloat.infinity
    
    var body: some View {
        Text(message)
            .foregroundStyle(.white)
            .padding()
            .frame(minWidth: 0, maxWidth: width)
            .cornerRadius(8)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(.black)
            )
    }
}

#Preview {
    ToastView(message: "Item Added", width: 200)
}
