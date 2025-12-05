import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ExpenseType } from "../types";

interface FilterSortModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilter: ExpenseType | "all";
  currentSort: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
  onFilterChange: (filter: ExpenseType | "all") => void;
  onSortChange: (
    sort: "date-desc" | "date-asc" | "amount-desc" | "amount-asc"
  ) => void;
}

const FilterSortModal: React.FC<FilterSortModalProps> = ({
  visible,
  onClose,
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}) => {
  const filterOptions: { value: ExpenseType | "all"; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "food", label: "Ăn uống" },
    { value: "transport", label: "Di chuyển" },
    { value: "other", label: "Khác" },
  ];

  const sortOptions: {
    value: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
    label: string;
  }[] = [
    { value: "date-desc", label: "Ngày: Mới → Cũ" },
    { value: "date-asc", label: "Ngày: Cũ → Mới" },
    { value: "amount-desc", label: "Số tiền: Cao → Thấp" },
    { value: "amount-asc", label: "Số tiền: Thấp → Cao" },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Lọc & Sắp xếp</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lọc theo loại</Text>
              <View style={styles.optionsContainer}>
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      currentFilter === option.value &&
                        styles.optionButtonActive,
                    ]}
                    onPress={() => {
                      onFilterChange(option.value);
                      onClose();
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        currentFilter === option.value &&
                          styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sắp xếp</Text>
              <View style={styles.optionsContainer}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      currentSort === option.value && styles.optionButtonActive,
                    ]}
                    onPress={() => {
                      onSortChange(option.value);
                      onClose();
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        currentSort === option.value && styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  closeButton: {
    fontSize: 24,
    color: "#666",
    padding: 4,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  optionButtonActive: {
    backgroundColor: "#3498DB",
    borderColor: "#3498DB",
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  optionTextActive: {
    color: "#fff",
  },
});

export default FilterSortModal;
