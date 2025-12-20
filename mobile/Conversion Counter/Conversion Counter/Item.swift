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
    var date: String
    
    init(convType: String, itemName: String, date: String) {
        self.convType = convType
        self.itemName = itemName
        self.date = date
    }
}
