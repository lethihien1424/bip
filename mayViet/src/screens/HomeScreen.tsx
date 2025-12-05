import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem from "../components/ExpenseItem";
import AddExpenseModal from "../components/AddExpenseModal";
import FilterSortModal from "../components/FilterSortModal";
import MonthlySummary from "../components/MonthlySummary";
import { Expense, ExpenseType } from "../types";
import {
  getExpenses,
  addExpense,
  saveExpenses,
  updateExpense,
  deleteExpense,
} from "../db/database";
import { Alert } from "react-native";

const HomeScreen: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(
    undefined
  );
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [filterSortVisible, setFilterSortVisible] = useState(false);
  const [filterType, setFilterType] = useState<ExpenseType | "all">("all");
  const [sortType, setSortType] = useState<
    "date-desc" | "date-asc" | "amount-desc" | "amount-asc"
  >("date-desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu mặc định: 3 item
  const defaultExpenses: Expense[] = [
    {
      id: "1",
      title: "Ăn sáng",
      amount: 35000,
      date: new Date().toISOString(),
      type: "food",
    },
    {
      id: "2",
      title: "Xe bus",
      amount: 7000,
      date: new Date().toISOString(),
      type: "transport",
    },
    {
      id: "3",
      title: "Mua sách",
      amount: 150000,
      date: new Date().toISOString(),
      type: "other",
    },
  ];

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await getExpenses();
    if (data.length === 0) {
      // Lưu dữ liệu mặc định vào storage nếu chưa có
      await saveExpenses(defaultExpenses);
      setExpenses(defaultExpenses);
    } else {
      setExpenses(data);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    await addExpense(expense);
    await loadExpenses();
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalMode("edit");
    setModalVisible(true);
  };

  const handleSaveExpense = async (expense: Omit<Expense, "id">) => {
    if (modalMode === "edit" && selectedExpense) {
      await updateExpense(selectedExpense.id, expense);
    } else {
      await addExpense(expense);
    }
    await loadExpenses();
    setSelectedExpense(undefined);
  };

  const handleDeleteExpense = (expense: Expense) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa khoản chi "${expense.title}"?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await deleteExpense(expense.id);
            await loadExpenses();
          },
        },
      ]
    );
  };

  const handleAddNew = () => {
    setSelectedExpense(undefined);
    setModalMode("add");
    setModalVisible(true);
  };

  // Calculate monthly total
  const getMonthlyTotal = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      if (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        return total + expense.amount;
      }
      return total;
    }, 0);
  };

  const getCurrentMonthName = () => {
    const now = new Date();
    return `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`;
  };

  // Filter and sort expenses
  const getFilteredAndSortedExpenses = () => {
    let filtered = expenses;

    // Search by title
    if (searchQuery.trim()) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((e) => e.type === filterType);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortType) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return sorted;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Chưa có khoản chi tiêu nào</Text>
      <Text style={styles.emptySubText}>Nhấn + để thêm khoản chi mới</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chi Tiêu</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterSortVisible(true)}
          >
            <Text style={styles.filterButtonText}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddExpenseModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedExpense(undefined);
        }}
        onSave={handleSaveExpense}
        initialData={selectedExpense}
        mode={modalMode}
      />

      <FilterSortModal
        visible={filterSortVisible}
        onClose={() => setFilterSortVisible(false)}
        currentFilter={filterType}
        currentSort={sortType}
        onFilterChange={setFilterType}
        onSortChange={setSortType}
      />

      <MonthlySummary total={getMonthlyTotal()} month={getCurrentMonthName()} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tiêu đề..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={getFilteredAndSortedExpenses()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onPress={() => handleEditExpense(item)}
            onDelete={() => handleDeleteExpense(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#95A5A6",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonText: {
    fontSize: 18,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3498DB",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "300",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  clearButton: {
    position: "absolute",
    right: 24,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 16,
    color: "#666",
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
  },
});

export default HomeScreen;
