//
//  Item.swift
//  Conversion Counter
//
//  Created by Tyler Pierce on 11/13/25.
//

import Foundation
import SwiftData

@Model
final class Item {
    var convType: String
    var itemName: String
    var date: Date
    
    init(convType: String, itemName: String, date: Date) {
        self.convType = convType
        self.itemName = itemName
        self.date = date
    }
}
