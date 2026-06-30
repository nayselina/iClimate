import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = "Food" | "Transpo" | "Bills";

type Expense = {
  id: string;
  item: string;
  amount: number;
  category: Category;
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  Food: "🍟",
  Transpo: "🚗",
  Bills: "💵",
};

export default function Index() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", item: "Jollibee Lunch", amount: 180, category: "Food" },
    { id: "2", item: "Angkas Ride", amount: 95, category: "Transpo" },
    { id: "3", item: "Meralco Bill", amount: 1500, category: "Bills" },
  ]);
  const [filter, setFilter] = useState("All");

  const addExpense = () => {
    if (item.trim() === "") {
      Alert.alert("Error", "Please enter an item.");
      return;
    }

    if (amount.trim() === "") {
      Alert.alert("Error", "Please enter an amount.");
      return;
    }

    if (category === "") {
      Alert.alert("Error", "Please select a category.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      item,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    setItem("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  // ✅ Total now reflects the active filter
  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={styles.wrapper}>
      {/* Fixed Header inside SafeAreaView */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <Text style={styles.headerTitle}>My Expense Tracker</Text>
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Total Card */}
        <View style={styles.totalCard}>
          {/* ✅ Label updates to show which filter is active */}
          <Text style={styles.totalLabel}>TOTAL ({filter.toUpperCase()})</Text>
          <Text style={styles.totalAmount}>₱{total.toLocaleString()}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            placeholder="Item (Baon, Pamasahe)"
            value={item}
            onChangeText={setItem}
            style={styles.input}
          />

          <TextInput
            placeholder="Amount (₱)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.categoryLabel}>SELECT CATEGORY:</Text>

          <View style={styles.categoryContainer}>
            {(["Food", "Transpo", "Bills"] as Category[]).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.selectedCategory,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && { color: "#fff" },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addExpense}>
            <Text style={styles.addButtonText}>+ Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Filter */}
        <View style={styles.filterContainer}>
          {["All", "Food", "Transpo", "Bills"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                filter === cat && styles.selectedFilter,
              ]}
              onPress={() => setFilter(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === cat && { color: "#fff" },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expense List */}
        {filteredExpenses.length === 0 ? (
          <Text style={styles.emptyText}>No expenses yet.</Text>
        ) : (
          filteredExpenses.map((expense) => (
            <View key={expense.id} style={styles.expenseCard}>
              {/* Emoji Icon */}
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>
                  {CATEGORY_EMOJI[expense.category] ?? "💸"}
                </Text>
              </View>

              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{expense.item}</Text>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
              </View>

              <View style={styles.rightSection}>
                <Text style={styles.expenseAmount}>
                  ₱{expense.amount.toFixed(2)}
                </Text>

                <TouchableOpacity onPress={() => deleteExpense(expense.id)}>
                  <Text style={styles.delete}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  safeHeader: {
    backgroundColor: "#111827",
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  scrollView: {
    flex: 1,
  },

  container: {
    padding: 15,
    paddingBottom: 40,
  },

  totalCard: {
    marginTop: 15,
    backgroundColor: "#10B981",
    borderRadius: 12,
    padding: 20,
  },

  totalLabel: {
    color: "#fff",
    fontWeight: "600",
  },

  totalAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },

  form: {
    backgroundColor: "#fff",
    marginTop: 18,
    borderRadius: 12,
    padding: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  categoryLabel: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    width: "31%",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  selectedCategory: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  categoryText: {
    color: "#000",
  },

  addButton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  filterContainer: {
    flexDirection: "row",
    marginVertical: 18,
    justifyContent: "space-around",
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
  },

  selectedFilter: {
    backgroundColor: "#111827",
  },

  filterText: {
    color: "#000",
    fontWeight: "600",
  },

  expenseCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  emoji: {
    fontSize: 20,
  },

  expenseInfo: {
    flex: 1,
  },

  expenseTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  expenseCategory: {
    color: "gray",
    marginTop: 4,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  expenseAmount: {
    color: "#DC2626",
    fontWeight: "bold",
    marginRight: 15,
  },

  delete: {
    color: "#DC2626",
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "gray",
    marginTop: 50,
    fontSize: 16,
  },
});