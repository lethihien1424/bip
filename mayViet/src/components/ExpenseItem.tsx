import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Expense } from "../types";

interface ExpenseItemProps {
  expense: Expense;
  onPress?: () => void;
  onDelete?: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onPress,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "food":
        return "Ăn uống";
      case "transport":
        return "Di chuyển";
      case "other":
        return "Khác";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "food":
        return "#FF6B6B";
      case "transport":
        return "#4ECDC4";
      case "other":
        return "#95E1D3";
      default:
        return "#999";
    }
  };

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftSection}>
          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.date}>{formatDate(expense.date)}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: getTypeColor(expense.type) },
            ]}
          >
            <Text style={styles.typeText}>{getTypeLabel(expense.type)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 6,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
  },
  deleteButtonText: {
    fontSize: 20,
  },
});

export default ExpenseItem;
