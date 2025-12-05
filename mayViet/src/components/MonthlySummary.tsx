import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MonthlySummaryProps {
  total: number;
  month: string;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ total, month }) => {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tổng chi {month}</Text>
        <Text style={styles.amount}>{formatAmount(total)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: "#3498DB",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#3498DB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    opacity: 0.9,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MonthlySummary;
